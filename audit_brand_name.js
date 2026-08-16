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
console.log('Searching in', files.length, 'files');

const occurrences = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const relPath = path.relative(rootDir, f);
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('Infinyty') || line.includes('infinyty') || line.includes('INFINYTY')) {
      occurrences.push({ file: relPath, lineNum: idx + 1, line: line.trim() });
    }
  });
});

console.log(`Found ${occurrences.length} occurrences:`);
occurrences.forEach(o => console.log(`${o.file}:${o.lineNum}: ${o.line}`));
