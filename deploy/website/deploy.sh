#!/usr/bin/env sh
# Runs on the deployment host: start already loaded images, verify them and pin
# them in .env. On failure the previously running image IDs are started again.
set -eu
umask 077

usage() {
  echo 'Usage: deploy.sh <web-image-ref> <contact-image-ref>' >&2
  exit 2
}
[ "$#" -eq 2 ] || usage
WEB_IMAGE="$1"
CONTACT_IMAGE="$2"
for ref in "$WEB_IMAGE" "$CONTACT_IMAGE"; do
  printf '%s\n' "$ref" | grep -Eq '^[a-z0-9][a-z0-9./_-]*(:[A-Za-z0-9_][A-Za-z0-9_.-]*|@sha256:[0-9a-f]{64})$' || usage
  case "$ref" in *:latest) echo 'Use a fixed image tag or digest.' >&2; exit 2 ;; esac
done

DEPLOY_DIR="${DEPLOY_DIR:-/opt/zhama-website}"
SITE_HOST="${SITE_HOST:-www.zhama.com}"
KEEP_IMAGES="${KEEP_IMAGES:-5}"
cd "$DEPLOY_DIR"
[ -f .env ] || { echo 'Missing deployment .env.' >&2; exit 1; }
[ -f contact.env ] || { echo 'Missing contact.env with the mail and Feishu settings.' >&2; exit 1; }

running_image() {
  container=$(docker compose ps --status running -q "$1")
  [ -n "$container" ] || return 0
  image=$(docker inspect --format '{{.Image}}' "$container")
  printf '%s\n' "$image" | grep -Eq '^sha256:[0-9a-f]{64}$' || {
    echo "Cannot identify the running $1 image; deployment stopped." >&2; exit 1;
  }
  printf '%s\n' "$image"
}

# Compose interpolates both variables; the running ones are recorded first.
export WEBSITE_WEB_IMAGE="$WEB_IMAGE" WEBSITE_CONTACT_IMAGE="$CONTACT_IMAGE"
docker compose config --quiet
old_web=$(running_image web)
old_contact=$(running_image contact)

# The site answers only on its canonical host and scheme, as the edge forwards them.
probe() {
  docker compose exec -T web wget -q -T 15 -O /dev/null \
    --header "Host: $SITE_HOST" --header 'X-Forwarded-Proto: https' "http://127.0.0.1$1"
}
verify() {
  for path in /healthz /zh/ /en/ /zh-Hant/ /robots.txt /builds.html /api/builds; do
    probe "$path" || { echo "Verification failed for $path." >&2; return 1; }
  done
}

started=0
recover() {
  trap - HUP INT TERM
  if [ "$started" -eq 0 ]; then
    echo 'Images are not available; the running service and .env are unchanged.' >&2
  elif [ -n "$old_web" ] && [ -n "$old_contact" ]; then
    export WEBSITE_WEB_IMAGE="$old_web" WEBSITE_CONTACT_IMAGE="$old_contact"
    if docker compose up -d --pull never --wait --wait-timeout 180 && verify; then
      echo 'New images failed validation; the previous images are running again.' >&2
    else
      echo 'Recovery failed; inspect the service on the host.' >&2
    fi
  else
    docker compose down || true
    echo 'First deployment failed validation; no previous images were running.' >&2
  fi
  exit 1
}
trap recover HUP INT TERM

docker image inspect "$WEB_IMAGE" "$CONTACT_IMAGE" > /dev/null || recover
started=1
docker compose up -d --pull never --wait --wait-timeout 180 || recover
verify || recover

env_tmp=$(mktemp .env.release.XXXXXX) || recover
if ! awk '!/^WEBSITE_(WEB|CONTACT)_IMAGE=/' .env > "$env_tmp" \
   || ! printf 'WEBSITE_WEB_IMAGE=%s\nWEBSITE_CONTACT_IMAGE=%s\n' "$WEB_IMAGE" "$CONTACT_IMAGE" >> "$env_tmp" \
   || ! mv "$env_tmp" .env; then
  rm -f "$env_tmp"
  recover
fi
trap - HUP INT TERM
echo "Website deployed: $WEB_IMAGE, $CONTACT_IMAGE"

# Keep the newest few releases of each image for manual rollback.
for repository in "${WEB_IMAGE%:*}" "${CONTACT_IMAGE%:*}"; do
  docker image ls --format '{{.CreatedAt}}\t{{.Repository}}:{{.Tag}}' "$repository" \
    | sort -r | tail -n "+$((KEEP_IMAGES + 1))" | cut -f2 \
    | while read -r old; do docker image rm "$old" > /dev/null 2>&1 || true; done
done
