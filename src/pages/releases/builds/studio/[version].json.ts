import type { APIRoute, GetStaticPaths } from 'astro';
import { studioBuilds, studioVersions } from '../../../../../shared/release-builds.mjs';
import { releaseData } from '../../../../../shared/release-store.mjs';

/** Studio follows its own release stream; each published Studio release has one matrix. */
export const getStaticPaths = (async () => studioVersions(await releaseData()).map(version => ({ params: { version } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const payload = studioBuilds(await releaseData(), params.version!);
  return new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
