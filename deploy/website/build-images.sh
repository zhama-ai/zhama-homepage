#!/usr/bin/env sh
# Build the website and contact images from an already verified dist/.
# Run from anywhere after `npm run release:check` (with the same PUBLIC_SITE_URL).
set -eu

[ "$#" -eq 2 ] || { echo 'Usage: build-images.sh <web-image-ref> <contact-image-ref>' >&2; exit 2; }
web_image="$1"
contact_image="$2"
root=$(cd "$(dirname "$0")/../.." && pwd)
[ -f "$root/dist/index.html" ] || { echo 'Build and verify dist/ before building images.' >&2; exit 1; }

# dist/ is excluded from the repository's Docker context, so the website image
# gets its own context holding only what it serves.
stage=$(mktemp -d)
trap 'rm -rf "$stage"' EXIT
node "$root/deploy/website/generate-nginx.mjs" --proxy > "$stage/site-routes.conf"
cp "$root/deploy/website/Dockerfile" "$root/deploy/website/site.conf" "$stage/"
cp -R "$root/dist" "$stage/dist"

docker build --pull --tag "$web_image" "$stage"
docker build --pull --tag "$contact_image" --file "$root/deploy/contact/Dockerfile" "$root"

# Fail here rather than on the server if the generated routes do not parse.
docker run --rm --network none --add-host contact:127.0.0.1 "$web_image" nginx -t
