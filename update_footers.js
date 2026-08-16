const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const filesToUpdate = [
  'services.html',
  'success-stories.html',
  'demos.html',
  'careers.html',
  'contact.html',
  'careers/pmo.html',
  'careers/senior-ml-engineer.html',
  'careers/integration-engineer.html'
];

filesToUpdate.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Update footer brand
  content = content.replace(
    /<div class="footer-brand">\s*<h3>Infinyty<\/h3>\s*<p>Driving Excellence with Data &amp; AI\. Formerly Infinity Analytics Consulting\.<\/p>\s*<\/div>/g,
    `<div class="footer-brand">\n        <a href="/" class="nav-logo" style="margin-bottom:0.75rem;">\n          <img src="/assets/infinyty-lockup-light.png" alt="Infinyty" class="nav-logo-img logo-light" style="height:28px;">\n          <img src="/assets/infinyty-lockup-dark.png" alt="Infinyty" class="nav-logo-img logo-dark" style="height:28px;">\n        </a>\n        <p>Driving Excellence with Data &amp; AI. Formerly Infinity Analytics Consulting.</p>\n      </div>`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated footer brand in:', relPath);
});
