# Local release metadata

The homepage ships `data/releases/` in Git and in its production bundle. Both
APIs and the homepage download section read only these local files. There is
no upstream fetch, HEAD probe, timer, or Next Data Cache for release metadata.
Installer URLs continue to use the published CDN and Apple addresses.

With Node 22.6+ and the publisher's existing `ossutil` credentials:

```sh
pnpm sync:releases          # read and validate sources, preview only
pnpm sync:releases --write  # replace local data after complete validation
pnpm test
pnpm typecheck
pnpm build                 # validates local release data before Next builds
```

Synchronization reads only the canonical `releases/<brand>/<kind>/latest.json`
and `<version>/index.json`, plus server packages matching the current
`tego-os/<version>/tego-<product>-<kind>-<version>-<arch>.tar` naming contract.
Migration backups, legacy client directories and legacy server archive names
are ignored. Catalog bytes are preserved. Server packages require a matching
`.sha256` with the exact filename; only those small checksum bodies are read,
never the package bodies. OSS sizes and metadata ETags are checked while reading.

The default build version is the highest semantic version in the synchronized
files, including server-only versions. Explicit version queries read exact
snapshots and never borrow links from latest or another version. Downloads
retain the original official latest catalogs, including older platform targets.
A latest target with no historical snapshot does not create a synthetic one.

The synchronization stages and validates a complete snapshot before replacing
the local directory. Failures leave the previous snapshot intact. Identical
source data preserves `updatedAt` and produces no changes. Commit the resulting
files normally; the existing Git integration handles deployment. The one-time
synchronization does not yet wire automatic synchronization into release CI.

Production verification: block outbound CDN/OSS access and confirm both APIs
and `/builds.html` and `/zh/download` still work, including historical and
unknown versions. Inspect the Next standalone output and API trace manifests
to confirm `data/releases/` is included. Check the pages in a real browser.
