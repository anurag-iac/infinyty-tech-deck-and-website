const fs = require('fs');

// 1. Update assessment generator to default to light mode
let ag = fs.readFileSync('demos/assessment-generator/index.html', 'utf8');
ag = ag.replace('<body data-theme="dark">', '<body data-theme="light">');
ag = ag.replace('<span id="theme-icon">☀️</span>', '<span id="theme-icon">🌙</span>');
fs.writeFileSync('demos/assessment-generator/index.html', ag, 'utf8');

// 2. Update candidate evaluator to default to light mode
let ce = fs.readFileSync('demos/candidate-evaluator/index.html', 'utf8');
ce = ce.replace('<body data-theme="dark">', '<body data-theme="light">');
ce = ce.replace('<span id="theme-icon">☀️</span>', '<span id="theme-icon">🌙</span>');
fs.writeFileSync('demos/candidate-evaluator/index.html', ce, 'utf8');

// 3. Update demos.html to remove the non-hover play badge
let demos = fs.readFileSync('demos.html', 'utf8');
demos = demos.replace(/<div class="play-badge-center"[\s\S]*?<\/div>/g, '');
demos = demos.replace(/\.play-badge-center[\s\S]*?}/g, '');
fs.writeFileSync('demos.html', demos, 'utf8');

console.log('Set default light theme for demos and cleaned thumbnail badges in demos.html.');
