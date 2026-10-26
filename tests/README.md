# Release metadata cache

The existing Next.js 15 `unstable_cache` Data Cache stores each validated
brand/product/version catalog and each artifact HEAD result for 1800 seconds.
`/api/downloads`, `/api/builds`, and `DownloadSection` share those keys. Browser
code only reads same-origin APIs; installer links retain their published CDN URL.

There is no additional service, environment variable, startup prewarm, or timer.
After 30 minutes the next visit receives cached data while Next revalidates in
the background. With no visits there is no refresh. Network/HTTP/validation
failures reject the cached loader, so Next retains its last successful entry.
Only a real 404 becomes a cached absence. Cold failures return per-feed errors
(or API 503 if none are available), and can be retried on the next request.

Server metadata reads use the release publisher's existing OSS acceleration
endpoint: bucket `zhama-public` from `tego-os/configs/release-storage.json` and
endpoint `oss-accelerate.aliyuncs.com` from its release scripts. The CDN and
origin catalogs were compared byte-for-byte before switching server reads.
No private keys or new configuration are required. Vercel-origin connectivity
still needs online verification; a successful local probe does not prove it.

Historical versions have separate cache keys and exact-version validation.
Catalogs and artifact states are cached independently: downloads read only the
two official catalogs, and build queries additionally read other brands and
probe exact server package/checksum paths. `checkedAt` is the oldest successful
catalog check among the entries shown, rather than the current request time.

Run `pnpm test`, `pnpm typecheck`, and `pnpm build` with Node 22.6+.
Verify native caching using a production server: warm both APIs, block upstream
reads, and repeat the requests. Restart the process and verify the Data Cache
still serves them. Age a local cache file past 1800 seconds and verify stale
responses remain fast during failed background revalidation, followed by
recovery when upstream reads are restored. Do not emulate the cache in tests.
