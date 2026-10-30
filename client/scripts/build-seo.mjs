import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  indexableRoutes,
  notFoundPage,
  productionOrigin,
  seoForPath,
  seoPages,
  structuredDataForPath,
} from '../src/data/seo.js';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(scriptDir, '../dist');
const templatePath = path.join(outputDir, 'index.html');
const template = await readFile(templatePath, 'utf8');
const headPattern = /\s*<!-- seo:head:start -->[\s\S]*?<!-- seo:head:end -->/;

if (!headPattern.test(template)) {
  throw new Error('SEO head markers were not found in the Vite output.');
}

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function renderHead(seo, structuredData, { includeCanonical = true } = {}) {
  const tags = [
    '<!-- seo:head:start -->',
    `    <title>${escapeHtml(seo.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="robots" content="${escapeHtml(seo.robots)}" />`,
  ];

  if (includeCanonical) {
    tags.push(`    <link rel="canonical" href="${escapeHtml(seo.canonical)}" />`);
  }

  tags.push(
    `    <meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    '    <meta property="og:type" content="website" />',
    ...(includeCanonical ? [`    <meta property="og:url" content="${escapeHtml(seo.canonical)}" />`] : []),
    `    <meta property="og:image" content="${escapeHtml(seo.image)}" />`,
    '    <meta property="og:image:alt" content="Villa Cinnamoon Castle near Hikkaduwa" />',
    '    <meta property="og:image:width" content="1920" />',
    '    <meta property="og:image:height" content="1080" />',
    '    <meta property="og:site_name" content="Villa Cinnamoon Castle" />',
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(seo.image)}" />`,
    '    <meta name="twitter:image:alt" content="Villa Cinnamoon Castle near Hikkaduwa" />',
  );

  if (structuredData) {
    const json = JSON.stringify(structuredData).replaceAll('<', '\\u003c');
    tags.push(`    <script type="application/ld+json" data-seo-structured>${json}</script>`);
  }

  tags.push('    <!-- seo:head:end -->');
  return `\n${tags.join('\n')}`;
}

function renderPage(pathname, options) {
  const seo = options?.seo ?? seoForPath(pathname);
  const structuredData = options?.structuredData ?? structuredDataForPath(pathname);
  return template.replace(headPattern, renderHead(seo, structuredData, options));
}

for (const pathname of Object.keys(seoPages)) {
  const html = renderPage(pathname);
  if (pathname === '/') {
    await writeFile(templatePath, html);
    continue;
  }

  const directory = path.join(outputDir, pathname.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
}

const adminDirectory = path.join(outputDir, 'admin');
await mkdir(adminDirectory, { recursive: true });
await writeFile(
  path.join(adminDirectory, 'index.html'),
  renderPage('/admin', {
    structuredData: null,
    includeCanonical: false,
  }),
);

const notFoundSeo = {
  ...notFoundPage,
  image: seoForPath('/').image,
};
await writeFile(
  path.join(outputDir, '404.html'),
  renderPage('/404', {
    seo: notFoundSeo,
    structuredData: null,
    includeCanonical: false,
  }),
);

const sitemapEntries = indexableRoutes
  .map((pathname) => `  <url><loc>${productionOrigin}${pathname === '/' ? '/' : pathname}</loc></url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${productionOrigin}/sitemap.xml
`;

await writeFile(path.join(outputDir, 'sitemap.xml'), sitemap);
await writeFile(path.join(outputDir, 'robots.txt'), robots);

console.log(`Generated SEO HTML for ${Object.keys(seoPages).length} public routes, an admin noindex shell, sitemap.xml, robots.txt, and 404.html.`);
