// ─────────────────────────────────────────────────────────────────
//  index.js — index.html only
// ─────────────────────────────────────────────────────────────────

// ── Home photo parallax (rAF lerp) ────────────────────────────────
//  Subtle mouse-follow drift on the hero image.
//  scale(1.06) is required — the photo must be slightly oversized
//  so the drift never exposes white edges.
//  For a completely static photo: remove the initParallax() call
//  in the bootstrap block at the bottom.
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
        // Toggle dark/light nav + cursor based on slide theme
        const isDark = slides[idx]?.dataset.theme === 'dark';
        document.body.classList.toggle('dark-slide', isDark);
    }

    // Set correct theme immediately on load (home slide is light)
    updateUI(0);

    slider.addEventListener('scroll', () => {
        const idx = Math.round(slider.scrollTop / window.innerHeight);
        if (idx !== current) updateUI(idx);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') navigateTo(current + 1);
        if (e.key === 'ArrowUp'   || e.key === 'PageUp')   navigateTo(current - 1);
    });

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
    initParallax();
    initSlider();
});