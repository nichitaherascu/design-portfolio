js // ───────────────────────────────────────────────────────────────── // index.js — index.html only // ─────────────────────────────────────────────────────────────────

// ── Home photo parallax (rAF lerp) ──────────────────────────────── function initParallax() { const el = document.getElementById('home-bg'); if (!el) return;

let tx = 0, ty = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => { tx = (e.clientX / window.innerWidth - .5) * 24; ty = (e.clientY / window.innerHeight - .5) * 16; });

(function loop() { cx += (tx - cx) * .07; cy += (ty - cy) * .07; el.style.transform = translate(${cx}px, ${cy}px) scale(1.06); requestAnimationFrame(loop); })(); }

// ── Projects overlay ────────────────────────────────────────────── function initProjectsOverlay() { const overlay = document.getElementById('proj-overlay'); const openBtn = document.getElementById('proj-open'); const closeBtn = document.getElementById('proj-close'); if (!overlay || !openBtn) return;

function open() { overlay.classList.add('open'); document.body.classList.remove('dark-slide'); // cursor goes dark on light bg }

function close() { overlay.classList.remove('open'); document.body.classList.add('dark-slide'); }

openBtn.addEventListener('click', open); if (closeBtn) closeBtn.addEventListener('click', close);

overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }); }

document.addEventListener('DOMContentLoaded', () => { initParallax(); initProjectsOverlay(); });