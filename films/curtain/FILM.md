# Curtain

Working title. 80 s, 1080 × 1080, 30 fps, silent so far. Authoritative source: `index.html`.
Status: **framework and silent animatic**. The portal, the years and the stage pictures are
placeholders until the user's photographs and production list arrive.

## Premise

Window Seat's train window, turned to a theatre. The user's brief (2026-09-30, in Hungarian):
in the original a train window frames the picture and authenticates the horizontal movement;
the landscape changes inside the fixed frame. For the theatre, the portal of the Radnóti
Theatre is the frame (a shop window), and inside it the curtain draws together and opens again
on a different stage picture each time, with the years of forty years of productions shown in
the frame. The user chose the combined version: the curtain as the switch device, the year in
the portal's cartouche, 6-8 productions, as a film.

| Window Seat | Curtain |
|---|---|
| a fixed train window | the portal, never moving |
| the landscape passing | each production's stage picture |
| every switch under full cover (tunnel, train, fog, rain haze) | every switch behind the shut curtain; the last one under a blackout |
| horizontal travel | the two curtain halves travelling on their track; the years sliding through the cartouche like poles past the train |
| the glass on the sill | the front row: heads in silhouette, rim-lit by the curtain or the stage |

## Passages (from `SCHED`, derived from `PRODS`)

| Time (s) | Passage |
|---|---|
| 0-1.8 | From dark: the footlights come up on the shut curtain; the first year in the cartouche. |
| 1.8-70.9 | Seven productions. Each: the curtain opens (1.1-2.4 s, varied), the stage's light cue comes up, a small action (a door opens, a figure climbs, rain falls), the curtain closes (1.45 s), the next year slides in (1.7 s). |
| 70.9-72.2 | The house goes dark: footlights out, then a full blackout. |
| 72.2-80 | In the dark the ghost light comes up behind the curtain; the curtain opens on the empty stage; the front row is empty seats. |

Why this ending: the front row is planted in every shot and returns changed (empty); the
curtain's last opening reveals no production, only the lamp that keeps the stage between them.

## Design decisions

- One frontal, fixed composition at 1080². The portal fills ~80% of the width; cartouche at the
  top centre; the stage's front and the front row fill the bottom fifth. Eye path: the centre
  seam of the curtain, the stage picture, up to the cartouche during each switch.
- Live plates: the Window Seat compositor (`compose`, `put`, `add`, `knock`, `putM`, `smear`) is
  copied, with four inks: yellow, pink, blue, indigo. `put` also takes horizontal ramps
  (`{xs, as}`) for the curtain's folds.
- Curtain: two halves of ten folds each on a traveller. Fold widths are seeded and fixed; the
  folds compress toward the side as it gathers, deepening. The hem trails the track: a damped
  pendulum (0.7 Hz, ζ 0.16) driven by the curtain's acceleration, integrated once at load at
  240 Hz (`SWING`), so the leading edges bow and ring down while every frame stays pure in t.
- Cover discipline: the halves overlap by 34 px each side of centre, so the swing cannot open a
  slit, and each half first clears everything behind it with one seamless silhouette. An
  earlier version let the stage print through along the fold seams (antialiased edges each
  half-cleared by neighbouring strips). `?leak=1` paints the stage pure blue; all 413 cover
  frames were pixel-identical with and without it, so nothing behind the shut curtain shows.
- Stage switches (`stageAt`) happen 0.05 s after a curtain is fully shut; the house empties at
  the full blackout (`t = dark1 + 0.1`).
- Years: calligraphic numerals drawn as `nib` strokes (`DIG`, `glyph`), no font. The cartouche
  holds a strip of consecutive years, 205 px apart, sliding on a smootherstep; intermediate
  years pass through the window like poles. Motion blur by shutter samples (`smear`).
- Fades come from the evening's own light (`lightsAt`: footlights, ghost light); a uniform veil
  (`blackout`) only closes the last part of the dark, where an ink mix would otherwise read as
  a washed-out double exposure.

## Placeholders and what the user supplies

- **Portal**: a generic gilded frame with a cartouche (`portal`, `cartouche`, `OP`, `PT`,
  `CART`). To be redrawn from the user's photographs of the Radnóti portal: frontal from the
  middle of the stalls, plus close-ups of the ornament. No photograph has been inspected yet;
  the environment's network policy blocks Wikimedia Commons, Wikipedia and theatre databases.
- **Productions and years**: `PRODS` holds seven evenly spaced test years (1986-2022) and
  `FINAL_YEAR` 2026. None is a real premiere. The real list (title, year) and its source come
  from the user and will be recorded here.
- **Stage pictures**: `STAGES` holds stand-ins (salon, chair, forest, stairs, window, rain,
  table). Each will be redrawn from the user's stage photographs as observation references,
  never embedded.
- Rights: stage photographs and set designs are protected works, and the theatre's name and
  marks are its own. Permission is needed before public use; recorded here as the user's call.

## Verification so far

- `verify.mjs`: seek is pure in t in Chromium across the duration and shot boundaries.
- Sheets inspected: key moments of every passage; a 0.1 s strip through the fast opening at
  12.6-14.6 s (hem trails, then rings down); a 1/30 s strip through the first year slide.
- Leak probe as above. Render cost about 0.2 s/frame in Chromium.

## Remaining work

- Portal, stage pictures and years from the user's material.
- Motion to judge at playback speed from the MP4: curtain tempo per opening, the year slide's
  speed and blur, the rhythm across seven near-identical cycles (the main risk: monotony; the
  opening durations already vary 1.1-2.4 s).
- A score, if wanted (`riso-score`): curtain swish, the house, applause or silence.
- House wall palette (currently a deep plum overprint) to be set from the real auditorium.
