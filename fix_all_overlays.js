const fs = require('fs');

let content = fs.readFileSync('demos.html', 'utf8');

// Fix Prototype 01 BI Bot launch overlay
content = content.replace(
  /<div class="demo-desktop-shell" onclick="window\.open\('\/demos\/bi-assistant\/index\.html','_blank'\)" title="Click to open demo">\s*<img src="assets\/bi-assistant-real\.png" alt="BI Bot Screenshot" loading="lazy">\s*<div class="demo-launch-overlay">[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="demo-desktop-shell" title="BI Bot Demo">
        <img src="assets/bi-assistant-real.png" alt="BI Bot Screenshot" loading="lazy">
        <div class="demo-launch-overlay">
          <a href="/demos/bi-assistant/" target="_blank" class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open Live Demo
          </a>
        </div>
      </div>`
);

// Fix Prototype 04 Fleet Portal launch overlay
content = content.replace(
  /<div class="demo-phone-shell" onclick="window\.open\('\/demos\/fleet-portal\/index\.html','_blank'\)" title="Click to open demo">\s*<img src="assets\/fleet-portal-real\.png" alt="Fleet Settlement App Screenshot" loading="lazy">\s*<div class="demo-launch-overlay">[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="demo-phone-shell" title="Fleet Settlement App Demo">
        <img src="assets/fleet-portal-real.png" alt="Fleet Settlement App Screenshot" loading="lazy">
        <div class="demo-launch-overlay">
          <a href="/demos/fleet-portal/" target="_blank" class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open Live Demo
          </a>
        </div>
      </div>`
);

// Fix Prototype 05 Operations Portal launch overlay
content = content.replace(
  /<div class="demo-desktop-shell" onclick="window\.open\('\/demos\/operations-portal\/index\.html','_blank'\)" title="Click to open demo">\s*<img src="assets\/ops-portal-real\.png" alt="Fleet Operations Portal Screenshot" loading="lazy">\s*<div class="demo-launch-overlay">[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="demo-desktop-shell" title="Fleet Operations Portal Demo">
        <img src="assets/ops-portal-real.png" alt="Fleet Operations Portal Screenshot" loading="lazy">
        <div class="demo-launch-overlay">
          <a href="/demos/operations-portal/" target="_blank" class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open Live Demo
          </a>
        </div>
      </div>`
);

// Also remove any onclick handler on the container div of Prototypes 02 and 03
content = content.replace(
  'onclick="window.open(\'/demos/assessment-generator/\',\'_blank\')"',
  ''
);
content = content.replace(
  'onclick="window.open(\'/demos/candidate-evaluator/\',\'_blank\')"',
  ''
);

fs.writeFileSync('demos.html', content, 'utf8');
console.log('Fixed all prototype overlays to be 100% clickable with direct <a> and <button> actions.');
