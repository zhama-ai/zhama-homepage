import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const motionCss = readFileSync(fileURLToPath(new URL('../src/styles/hero-motion.css', import.meta.url)), 'utf8');

function keyframes(name) {
  const match = motionCss.match(new RegExp(`@keyframes ${name}\\{([^}]*(?:\\}[^@}]*)*)\\}`));
  assert.ok(match, `Missing ${name} keyframes`);
  return match[0];
}

test('business trend, order and revenue-driver charts share one reveal window', () => {
  for (const name of ['tego-trend-draw', 'tego-orders-reveal', 'tego-driver-reveal']) {
    const animation = keyframes(name);
    assert.match(animation, /0%,6%(?:,100%)?\{/);
    assert.match(animation, /50%,94%\{/);
  }
});
