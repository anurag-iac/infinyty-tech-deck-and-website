const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const filesToUpdate = [
  'index.html',
  'about.html',
  'services.html',
  'success-stories.html',
  'demos.html',
  'careers.html',
  'contact.html',
  'careers/pmo.html',
  'careers/senior-ml-engineer.html',
  'careers/integration-engineer.html'
];

// SVG pattern in nav-logo
const svgPattern = /<svg viewBox="0 0 40 36" fill="none">[\s\S]*?<\/svg>/g;
const imgReplacement = `<img src="/assets/infinyty-icon.png" alt="Infinyty Icon" class="nav-logo-icon" style="height: 32px; width: auto; object-fit: contain;">`;

filesToUpdate.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace SVG in .nav-logo with image
  if (content.includes('class="nav-logo"')) {
    content = content.replace(
      /<a href="([^"]*)" class="nav-logo">([\s\S]*?)<span class="nav-brandmark-text">/g,
      `<a href="$1" class="nav-logo">\n      ${imgReplacement}\n      <span class="nav-brandmark-text">`
    );
  }

  // Update favicon link
  content = content.replace(
    /<link rel="icon" type="image\/svg\+xml" href="[^"]*">/g,
    `<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">\n  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.png">\n  <link rel="shortcut icon" href="/assets/favicon.ico">\n  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated:', relPath);
});
