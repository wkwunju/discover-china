/* Discover China — interactive map app
   Modern, map-first travel companion. Vanilla JS + MapLibre GL.

   All editable CONTENT (city data, routes, Before-You-Go modules, app list)
   lives in content.js, which index.html loads before this file. This file
   is the structure/logic only. */


/* ---------- DOM refs ---------- */
const $ = (id) => document.getElementById(id);
const els = {
  photo: $("placePhoto"),
  credit: $("placeCredit"),
  region: $("placeRegion"),
  name: $("placeName"),
  cn: $("placeCn"),
  summary: $("placeSummary"),
  best: $("placeBest"),
  why: $("placeWhy"),
  mistake: $("placeMistake"),
  pair: $("placePair"),
  todo: $("placeTodo"),
  facts: $("placeFacts"),
  show: $("placeShow"),
  prepGrid: $("prepGrid"),
  toast: $("toast"),
  appsGrid: $("appsGrid"),
  wizard: $("wizard"),
  plan: $("plan"),
  planLoading: $("planLoading"),
  segList: $("segList"),
  planTitle: $("planTitle"),
  planMeta: $("planMeta"),
  detailWrap: $("detailWrap"),
};

let activeId = "beijing";
let plannedIds = new Set();
let answers = { days: "7", focus: "firstTrip", cities: [], entry: "shanghai", exit: "beijing" };

/* international connectivity rank (higher = more / bigger int'l flights).
   Drives the arrive/depart order and the city-card "flight access" fact. */
const GATEWAY = {
  shanghai: 10,
  beijing: 10,
  guangzhou: 9,
  chengdu: 8,
  hangzhou: 7,
  xian: 6,
  yunnan: 5,
  guilin: 4,
  xinjiang: 3,
  zhangjiajie: 2,
};
let currentRoute = [];
let map = null;
const markers = new Map();
let toastTimer = null;

/* deck.gl route-arc state */
let deckOverlay = null;
let routePath = [];
let routeStamps = [];
let routeNodes = [];
let routeLoop = 1;
let animTime = 0;

const byName = (n) => DESTINATIONS.find((d) => d.name === n);
const byId = (id) => DESTINATIONS.find((d) => d.id === id);

/* ---------- toast ---------- */
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1800);
}

/* ---------- detail panel ---------- */
function renderDetail() {
  const d = byId(activeId);
  els.photo.classList.add("loading");
  els.photo.src = d.photo;
  els.photo.alt = `${d.name}, ${d.region}`;
  els.photo.onload = () => els.photo.classList.remove("loading");
  els.photo.onerror = () => els.photo.classList.remove("loading");
  els.credit.textContent = d.credit;
  els.region.textContent = d.region;
  els.name.textContent = d.name;
  els.cn.textContent = d.cn;
  els.summary.textContent = d.summary;
  els.best.textContent = d.bestFor;
  els.why.textContent = d.why;
  els.mistake.textContent = d.mistake;
  els.pair.textContent = d.pair;
  renderTodo(d);
  renderFacts(d);
  renderShow(d);
}

/* "Show a local" — English → Chinese phrase pairs you can show to someone.
   City-specific place names (if any) + a universal travel phrasebook. */
const SHOW_COMMON = [
  { en: "Please take me to this address", cn: "请送我到这个地址" },
  { en: "Where is the toilet?", cn: "厕所在哪里？" },
  { en: "How much is it?", cn: "多少钱？" },
  { en: "Not spicy, please", cn: "请不要辣" },
  { en: "I'm vegetarian", cn: "我吃素" },
  { en: "Do you have an English menu?", cn: "有英文菜单吗？" },
  { en: "Please help me call a taxi", cn: "请帮我叫一辆出租车" },
  { en: "I don't understand", cn: "我听不懂" },
];
function renderShow(d) {
  const group = (label, pairs) =>
    pairs.length
      ? `<div class="show-group"><span class="show-group-label">${label}</span>
          <div class="show-rows">${pairs
            .map(
              (p) =>
                `<button class="show-row" type="button" data-en="${p.en}" data-cn="${p.cn}">
                  <span class="show-en">${p.en}</span>
                  <span class="show-cn">${p.cn}</span>
                </button>`,
            )
            .join("")}</div></div>`
      : "";
  els.show.innerHTML =
    group("Places in this city", d.show || []) +
    group("Useful phrases", SHOW_COMMON);
  els.show.querySelectorAll(".show-row").forEach((b) =>
    b.addEventListener("click", () => openShowBig(b.dataset.en, b.dataset.cn)),
  );
}
function openShowBig(en, cn) {
  $("showBigEn").textContent = en;
  $("showBigCn").textContent = cn;
  $("showOverlay").hidden = false;
  document.body.classList.add("show-open");
}
function closeShowBig() {
  $("showOverlay").hidden = true;
  document.body.classList.remove("show-open");
}

