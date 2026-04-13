// ─────────────────────────────────────────────────────────────────
//  project.js — all project pages
// ─────────────────────────────────────────────────────────────────


// ── Keyboard navigation ───────────────────────────────────────────
//  ← arrow key = go to previous project (or back to home)
//  → arrow key = go to next project

document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        const back = document.getElementById('proj-back');
        if (back) window.location.href = back.href;
    }
    if (e.key === 'ArrowRight') {
        const next = document.getElementById('proj-next');
        if (next) window.location.href = next.href;
    }
});
});