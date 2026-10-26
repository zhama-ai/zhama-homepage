export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { releaseCache } = await import('./lib/releases.server');
    await releaseCache.start();
  }
}
