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

// ── Cursor-following project label ────────────────────────────────
function initProjectLabel() {
    if (window.matchMedia('(hover: none)').matches) return;

    const label = document.getElementById('proj-label');
    if (!label) {
        console.warn('[index.js] #proj-label not found');
        return;
    }

    const titleEl = label.querySelector('.pl-title');
    const catEl   = label.querySelector('.pl-cat');
    const OFFSET  = 30;
    const FLIP_AT = 340;

    let mx = -9999, my = -9999, active = null, queued = false;

    function render() {
        queued = false;

        const under = document.elementFromPoint(mx, my);
        const slide = under ? under.closest('.slide-project') : null;

        if (slide !== active) {
            active = slide;
            if (slide) {
                titleEl.textContent = slide.dataset.title || '';
                catEl.textContent   = slide.dataset.cat   || '';
                label.classList.add('visible');
            } else {
                label.classList.remove('visible');
            }
        }

        if (!slide) return;

        const flip = mx > window.innerWidth - FLIP_AT;
        const x    = flip ? mx - OFFSET : mx + OFFSET;
        label.style.transform =
            `translate(${x}px, ${my}px) translateY(-50%)` +
            (flip ? ' translateX(-100%)' : '');
        label.style.textAlign = flip ? 'right' : 'left';
    }

    function schedule() {
        if (!queued) { queued = true; requestAnimationFrame(render); }
    }

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        schedule();
    });

    const slider = document.getElementById('slider');
    if (slider) slider.addEventListener('scroll', schedule, { passive: true });

    document.addEventListener('mouseleave', () => {
        active = null;
        label.classList.remove('visible');
    });
}

// ── Full-page slider ──────────────────────────────────────────────
function initSlider() {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    if (!slider) return;

    let current = 0;

    function navigateTo(idx) {
        idx = Math.max(0, Math.min(slides.length - 1, idx));
        slider.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
    }

    function updateUI(idx) {
        current = idx;
        const isDark = slides[idx]?.dataset.theme === 'dark';
        document.body.classList.toggle('dark-slide', isDark);
    }

    updateUI(0);

    slider.addEventListener('scroll', () => {
        const idx = Math.round(slider.scrollTop / window.innerHeight);
        if (idx !== current) updateUI(idx);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') navigateTo(current + 1);
        if (e.key === 'ArrowUp'   || e.key === 'PageUp')   navigateTo(current - 1);
    });
}

// ── Bootstrap ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initProjectLabel();
    initSlider();
});