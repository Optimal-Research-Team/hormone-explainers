# Hormone Explainers

Guided, interactive patient-education stories from **Optimal**: eight short chapters on cortisol, sleep and the hormone system, adapted from clinician notes and hand-drawn sketches.

**Live site:** https://optimal-research-team.github.io/hormone-explainers/

## What it is

Each chapter is a **scroll-driven story**. The diagram sits on a dark "night garden" stage that stays pinned while short narrative steps scroll past, and every step drives the diagram. Readers can still hover, tap and drag the diagram at any point.

**Present mode** is for the exam room. Press **Present** (in the nav or the chapter header) and the chapter fills the screen with one step at a time.

| Key | Action |
|-----|--------|
| → · Space · PageDown | Next step (continues into the next chapter) |
| ← · PageUp | Previous step |
| F | Toggle full screen |
| Esc | Exit Present mode |

Presentation clickers send PageUp/PageDown, so they work out of the box. Links such as `01-dose-response.html?present` open straight into Present mode.

## The chapters

| # | Chapter | Story |
|---|---------|-------|
| 01 | Cortisol has a dose-dependent effect | A draggable marker on a luminous dose–response curve visits too little, just right and too much in turn. |
| 02 | How HPA dysfunction evolves | Introduces the two stress systems (SNS and HPA). The daily curve then morphs through Normal → Acute → Chronic → Exhaustion, and the chapter ends with all four overlaid. |
| 03 | Three ways to measure cortisol | Awakening response, diurnal slope and area under the curve light up one at a time. Then the curve flattens and every measure turns "concerning". |
| 04 | Cortisol's partners | A stress-axis diagram marks exactly where each group of partners acts. A second scene shows the melatonin–cortisol see-saw across morning, evening and a stressed evening. |
| 05 | Foundational vs. top-line hormones | Canopy, trunk and roots in turn. The roots are then stressed and the canopy wilts, before the story returns to the roots. |
| 06 | The hormone cycle and its stop points | A particle circulates the loop. Each step halts it at one stop and shows the tools used there. |
| 07 | Sleep, cortisol and the hormone web | Twelve connections grouped into five steps (sleep, melatonin, insulin resistance, sex hormones, mood), ending on sleep's reach. |
| 08 | The pyramid of interventions | The pyramid builds itself one layer per step, from sleep at the base to supplements at the top. |

The **landing page** opens on a full-bleed, scrubbable illustrative 24-hour rhythm: move across the chart to watch cortisol and melatonin trade places as the sky glow shifts with the time of day. Below it are a bento grid of chapter previews, a "For the exam room" section and a closing call to action.

## Reader aids

- **Glossary.** The first use of each medical term in a step (ACTH, SHBG, aromatase, allopregnanolone and others) is underlined; hover, tap or focus it for a plain-language definition. All definitions live in `assets/js/glossary.js` for easy clinical review.
- **Chapter menu.** "All chapters" opens a menu listing every chapter, with the current one and the chapters already viewed or completed on this device.
- **Continue where you left off.** Progress (last chapter and step, viewed and completed chapters) is saved in the browser's local storage, on that device only, with no personal data. The landing page offers a resume link and badges on viewed chapters.
- **Share.** "Share this chapter" opens the system share sheet on phones and copies the link on desktop.
- **Link previews.** Every page has Open Graph and Twitter metadata with a 1200×630 card in `assets/og/`, generated from the chapter's diagram.
- **Optional cover photographs.** See [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md) for prompts and how to switch covers on.

## Architecture

Static HTML, CSS and JS, with no framework and no build step. Deployed with GitHub Pages.

```
index.html                    Landing: scrubbable day hero, series bento, exam-room section, closing band
404.html                      Branded not-found page (GitHub Pages)
01-…html … 08-…html           One chapter each: hero + .story (sticky .stage + .steps) + page script
assets/css/site.css           Design system: tokens, nav, story/stage layout, Present mode, motion
assets/js/site.js             Shared engine (see below)
assets/js/glossary.js         Plain-language definitions used by the inline glossary
assets/og/                    1200×630 social preview images
assets/img/                   Optimal wordmarks, symbol, canopy photography
.github/workflows/deploy.yml  GitHub Pages deployment
```

### `site.js`

- **Chrome.** The floating glass nav shows chapter progress, a reading-progress fill and a Present button. It also renders the "Up next" card and the footer, all from one `CHAPTERS` config. Pages set `<body data-chapter="N">`.
- **Story engine.** `HX.story({ onStep })` wires `.story`. An IntersectionObserver activates the step crossing a trigger line; on mobile, the line sits just below the pinned stage. The stage stepper (‹ • • • ›) and Present mode drive the same `go(i)`.
- **Present mode.** Adds a `present` class to `body`, handles keyboard and clicker input, and hands off between chapters using `?present` / `?present=last`.
- **Linked highlighting.** Inside `[data-links]`, elements with `data-t` are triggers and elements whose `data-k` contains an active key get `.is-on`. Active keys are, in priority order: hover, click-pin, then the story's base keys (`_links.setBase([...])`).
- **Helpers.** `HX.morph()` (SVG path tweening), `HX.tween()`, `HX.sampler()` (y at x along a path) and `HX.onReveal()`, plus a procedurally drawn hand-drawn ellipse around the title word (the beoptimal.ca motif).
- **URL flags.** `?step=N` opens a chapter at step N. `?still` disables all motion, which is useful for screenshots and for checking final states.
- **Accessibility.** Reduced-motion support, keyboard access for every control, ARIA states, and live regions on readouts.

### Design system

- Optimal brand: cream `#FFFCF7` and forest `#2C4E25` for reading surfaces. Diagrams use a luminous palette (sage `#B7D3AE`, amber `#F2B46E`, periwinkle `#AEBEF1`, coral `#EE8B75`) on a dark forest stage textured with the Optimal canopy photograph.
- Type: Castoro (display) and Public Sans (UI).
- The floating glass pill nav, the italic-word ellipse motif and the photo cards follow beoptimal.ca.
- Cross-document view transitions between chapters (Chromium, Safari 18+).

## Development

```bash
python3 -m http.server 3041
```

Then open http://localhost:3041.

## Deployment

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`.

## Disclaimer

For education only, not a substitute for individual medical advice. Medication names are for discussion with a provider, not recommendations. The landing-page rhythm is illustrative, not patient data.
