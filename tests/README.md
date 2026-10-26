# Release metadata cache

Run `pnpm test` with Node 22.6+, then `pnpm typecheck` and `pnpm build`.

Production keeps the homepage on Vercel. Set `RELEASE_CACHE_BASE_URL` to the
resident shared service (see `.env.example`). Vercel instrumentation never starts
an OSS refresh or a timer. Its API routes and server components only read the
shared service. Missing configuration or service failure produces an explicit
503 from the APIs, without an OSS fallback. Homepage rendering can omit download
cards if the service is unavailable.

The separate Node service starts with the last validated snapshot from its
Docker volume, refreshes in the background on startup and every 30 minutes,
and atomically saves the latest snapshot. It refreshes all four brands' desktop
and mobile catalogs plus exact server package/checksum HEAD results, even with
no visitors. Warm reads use the previous snapshot while refresh is running.
Each failed feed retains its last valid data; a 404 authoritatively removes it.
Corrupt snapshots are rejected. Historical versions fill once on first lookup,
share concurrent jobs, and refresh on the same timer; at most 16 are kept in
memory. The latest snapshot is persisted across restarts.

`/api/downloads`, `/api/builds`, and `DownloadSection` use the same service.
Browsers only read same-origin APIs. Installer downloads still use the published
artifact URLs. `checkedAt` is the actual refresh time. API responses use
`Cache-Control: no-store` to expose the service's current snapshot.

For local development or a resident Next Docker deployment without
`RELEASE_CACHE_BASE_URL`, instrumentation prewarms an in-process cache. This mode
is explicitly disabled on Vercel.

Tests use controlled upstream responses, including scheduling without traffic,
concurrent fills, slow refreshes, stale recovery, snapshot restoration, negative
caching, exact versions, bounded history, and shared-service failures.
