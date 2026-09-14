# Hormone Explainers

Animated patient-education microsite from **Optimal** — eight short visual explainers on cortisol, sleep and the hormone system, adapted from hand-drawn clinician sketches.

**Live site:** https://optimal-research-team.github.io/hormone-explainers/

## The explainers

| # | Title | Animated visual |
|---|-------|-----------------|
| 01 | Cortisol has a dose-dependent effect | Dose–response bell curve draws in; deficiency / optimal / excess zones fade up; pulsing marker on the healthy midpoint |
| 02 | How HPA dysfunction evolves | Four daily-cortisol curves draw in sequence — Normal → Acute → Chronic → Exhaustion |
| 03 | Three ways to measure cortisol | One day of salivary cortisol draws in; CAR, diurnal slope and AUC markers pop in sync with their explanation cards |
| 04 | Cortisol's partners | Staggered ledger of suppressors; a continuously rocking melatonin-vs-cortisol see-saw |
| 05 | Foundational vs. top-line hormones | The hormone tree grows: roots draw first, the trunk rises, the canopy breathes |
| 06 | The hormone cycle and its stop points | The loop's arrows draw around the ring one stop at a time; marching-dash guide circle; numbered stop points pop in |
| 07 | Sleep, cortisol and the hormone web | Nodes appear, connections wire in, the heavy "problem" edges pulse |
| 08 | The pyramid of interventions | The pyramid builds itself from the base up, most-impactful layer first |

## Architecture

Pure static HTML/CSS/JS — no framework, no build step.

```
index.html                      Landing grid of the eight explainers
01-…html … 08-…html             One self-contained page per explainer
assets/site.css                 Shared animation system + interactive styles
assets/fit.js                   1920×1080 stage scaling + arrow-key navigation
assets/symbol-green.png         Optimal mark / favicon
.github/workflows/deploy.yml    GitHub Pages deployment
```

### How it works

- **Stage scaling** — every page is authored on a fixed 1920×1080 stage, scaled to fit any viewport via a single CSS `transform: scale(var(--s))` set by `fit.js`. Layouts never reflow; typography stays exactly as designed on every screen.
- **Animation system** — shared utility classes in `site.css`: `.a-rise`, `.a-fade`, `.a-pop` (entrances, delay via `--d`), `.stag` (staggered children, offset via `--sd`), `.draw` (SVG stroke draw-in using `pathLength="1"` normalization), and `.circ` (the hand-drawn ellipse around a title word). Page-specific loops (the see-saw, pulses, marching dashes) live in each page's `<style>` block.
- **Reduced motion** — all animation collapses to instant under `prefers-reduced-motion: reduce`.
- **Navigation** — every explainer has All-explainers / Next pills, and ← / → arrow keys walk the whole sequence like a deck.

### Design system

- Type: Castoro (display) + Public Sans (UI), via Google Fonts
- Palette: cream `#FFFCF7`, forest `#2C4E25`, sage `#87A482`, amber `#C97A2B`, brick `#9B3B2E`, navy `#182E6C`
- 1920×1080 frame, generous margins, oversized ghost numerals per chapter

## Development

Any static file server works:

```bash
python3 -m http.server 3041 --directory .
```

Then open http://localhost:3041.

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via `.github/workflows/deploy.yml` (upload-pages-artifact → deploy-pages).

## Disclaimer

For education only — not a substitute for individual medical advice. Medication names appear for discussion with a provider, not as recommendations.
