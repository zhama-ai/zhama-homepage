#!/usr/bin/env sh
# Runs on the deployment host: download the image archive the runner staged on
# Aliyun OSS, verify it and load it into Docker. The pre-signed URL arrives on
# stdin rather than in the SSH command line.
set -eu

[ "$#" -eq 3 ] || { echo 'Usage: fetch-image.sh <incoming-dir> <image-ref> <archive-sha256> < url' >&2; exit 2; }
incoming="$1"
image="$2"
sha256="$3"
case "$sha256" in
  *[!0-9a-f]*|'') echo 'Invalid archive SHA-256.' >&2; exit 2 ;;
esac
[ "${#sha256}" -eq 64 ] || { echo 'Invalid archive SHA-256.' >&2; exit 2; }
IFS= read -r url || true
case "$url" in
  https://*) ;;
  *) echo 'Missing pre-signed download URL on stdin.' >&2; exit 2 ;;
esac
command -v sha256sum >/dev/null
command -v docker >/dev/null

archive="$incoming/image.tar.gz"
trap 'rm -f "$archive"' EXIT
fetched=0
for attempt in 1 2 3 4 5; do
  echo "Downloading the image archive from OSS (attempt $attempt of 5)."
  # Resume a partial file; give up on a stalled connection and retry.
  if command -v curl >/dev/null; then
    curl --fail --location --silent --show-error --continue-at - \
      --connect-timeout 30 --speed-limit 10240 --speed-time 60 \
      --output "$archive" "$url" && fetched=1
  else
    wget --quiet --continue --timeout=60 --output-document="$archive" "$url" && fetched=1
  fi
  if [ "$fetched" -eq 1 ]; then break; fi
  if [ "$attempt" -lt 5 ]; then sleep "$((attempt * 5))"; fi
done
[ "$fetched" -eq 1 ] || { echo 'Image download failed; publication was not started.' >&2; exit 1; }

ls -l "$archive"
echo "$sha256  $archive" | sha256sum -c -
docker load --input "$archive"
docker image inspect --format 'Loaded {{.Id}}' "$image"
