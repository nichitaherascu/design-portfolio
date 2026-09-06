js // ───────────────────────────────────────────────────────────────── // index.js — index.html only // ─────────────────────────────────────────────────────────────────

// ── Home photo parallax (rAF lerp) ──────────────────────────────── function initParallax() { const el = document.getElementById('home-bg'); if (!el) return;

let tx = 0, ty = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => { tx = (e.clientX / window.innerWidth - .5) * 24; ty = (e.clientY / window.innerHeight - .5) * 16; });

(function loop() { cx += (tx - cx) * .07; cy += (ty - cy) * .07; el.style.transform = translate(${cx}px, ${cy}px) scale(1.06); requestAnimationFrame(loop); })(); }

// ── Projects overlay ────────────────────────────────────────────── function initProjectsOverlay() { const overlay = document.getElementById('proj-overlay'); const openBtn = document.getElementById('proj-open'); const closeBtn = document.getElementById('proj-close'); const preview = document.getElementById('po-preview');

if (!overlay || !openBtn) { console.warn('[index.js] overlay:', !!overlay, 'openBtn:', !!openBtn); return; }

function open(e) { if (e) { e.preventDefault(); e.stopPropagation(); } overlay.classList.add('open'); }

function close(e) { if (e) { e.preventDefault(); e.stopPropagation(); } overlay.classList.remove('open', 'dim'); if (preview) preview.classList.remove('show'); }

openBtn.addEventListener('click', open); if (closeBtn) closeBtn.addEventListener('click', close);

overlay.addEventListener('click', e => { if (e.target === overlay) close(e); });

document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

// Random preview position — avoids the centre band where the names sit function randomSpot() { const zones = [ { x: [4, 22], y: [10, 34] }, // top left { x: [70, 88], y: [10, 34] }, // top right { x: [4, 22], y: [56, 76] }, // bottom left { x: [70, 88], y: [56, 76] }, // bottom right { x: [8, 26], y: [36, 54] }, // mid left { x: [66, 84], y: [36, 54] } // mid right ]; const z = zones[Math.floor(Math.random() * zones.length)]; const rand = ([a, b]) => a + Math.random() * (b - a); return { left: rand(z.x), top: rand(z.y), rot: -8 + Math.random() * 16 }; }

if (preview) { overlay.querySelectorAll('.po-list a').forEach(link => { link.addEventListener('mouseenter', () => { const p = randomSpot(); preview.style.left = p.left + '%'; preview.style.top = p.top + '%'; preview.style.transform = rotate(${p.rot}deg) scale(1);

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
} }

document.addEventListener('DOMContentLoaded', () => { initParallax(); initProjectsOverlay(); });

