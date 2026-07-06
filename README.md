# Wheel of Emotions 🎡

A spinnable wheel of emotions for mobile and desktop. Give it a spin and it lands on one of 82 emotions, showing the path from the core feeling down to the specific one (e.g. *Surprised › Excited › Eager*).

Based on [Geoffrey Roberts' Emotion Wheel](https://feelingswheel.com/) — 7 core emotions → 41 secondary → 82 outer.

## Features

- **Data-driven SVG wheel** — crisp at any size, no images, every segment is real text.
- **Spin animation** with easing, segment highlight, result card, and haptic feedback on phones. Respects `prefers-reduced-motion`.
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
