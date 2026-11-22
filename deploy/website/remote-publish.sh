#!/usr/bin/env sh
# Runs on the deployment host after the images are loaded: gate on the reviewed
# Compose file, then hand over to deploy.sh.
set -eu

[ "$#" -eq 3 ] || { echo 'Usage: remote-publish.sh <incoming-dir> <web-image-ref> <contact-image-ref>' >&2; exit 2; }
incoming="$1"
DEPLOY_DIR="${DEPLOY_DIR:-/opt/zhama-website}"
export DEPLOY_DIR
cd "$DEPLOY_DIR"

if [ -f docker-compose.yml ]; then
  cmp docker-compose.yml "$incoming/deploy/website/compose.yml" || {
    echo 'Compose configuration changed; review and install deploy/website/compose.yml as docker-compose.yml, then rerun the deploy job.' >&2
    exit 1
  }
else
  cp "$incoming/deploy/website/compose.yml" docker-compose.yml
fi
[ -f .env ] || (umask 077; : > .env)
[ -f contact.env ] || {
  echo 'Missing contact.env; add the keys from deploy/website/contact.env.example, then rerun the deploy job.' >&2
  exit 1
}

sh "$incoming/deploy/website/deploy.sh" "$2" "$3"
rm -rf "$incoming"
