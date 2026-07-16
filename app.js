/* Wheel of Emotions — rendering, spinning, i18n. */
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var RINGS = {
    hub: 72,
    core: { inner: 72, outer: 190, labelR: 131, font: 27, maxLen: 100 },
    secondary: { inner: 190, outer: 335, labelR: 262, font: 20, maxLen: 128 },
    leaf: { inner: 335, outer: 494, labelR: 414, font: 19, maxLen: 142 },
  };
  var SPIN_TURNS_MIN = 4;
  var SPIN_DURATION_MS = 4200;

  var svg = document.getElementById("wheel");
  var spinBtn = document.getElementById("spin");
  var resultEl = document.getElementById("result");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var lang = detectLang();
  var rotation = 0;
  var spinning = false;
  var selectedLeaf = -1;
  var leaves = []; // { core, secondary, leaf, start, end, pathEl }

  /* ---------- analytics (no-op when GA isn't loaded, e.g. local dev) ---------- */

  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(name, params || {});
    }
  }

  /* ---------- geometry helpers ---------- */

  // Angles in degrees, 0 = top of the wheel, increasing clockwise.
  function polar(r, deg) {
    var rad = (deg * Math.PI) / 180;
    return [r * Math.sin(rad), -r * Math.cos(rad)];
  }

  function sectorPath(ri, ro, a0, a1) {
    var large = a1 - a0 > 180 ? 1 : 0;
    var p0 = polar(ro, a0), p1 = polar(ro, a1);
    var p2 = polar(ri, a1), p3 = polar(ri, a0);
    return (
      "M" + p0 + " A" + ro + " " + ro + " 0 " + large + " 1 " + p1 +
      " L" + p2 + " A" + ri + " " + ri + " 0 " + large + " 0 " + p3 + " Z"
    );
  }

  function mixWithWhite(hex, t) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(r + (255 - r) * t);
    g = Math.round(g + (255 - g) * t);
    b = Math.round(b + (255 - b) * t);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  /* ---------- rendering ---------- */

  function el(name, attrs, parent) {
    var node = document.createElementNS(SVG_NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  function addLabel(parent, text, ring, midAngle, fill) {
    var pos = polar(ring.labelR, midAngle);
    var angle = midAngle - 90;
    if (midAngle > 180) angle += 180; // left half reads outside-in
    var size = Math.min(ring.font, ring.maxLen / (0.56 * text.length));
    var t = el("text", {
      x: pos[0], y: pos[1],
      "font-size": size.toFixed(1),
      fill: fill || "#3a3530",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
      transform: "rotate(" + angle + " " + pos[0] + " " + pos[1] + ")",
    }, parent);
    t.textContent = text;
  }

  function render() {
    svg.innerHTML = "";
    leaves = [];
    var g = el("g", { id: "rot" }, svg);
    var totalLeaves = 0;
    WHEEL_DATA.forEach(function (core) {
      core.children.forEach(function (sec) { totalLeaves += sec.children.length; });
    });
    var unit = 360 / totalLeaves;
    var cursor = 0;

    WHEEL_DATA.forEach(function (core) {
      var coreLeaves = core.children.reduce(function (n, s) { return n + s.children.length; }, 0);
      var coreStart = cursor;
      var coreEnd = cursor + coreLeaves * unit;

      el("path", {
        d: sectorPath(RINGS.core.inner, RINGS.core.outer, coreStart, coreEnd),
        fill: core.color, stroke: "#fff", "stroke-width": 2.5,
      }, g);

      core.children.forEach(function (sec) {
        var secStart = cursor;
        var secEnd = cursor + sec.children.length * unit;
        el("path", {
          d: sectorPath(RINGS.secondary.inner, RINGS.secondary.outer, secStart, secEnd),
          fill: mixWithWhite(core.color, 0.25), stroke: "#fff", "stroke-width": 2,
        }, g);

        sec.children.forEach(function (leaf) {
          var a0 = cursor, a1 = cursor + unit;
          var p = el("path", {
            d: sectorPath(RINGS.leaf.inner, RINGS.leaf.outer, a0, a1),
            fill: mixWithWhite(core.color, 0.75), stroke: "#fff", "stroke-width": 1.5,
            "class": "leaf-seg",
          }, g);
          leaves.push({ core: core, secondary: sec, leaf: leaf, start: a0, end: a1, pathEl: p });
          addLabel(g, leaf.t[lang], RINGS.leaf, (a0 + a1) / 2);
          cursor = a1;
        });
        addLabel(g, sec.t[lang], RINGS.secondary, (secStart + secEnd) / 2);
      });
      addLabel(g, core.t[lang], RINGS.core, (coreStart + coreEnd) / 2);
    });

    // outer rim + hub
    el("circle", { r: RINGS.leaf.outer, fill: "none", stroke: "#fff", "stroke-width": 4 }, g);
    el("circle", { r: RINGS.hub, fill: "#fff", stroke: "#e8e2d8", "stroke-width": 2 }, g);

    if (selectedLeaf >= 0) leaves[selectedLeaf].pathEl.classList.add("selected");
  }

  /* ---------- spinning ---------- */

  function angleUnderPointer(rot) {
    return ((360 - (rot % 360)) + 360) % 360;
  }

  function spin() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    resultEl.hidden = true;
    if (selectedLeaf >= 0) leaves[selectedLeaf].pathEl.classList.remove("selected");
    track("spin", { lang: lang });

    var target = Math.floor(Math.random() * leaves.length);
    var leaf = leaves[target];
    var width = leaf.end - leaf.start;
    var jitter = (Math.random() - 0.5) * width * 0.7;
    var landing = ((leaf.start + leaf.end) / 2) + jitter;
    // rotation R lands on `landing` when (360 - R) % 360 === landing
    var residue = ((360 - landing) % 360 + 360) % 360;
    var base = Math.ceil((rotation + SPIN_TURNS_MIN * 360) / 360) * 360;
    var newRotation = base + Math.floor(Math.random() * 2) * 360 + residue;

    var duration = reduceMotion.matches ? 400 : SPIN_DURATION_MS;
    svg.style.transition = "transform " + duration + "ms cubic-bezier(0.12, 0.62, 0.06, 1)";
    // force reflow so the transition always kicks in
    void svg.getBoundingClientRect();
    rotation = newRotation;
    svg.style.transform = "rotate(" + rotation + "deg)";

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      spinning = false;
      spinBtn.disabled = false;
      selectedLeaf = findLeafAt(angleUnderPointer(rotation));
      showResult();
      var hit = leaves[selectedLeaf];
      // English labels as canonical values so results aggregate across languages
      track("spin_result", {
        emotion: hit.leaf.t.en,
        secondary: hit.secondary.t.en,
        core: hit.core.t.en,
        lang: lang,
      });
    }
    svg.addEventListener("transitionend", finish, { once: true });
    setTimeout(finish, duration + 300); // fallback if transitionend is missed
  }

  function findLeafAt(angle) {
    for (var i = 0; i < leaves.length; i++) {
      if (angle >= leaves[i].start && angle < leaves[i].end) return i;
    }
    return 0;
  }

  function showResult() {
    if (selectedLeaf < 0) return;
    var hit = leaves[selectedLeaf];
    hit.pathEl.classList.add("selected");
    var ui = UI_STRINGS[lang];
    document.getElementById("result-lead").textContent = ui.resultLead;
    document.getElementById("result-emotion").textContent = hit.leaf.t[lang];
    document.getElementById("result-emotion").style.color = hit.core.color;
    document.getElementById("result-path").textContent =
      hit.core.t[lang] + " › " + hit.secondary.t[lang] + " › " + hit.leaf.t[lang];
    document.getElementById("result-again").textContent = ui.again;
    resultEl.style.setProperty("--accent", hit.core.color);
    resultEl.hidden = false;
    if (navigator.vibrate) navigator.vibrate(35);
  }

  /* ---------- i18n ---------- */

  function detectLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl && UI_STRINGS[fromUrl]) return fromUrl;
    var saved = null;
    try { saved = localStorage.getItem("wheel-lang"); } catch (e) {}
    if (saved && UI_STRINGS[saved]) return saved;
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return UI_STRINGS[nav] ? nav : "en";
  }

  function applyLang(next) {
    lang = next;
    try { localStorage.setItem("wheel-lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
    var ui = UI_STRINGS[lang];
    document.title = ui.title;
    document.getElementById("title").textContent = ui.title;
    document.getElementById("tagline").textContent = ui.tagline;
    document.getElementById("credit").textContent = ui.credit;
    spinBtn.textContent = ui.spin;
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    // redraw labels without animating the current rotation
    var prev = svg.style.transition;
    svg.style.transition = "none";
    render();
    svg.style.transform = "rotate(" + rotation + "deg)";
    void svg.getBoundingClientRect();
    svg.style.transition = prev;
    if (!resultEl.hidden) showResult();
  }

  /* ---------- wire up ---------- */

  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (spinning || b.dataset.lang === lang) return;
      applyLang(b.dataset.lang);
      track("language_change", { lang: lang });
    });
  });
  spinBtn.addEventListener("click", spin);
  svg.addEventListener("click", spin);

  applyLang(lang);

  // test hook: /?autospin=1 spins once on load (used for e2e verification)
  if (new URLSearchParams(location.search).get("autospin")) {
    setTimeout(spin, 600);
  }
})();
