// ─────────────────────────────────────────────────────────────────
//  index.js — index.html only
// ─────────────────────────────────────────────────────────────────

// ── Projects overlay ──────────────────────────────────────────────
function initProjectsOverlay() {
    const overlay  = document.getElementById('proj-overlay');
    const openBtn  = document.getElementById('proj-open');
    const closeBtn = document.getElementById('proj-close');
    const preview  = document.getElementById('po-preview');

    if (!overlay || !openBtn) {
        console.warn('[index.js] overlay:', !!overlay, 'openBtn:', !!openBtn);
        return;
    }

    function open(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        overlay.classList.add('open');
    }

    function close(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        overlay.classList.remove('open', 'dim');
        if (preview) preview.classList.remove('show');
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', e => {
        if (e.target === overlay) close(e);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });

    // Random preview position — avoids the centre band where names sit
    function randomSpot() {
        const zones = [
            { x: [4, 22],  y: [10, 34] },
            { x: [70, 88], y: [10, 34] },
            { x: [4, 22],  y: [56, 76] },
            { x: [70, 88], y: [56, 76] },
            { x: [8, 26],  y: [36, 54] },
            { x: [66, 84], y: [36, 54] }
        ];
        const z = zones[Math.floor(Math.random() * zones.length)];
        const rand = ([a, b]) => a + Math.random() * (b - a);
        return { left: rand(z.x), top: rand(z.y), rot: -8 + Math.random() * 16 };
    }

    if (preview) {
        overlay.querySelectorAll('.po-list a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                const p = randomSpot();
                preview.style.left = p.left + '%';
                preview.style.top  = p.top  + '%';
                preview.style.transform = `rotate(${p.rot}deg) scale(1)`;

                const img = link.dataset.img;
                preview.style.backgroundImage = img ? `url('${img}')` : 'none';

                overlay.classList.add('dim');
                preview.classList.add('show');
            });

            link.addEventListener('mouseleave', () => {
                overlay.classList.remove('dim');
                preview.classList.remove('show');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectsOverlay();
});