// ─────────────────────────────────────────────────────────────────
//  about.js — about.html only
// ─────────────────────────────────────────────────────────────────


// ── Photo float on scroll (parallax) ─────────────────────────────
//  The photo drifts upward as the user scrolls down — slower than
//  the content, creating a floating / depth effect.
//  Lerp (0.06) makes the movement smooth with a natural lag.

function initPhotoFloat() {
const photo = document.querySelector('.photo-sticky');
if (!photo) return;

let target  = 0;
let current = 0;

window.addEventListener('scroll', () => {
    // Move up at 6% of scroll speed, capped at 60px
    target = -Math.min(window.scrollY * 0.06, 60);
}, { passive: true });

(function tick() {
    current += (target - current) * 0.06; // lerp
    photo.style.transform = `translateY(${current}px)`;
    requestAnimationFrame(tick);
})();
}


// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
initPhotoFloat();
});
