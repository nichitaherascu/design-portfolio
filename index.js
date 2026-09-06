js // ───────────────────────────────────────────────────────────────── // index.js — index.html only // ─────────────────────────────────────────────────────────────────

// ── Home photo parallax (rAF lerp) ──────────────────────────────── function initParallax() { const el = document.getElementById('home-bg'); if (!el) return;

let tx = 0, ty = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => { tx = (e.clientX / window.innerWidth - .5) * 24; ty = (e.clientY / window.innerHeight - .5) * 16; });

(function loop() { cx += (tx - cx) * .07; cy += (ty - cy) * .07; el.style.transform = translate(${cx}px, ${cy}px) scale(1.06); requestAnimationFrame(loop); })(); }

document.addEventListener('DOMContentLoaded', () => { initParallax(); });

