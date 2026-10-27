import { loadLocalReleaseData } from '../src/lib/release-data.ts';

const { index, clients, servers } = await loadLocalReleaseData();
console.log(`Local releases validated: ${clients.size} client catalogs, ${servers.size} server packages, ${index.versions.length} versions`);
