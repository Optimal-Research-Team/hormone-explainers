# Hormone Explainers

Interactive patient-education microsite from **Optimal**: eight short explainers on cortisol, sleep and the hormone system, adapted from clinician notes and hand-drawn sketches.

**Live site:** https://optimal-research-team.github.io/hormone-explainers/

## The chapters

Every chapter has a working diagram, not a static picture. Hover, or tap on touch screens, to explore; click to pin a highlight.

| # | Chapter | Interaction |
|---|---------|-------------|
| 01 | Cortisol has a dose-dependent effect | Drag a cortisol level along the dose–response curve. The live readout and the matching zone card (too little / just right / too much) update as you move. |
| 02 | How HPA dysfunction evolves | One chart morphs through Normal → Acute → Chronic → Exhaustion against a ghost "normal" curve. Auto-plays, with a stage timeline and a stage list with sparklines. |
| 03 | Three ways to measure cortisol | Awakening response, diurnal slope and area under the curve are linked to their cards. A Healthy / Flattened toggle reshapes the curve and flips each healthy/concerning status. |
| 04 | Cortisol's partners | A stress-axis diagram (hypothalamus → pituitary → adrenal → tissues, with negative-feedback arcs). Hover any molecule to mark where it acts. Includes a morning / evening / stressed-evening melatonin–cortisol see-saw. |
| 05 | Foundational vs. top-line hormones | A hormone tree (sex-hormone canopy, insulin trunk, cortisol and thyroid roots) linked to the three tiers. "Stressed roots" wilts the canopy. |
| 06 | The hormone cycle and its stop points | A particle circulates the six-stop loop. Choosing a stop halts it there, fades the rest of the loop, and shows the tools used at that point. |
| 07 | Sleep, cortisol and the hormone web | Twelve numbered connections. Hover a hormone to see everything it touches, or a note to trace one link. "Where sleep reaches" pins sleep's influence. The diagram stays in view (sticky) while the notes scroll. |
| 08 | The pyramid of interventions | An HTML pyramid where each layer is its own row, so layers and text always align at any width. It builds from the base up. |

The landing page has an animated, illustrative 24-hour cortisol / melatonin rhythm on a frosted-glass panel, and a bento grid with a live preview of each chapter.

## Architecture

Static HTML, CSS and JS: no framework and no build step.

```
index.html                    Landing: hero rhythm, bento series grid, guide, closing band
01-…html … 08-…html           One page per chapter (markup + a small page script)
assets/css/site.css           Design system: tokens, nav, figures, controls, motion
assets/js/site.js             Shared chrome + interaction engine (see below)
assets/img/                   Optimal wordmarks, symbol, canopy photography
.github/workflows/deploy.yml  GitHub Pages deployment
```

### `site.js`

- **Chrome.** Builds the floating nav (brand, chapter progress with tooltips, prev/next, all chapters), the "Up next" card and the footer from one `CHAPTERS` config. Each page just sets `<body data-chapter="N">`.
- **Linked highlighting.** Inside any `[data-links]` scope, elements with `data-t="key"` are triggers and every element whose `data-k` list contains the key gets `.is-on`. The scope gets `.has-focus`, which dims everything else. It supports mouse hover, keyboard focus, and click or tap to pin, and emits a `focuskey` event for page-specific behaviour (for example, chapter 06 halting the particle).
- **Helpers.** `HX.morph()` tweens SVG path data between shapes with identical command structure; `HX.tween()`, `HX.sampler()` (y-at-x lookup on a path) and `HX.onReveal()`.
- **Reveal and motion.** IntersectionObserver-driven entrances, SVG stroke draw-ins (`pathLength="1"`), and a procedurally drawn hand-drawn ellipse around the italic title word (the beoptimal.ca motif), sized to the word by ResizeObserver.
- **Keyboard.** ← / → move between chapters; controls that use arrow keys opt out with `data-keys`.
- **Accessibility.** Reduced-motion support throughout, focus-visible rings, ARIA-pressed and selected states, and live regions on readouts.

### Design system

- Optimal brand: cream `#FFFCF7`, forest `#2C4E25`, sage `#87A482`, amber `#C97A2B`, brick `#9B3B2E`, navy `#182E6C`
- Type: Castoro (display) and Public Sans (UI) from Google Fonts
- Floating glass pill nav and rounded photo cards with pill badges, matching beoptimal.ca; subtle paper grain; layered soft shadows; dotted plot grids
- Responsive from 375px up. Dense diagrams scroll sideways inside their card on phones.

## Development

```bash
python3 -m http.server 3041
```

Then open http://localhost:3041.

## Deployment

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`.

## Disclaimer

For education only, not a substitute for individual medical advice. Medication names are for discussion with a provider, not recommendations. The landing-page rhythm is illustrative, not patient data.
