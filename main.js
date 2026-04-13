// ─────────────────────────────────────────────────────────────────
//  main.js — shared across all pages
// ─────────────────────────────────────────────────────────────────


// ── Custom cursor ─────────────────────────────────────────────────
//  Moves #cursor to follow the mouse.
//  Expands into a ring on any <a> hover.

function initCursor() {
const cursor = document.getElementById('cursor');
if (!cursor) return;

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    a.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
}


// ── Staggered entrance animation ──────────────────────────────────
//  Adds .in to every [data-anim] element, staggered by 85ms.
//  CSS handles the opacity/transform transition.

function initEntrance() {
document.querySelectorAll('[data-anim]').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 60 + i * 85);
});
}


// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
initCursor();
initEntrance();
});