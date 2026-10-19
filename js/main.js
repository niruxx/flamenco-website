import { PALETTES, GREETER_PALETTE_SHOTS, TOUR, SETTINGS_PAGES, TOUR_VIDEO } from "./data.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const el = (tag, attrs = {}, html = "") => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (html) n.innerHTML = html;
  return n;
};

/* ------------------------------------------------------------------ Theme */

const systemDark = matchMedia("(prefers-color-scheme: dark)");
const theme = {
  palette: PALETTES[store.get("flamenco-palette")] ? store.get("flamenco-palette") : "Flamenco",
  mode: ["dark", "light"].includes(store.get("flamenco-theme")) ? store.get("flamenco-theme") : "auto",
};
const effectiveMode = () => theme.mode === "auto" ? (systemDark.matches ? "dark" : "light") : theme.mode;

function applyTheme(animate) {
  const run = () => {
    const mode = effectiveMode();
    const c = PALETTES[theme.palette][mode];
    const root = document.documentElement;
    root.dataset.theme = mode;
    const vars = {
      "--bg": c.bg, "--surface": c.surface, "--outline": c.outline, "--primary": c.primary,
      "--secondary": c.secondary, "--tertiary": c.tertiary, "--text": c.text, "--subtext": c.subtext,
      "--on-primary": c.onPrimary,
    };
    for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
    store.set("flamenco-vars", JSON.stringify({ mode: theme.mode, effective: mode, vars }));
    $('meta[name="theme-color"]').content = c.bg;
    $("#pal-current").textContent = theme.palette;
    $("#lock-pal").textContent = theme.palette;
    $$("[data-palette]").forEach(b => b.setAttribute("aria-checked", String(b.dataset.palette === theme.palette)));
    $$("[data-mode]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mode === theme.mode)));
    paintPaletteCards(mode);
  };
  if (animate && document.startViewTransition && !reduceMotion) document.startViewTransition(run);
  else run();
}

function paletteVars(p, mode) {
  const c = PALETTES[p][mode];
  return `--sw-bg:${c.surface};--sw-p:${c.primary};--sw-s:${c.secondary};--sw-t:${c.tertiary}`;
}

function paintPaletteCards(mode) {
  $$(".swatch").forEach(s => s.style.cssText = paletteVars(s.dataset.palette, mode));
  $$(".pal").forEach(card => {
    const c = PALETTES[card.dataset.palette][mode];
    card.style.cssText = `--pc-bg:${c.bg};--pc-surface:${c.surface};--pc-outline:${c.outline};--pc-text:${c.text};--pc-primary:${c.primary}`;
    const dots = card.querySelectorAll(".dots i");
    [c.primary, c.secondary, c.tertiary].forEach((col, i) => dots[i].style.background = col);
  });
}

function setPalette(name) {
  theme.palette = name;
  store.set("flamenco-palette", name);
  applyTheme(true);
}

function buildPalettes() {
  const sw = $("#swatches"), grid = $("#pal-grid");
  for (const name of Object.keys(PALETTES)) {
    const s = el("button", { class: "swatch", role: "radio", "data-palette": name, "aria-label": name, title: name });
    s.addEventListener("click", () => setPalette(name));
    sw.append(s);
    const card = el("button", { class: "pal", role: "radio", "data-palette": name },
      `<span class="dots"><i></i><i></i><i></i></span><span class="name">${name}<span class="ms">check_circle</span></span>`);
    card.addEventListener("click", () => setPalette(name));
    grid.append(card);
  }
  $$("[data-mode]").forEach(b => b.addEventListener("click", () => {
    theme.mode = b.dataset.mode;
    store.set("flamenco-theme", theme.mode);
    applyTheme(true);
  }));
  systemDark.addEventListener("change", () => theme.mode === "auto" && applyTheme(true));

  // Popover
  const btn = $("#palette-btn"), pop = $("#palette-pop");
  const close = () => { pop.hidden = true; btn.setAttribute("aria-expanded", "false"); };
  btn.addEventListener("click", e => {
    e.stopPropagation();
    pop.hidden = !pop.hidden;
    btn.setAttribute("aria-expanded", String(!pop.hidden));
    if (!pop.hidden) $('.swatch[aria-checked="true"]', pop)?.focus();
  });
  document.addEventListener("click", e => { if (!pop.hidden && !pop.contains(e.target)) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !pop.hidden) { close(); btn.focus(); } });
}

/* Live clock on the lock-screen preview */
function startClock() {
  const clock = $("#lock-clock"), date = $("#lock-date");
  const tick = () => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    date.textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  };
  tick();
  setInterval(tick, 10_000);
}

/* ------------------------------------------------------------------ Top bar */

