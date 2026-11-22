import { mkdir, rename, readdir, link, unlink, open, lstat, chmod } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const MAX_RECORD_BYTES = 131072;

export class LeadStore {
  constructor(directory) { this.directory = directory; }
  file(id) {
    if (typeof id !== 'string' || !UUID.test(id)) throw Object.assign(new Error('Invalid lead identifier'), { code: 'INVALID_LEAD_ID' });
    return path.join(this.directory, `${id.toLowerCase()}.json`);
  }
  async prepare() {
    await mkdir(this.directory, { recursive: true, mode: 0o700 });
    const info = await lstat(this.directory);
    if (!info.isDirectory() || info.isSymbolicLink()) throw Object.assign(new Error('Invalid lead storage directory'), { code: 'INVALID_STORAGE_DIRECTORY' });
    if (process.platform !== 'win32' && (info.mode & 0o777) !== 0o700) await chmod(this.directory, 0o700);
  }
  async get(id) {
    const filename = this.file(id);
    await this.prepare();
    let handle;
    try {
      handle = await open(filename, constants.O_RDONLY | (constants.O_NOFOLLOW || 0));
      const info = await handle.stat();
      if (!info.isFile() || info.size > MAX_RECORD_BYTES) throw Object.assign(new Error('Invalid lead record'), { code: 'INVALID_LEAD_RECORD' });
      return JSON.parse(await handle.readFile('utf8'));
    }
    catch (error) { if (error.code === 'ENOENT') return null; throw error; }
    finally { await handle?.close(); }
  }
  async write(lead, { create = false } = {}) {
    const destination = this.file(lead?.id);
    await this.prepare();
    const temporary = path.join(this.directory, `.${randomUUID()}.tmp`);
    try {
      const handle = await open(temporary, 'wx', 0o600);
      try { await handle.writeFile(JSON.stringify(lead)); await handle.sync(); }
      finally { await handle.close(); }
      if (create) await link(temporary, destination);
      else await rename(temporary, destination);
    } finally { await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; }); }
  }
  async list() {
    await this.prepare();
    return (await readdir(this.directory)).filter(name => name.endsWith('.json') && UUID.test(name.slice(0, -5))).map(name => name.slice(0, -5));
  }
}
