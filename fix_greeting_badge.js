const fs = require('fs');

let code = fs.readFileSync('demos/fleet-portal/assets/index-C-STICVX.js', 'utf8');

// Ensure the greeting & current week badge shrink-wrap cleanly
code = code.replace(
  'l.jsxs("div",{className:"flex justify-between items-start text-left",children:[l.jsxs("div",{children:[l.jsxs("h2",{className:"text-xl font-black text-text-primary"',
  'l.jsxs("div",{className:"flex justify-between items-center text-left gap-2",children:[l.jsxs("div",{className:"flex-1 min-w-0",children:[l.jsxs("h2",{className:"text-lg font-black text-text-primary truncate"'
);

// Ensure the Current Week badge has shrink-0 and clean padding
code = code.replace(
  'className:"bg-bg-surface border border-border-subtle rounded-lg px-2.5 py-1.5 text-right font-mono"',
  'className:"bg-bg-surface border border-border-subtle rounded-lg px-2 py-1 text-right font-mono shrink-0"'
);

fs.writeFileSync('demos/fleet-portal/assets/index-C-STICVX.js', code, 'utf8');
console.log('Refined greeting & current week header layout in fleet-portal.');
