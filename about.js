// ─────────────────────────────────────────────────────────────────
//  about.js — about.html only
//
//  1. initPhotoFloat  — parallax drift on the sticky portrait
//  2. initCopyEmail   — copy-to-clipboard on the contact email
// ─────────────────────────────────────────────────────────────────

console.log('[about.js] v2 loaded');
// ^ If you don't see this in the console, the file isn't being
//   served — check the path in <script src> and hard-refresh.

// ── 1. Photo float on scroll (parallax) ──────────────────────────
//  The sticky portrait drifts upward as the user scrolls — slower
//  than the content, creating a floating / depth effect.
//  Lerp (0.06) gives the movement a smooth, natural lag.
//
//  NOTE: targets .photo-sticky. The photo must stay position: sticky
//  in the CSS. Two historical bugs here:
//    (a) the markup once said .photo-fixed while this file said
//        .photo-sticky, so the function bailed on line 2 and the
//        parallax never ran;
//    (b) overflow-x: hidden on html/body silently disables sticky —
//        it must be overflow-x: clip.

function initPhotoFloat() {
    const photo = document.querySelector('.photo-sticky');
    if (!photo) {
        console.warn('[about.js] .photo-sticky not found — parallax skipped.');
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isDesktop    = window.matchMedia('(min-width: 769px)');

    const MAX_DRIFT = 60;    // px — cap on total travel
    const SPEED     = 0.06;  // fraction of scroll distance
    const LERP      = 0.06;  // easing factor per frame

    let target  = 0;
    let current = 0;
    let raf     = null;

    function frame() {
        current += (target - current) * LERP;

        // Settle and stop the loop once we're close enough — avoids
        // running requestAnimationFrame forever while idle.
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
        // Photo is display:none below 769px — don't animate it there.
        if (reduceMotion.matches || !isDesktop.matches) return;
        target = -Math.min(window.scrollY * SPEED, MAX_DRIFT);
        start();
    }

    function reset() {
        target = 0;

        if (reduceMotion.matches || !isDesktop.matches) {
            current = 0;
            photo.style.transform = '';
            if (raf !== null) {
                cancelAnimationFrame(raf);
                raf = null;
            }
        } else {
            onScroll();
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Re-evaluate when crossing the breakpoint or toggling OS motion
    // settings. addEventListener on MediaQueryList is unsupported in
    // Safari < 14, hence the addListener fallback.
    if (typeof isDesktop.addEventListener === 'function') {
        isDesktop.addEventListener('change', reset);
        reduceMotion.addEventListener('change', reset);
    } else if (typeof isDesktop.addListener === 'function') {
        isDesktop.addListener(reset);
        reduceMotion.addListener(reset);
    }

    onScroll(); // set initial position on load / refresh mid-page
}

// ── 2. Copy email to clipboard ───────────────────────────────────
//  Progressive enhancement only. The mailto: link above the button
//  always works, so if the Clipboard API is unavailable or blocked
//  (non-HTTPS context, older Safari, permissions policy) the button
//  removes itself rather than sitting there doing nothing.

function initCopyEmail() {
    const btn = document.getElementById('c-copy');
    if (!btn) {
        console.warn('[about.js] #c-copy not found — copy button skipped.');
        return;
    }

    const email = btn.dataset.email;

    if (!email || !navigator.clipboard) {
        console.warn('[about.js] Clipboard API unavailable — button removed.');
        btn.remove();
        return;
    }

    const label = btn.textContent;
    let timer = null;

    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                btn.textContent = 'Copied';
                clearTimeout(timer);
                timer = setTimeout(() => {
                    btn.textContent = label;
                }, 1800);
            })
            .catch(() => {
                btn.remove();
            });
    });
}

// ── Bootstrap ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initPhotoFloat();
    initCopyEmail();
});