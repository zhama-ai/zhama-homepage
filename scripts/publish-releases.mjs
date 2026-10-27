#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { appendFile, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { synchronize } from './sync-releases.mjs';

const exec = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Each attempt gets a disposable worktree. A rejected concurrent push must
// regenerate metadata from OSS on the new main, never rebase an old snapshot.
export async function publishReleases({ repository = ROOT, sync = synchronize } = {}) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'zhama-release-publish-'));
  const checkout = path.join(temporary, 'checkout');
  async function git(cwd, ...args) {
    const { stdout } = await exec('git', args, { cwd, timeout: 120000, maxBuffer: 1024 * 1024 });
    return stdout.trim();
  }
  try {
    for (let attempt = 1; attempt <= 5; attempt++) {
      await git(repository, 'fetch', 'origin', 'refs/heads/main:refs/remotes/origin/main');
      const base = await git(repository, 'rev-parse', 'origin/main');
      await git(repository, 'worktree', 'add', '--detach', checkout, base);
      try {
        const result = await sync({ write: true, destination: path.join(checkout, 'data/releases') });
        await git(checkout, 'add', '--', 'data/releases');
        if (!(await git(checkout, 'diff', '--cached', '--name-only'))) {
          return { ...result, changed: false, commit: base, attempts: attempt };
        }
        const args = ['commit', '-m', 'chore: sync release metadata'];
        if (process.env.GITHUB_ACTIONS === 'true') {
          args.push('-m', `Source: ${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`);
        }
        await git(checkout, ...args);
        const commit = await git(checkout, 'rev-parse', 'HEAD');
        try {
          await git(checkout, 'push', 'origin', 'HEAD:refs/heads/main');
          return { ...result, commit, attempts: attempt };
        } catch (error) {
          await git(repository, 'fetch', 'origin', 'refs/heads/main:refs/remotes/origin/main');
          if (await git(repository, 'rev-parse', 'origin/main') === base) throw error;
          console.warn(`Homepage main advanced during synchronization; retrying from fresh sources (${attempt}/5)`);
        }
      } finally {
        await git(repository, 'worktree', 'remove', '--force', checkout);
      }
    }
    throw new Error('Homepage main kept changing; synchronization was not pushed after 5 attempts');
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 2) throw new Error('Usage: node --experimental-strip-types scripts/publish-releases.mjs');
  try {
    const result = await publishReleases();
    console.log(JSON.stringify(result, null, 2));
    if (process.env.GITHUB_STEP_SUMMARY) {
      await appendFile(process.env.GITHUB_STEP_SUMMARY, [
        `Homepage release metadata: ${result.changed ? 'updated' : 'already current'}.`,
        `Default version: ${result.defaultVersion}; client catalogs: ${result.clientCatalogs}; server packages: ${result.serverPackages}.`,
        `[Homepage commit](https://github.com/zhama-ai/zhama-homepage/commit/${result.commit})`,
        ...(result.incomplete.length ? [`Incomplete packages excluded: ${result.incomplete.join(', ')}`] : []),
        '',
      ].join('\n\n'));
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
