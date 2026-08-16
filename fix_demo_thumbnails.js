const fs = require('fs');

let content = fs.readFileSync('demos.html', 'utf8');

// Replace Assessment Generator (Prototype 02) video player with live screenshot image
const p2Regex = /<div class="demo-desktop-shell"[^>]*>\s*<video[^>]*>[\s\S]*?<\/video>\s*<div class="demo-launch-overlay">[\s\S]*?<\/div>\s*<\/div>/;

const p2Replacement = `<div class="demo-desktop-shell" onclick="window.open('/demos/assessment-generator/','_blank')" title="Click to open demo">
        <img src="assets/assessment-generator-real.png" alt="Assessment Generator Screenshot" loading="lazy">
        <div class="demo-launch-overlay">
          <span class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Launch Demo
          </span>
        </div>
      </div>`;

// Replace Candidate Evaluator (Prototype 03) video player with live screenshot image
const p3Replacement = `<div class="demo-desktop-shell" onclick="window.open('/demos/candidate-evaluator/','_blank')" title="Click to open demo">
        <img src="assets/candidate-evaluator-real.png" alt="Candidate Evaluator Screenshot" loading="lazy">
        <div class="demo-launch-overlay">
          <span class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Launch Demo
          </span>
        </div>
      </div>`;

// Replace first video shell (Assessment Generator)
content = content.replace(p2Regex, p2Replacement);

// Replace second video shell (Candidate Evaluator)
content = content.replace(p2Regex, p3Replacement);

fs.writeFileSync('demos.html', content, 'utf8');
console.log('Replaced video tags with live screenshot desktop shells in demos.html.');
