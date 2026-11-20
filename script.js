const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const colors = ["#f2542d", "#f5b700", "#2fa36b", "#3a86ff", "#a07aff"];

/* Cursor trail: colourful pixels. */
if (!reducedMotion && matchMedia("(pointer: fine)").matches) {
  const canvas = document.createElement("canvas");
  canvas.className = "trail";
  document.body.append(canvas);
  const ctx = canvas.getContext("2d");

  const resize = () => {
    const dpr = devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  addEventListener("resize", resize);

  const particles = [];
  let last = null;
  let step = 0;
  let running = false;

  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const { clientX: x, clientY: y } = e;
    const dist = last ? Math.hypot(x - last.x, y - last.y) : Infinity;

    if (dist < 8) return;
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6 + 0.4,
      size: Math.random() < 0.5 ? 4 : 8,
      color: colors[step++ % colors.length],
      life: 1,
    });
    last = { x, y };
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  });

  // Everything snaps to a 4px grid, so the trail looks like it came out of an old console.
  const snap = (v) => Math.round(v / 4) * 4;

  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= 0.025;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      p.x += p.vx;
      p.y += p.vy;
      ctx.fillStyle = p.color;
      const s = p.life > 0.5 ? p.size : 4;
      ctx.fillRect(snap(p.x) - s / 2, snap(p.y) - s / 2, s, s);
    }
    if (particles.length) requestAnimationFrame(tick);
    else running = false;
  }
}

/* At the bottom of the screen, Chrome's T-Rex (Chromium, BSD licence) wanders between two old trees.
   Type "rawr" or "dino", poke my name three times, or poke the dino, and it says hi. */
const trexRun1 = [
  "...........########.",
  "..........##########",
  "..........##.#######",
  "..........##########",
  "..........##########",
  "..........##########",
  "..........#####.....",
  "..........########..",
  "#........#####......",
  "#.......######......",
  "##....##########....",
  "###..#########.#....",
  "##############......",
  "##############......",
  ".############.......",
  "..###########.......",
  "...#########........",
  "....#######.........",
  ".....###..###.......",
  ".....##.............",
  ".....#..............",
  ".....##.............",
];
const trexRun2 = [
  "...........########.",
  "..........##########",
  "..........##.#######",
  "..........##########",
  "..........##########",
  "..........##########",
  "..........#####.....",
  "..........########..",
  "#........#####......",
  "#.......######......",
  "##....##########....",
  "###..#########.#....",
  "##############......",
  "##############......",
  ".############.......",
  "..###########.......",
  "...#########........",
  "....#######.........",
  ".....##..##.........",
  "......##..#.........",
  "..........#.........",
  "..........##........",
];

function pixels(rows) {
  let out = "";
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; ) {
      let w = 1;
      while (row[x + w] === row[x]) w++;
      if (row[x] === "#") out += `<rect x="${x}" y="${y}" width="${w}" height="1"/>`;
      x += w;
    }
  });
  return out;
}

const asset = (file) => new URL(file, document.currentScript.src).href;
const scene = document.createElement("div");
scene.className = "scene";
scene.innerHTML = `
  <div class="ground" aria-hidden="true"></div>
  <img class="tree oak" src="${asset("tree-oak.svg")}" alt="" />
  <img class="tree elm" src="${asset("tree-elm.svg")}" alt="" />
  <div class="dino">
    <span class="say" role="status"></span>
    <svg viewBox="0 0 20 22" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">
      <g class="frame-a">${pixels(trexRun1)}</g>
      <g class="frame-b">${pixels(trexRun2)}</g>
    </svg>
  </div>`;
document.body.append(scene);
document.documentElement.classList.add("has-scene");

const dino = scene.querySelector(".dino");
const say = scene.querySelector(".say");

let quiet;
function rawr() {
  say.textContent = "rawr!";
  dino.classList.add("talking");
  clearTimeout(quiet);
  quiet = setTimeout(() => {
    dino.classList.remove("talking");
    say.textContent = "";
  }, 2500);
}
dino.addEventListener("click", rawr);

// Wander: walk to a random spot, stand around for a bit, repeat. Positions snap to the pixel size.
const px = () => parseFloat(getComputedStyle(scene).getPropertyValue("--px")) || 3;
const maxX = () => Math.max(0, innerWidth - dino.offsetWidth);
let x = maxX() * (0.25 + Math.random() * 0.5);
let target = x;
let restUntil = performance.now() + 1500;
let lastTime = performance.now();

function place() {
  const p = px();
  x = Math.min(x, maxX());
  dino.style.transform = `translateX(${Math.round(x / p) * p}px)`;
}

function wander(now) {
  const dt = Math.min(now - lastTime, 100) / 1000;
  lastTime = now;
  if (now >= restUntil) {
    if (Math.abs(target - x) < 1) {
      target = Math.random() * maxX();
      dino.classList.toggle("left", target < x);
    }
    dino.classList.add("walking");
    const step = Math.sign(target - x) * 40 * dt;
    x = Math.abs(target - x) <= Math.abs(step) ? target : x + step;
    if (x === target) {
      dino.classList.remove("walking");
      restUntil = now + 1000 + Math.random() * 4000;
    }
  }
  place();
  requestAnimationFrame(wander);
}

place();
addEventListener("resize", place);
if (!reducedMotion) requestAnimationFrame(wander);

let typed = "";
addEventListener("keydown", (e) => {
  if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
  typed = (typed + e.key.toLowerCase()).slice(-4);
  if (typed === "rawr" || typed === "dino") rawr();
});

const nameEl = document.querySelector(".intro h1");
let pokes = [];
nameEl?.addEventListener("click", () => {
  const now = Date.now();
  pokes = pokes.filter((t) => now - t < 1200).concat(now);
  if (pokes.length >= 3) {
    pokes = [];
    rawr();
  }
});

/* Work squares pop in, one after the other, once the list is on screen. */
if (!reducedMotion && "IntersectionObserver" in window) {
  const lists = document.querySelectorAll(".work");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.2 },
  );
  lists.forEach((list) => {
    list.querySelectorAll("li").forEach((li, i) => li.style.setProperty("--i", i));
    observer.observe(list);
  });
  document.documentElement.classList.add("js");
}

/* Miss me? */
const title = document.title;
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? "🦕 rawr? come back" : title;
});

console.log(
  "%c🦕 Hi, curious one. View source is how I started too.\n%cpsst: type rawr",
  "font: 700 14px monospace; color: #535353",
  "font: 12px monospace; color: #a39d90",
);
