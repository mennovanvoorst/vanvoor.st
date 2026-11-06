const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const colors = ["#f2542d", "#f5b700", "#2fa36b", "#3a86ff", "#a07aff"];

let dinoMode = false;

/* Cursor trail: colourful dots, or footprints while the dino is out. */
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

    if (dinoMode) {
      if (dist < 28) return;
      const angle = last ? Math.atan2(y - last.y, x - last.x) : 0;
      const side = step++ % 2 ? 1 : -1;
      particles.push({
        foot: true,
        x: x + Math.cos(angle + Math.PI / 2) * 7 * side,
        y: y + Math.sin(angle + Math.PI / 2) * 7 * side,
        angle,
        life: 1,
      });
    } else {
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
    }
    last = { x, y };
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  });

  // Everything snaps to a 4px grid, so the trail looks like it came out of an old console.
  const snap = (v) => Math.round(v / 4) * 4;

  function drawFoot(p) {
    ctx.globalAlpha = Math.ceil(p.life * 4) / 5;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--trex") || "#535353";
    const x = snap(p.x);
    const y = snap(p.y);
    ctx.fillRect(x - 4, y - 4, 8, 8);
    // three toes, pointing where the dino was heading
    const dx = Math.round(Math.cos(p.angle));
    const dy = Math.round(Math.sin(p.angle));
    for (const s of [-1, 0, 1]) {
      const tx = x + dx * 8 + (dy ? s * 6 : 0);
      const ty = y + dy * 8 + (dx ? s * 6 : 0);
      ctx.fillRect(tx - 2, ty - 2, 4, 4);
    }
  }

  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= p.foot ? 0.008 : 0.025;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      if (p.foot) {
        drawFoot(p);
      } else {
        p.x += p.vx;
        p.y += p.vy;
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.color;
        const s = p.life > 0.5 ? p.size : 4;
        ctx.fillRect(snap(p.x) - s / 2, snap(p.y) - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 1;
    if (particles.length) requestAnimationFrame(tick);
    else running = false;
  }
}

/* Dino. Type "rawr" or "dino", or poke my name three times.
   It's the T-Rex from Chrome's offline page (Chromium, BSD licence), two running frames. */
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

const dinoSvg = `
<svg viewBox="0 0 20 22" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">
  <g class="frame-a">${pixels(trexRun1)}</g>
  <g class="frame-b">${pixels(trexRun2)}</g>
</svg>`;

function releaseDino() {
  if (document.querySelector(".dino")) return;
  const dino = document.createElement("div");
  dino.className = "dino";
  dino.innerHTML = `<span class="say">rawr!</span>${dinoSvg}`;
  document.body.append(dino);
  dinoMode = true;
  setTimeout(() => {
    dino.remove();
    dinoMode = false;
  }, reducedMotion ? 3000 : 9000);
}

let typed = "";
addEventListener("keydown", (e) => {
  if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
  typed = (typed + e.key.toLowerCase()).slice(-4);
  if (typed === "rawr" || typed === "dino") releaseDino();
});

const nameEl = document.querySelector(".intro h1");
let pokes = [];
nameEl?.addEventListener("click", () => {
  const now = Date.now();
  pokes = pokes.filter((t) => now - t < 1200).concat(now);
  if (pokes.length >= 3) {
    pokes = [];
    releaseDino();
  }
});

/* 404: the extinct page gets a dino of its own. Poke it and it walks off. */
const fossil = document.querySelector(".fossil");
if (fossil) {
  fossil.innerHTML = dinoSvg;
  fossil.addEventListener("click", () => {
    if (document.querySelector(".dino")) return;
    releaseDino();
    fossil.style.visibility = "hidden";
    setTimeout(() => (fossil.style.visibility = ""), reducedMotion ? 3000 : 9000);
  });
}

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
