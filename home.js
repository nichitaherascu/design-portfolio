// ─────────────────────────────────────────────────────────────────
//  home.js — home.html only
// ─────────────────────────────────────────────────────────────────


// ── Fit name to full viewport width ───────────────────────────────
//  Binary search finds the largest vw font-size where
//  #big-name fits inside its container without overflow.

function fitName() {
const el   = document.getElementById('big-name');
const wrap = el?.parentElement;
if (!el || !wrap) return;

let lo = 1, hi = 40;
for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2;
    el.style.fontSize = mid + 'vw';
    el.scrollWidth <= wrap.clientWidth ? (lo = mid) : (hi = mid);
}
el.style.fontSize = lo + 'vw';
}


// ── Portrait parallax (rAF lerp) ──────────────────────────────────
//  Drifts #portrait with the mouse using requestAnimationFrame.
//  Lerp factor 0.07 creates a smooth, lagging float effect.

function initParallax() {
const el = document.getElementById('portrait');
if (!el) return;

let tx = 0, ty = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth  - .5) * 24;
    ty = (e.clientY / window.innerHeight - .5) * 16;
});

(function loop() {
    cx += (tx - cx) * .07;
    cy += (ty - cy) * .07;
    el.style.transform =
        `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`;
    requestAnimationFrame(loop);
})();
}


// ── Full-page slider ──────────────────────────────────────────────
//  Tracks current slide, inverts nav on dark slides,
//  handles keyboard navigation, animates project slides on scroll.

function initSlider() {
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
if (!slider) return;

let current = 0;

// Scroll to a slide by index
function navigateTo(idx) {
    idx = Math.max(0, Math.min(slides.length - 1, idx));
    slider.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
}

// Update UI when slide changes
function updateUI(idx) {
    current = idx;
    const isDark = slides[idx]?.dataset.theme === 'dark';
    document.body.classList.toggle('dark-slide', isDark);
}

// Track scroll position
slider.addEventListener('scroll', () => {
    const idx = Math.round(slider.scrollTop / window.innerHeight);
    if (idx !== current) updateUI(idx);
});

// Keyboard: arrow + page keys
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') navigateTo(current + 1);
    if (e.key === 'ArrowUp'   || e.key === 'PageUp')   navigateTo(current - 1);
});

// Animate project slide elements when scrolled into view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target
            .querySelectorAll('[data-anim-slide]')
            .forEach((el, i) => {
                el.classList.remove('in');
                setTimeout(() => el.classList.add('in'), 80 + i * 110);
            });
    });
}, { threshold: 0.55 });

document.querySelectorAll('.slide-project').forEach(s => observer.observe(s));
}


// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
fitName();
initParallax();
initSlider();
window.addEventListener('resize', fitName);
});