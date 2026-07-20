# Wheel of Emotions 🎡

A spinnable wheel of emotions for mobile and desktop. Give it a spin and it lands on one of 50 emotions, showing the path from the core feeling down to the specific one (e.g. *Happy › Excited › Eager*).

Based on the classic feelings wheel — 5 core emotions → 25 secondary → 50 outer.

## Features

- **Data-driven SVG wheel** — crisp at any size, no images, every segment is real text.
- **Spin animation** with easing, segment highlight, result card, and haptic feedback on phones. Respects `prefers-reduced-motion`.
- **Guided check-in** (~60–90s) after each spin: confirm the emotion, rate intensity 0–10, tap where you feel it on a body silhouette plus emotion-specific sensations (interoception), name the trigger and the thought behind it (mini-CBT), pick what you need, learn what the emotion signals and the need it points to (emotion = information), choose an evidence-based regulation tool tailored to the emotion (positive ones get savoring, not fixing), end with one tiny action, then re-rate intensity to see how noticing changed it.
- **Your patterns** — a local dashboard (localStorage only, nothing leaves the device) showing most common emotions, triggers, body sensations, and go-to tools over time.
- **i18n** — English and Spanish out of the box. Auto-detects browser language, persists the choice, and supports shareable `?lang=es` URLs.
- **Responsive** — works from 320px phones to desktop.
- **Zero dependencies, no build step** — plain HTML/CSS/JS.

## Run it

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Add a language

1. Add the language code to every `t` object in `data.js` (emotion labels) and to `UI_STRINGS` (interface text).
2. Add a button for it in the `.lang-switch` nav in `index.html`.

That's it — the wheel re-renders labels from data.
