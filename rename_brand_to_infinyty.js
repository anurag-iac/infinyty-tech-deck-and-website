const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file.startsWith('.temp')) return;
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(rootDir);
console.log(`Processing ${files.length} files...`);

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Titles & Metadata
  content = content.replace(/Infinyty Global Solutions/g, 'Infinyty Global Solutions');
  content = content.replace(/Infinyty Global Services/g, 'Infinyty Global Services');
  content = content.replace(/Infinyty/g, 'Infinyty');
  content = content.replace(/infinyty/g, 'infinyty');
  content = content.replace(/INFINYTY/g, 'INFINYTY');

  // 2. Footer copyright
  content = content.replace(/&copy; 2026 Infinyty\.tech/g, '&copy; 2026 Infinyty');

  // 3. Alt tags
  content = content.replace(/alt="Infinyty Logo"/g, 'alt="Infinyty Logo"');
  content = content.replace(/alt="Infinyty Icon"/g, 'alt="Infinyty Icon"');
  content = content.replace(/alt="Infinyty"/g, 'alt="Infinyty"');

  // 4. In pitch deck bottom bar
  content = content.replace(/class="pitch-brand-group">infinyty\.tech<\/a>/g, 'class="pitch-brand-group">infinyty</a>');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', path.relative(rootDir, filePath));
  }
});
console.log('Finished updating brand name to Infinyty.');
