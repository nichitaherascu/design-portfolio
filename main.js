// ─────────────────────────────────────────────────────────────────
//  main.js — shared across all pages
// ─────────────────────────────────────────────────────────────────


// ── Page transitions ──────────────────────────────────────────────
//  Fade in on load. Fade out before any internal link navigation.
//  External links (_blank) and hash links are ignored.

function initTransitions() {

// Fade in: body starts at opacity 0 (set in style.css),
// two rAF frames ensures the browser has painted before revealing
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// Fade out: intercept internal link clicks
document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (a.target === '_blank') return;                   // external tab
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#'))       return;              // hash anchor
    if (href.startsWith('mailto:')) return;              // email
    if (a.closest('#entry'))        return;              // index.js handles this

    e.preventDefault();
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = a.href; }, 320);
});
}


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

function initEntrance() {
document.querySelectorAll('[data-anim]').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 60 + i * 85);
});
}


// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
initTransitions(); // always first — reveals the page
initCursor();
initEntrance();
});