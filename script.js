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
      if (dist < 26) return;
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
      if (dist < 4) return;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 + 0.3,
        r: 3 + Math.random() * 3,
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

  function drawFoot(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.life * 0.8;
    ctx.strokeStyle = "#2fa36b";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (const a of [-0.6, 0, 0.6]) {
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * 9, Math.sin(a) * 9);
    }
    ctx.moveTo(0, 0);
    ctx.lineTo(-4, 0);
    ctx.stroke();
    ctx.restore();
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
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    if (particles.length) requestAnimationFrame(tick);
    else running = false;
  }
}

/* Dino. Type "rawr" or "dino", or poke the photo three times. */
const dinoSvg = `
<svg viewBox="0 0 140 90" aria-hidden="true">
  <g class="leg b"><rect x="72" y="58" width="11" height="24" rx="5" fill="#25865a"/></g>
  <g class="leg b"><rect x="44" y="58" width="11" height="24" rx="5" fill="#25865a"/></g>
  <path d="M86 46 C108 44 124 52 138 64 C118 64 100 62 86 60 Z" fill="#2fa36b"/>
  <path d="M46 36 l6-11 6 11 M60 32 l7-12 7 12 M76 34 l6-11 6 11" fill="#f5b700" stroke="#f5b700" stroke-width="3" stroke-linejoin="round"/>
  <ellipse cx="66" cy="50" rx="28" ry="18" fill="#2fa36b"/>
  <path d="M44 44 C36 36 32 30 30 22 L42 18 C44 28 50 34 56 38 Z" fill="#2fa36b"/>
  <ellipse cx="30" cy="18" rx="16" ry="11" fill="#2fa36b"/>
  <circle cx="24" cy="15" r="2.6" fill="#1c1a17"/>
  <circle cx="28" cy="22" r="2.4" fill="#f2849c" opacity=".7"/>
  <path d="M15 22 q5 3 10 1" fill="none" stroke="#1c1a17" stroke-width="1.6" stroke-linecap="round"/>
  <g class="leg"><rect x="78" y="58" width="11" height="24" rx="5" fill="#2fa36b"/></g>
  <g class="leg"><rect x="50" y="58" width="11" height="24" rx="5" fill="#2fa36b"/></g>
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

const avatar = document.querySelector(".avatar");
let pokes = [];
avatar?.addEventListener("click", () => {
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
  "font: 700 14px system-ui; color: #2fa36b",
  "font: 12px system-ui; color: #6f6a60",
);
