/* Wheel of Emotions — guided check-in flow + local patterns dashboard.
 * Spin → Identify → Understand → Regulate → Grow, in about a minute.
 * Everything is specific to the emotion (sensations, need, tools,
 * question, challenge) per MJ's evidence-based spec. Answers stay on
 * the device (localStorage); analytics get aggregate properties only
 * via the same track() convention as app.js.
 */
window.Checkin = (function () {
  "use strict";

  var STORE_KEY = "wheel-checkins";
  var STORE_MAX = 500;
  var STEPS = ["intensity", "body", "trigger", "thought", "need", "understand", "regulate", "challenge", "rerate"];
  var SVG_NS = "http://www.w3.org/2000/svg";

  var box = document.getElementById("checkin");
  var insightsBox = document.getElementById("insights");
  var insightsBtn = document.getElementById("insights-btn");
  var resultAgain = document.getElementById("result-again");

  var state = null; // { hit, lang, step, answers }

  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(name, params || {});
    }
  }

  function ui() { return UI_STRINGS[state ? state.lang : document.documentElement.lang] || UI_STRINGS.en; }

  // core guidance, with secondary-level overrides (e.g. Peaceful and
  // Excited feel different in the body than generic Happy)
  function guidanceFor() {
    var base = CORE_GUIDANCE[state.hit.core.id];
    var ov = base.overrides && base.overrides[state.hit.secondary.t.en];
    if (!ov) return base;
    var merged = {};
    var k;
    for (k in base) merged[k] = base[k];
    for (k in ov) merged[k] = ov[k];
    return merged;
  }

  /* ---------- tiny DOM helpers ---------- */

  function el(tag, cls, text, parent) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }

  function chipRow(parent, items, opts) {
    var row = el("div", "chips", null, parent);
    items.forEach(function (item) {
      var b = el("button", "chip", item.t[state.lang], row);
      b.type = "button";
      if (opts.isOn(item.id)) b.classList.add("on");
      b.addEventListener("click", function () {
        opts.toggle(item.id);
        row.querySelectorAll(".chip").forEach(function (c, i) {
          c.classList.toggle("on", opts.isOn(items[i].id));
        });
        if (opts.after) opts.after();
      });
    });
    return row;
  }

  function singleVal(get, set) {
    return {
      isOn: function (id) { return get() === id; },
      toggle: function (id) { set(get() === id ? null : id); },
    };
  }

  function nav(parent, label, onClick) {
    var row = el("div", "checkin-nav", null, parent);
    var b = el("button", "next-btn", label, row);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  function dots(parent) {
    var row = el("div", "dots", null, parent);
    row.setAttribute("aria-hidden", "true");
    STEPS.forEach(function (_, i) {
      var d = el("span", "dot", null, row);
      if (i === state.step) d.classList.add("on");
      if (i < state.step) d.classList.add("past");
    });
  }

  function card(title, hint) {
    box.innerHTML = "";
    box.hidden = false;
    if (state.step >= 0) dots(box);
    if (title) el("p", "checkin-q", title, box);
    if (hint) el("p", "checkin-hint", hint, box);
    return box;
  }

  function slider(parent, get, set) {
    var wrap = el("div", "islider", null, parent);
    var val = el("div", "islider-val", String(get()), wrap);
    var input = el("input", null, null, wrap);
    input.type = "range";
    input.min = "0"; input.max = "10"; input.step = "1";
    input.value = String(get());
    input.addEventListener("input", function () {
      set(Number(input.value));
      val.textContent = input.value;
    });
    var scale = el("div", "islider-scale", null, wrap);
    el("span", null, "0", scale);
    el("span", null, "10", scale);
  }

  function next() {
    state.step += 1;
    if (state.step >= STEPS.length) finish();
    else renderStep();
  }

  /* ---------- body silhouette (interoception by location) ---------- */

  var SILHOUETTE = [
    ["circle", { cx: 60, cy: 26, r: 17 }],
    ["rect", { x: 53, y: 41, width: 14, height: 12, rx: 4 }],
    ["rect", { x: 34, y: 52, width: 52, height: 96, rx: 18 }],
    ["rect", { x: 18, y: 58, width: 13, height: 92, rx: 6.5 }],
    ["rect", { x: 89, y: 58, width: 13, height: 92, rx: 6.5 }],
    ["circle", { cx: 24.5, cy: 156, r: 8 }],
    ["circle", { cx: 95.5, cy: 156, r: 8 }],
    ["rect", { x: 39, y: 145, width: 18, height: 96, rx: 8 }],
    ["rect", { x: 63, y: 145, width: 18, height: 96, rx: 8 }],
  ];

  var ZONE_SHAPES = {
    head: [["circle", { cx: 60, cy: 26, r: 19 }]],
    throat: [["ellipse", { cx: 60, cy: 47, rx: 11, ry: 8 }]],
    chest: [["ellipse", { cx: 60, cy: 76, rx: 23, ry: 16 }]],
    stomach: [["ellipse", { cx: 60, cy: 113, rx: 21, ry: 15 }]],
    hands: [["circle", { cx: 24.5, cy: 156, r: 11 }], ["circle", { cx: 95.5, cy: 156, r: 11 }]],
    legs: [["rect", { x: 39, y: 150, width: 18, height: 88, rx: 8 }], ["rect", { x: 63, y: 150, width: 18, height: 88, rx: 8 }]],
  };

  function svgEl(name, attrs, parent) {
    var n = document.createElementNS(SVG_NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function renderBodyMap(parent, zonesSet, onTap) {
    var wrap = el("div", "bodymap", null, parent);
    var svg = svgEl("svg", { viewBox: "0 0 120 250", "class": "bodymap-svg" }, null);
    wrap.appendChild(svg);
    SILHOUETTE.forEach(function (shape) {
      svgEl(shape[0], shape[1], svg).setAttribute("class", "silhouette");
    });
    var caption = el("p", "checkin-hint bodymap-caption", "", wrap);
    var zoneEls = {};

    function refresh() {
      CHECKIN_DATA.bodyZones.forEach(function (zone) {
        var on = zonesSet.has(zone.id);
        zoneEls[zone.id].classList.toggle("on", on);
        zoneEls[zone.id].setAttribute("aria-pressed", String(on));
      });
      caption.textContent = CHECKIN_DATA.bodyZones
        .filter(function (zone) { return zonesSet.has(zone.id); })
        .map(function (zone) { return zone.t[state.lang]; })
        .join(" · ") || " ";
    }

    CHECKIN_DATA.bodyZones.forEach(function (zone) {
      var g = svgEl("g", { "class": "zone", role: "button", tabindex: "0" }, svg);
      g.setAttribute("aria-label", zone.t[state.lang]);
      ZONE_SHAPES[zone.id].forEach(function (shape) { svgEl(shape[0], shape[1], g); });
      function toggle() {
        zonesSet.has(zone.id) ? zonesSet.delete(zone.id) : zonesSet.add(zone.id);
        if (onTap) onTap();
        refresh();
      }
      g.addEventListener("click", toggle);
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
      zoneEls[zone.id] = g;
    });

    refresh();
    return refresh;
  }

  /* ---------- steps ---------- */

  var RENDER = {
    accuracy: function () {
      state.step = -1;
      card(ui().accuracy);
      var row = el("div", "checkin-nav", null, box);
      var yes = el("button", "next-btn", ui().yes, row);
      yes.type = "button";
      yes.addEventListener("click", function () {
        track("checkin_start", { emotion: state.hit.leaf.t.en, core: state.hit.core.id, lang: state.lang });
        state.step = 0;
        renderStep();
      });
      var no = el("button", "ghost-btn", ui().notQuite, row);
      no.type = "button";
      no.addEventListener("click", function () {
        track("checkin_reject", { emotion: state.hit.leaf.t.en, lang: state.lang });
        reset();
        resultAgain.hidden = false;
      });
    },

    intensity: function () {
      card(ui().intensityQ, ui().intensityHint);
      slider(box,
        function () { return state.answers.intensity; },
        function (v) { state.answers.intensity = v; });
      nav(box, ui().next, next);
    },

    body: function () {
      card(ui().bodyQ, ui().multiHint);
      var zonesSet = state.answers.body;
      var sensSet = state.answers.sensations;
      var row, refreshZones;

      function syncRow() {
        row.querySelectorAll(".chip").forEach(function (c, i) {
          c.classList.toggle("on", sensSet.has(items[i].id));
        });
      }

      refreshZones = renderBodyMap(box, zonesSet, function () {
        sensSet.delete("none");
        syncRow();
      });

      el("p", "checkin-hint sensations-lead", ui().sensationsLead, box);
      var items = guidanceFor().sensations.map(function (s) { return { id: s.en, t: s }; });
      items.push({ id: "none", t: { en: UI_STRINGS.en.noneBody, es: UI_STRINGS.es.noneBody } });
      row = chipRow(box, items, {
        isOn: function (id) { return sensSet.has(id); },
        toggle: function (id) {
          if (id === "none") {
            var wasOn = sensSet.has("none");
            sensSet.clear();
            zonesSet.clear();
            if (!wasOn) sensSet.add("none");
          } else {
            sensSet.delete("none");
            sensSet.has(id) ? sensSet.delete(id) : sensSet.add(id);
          }
        },
        after: function () { refreshZones(); },
      });
      nav(box, ui().next, next);
    },

    trigger: function () {
      card(ui().triggerQ);
      chipRow(box, CHECKIN_DATA.triggers, singleVal(
        function () { return state.answers.trigger; },
        function (v) { state.answers.trigger = v; }
      ));
      nav(box, ui().next, next);
    },

    thought: function () {
      card(ui().thoughtQ);
      var opts = singleVal(
        function () { return state.answers.thought; },
        function (v) { state.answers.thought = v; }
      );
      opts.after = function () {
        own.hidden = state.answers.thought !== "own";
        evidence.hidden = !state.answers.thought || state.answers.thought === "none";
        if (!own.hidden) own.focus();
      };
      chipRow(box, CHECKIN_DATA.thoughts, opts);
      var own = el("input", "own-thought", null, box);
      own.type = "text";
      own.placeholder = ui().thoughtPlaceholder;
      own.maxLength = 120;
      own.value = state.answers.ownThought;
      own.hidden = state.answers.thought !== "own";
      own.addEventListener("input", function () { state.answers.ownThought = own.value; });
      var evidence = el("p", "checkin-hint evidence", ui().evidence, box);
      evidence.hidden = !state.answers.thought || state.answers.thought === "none";
      nav(box, ui().next, next);
    },

    need: function () {
      card(ui().needQ, ui().multiHint);
      var set = state.answers.need;
      chipRow(box, CHECKIN_DATA.needs, {
        isOn: function (id) { return set.has(id); },
        toggle: function (id) {
          if (id === "unknown") {
            var wasOn = set.has("unknown");
            set.clear();
            if (!wasOn) set.add("unknown");
          } else {
            set.delete("unknown");
            set.has(id) ? set.delete(id) : set.add(id);
          }
        },
      });
      nav(box, ui().next, next);
    },

    understand: function () {
      card(ui().understandTitle);
      var g = guidanceFor();
      el("p", "checkin-body", ui().noticingTpl.replace("{e}", g.noun[state.lang]), box);
      el("p", "checkin-body", g.purpose[state.lang], box);
      el("p", "checkin-body need-line", ui().needTpl.replace("{n}", g.need[state.lang]), box);
      el("p", "checkin-hint", ui().normalize, box);
      nav(box, ui().next, next);
    },

    regulate: function () {
      var g = guidanceFor();
      card(ui().regulateQ, g.savor ? g.savor[state.lang] : null);
      var items = g.tools.map(function (tool, i) {
        return { id: String(i), t: tool };
      });
      var row = chipRow(box, items, singleVal(
        function () { return state.answers.tool; },
        function (v) { state.answers.tool = v; }
      ));
      row.classList.add("chips-wide");
      el("p", "checkin-hint evidence", g.question[state.lang], box);
      nav(box, ui().next, next);
    },

    challenge: function () {
      card(ui().challengeTitle);
      el("p", "checkin-body challenge", guidanceFor().challenge[state.lang], box);
      el("p", "checkin-hint evidence", ui().futureYou, box);
      nav(box, ui().next, next);
    },

    rerate: function () {
      card(ui().rerateQ, ui().rerateHint);
      if (state.answers.intensityAfter == null) state.answers.intensityAfter = state.answers.intensity;
      slider(box,
        function () { return state.answers.intensityAfter; },
        function (v) { state.answers.intensityAfter = v; });
      nav(box, ui().doneBtn, next);
    },
  };

  function renderStep() {
    if (state.step >= STEPS.length) renderDone();
    else RENDER[state.step === -1 ? "accuracy" : STEPS[state.step]]();
  }

  function renderDone() {
    box.innerHTML = "";
    box.hidden = false;
    el("p", "checkin-q", ui().completeTitle, box);
    el("p", "checkin-body", ui().completeMsg, box);
    var before = state.answers.intensity;
    var after = state.answers.intensityAfter;
    if (after != null) {
      var tpl = after < before ? ui().deltaDown : ui().deltaFlat;
      el("p", "checkin-hint", tpl.replace("{0}", String(before)).replace("{1}", String(after)), box);
    }
    nav(box, ui().patterns, function () {
      openInsights();
      insightsBox.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function finish() {
    save();
    track("checkin_complete", {
      emotion: state.hit.leaf.t.en,
      core: state.hit.core.id,
      intensity_before: state.answers.intensity,
      intensity_after: state.answers.intensityAfter,
      body: Array.from(state.answers.body).join(",") || null,
      sensations: Array.from(state.answers.sensations).join(",") || null,
      trigger: state.answers.trigger,
      thought: state.answers.thought,
      need: Array.from(state.answers.need).join(",") || null,
      tool: state.answers.tool,
      lang: state.lang,
    });
    state.step = STEPS.length; // completed marker
    renderDone();
  }

  /* ---------- storage ---------- */

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (e) { return []; }
  }

  function save() {
    var records = load();
    records.push({
      ts: Date.now(),
      emotion: state.hit.leaf.t.en,
      core: state.hit.core.id,
      intensity: state.answers.intensity,
      intensityAfter: state.answers.intensityAfter,
      body: Array.from(state.answers.body),
      sensations: Array.from(state.answers.sensations),
      trigger: state.answers.trigger,
      thought: state.answers.thought === "own"
        ? (state.answers.ownThought || "own") : state.answers.thought,
      need: Array.from(state.answers.need),
      tool: state.answers.tool == null ? null : state.hit.core.id + ":" + state.answers.tool,
    });
    if (records.length > STORE_MAX) records = records.slice(records.length - STORE_MAX);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(records)); } catch (e) {}
  }

  /* ---------- patterns dashboard ---------- */

  function topCounts(pairs, n) {
    var counts = {};
    pairs.forEach(function (k) { if (k) counts[k] = (counts[k] || 0) + 1; });
    return Object.keys(counts)
      .sort(function (a, b) { return counts[b] - counts[a]; })
      .slice(0, n)
      .map(function (k) { return { key: k, count: counts[k] }; });
  }

  function labelMaps(lang) {
    var emotion = {};
    WHEEL_DATA.forEach(function (core) {
      core.children.forEach(function (sec) {
        sec.children.forEach(function (leaf) { emotion[leaf.t.en] = leaf.t[lang]; });
      });
    });
    var byId = function (list) {
      var m = {};
      list.forEach(function (item) { m[item.id] = item.t[lang]; });
      return m;
    };
    // sensations are stored as their English text; map across all cores + overrides
    var sensations = {};
    Object.keys(CORE_GUIDANCE).forEach(function (coreId) {
      var g = CORE_GUIDANCE[coreId];
      (g.sensations || []).forEach(function (s) { sensations[s.en] = s[lang]; });
      var ov = g.overrides || {};
      Object.keys(ov).forEach(function (key) {
        (ov[key].sensations || []).forEach(function (s) { sensations[s.en] = s[lang]; });
      });
    });
    sensations.none = UI_STRINGS[lang].noneBody;
    return {
      emotion: emotion,
      trigger: byId(CHECKIN_DATA.triggers),
      body: byId(CHECKIN_DATA.bodyZones),
      sensations: sensations,
      tool: function (key) {
        var parts = key.split(":");
        var g = CORE_GUIDANCE[parts[0]];
        return g && g.tools[Number(parts[1])] ? g.tools[Number(parts[1])][lang] : key;
      },
    };
  }

  function statList(parent, title, rows) {
    if (!rows.length) return;
    var sec = el("div", "stat", null, parent);
    el("h3", null, title, sec);
    var max = rows[0].count;
    rows.forEach(function (r) {
      var line = el("div", "stat-row", null, sec);
      el("span", "stat-label", r.label, line);
      var bar = el("span", "stat-bar", null, line);
      bar.style.width = Math.max(8, Math.round((r.count / max) * 100)) + "%";
      el("span", "stat-count", String(r.count), line);
    });
  }

  function openInsights() {
    var lang = state ? state.lang : (document.documentElement.lang || "en");
    var strings = UI_STRINGS[lang] || UI_STRINGS.en;
    var records = load();
    insightsBox.innerHTML = "";
    insightsBox.hidden = false;
    el("h2", null, strings.patterns, insightsBox);

    if (records.length < 1) {
      el("p", "checkin-hint", strings.patternsEmpty, insightsBox);
    } else {
      var maps = labelMaps(lang);
      var week = Date.now() - 7 * 24 * 3600 * 1000;
      var recent = records.filter(function (r) { return r.ts >= week; }).length;
      var withIntensity = records.filter(function (r) { return typeof r.intensity === "number"; });
      var avg = withIntensity.length
        ? (withIntensity.reduce(function (s, r) { return s + r.intensity; }, 0) / withIntensity.length).toFixed(1)
        : null;
      var summary = records.length + " " + strings.statCheckins + " · " + recent + " " + strings.statLast7 +
        (avg != null ? " · " + strings.statIntensity + ": " + avg + "/10" : "");
      el("p", "checkin-hint", summary, insightsBox);

      var label = function (map) {
        return function (r) { return { label: typeof map === "function" ? map(r.key) : (map[r.key] || r.key), count: r.count }; };
      };
      statList(insightsBox, strings.statEmotions, topCounts(records.map(function (r) { return r.emotion; }), 5).map(label(maps.emotion)));
      statList(insightsBox, strings.statTriggers, topCounts(records.map(function (r) { return r.trigger; }), 5).map(label(maps.trigger)));
      statList(insightsBox, strings.statBody, topCounts(records.reduce(function (a, r) { return a.concat(r.body || []); }, []), 5).map(label(maps.body)));
      statList(insightsBox, strings.statSensations, topCounts(records.reduce(function (a, r) { return a.concat(r.sensations || []); }, []), 5).map(label(maps.sensations)));
      statList(insightsBox, strings.statTools, topCounts(records.map(function (r) { return r.tool; }), 5).map(label(maps.tool)));
    }

    var closeBtn = el("button", "ghost-btn", strings.close, insightsBox);
    closeBtn.type = "button";
    closeBtn.addEventListener("click", function () { insightsBox.hidden = true; });
  }

  insightsBtn.addEventListener("click", function () {
    insightsBox.hidden ? openInsights() : (insightsBox.hidden = true);
  });

  /* ---------- public API (called from app.js) ---------- */

  function offer(hit, lang) {
    // language re-render mid-flow: keep answers, swap labels
    if (state && state.emotionEn === hit.leaf.t.en) {
      state.hit = hit;
      state.lang = lang;
      renderStep();
      return;
    }
    state = {
      hit: hit,
      lang: lang,
      emotionEn: hit.leaf.t.en,
      step: -1,
      answers: {
        intensity: 5,
        intensityAfter: null,
        body: new Set(),
        sensations: new Set(),
        trigger: null,
        thought: null,
        ownThought: "",
        need: new Set(),
        tool: null,
      },
    };
    resultAgain.hidden = true;
    renderStep();
  }

  function reset() {
    state = null;
    box.hidden = true;
    box.innerHTML = "";
    resultAgain.hidden = false;
  }

  function setLang(lang) {
    if (state) { state.lang = lang; }
    insightsBtn.textContent = (UI_STRINGS[lang] || UI_STRINGS.en).patterns;
    if (!insightsBox.hidden) openInsights();
  }

  return { offer: offer, reset: reset, setLang: setLang };
})();
