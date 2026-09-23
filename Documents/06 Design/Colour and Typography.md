# Villa Cinnamoon Castle — Colour and Typography System

## 1. Status and purpose

This document records the approved Phase 1 colour and typography foundation for the Villa Cinnamoon Castle website.

The intended visual direction is **Editorial Tropical Neutral**: clean, natural, contemporary and welcoming to both local and international families and groups. It must not resemble a generic luxury-hotel interface.

Interactive preview:

- [`Color and typography sample.html`](../../Sample%20components/Color%20and%20typography%20sample.html)

---

## 2. Colour system

| Token | Role | Colour | Hex |
|---|---|---|---|
| `--background` | Main page background | Warm mineral white | `#F3F1EB` |
| `--surface` | Cards and elevated surfaces | Soft white | `#FCFBF8` |
| `--text-primary` | Headings and primary text | Near-black charcoal | `#171A17` |
| `--text-secondary` | Supporting copy and metadata | Muted grey-green | `#626862` |
| `--border` | Dividers, outlines and quiet boundaries | Soft stone | `#D2D3CC` |
| `--accent` | Primary actions and active states | Deep tropical green | `#285447` |
| `--accent-hover` | Primary action hover/focus state | Dark forest green | `#1E4238` |
| `--accent-soft` | Restrained highlight backgrounds | Pale eucalyptus | `#DFE9E3` |
| `--text-on-image` | Text placed over darkened photography | Warm white | `#FAF9F5` |

### 2.1 CSS reference

```css
:root {
  --background: #f3f1eb;
  --surface: #fcfbf8;
  --text-primary: #171a17;
  --text-secondary: #626862;
  --border: #d2d3cc;
  --accent: #285447;
  --accent-hover: #1e4238;
  --accent-soft: #dfe9e3;
  --text-on-image: #faf9f5;
}
```

### 2.2 Usage rules

- Use `--background` for the main page canvas.
- Use `--surface` for cards and other elements that require quiet separation from the page background.
- Use `--text-primary` for headings, important labels and primary body text.
- Use `--text-secondary` for supporting copy, captions and metadata without reducing readability.
- Use `--accent` for the **Send Inquiry** action, selected controls, focus indicators and meaningful active states.
- Use `--accent-hover` for interactive hover and focus feedback.
- Use `--accent-soft` only for restrained highlights or supporting surface treatments. It must not become the dominant page background.
- Use `--text-on-image` over photography only when a suitable dark overlay or naturally dark image area provides sufficient contrast.
- Photography should provide most of the website's visual character; interface colours should remain controlled and quiet.
- Do not introduce gold, cinnamon-brown, bright pink or decorative gradients into the core interface palette.
- Colours found inside motion-reference samples are not part of the approved palette. Those samples provide animation behaviour only.

### 2.3 Image-overlay guidance

- Place Hero copy in an image area with adequate natural contrast.
- Add a restrained dark gradient behind text when required.
- Avoid darkening the entire photograph more than necessary.
- Check contrast across desktop and mobile crops rather than relying on one viewport.

---

## 3. Typography system

Use no more than two type families across the public website.

### 3.1 Primary typeface — Plus Jakarta Sans

**Roles**

- Main headings
- Body copy
- Navigation
- Buttons
- Forms and validation messages
- Captions, labels and metadata

**Approved weights**

| Use | Weight |
|---|---:|
| Body copy | `400` |
| Navigation and labels | `500` |
| Headings | `500–600` |
| Buttons and important controls | `600` |

Avoid weight `700` or heavier unless a later accessibility review demonstrates a specific need.

### 3.2 Editorial accent — Bodoni Moda

**Permitted roles**

- The dynamic word or short phrase in the Hero headline
- Occasional short editorial emphasis within a major heading
- A deliberately selected italic phrase

**Rules**

- Prefer italic weight `400`; use `500` only where additional definition is necessary.
- Do not use Bodoni Moda for navigation, buttons, forms, captions, long paragraphs or functional information.
- Do not apply it to entire sections or several consecutive lines.
- Its purpose is contrast and rhythm, not decoration.

### 3.3 Font stack reference

```css
:root {
  --font-primary: "Plus Jakarta Sans", Arial, sans-serif;
  --font-editorial: "Bodoni Moda", Georgia, serif;
}
```

### 3.4 Recommended type scale

| Element | Size | Guidance |
|---|---|---|
| Hero heading | `clamp(3rem, 7vw, 7rem)` | Keep line-height close to `0.94–1.0` |
| Section heading | `clamp(2.5rem, 5vw, 5rem)` | Use controlled line breaks |
| Subheading | `clamp(1.5rem, 2.5vw, 2.5rem)` | Do not compete with section headings |
| Large introductory copy | `18–20px` | Use selectively |
| Standard body copy | `16–18px` | Never reduce essential copy below `16px` |
| Navigation | `14px` | Medium weight, clear spacing |
| Eyebrow or micro-label | `11–12px` | Uppercase permitted with restrained tracking |
| Button text | `13–14px` | Use weight `600` |

### 3.5 Typography rules

- Use sentence case for headings, navigation labels and buttons.
- Reserve uppercase for short eyebrow labels and small metadata where useful.
- Use a body line-height of approximately `1.6–1.7`.
- Keep long-form copy between approximately `55–70` characters per line.
- Keep heading letter spacing slightly negative at large sizes; do not compress smaller text.
- Use deliberate line breaks based on meaning, not decoration alone.
- The editorial typeface may highlight one word or a short phrase but must not reduce comprehension.
- Adapt the agreed text-reveal samples to these two typefaces. Do not introduce Playfair Display, Inter or another third family in production.

---

## 4. Relationship to motion

- Primary headline reveals use the approved masked, line-by-line upward movement.
- Secondary reveals are reserved for supporting content and must remain restrained.
- Text must not appear before its scroll-triggered reveal state.
- All motion must respect `prefers-reduced-motion` and reveal content immediately when reduced motion is requested.
- Button animation must preserve the approved colours and maintain readable text throughout hover and focus transitions.

---

## 5. Implementation principle

This system is the default visual foundation for the Home, Stay Options, Gallery, Inquiry and Privacy pages. Page-level designs may vary in composition, but they must reuse these tokens and typography roles rather than introducing independent palettes or font families.
