// Generates responsive AVIF + WebP + JPEG renditions of the curated Phase 1 media
// into public/media and writes a manifest consumed by <ResponsiveImage>.
// Run with: npm run media            (every item)
//          npm run media -- name ...  (only the named items; the manifest is merged)
//          npm run media -- --force   (rebuild files that already exist)
//
// Every item gets a ladder of widths up to a 2560px long edge, so a browser never
// has to jump to the 8K master (DEC-033). The master is still written, and listed
// in the manifest as `full`, but it is not part of the srcset.
import sharp from 'sharp';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EIGHT_K_LONG_EDGE = 7680;
// Widths added to every item so the ladder has no gap below the master.
const LADDER = [1440, 1920, 2560];
const LADDER_LONG_EDGE = 2560;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(root, '..', 'images');
const outDir = path.join(root, 'public', 'media');
const manifestPath = path.join(root, 'src', 'data', 'media-manifest.json');

// crop: fractions of the source image { top, bottom, left, right } to keep.
const media = [
  { name: 'hero-arrival', file: 'hero/villa-arrival-hero-8k.jpg', widths: [960, 1440, 1920, 2560, 3200, 3840] },
  // Tighter framing of the same 8K photograph, centred on the villa facade (Stay Options).
  { name: 'villa-facade', file: 'hero/villa-arrival-hero-8k.jpg', widths: [960, 1440, 1920, 2560, 3200], crop: { left: 0.42, top: 0.16, bottom: 0.74 } },
  { name: 'living-downstairs', file: 'living_rooms/living_room_1/living_room_1_06.jpg', widths: [480, 720, 960] },
  { name: 'living-mezzanine', file: 'living_rooms/living_room_2/living_room_2_04.jpg', widths: [480, 800, 1200] },
  { name: 'sleeping-prepared', file: 'bedrooms/bedroom_1/bedroom_1_04.jpg', widths: [480, 720, 960] },
  { name: 'sleeping-high-ceiling', file: 'bedrooms/bedroom_4/bedroom_4_03.jpg', widths: [480, 720, 960] },
  { name: 'kitchen', file: 'kitchen_and_dining/full_kitchen/full_kitchen_01.jpg', widths: [600, 900, 1200] },
  // Bottom strip carries a phone-camera watermark; keep the top 88 %.
  { name: 'dining', file: 'kitchen_and_dining/dining_area/dining_area_01.jpg', widths: [480, 800, 1200], crop: { bottom: 0.88 } },
  { name: 'outdoor-garden', file: 'outdoor_and_garden/backyard/backyard_01.jpg', widths: [600, 900, 1200] },
  { name: 'outdoor-veranda', file: 'outdoor_and_garden/porch/porch_01.jpg', widths: [480, 720, 960] },
  { name: 'nearby-coast', file: 'nearby_attractions_and_activities/attraction_08.jpg', widths: [480, 720] },
  { name: 'nearby-reef', file: 'nearby_attractions_and_activities/attraction_01.jpg', widths: [480, 720] },
  { name: 'arrival-gate', file: 'Uncategorized/photo_7.jpg', widths: [480, 720, 960] },
  // Gallery page additions (curated; no watermarks, visible branding or close-up guest faces).
  { name: 'exterior-night', file: 'outdoor_and_garden/exterior/exterior_07.jpg', widths: [480, 720] },
  { name: 'villa-sign', file: 'outdoor_and_garden/exterior/exterior_08.jpg', widths: [480, 720, 960] },
  { name: 'front-yard', file: 'outdoor_and_garden/front_yard/front_yard_01.jpg', widths: [480, 720, 960] },
  { name: 'living-overlook', file: 'living_rooms/living_room_2/living_room_2_08.jpg', widths: [480, 720] },
  { name: 'living-seating', file: 'living_rooms/living_room_1/living_room_1_01.jpg', widths: [480, 720, 960] },
  { name: 'upstairs-lounge', file: 'living_rooms/living_room_2/living_room_2_02.jpg', widths: [480, 800, 1200] },
  { name: 'dining-stairs', file: 'kitchen_and_dining/dining_area/dining_area_05.jpg', widths: [480, 720] },
  { name: 'sleeping-four-poster', file: 'bedrooms/bedroom_1/bedroom_1_07.jpg', widths: [480, 720, 960] },
  { name: 'sleeping-white', file: 'bedrooms/bedroom_4/bedroom_4_04.jpg', widths: [480, 720, 960] },
  { name: 'sleeping-leaf-print', file: 'bedrooms/bedroom_3/bedroom_3_01.jpg', widths: [480, 720] },
  { name: 'sleeping-towels', file: 'bedrooms/bedroom_1/bedroom_1_01.jpg', widths: [480, 720, 960] },
  { name: 'balcony-doorway', file: 'outdoor_and_garden/balcony/balcony_03.jpg', widths: [480, 720, 960] },
  { name: 'balcony-exterior', file: 'outdoor_and_garden/balcony/balcony_04.jpg', widths: [480, 800, 1200] },
  { name: 'garden-palms', file: 'outdoor_and_garden/backyard/backyard_02.jpg', widths: [480, 720, 960] },
  { name: 'nearby-kayaks', file: 'nearby_attractions_and_activities/attraction_11.jpg', widths: [480, 780] },

  // Home page rework: cinematic masters, already graded during generation (grade: false).
  ...[
    ['home-living-mezzanine', 'Villa_interior_mezzanine_view_2K.jpg', [960, 1440, 1920, 2560]],
    ['home-living-lounge', 'living_room_2_03.jpg_2K.jpg'],
    ['home-living-upstairs-dining', 'living_room_2_05.jpg_2K.png'],
    ['home-living-downstairs', 'living_room_1_03.jpg_2K.png'],
    ['home-living-stair-light', 'living_room_1_05.jpg_2K.png'],
    ['home-living-entrance', 'living_room_1_07.jpg_2K.jpg'],
    ['home-living-stairs', 'photo_6.jpg_2K.png'],
    ['home-bed-check-throw', 'bedroom_1_02_enhanced.png'],
    ['home-bed-four-poster', 'bedroom_1_09_enhanced.png'],
    ['home-bed-towels', 'bedroom_2_02_enhanced.png'],
    ['home-bed-ac', 'bedroom_2_05_enhanced.png'],
    ['home-bed-leaf-print', 'bedroom_3_01_enhanced_straight.png'],
    ['home-bed-leaf-grey', 'bedroom_3_02.jpg_2K.jpg'],
    ['home-bed-mirror', 'bedroom_3_04_enhanced_straight.png', [480, 720, 960, 1440]],
    ['home-bed-pendant', 'bedroom_4_03_enhanced_straight.png'],
    ['home-bed-white', 'bedroom_4_04_enhanced.png'],
    ['home-bathroom', 'bathroom_2K.jpg'],
    ['home-kitchen', 'full_kitchen_cinematic_wide.png'],
    ['home-dining', 'dining_area_03.jpg_2K.jpg'],
    ['home-dining-stairs', 'dining_area_05_enhanced.png'],
    ['home-porch', 'porch_cinematic_wide.png'],
    ['home-balcony-exterior', 'balcony_04_enhanced.png'],
    ['home-villa-sign', 'exterior_08_enhanced.png'],
    ['home-balcony-walk', 'backyard_01_enhanced.png', [480, 720, 960, 1440]],
    ['home-nearby-reef', 'attraction_01_enhanced.jpg'],
    ['home-nearby-turtle', 'attraction_02_enhanced.jpg'],
    ['home-nearby-kayaks', 'attraction_07_enhanced.jpg', [480, 720, 960, 1440]],
    ['home-nearby-coast', 'attraction_08_enhanced.jpg'],
  ].map(([name, file, widths = [480, 720, 960, 1440]]) => ({
    name,
    file: `Final Homepage 8K masters and videos/${file}`,
    widths,
    grade: false,
  })),

  // Gallery second set: enhanced from the remaining good photographs (prompts section 9).
  ...[
    ['gal-front-yard', 'front_yard_01'],
    ['gal-night', 'exterior_07'],
    ['gal-driveway', 'photo_7'],
    ['gal-palms', 'backyard_02'],
    ['gal-balcony-door', 'balcony_03'],
    ['gal-balcony-walkway', 'balcony_11'],
    ['gal-living-from-above', 'living_room_1_04'],
    ['gal-upstairs-dining', 'photo_2'],
    ['gal-bed-timber', 'photo_3'],
    ['gal-bed-four-poster', 'bedroom_1_07'],
  ].map(([name, source]) => ({
    name,
    file: `Enhanced/${source}-enhanced-4k.jpg`,
    widths: [480, 720, 960, 1440],
    grade: false,
  })),
];

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((arg) => !arg.startsWith('--'));
const exists = (file) => access(file).then(() => true, () => false);
const selected = only.length ? media.filter((item) => only.includes(item.name)) : media;

