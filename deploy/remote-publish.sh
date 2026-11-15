#!/usr/bin/env sh
# Runs on the deployment host after the image is loaded: gate on the reviewed
# Compose file, then hand over to deploy.sh.
set -eu

[ "$#" -eq 2 ] || { echo 'Usage: remote-publish.sh <incoming-dir> <image-ref>' >&2; exit 2; }
incoming="$1"
image="$2"
DEPLOY_DIR="${DEPLOY_DIR:-/mnt/data/zhama/homepage}"
export DEPLOY_DIR
cd "$DEPLOY_DIR"

if [ -f docker-compose.yml ]; then
  cmp docker-compose.yml "$incoming/docker-compose.yml" || {
    echo 'Compose configuration changed; review and install it before publishing.' >&2
    exit 1
  }
else
  cp "$incoming/docker-compose.yml" docker-compose.yml
fi
[ -f .env ] || {
  echo 'Missing deployment .env; add the keys from deploy/.env.production.example, then rerun the deploy job.' >&2
  exit 1
}

sh "$incoming/deploy/deploy.sh" --image "$image" --no-pull
rm -rf "$incoming"
