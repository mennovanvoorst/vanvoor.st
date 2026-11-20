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

/* At the end of the page, Chrome's T-Rex (Chromium, BSD licence) wanders between two old trees.
   Say rawr and it says it back. Click the ground and it walks over; shake a tree and leaves fall.
   And then there's the star. */
const fire = ["#f2542d", "#f5b700", "#ff8c42"];
const t = (en, nl) => (document.documentElement.lang === "nl" ? nl : en);

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
const trexCrashed = [
  "...........########.",
  "..........##########",
  "..........##.#######",
  "..........##..######",
  "..........##########",
  "..........##########",
  "..........##########",
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
  ".....###.##.........",
  ".....##...#.........",
  ".....#....#.........",
  ".....##...##........",
];
const oakRows = [
  "...................................#....................................",
  "................................#######.........#.......................",
  "..............................##.#.######...#########...................",
  "......................#......##.##########.##.#.######..................",
  "..................#########..#.#############.##########.................",
  ".................##.#.#######.#############.############................",
  "................##.#################.#####.##############...............",
  "...............##.#######################.###############...............",
  "..............##.##################################..####...............",
  "..............#.#################################.#######...............",
  "..............###############.##################..########..#...........",
  "..............#######..#################..########.#############........",
  "............##############################################.#######......",
  ".........#####..#########################################.#########.....",
  ".......###.############################..##########################.....",
  "......###.###############.#.#############.#############.############....",
  "......##################.#########.#..##.#############..############....",
  ".....##.###############.###########..##.############################....",
  ".....#.#############..#############..#.######################..######...",
  ".....##############################..#############...#########.#####....",
  "....######################################.########..###############....",
  ".....###############..#############..#############...#################..",
  "...#################################.#############.#############.######.",
  "..###.###########.##################.################.#########.#######.",
  "..##.###########.###################..#######..##.##.##################.",
  "..#.###########.####..#.#############..#########..#.##############..####",
  ".#######################.##.####.####...#######.#############.#########.",
  "..######.#################..#....####..#####..#############...#########.",
  "..#########.#.##############.....####.#####.##########..###...#########.",
  "..#########...#################...#########################....#######..",
  "...#######.....#######.##########.###############..#######........#.....",
  "......#...........#......######################.......#.................",
  "...........................##################...........................",
  ".............................################...........................",
  "...............................##############...........................",
  ".................................############...........................",
  "..................................###########...........................",
  "..................................###########...........................",
  ".................................############...........................",
  ".................................#.#####.###............................",
  ".................................#.#########............................",
  ".................................#.###...###............................",
  ".................................#.###...###............................",
  ".................................#####..####............................",
  ".................................#.###..####............................",
  "................................##.#####.###............................",
  "................................########.###............................",
  "................................########.###............................",
  "................................##.#########............................",
  "...............................###.#####.###............................",
  "...............................#############............................",
  "..............................####.#####.###............................",
  "..............................####.#####.####...........................",
  "..............................####.#####.####...........................",
  ".............................################...........................",
  ".............................#####.##########...........................",
  "............................############.#####..........................",
  "...........................#######.###########..........................",
  "..........................##############.######.........................",
  "..........................#####################.........................",
  ".........................#######################........................",
  "........................#########################.......................",
  "...................###################################..................",
  ".................########################################...............",
];
const elmRows = [
  "........................................................",
  "........................................................",
  "...............................#........................",
  "............................#######.....................",
  "..........................##.#.######...................",
  ".........................##.##########..................",
  ".........................#.###########..................",
  "........................#.#############.................",
  "........................##########..###.................",
  "........................############..#.................",
  "....................#..#################.#..............",
  ".................############################...........",
  "...............###.###################.#.######.........",
  "..............###.###############.###.##########........",
  "..............######################.###########........",
  ".............##.###################.######.######.......",
  ".............#.########################..########.......",
  ".............#######################.############.......",
  "............####################.#################......",
  ".............############.######..###############.......",
  ".............###########.########.###############.......",
  "............###..#####..############..###########.......",
  ".........#############.#########################........",
  "........#.#.#############################.########......",
  ".......#.##########################.########.##..##.....",
  "......#.#################.#########.#.#####.#####..#....",
  "......##########.##.####################.#.#########....",
  "......#############..##############.################....",
  ".....#########..####..############.##################...",
  "......#############....##########.##################....",
  "......################..#######################..###....",
  "......###########.#####..###..######################....",
  ".......#########.######..###..###########.#########.....",
  ".....##########.#######..###..###..######..##########...",
  "....##.#################.###.###########......##.#####..",
  "....#.#####.#.#########..###.########..........#######..",
  "...#########..#########..###########..........#########.",
  "....#######...#########..##########............#######..",
  "....#######....########...#########............#######..",
  ".....#####........#######.########..............#####...",
  ".......#............#############.................#.....",
  "....................#############.......................",
  "....................############........................",
  "....................############........................",
  "....................###########.........................",
  "....................##########..........................",
  "....................######.##...........................",
  "....................#########...........................",
  "....................######.##...........................",
  "....................##########..........................",
  ".....................#########..........................",
  ".....................#####.###..........................",
  ".....................#########..........................",
  ".....................#####.###..........................",
  ".....................#########..........................",
  ".....................#########..........................",
  ".....................#####..###.........................",
  ".....................#####..###.........................",
  ".....................#####..###.........................",
  ".....................#####..###.........................",
  ".....................###########........................",
  ".....................###########........................",
  ".....................#####.#####........................",
  ".....................#####.#####........................",
  ".....................#####.####.#.......................",
  "....................######.####.#.......................",
  "....................###########.##......................",
  "....................######.#######......................",
  "....................###############.....................",
  "...................############.###.....................",
  "...................#######.####.####....................",
  "...................#################....................",
  "..................###################...................",
  "..................####################..................",
  "...............############################.............",
  ".............################################...........",
];
const asteroidRows = [
  "...####.",
  ".#######",
  "##.#####",
  "########",
  "#####.##",
  "#.######",
  ".######.",
  "..####..",
];
const starRows = [
  "....#....",
  "....#....",
  "...###...",
  "#########",
  ".#######.",
  "..#####..",
  "..##.##..",
  ".##...##.",
  ".#.....#.",
];
// By day the yellow thing in the sky is the sun instead.
const sunRows = [
  "....#....",
  ".#.....#.",
  "...###...",
  "..#####..",
  "#.#####.#",
  "..#####..",
  "...###...",
  ".#.....#.",
  "....#....",
];
const moonRows = [
  "...####...",
  ".#####....",
  ".####.....",
  "####......",
  "####......",
  "####......",
  "####......",
  ".####.....",
  ".#####....",
  "...####...",
];
// Clouds by day, outlined like the ones on Chrome's offline page.
const cloudRows = [
  "......####......",
  "....##....##....",
  "..##........#...",
  ".#...........##.",
  "#..............#",
  "################",
];
// The other stars: mostly single pixels, a few little sparkles. Just for looking at.
const speckRows = [["#"], ["#"], ["#"], [".#.", "###", ".#."], ["..#..", "..#..", "##.##", "..#..", "..#.."]];
const craterRows = [
  "##..........##",
  ".###......###.",
  "...########...",
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
const sprite = (rows, inner = pixels(rows)) =>
  `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">${inner}</svg>`;

const scene = document.createElement("div");
scene.className = "scene";
scene.innerHTML = `
  <button class="star" type="button">${sprite(starRows).replace("<svg ", '<svg class="star-shape" ')}${sprite(sunRows).replace("<svg ", '<svg class="sun-shape" ')}</button>
  <div class="ground" aria-hidden="true"></div>
  ${sprite(oakRows).replace("<svg ", '<svg class="tree oak" ')}
  ${sprite(elmRows).replace("<svg ", '<svg class="tree elm" ')}
  <div class="dino">
    <span class="say" role="status"></span>
    ${sprite(trexRun1, `<g class="frame-a">${pixels(trexRun1)}</g><g class="frame-b">${pixels(trexRun2)}</g><g class="frame-c">${pixels(trexCrashed)}</g>`)}
  </div>`;
document.body.append(scene);
document.documentElement.classList.add("has-scene");

const dino = scene.querySelector(".dino");
const bubble = scene.querySelector(".say");
const ground = scene.querySelector(".ground");
const star = scene.querySelector(".star");
const px = () => parseFloat(getComputedStyle(scene).getPropertyValue("--px")) || 3;

// The sky follows the theme: stars and a moon at night, drifting clouds by day.
const sky = document.createElement("div");
sky.className = "night";
sky.setAttribute("aria-hidden", "true");
const clouds = document.createElement("div");
clouds.className = "clouds";
clouds.setAttribute("aria-hidden", "true");
scene.prepend(sky, clouds);
function scatter() {
  sky.innerHTML = `<span class="moon">${sprite(moonRows)}</span>`;
  for (let i = 0; i < 20; i++) {
    const rows = speckRows[i % speckRows.length];
    const speck = document.createElement("span");
    speck.className = "speck";
    speck.innerHTML = sprite(rows);
    speck.style.width = `calc(${rows[0].length} * var(--px))`;
    const left = 2 + Math.random() * 95;
    const top = 3 + Math.random() * 35;
    speck.style.left = `${left}%`;
    speck.style.top = `${top}%`;
    speck.style.animationDuration = `${3 + Math.random() * 4}s`;
    speck.style.animationDelay = `${-Math.random() * 6}s`;
    sky.append(speck);
  }
}
scatter();
for (let i = 0; i < 3; i++) {
  const cloud = document.createElement("span");
  cloud.className = "cloud";
  cloud.innerHTML = sprite(cloudRows);
  cloud.style.top = `${6 + i * 11 + Math.random() * 6}%`;
  cloud.style.animationDuration = `${70 + Math.random() * 50}s`;
  cloud.style.animationDelay = `${-(i / 3 + Math.random() * 0.2) * 100}s`;
  if (reducedMotion) cloud.style.left = `${12 + i * 30}%`;
  clouds.append(cloud);
}
const trexColor = () => getComputedStyle(scene).color;

const darkQuery = matchMedia("(prefers-color-scheme: dark)");
const isNight = () => {
  const picked = document.documentElement.dataset.theme;
  return picked ? picked === "dark" : darkQuery.matches;
};
function setSky() {
  const day = !isNight();
  scene.classList.toggle("day", day);
  star.title = t("don't.", "niet doen.");
  star.setAttribute(
    "aria-label",
    day ? t("The sun. Don't click it.", "De zon. Niet op klikken.") : t("A star. Don't click it.", "Een ster. Niet op klikken."),
  );
}
setSky();
darkQuery.addEventListener("change", setSky);
new MutationObserver(setSky).observe(document.documentElement, { attributeFilter: ["lang", "data-theme"] });

let quiet;
function say(text, ms = 2500) {
  bubble.textContent = text;
  dino.classList.add("talking");
  clearTimeout(quiet);
  quiet = setTimeout(() => {
    dino.classList.remove("talking");
    bubble.textContent = "";
  }, ms);
}
const rawr = () => say("rawr!");
dino.addEventListener("click", () => (dino.classList.contains("crashed") ? say("…ow") : rawr()));

/* Walking. The dino wanders to a random spot, stands around, repeats; unless it has somewhere to be. */
const maxX = () => Math.max(0, scene.clientWidth - dino.offsetWidth);
const dinoCenter = () => x + dino.offsetWidth / 2;
let x = maxX() * (0.25 + Math.random() * 0.5);
let target = x;
let speed = 40;
let restUntil = performance.now() + 1500;
let lastTime = performance.now();
let busy = false; // something is falling from the sky

function place() {
  const p = px();
  x = Math.min(x, maxX());
  dino.style.transform = `translateX(${Math.round(x / p) * p}px)`;
  // Keep the speech bubble on screen near the edges.
  dino.classList.toggle("edge-left", x < 40);
  dino.classList.toggle("edge-right", x > maxX() - 40);
}

function walkTo(to, pace = 60) {
  target = Math.max(0, Math.min(maxX(), to));
  speed = pace;
  restUntil = 0;
  dino.classList.toggle("left", target < x);
  dino.classList.toggle("running", pace > 100);
  if (reducedMotion) {
    x = target;
    place();
  }
}

function wander(now) {
  const dt = Math.min(now - lastTime, 100) / 1000;
  lastTime = now;
  if (now >= restUntil && !dino.classList.contains("crashed")) {
    if (Math.abs(target - x) < 0.5) {
      if (reducedMotion || busy) {
        restUntil = Infinity;
      } else {
        target = Math.random() * maxX();
        speed = 40;
        dino.classList.toggle("left", target < x);
      }
    }
    if (Math.abs(target - x) >= 0.5) {
      dino.classList.add("walking");
      const step = Math.sign(target - x) * speed * dt;
      x = Math.abs(target - x) <= Math.abs(step) ? target : x + step;
      if (x === target) {
        dino.classList.remove("walking", "running");
        restUntil = busy || reducedMotion ? Infinity : now + 1000 + Math.random() * 4000;
      }
    }
  }
  place();
  if (onScreen) requestAnimationFrame(wander);
  else looping = false;
}
place();
addEventListener("resize", place);

// Only animate while the scene is on screen; no point walking around when nobody's looking.
let onScreen = false;
let looping = false;
new IntersectionObserver(([entry]) => {
  onScreen = entry.isIntersecting;
  scene.classList.toggle("asleep", !onScreen);
  if (onScreen && !looping) {
    looping = true;
    lastTime = performance.now();
    requestAnimationFrame(wander);
  }
}).observe(scene);

// Click the ground and the dino comes over.
ground.addEventListener("click", (e) => {
  if (busy) return;
  walkTo(e.clientX - dino.offsetWidth / 2, 70);
});

/* Effects: one canvas over everything for leaves, fire, dust and debris. */
const fx = document.createElement("canvas");
fx.className = "fx";
document.body.append(fx);
const fctx = fx.getContext("2d");
const bits = [];
let fxRunning = false;
function sizeFx() {
  const dpr = devicePixelRatio || 1;
  fx.width = innerWidth * dpr;
  fx.height = innerHeight * dpr;
  fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
sizeFx();
addEventListener("resize", sizeFx);

function burst(n, make) {
  for (let i = 0; i < n; i++) bits.push(make(i));
  if (!fxRunning) {
    fxRunning = true;
    requestAnimationFrame(drawFx);
  }
}
function drawFx() {
  fctx.clearRect(0, 0, innerWidth, innerHeight);
  const p = px();
  for (let i = bits.length - 1; i >= 0; i--) {
    const b = bits[i];
    b.life -= b.decay;
    if (b.life <= 0) {
      bits.splice(i, 1);
      continue;
    }
    b.vy += b.gravity ?? 0.15;
    if (b.sway) b.vx = Math.sin((b.phase = (b.phase || 0) + 0.08)) * b.sway;
    b.x += b.vx;
    b.y += b.vy;
    const s = b.size * p;
    fctx.fillStyle = b.color;
    fctx.fillRect(Math.round(b.x / p) * p, Math.round(b.y / p) * p, s, s);
  }
  if (bits.length) requestAnimationFrame(drawFx);
  else fxRunning = false;
}

// Shake a tree and some leaves come down.
scene.querySelectorAll(".tree").forEach((tree) => {
  tree.addEventListener("click", () => {
    tree.classList.remove("shaken");
    void tree.offsetWidth;
    tree.classList.add("shaken");
    const r = tree.getBoundingClientRect();
    const color = trexColor();
    burst(reducedMotion ? 4 : 12, () => ({
      x: r.left + r.width * (0.15 + Math.random() * 0.7),
      y: r.top + r.height * (0.15 + Math.random() * 0.3),
      vx: 0,
      vy: 0.3 + Math.random() * 0.5,
      gravity: 0.004,
      sway: 0.6 + Math.random() * 0.6,
      size: 1,
      color,
      life: 1,
      decay: 0.006 + Math.random() * 0.004,
    }));
    if (!busy && Math.random() < 0.3) say(t("hey!", "hé!"), 1500);
  });
});

/* The star. Click it (or type "boom" or "meteor") and an asteroid comes for the dino.
   Click the asteroid to blast it out of the sky before it lands. */
let falling = 0;
function launch() {
  if (falling >= 3 || dino.classList.contains("crashed")) return;
  // The scene sits at the end of the page; bring it into view first.
  const gr = ground.getBoundingClientRect();
  if (gr.top > innerHeight || gr.bottom < 0) {
    ground.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "end" });
    setTimeout(launch, 700);
    return;
  }
  falling++;
  busy = true;

  const p = px();
  const groundY = ground.getBoundingClientRect().top;
  const impactX = dinoCenter();
  const side = impactX > innerWidth / 2 ? -1 : 1;
  const startX = impactX + side * Math.min(innerWidth * 0.6, 600);
  const startY = -80;
  const size = 16 * p;

  const rock = document.createElement("button");
  rock.type = "button";
  rock.className = "asteroid";
  rock.setAttribute("aria-label", t("Asteroid! Click it to save the dinosaur.", "Asteroïde! Klik erop om de dino te redden."));
  rock.innerHTML = sprite(asteroidRows);
  document.body.append(rock);

  // The dino notices, and makes a run for it.
  setTimeout(() => {
    say("!", 900);
    walkTo(impactX > innerWidth / 2 ? 0 : maxX(), 150 + Math.random() * 40);
  }, 450);

  const duration = 2600;
  const t0 = performance.now();
  let done = false;
  let cx = startX;
  let cy = startY;

  function finish() {
    done = true;
    rock.remove();
    falling--;
    if (!falling) {
      setTimeout(() => {
        busy = false;
        restUntil = performance.now() + 1200;
        dino.classList.remove("running");
      }, 1200);
    }
  }

  rock.addEventListener("click", () => {
    if (done) return;
    finish();
    burst(36, () => {
      const a = Math.random() * Math.PI * 2;
      const v = 1 + Math.random() * 4;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 1,
        size: Math.random() < 0.3 ? 2 : 1,
        color: Math.random() < 0.5 ? trexColor() : fire[(Math.random() * 3) | 0],
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
      };
    });
    setTimeout(() => say(t("my hero!", "mijn held!")), 300);
  });

  function fall(now) {
    if (done) return;
    const k = Math.min((now - t0) / duration, 1);
    const e = k * k; // speeding up as it comes in
    cx = startX + (impactX - startX) * e;
    cy = startY + (groundY - startY) * e;
    const spin = Math.floor(k * 12) * 90;
    rock.style.transform = `translate(${Math.round((cx - size / 2) / p) * p}px, ${Math.round((cy - size / 2) / p) * p}px) rotate(${spin}deg)`;
    if (!reducedMotion) {
      burst(2, () => ({
        x: cx + (Math.random() - 0.5) * size * 0.6,
        y: cy + (Math.random() - 0.5) * size * 0.6,
        vx: side * (0.5 + Math.random()),
        vy: -0.5 - Math.random(),
        gravity: 0,
        size: Math.random() < 0.4 ? 2 : 1,
        color: fire[(Math.random() * 3) | 0],
        life: 1,
        decay: 0.05 + Math.random() * 0.04,
      }));
    }
    if (k < 1) requestAnimationFrame(fall);
    else impact();
  }
  requestAnimationFrame(fall);

  function impact() {
    finish();
    // Dust and sparks.
    burst(40, () => {
      const a = Math.PI + Math.random() * Math.PI;
      const v = 1 + Math.random() * 5;
      return {
        x: impactX,
        y: groundY,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        size: Math.random() < 0.3 ? 2 : 1,
        color: Math.random() < 0.6 ? trexColor() : fire[(Math.random() * 3) | 0],
        life: 1,
        decay: 0.012 + Math.random() * 0.015,
      };
    });
    // A crater that slowly fills back in.
    const crater = document.createElement("div");
    crater.className = "crater";
    crater.innerHTML = sprite(craterRows);
    crater.style.left = `${Math.round((impactX - 7 * p) / p) * p}px`;
    scene.append(crater);
    setTimeout(() => crater.remove(), 12000);
    if (!reducedMotion) {
      const root = document.documentElement;
      root.classList.remove("shake");
      void root.offsetWidth;
      root.classList.add("shake");
      setTimeout(() => root.classList.remove("shake"), 500);
    }
    // Did it get away?
    if (Math.abs(dinoCenter() - impactX) < 12 * p) {
      target = x;
      dino.classList.remove("walking", "running");
      dino.classList.add("crashed");
      say("ow.", 2200);
      setTimeout(() => {
        dino.classList.remove("crashed");
        say(t("…still here", "…nog steeds hier"), 2000);
      }, 2400);
    } else {
      setTimeout(() => say(t("phew!", "pfoe!")), 400);
    }
  }
}
star.addEventListener("click", launch);

