import type { APIRoute, GetStaticPaths } from 'astro';
import { releaseBuilds } from '../../../../shared/release-builds.mjs';
import { releaseData } from '../../../../shared/release-store.mjs';

/** Static /api/builds payloads: one per indexed TeGo release, plus latest. */
export const getStaticPaths = (async () => {
  const { index } = await releaseData();
  return [...index.versions, 'latest'].map(version => ({ params: { version } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const data = await releaseData();
  const payload = releaseBuilds(data, params.version === 'latest' ? undefined : params.version);
  return new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
