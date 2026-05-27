const fs   = require('fs');
const path = require('path');

const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

// Map project folder → HTML file
const projects = [
  { folder: 'projects/project-01', html: 'project-01.html' },
  { folder: 'projects/project-02', html: 'project-02.html' },
  { folder: 'projects/project-03', html: 'project-03.html' },
  { folder: 'projects/project-04', html: 'project-04.html' },
  { folder: 'projects/project-05', html: 'project-05.html' },
];

projects.forEach(({ folder, html }) => {
  if (!fs.existsSync(folder)) return;
  if (!fs.existsSync(html))   return;

  // Get sorted image files
  const images = fs.readdirSync(folder)
    .filter(f => EXTS.includes(path.extname(f).toLowerCase()))
    .sort();

  if (!images.length) return;

  // Build grid rows: first image full-width, rest in pairs
  let grid = '';
  let i = 0;

  while (i < images.length) {
    const src = `${folder}/${images[i]}`;

    if (i === 0) {
      // First image: always full width
      grid += `
                <div class="img-row-full">
                    <div class="img-block">
                        <img src="${src}" alt="">
                    </div>
                </div>`;
      i++;
    } else if (i + 1 < images.length) {
      // Pair: two side by side
      const src2 = `${folder}/${images[i + 1]}`;
      grid += `
                <div class="img-row-half">
                    <div class="img-block"><img src="${src}" alt=""></div>
                    <div class="img-block"><img src="${src2}" alt=""></div>
                </div>`;
      i += 2;
    } else {
      // Leftover single: full width
      grid += `
                <div class="img-row-full">
                    <div class="img-block">
                        <img src="${src}" alt="">
                    </div>
                </div>`;
      i++;
    }
  }

  // Replace everything between the image-grid div tags
  let file = fs.readFileSync(html, 'utf8');
  file = file.replace(
    /(<div class="image-grid">)[\s\S]*?(<\/div>\s*\n\s*<footer)/,
    `$1\n${grid}\n            $2`
  );

  fs.writeFileSync(html, file, 'utf8');
  console.log(`✓ ${html} — ${images.length} image(s)`);
});