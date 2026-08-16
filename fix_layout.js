const fs = require('fs');

// Fix 1: Fleet portal - always dark outer background so phone shell is visible
let fleetCode = fs.readFileSync('demos/fleet-portal/assets/index-C-STICVX.js', 'utf8');

const old1 = 'className:"min-h-screen bg-bg-base sm:bg-[#070d18] flex justify-center items-center p-0 sm:py-8 sm:px-4 overflow-x-hidden transition-colors duration-300"';
const new1 = 'className:"min-h-screen flex justify-center items-center p-0 sm:py-8 sm:px-4 overflow-x-hidden transition-colors duration-300",style:{background:"#0a0f1e"}';

const count1 = fleetCode.split(old1).length - 1;
console.log('Fleet wrapper occurrences:', count1);
if (count1 === 1) {
  fleetCode = fleetCode.replace(old1, new1);
  fs.writeFileSync('demos/fleet-portal/assets/index-C-STICVX.js', fleetCode, 'utf8');
  console.log('Fleet portal outer background fixed!');
} else {
  // Try to find what's there
  const idx = fleetCode.indexOf('min-h-screen bg-bg-base');
  if (idx !== -1) {
    console.log('Found variant:', fleetCode.substring(idx, idx + 200));
  }
}

// Fix 2: BI Bot header - remove max-w-5xl constraint so logo is truly left-aligned
let biCode = fs.readFileSync('demos/bi-assistant/assets/index-DilAiaWU.js', 'utf8');

const old2 = 'className:"max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3"';
const new2 = 'className:"w-full px-6 h-16 flex items-center justify-between gap-3"';
const count2 = biCode.split(old2).length - 1;
console.log('BI header occurrences:', count2);
if (count2 === 1) {
  biCode = biCode.replace(old2, new2);
  fs.writeFileSync('demos/bi-assistant/assets/index-DilAiaWU.js', biCode, 'utf8');
  console.log('BI Bot header fixed!');
} else {
  const idx = biCode.indexOf('max-w-5xl mx-auto px-4 h-16');
  if (idx !== -1) console.log('Found:', biCode.substring(idx, idx + 100));
  else console.log('NOT FOUND - different format');
}