function setupTopbar() {
  const bar = $(".topbar"), nav = $("#nav"), menu = $("#menu-btn");
  const onScroll = () => bar.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.querySelector(".ms").textContent = open ? "close" : "menu";
  });
  nav.addEventListener("click", e => {
    if (e.target.closest("a") && nav.classList.contains("open")) menu.click();
  });

  // Highlight the section in view
  const links = new Map($$("a", nav).map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      links.forEach(a => a.classList.remove("active"));
      links.get(en.target.id)?.classList.add("active");
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
}

/* ------------------------------------------------------------------ Reveal */

function setupReveal() {
  const items = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(i => io.observe(i));
}

/* ------------------------------------------------------------------ Tabs */

function activateTab(list, tab) {
  $$('[role="tab"]', list).forEach(t => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = t.getAttribute("aria-controls") && document.getElementById(t.getAttribute("aria-controls"));
    if (panel) {
      panel.hidden = !on;
      if (on && panel.classList.contains("feature-panel")) {
        [...panel.children].forEach((c, i) => c.style.setProperty("--i", i));
        panel.classList.remove("enter"); void panel.offsetWidth; panel.classList.add("enter");
      }
    }
  });
  if (list.dataset.switch) {
    $$(`[data-case="${list.dataset.switch}"]`).forEach(p => p.hidden = p.dataset.value !== tab.dataset.value);
  }
}

function setupTabs() {
  $$('[role="tablist"]').forEach(list => {
    if (list.id === "tour-tabs") return;
    const tabs = $$('[role="tab"]', list);
    tabs.forEach(t => {
      t.tabIndex = t.getAttribute("aria-selected") === "true" ? 0 : -1;
      t.addEventListener("click", () => activateTab(list, t));
      t.addEventListener("keydown", e => {
        const i = tabs.indexOf(t);
        const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        const n = tabs[(next + tabs.length) % tabs.length];
        n.focus(); activateTab(list, n);
      });
    });
  });
}

/* ------------------------------------------------------------------ Code blocks */

function setupCopy() {
  $$("pre.code").forEach(pre => {
    const btn = el("button", { class: "copy", "aria-label": "Copy commands", title: "Copy" }, '<span class="ms">content_copy</span>');
    btn.addEventListener("click", async () => {
      // Copy only the commands: lines that start with a prompt, plus their "\" continuations.
      const out = [];
      let cont = false;
      for (const line of pre.querySelector("code").textContent.split("\n")) {
        if (line.startsWith("$ ")) { out.push(line.slice(2)); cont = line.trimEnd().endsWith("\\"); }
        else if (cont) { out.push(line); cont = line.trimEnd().endsWith("\\"); }
      }
      const text = out.join("\n");
      try { await navigator.clipboard.writeText(text); }
      catch {
        const ta = el("textarea"); ta.value = text; document.body.append(ta); ta.select();
        document.execCommand("copy"); ta.remove();
      }
      btn.classList.add("ok"); btn.querySelector(".ms").textContent = "check";
      setTimeout(() => { btn.classList.remove("ok"); btn.querySelector(".ms").textContent = "content_copy"; }, 1600);
    });
    pre.append(btn);
  });
}

/* ------------------------------------------------------------------ Tour */

const SLIDE_MS = 6500;

