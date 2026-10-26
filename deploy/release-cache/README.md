# Shared release cache

The homepage remains on Vercel. A resident service on the existing China server
refreshes OSS/CDN every 30 minutes. It exposes only GET/HEAD metadata endpoints;
there is no public refresh/admin endpoint or new public TCP port.

From the repository root on the server:

```sh
docker compose -f deploy/release-cache/compose.yaml up -d --build
docker compose -f deploy/release-cache/compose.yaml ps
docker compose -f deploy/release-cache/compose.yaml logs --tail 30
```

The compose file uses the existing `nginx_default` Docker network. Install
`nginx.location.conf` as `/etc/nginx/conf.d/optional/release-cache.location.inc`
in the nginx container's existing configuration mount, then add this inside the
existing **www.zhama.com.cn** TLS server block:

```nginx
include /etc/nginx/conf.d/optional/release-cache.location.inc;
```

Back up that server block before editing. Run `docker exec nginx nginx -t`,
then `docker exec nginx nginx -s reload`. Check the external TLS endpoint:

```sh
curl --fail https://www.zhama.com.cn/api/release-cache/healthz
curl --fail https://www.zhama.com.cn/api/release-cache/downloads
curl --fail https://www.zhama.com.cn/api/release-cache/builds
```

Set Vercel's `RELEASE_CACHE_BASE_URL` to
`https://www.zhama.com.cn/api/release-cache/` and deploy the updated homepage.
Check both live same-origin APIs and the two browser pages. Shared-service
errors must return 503 rather than contacting OSS from Vercel.

The named volume contains `/data/latest.json`, written with an atomic rename.
Keep the volume on replacement; do not run `down -v`. A restart serves restored
data immediately and refreshes in the background. Inspect `checkedAt`, health,
and service logs for freshness/errors. Rollback: restore the nginx server-block
backup, test/reload nginx, and stop this compose project. Other containers and
website routes are independent.
