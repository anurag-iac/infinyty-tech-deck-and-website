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
      if (file.endsWith('.html')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const htmlFiles = getAllFiles(rootDir);

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Deck bottom bar
  content = content.replace(
    /class="pitch-brand-group">&copy; infinyty<\/a>/g,
    'class="pitch-brand-group">&copy; Infinyty Tech Global Solutions Pvt. Ltd.</a>'
  );

  // Footer legal entity name
  content = content.replace(
    /Powered by Infinyty Global Solutions Pvt\. Ltd\./g,
    'Powered by Infinyty Tech Global Solutions Pvt. Ltd.'
  );
  content = content.replace(
    /Powered by Infinyty Global Services Pvt\. Ltd\./g,
    'Powered by Infinyty Tech Global Solutions Pvt. Ltd.'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated legal entity name in:', path.relative(rootDir, filePath));
  }
});
