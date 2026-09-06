// ─────────────────────────────────────────────────────────────────
//  index.js — index.html only
// ─────────────────────────────────────────────────────────────────

(function () {
    function init() {
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

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) close(e);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });

        if (preview) {
            const zones = [
                [4, 22, 10, 34], [70, 88, 10, 34],
                [4, 22, 56, 76], [70, 88, 56, 76],
                [8, 26, 36, 54], [66, 84, 36, 54]
            ];
            overlay.querySelectorAll('.po-list a').forEach(function (link) {
                link.addEventListener('mouseenter', function () {
                    const z = zones[Math.floor(Math.random() * zones.length)];
                    preview.style.left = (z[0] + Math.random() * (z[1] - z[0])) + '%';
                    preview.style.top  = (z[2] + Math.random() * (z[3] - z[2])) + '%';
                    preview.style.transform = 'rotate(' + (-8 + Math.random() * 16) + 'deg)';
                    const img = link.getAttribute('data-img');
                    preview.style.backgroundImage = img ? "url('" + img + "')" : 'none';
                    overlay.classList.add('dim');
                    preview.classList.add('show');
                });
                link.addEventListener('mouseleave', function () {
                    overlay.classList.remove('dim');
                    preview.classList.remove('show');
                });
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();