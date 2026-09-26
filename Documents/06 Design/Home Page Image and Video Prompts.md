# Villa Cinnamoon Castle — Home Page Image and Video Prompts

**Purpose:** Generation prompts for the reworked Home page imagery. Each photograph is enhanced into a cinematic, professional-camera version. Three composite shots and one balcony cinemagraph are also created.
**Tool assumption:** An image model that edits a supplied reference photo, such as Gemini/Imagen in Google Flow, and Veo "Frames to Video" for the cinemagraph.
**Date:** 2026-09-25

---

## 0. How to use these prompts

### 0.1 Workflow for every image

1. Open the image model in **image-editing / reference-image mode**. Attach the source photo. Do **not** use plain text-to-image: the reference photo is what protects the real villa.
2. Paste the **Prompt** and the **Avoid** text for that image.
3. Set the listed **aspect ratio** and the highest available resolution (4K).
4. Generate 3–4 variations. Compare each against the original at 100% zoom (see 0.3).
5. Upscale the chosen result to **8K** (7680 px on the long edge) in a second step. Upscaling in the same step as the enhancement invents detail.

### 0.2 Decisions applied to every prompt

| Decision | Rule |
|---|---|
| Aspect ratio | Kept at, or cropped from, the original ratio. Changing portrait to landscape forces the model to invent surroundings (outpainting), so it is never used on single-photo enhancements. |
| Wide angle | Most originals are phone ultra-wide shots with barrel distortion and tilted verticals. The prompts ask for **distortion correction and straight verticals**, as an architectural photographer would, not a wider field of view. "Wide angle" is requested only where a wider view is needed (the three composites). |
| Lighting | Same time of day and the same light sources (windows, sky, the villa's own lamps). Only exposure, contrast, colour and the glow of existing lamps are improved. |
| Fidelity | Every object keeps its position, shape, size, colour, material and count. Nothing is added, removed or restyled. Phone-camera watermarks are the only thing removed. |

### 0.3 Acceptance check (compare with the original)

- Same furniture pieces, in the same number and position, with the same fabric patterns (curtains, bed covers, cushions)
- Same doors, windows, lamps, switches, ceiling beams and railings
- No new plants, decor, artwork, rugs, people or animals
- Nothing that looks like a staged hotel: no extra towels, flowers or props

### 0.4 Honest-representation note

Guests book this real villa from these photos. The three **composite** shots (mezzanine, kitchen, porch) combine several photos into a viewpoint that was never photographed. Check every detail in them against the originals, and replace them with a real photograph taken from that angle when possible.

---

## 1. Shared living — enhanced photos

**Use on page:** Shared living mosaic (six images in multi-speed parallax columns).

### 1.1 `living_room_2_03` — upstairs lounge with cane chairs
- **Aspect ratio:** 4:5 portrait (cropped from the 3:4 original)
- **Lens:** 24 mm equivalent; correct ultra-wide distortion; vertical lines straight
- **Output:** 4K, then upscale to 8K

**Prompt**
```text
Enhance this exact photograph of the upstairs lounge of a real Sri Lankan villa into a cinematic, professional architectural interior photograph, as if shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the high vaulted ceiling with dark timber beams, the round woven rattan pendant lamp, the dark wooden door on the left, the grey blackout curtains and the floral sheer curtain, the wooden-and-cane lounge chairs and the small wooden table, the grey polished-concrete floor, the black steel railing with a timber handrail, the wall light, the doorway on the left and the window at the far end. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the ultra-wide lens distortion so that walls, doors and curtain lines are perfectly vertical; balance the exposure so that the far window is not blown out and the shadows keep detail; add soft, natural daylight from the windows and a warm, gentle glow from the existing pendant and wall lamps; keep the white walls clean and neutral; recover fine texture in the timber, cane weave, fabric and concrete; reduce noise; keep colours true to life. Calm, inviting, magazine-quality interior photography with a subtle cinematic contrast. Ultra-sharp, 4K.
```

**Avoid**
```text
new furniture, extra chairs, rugs, cushions, plants, flowers, vases, artwork, books, decor, people, pets, changed curtain pattern, changed ceiling beams, moved lamp, different lamp design, changed floor, extra windows or doors, wider or different room, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturated colours, orange cast, blown-out windows, crushed shadows, CGI, 3D render, illustration, painterly, text, logo, watermark
```

### 1.2 `living_room_2_05` — upstairs dining corner under the vaulted ceiling
- **Aspect ratio:** 4:5 portrait
- **Lens:** 24 mm equivalent; distortion corrected; verticals straight

**Prompt**
```text
Enhance this exact photograph of the upstairs dining corner of a real Sri Lankan villa into a cinematic, professional architectural interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the vaulted white ceiling with dark timber beams and the high clerestory window strip, the small pendant lamp, the wooden dining table with its wooden-and-cane chairs and the cane settee behind it, the grey curtains and the floral sheer curtain on the end window, the dark wooden doors and door frames on both sides, the small wall light, and the grey polished-concrete floor. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the ultra-wide distortion so that the doors, curtains and wall edges are perfectly vertical; balance the exposure between the bright end window and the darker foreground; add soft natural daylight falling from the end window across the floor and a warm glow from the existing pendant and wall lamps; keep the walls neutral white; bring out the timber grain, cane weave and fabric texture; reduce noise; keep colours natural. Calm, spacious, editorial interior photography with subtle cinematic contrast. Ultra-sharp, 4K.
```

**Avoid**
```text
new furniture, extra chairs, table settings, plates, food, flowers, vases, plants, rugs, cushions, artwork, decor, people, pets, changed curtains, changed ceiling, extra lamps, extra windows or doors, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, yellow cast, blown-out window, CGI, render, illustration, painterly, text, logo, watermark
```

### 1.3 `living_room_1_03` — ground-floor living room and staircase
- **Aspect ratio:** 4:5 portrait
- **Lens:** 20–24 mm equivalent; distortion corrected

**Prompt**
```text
Enhance this exact photograph of the ground-floor living room of a real Sri Lankan villa into a cinematic, professional architectural interior photograph, shot on a full-frame camera with a 20–24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the concrete staircase with its black steel balusters and timber handrail rising on the left, the warm wall lights on the stair wall, the row of antique wooden armchairs with cane seats and backs along the far wall, the grey and floral curtains on the windows behind them, the round ceiling downlights, the white walls, and the glossy white floor tiles. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that walls, window frames and curtain lines are vertical; balance the exposure so the windows keep detail; add soft natural daylight through the curtains and a warm glow from the existing wall lights on the staircase; add a subtle, true reflection of the chairs in the polished floor; bring out the timber and cane texture; keep the walls clean white; reduce noise; keep colours natural. Bright, calm, welcoming editorial interior photography with gentle cinematic depth. Ultra-sharp, 4K.
```

**Avoid**
```text
new furniture, extra or fewer armchairs, sofa, rug, coffee table, cushions, plants, artwork, decor, people, pets, changed staircase, changed railing, changed curtains, extra lights, extra windows or doors, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, blown-out windows, CGI, render, illustration, painterly, text, logo, watermark
```

### 1.4 `living_room_1_05` — staircase seen from above
- **Aspect ratio:** 4:5 portrait
- **Lens:** 24 mm equivalent; distortion corrected
- **Note:** The source file is flagged as damaged in the Content Inventory (premature end of the JPEG data). Check its bottom edge before use. If part of the image is missing, crop it away; do not ask the model to invent it.

**Prompt**
```text
Enhance this exact photograph of the staircase of a real Sri Lankan villa, seen from the upper landing, into a cinematic, professional architectural interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same staircase, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the concrete stair treads, the black steel balusters and the timber handrail on the right, the single up-and-down wall light on the left wall casting two soft beams, the small light at the landing, the white walls and the curtain edge at the top right. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion while keeping the dramatic top-down perspective; balance the exposure; make the existing wall light cast a warm, clean, symmetrical glow up and down the white wall; bring out the texture of the stair treads, steel and timber; keep the walls neutral white; reduce noise; keep colours natural. Minimal, architectural, cinematic interior detail photography with soft contrast. Ultra-sharp, 4K.
```

**Avoid**
```text
new objects, plants, decor, artwork, carpet or runner on the stairs, people, pets, changed railing design, changed stairs, extra lights, extra windows, outpainted areas, invented image content in damaged areas, fisheye distortion, HDR halos, oversaturation, orange cast, CGI, render, illustration, painterly, text, logo, watermark
```

### 1.5 `living_room_1_07` — ground-floor seating by the entrance door
- **Aspect ratio:** 4:5 portrait
- **Lens:** 24 mm equivalent; distortion corrected

**Prompt**
```text
Enhance this exact photograph of the ground-floor seating area of a real Sri Lankan villa into a cinematic, professional architectural interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the row of antique wooden armchairs with cane seats along the left wall, the grey and floral curtains on the windows, the dark-red wooden entrance door with its ventilation panel, the grey curtain on the right, the square ceiling light, the white walls, and the glossy white floor tiles. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the door, the walls and the curtain lines are vertical; balance the exposure; add soft natural daylight through the curtains; add a subtle, true floor reflection; bring out the timber, cane and fabric texture; keep the walls clean white; reduce noise; keep colours natural. Bright, calm, editorial interior photography with gentle cinematic contrast. Ultra-sharp, 4K.
```

**Avoid**
```text
new furniture, extra or fewer chairs, sofa, rug, table, cushions, plants, artwork, decor, people, pets, changed door, changed curtains, extra lights, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, blown-out windows, CGI, render, illustration, painterly, text, logo, watermark
```

### 1.6 `photo_6` — staircase and seating, ground floor
- **Aspect ratio:** 4:5 portrait
- **Lens:** 20–24 mm equivalent; distortion corrected

**Prompt**
```text
Enhance this exact photograph of the ground-floor staircase and seating area of a real Sri Lankan villa into a cinematic, professional architectural interior photograph, shot on a full-frame camera with a 20–24 mm lens on a tripod.

Keep exactly the same space, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the concrete staircase on the left with its timber handrail and black steel balusters, the upper stair landing and its railing, the brown curtain at the top left, the antique wooden armchairs with cane seats at the back, the blue-grey and floral curtains on the windows, the round ceiling downlights, the white walls and the white floor tiles. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that walls and the stair structure are vertical; balance the exposure and remove the cool blue cast so the whites are neutral; add soft natural daylight through the curtains and a warm glow on the stair wall; bring out the texture of the stair treads, timber and cane; reduce noise; keep colours natural. Bright, calm, editorial interior photography with gentle cinematic depth. Ultra-sharp, 4K.
```

**Avoid**
```text
new furniture, extra or fewer chairs, rug, plants, artwork, decor, people, pets, changed staircase, changed railing, changed curtains, extra lights, extra windows, outpainted areas, fisheye distortion, tilted verticals, blue cast, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

---

## 2. Shared living — composite: the double-height mezzanine

**References to attach (all four):** `living_room_2_08`, `living_room_2_10`, `living_room_2_12`, `living_room_2_13`
**Aspect ratio:** **3:4 portrait**. A vertical frame is the only way to show both floors and the double-height void in one image.
**Lens:** **Wide angle, 16–18 mm equivalent**, perspective-corrected (the one place a wider view is justified)
**Use on page:** Lead image of the Shared living section

**Prompt**
```text
Create one cinematic, photorealistic architectural interior photograph of the double-height mezzanine of a real Sri Lankan villa, using only the four attached reference photos of the same space. It must look like a single frame captured on a full-frame camera with a 16–18 mm wide-angle lens on a tripod, with perspective correction, by a professional architectural photographer.

Viewpoint: standing at the top of the staircase on the upper landing, looking across the open void. The upper-floor mezzanine fills the upper two-thirds of the frame, and the ground-floor dining area is visible below through the void, so the viewer understands that the two floors are connected by one open, double-height space.

Show only what exists in the reference photos, exactly as it appears there: the vaulted white ceiling with dark timber beams meeting at a ridge, the woven rattan pendant lamps and the warm wall lights; the upper floor with its light timber-look floor, the wooden dining table with wooden-and-cane chairs and the cane settee, the grey blackout curtains and the white floral sheer curtains; the black square steel posts and horizontal steel railings with a timber handrail around the void; and, below, the ground floor with its white tiles, the dark wooden dining table with chairs, the grey curtains and the black refrigerator. Keep every object's shape, colour, material, count and position consistent with the references. Do not add any furniture, decor, plant, artwork, rug, light or person that is not in the references.

Lighting: soft natural daylight from the windows on both floors, balanced exposure between the brighter ground floor and the warmer upper floor, and a gentle warm glow from the existing pendant and wall lamps. Neutral white walls, true-to-life colours, cinematic but natural contrast, fine texture in timber, cane, steel and fabric. Ultra-sharp, noise-free, 4K.
```

**Avoid**
```text
invented furniture, extra chairs, sofas, rugs, plants, flowers, artwork, decor, extra lamps, chandelier, extra windows or doors, glass balustrade, different railing design, different ceiling, different stair design, additional floors, people, pets, impossible geometry, floating objects, duplicated objects, warped railings, bent beams, fisheye distortion, tilted verticals, HDR halos, oversaturation, orange cast, CGI, 3D render, illustration, painterly, text, logo, watermark
```

---

## 3. Sleeping — enhanced photos

**Use on page:** Sleeping mosaic. The images appear together as one sleeping experience, with no room names or numbers.
**Shared settings:** 4:5 portrait for portrait originals; 4:3 landscape for `bedroom_3_04`. 24 mm equivalent, distortion corrected, verticals straight.

### 3.1 `bedroom_1_02` — double bed with a check throw under the timber ceiling
**Prompt**
```text
Enhance this exact photograph of a bedroom in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the dark wooden double bed and headboard, the white striped bed linen, the two white pillows, the yellow-and-black check throw across the bed, the two rolled and folded white towels, the grey-and-white striped curtains on the left, the sloped ceiling with dark timber beams and the high window strip, and the warm plain walls. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls and curtains are vertical; balance the exposure; add soft natural daylight from the window and the high window strip, falling gently across the bed; keep the linen crisp white; bring out the timber grain and fabric texture; reduce noise; keep colours natural. Calm, restful, editorial bedroom photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
extra pillows, cushions, throws, towels, bedside tables, lamps, rugs, plants, flowers, artwork, decor, headboard change, changed bed linen pattern, changed curtains, people, pets, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, yellow cast, CGI, render, illustration, painterly, text, logo, watermark
```

### 3.2 `bedroom_1_09` — four-poster bed seen through the doorway
**Prompt**
```text
Enhance this exact photograph of a bedroom with a four-poster bed in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the dark wooden four-poster bed frame with its white pillow and white linen, the blue-and-white patterned curtain in the left foreground, the open dark wooden door on the right, the sloped ceiling with dark timber beams, the single warm pendant bulb, and the pale walls. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the bed posts and the door are vertical; balance the exposure and neutralise the strong yellow-and-blue colour cast; keep a soft, warm glow from the existing pendant bulb and soft daylight from the doorway; keep the linen white; bring out the timber texture; reduce noise; keep colours natural. Calm, atmospheric, editorial bedroom photography with gentle cinematic depth. Ultra-sharp, 4K.
```
**Avoid**
```text
mosquito net, canopy fabric, extra pillows, cushions, throws, rugs, bedside tables, lamps, plants, flowers, artwork, decor, changed bed frame, changed curtain pattern, people, pets, extra windows or doors, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 3.3 `bedroom_2_02` — twin beds with rolled towels (remove watermark)
**Prompt**
```text
Enhance this exact photograph of a bedroom in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the two beds pushed together with a dark wooden headboard, the white striped linen, the white pillows, the three rolled white towels, the glass-block window high on the wall, and the white walls. Do not add, remove, move, replace or restyle anything.

Remove only the "TECNO SPARK" phone-camera watermark in the lower-left corner, rebuilding the white bed linen behind it seamlessly.

Improve only the photographic quality: correct the lens distortion so that the wall edges are vertical; balance the exposure; add soft natural daylight through the glass-block window; keep the linen crisp white with visible fabric texture; reduce noise; keep colours natural. Bright, clean, restful editorial bedroom photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
watermark, logo, text, extra pillows, cushions, throws, towels, bedside tables, lamps, rugs, plants, flowers, artwork, decor, changed headboard, changed window, people, pets, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, blue cast, CGI, render, illustration, painterly
```

### 3.4 `bedroom_2_05` — A/C bedroom with a wooden bed
**Prompt**
```text
Enhance this exact photograph of an air-conditioned bedroom in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the dark wooden double bed with white linen and white pillows, the folded white towels, the wall-mounted air conditioner above, the round warm wall light, the grey-and-white striped curtains on the left, the standing fan, the dark wooden cupboard, the white walls, and the light timber-look floor. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls, curtains and cupboard are vertical; balance the exposure; add soft natural daylight through the curtains and a warm glow from the existing wall light; keep the linen white; bring out the timber texture; reduce noise; keep colours natural. Clean, calm, editorial bedroom photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
removing the air conditioner or fan, extra pillows, cushions, throws, rugs, bedside tables, lamps, plants, flowers, artwork, decor, changed bed, changed curtains, people, pets, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 3.5 `bedroom_3_01` — leaf-print bed cover and wooden dresser
**Prompt**
```text
Enhance this exact photograph of a bedroom in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the dark wooden double bed with the navy leaf-print bed cover and matching pillows, the rolled white towels, the wooden dresser with drawers in the left foreground, the warm wall light, the ceiling light, the arched wooden door with a glass panel, the grey curtain, the white walls, and the pale tiled floor. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls and the door are vertical; balance the exposure; add soft natural daylight and a warm glow from the existing wall light; keep the leaf print sharp and its colours true; bring out the timber grain; reduce noise; keep colours natural. Calm, warm, editorial bedroom photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
changed bed cover pattern, extra pillows, cushions, throws, rugs, bedside lamps, plants, flowers, artwork, decor, objects on the dresser, changed door, people, pets, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 3.6 `bedroom_3_02` — leaf-print bed and grey throw (close view)
**Prompt**
```text
Enhance this exact photograph of a bedroom in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the dark wooden double bed with the navy leaf-print bed cover and pillows, the grey throw across the foot of the bed, the rolled white towels, the arched wooden door with a glass panel, the dark wooden cupboard, the wall switch, the ceiling light, and the white walls. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls, door and cupboard are vertical; balance the exposure; add soft natural daylight; keep the leaf print sharp and its colours true; bring out the fabric and timber texture; reduce noise; keep colours natural. Calm, restful, editorial bedroom photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
changed bed cover, extra pillows, cushions, throws, rugs, lamps, plants, flowers, artwork, decor, changed door, changed cupboard, people, pets, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 3.7 `bedroom_3_04` — bedroom with a mirror and a curtained window (landscape)
- **Aspect ratio:** 4:3 landscape (as the original)

**Prompt**
```text
Enhance this exact photograph of a bedroom in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the bed with white linen and the navy patterned throw in the foreground, the grey-and-white striped curtains on the window, the tall dark wooden cupboard, the wooden-framed mirror on the wall, the black metal clothes rack, the open wooden door leading to the bathroom, the ceiling light fitting, the white walls, and the pale floor. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls, door and cupboard are vertical; balance the exposure; add soft natural daylight through the curtains; keep the linen white; bring out the timber texture; reduce noise; keep colours natural. Calm, bright, editorial bedroom photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
extra pillows, cushions, throws, rugs, lamps, plants, flowers, artwork, decor, clothes on the rack, changed mirror, changed door, people, pets, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 3.8 `bedroom_4_03` — high timber ceiling and pendant light
**Prompt**
```text
Enhance this exact photograph of a bedroom with a high timber ceiling in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the sloped ceiling with dark timber beams, the warm pendant bulb, the dark wooden double bed with the navy leaf-print cover, the blue-and-white patterned curtain in the right foreground, the grey-and-white striped curtains on the left, the dark wooden cupboard on the left, the small wall mirror, the wall fan and the pale walls. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls and cupboard are vertical; balance the exposure; keep a warm, cosy glow from the existing pendant bulb and soft daylight through the curtains; keep the leaf print sharp; bring out the timber texture; reduce noise; keep colours natural. Warm, atmospheric, editorial bedroom photography with gentle cinematic depth. Ultra-sharp, 4K.
```
**Avoid**
```text
changed bed cover, extra pillows, cushions, throws, rugs, lamps, plants, flowers, artwork, decor, changed ceiling, changed curtains, people, pets, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, orange cast, CGI, render, illustration, painterly, text, logo, watermark
```

### 3.9 `bedroom_4_04` — white bed under the timber ceiling
**Prompt**
```text
Enhance this exact photograph of a bedroom in a real Sri Lankan villa into a cinematic, professional interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the carved dark wooden double bed with white linen and two white pillows, the sloped ceiling with dark timber beams and the high window strip, the ceiling light, the grey-and-white striped curtains and the blue window behind them, the dark wooden door frame on the right, and the warm cream walls. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls and the door frame are vertical; balance the exposure; add soft natural daylight through the window and the high window strip; keep the linen crisp white; bring out the timber grain; reduce noise; keep colours natural. Calm, restful, editorial bedroom photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
extra pillows, cushions, throws, towels, rugs, bedside tables, lamps, plants, flowers, artwork, decor, changed bed, changed ceiling, changed curtains, people, pets, extra windows, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

---

## 4. Kitchen & dining

### 4.1 `dining_area_03` — dining table, refrigerator and curtains
- **Aspect ratio:** 4:5 portrait · 24 mm equivalent, distortion corrected

**Prompt**
```text
Enhance this exact photograph of the ground-floor dining area of a real Sri Lankan villa into a cinematic, professional architectural interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the dark wooden dining table with its wooden chairs, the tall black refrigerator, the grey curtains and the white floral sheer curtain, the dark door frame on the left with the black curtain rod, the staircase edge with the steel railing on the right, the wall-mounted items, the ceiling downlights, the white walls and the glossy white floor tiles. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls, doorframe and curtains are vertical; balance the exposure; add soft natural daylight through the curtains; add a subtle, true floor reflection; bring out the timber grain; reduce noise; keep colours natural. Bright, clean, editorial interior photography with gentle cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
table settings, plates, food, flowers, vases, plants, rugs, cushions, artwork, decor, extra chairs, changed table, changed refrigerator, people, pets, extra windows or doors, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 4.2 `dining_area_05` — dining table at the foot of the staircase
- **Aspect ratio:** 4:5 portrait · 24 mm equivalent, distortion corrected

**Prompt**
```text
Enhance this exact photograph of the ground-floor dining area of a real Sri Lankan villa into a cinematic, professional architectural interior photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same room, the same camera position and the same framing. Every object stays exactly where it is, with the same shape, size, colour, material and count: the long dark wooden dining table with its wooden chairs in the foreground, the concrete staircase on the left, the row of antique wooden armchairs with cane seats in the living area behind, the grey and floral curtains, the grey curtain on the right, the wall switches, the ceiling light, the white walls and the glossy white floor tiles. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the walls, staircase and curtains are vertical; balance the exposure; add soft natural daylight through the curtains; add a true reflection of the table in the polished floor; bring out the timber grain; reduce noise; keep colours natural. Bright, welcoming, editorial interior photography with gentle cinematic depth. Ultra-sharp, 4K.
```
**Avoid**
```text
table settings, plates, food, drinks, bottles, flowers, vases, plants, rugs, artwork, decor, extra chairs, changed staircase, people, pets, extra windows or doors, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 4.3 Composite: the whole kitchen, wide
**References to attach (all three):** `full_kitchen_01`, `full_kitchen_04`, `photo_4`
**Aspect ratio:** **3:2 landscape.** The kitchen is a long galley, and a landscape frame from its entrance shows its full length.
**Lens:** **Wide angle, 16–18 mm equivalent**, perspective-corrected

**Prompt**
```text
Create one cinematic, photorealistic, wide-angle architectural photograph of the entire kitchen of a real Sri Lankan villa, using only the three attached reference photos of the same kitchen. It must look like a single frame captured on a full-frame camera with a 16–18 mm wide-angle lens on a tripod, with perspective correction, by a professional architectural photographer.

Viewpoint: standing near the entrance at one end of the kitchen, at eye level, looking along its length, so the whole counter, the window and the door at the far end are visible in one frame.

Show only what exists in the reference photos, exactly as it appears there: the long light-wood countertop along the wall with its light-wood splashback panel, the two-burner gas stove, the white rice cooker, the electric kettle, the dish rack with plates, the utensil holder and the cookware on the counter, the stainless steel sink; the dark wooden window with slatted shutters and the patterned grey curtain; the wall shelf; the grey top-loading washing machine; the dark wooden door at the end; the plain white walls; and the grey timber-look floor. Keep every item's shape, colour, material, count and position consistent with the references. Do not add or remove any appliance, cabinet, utensil, decor, plant or object.

Lighting: soft natural daylight from the window falling across the counter, balanced exposure, clean neutral white walls, true-to-life colours, subtle cinematic contrast, fine texture in the wood, steel and floor. Ultra-sharp, noise-free, 4K.
```

**Avoid**
```text
invented cabinets, upper cupboards, kitchen island, extra appliances, microwave, oven, range hood, bar stools, plants, fruit bowls, food, flowers, decor, artwork, changed countertop, changed window, changed door, removed washing machine, removed appliances, people, pets, luxury show-kitchen styling, marble, impossible geometry, duplicated objects, warped counter, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, 3D render, illustration, painterly, text, logo, watermark
```

---

## 5. Outside

### 5.1 `balcony_04` — curved upstairs balcony seen from the garden
- **Aspect ratio:** 4:5 portrait · 24 mm equivalent, verticals straight

**Prompt**
```text
Enhance this exact photograph of the exterior of a real Sri Lankan villa, showing its curved upstairs balcony among the trees, into a cinematic, professional architectural photograph, shot on a full-frame camera with a 24 mm tilt-shift-style lens on a tripod.

Keep exactly the same building, the same camera position and the same framing. Every element stays exactly where it is, with the same shape, size, colour, material and count: the white two-storey walls, the curved white balcony with its vertical slot openings, the upstairs window, the dark timber roof eaves and the grey roof tiles, the corrugated veranda roof edge, the white pillar, the dark wooden window with slatted shutters and the black wall lamps on the ground floor, the trees and palms around the house, and the sky. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the perspective so that the walls and the pillar are vertical; balance the exposure between the bright sky and the shaded walls; enhance the warm, soft late-afternoon sunlight on the white walls and through the leaves; keep the walls clean white; bring out the texture of the leaves, roof tiles and timber; reduce noise; keep colours natural. Calm, fresh, editorial architectural photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
new plants, flowers, balcony furniture, people, pets, birds, changed balcony shape, changed windows, changed roof, extra floors, pool, fountain, painted walls, changed trees, dramatic sky replacement, sunset colours, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 5.2 `exterior_08` — the Villa Cinnamoon Castle roadside sign at dusk
- **Aspect ratio:** 4:5 portrait · 35 mm equivalent

**Prompt**
```text
Enhance this exact photograph of the roadside sign of a real villa in Sri Lanka, at dusk, into a cinematic, professional photograph, shot on a full-frame camera with a 35 mm lens.

Keep exactly the same scene, the same camera position and the same framing. Every element stays exactly where it is, with the same shape, size, colour, material and count: the dark hanging sign reading "Villa Cinnamoon Castle" in white script, its black metal post and bracket, the overhead power lines, the green shrubs and trees on the right, the road with the tuk-tuk and the buildings on the left, the paving in the foreground, and the pink-and-blue evening sky with clouds. Keep the sign's lettering exactly as it is. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: balance the exposure between the sky and the darker foreground; keep the soft pink-and-gold dusk light; make the lettering on the sign crisp and legible; bring out the texture of the leaves; reduce noise; keep colours natural. Calm, atmospheric, editorial travel photography with gentle cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
changed sign text, misspelled lettering, new signs, logos, extra vehicles, people, removed power lines, sky replacement, dramatic sunset, lens flare, changed buildings, changed trees, outpainted areas, fisheye distortion, HDR halos, oversaturation, CGI, render, illustration, painterly, watermark
```

### 5.3 `backyard_01` — balcony walkway with banana and coconut palms
- **Aspect ratio:** 4:3 landscape (as the original) · 24 mm equivalent

**Prompt**
```text
Enhance this exact photograph taken from the upstairs balcony of a real Sri Lankan villa into a cinematic, professional architectural photograph, shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same view, the same camera position and the same framing. Every element stays exactly where it is, with the same shape, size, colour, material and count: the white balcony wall and the concrete walkway running away from the camera, the dark timber roof eaves and the gutter above, the white wall and the dark window frame on the left, the banana plants, coconut palms and tropical trees beyond the wall, the bright green paddy field in the distance, and the sky. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: correct the lens distortion so that the vertical edges are straight; balance the exposure between the bright sky and the shaded walkway; enhance the warm, soft late-morning sunlight on the leaves and the white wall; bring out the texture of the banana leaves and palm fronds; reduce noise; keep colours natural. Fresh, green, peaceful editorial photography with soft cinematic contrast. Ultra-sharp, 4K.
```
**Avoid**
```text
balcony furniture, plants in pots, people, pets, birds, changed balcony wall, changed roof, sky replacement, dramatic clouds, water, pool, changed trees, extra buildings, outpainted areas, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, render, illustration, painterly, text, logo, watermark
```

### 5.4 Composite: the porch (veranda pavilion), wide and descriptive
**Main reference:** `porch_01`. **Supporting references** (for the house, roof style and garden only): `exterior_01`, `photo_1`, `balcony_04`
**Aspect ratio:** **3:2 landscape.** A wider frame shows the porch roof, the floor and the garden beyond, so the viewer understands the space.
**Lens:** **Wide angle, 20 mm equivalent**, perspective-corrected; camera at chest height

**Prompt**
```text
Create one cinematic, photorealistic, wide-angle architectural photograph of the covered porch (veranda pavilion) of a real Sri Lankan villa, based on the attached main reference photo of the porch and using the other attached photos only to stay consistent with the villa's real architecture and garden. It must look like a single frame captured on a full-frame camera with a 20 mm wide-angle lens on a tripod at chest height, with perspective correction, by a professional architectural photographer.

Viewpoint: standing just inside the porch, beside the house wall, looking outwards across the porch floor to the garden, so that the viewer clearly sees the whole porch: its pitched ceiling with the dark timber rafters meeting at the ridge, the white round pillar supporting it, the grey tiled floor, the dark wooden window with slatted shutters and the white wall of the house along one side, and the open side leading out to the garden.

Show only what exists in the references, exactly as it appears there: the white ceiling boards and dark timber rafters, the single white pillar, the grey floor tiles, the white house wall with the dark wooden shuttered window and the black wall lamp, and, beyond the porch, the garden with the boundary wall, the green plants, the red-brown earth and the trees. Keep every element's shape, colour, material, count and position consistent with the references. Do not add furniture, plants in pots, decor, lights, people or anything else not visible in the references.

Lighting: bright, soft late-morning daylight; dappled leaf shadows on the porch floor; balanced exposure between the shaded porch and the sunny garden; clean white walls; true-to-life colours; subtle cinematic contrast; fine texture in the timber, tiles and leaves. Ultra-sharp, noise-free, 4K.
```

**Avoid**
```text
porch furniture, chairs, loungers, hammock, rugs, potted plants, lanterns, string lights, decor, people, pets, footwear, laundry, pool, fountain, water feature, changed roof structure, extra pillars, changed floor, changed window, luxury resort styling, invented buildings, impossible geometry, duplicated objects, fisheye distortion, tilted verticals, HDR halos, oversaturation, CGI, 3D render, illustration, painterly, text, logo, watermark
```

---

## 6. Nearby

**Use on page:** Nearby section. Every image is labelled as a nearby experience, not a villa facility.

> **Consent and identity:** `attraction_02` and `attraction_07` show identifiable people. Use them only after the people shown have agreed to publication (Content Inventory rule). The prompts below keep every person exactly as photographed; a model must never alter or replace a real person's face or body.

### 6.1 `attraction_01` — snorkelling with striped reef fish
- **Aspect ratio:** 5:4 landscape (close to the 8:7 original) · underwater camera look

**Prompt**
```text
Enhance this exact underwater photograph of a snorkeller among striped reef fish near Hikkaduwa, Sri Lanka, into a cinematic, professional underwater photograph, as if shot on a full-frame camera in an underwater housing with a wide-angle lens.

Keep exactly the same scene, the same camera position and the same framing. Everything stays exactly where it is, with the same shape, size, colour and count: the snorkeller with the mask and snorkel, the school of black-and-yellow striped sergeant major fish, the sandy seabed and the rocks, and the sunlit water surface above. Keep the person exactly as photographed. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: restore the natural colour lost underwater with correct white balance; add clarity and gentle contrast; enhance the shimmering sunbeams through the surface; bring out the fish scales and the seabed texture; reduce noise and backscatter; keep the turquoise colours natural. Vivid but realistic, cinematic underwater photography. Ultra-sharp, 4K.
```
**Avoid**
```text
extra fish, different fish species, sharks, turtles, coral that is not there, extra people, changed person, changed face, changed mask, cartoon colours, neon water, oversaturation, HDR halos, CGI, render, illustration, painterly, text, logo, watermark
```

### 6.2 `attraction_02` — sea turtle in the shallows
- **Aspect ratio:** 4:5 portrait

**Prompt**
```text
Enhance this exact photograph of a sea turtle in the clear shallows of a beach near Hikkaduwa, Sri Lanka, into a cinematic, professional photograph shot on a full-frame camera with a 35 mm lens.

Keep exactly the same scene, the same camera position and the same framing. Everything stays exactly where it is, with the same shape, size, colour and count: the large green sea turtle with its patterned shell, the person in the water behind it, the clear shallow water and the sandy seabed. Keep the person exactly as photographed, including their face, body, swimwear and pose. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: add clarity to the water and to the turtle's shell pattern; balance the exposure; enhance the soft, natural sunlight and the ripples on the sandy seabed; reduce noise; keep the aqua colours natural. Fresh, bright, cinematic travel photography. Ultra-sharp, 4K.
```
**Avoid**
```text
changed person, changed face, changed body, changed swimwear, extra people, extra turtles, extra animals, changed turtle, coral, boats, cartoon colours, neon water, oversaturation, HDR halos, CGI, render, illustration, painterly, text, logo, watermark
```

### 6.3 `attraction_07` — group kayaking on the lagoon (selfie)
- **Aspect ratio:** 4:3 landscape (as the original)

**Prompt**
```text
Enhance this exact photograph of a group of friends kayaking on a calm lagoon near Hikkaduwa, Sri Lanka, into a cinematic, professional outdoor photograph shot on a full-frame camera with a 24 mm lens.

Keep exactly the same scene, the same camera position and the same framing. Everything stays exactly where it is, with the same shape, size, colour and count: every person, their faces, expressions, clothes and orange life jackets, the yellow kayaks and paddles, the calm lagoon water, the green forested shore on the left and the distant tree line, and the cloudy sky. Keep every person exactly as photographed. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: balance the exposure between the bright sky and the faces; enhance the soft natural daylight and the reflections on the water; bring out the texture of the water and the trees; reduce noise; keep skin tones and colours natural. Fresh, lively, cinematic travel photography. Ultra-sharp, 4K.
```
**Avoid**
```text
changed faces, changed people, beautified faces, extra people, removed people, changed life jackets, extra kayaks, boats, changed shoreline, sky replacement, dramatic sunset, cartoon colours, oversaturation, HDR halos, CGI, render, illustration, painterly, text, logo, watermark
```

### 6.4 `attraction_08` — rock pool and surf at sunset
- **Aspect ratio:** 4:5 portrait

**Prompt**
```text
Enhance this exact photograph of a natural rock pool on the south coast of Sri Lanka at sunset into a cinematic, professional landscape photograph shot on a full-frame camera with a 24 mm lens on a tripod.

Keep exactly the same scene, the same camera position and the same framing. Everything stays exactly where it is, with the same shape, size, colour and count: the person sitting on the rocks, the rocky coastline covered in moss and algae, the turquoise rock pool, the white surf pouring into it, the sea horizon, and the sunset sky with its clouds. Keep the person exactly as photographed. Do not add, remove, move, replace or restyle anything.

Improve only the photographic quality: balance the exposure between the bright sunset sky and the rocks; keep the warm golden light on the clouds; add clarity to the water and the textured rocks; reduce noise; keep colours natural rather than over-saturated. Calm, atmospheric, cinematic landscape photography. Ultra-sharp, 4K.
```
**Avoid**
```text
changed person, extra people, removed person, boats, buildings, sky replacement, extra sun, lens flare, changed coastline, cartoon colours, neon water, oversaturation, HDR halos, CGI, render, illustration, painterly, text, logo, watermark
```

---

## 7. New section: Balcony — cinemagraph with a quote

**Source image:** `images/outdoor_and_garden/balcony/balcony_10_landscape_8k.jpg` (7680 × 4320)
**Tool:** Google Flow → Frames to Video. Use the same image as both the **first frame** and the **last frame**. Length 8 s, highest-quality Veo model, 4 outputs.
**Processing afterwards:** the same pipeline as the hero video — stabilise, clean the static textures, crossfade into a seamless loop, silent H.264.

### 7.1 Desktop — 16:9
**Prompt**
```text
Seamless looping video. The first frame and the last frame of this clip are exactly the same image: the provided photograph. The clip starts on this image, comes gently to life, and returns precisely to this same image, so it can repeat endlessly without any visible jump.

Static shot from a professional camera fixed on a tripod. The frame stays exactly as in the provided image for the entire clip: the same framing, the same perspective, the same position of every object. It looks like a still photograph in which only the leaves and the light are alive.

A soft tropical breeze drifts through the scene, peaks gently in the middle of the clip and then fades away. The tall coconut palm fronds against the blue sky sway slowly. The leaves of the large tree and the banana leaves on the right flutter softly, each branch at a slightly different rhythm. Gentle sunlight flickers through the leaves.

The white curved balcony wall with its vertical openings, the timber roof eave at the top, the neighbouring white house with its red roof and railings, and the sky remain completely still and unchanged.

From about 6 seconds the breeze fades, and in the final second the scene is completely still: every leaf, frond and patch of light is back in exactly its original position. The last frame is identical to the first frame, pixel for pixel.

Real camera footage, natural bright daylight, constant exposure, true-to-life colours, real-time speed.
```

**Avoid**
```text
ending different from the start, last frame different from the first frame, visible jump at the loop point, cut, transition, camera movement, camera shake, vibration, jitter, handheld, pan, tilt, zoom, push-in, pull-out, dolly, orbit, crane, drone shot, parallax, perspective change, reframing, focus change, people, animals, birds, insects, falling leaves, clouds moving, sky change, rain, mist, smoke, flicker, exposure change, colour shift, warping, morphing, changing shapes, balcony wall moving, building changing, text, captions, subtitles, logos, watermark, time-lapse, slow motion, CGI, cartoon, painterly, oversaturated
```

### 7.2 Mobile — 9:16
**First and last frame:** `images/outdoor_and_garden/balcony/balcony_10_portrait_9x16_8k.jpg` (4320 × 7680). It is cut from the landscape 8K file at x = 3200–5630 (native 2430 × 4320) and Lanczos-upscaled to 8K portrait. The upscale adds no new content. The native crop is kept alongside as `balcony_10_portrait_9x16_native.jpg`.
**Frame content:** timber roof eave corner at the top left; the large tree with its branching trunk in the centre; the tall coconut palm at the top right against blue sky; the curved white balcony wall with two vertical slot openings across the bottom quarter.

**Prompt**
```text
Seamless looping vertical video. The first frame and the last frame of this clip are exactly the same image: the provided vertical photograph. The clip starts on this image, comes gently to life, and returns precisely to this same image, so it can repeat endlessly without any visible jump.

Static shot from a professional camera fixed on a tripod, in portrait orientation. The frame stays exactly as in the provided image for the entire clip: the same framing, the same perspective, the same position of every object. It looks like a still photograph in which only the leaves and the light are alive.

A soft tropical breeze drifts through the scene, peaks gently in the middle of the clip and then fades away. The tall coconut palm fronds at the top right sway slowly against the blue sky. The leaves of the large tree in the centre flutter softly, each branch at a slightly different rhythm, while its trunk and main branches stay still. The low green shrubs behind the balcony wall move very slightly. Gentle sunlight flickers through the leaves.

The dark timber roof eave in the top-left corner, the curved white balcony wall with its two vertical openings across the bottom of the frame, and the blue sky remain completely still and unchanged.

From about 6 seconds the breeze fades, and in the final second the scene is completely still: every leaf, frond and patch of light is back in exactly its original position. The last frame is identical to the first frame, pixel for pixel.

Real camera footage, natural bright daylight, constant exposure, true-to-life colours, real-time speed.
```

**Avoid**
```text
ending different from the start, last frame different from the first frame, visible jump at the loop point, cut, transition, camera movement, camera shake, vibration, jitter, handheld, pan, tilt, zoom, push-in, pull-out, dolly, orbit, crane, drone shot, parallax, perspective change, reframing, widening the frame, landscape orientation, letterboxing, black bars, focus change, trunk bending, tree swaying as a whole, people, animals, birds, insects, falling leaves, clouds moving, sky change, rain, mist, smoke, flicker, exposure change, colour shift, warping, morphing, changing shapes, balcony wall moving, roof eave moving, new buildings, text, captions, subtitles, logos, watermark, time-lapse, slow motion, CGI, cartoon, painterly, oversaturated
```

**On the page:** the quote sits in the upper-middle sky and leaf area, above the balcony wall. The wall stays uncovered so the viewer understands it is the balcony.

### 7.3 Quote overlay — built on the website, not in the video

Do **not** put the quote into the video. Text rendered by a video model looks artificial, cannot be read by screen readers or search engines, and cannot use the word-by-word reveal. The website places real text over the video.

| Element | Specification |
|---|---|
| Layout | Full-width section. The video fills the section; a soft dark gradient on the left keeps the text readable over the bright sky. |
| Placement | Left half, vertically centred, about 18 ch wide. The tree and palms stay visible on the right. |
| Typography | Plus Jakarta Sans 500, `clamp(2rem, 4.4vw, 4.25rem)`, line-height 1.12, tracking −0.03em, `--text-on-image`. One short phrase in Bodoni Moda italic (the approved editorial accent). |
| Motion | Text reveal 2: each word goes from 18% to 100% opacity as the section scrolls through the viewport. No pinning or scroll-jacking. With reduced motion, the text is fully shown and the video shows its still first frame. |
| Label | Small uppercase eyebrow above the quote: `The balcony`. |
| Proposed quote | “Mornings on the balcony, *above the palms*, with nowhere else to be.” |

---

## 8. New section: Hikkaduwa Beach — aerial cinemagraph with a quote

**Source:** `images/beach/source/hikkaduwa_aerial_downloaded.jpg` (1920 × 700, downloaded).
> **Launch blocker:** this looks like a stock drone photo. Use it only as a development placeholder until a licence is bought or an owned drone shot replaces it.

**Reference crops** (cut from the source and resized for the image model; the content is unchanged):
| File | Crop in source | Content | Quote area |
|---|---|---|---|
| `images/beach/flow-input/hikkaduwa-16x9-reference.jpg` (3840 × 2160) | x 200–1444 | harbour and breakwater, reef, surf, moored boats, the curved beach, palms, red-roofed hotels | lower left: dark reef water |
| `images/beach/flow-input/hikkaduwa-9x16-reference.jpg` (2160 × 3840) | x 640–1034 | town and harbour edge at the top, the beach curving down, palms, moored boats at the bottom | lower left: turquoise water |

**Pipeline**
1. **Enhance:** the 8.1 prompt, once for each crop, in the image model's reference-image mode, at the same aspect ratio and the highest output size.
2. **8K master still:** upscale the chosen result to 7680 × 4320 (desktop) and 4320 × 7680 (mobile).
3. **Video:** Flow → Frames to Video, with the 8K still as both the first and last frame, at the highest output resolution Flow offers.
4. **Web:** the same stabilise, clean and loop process as the hero. The encodes match the hero: desktop 2560 × 1440 and mobile 1080 × 1920, H.264, silent.

> Flow/Veo does not output 8K video. Phones and most browsers also cannot decode 8K, and one 8-second 8K file would be heavier than the whole current media folder. The 8K stage is the still image. The video is made at the highest resolution Flow supports and encoded for the web.

### 8.1 Enhance the still (use for both crops)
**Aspect ratio:** 16:9 for the desktop crop and 9:16 for the mobile crop, the same as the attached reference. No wide-angle change: it is already a drone view.

**Prompt**
```text
Enhance this exact aerial drone photograph of Hikkaduwa Beach, Sri Lanka, into a cinematic, high-end travel photograph, as if captured by a professional cinema drone with a full-frame sensor, and output it at the maximum resolution.

Keep exactly the same view, the same camera position, the same height, the same angle and the same framing. Every element stays exactly where it is, with the same shape, size, colour and count: the coastline and the curve of the beach, the harbour and its stone breakwaters, the coral reef and the dark reef patches under the water, the white surf lines, every moored boat and its position, the line of yellow buoys, the tiny people on the sand and in the water, every palm tree, every building, roof, swimming pool and umbrella, and the roads. Do not add, remove, move, replace or restyle anything. Do not change the time of day or the direction of the sunlight and shadows.

Improve only the photographic quality and add a cinematic, eye-catching look: remove atmospheric haze and add crystal clarity; make the shallow water a luminous, clear turquoise and the deep water a rich ocean blue, with visible reef texture beneath the surface; give the sand a warm, golden tone; keep the palm greens lush but natural; add gentle cinematic contrast, a subtle warm-and-teal colour grade and a very soft vignette at the edges; sharpen the fine detail of the boats, roofs, surf and palm fronds; remove noise and compression artefacts; keep colours believable. It should look like the opening shot of a premium travel film. Ultra-sharp, photorealistic.
```

**Avoid**
```text
added boats, removed boats, moved boats, new buildings, removed buildings, changed roofs, extra palm trees, extra people, removed people, enlarged people, new piers, changed coastline, changed breakwater, changed reef, sunset, golden hour, night, changed time of day, changed shadow direction, clouds added, sky added, horizon added, tilted horizon, wider view, outpainted areas, fisheye distortion, tilt-shift miniature effect, toy look, HDR halos, neon colours, oversaturated turquoise, cartoon, painting, illustration, CGI, 3D render, blur, text, logo, watermark
```

### 8.2 Flow loop video, desktop (16:9)
**First and last frame:** the 8K desktop still. Length 8 s.

**Prompt**
```text
Seamless looping aerial video. The first frame and the last frame of this clip are exactly the same image: the provided photograph. The clip starts on this image, comes gently to life, and returns precisely to this same image, so it can repeat endlessly without any visible jump.

Perfectly static aerial shot, as from a professional cinema drone hovering completely still on a locked gimbal. The frame stays exactly as in the provided image for the entire clip: the same height, the same angle, the same framing, and the same position of every object. No drift, no rotation, no zoom.

Only the natural elements come alive: gentle waves roll in slowly over the reef and break into soft white surf along the reef edge and the shoreline; the turquoise water shimmers with moving sunlight and ripples; the moored boats rock very gently in place on their moorings, without travelling; the line of yellow buoys bobs softly; the palm fronds sway slightly in the sea breeze. The buildings, roofs, roads, sand, breakwater and reef stay completely still. The tiny people on the beach and in the water stay in place with only minimal natural movement.

From about 6 seconds the motion settles, and in the final second everything returns to exactly its original position. The last frame is identical to the first frame.

Real drone footage, bright tropical daylight, constant exposure, cinematic colour, true-to-life, real-time speed.
```

**Avoid**
```text
ending different from the start, last frame different from the first frame, visible jump at the loop point, cut, transition, camera movement, drone drift, fly-over, fly-through, orbit, rotation, pan, tilt, zoom, push-in, pull-out, altitude change, camera shake, jitter, wobble, parallax, perspective change, reframing, boats sailing, boats appearing, boats disappearing, people walking across the frame, people appearing, people disappearing, morphing people, morphing boats, cars moving, birds, clouds, cloud shadows, changing sunlight, time-lapse, slow motion, flicker, exposure change, colour shift, warping, melting coastline, changing buildings, text, captions, subtitles, logos, watermark, CGI, cartoon, painterly, oversaturated
```

### 8.3 Flow loop video, mobile (9:16)
**First and last frame:** the 8K mobile still. Length 8 s. Use the 8.2 Avoid prompt, adding `landscape orientation, letterboxing, black bars, widening the frame`.

**Prompt**
```text
Seamless looping vertical aerial video. The first frame and the last frame of this clip are exactly the same image: the provided vertical photograph. The clip starts on this image, comes gently to life, and returns precisely to this same image, so it can repeat endlessly without any visible jump.

Perfectly static aerial shot in portrait orientation, as from a professional cinema drone hovering completely still on a locked gimbal. The frame stays exactly as in the provided image for the entire clip: the same height, the same angle, the same framing, and the same position of every object. No drift, no rotation, no zoom.

Only the natural elements come alive: soft white surf laps along the curve of the beach that runs down through the frame; the clear turquoise water shimmers with moving sunlight and ripples; the moored boats in the lower half rock very gently in place on their moorings, without travelling; the yellow buoy line bobs softly; the palm fronds beside the beach sway slightly in the sea breeze. The town, roofs, roads, harbour and sand stay completely still. The tiny people on the beach stay in place with only minimal natural movement.

From about 6 seconds the motion settles, and in the final second everything returns to exactly its original position. The last frame is identical to the first frame.

Real drone footage, bright tropical daylight, constant exposure, cinematic colour, true-to-life, real-time speed.
```

### 8.4 Quote overlay (on the website)
- **Placement:** lower left, over the water, with a soft dark gradient from the lower-left corner for contrast.
- **Typography and motion:** Plus Jakarta Sans 500 with one Bodoni Moda italic phrase, `--text-on-image`, word-scrub reveal (text reveal 2). With reduced motion or data saver, the page shows the poster frame and the full text.
- **Eyebrow and fact line:** eyebrow `Hikkaduwa Beach`; fact line `3.5 km · about 5 minutes by car`.
- **Proposed quote:** “Reef, surf and golden sand, *five minutes down the road.*”
