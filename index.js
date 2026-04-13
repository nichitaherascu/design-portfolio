// ─────────────────────────────────────────────────────────────────
//  index.js — index.html only
// ─────────────────────────────────────────────────────────────────


// ── Square expand to fullscreen, then navigate ────────────────────

document.addEventListener('DOMContentLoaded', () => {
const entry  = document.getElementById('entry');
const square = document.getElementById('square');
const label  = document.getElementById('entry-label');
const hint   = document.getElementById('hint');
if (!entry || !square) return;

entry.addEventListener('click', () => {

    // 1. Fade out the text immediately
    [label, hint].forEach(el => {
        if (el) el.style.opacity = '0';
    });

    // 2. Calculate the scale needed to cover the full viewport
    //    Uses the viewport diagonal so every corner is covered
    const diagonal = Math.sqrt(
        Math.pow(window.innerWidth,  2) +
        Math.pow(window.innerHeight, 2)
    );
    const scale = Math.ceil(diagonal / 120) + 2; // 120 = square CSS width

    // 3. Override hover transition with the expansion transition
    square.style.transition = 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)';
    square.style.transform  = `scale(${scale})`;

    // 4. Navigate once the square has filled the screen
    //    home.html has black bg so the cut is invisible
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 800);
});
});