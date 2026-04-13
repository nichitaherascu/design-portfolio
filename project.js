// ─────────────────────────────────────────────────────────────────
//  project.js — all project pages
// ─────────────────────────────────────────────────────────────────


// ── Keyboard navigation with fade ────────────────────────────────
//  ← = previous project   → = next project
//  Fades body out first to match the main.js link transition.

document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('keydown', e => {
    let href = null;

    if (e.key === 'ArrowLeft') {
        const back = document.getElementById('proj-back');
        if (back) href = back.href;
    }
    if (e.key === 'ArrowRight') {
        const next = document.getElementById('proj-next');
        if (next) href = next.href;
    }

    if (href) {
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 320);
    }
});
});