import 'server-only';
import { unstable_cache } from 'next/cache';
import { BUILD_BRANDS, buildReleaseMatrix, normalizeBuildVersion, readServerBuilds } from './release-builds';
import { readReleaseCatalog, probeReleaseArtifact, readBrandCatalogs, RELEASE_REVALIDATE_SECONDS } from './release-cache';

// Only concurrent fills share a promise here. Next's persistent Data Cache owns
// all stored values, expiration and background revalidation across requests.
const pending = new Map<string, Promise<unknown>>();
function singleFlight<T>(key: string, load: () => Promise<T>): Promise<T> {
  let promise = pending.get(key) as Promise<T> | undefined;
  if (!promise) {
    promise = load().finally(() => pending.delete(key));
    pending.set(key, promise);
  }
  return promise;
}

const getCatalog = unstable_cache(
  (brand: string, kind: 'desktop' | 'mobile', version?: string) =>
    singleFlight(`catalog:${brand}:${kind}:${version ?? 'latest'}`, () => readReleaseCatalog(brand, kind, version)),
  ['release-catalog-origin-v1'], { revalidate: RELEASE_REVALIDATE_SECONDS },
);
const probeArtifact = unstable_cache(
  (url: string) => singleFlight(`artifact:${url}`, () => probeReleaseArtifact(url)),
  ['release-artifact-origin-v1'], { revalidate: RELEASE_REVALIDATE_SECONDS },
);

export async function getBuilds(version?: string) {
  const normalized = version ? normalizeBuildVersion(version) : undefined;
  const entries = await Promise.all(BUILD_BRANDS.map(brand => readBrandCatalogs(brand, normalized, getCatalog)));
  const brands = entries.map(entry => entry.brand);
  if (brands.every(brand => brand.errors.desktop && brand.errors.mobile)) {
    throw new Error('All release catalogs are unavailable');
  }
  const matrix = buildReleaseMatrix(brands, normalized);
  return { ...matrix,
    checkedAt: entries.flatMap(entry => entry.checkedAt ? [entry.checkedAt] : []).sort()[0],
    server: await readServerBuilds(matrix.version, probeArtifact),
  };
}

export async function getDownloadCatalog() {
  const { brand, checkedAt } = await readBrandCatalogs(BUILD_BRANDS[0], undefined, getCatalog);
  return { desktop: brand.desktop, mobile: brand.mobile, checkedAt, errors: brand.errors };
}

export const getDownloadInfo = async () => {
  try { return (await getDownloadCatalog()).desktop; }
  catch (error) { console.error('Download cache unavailable', error); return null; }
};