function setupTour() {
  const stage = $("#stage"), player = $("#player"), caption = $("#caption");
  const progress = $("#progress"), chapters = $("#chapters"), toggle = $("#play-toggle");
  const slides = TOUR.map((s, i) => {
    const d = el("div", { class: "slide" });
    const img = el("img", { alt: s.title, decoding: "async" });
    img.dataset.src = s.src;
    d.append(img);
    stage.insertBefore(d, $("#bigplay"));
    const seg = el("button", { "aria-label": `Chapter ${i + 1}: ${s.chapter}` });
    seg.addEventListener("click", () => go(i, true));
    progress.append(seg);
    const chip = el("button", {}, s.chapter);
    chip.addEventListener("click", () => go(i, true));
    chapters.append(chip);
    return { d, img, seg, chip, data: s };
  });

  let cur = -1, playing = false, startedAt = 0, elapsed = 0, raf = 0, everPlayed = false;

  const load = i => { const s = slides[(i + slides.length) % slides.length]; if (!s.img.src) s.img.src = s.img.dataset.src; };

  function zoomTarget(box) {
    if (!box) return "scale(1.04)";
    const [x, y, w, h] = box;
    const s = Math.min(0.9 / w, 0.9 / h, 2.8);
    const clamp = (v) => Math.min(Math.max(v, 0.5 / s), 1 - 0.5 / s);
    const cx = clamp(x + w / 2), cy = clamp(y + h / 2);
    return `scale(${s.toFixed(3)}) translate(${((0.5 - cx) * 100).toFixed(2)}%, ${((0.5 - cy) * 100).toFixed(2)}%)`;
  }

  function go(i, user) {
    i = (i + slides.length) % slides.length;
    const prev = slides[cur];
    cur = i;
    const s = slides[i];
    load(i); load(i + 1);
    prev?.d.classList.remove("on");
    s.d.classList.add("on");

    // Start on the whole screen, then glide into the part this chapter is about.
    const img = s.img;
    img.style.transition = "none";
    img.style.transform = reduceMotion ? zoomTarget(s.data.box) : "none";
    if (!reduceMotion) {
      void img.offsetWidth;
      setTimeout(() => {
        if (cur !== i) return;
        img.style.transition = `transform ${SLIDE_MS - 1400}ms cubic-bezier(.45,0,.2,1)`;
        img.style.transform = zoomTarget(s.data.box);
      }, 700);
    }

    caption.classList.add("swap");
    setTimeout(() => {
      caption.querySelector("h3").textContent = s.data.title;
      caption.querySelector("p").textContent = s.data.text;
      caption.classList.remove("swap");
    }, prev ? 180 : 0);

    slides.forEach((x, j) => {
      x.seg.classList.toggle("done", j < i);
      x.seg.style.setProperty("--p", 0);
      x.chip.setAttribute("aria-current", String(j === i));
    });
    if (user) s.chip.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    elapsed = 0; startedAt = performance.now();
    if (user && !playing) play();
  }

  function frame(now) {
    if (!playing) return;
    const t = elapsed + (now - startedAt);
    slides[cur].seg.style.setProperty("--p", Math.min(t / SLIDE_MS, 1));
    if (t >= SLIDE_MS) go(cur + 1);
    raf = requestAnimationFrame(frame);
  }
  function play() {
    if (playing) return;
    playing = everPlayed = true;
    startedAt = performance.now();
    player.classList.add("playing");
    toggle.setAttribute("aria-pressed", "true");
    toggle.setAttribute("aria-label", "Pause");
    toggle.querySelector(".ms").textContent = "pause";
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    if (!playing) return;
    playing = false;
    elapsed += performance.now() - startedAt;
    cancelAnimationFrame(raf);
    player.classList.remove("playing");
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", "Play");
    toggle.querySelector(".ms").textContent = "play_arrow";
  }

  toggle.addEventListener("click", () => playing ? pause() : play());
  $("#bigplay").addEventListener("click", play);
  stage.addEventListener("click", e => { if (!e.target.closest("#bigplay")) playing ? pause() : play(); });
  $("#tour-slides").addEventListener("keydown", e => {
    if (e.target.closest(".chapters")) return;
    if (e.key === "ArrowRight") { go(cur + 1, true); e.preventDefault(); }
    if (e.key === "ArrowLeft") { go(cur - 1, true); e.preventDefault(); }
  });

  go(0);

  // Play while the tour is on screen, like a muted video would.
  if (!reduceMotion && "IntersectionObserver" in window) {
    let autoPaused = false;
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && en.intersectionRatio > 0.55) {
        if (!everPlayed || autoPaused) { autoPaused = false; play(); }
      } else if (playing) { autoPaused = true; pause(); }
    }, { threshold: [0, 0.55, 1] }).observe(player);
  }
  document.addEventListener("visibilitychange", () => document.hidden && pause());
  return { pause };
}

