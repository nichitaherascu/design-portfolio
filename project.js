// ─────────────────────────────────────────────────────────────────
//  project.js — all project pages
// ─────────────────────────────────────────────────────────────────


// ── Image fade in as you scroll ───────────────────────────────────
//  Uses IntersectionObserver with the scrollable panel as root
//  so it works inside the fixed overflow container.

function initImageFadeIn() {
const container = document.querySelector('.proj-content');
const images    = document.querySelectorAll('.img-block');
if (!images.length) return;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('img-visible');
            observer.unobserve(entry.target); // fire once only
        }
    });
}, {
    root:       container,   // observe within the scrollable panel
    threshold:  0.1,
    rootMargin: '0px 0px -30px 0px'
});

images.forEach(img => observer.observe(img));
}


// ── Keyboard navigation with fade ────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

initImageFadeIn();

document.addEventListener('keydown', e => {
    let href = null;
    if (e.key === 'ArrowLeft')  { const b = document.getElementById('proj-back'); if (b) href = b.href; }
    if (e.key === 'ArrowRight') { const n = document.getElementById('proj-next'); if (n) href = n.href; }
    if (href) {
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 320);
    }
});
});