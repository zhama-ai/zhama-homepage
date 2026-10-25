import { validCatalog, type DownloadInfo, type MobileRelease } from '@/lib/download';
import { BUILD_BRANDS, buildCatalogUrl, buildReleaseMatrix, normalizeBuildVersion, type BrandBuilds } from '@/lib/release-builds';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const input = new URL(request.url).searchParams.get('version')?.trim();
  let version: string | undefined;
  try {
    version = input ? normalizeBuildVersion(input) : undefined;
  } catch {
    return Response.json({ error: '请输入有效版本号，例如 v4.34.0。' }, { status: 400 });
  }
  const brands = await Promise.all(BUILD_BRANDS.map(async brand => {
    const errors: BrandBuilds['errors'] = {};
    const read = async (kind: 'desktop' | 'mobile') => {
      const url = buildCatalogUrl(brand.id, kind, version);
      try {
        const response = await fetch(url, {
          next: { revalidate: 60 }, signal: AbortSignal.timeout(15000),
        });
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: unknown = await response.json();
        if (!validCatalog(data, kind, brand.id)) throw new Error('Invalid release catalog');
        return data;
      } catch (error) {
        console.error(`Failed to read build catalog ${url}`, error);
        errors[kind] = '索引读取失败';
        return null;
      }
    };
    const [desktop, mobile] = await Promise.all([read('desktop'), read('mobile')]);
    return {
      ...brand, desktop: desktop as DownloadInfo | null,
      mobile: mobile as MobileRelease | null, errors,
    };
  }));
  return Response.json({ checkedAt: new Date().toISOString(), ...buildReleaseMatrix(brands, version) }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