/* A real video, if one has been added (see TOUR_VIDEO in data.js) */
async function setupTourVideo(tour) {
  const wrap = $("#tour-video"), tabs = $("#tour-tabs"), slides = $("#tour-slides");
  let media = null;
  if (TOUR_VIDEO.youtube) {
    media = el("iframe", {
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(TOUR_VIDEO.youtube)}?rel=0`,
      title: "Flamenco video tour", allow: "encrypted-media; picture-in-picture; fullscreen", allowfullscreen: "", loading: "lazy",
    });
  } else if (TOUR_VIDEO.file) {
    try {
      const r = await fetch(TOUR_VIDEO.file, { method: "HEAD" });
      if (r.ok) media = el("video", { src: TOUR_VIDEO.file, controls: "", preload: "metadata", playsinline: "", poster: "assets/shell/desktop.webp" });
    } catch {}
  }
  if (!media) return;
  wrap.append(media);
  tabs.hidden = false;
  const show = which => {
    $$("button", tabs).forEach(b => b.setAttribute("aria-selected", String(b.dataset.tour === which)));
    wrap.hidden = which !== "video";
    slides.hidden = which !== "slides";
    if (which === "video") tour.pause();
    else media.pause?.();
  };
  $$("button", tabs).forEach(b => b.addEventListener("click", () => show(b.dataset.tour)));
  show("video");
}

/* ------------------------------------------------------------------ Galleries */

function buildGalleries() {
  const rail = $("#settings-rail");
  for (const [file, title, sub] of SETTINGS_PAGES) {
    rail.append(el("button", { class: "shot", "data-full": `assets/shell/${file}.webp`, "data-title": `Settings: ${title}` },
      `<span class="pic"><img src="assets/shell/crop/${file}.webp" alt="Settings: ${title}" loading="lazy" width="810" height="614"></span>
       <span class="cap"><b>${title}</b><span>${sub}</span></span>`));
  }
  rail.dataset.gallery = "";
  $$("[data-rail]").forEach(b => b.addEventListener("click", () =>
    rail.scrollBy({ left: Number(b.dataset.rail) * rail.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" })));

  const track = $("#greeter-marquee");
  const items = Object.entries(GREETER_PALETTE_SHOTS);
  for (const copy of [0, 1]) {
    for (const [name, file] of items) {
      const b = el("button", { class: "shot", "data-full": `assets/greeter/${file}.webp`, "data-title": `Flamenco Greeter in ${name}` },
        `<span class="pic"><img src="assets/greeter/${file}.webp" alt="${copy ? "" : `The login screen in ${name}`}" loading="lazy" width="1920" height="1200"></span>
         <span class="cap"><b>${name}</b></span>`);
      if (copy) { b.setAttribute("aria-hidden", "true"); b.tabIndex = -1; b.dataset.dup = ""; }
      track.append(b);
    }
  }
}

function setupLightbox() {
  const dlg = $("#lightbox"), img = $("img", dlg), cap = $("figcaption", dlg);
  let group = [], idx = 0;
  const show = i => {
    idx = (i + group.length) % group.length;
    const b = group[idx];
    img.src = b.dataset.full;
    img.alt = b.dataset.title || "";
    cap.textContent = b.dataset.title || "";
  };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-full]");
    if (!b || dlg.contains(b)) return;
    const root = b.closest("[data-gallery]") || document;
    group = $$("[data-full]:not([data-dup])", root);
    const i = group.indexOf(b);
    show(i < 0 ? 0 : i);
    $$(".lb-prev, .lb-next", dlg).forEach(x => x.hidden = group.length < 2);
    dlg.showModal();
  });
  dlg.addEventListener("click", e => {
    const a = e.target.closest("[data-lb]")?.dataset.lb;
    if (a === "close" || e.target === dlg || e.target.tagName === "FIGURE") dlg.close();
    else if (a) show(idx + Number(a));
  });
  dlg.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
}

/* ------------------------------------------------------------------ Latest versions */

async function cached(key, fn) {
  try {
    const hit = JSON.parse(sessionStorage.getItem(key) || "null");
    if (hit && Date.now() - hit.t < 3600_000) return hit.v;
  } catch {}
  const v = await fn();
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch {}
  return v;
}

const cmpVer = (a, b) => {
  const pa = a.split(/[.-]/).map(Number), pb = b.split(/[.-]/).map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  return 0;
};

async function updateVersions() {
  try {
    const shell = await cached("flamenco-shell-release", async () => {
      const r = await fetch("https://api.github.com/repos/niruxx/Flamenco/releases/latest");
      if (!r.ok) throw 0;
      const j = await r.json();
      const pkg = j.assets.find(a => a.name.endsWith(".pkg.tar.zst"));
      return pkg && { tag: j.tag_name, url: pkg.browser_download_url };
    });
    if (shell) {
      const v = shell.tag.replace(/-\d+$/, "").replace(/^v/, "");
      $$("[data-shell-version]").forEach(n => n.textContent = `v${v}`);
      $$("[data-shell-version-long]").forEach(n => n.textContent = `Version ${v} · the desktop`);
      $$("[data-shell-pkg-url]").forEach(n => n.textContent = shell.url);
    }
  } catch {}
  try {
    const name = await cached("flamenco-greeter-build", async () => {
      const r = await fetch("https://api.github.com/repos/niruxx/flamenco-greeter/contents/History%20Builds");
      if (!r.ok) throw 0;
      const dirs = (await r.json()).filter(d => d.type === "dir" && /^flamenco-greeter-[\d.]+-\d+$/.test(d.name)).map(d => d.name);
      return dirs.sort((a, b) => cmpVer(a.slice(17), b.slice(17))).pop();
    });
    if (name) {
      const v = name.slice(17).replace(/-\d+$/, "");
      $$("[data-greeter-version-long]").forEach(n => n.textContent = `Version ${v} · the login screen`);
      $$("[data-greeter-pkg-url]").forEach(n => n.textContent =
        `https://github.com/niruxx/flamenco-greeter/raw/main/History%20Builds/${name}/${name}-any.pkg.tar.zst`);
    }
  } catch {}
}

/* ------------------------------------------------------------------ Go */

buildPalettes();
applyTheme(false);
startClock();
setupTopbar();
setupTabs();
setupCopy();
buildGalleries();
setupLightbox();
const tour = setupTour();
setupTourVideo(tour);
setupReveal();
updateVersions();
