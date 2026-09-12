// ─────────────────────────────────────────────────────────────────
//  about.js — about.html only
//
//  The old .photo-sticky parallax is gone: that element no longer
//  exists in the editorial layout. Replaced with a subtle drift on
//  the centre image, which deepens the headline overlap on scroll.
// ─────────────────────────────────────────────────────────────────

console.log('[about.js] v3 loaded');
// ^ No log in the console = the file isn't being served.
//   Check the <script src> path and hard-refresh.

// ── Centre image drift ───────────────────────────────────────────
//  The image rises slightly as the page scrolls, so the headline
//  overlaps it further. Deliberately small — 40px of total travel.
//  Lerp (0.08) keeps the movement smooth with a natural lag.

function initImageDrift() {
    const figure = document.querySelector('.figure');
    if (!figure) {
        console.warn('[about.js] .figure not found — drift skipped.');
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isWide       = window.matchMedia('(min-width: 901px)');

    const MAX_DRIFT = 40;    // px — total travel
    const SPEED     = 0.05;  // fraction of scroll distance
    const LERP      = 0.08;  // easing per frame

    let target  = 0;
    let current = 0;
    let raf     = null;

    function frame() {
        current += (target - current) * LERP;

        // Settle and halt — no idle requestAnimationFrame loop.
        if (Math.abs(target - current) < 0.1) {
            current = target;
            raf = null;
        }

        figure.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;

        if (raf !== null) raf = requestAnimationFrame(frame);
    }

    function start() {
        if (raf === null) raf = requestAnimationFrame(frame);
    }

    function onScroll() {
        // The overlap only exists above 900px — don't drift below it.
        if (reduceMotion.matches || !isWide.matches) return;
        target = -Math.min(window.scrollY * SPEED, MAX_DRIFT);
        start();
    }

    function reset() {
        target = 0;

        if (reduceMotion.matches || !isWide.matches) {
            current = 0;
            figure.style.transform = '';
            if (raf !== null) {
                cancelAnimationFrame(raf);
                raf = null;
            }
        } else {
            onScroll();
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // MediaQueryList.addEventListener is unsupported in Safari < 14,
    // hence the addListener fallback.
    if (typeof isWide.addEventListener === 'function') {
        isWide.addEventListener('change', reset);
        reduceMotion.addEventListener('change', reset);
    } else if (typeof isWide.addListener === 'function') {
        isWide.addListener(reset);
        reduceMotion.addListener(reset);
    }

    onScroll(); // set initial position on load / refresh mid-page
}

// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initImageDrift();
});