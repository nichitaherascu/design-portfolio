// ─────────────────────────────────────────────────────────────────
//  index.js — index.html only
// ─────────────────────────────────────────────────────────────────


// ── Click to enter ────────────────────────────────────────────────
//  Adds .opening class (CSS scale-out animation),
//  then navigates to home.html after 300ms.

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