// ─────────────────────────────────────────────────────────────────
//  index.js — index.html only
// ─────────────────────────────────────────────────────────────────

// ── Home photo parallax (rAF lerp) ────────────────────────────────
function initParallax() {
    const el = document.getElementById('home-bg');
    if (!el) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
        tx = (e.clientX / window.innerWidth  - .5) * 24;
        ty = (e.clientY / window.innerHeight - .5) * 16;
    });

    (function loop() {
        cx += (tx - cx) * .07;
        cy += (ty - cy) * .07;
        el.style.transform = `translate(${cx}px, ${cy}px) scale(1.06)`;
        requestAnimationFrame(loop);
    })();
}

// ── Projects overlay ──────────────────────────────────────────────
function initProjectsOverlay() {
    const overlay = document.getElementById('proj-overlay');
    if (!overlay) {
        console.warn('[index.js] #proj-overlay missing from index.html');
        return;
    }

    function open() {
        overlay.classList.add('open');
        document.body.classList.remove('dark-slide');
    }

    function close() {
        overlay.classList.remove('open');
        document.body.classList.add('dark-slide');
    }

    document.addEventListener('click', e => {
        if (e.target.closest('#proj-open')) {
            e.preventDefault();
            e.stopPropagation();
            open();
            return;
        }
        if (e.target.closest('#proj-close')) {
            e.preventDefault();
            e.stopPropagation();
            close();
            return;
        }
        if (e.target === overlay) close();
    }, true);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initProjectsOverlay();
});