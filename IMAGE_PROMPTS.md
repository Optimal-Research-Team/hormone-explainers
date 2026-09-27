# Chapter cover photographs

Each chapter can carry one cover photograph. When a cover is switched on, it appears in two places:

1. **The chapter header**, as a rounded photo card to the right of the title (the beoptimal.ca style).
2. **The "Up next" card** at the end of the previous chapter, as that card's background.

Until a cover is added, the site keeps its current design (text header, canopy photograph on "Up next").

## How to add one

1. Generate the image (prompts below). Keep **3:2, at least 2400 × 1600**, and save it as a JPEG.
2. Save it as `assets/img/chapters/01.jpg` … `08.jpg`.
3. Switch it on in `assets/js/site.js` under `COVERS`:
   ```js
   var COVERS = {
     1: 'assets/img/chapters/01.jpg',
     5: 'assets/img/chapters/05.jpg',
   };
   ```
4. Commit and push. Ideally add all eight at once so the chapters stay consistent.

## House style (paste this before every prompt)

> Editorial nature photograph for a premium health clinic. Soft, natural early-morning light, muted forest-green and warm cream palette, gentle film grain, shallow depth of field, calm and uncluttered, generous negative space on the left third. No people, no text, no logos, no medical equipment. Photorealistic, 3:2 landscape, high resolution.

## Prompts, one metaphor per chapter

| # | Chapter | Metaphor | Prompt (after the house style) |
|---|---------|----------|--------------------------------|
| 01 | Cortisol has a dose-dependent effect | Balance, the middle band | A single smooth river stone balanced perfectly on top of a larger flat stone, resting on soft moss beside a still forest stream. |
| 02 | How HPA dysfunction evolves | Gradual depletion | Four leaves of the same plant laid in a row on linen, from vivid green through yellowing to dry and brown, soft top-down light. |
| 03 | Three ways to measure cortisol | The shape of a day | A stone sundial in a quiet garden at sunrise, its long morning shadow stretching across dewy grass. |
| 04 | Cortisol's partners | Counterbalance | A weathered wooden see-saw in an empty park at dusk, one end raised, warm golden light fading to blue. |
| 05 | Foundational vs. top-line hormones | Roots and canopy | A large old oak tree photographed from a low angle, its thick exposed roots gripping mossy forest ground, canopy glowing in soft light. |
| 06 | The hormone cycle and its stop points | A loop you can step out of | A circular stone labyrinth path in a garden, seen from slightly above, morning mist, one clear opening in the ring. |
| 07 | Sleep, cortisol and the hormone web | Connection | A spider web covered in morning dew, backlit against a dark green out-of-focus forest, each strand catching the light. |
| 08 | The pyramid of interventions | Build from the base | A cairn of flat stacked stones on a misty shoreline, the widest stones at the base and the smallest at the top. |

### Tips

- Generate 3–4 options per chapter and pick the calmest one. Busy images fight the text overlay on the "Up next" card.
- Keep the subject on the **right half**. The "Up next" card darkens the left side for its text.
- Avoid clinical imagery (pills, syringes, test tubes, anatomy). It dates quickly, and AI tools often draw it inaccurately.
- Check hands, text and physics in every result. Nature scenes avoid most of these failure modes.

## Optional extras

- **Present-mode welcome slide**: one wide (16:9) calm canopy or forest-light image for a "Welcome" screen before chapter 01. The patient decks already use `leaves-overhead.jpg` for this.
- **Social preview cards**: already generated automatically in `assets/og/` from each chapter's diagram. They don't need photographs.
