const fs = require('fs');

// 1. Rewrite demos/assessment-generator/index.html styling & defaults
let ag = fs.readFileSync('demos/assessment-generator/index.html', 'utf8');

// Replace CSS theme tokens
const agOldTheme = `:root {
      --bg-base: #090d16;
      --bg-surface: rgba(15, 23, 42, 0.85);
      --bg-elevated: #1e293b;
      --bg-input: rgba(15, 23, 42, 0.6);
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #00c6ff;
      --accent-glow: rgba(0, 114, 244, 0.15);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-bright: rgba(0, 114, 244, 0.3);
      --card-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
      --success-brand: #10b981;
      --warning-brand: #f59e0b;
    }

    [data-theme="light"] {
      --bg-base: #f8fafc;
      --bg-surface: #ffffff;
      --bg-elevated: #f1f5f9;
      --bg-input: #ffffff;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #0284c7;
      --accent-glow: rgba(0, 114, 244, 0.08);
      --border-subtle: #e2e8f0;
      --border-bright: rgba(0, 114, 244, 0.25);
      --card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.07);
    }`;

const agNewTheme = `:root {
      --bg-base: #f8fafc;
      --bg-surface: #ffffff;
      --bg-elevated: #f1f5f9;
      --bg-input: #ffffff;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #0284c7;
      --accent-glow: rgba(0, 114, 244, 0.08);
      --border-subtle: #e2e8f0;
      --border-bright: rgba(0, 114, 244, 0.25);
      --card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.07);
      --success-brand: #10b981;
      --warning-brand: #f59e0b;
    }

    [data-theme="dark"] {
      --bg-base: #090d16;
      --bg-surface: rgba(15, 23, 42, 0.85);
      --bg-elevated: #1e293b;
      --bg-input: rgba(15, 23, 42, 0.6);
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #00c6ff;
      --accent-glow: rgba(0, 114, 244, 0.15);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-bright: rgba(0, 114, 244, 0.3);
      --card-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
    }`;

ag = ag.replace(agOldTheme, agNewTheme);

// Fix top-nav and logo selectors in ag
ag = ag.replace(
  `[data-theme="light"] .top-nav {
      background: rgba(255, 255, 255, 0.85);
    }`,
  `[data-theme="dark"] .top-nav {
      background: rgba(9, 13, 22, 0.85);
    }`
);
ag = ag.replace(
  `.nav-logo .logo-dark { display: block; }
    .nav-logo .logo-light { display: none; }
    [data-theme="light"] .nav-logo .logo-dark { display: none; }
    [data-theme="light"] .nav-logo .logo-light { display: block; }`,
  `.nav-logo .logo-dark { display: none; }
    .nav-logo .logo-light { display: block; }
    [data-theme="dark"] .nav-logo .logo-dark { display: block; }
    [data-theme="dark"] .nav-logo .logo-light { display: none; }`
);

// Fix JS toggle function in ag
const agOldToggle = `function toggleTheme() {
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
      
      if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.innerText = '☀️';
        showToast('Dark mode enabled');
      } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.innerText = '🌙';
        showToast('Light mode enabled');
      }
    }`;

const agNewToggle = `function toggleTheme() {
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
      
      if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.innerText = '🌙';
        showToast('Light mode enabled');
      } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.innerText = '☀️';
        showToast('Dark mode enabled');
      }
    }`;

ag = ag.replace(agOldToggle, agNewToggle);
ag = ag.replace(/<body[^>]*>/, '<body data-theme="light">');
ag = ag.replace('<span id="theme-icon">☀️</span>', '<span id="theme-icon">🌙</span>');

fs.writeFileSync('demos/assessment-generator/index.html', ag, 'utf8');

// 2. Rewrite demos/candidate-evaluator/index.html styling & defaults
let ce = fs.readFileSync('demos/candidate-evaluator/index.html', 'utf8');

const ceOldTheme = `:root {
      --bg-base: #090d16;
      --bg-surface: rgba(15, 23, 42, 0.85);
      --bg-elevated: #1e293b;
      --bg-input: rgba(15, 23, 42, 0.6);
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #00c6ff;
      --accent-glow: rgba(0, 114, 244, 0.15);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-bright: rgba(0, 114, 244, 0.3);
      --card-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
      --success-brand: #10b981;
      --warning-brand: #f59e0b;
      --danger-brand: #ef4444;
    }

    [data-theme="light"] {
      --bg-base: #f8fafc;
      --bg-surface: #ffffff;
      --bg-elevated: #f1f5f9;
      --bg-input: #ffffff;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #0284c7;
      --accent-glow: rgba(0, 114, 244, 0.08);
      --border-subtle: #e2e8f0;
      --border-bright: rgba(0, 114, 244, 0.25);
      --card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.07);
    }`;

const ceNewTheme = `:root {
      --bg-base: #f8fafc;
      --bg-surface: #ffffff;
      --bg-elevated: #f1f5f9;
      --bg-input: #ffffff;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #0284c7;
      --accent-glow: rgba(0, 114, 244, 0.08);
      --border-subtle: #e2e8f0;
      --border-bright: rgba(0, 114, 244, 0.25);
      --card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.07);
      --success-brand: #10b981;
      --warning-brand: #f59e0b;
      --danger-brand: #ef4444;
    }

    [data-theme="dark"] {
      --bg-base: #090d16;
      --bg-surface: rgba(15, 23, 42, 0.85);
      --bg-elevated: #1e293b;
      --bg-input: rgba(15, 23, 42, 0.6);
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent-brand: #0072f4;
      --accent-cyan: #00c6ff;
      --accent-glow: rgba(0, 114, 244, 0.15);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-bright: rgba(0, 114, 244, 0.3);
      --card-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
    }`;

ce = ce.replace(ceOldTheme, ceNewTheme);

// Fix top-nav and logo selectors in ce
ce = ce.replace(
  `[data-theme="light"] .top-nav {
      background: rgba(255, 255, 255, 0.85);
    }`,
  `[data-theme="dark"] .top-nav {
      background: rgba(9, 13, 22, 0.85);
    }`
);
ce = ce.replace(
  `.nav-logo .logo-dark { display: block; }
    .nav-logo .logo-light { display: none; }
    [data-theme="light"] .nav-logo .logo-dark { display: none; }
    [data-theme="light"] .nav-logo .logo-light { display: block; }`,
  `.nav-logo .logo-dark { display: none; }
    .nav-logo .logo-light { display: block; }
    [data-theme="dark"] .nav-logo .logo-dark { display: block; }
    [data-theme="dark"] .nav-logo .logo-light { display: none; }`
);

ce = ce.replace(agOldToggle, agNewToggle);
ce = ce.replace(/<body[^>]*>/, '<body data-theme="light">');
ce = ce.replace('<span id="theme-icon">☀️</span>', '<span id="theme-icon">🌙</span>');

fs.writeFileSync('demos/candidate-evaluator/index.html', ce, 'utf8');

console.log('Successfully updated :root CSS tokens to Light Mode default in both demos.');