/* Typing anywhere: rawr / dino, or boom / meteor. */
let typed = "";
addEventListener("keydown", (e) => {
  if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.closest?.("input, textarea, [contenteditable]")) return;
  typed = (typed + e.key.toLowerCase()).slice(-6);
  if (typed.endsWith("rawr") || typed.endsWith("dino")) rawr();
  if (typed.endsWith("boom") || typed.endsWith("meteor")) launch();
});

// Poke my name three times.
const nameEl = document.querySelector(".intro h1");
let pokes = [];
nameEl?.addEventListener("click", () => {
  const now = Date.now();
  pokes = pokes.filter((p) => now - p < 1200).concat(now);
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

/* NL / EN. Both languages are in the page; this flips <html lang> and remembers the choice. */
const lang = () => (document.documentElement.lang === "nl" ? "nl" : "en");
const descriptions = {
  en: document.querySelector('meta[name="description"]')?.content,
  nl: "Software engineer en product builder bij Hilversum. Ik breng producten van de eerste schets tot productie, en AI doet een groot deel van het typwerk.",
};
const langButton = document.querySelector(".lang");
const titles = { en: document.title, nl: document.documentElement.dataset.titleNl || document.title };

function setLang(l) {
  document.documentElement.lang = l;
  langButton.textContent = l === "nl" ? "EN" : "NL";
  langButton.lang = l === "nl" ? "en" : "nl";
  langButton.setAttribute("aria-label", l === "nl" ? "Switch to English" : "Bekijk in het Nederlands");
  document.querySelector('meta[name="description"]')?.setAttribute("content", descriptions[l]);
  document.title = titles[l];
}

if (langButton) {
  setLang(lang());
  langButton.hidden = false;
  langButton.addEventListener("click", () => {
    const next = lang() === "nl" ? "en" : "nl";
    setLang(next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
  });
}

/* Light / dark. Follows the system until someone picks one with the button. */
const themeButton = document.querySelector(".theme");
const systemDark = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => (document.documentElement.dataset.theme || (systemDark.matches ? "dark" : "light")) === "dark";

function showTheme() {
  const dark = isDark();
  themeButton.dataset.show = dark ? "sun" : "moon";
  const label = lang() === "nl" ? (dark ? "Lichte modus" : "Donkere modus") : dark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-label", label);
  themeButton.title = label;
  if (document.documentElement.dataset.theme) {
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => (m.content = dark ? "#12110e" : "#fffaf0"));
  }
}

if (themeButton) {
  showTheme();
  themeButton.hidden = false;
  systemDark.addEventListener("change", showTheme);
  langButton?.addEventListener("click", showTheme);
  themeButton.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    showTheme();
    try {
      localStorage.setItem("theme", next);
    } catch {}
  });
}

/* Miss me? */
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? (lang() === "nl" ? "🦕 rawr? kom terug" : "🦕 rawr? come back") : titles[lang()];
});

console.log(
  "%c🦕 Hi, curious one. View source is how I started too.\n%cpsst: type rawr. the trees and the ground like being clicked.\nfeeling mean? type boom.",
  "font: 700 14px monospace; color: #535353",
  "font: 12px monospace; color: #a39d90",
);
