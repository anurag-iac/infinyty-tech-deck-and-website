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

filesToUpdate.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace existing nav-logo contents with light and dark lockups
  content = content.replace(
    /<a href="([^"]*)" class="nav-logo">[\s\S]*?<\/a>/g,
    `<a href="$1" class="nav-logo">\n      <img src="/assets/infinyty-lockup-light.png" alt="Infinyty" class="nav-logo-img logo-light">\n      <img src="/assets/infinyty-lockup-dark.png" alt="Infinyty" class="nav-logo-img logo-dark">\n    </a>`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated logo lockup in:', relPath);
});
