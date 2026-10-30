import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  indexableRoutes,
  normalizeSeoPath,
  productionOrigin,
  seoForPath,
  seoPages,
  structuredDataForPath,
} from '../src/data/seo.js';

test('defines unique metadata and custom-domain canonicals for every public route', () => {
  const pages = Object.keys(seoPages).map((pathname) => seoForPath(pathname));
  assert.equal(new Set(pages.map(({ title }) => title)).size, pages.length);
  assert.equal(new Set(pages.map(({ description }) => description)).size, pages.length);

  for (const page of pages) {
    assert.ok(page.canonical.startsWith(`${productionOrigin}/`));
    assert.ok(!page.canonical.includes('netlify.app'));
    assert.ok(page.description.length >= 100);
  }
});

test('indexes conversion routes while excluding supporting and private routes', () => {
  assert.deepEqual(indexableRoutes, ['/', '/stay-options', '/gallery', '/inquiry']);
  assert.equal(seoForPath('/privacy').robots, 'noindex, follow');
  assert.equal(seoForPath('/admin/packages').robots, 'noindex, nofollow');
  assert.equal(seoForPath('/missing-page').robots, 'noindex, follow');
});

test('normalises trailing slashes without changing the homepage', () => {
  assert.equal(normalizeSeoPath('/'), '/');
  assert.equal(normalizeSeoPath('/gallery/'), '/gallery');
  assert.equal(seoForPath('/gallery/').canonical, `${productionOrigin}/gallery`);
});

test('publishes truthful lodging structured data only on the homepage', () => {
  const data = structuredDataForPath('/');
  const lodging = data['@graph'].find((item) => item['@type'] === 'LodgingBusiness');
  assert.equal(lodging.name, 'Villa Cinnamoon Castle');
  assert.equal(lodging.telephone, '+94761007686');
  assert.equal(lodging.geo.latitude, 6.1416876);
  assert.ok(!('aggregateRating' in lodging));
  assert.equal(structuredDataForPath('/gallery'), null);
});

test('routes crawlers to page-specific HTML and returns real 404 responses', async () => {
  const netlify = await readFile(new URL('../../netlify.toml', import.meta.url), 'utf8');
  for (const pathname of ['/stay-options', '/gallery', '/inquiry', '/privacy']) {
    assert.ok(netlify.includes(`from = "${pathname}"`));
    assert.ok(netlify.includes(`to = "${pathname}/index.html"`));
  }
  assert.match(netlify, /from = "\/\*"\s+to = "\/404\.html"\s+status = 404/);
  assert.ok(netlify.includes('X-Robots-Tag = "noindex, nofollow"'));
  assert.ok(netlify.includes('to = "/admin/index.html"'));
});
