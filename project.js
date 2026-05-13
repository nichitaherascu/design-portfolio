// ─────────────────────────────────────────────────────────────────
//  project.js — all project pages
// ─────────────────────────────────────────────────────────────────


// ── Image fade in as you scroll ───────────────────────────────────
function initImageFadeIn() {
const container = document.querySelector('.proj-content');
const images    = document.querySelectorAll('.img-block');
if (!images.length) return;

// Mobile: page scrolls naturally → use viewport (null) as root
const isMobile = window.innerWidth <= 768;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('img-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    root:       isMobile ? null : container,
    threshold:  0.1,
    rootMargin: '0px 0px -30px 0px'
});

images.forEach(img => observer.observe(img));
}


// ── Block right-click on images ───────────────────────────────────
function initImageProtection() {
const content = document.querySelector('.proj-content');
if (!content) return;
content.addEventListener('contextmenu', e => {
    if (e.target.closest('.img-block, img')) e.preventDefault();
});
}


// ── Keyboard navigation with fade ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
initImageFadeIn();
initImageProtection();

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