await mkdir(outDir, { recursive: true });
const manifest = only.length ? JSON.parse(await readFile(manifestPath, 'utf8')) : {};

// A restrained, non-generative grade for the website photographs. These are
// global pixel operations only: no object removal, replacement, reframing or
// synthetic detail is introduced. The originals in /images remain untouched.
const enhance = (pipeline) => pipeline
  .modulate({ brightness: 1, saturation: 0.95 })
  .linear(1.045, -5)
  .sharpen(0.75, 0.55, 1.05);

for (const item of selected) {
  const input = path.join(source, item.file);
  const meta = await sharp(input).rotate().metadata();
  let width = meta.autoOrient?.width ?? meta.width;
  let height = meta.autoOrient?.height ?? meta.height;

  let region = null;
  if (item.crop) {
    const { top = 0, bottom = 1, left = 0, right = 1 } = item.crop;
    region = {
      left: Math.round(width * left),
      top: Math.round(height * top),
      width: Math.round(width * (right - left)),
      height: Math.round(height * (bottom - top)),
    };
    width = region.width;
    height = region.height;
  }

  const scale = EIGHT_K_LONG_EDGE / Math.max(width, height);
  const enhancedWidth = Math.round(width * scale);
  const enhancedHeight = Math.round(height * scale);
  // Served widths: the item's own, plus the shared ladder while the long edge stays within 2560px.
  const ladder = LADDER.filter((w) => w > Math.max(...item.widths) && (w * Math.max(width, height)) / width <= LADDER_LONG_EDGE);
  const widths = [...new Set([...item.widths, ...ladder])].sort((a, b) => a - b);

  for (const w of [...widths, enhancedWidth]) {
    const base = () => {
      let pipeline = sharp(input).rotate();
      if (region) pipeline = pipeline.extract(region);
      pipeline = pipeline.resize({ width: w, kernel: sharp.kernel.lanczos3 });
      return item.grade === false ? pipeline : enhance(pipeline);
    };
    const isEightK = w === enhancedWidth;
    const write = async (ext, encode) => {
      const file = path.join(outDir, `${item.name}-${w}.${ext}`);
      if (force || !(await exists(file))) await encode(base()).toFile(file);
    };
    await write('webp', (image) => image.webp({ quality: isEightK ? 88 : 82, effort: 5 }));
    await write('jpg', (image) => image.jpeg({ quality: isEightK ? 92 : 86, progressive: true, mozjpeg: true }));
    // AVIF is only made for the served widths; the master is kept as WebP and JPEG.
    if (!isEightK) await write('avif', (image) => image.avif({ quality: 58, effort: 4 }));
  }

  manifest[item.name] = { width: enhancedWidth, height: enhancedHeight, widths, full: enhancedWidth };
  console.log(`${item.name}: ${width}x${height} -> ${enhancedWidth}x${enhancedHeight} (8K long edge); widths ${widths.join(', ')}`);
}

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
