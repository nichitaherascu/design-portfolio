// ─────────────────────────────────────────────────────────────────
//  home.js — home page specific
//  Loaded on: home.html only
// ─────────────────────────────────────────────────────────────────


// ── Fit name to full viewport width ───────────────────────────────
//  Uses binary search to find the largest font-size (in vw)
//  where #big-name still fits inside its container without overflow.

function fitName() {
const el   = document.getElementById('big-name');
const wrap = el.parentElement;
if (!el) return;

let lo = 1, hi = 40;

for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2;
    el.style.fontSize = mid + 'vw';
    el.scrollWidth <= wrap.clientWidth ? (lo = mid) : (hi = mid);
}

el.style.fontSize = lo + 'vw';
}


// ── Portrait parallax ─────────────────────────────────────────────
//  Drifts the portrait blob as the mouse moves.
//  Uses requestAnimationFrame + lerp (0.07) for a smooth lag effect.
//  tx/ty = target position  |  cx/cy = current (interpolated) position

function initParallax() {
const el = document.getElementById('portrait');
if (!el) return;

let tx = 0, ty = 0;
let cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth  - .5) * 24; // ±12px horizontal
    ty = (e.clientY / window.innerHeight - .5) * 16; // ±8px  vertical
});

(function loop() {
    cx += (tx - cx) * .07; // lerp — move 7% closer each frame
    cy += (ty - cy) * .07;
    el.style.transform =
        `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`;
    requestAnimationFrame(loop);
})();
}


// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
fitName();
initParallax();
window.addEventListener('resize', fitName); // refit on window resize
});