/* "What to do" — categorised (See / Experience / Eat) when data exists,
   otherwise a simple highlight list */
const TODO_CATS = [
  { key: "see", label: "See", ico: "🏛" },
  { key: "experience", label: "Experience", ico: "🚶" },
  { key: "eat", label: "Eat", ico: "🍜" },
];
function renderTodo(d) {
  if (d.todo) {
    els.todo.className = "todo-cats";
    els.todo.innerHTML = TODO_CATS.filter((c) => (d.todo[c.key] || []).length)
      .map(
        (c) => `<div class="todo-cat">
          <span class="todo-h"><i>${c.ico}</i> ${c.label}</span>
          <ul>${d.todo[c.key].map((x) => `<li>${x}</li>`).join("")}</ul>
        </div>`,
      )
      .join("");
  } else {
    els.todo.className = "do-list";
    els.todo.innerHTML = `<ul>${(d.experiences || [])
      .map((e) => `<li>${e}</li>`)
      .join("")}</ul>`;
  }
}

/* "Good to know" facts — rich set when present, basics otherwise */
function renderFacts(d) {
  const rows = [["Ideal stay", d.stay]];
  rows.push(["Best season", d.seasonLong || d.season]);
  if (d.facts) {
    if (d.facts.climate) rows.push(["Climate", d.facts.climate]);
    if (d.facts.rail) rows.push(["Rail access", d.facts.rail]);
    if (d.facts.metro) rows.push(["Metro", d.facts.metro]);
    if (d.facts.flights) rows.push(["Flights", d.facts.flights]);
    if (d.facts.english) rows.push(["English", d.facts.english]);
    if (d.facts.prices) rows.push(["Prices", d.facts.prices]);
  } else {
    rows.push(["Rail access", d.hub]);
  }
  els.facts.innerHTML = rows
    .map(([k, v]) => `<div class="frow"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("");
}

/* ---------- markers ---------- */
function refreshMarkers() {
  markers.forEach((m, id) => {
    const el = m.getElement();
    // before a plan exists, nothing is dimmed; after, non-route cities dim
    el.classList.toggle("dimmed", plannedIds.size > 0 && !plannedIds.has(id));
    el.classList.toggle("active", id === activeId);
  });
}

// marker clicks open the city guide (showCity is defined below in the planner)
function selectDestination(id, fly = false) {
  showCity(id, fly);
}

/* ========================================================================
   TRIP PLANNER — 3-question wizard → high-level itinerary + transport legs
   The generator is rule-based (free, instant, offline). It's isolated in
   buildItinerary() so a real Claude API call can replace it later.
   ======================================================================== */
const FOCUS_LABEL = {
  firstTrip: "Discovery",
  food: "Food",
  nature: "Nature",
  slow: "Slow travel",
};

/* great-circle distance, km */
function haversineKm(a, b) {
  const R = 6371,
    rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad,
    dLng = (b.lng - a.lng) * rad;
  const la1 = a.lat * rad,
    la2 = b.lat * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* decide how to travel between two cities: rail vs flight */
function planLeg(from, to) {
  const km = Math.round(haversineKm(from, to));
  const remote = from.hub === "Specialized" || to.hub === "Specialized";
  if (remote || km > 1500) {
    const h = Math.max(2, Math.round(km / 700));
    return {
      mode: "Flight",
      ico: "✈",
      time: `~${h}h flight`,
      note: remote ? "no through train" : "too far for rail",
      km,
    };
  }
  let h = Math.max(1, Math.round((km / 210) * 2) / 2);
  return { mode: "High-speed rail", ico: "🚄", time: `~${h}h by rail`, note: "", km };
}

/* day-by-day name array → [{name, nights}] segments */
function toSegments(arr) {
  const segs = [];
  arr.forEach((name) => {
    const last = segs[segs.length - 1];
    if (last && last.name === name) last.nights++;
    else segs.push({ name, nights: 1 });
  });
  return segs;
}

/* ensure a must-visit city is in the plan, placed near its closest stop */
function injectCity(segs, cityId) {
  const c = byId(cityId);
  if (!c || segs.some((s) => byName(s.name)?.id === cityId)) return segs;
  let nearIdx = 0,
    best = Infinity;
  segs.forEach((s, i) => {
    const d = byName(s.name);
    if (!d) return;
    const km = haversineKm(d, c);
    if (km < best) {
      best = km;
      nearIdx = i;
    }
  });
  let maxIdx = 0;
  segs.forEach((s, i) => {
    if (s.nights > segs[maxIdx].nights) maxIdx = i;
  });
  if (segs[maxIdx].nights > 1) segs[maxIdx].nights--;
  segs.splice(nearIdx + 1, 0, { name: c.name, nights: 1 });
  return segs;
}

/* stretch or trim a segment list to hit an exact number of nights */
function scaleSegments(segs, targetDays) {
  let total = segs.reduce((s, x) => s + x.nights, 0);
  // grow: add nights to the currently-smallest segments (balances stays)
  while (total < targetDays) {
    let minIdx = 0;
    segs.forEach((s, i) => {
      if (s.nights < segs[minIdx].nights) minIdx = i;
    });
    segs[minIdx].nights++;
    total++;
  }
  // shrink: trim the largest segments, never below 1 night
  while (total > targetDays) {
    let maxIdx = -1;
    segs.forEach((s, i) => {
      if (s.nights > 1 && (maxIdx < 0 || s.nights > segs[maxIdx].nights)) maxIdx = i;
    });
    if (maxIdx < 0) break; // every city already at 1 night
    segs[maxIdx].nights--;
    total--;
  }
  return segs;
}

/* nearest-neighbour order through a set of cities, starting nearest to `start`
   (or the easternmost city if no start given) */
function orderFrom(start, pts) {
  const remaining = pts.slice();
  if (!remaining.length) return [];
  let order = [];
  if (start) {
    remaining.sort((a, b) => haversineKm(start, a) - haversineKm(start, b));
  } else {
    remaining.sort((a, b) => b.lng - a.lng);
  }
  order.push(remaining.shift());
  while (remaining.length) {
    const last = order[order.length - 1];
    let bi = 0,
      bd = Infinity;
    remaining.forEach((p, i) => {
      const km = haversineKm(last, p);
      if (km < bd) {
        bd = km;
        bi = i;
      }
    });
    order.push(remaining.splice(bi, 1)[0]);
  }
  return order;
}

/* the generator: answers → {segs, route, days}
   - first segment = arrival city, last = departure city
   - must-visit cities are guaranteed; otherwise the focus route fills the middle
   - no forced Beijing — cities come only from entry/exit/must-visit/curated */
function buildItinerary({ days, focus, cities, entry, exit }) {
  const want = Math.max(2, Math.min(60, parseInt(days, 10) || 7));
  const entryD = byId(entry);
  const exitD = byId(exit);

  // the pool that fills the middle of the trip
  let pool;
  if (cities && cities.length) {
    pool = cities.map(byId).filter(Boolean);
  } else {
    const plans = PLANS[focus] || PLANS.firstTrip;
    const lengths = [3, 5, 7, 10, 14];
    const baseLen = lengths.reduce((p, c) =>
      Math.abs(c - want) < Math.abs(p - want) ? c : p,
    );
    pool = [...new Set(plans[baseLen] || PLANS.firstTrip[7])]
      .map(byName)
      .filter(Boolean);
  }

  // middle = pool minus the entry/exit anchors
  const anchors = new Set([entryD?.id, exitD?.id].filter(Boolean));
  const middle = orderFrom(
    entryD,
    pool.filter((d) => !anchors.has(d.id)),
  );

  // stitch the sequence: entry → middle → exit
  const seq = [];
  if (entryD) seq.push(entryD.name);
  middle.forEach((d) => seq.push(d.name));
  if (exitD && seq[seq.length - 1] !== exitD.name) seq.push(exitD.name);
  if (!seq.length) seq.push("Beijing"); // ultimate fallback

  let segs = seq.map((name) => ({ name, nights: 1 }));
  segs = scaleSegments(segs, Math.max(want, segs.length));
  const route = [];
  segs.forEach((s) => {
    for (let i = 0; i < s.nights; i++) route.push(s.name);
  });
  return { segs, route, days: route.length };
}

/* render the generated plan into the panel */
function renderPlan() {
  const { segs, route, days } = buildItinerary(answers);
  currentRoute = route;
  plannedIds = new Set(segs.map((s) => byName(s.name)?.id).filter(Boolean));

  els.planTitle.textContent = `${days} days · ${FOCUS_LABEL[answers.focus]}`;

  // transport summary
  const legs = [];
  for (let i = 0; i < segs.length - 1; i++) {
    legs.push(planLeg(byName(segs[i].name), byName(segs[i + 1].name)));
  }
  const flights = legs.filter((l) => l.mode === "Flight").length;
  const rails = legs.length - flights;
  const bits = [`${segs.length} cities`, `${answers.days} days`];
  if (rails) bits.push(`${rails} rail leg${rails > 1 ? "s" : ""}`);
  if (flights) bits.push(`${flights} flight${flights > 1 ? "s" : ""}`);
  els.planMeta.textContent = bits.join(" · ");

  // interleave city segments with transport legs
  let html = "";
  let dayCursor = 1;
  segs.forEach((s, i) => {
    const d = byName(s.name);
    if (!d) return;
    const acts = d.experiences || [];
    // a day-by-day breakdown for multi-night stays, else a few highlights
    let body;
    if (s.nights > 1) {
      const rows = [];
      for (let n = 0; n < s.nights; n++) {
        const act =
          acts[n] || `Explore more of ${d.name}, or take a nearby day trip`;
        rows.push(
          `<li><span class="day-tag">Day ${dayCursor + n}</span><span>${act}</span></li>`,
        );
      }
      body = `<ul class="seg-days">${rows.join("")}</ul>`;
    } else {
      const hi = acts
        .slice(0, 3)
        .map((e) => `<li>${e}</li>`)
        .join("");
      body = `<ul class="seg-hi">${hi}</ul>`;
    }
    html += `<li class="seg" data-id="${d.id}" style="animation-delay:${i * 60}ms">
      <span class="seg-num">${i + 1}</span>
      <div class="seg-body">
        <h3>${d.name} <i>${d.cn}</i> <span class="seg-nights">${s.nights} night${s.nights > 1 ? "s" : ""}</span></h3>
        <p class="seg-region">${d.region} · ${d.bestFor}</p>
        ${body}
        <button class="seg-more" type="button" data-id="${d.id}">City guide →</button>
      </div>
    </li>`;
    dayCursor += s.nights;
    if (i < segs.length - 1) {
      const leg = legs[i];
      html += `<li class="leg"><span class="leg-ico">${leg.ico}</span>
        <span class="leg-txt"><b>${leg.mode}</b> · ${leg.time}${leg.note ? ` · ${leg.note}` : ""}</span></li>`;
    }
  });
  els.segList.innerHTML = html;
  els.segList.querySelectorAll(".seg, .seg-more").forEach((node) =>
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      showCity(node.dataset.id, true);
    }),
  );

  drawRouteLine(route);
  refreshMarkers();
}

/* swap to the generating shimmer, then the plan */
function generatePlan() {
  els.wizard.hidden = true;
  els.detailWrap.hidden = true;
  els.plan.hidden = true;
  els.planLoading.hidden = false;
  setTimeout(() => {
    els.planLoading.hidden = true;
    els.plan.hidden = false;
    renderPlan();
  }, 750);
}

/* open a city's full guide below the plan */
function showCity(id, fly = false) {
  activeId = id;
  renderDetail();
  refreshMarkers();
  els.detailWrap.hidden = false;
  els.detailWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  if (fly && map) {
    const d = byId(id);
    map.flyTo({
      center: [d.lng, d.lat],
      zoom: 5.2,
      speed: 0.9,
      padding: mapPadding(),
      essential: true,
    });
  }
}

/* back to the wizard to change answers */
function editTrip() {
  els.plan.hidden = true;
  els.detailWrap.hidden = true;
  els.wizard.hidden = false;
  els.wizard.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* sample a gently-bowed arc between two lng/lat points (for the comet path) */
function sampleArc(a, b, n = 40) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dist = Math.hypot(dx, dy) || 1e-6;
  // perpendicular (left-hand) lift, scaled to leg length
  const lift = dist * 0.16;
  const cx = (a[0] + b[0]) / 2 - (dy / dist) * lift;
  const cy = (a[1] + b[1]) / 2 + (dx / dist) * lift;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const mt = 1 - t;
    const x = mt * mt * a[0] + 2 * mt * t * cx + t * t * b[0];
    const y = mt * mt * a[1] + 2 * mt * t * cy + t * t * b[1];
    pts.push([x, y]);
  }
  return pts;
}

/* build the flowing-comet geometry from the current route */
function drawRouteLine(route) {
  const stops = [];
  route.forEach((stop) => {
    const d = byName(stop);
    if (!d) return;
    const last = stops[stops.length - 1];
    if (!last || last.lng !== d.lng || last.lat !== d.lat) stops.push(d);
  });
  routeNodes = stops.map((d) => ({ pos: [d.lng, d.lat] }));
  const path = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const seg = sampleArc(
      [stops[i].lng, stops[i].lat],
      [stops[i + 1].lng, stops[i + 1].lat],
    );
    seg.forEach((p, k) => {
      if (i > 0 && k === 0) return; // avoid duplicate joints
      path.push(p);
    });
  }
  routePath = path;
  routeStamps = path.map((_, i) => i);
  routeLoop = path.length + Math.max(24, path.length * 0.18);
  if (animTime > routeLoop) animTime = 0;
}

/* deck.gl layers rebuilt every frame with the moving comet head */
function buildDeckLayers(time) {
  if (!window.deck || !routePath.length) return [];
  const { TripsLayer } = deck;
  const trail = Math.max(18, routePath.length * 0.14);
  return [
    new deck.PathLayer({
      id: "route-base",
      data: [{ path: routePath }],
      getPath: (d) => d.path,
      getColor: [227, 166, 74, 70],
      getWidth: 2.2,
      widthUnits: "pixels",
      capRounded: true,
      jointRounded: true,
    }),
    new TripsLayer({
      id: "route-glow",
      data: [{ path: routePath, timestamps: routeStamps }],
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: [231, 121, 95],
      opacity: 0.35,
      widthMinPixels: 9,
      trailLength: trail * 1.4,
      currentTime: time,
      capRounded: true,
      jointRounded: true,
    }),
    new TripsLayer({
      id: "route-comet",
      data: [{ path: routePath, timestamps: routeStamps }],
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: [255, 221, 160],
      opacity: 0.95,
      widthMinPixels: 3,
      trailLength: trail,
      currentTime: time,
      capRounded: true,
      jointRounded: true,
    }),
    new deck.ScatterplotLayer({
      id: "route-glow-nodes",
      data: routeNodes,
      getPosition: (d) => d.pos,
      getRadius: 15,
      radiusUnits: "pixels",
      getFillColor: [231, 121, 95, 80],
    }),
  ];
}

function tickDeck() {
  animTime = (animTime + Math.max(0.4, routeLoop / 220)) % routeLoop;
  if (deckOverlay) deckOverlay.setProps({ layers: buildDeckLayers(animTime) });
  requestAnimationFrame(tickDeck);
}

/* ---------- prep: interactive before-you-go checklist ---------- */
const PREP_KEY = "dc-prep-checked";
function loadChecked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(PREP_KEY) || "[]"));
  } catch {
    return new Set();
  }
}
function saveChecked() {
  try {
    localStorage.setItem(PREP_KEY, JSON.stringify([...prepChecked]));
  } catch {}
}
let prepChecked = loadChecked();

function ckRow(key, label, why, opts = {}) {
  const on = prepChecked.has(key);
  const risk = opts.risk ? `<span class="ck-risk">⚠ ${opts.risk}</span>` : "";
  const opt = opts.opt ? `<span class="ck-opt">optional</span>` : "";
  return `<label class="ck${on ? " done" : ""}" data-k="${key}">
    <input type="checkbox" ${on ? "checked" : ""} />
    <span class="ck-box"></span>
    <span class="ck-body">
      <span class="ck-do">${label}${opt}</span>
      ${why ? `<span class="ck-why">${why}</span>` : ""}
      ${risk}
    </span>
  </label>`;
}

function renderPrep() {
  els.prepGrid.innerHTML = ["pay", "comm", "net", "mob"]
    .map((mid) => PREP.find((x) => x.id === mid))
    .map((m) => {
    const steps = m.steps
      .map((s, i) => ckRow(`${m.id}-${i}`, s.do, s.why, { risk: s.risk, opt: s.opt }))
      .join("");
    const apps = APPS.filter((a) => a.cat === m.id)
      .map((a) => {
        const k = `app-${a.id}`;
        const on = prepChecked.has(k);
        return `<div class="m-app">
          <label class="app-dl${on ? " done" : ""}" data-k="${k}" title="Mark as downloaded">
            <input type="checkbox" ${on ? "checked" : ""} />
            <span class="ck-box"></span>
          </label>
          <button class="app-open" type="button" data-app="${a.id}">
            ${
              a.logo
                ? `<img class="app-logo" src="${a.logo}" alt="${a.name} logo" loading="lazy" />`
                : `<span class="app-logo app-logo-fallback">${a.glyph || a.name[0]}</span>`
            }
            <span class="app-text">
              <span class="app-name">${a.name}${a.cn ? ` <i>${a.cn}</i>` : ""}</span>
              <span class="app-note">${a.note}</span>
              <span class="app-more-hint">Full step-by-step →</span>
            </span>
          </button>
          ${a.link ? `<a class="app-link" href="${a.link}" target="_blank" rel="noopener" title="Official site" aria-label="${a.name} official site">↗</a>` : ""}
        </div>`;
      })
      .join("");
    const warnPts = m.warn.points.map((p) => `<li>${p}</li>`).join("");
    const img = m.img
      ? `<div class="prep-module-img">
          <img src="${m.img}" alt="${m.title} — ${m.tag}" loading="lazy" />
          ${m.imgCredit ? `<span class="prep-module-credit">${m.imgCredit}</span>` : ""}
        </div>`
      : "";
    return `<article class="prep-module" data-mod="${m.id}">
      ${img}
      <div class="prep-module-body">
        <div class="prep-card-head">
          <div class="prep-ico">${m.ico}</div>
          <div class="prep-card-meta">
            <h3>${m.title}</h3>
            <p class="prep-tag">${m.tag}</p>
          </div>
          <span class="prep-count" data-count="${m.id}"></span>
        </div>
        ${m.intro ? `<p class="m-intro">${m.intro}</p>` : ""}
        <div class="m-block">
          <span class="m-label">Key tips</span>
          <div class="ck-list">${steps}</div>
        </div>
        ${
          apps
            ? `<div class="m-block">
          <span class="m-label">Key apps &amp; how to set up</span>
          <div class="m-apps">${apps}</div>
        </div>`
            : ""
        }
        <button class="prep-more" type="button" aria-expanded="false">
          Common mistakes &amp; traveller notes <span class="chev">▾</span>
        </button>
        <div class="prep-detail" hidden>
          <div class="warn-box">
            <span class="warn-title">${m.warn.title}</span>
            <ul>${warnPts}</ul>
          </div>
          <p class="trav-quote">“${m.quote}”<span class="trav-by">— traveller report · X · 2025–26</span></p>
        </div>
      </div>
    </article>`;
  }).join("");

  wirePrep();
  updatePrepProgress();
}

/* ---------- app detail modal ---------- */
function openAppModal(id) {
  const a = APPS.find((x) => x.id === id);
  const m = $("appModal");
  if (!a || !m) return;
  const cat = APP_CATS.find((c) => c.key === a.cat);
  const logo = m.querySelector(".app-modal-logo");
  if (a.logo) {
    logo.src = a.logo;
    logo.hidden = false;
  } else {
    logo.hidden = true;
  }
  m.querySelector(".app-modal-badge").textContent = cat ? cat.label : "";
  m.querySelector(".app-modal-title").innerHTML = `${a.name}${a.cn ? ` <i>${a.cn}</i>` : ""}`;
  m.querySelector(".app-modal-what").textContent = a.what;
  m.querySelector(".app-modal-howto").innerHTML = (a.howto || [])
    .map((s, i) =>
      i === 0 && a.link
        ? `<li>${s} <a class="step-dl" href="${a.link}" target="_blank" rel="noopener">Get the app ↗</a></li>`
        : `<li>${s}</li>`,
    )
    .join("");
  m.querySelector(".app-modal-features").innerHTML = a.features
    .map((f) => `<li>${f}</li>`)
    .join("");
  m.querySelector(".app-modal-tip").textContent = a.tip;
  m.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeAppModal() {
  const m = $("appModal");
  if (m) m.hidden = true;
  document.body.style.overflow = "";
}

function updatePrepProgress() {
  const all = document.querySelectorAll("#prepare input[type=checkbox]");
  const done = [...all].filter((c) => c.checked).length;
  const total = all.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const fill = $("prepBarFill");
  if (fill) fill.style.width = pct + "%";
  $("prepDone").textContent = done;
  $("prepTotal").textContent = total;
  PREP.forEach((m) => {
    const boxes = document.querySelectorAll(
      `.prep-module[data-mod="${m.id}"] input[type=checkbox]`,
    );
    const d = [...boxes].filter((c) => c.checked).length;
    const tag = document.querySelector(`[data-count="${m.id}"]`);
    if (tag) {
      tag.textContent = `${d}/${boxes.length}`;
      tag.classList.toggle("complete", d === boxes.length && boxes.length > 0);
    }
  });
}

function wirePrep() {
  document.querySelectorAll("#prepare input[type=checkbox]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const label = cb.closest("[data-k]");
      const k = label.dataset.k;
      if (cb.checked) prepChecked.add(k);
      else prepChecked.delete(k);
      label.classList.toggle("done", cb.checked);
      saveChecked();
      updatePrepProgress();
    });
  });
  document.querySelectorAll(".prep-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.closest(".prep-module").querySelector(".prep-detail").hidden = open;
    });
  });
  document.querySelectorAll(".app-open").forEach((b) => {
    b.addEventListener("click", () => openAppModal(b.dataset.app));
  });
  const printBtn = $("prepPrint");
  if (printBtn) printBtn.addEventListener("click", () => window.print());
  const resetBtn = $("prepReset");
  if (resetBtn)
    resetBtn.addEventListener("click", () => {
      prepChecked.clear();
      saveChecked();
      document.querySelectorAll("#prepare input[type=checkbox]").forEach((cb) => {
        cb.checked = false;
        cb.closest("[data-k]").classList.remove("done");
      });
      updatePrepProgress();
      toast("Checklist reset");
    });
}

/* ---------- wizard wiring ---------- */
// build the "must-visit city" options from the destination list
(function buildCityOptions() {
  const wrap = $("qCity");
  if (!wrap) return;
  DESTINATIONS.forEach((d) => {
    const b = document.createElement("button");
    b.className = "wopt";
    b.type = "button";
    b.dataset.v = d.id;
    b.innerHTML = `${d.name} <i>${d.cn}</i>`;
    wrap.appendChild(b);
  });
})();

// arrive/depart dropdowns — cities sorted by international connectivity
(function buildGatewaySelects() {
  const entry = $("qEntry");
  const exit = $("qExit");
  if (!entry || !exit) return;
  const sorted = DESTINATIONS.slice().sort(
    (a, b) => (GATEWAY[b.id] || 0) - (GATEWAY[a.id] || 0),
  );
  const opts = sorted
    .map((d) => `<option value="${d.id}">${d.name} ${d.cn}</option>`)
    .join("");
  entry.innerHTML = opts;
  exit.innerHTML = opts;
  entry.value = answers.entry;
  exit.value = answers.exit;
  entry.addEventListener("change", () => (answers.entry = entry.value));
  exit.addEventListener("change", () => (answers.exit = exit.value));
})();

// hover preview: a 2-line essence of each city, floated beside the panel
(function cityHoverPreview() {
  const wrap = $("qCity");
  if (!wrap || window.innerWidth <= 880) return;
  const tip = document.createElement("div");
  tip.className = "city-tip";
  tip.hidden = true;
  document.body.appendChild(tip);
  function place(btn) {
    const d = byId(btn.dataset.v);
    if (!d) return;
    tip.innerHTML = `<strong>${d.name} <i>${d.cn}</i></strong><span class="city-tip-best">${d.bestFor}</span><p>${d.summary}</p>`;
    tip.hidden = false;
    const r = btn.getBoundingClientRect();
    const panel = $("panel").getBoundingClientRect();
    const tw = 270;
    let left = panel.right + 12;
    if (left + tw > window.innerWidth - 12) left = r.left - tw - 12;
    tip.style.left = Math.max(12, left) + "px";
    tip.style.top =
      Math.min(r.top, window.innerHeight - tip.offsetHeight - 16) + "px";
  }
  wrap.addEventListener("mouseover", (e) => {
    const btn = e.target.closest(".wopt");
    if (btn) place(btn);
  });
  wrap.addEventListener("mouseout", (e) => {
    if (!wrap.contains(e.relatedTarget)) tip.hidden = true;
  });
})();

// option groups → write into `answers` (cities is multi-select, others single)
document.querySelectorAll(".wq-opts").forEach((group) => {
  group.addEventListener("click", (e) => {
    const opt = e.target.closest(".wopt");
    if (!opt) return;
    if (group.dataset.multi !== undefined) {
      opt.classList.toggle("active");
      answers.cities = [...group.querySelectorAll(".wopt.active")]
        .map((o) => o.dataset.v)
        .filter(Boolean);
    } else {
      group.querySelectorAll(".wopt").forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      answers[group.dataset.q] = opt.dataset.v;
      if (group.dataset.q === "days") {
        const ci = $("qDaysCustom");
        if (ci) ci.value = "";
      }
    }
  });
});

// free-form day count — overrides the day chips
{
  const daysCustom = $("qDaysCustom");
  if (daysCustom)
    daysCustom.addEventListener("input", () => {
      const v = parseInt(daysCustom.value, 10);
      if (v >= 1) {
        answers.days = String(v);
        $("qDays")
          .querySelectorAll(".wopt")
          .forEach((o) => o.classList.remove("active"));
      }
    });
}

$("wizardGo").addEventListener("click", generatePlan);
$("planEdit").addEventListener("click", editTrip);
$("detailBack").addEventListener("click", () => {
  els.detailWrap.hidden = true;
  els.plan.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// keep focused city clear of the floating panels
function mapPadding() {
  const wide = window.innerWidth > 880;
  return wide
    ? { top: 40, bottom: 50, left: 470, right: 40 }
    : { top: 20, bottom: 20, left: 20, right: 20 };
}

/* ---------- map ---------- */
function initMap() {
  map = new maplibregl.Map({
    container: "map",
    style: MAP_STYLES[currentTheme()],
    center: [104.0, 35.5],
    zoom: 3.1,
    attributionControl: { compact: true },
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

  DESTINATIONS.forEach((d) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.innerHTML = '<span class="marker-dot"></span>';
    const popup = new maplibregl.Popup({
      offset: 16,
      closeButton: false,
      closeOnClick: false,
    }).setText(d.name);
    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([d.lng, d.lat])
      .addTo(map);
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      selectDestination(d.id, true);
    });
    el.addEventListener("mouseenter", () => popup.setLngLat([d.lng, d.lat]).addTo(map));
    el.addEventListener("mouseleave", () => popup.remove());
    markers.set(d.id, marker);
  });

  map.on("load", () => {
    // deck.gl overlay for glowing route arcs
    if (window.deck) {
      deckOverlay = new deck.MapboxOverlay({ interleaved: false, layers: [] });
      map.addControl(deckOverlay);
      tickDeck();
    }
    refreshMarkers();
    if (currentRoute.length) drawRouteLine(currentRoute);
    // cinematic fly-in with a touch of pitch
    map.flyTo({
      center: [108, 33],
      zoom: 3.8,
      pitch: 34,
      bearing: -10,
      duration: 3400,
      padding: mapPadding(),
      essential: true,
    });
  });

  $("resetMap").addEventListener("click", () => {
    map.flyTo({
      center: [103.5, 35.5],
      zoom: 3.7,
      speed: 1.1,
      padding: mapPadding(),
      essential: true,
    });
  });
}

/* ---------- theme: light / dark switch ---------- */
const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};
function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("dc-theme", t);
  } catch {}
  const btn = $("themeToggle");
  if (btn) btn.textContent = t === "dark" ? "☀" : "☾";
  if (map) map.setStyle(MAP_STYLES[t]);
}

/* ---------- tabs: Map vs. Before you go ---------- */
function setTab(tab) {
  const view = ["map", "prep", "support"].includes(tab) ? tab : "map";
  document.body.dataset.tab = view;
  document.querySelectorAll(".nav-links a[data-tab]").forEach((a) =>
    a.classList.toggle("active", a.dataset.tab === view),
  );
  if (view === "map" && map) setTimeout(() => map.resize(), 80);
  window.scrollTo({ top: 0 });
}

document.querySelectorAll("[data-tab]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    setTab(a.dataset.tab);
  });
});

/* ---------- init ---------- */
const savedTheme =
  (() => {
    try {
      return localStorage.getItem("dc-theme");
    } catch {
      return null;
    }
  })() || "light";
document.documentElement.dataset.theme = savedTheme;
{
  const tb = $("themeToggle");
  if (tb) {
    tb.textContent = savedTheme === "dark" ? "☀" : "☾";
    tb.addEventListener("click", () =>
      setTheme(currentTheme() === "dark" ? "light" : "dark"),
    );
  }
}

document.body.dataset.tab = "map";
renderDetail();
renderPrep();
// the map opens on the wizard (intake state); no plan rendered until generated

{
  const m = $("appModal");
  if (m) {
    m.addEventListener("click", (e) => {
      if (e.target === m || e.target.closest(".app-modal-x")) closeAppModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAppModal();
    });
  }
  const so = $("showOverlay");
  if (so) so.addEventListener("click", closeShowBig);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeShowBig();
  });
}
if (window.maplibregl) {
  initMap();
}

