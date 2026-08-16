const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// Update buttons to use Space Grotesk
css = css.replace(/button,\s*input,\s*select,\s*textarea\s*\{\s*font-family:\s*'Inter',\s*sans-serif\s*!important;/g, "input, select, textarea { font-family: 'Inter', sans-serif !important;");
css = css.replace(/\.btn-primary\s*\{([^}]+)\}/, ".btn-primary {$1 font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.01em;}");
css = css.replace(/\.btn-secondary\s*\{([^}]+)\}/, ".btn-secondary {$1 font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.01em;}");

// Ensure badges and taglines have Space Grotesk
css = css.replace(/\.tagline\s*\{/, ".tagline { font-family: 'Space Grotesk', sans-serif;");
css = css.replace(/\.badge\s*\{/, ".badge { font-family: 'Space Grotesk', sans-serif;");

if (!css.includes('stat-num')) {
    css += "\n.stat-num { font-family: 'Space Grotesk', sans-serif; font-weight: 800; letter-spacing: -0.02em; }";
}

fs.writeFileSync('style.css', css);
console.log('updated style.css');
