js // ───────────────────────────────────────────────────────────────── // index.js — index.html only // ─────────────────────────────────────────────────────────────────

// ── Home photo parallax (rAF lerp) ──────────────────────────────── // scale(1.06) keeps the photo oversized so drift never shows edges. function initParallax() { const el = document.getElementById('home-bg'); if (!el) return;

let tx = 0, ty = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => { tx = (e.clientX / window.innerWidth - .5) * 24; ty = (e.clientY / window.innerHeight - .5) * 16; });

(function loop() { cx += (tx - cx) * .07; cy += (ty - cy) * .07; el.style.transform = translate(${cx}px, ${cy}px) scale(1.06); requestAnimationFrame(loop); })(); }

// ── Cursor-following project label ──────────────────────────────── // Reads data-title / data-cat off each .slide-project. // Sits 30px right of the cursor, flips left near the viewport edge. function initProjectLabel() { // Touch devices have no cursor — .proj-info shows instead if (window.matchMedia('(hover: none)').matches) return;

const label = document.getElementById('proj-label'); if (!label) return;

const titleEl = label.querySelector('.pl-title'); const catEl = label.querySelector('.pl-cat'); const OFFSET = 30; // gap from cursor ring const FLIP_AT = 340; // px from right edge before flipping side

document.addEventListener('mousemove', e => { const flip = e.clientX > window.innerWidth - FLIP_AT; const x = flip ? e.clientX - OFFSET : e.clientX + OFFSET; label.style.transform = translate(${x}px, ${e.clientY}px) translateY(-50%) + (flip ? ' translateX(-100%)' : ''); label.style.textAlign = flip ? 'right' : 'left'; });

document.querySelectorAll('.slide-project').forEach(slide => { slide.addEventListener('mouseenter', () => { titleEl.textContent = slide.dataset.title || ''; catEl.textContent = slide.dataset.cat || ''; label.classList.add('visible'); }); slide.addEventListener('mouseleave', () => { label.classList.remove('visible'); }); }); }

// ── Full-page slider ────────────────────────────────────────────── function initSlider() { const slider = document.getElementById('slider'); const slides = document.querySelectorAll('.slide'); if (!slider) return;

let current = 0;

function navigateTo(idx) { idx = Math.max(0, Math.min(slides.length - 1, idx)); slider.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' }); }

function updateUI(idx) { current = idx; // Toggle dark/light nav, cursor + label colour based on slide theme const isDark = slides[idx]?.dataset.theme === 'dark'; document.body.classList.toggle('dark-slide', isDark); }

updateUI(0);

slider.addEventListener('scroll', () => { const idx = Math.round(slider.scrollTop / window.innerHeight); if (idx !== current) updateUI(idx); });

document.addEventListener('keydown', e => { if (e.key === 'ArrowDown' || e.key === 'PageDown') navigateTo(current + 1); if (e.key === 'ArrowUp' || e.key === 'PageUp') navigateTo(current - 1); }); }

// ── Bootstrap ───────────────────────────────────────────────────── document.addEventListener('DOMContentLoaded', () => { initParallax(); initProjectLabel(); initSlider(); });


## How it works

**Content lives in data attributes** — `data-title` and `data-cat` on each `.slide-project`. The label reads them on `mouseenter`, so adding a project means adding two attributes, no JS changes.

**Colour follows the slide theme.** `initSlider()` already toggles `dark-slide` on `<body>` as you scroll, so `#proj-label` inherits black-on-light or white-on-dark automatically. Same mechanism as your cursor.

**Edge flip.** Within 340px of the right edge the label jumps to the left of the cursor and right-aligns, so long titles like "Book Design & Art Direction" never get clipped.

**Mobile keeps static info.** `@media (hover: none)` hides the label and reveals `.proj-info` — otherwise touch users would see unlabelled images with no idea what they're tapping.

## Two removals worth noting

**`.proj-watermark` is gone entirely** — CSS and markup.

**`data-anim-slide` and its IntersectionObserver are gone.** That observer only animated the title and meta, which no longer appear on desktop. The `[data-anim-slide]` rules in `style.css` are now unused — harmless, but you can delete section 5 whenever you tidy up.
Give me the js as code
Here's index.js complete:

js
// ─────────────────────────────────────────────────────────────────
//  index.js — index.html only
// ─────────────────────────────────────────────────────────────────

// ── Home photo parallax (rAF lerp) ────────────────────────────────
//  Subtle mouse-follow drift on the hero image.
//  scale(1.06) is required — the photo must stay slightly oversized
//  so the drift never exposes the edges.
//  For a static photo: remove the initParallax() call at the bottom.
function initParallax() {
    const el = document.getElementById('home-bg');
    if (!el) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
        tx = (e.clientX / window.innerWidth  - .5) * 24;
        ty = (e.clientY / window.innerHeight - .5) * 16;
    });