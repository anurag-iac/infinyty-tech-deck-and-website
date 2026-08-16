const fs = require('fs');

let content = fs.readFileSync('demos.html', 'utf8');

// Replace Prototype 02 (Assessment Generator) video block with desktop shell image block
const p2Old = `<div class="demo-desktop-shell" style="flex: 1; min-width: 280px; max-width: 540px; margin: 0;">
        <video controls poster="assets/form-generator-poster.svg" style="background: #000; position: relative; z-index: 1; width: 100%;">
          <source src="assets/form-generator-demo.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="demo-launch-overlay">
          <a href="/demos/assessment-generator/index.html" target="_blank" class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Launch Demo
          </a>
        </div>
      </div>`;

const p2New = `<div class="demo-desktop-shell" onclick="window.open('/demos/assessment-generator/index.html','_blank')" title="Click to open demo">
        <img src="assets/assessment-generator-real.png" alt="Assessment Generator Screenshot" loading="lazy">
        <div class="demo-launch-overlay">
          <span class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Launch Demo
          </span>
        </div>
      </div>`;

// Replace Prototype 03 (Candidate Evaluator) video block with desktop shell image block
const p3Old = `<div class="demo-desktop-shell" style="flex: 1; min-width: 280px; max-width: 540px; margin: 0;">
        <video controls poster="assets/report-generator-poster.svg" style="background: #000; position: relative; z-index: 1; width: 100%;">
          <source src="assets/report-generator-demo.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="demo-launch-overlay">
          <a href="/demos/candidate-evaluator/index.html" target="_blank" class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Launch Demo
          </a>
        </div>
      </div>`;

const p3New = `<div class="demo-desktop-shell" onclick="window.open('/demos/candidate-evaluator/index.html','_blank')" title="Click to open demo">
        <img src="assets/candidate-evaluator-real.png" alt="Candidate Evaluator Screenshot" loading="lazy">
        <div class="demo-launch-overlay">
          <span class="demo-launch-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Launch Demo
          </span>
        </div>
      </div>`;

content = content.replace(p2Old, p2New);
content = content.replace(p3Old, p3New);

fs.writeFileSync('demos.html', content, 'utf8');
console.log('demos.html updated successfully.');
