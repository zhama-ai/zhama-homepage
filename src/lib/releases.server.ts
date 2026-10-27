import 'server-only';
import { loadLocalReleaseData, localBuilds, localDownloads, type LocalReleaseData } from './release-data';

// Data is immutable within a deployment. Each deployment loads its own files;
// there is no network access, revalidation, or cache shared with older releases.
let localData: Promise<LocalReleaseData> | undefined;
function releases() {
  if (!localData) localData = loadLocalReleaseData().catch(error => { localData = undefined; throw error; });
  return localData;
}

export async function getBuilds(version?: string) {
  return localBuilds(await releases(), version);
}

export async function getDownloadCatalog() {
  return localDownloads(await releases());
}

export const getDownloadInfo = async () => {
  try { return (await getDownloadCatalog()).desktop; }
  catch (error) { console.error('Local download catalog unavailable', error); return null; }
};
