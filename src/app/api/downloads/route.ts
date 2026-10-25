import { getDownloadCatalog } from '@/lib/download';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await getDownloadCatalog(), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
