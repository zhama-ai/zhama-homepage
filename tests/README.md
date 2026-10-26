# Release metadata cache

Run `pnpm test` with Node 22.6+ (CI and the Docker image use Node 22), then
`pnpm typecheck` and `pnpm build`.

`src/instrumentation.ts` awaits release-cache prewarming when a Node Next server
starts. The existing standalone Docker server runs one shared in-memory cache
per process; it needs no additional cron service or browser timer. Restarting
the server starts with a fresh prewarm. Every 30 minutes, a server timer refreshes
all four brands' desktop/mobile catalogs and the server package/checksum HEAD
results. This timer runs even when no one visits the site.

`/api/downloads`, `/api/builds`, and the server `DownloadSection` read the same
cache. Warm reads never fetch from OSS/CDN or wait for an in-progress refresh.
Upstream JSON reads live exclusively in the cache loader; the browser only reads
the same-origin APIs. Downloading an actual installer still uses its published
artifact URL.

Historical version queries fill the server cache on their first lookup, sharing
one job across concurrent callers. Both positive and 404 results stay cached and
are refreshed on the same 30-minute schedule. At most 16 historical versions are
retained, using least-recently-used eviction; the latest cache is never evicted.

Catalogs are validated against their brand, product kind and requested version.
A 404 authoritatively marks a resource absent. Network errors, non-404 HTTP
errors and invalid catalogs preserve the previous valid data with error labels.
New catalogs and server probe results are published as one complete snapshot.
`checkedAt` is the snapshot's actual refresh time, not the current request time.
The APIs use `Cache-Control: no-store` so clients see the server's current
snapshot without another independent browser cache delaying it.

Tests cover traffic-independent scheduling, concurrent fills, reads during slow
refreshes, stale-data recovery, negative caching, exact version validation and
bounded history. All use controlled upstream responses and make no real OSS
requests.
