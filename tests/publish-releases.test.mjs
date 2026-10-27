import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { promisify } from 'node:util';
import { publishReleases } from '../scripts/publish-releases.mjs';

const exec = promisify(execFile);
async function git(cwd, ...args) {
  return (await exec('git', args, { cwd })).stdout.trim();
}
async function fixture(t) {
  const root = await realpath(await mkdtemp(path.join(os.tmpdir(), 'release-publish-test-')));
  t.after(() => rm(root, { recursive: true, force: true }));
  const remote = path.join(root, 'origin.git');
  await git(root, 'init', '--bare', '--initial-branch=main', remote);
  const repository = path.join(root, 'publisher');
  await git(root, 'clone', remote, repository);
  await git(repository, 'config', 'user.name', 'Release test');
  await git(repository, 'config', 'user.email', 'release@example.test');
  await writeFile(path.join(repository, 'README.md'), 'original code\n');
  await git(repository, 'add', '.');
  await git(repository, 'commit', '-m', 'test: initialize');
  await git(repository, 'push', 'origin', 'main');
  const other = path.join(root, 'other-publisher');
  await git(root, 'clone', remote, other);
  await git(other, 'config', 'user.name', 'Other publisher');
  await git(other, 'config', 'user.email', 'other@example.test');
  const base = await git(repository, 'rev-parse', 'HEAD');
  return { repository, remote, other, base };
}
async function snapshot({ destination }, value) {
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, 'index.json'), value + '\n');
  return { changed: true, defaultVersion: value, clientCatalogs: 2, serverPackages: 1, incomplete: [] };
}

test('publishing commits only release data, preserves the caller checkout and produces no duplicate commit', async t => {
  const { repository, remote, base } = await fixture(t);
  await writeFile(path.join(repository, 'README.md'), 'uncommitted caller work\n');
  const sync = options => snapshot(options, 'v4.36.0');
  const first = await publishReleases({ repository, sync });
  assert.equal(first.changed, true);
  assert.equal(await git(remote, 'show', 'main:data/releases/index.json'), 'v4.36.0');
  assert.equal(await git(remote, 'diff', '--name-only', base, 'main'), 'data/releases/index.json');
  assert.equal(await git(repository, 'rev-parse', 'HEAD'), base);
  assert.equal(await readFile(path.join(repository, 'README.md'), 'utf8'), 'uncommitted caller work\n');
  const second = await publishReleases({ repository, sync });
  assert.equal(second.changed, false);
  assert.equal(second.commit, first.commit);
  assert.equal(await git(remote, 'rev-list', '--count', 'main'), '2');
});

test('a concurrent push regenerates data from fresh sources and preserves intervening code changes', async t => {
  const { repository, other, remote } = await fixture(t);
  let reads = 0;
  const result = await publishReleases({ repository, sync: async options => {
    reads++;
    if (reads === 1) {
      await writeFile(path.join(other, 'README.md'), 'concurrent code change\n');
      await git(other, 'add', 'README.md');
      await git(other, 'commit', '-m', 'fix: concurrent code');
      await git(other, 'push', 'origin', 'main');
    }
    return snapshot(options, reads === 1 ? 'stale source' : 'v4.37.0');
  } });
  assert.equal(reads, 2);
  assert.equal(result.attempts, 2);
  assert.equal(await git(remote, 'show', 'main:README.md'), 'concurrent code change');
  assert.equal(await git(remote, 'show', 'main:data/releases/index.json'), 'v4.37.0');
  assert.equal(await git(repository, 'worktree', 'list', '--porcelain'),
    `worktree ${repository}\nHEAD ${await git(repository, 'rev-parse', 'HEAD')}\nbranch refs/heads/main`);
});

test('source validation failure leaves the remote untouched and removes the temporary worktree', async t => {
  const { repository, remote, base } = await fixture(t);
  await assert.rejects(publishReleases({ repository, sync: async () => {
    throw new Error('Invalid checksum');
  } }), /Invalid checksum/);
  assert.equal(await git(remote, 'rev-parse', 'main'), base);
  assert.equal((await git(repository, 'worktree', 'list', '--porcelain')).split('worktree ').length - 1, 1);
});

test('a push permission failure is reported without retries or remote changes', async t => {
  const { repository, remote, base } = await fixture(t);
  await writeFile(path.join(remote, 'hooks/pre-receive'), '#!/bin/sh\nexit 1\n', { mode: 0o755 });
  let reads = 0;
  await assert.rejects(publishReleases({ repository, sync: options => {
    reads++;
    return snapshot(options, 'v4.36.0');
  } }), /pre-receive hook declined/);
  assert.equal(reads, 1);
  assert.equal(await git(remote, 'rev-parse', 'main'), base);
});

test('persistent concurrent changes stop after five attempts without pushing an outdated snapshot', async t => {
  const { repository, other, remote } = await fixture(t);
  let reads = 0;
  await assert.rejects(publishReleases({ repository, sync: async options => {
    await writeFile(path.join(other, 'README.md'), `concurrent change ${++reads}\n`);
    await git(other, 'add', 'README.md');
    await git(other, 'commit', '-m', `fix: concurrent change ${reads}`);
    await git(other, 'push', 'origin', 'main');
    return snapshot(options, 'stale source');
  } }), /not pushed after 5 attempts/);
  assert.equal(reads, 5);
  assert.equal(await git(remote, 'ls-tree', '--name-only', 'main'), 'README.md');
});
