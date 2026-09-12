// ─────────────────────────────────────────────────────────────────
//  about.js — about.html only
// ─────────────────────────────────────────────────────────────────

// ── Photo float on scroll (parallax) ─────────────────────────────
//  The sticky portrait drifts upward as the user scrolls — slower
//  than the content, creating a floating / depth effect.
//  Lerp (0.06) gives the movement a smooth, natural lag.
//
//  NOTE: targets .photo-sticky. The photo must stay position: sticky
//  in the CSS — as position: fixed it overlapped the footer.

function initPhotoFloat() {
    const photo = document.querySelector('.photo-sticky');
    if (!photo) {
        console.warn('[about.js] .photo-sticky not found — parallax skipped.');
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isDesktop    = window.matchMedia('(min-width: 769px)');

    const MAX_DRIFT = 60;    // px
    const SPEED     = 0.06;  // fraction of scroll distance
    const LERP      = 0.06;

    let target  = 0;
    let current = 0;
    let raf     = null;

    function frame() {
        current += (target - current) * LERP;

        if (Math.abs(target - current) < 0.1) {
            current = target;
            raf = null;
        }

        photo.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;

        if (raf !== null) raf = requestAnimationFrame(frame);
    }

    function start() {
        if (raf === null) raf = requestAnimationFrame(frame);
    }

    function onScroll() {
        // Photo is display:none below 769px — don't animate it.
        if (reduceMotion.matches || !isDesktop.matches) return;
        target = -Math.min(window.scrollY * SPEED, MAX_DRIFT);
        start();
    }

    function reset() {
        target = 0;
        if (reduceMotion.matches || !isDesktop.matches) {
            current = 0;
            photo.style.transform = '';
            if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
        } else {
            onScroll();
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    isDesktop.addEventListener('change', reset);
    reduceMotion.addEventListener('change', reset);

    onScroll(); // set initial position on load / refresh mid-page
}

// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initPhotoFloat();
});