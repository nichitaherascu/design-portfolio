// ─────────────────────────────────────────────────────────────────
//  index.js — entry page specific
//  Loaded on: index.html only
// ─────────────────────────────────────────────────────────────────


// ── Click to enter ────────────────────────────────────────────────
//  On click: adds .opening class (triggers CSS scale-out animation),
//  then redirects to home.html after the animation completes (300ms).

document.addEventListener('DOMContentLoaded', () => {
const entry = document.getElementById('entry');
if (!entry) return;

entry.addEventListener('click', () => {
    entry.classList.add('opening');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 300);
});
});