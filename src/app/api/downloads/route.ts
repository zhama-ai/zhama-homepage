import { getDownloadCatalog } from '@/lib/releases.server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const catalog = await getDownloadCatalog();
    const unavailable = !catalog.desktop && !catalog.mobile && Object.keys(catalog.errors).length > 0;
    return Response.json(catalog, {
      status: unavailable ? 503 : 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Local download catalog unavailable', error);
    return Response.json({ error: '下载清单暂不可用，请稍后重试。' }, {
      status: 503, headers: { 'Cache-Control': 'no-store' },
    });
  }
}
