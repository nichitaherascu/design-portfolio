// ─────────────────────────────────────────────────────────────────
//  main.js — shared utilities
//  Loaded on: all pages
// ─────────────────────────────────────────────────────────────────


// ── Custom cursor ─────────────────────────────────────────────────
//  Moves a <div id="cursor"> to follow the mouse.
//  Expands to a ring on any <a> hover.

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
//  Adds class .in to every [data-anim] element, staggered by 85ms.
//  CSS handles the actual opacity/transform transition.

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