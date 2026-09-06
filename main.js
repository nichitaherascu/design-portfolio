// ─────────────────────────────────────────────────────────────────
//  main.js — shared across all pages
// ─────────────────────────────────────────────────────────────────

// ── Page transitions ──────────────────────────────────────────────
function initTransitions() {

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    document.addEventListener('click', e => {
        // Never hijack overlay controls
        if (e.target.closest('[data-no-transition]')) return;

        const a = e.target.closest('a[href]');
        if (!a) return;
        if (a.target === '_blank') return;
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#'))       return;
        if (href.startsWith('mailto:')) return;
        if (a.closest('#entry'))        return;

        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = a.href; }, 320);
    });
}

// ── Custom cursor ─────────────────────────────────────────────────
//  Delegated via mouseover/mouseout (these bubble, unlike
//  mouseenter/mouseleave) so it works for elements added or
//  revealed after load, and never gets stuck.
function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const HOVER = 'a[href], button, [data-hover]';

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });

    document.addEventListener('mouseover', e => {
        if (e.target.closest(HOVER)) cursor.classList.add('hovered');
    });

    document.addEventListener('mouseout', e => {
        if (e.target.closest(HOVER)) cursor.classList.remove('hovered');
    });

    // Safety net — if a hoverable disappears under the cursor,
    // re-test what's actually there each frame the mouse moves.
    document.addEventListener('mousemove', e => {
        const under = document.elementFromPoint(e.clientX, e.clientY);
        const on = under && under.closest(HOVER);
        cursor.classList.toggle('hovered', !!on);
    });
}

// ── Staggered entrance animation ──────────────────────────────────
function initEntrance() {
    document.querySelectorAll('[data-anim]').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), 60 + i * 85);
    });
}

// ── Bootstrap ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTransitions();
    initCursor();
    initEntrance();
});