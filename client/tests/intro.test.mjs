import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readClientFile = (pathname) => readFile(new URL(pathname, import.meta.url), 'utf8');

test('persists the homepage intro decision before React starts', async () => {
  const [html, boot] = await Promise.all([
    readClientFile('../index.html'),
    readClientFile('../public/boot.js'),
  ]);

  // The production CSP disallows inline scripts, so boot logic must be served
  // from the same origin and loaded before the React module.
  assert.match(html, /<script src="\/boot\.js"><\/script>/);
  assert.doesNotMatch(html, /<script>\s*\(function/);
  assert.ok(html.indexOf('/boot.js') < html.indexOf('/src/main.jsx'));
  assert.match(boot, /var showIntro = path === '\/'/);
  assert.match(boot, /window\.__VILLA_INTRO__ = showIntro/);
  assert.match(boot, /if \(showIntro\) \{\s*root\.classList\.add\('is-intro'\)/);
});

test('uses the stable boot flag throughout the intro lifecycle', async () => {
  const [motion, app] = await Promise.all([
    readClientFile('../src/lib/motion.js'),
    readClientFile('../src/App.jsx'),
  ]);

  assert.match(motion, /window\.__VILLA_INTRO__ === true/);
  assert.match(motion, /window\.__VILLA_INTRO__ = false/);
  assert.match(app, /useState\(\(\) => introState\.active\)/);
});
