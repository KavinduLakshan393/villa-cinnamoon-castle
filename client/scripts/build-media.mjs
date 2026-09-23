// Generates responsive WebP + JPEG renditions of the curated Phase 1 media
// into public/media and writes a manifest consumed by <ResponsiveImage>.
// Run with: npm run media
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  { name: 'arrival-gate', file: 'photo_7.jpg', widths: [480, 720, 960] },
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
];

await mkdir(outDir, { recursive: true });
const manifest = {};

for (const item of media) {
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

  const widths = item.widths.filter((w) => w <= width);
  if (!widths.includes(width) && widths.length < item.widths.length) widths.push(width);

  for (const w of widths) {
    const base = () => {
      let pipeline = sharp(input).rotate();
      if (region) pipeline = pipeline.extract(region);
      return pipeline.resize({ width: w, withoutEnlargement: true });
    };
    await base().webp({ quality: 80 }).toFile(path.join(outDir, `${item.name}-${w}.webp`));
    await base().jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(path.join(outDir, `${item.name}-${w}.jpg`));
  }

  manifest[item.name] = { width, height, widths };
  console.log(`${item.name}: ${width}x${height} -> ${widths.join(', ')}`);
}

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
