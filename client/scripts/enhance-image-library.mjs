// Creates non-generative 8K website masters for the active /images library.
// Originals are never modified. Run with: node scripts/enhance-image-library.mjs
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const TARGET_LONG_EDGE = 7680;
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const SOURCE_ROOT = path.join(PROJECT_ROOT, 'images');
const OUTPUT_ROOT = path.join(SOURCE_ROOT, '8k-enhanced');
const EXCLUDED_TOP_LEVEL = new Set(['_duplicates_backup', '8k-enhanced']);
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg']);
const WORKERS = 2;

const sha256 = async (file) => createHash('sha256').update(await readFile(file)).digest('hex');

async function findImages(directory, relative = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!relative && entry.isDirectory() && EXCLUDED_TOP_LEVEL.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const nextRelative = path.join(relative, entry.name);

    if (entry.isDirectory()) files.push(...await findImages(absolute, nextRelative));
    else if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push({ absolute, relative: nextRelative });
    }
  }

  return files;
}

const enhance = (pipeline) => pipeline
  // Restrained global grade only; no masks, crops, compositing or generative edits.
  .modulate({ brightness: 1, saturation: 0.95 })
  .linear(1.045, -5)
  .sharpen(0.8, 0.65, 1.15);

async function processImage(file, index, total) {
  // Some phone-exported JPEGs have a truncated end marker while remaining
  // visually decodable. Tolerant loading recovers their existing pixels only.
  const metadata = await sharp(file.absolute, { failOn: 'none' }).rotate().metadata();
  const sourceWidth = metadata.autoOrient?.width ?? metadata.width;
  const sourceHeight = metadata.autoOrient?.height ?? metadata.height;
  const scale = TARGET_LONG_EDGE / Math.max(sourceWidth, sourceHeight);
  const width = Math.round(sourceWidth * scale);
  const height = Math.round(sourceHeight * scale);
  const output = path.join(OUTPUT_ROOT, file.relative.replace(/\.jpeg$/i, '.jpg'));

  await mkdir(path.dirname(output), { recursive: true });
  let outputMetadata;
  try {
    outputMetadata = await sharp(output).metadata();
    if (Math.max(outputMetadata.width, outputMetadata.height) !== TARGET_LONG_EDGE) outputMetadata = null;
  } catch {
    outputMetadata = null;
  }

  if (!outputMetadata) {
    await rm(output, { force: true });
    await enhance(
      sharp(file.absolute, { failOn: 'none' })
        .rotate()
        .resize({ width, height, fit: 'fill', kernel: sharp.kernel.lanczos3 }),
    )
      .jpeg({
        quality: 92,
        progressive: true,
        chromaSubsampling: '4:4:4',
        mozjpeg: true,
        trellisQuantisation: true,
        overshootDeringing: true,
        optimiseScans: true,
      })
      .toFile(output);
    outputMetadata = await sharp(output).metadata();
  }
  const result = {
    source: file.relative.replaceAll('\\', '/'),
    output: path.relative(SOURCE_ROOT, output).replaceAll('\\', '/'),
    sourceDimensions: `${sourceWidth}x${sourceHeight}`,
    outputDimensions: `${outputMetadata.width}x${outputMetadata.height}`,
    sourceSha256: await sha256(file.absolute),
    treatment: 'global cinematic grade + Lanczos3 upscale + controlled sharpening; no crop or generative edit',
  };

  console.log(`[${index + 1}/${total}] ${result.source} -> ${result.outputDimensions}`);
  return result;
}

const files = (await findImages(SOURCE_ROOT)).sort((a, b) => a.relative.localeCompare(b.relative));
const results = new Array(files.length);
let nextIndex = 0;

async function worker() {
  while (nextIndex < files.length) {
    const index = nextIndex++;
    results[index] = await processImage(files[index], index, files.length);
  }
}

await mkdir(OUTPUT_ROOT, { recursive: true });
await Promise.all(Array.from({ length: Math.min(WORKERS, files.length) }, () => worker()));

const report = {
  generatedAt: new Date().toISOString(),
  sourceRoot: SOURCE_ROOT,
  outputRoot: OUTPUT_ROOT,
  targetLongEdge: TARGET_LONG_EDGE,
  count: results.length,
  originalsModified: false,
  excludedDirectories: [...EXCLUDED_TOP_LEVEL],
  files: results,
};

await writeFile(path.join(OUTPUT_ROOT, 'enhancement-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Completed ${results.length} images. Originals remain untouched.`);
