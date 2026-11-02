import { normalizeBuildVersion } from '@/lib/release-builds';
import { getBuilds } from '@/lib/releases.server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const input = new URL(request.url).searchParams.get('version')?.trim();
  const studioInput = new URL(request.url).searchParams.get('studioVersion')?.trim();
  let version: string | undefined;
  let studioVersion: string | undefined;
  try {
    version = input ? normalizeBuildVersion(input) : undefined;
    studioVersion = studioInput ? normalizeBuildVersion(studioInput) : undefined;
  } catch {
    return Response.json({ error: '请输入有效版本号，例如 v4.34.0。' }, { status: 400 });
  }
  try {
    return Response.json(await getBuilds(version, studioVersion), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Local build catalog unavailable', error);
    return Response.json({ error: '构建清单暂不可用，请稍后重试。' }, {
      status: 503, headers: { 'Cache-Control': 'no-store' },
    });
  }
}
