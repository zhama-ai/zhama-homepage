export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startReleaseCache } = await import('./lib/releases.server');
    await startReleaseCache();
  }
}
