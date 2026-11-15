#!/usr/bin/env sh
# Deploy a prebuilt homepage image.
set -eu
umask 077

usage() {
  echo 'Usage: deploy.sh <version-tag> | --image <immutable-image-ref> [--no-pull]' >&2
  exit 2
}

IMAGE_NAME="${IMAGE_NAME:-ghcr.io/zhama-ai/zhama-homepage}"
DEPLOY_ARCH="${DEPLOY_ARCH:-amd64}"
DEPLOY_DIR="${DEPLOY_DIR:-/mnt/data/zhama/homepage}"
SERVICE=homepage
PULL=1
if [ "${1:-}" = '--image' ]; then
  [ "$#" -ge 2 ] || usage
  IMAGE_REF="$2"
  shift 2
else
  [ "$#" -ge 1 ] || usage
  printf '%s\n' "$1" | grep -Eq '^v[0-9]+\.[0-9]+\.[0-9]+([.-][0-9A-Za-z.-]+)?$' || usage
  IMAGE_REF="${IMAGE_NAME}:$1-${DEPLOY_ARCH}"
  shift
fi
if [ "${1:-}" = '--no-pull' ]; then
  PULL=0
  shift
fi
[ "$#" -eq 0 ] || usage
printf '%s\n' "$IMAGE_REF" | grep -Eq '^[a-z0-9][a-z0-9./_-]*(:[A-Za-z0-9_][A-Za-z0-9_.-]*|@sha256:[0-9a-f]{64})$' || usage
case "$IMAGE_REF" in *:latest|*:latest-*) echo 'Use a fixed release tag or digest.' >&2; exit 2 ;; esac

cd "$DEPLOY_DIR"
[ -f .env ] || { echo 'Missing deployment .env; provision it before publishing.' >&2; exit 1; }
docker compose config --quiet

old_container=$(docker compose ps --status running -q "$SERVICE")
old_image=''
if [ -n "$old_container" ]; then
  old_image=$(docker inspect --format '{{.Image}}' "$old_container")
  printf '%s\n' "$old_image" | grep -Eq '^sha256:[0-9a-f]{64}$' || {
    echo 'Cannot identify the running image; deployment stopped.' >&2; exit 1;
  }
fi

# The image is node:alpine, which ships busybox wget but not curl.
probe() {
  docker compose exec -T "$SERVICE" wget -q -T 15 -O /dev/null "http://127.0.0.1:3000$1"
}
verify() {
  probe / || return 1
  probe /zh || return 1
  probe /api/builds || return 1
}

new_started=0
recover() {
  trap - HUP INT TERM
  if [ "$new_started" -eq 0 ]; then
    echo 'Image is not available; the running service and .env are unchanged.' >&2
  elif [ -n "$old_image" ]; then
    export HOMEPAGE_IMAGE="$old_image"
    if docker compose up -d --pull never --wait --wait-timeout 180 && verify; then
      echo 'New image failed validation; the previous local image is running again.' >&2
    else
      echo 'Recovery failed; inspect the service on the host.' >&2
    fi
  else
    docker compose rm -sf "$SERVICE" || true
    echo 'First deployment failed validation; no prior running image was available.' >&2
  fi
  exit 1
}
trap recover HUP INT TERM

# Compose uses an environment override until every check passes. Recovery uses
# the exact previous local image ID and does not pull or delete any old image.
export HOMEPAGE_IMAGE="$IMAGE_REF"
if [ "$PULL" -eq 1 ]; then
  docker compose pull "$SERVICE" || recover
else
  docker image inspect "$IMAGE_REF" > /dev/null || recover
fi
new_started=1
docker compose up -d --pull never --wait --wait-timeout 180 || recover
verify || recover

env_tmp=$(mktemp .env.release.XXXXXX) || recover
if ! awk '!/^HOMEPAGE_IMAGE=/' .env > "$env_tmp"; then
  rm -f "$env_tmp"
  recover
fi
if ! printf '\nHOMEPAGE_IMAGE=%s\n' "$IMAGE_REF" >> "$env_tmp" || ! mv "$env_tmp" .env; then
  rm -f "$env_tmp"
  recover
fi
trap - HUP INT TERM
echo "Homepage image deployed: ${IMAGE_REF}"
