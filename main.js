// ── THEME INIT (runs before DOM paint to prevent flash) ──
// This is handled in <head> inline script per page.
// main.js only handles the toggle button.

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ── STICKY HEADER SHADOW ──
const headerEl = document.querySelector('header');
if (headerEl) {
  window.addEventListener('scroll', () => {
    headerEl.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    })
  );
}

// ── ACTIVE NAV LINK ──
const getCleanPath = (urlStr) => {
  try {
    const u = new URL(urlStr, window.location.origin);
    let p = u.pathname.toLowerCase().replace(/\/$/, '');
    if (p.endsWith('.html')) p = p.slice(0, -5);
    return p === '' ? '/index' : p;
  } catch (e) {
    return '';
  }
};

const currentCleanPath = getCleanPath(window.location.href);
document.querySelectorAll('.nav-links a:not(.btn-primary):not(.btn-secondary), .mobile-menu a:not(.btn-primary):not(.btn-secondary)').forEach(a => {
  const targetCleanPath = getCleanPath(a.href);
  if (currentCleanPath === targetCleanPath || (targetCleanPath !== '/index' && currentCleanPath.startsWith(targetCleanPath + '/'))) {
    a.classList.add('active');
  }
});

// ── UNIFIED THEME TOGGLE & SYNC ──
const themeToggle = document.getElementById('theme-toggle');

function applyThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark-mode');
  document.querySelectorAll('.sun-icon').forEach(el => el.style.display = isDark ? 'block' : 'none');
  document.querySelectorAll('.moon-icon').forEach(el => el.style.display = isDark ? 'none' : 'block');
}

function syncTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    if (document.body) document.body.classList.remove('light-theme');
  } else {
    document.documentElement.classList.remove('dark-mode');
    if (document.body) document.body.classList.add('light-theme');
  }
  localStorage.setItem('theme', theme);
  localStorage.setItem('infinyty_theme', theme);
  localStorage.setItem('pitch_theme', theme);
  applyThemeIcons();
}

// Initial sync
const initialTheme = localStorage.getItem('theme') || localStorage.getItem('infinyty_theme') || localStorage.getItem('pitch_theme');
if (initialTheme) {
  syncTheme(initialTheme);
} else {
  applyThemeIcons();
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    syncTheme(isDark ? 'light' : 'dark');
  });
}

// Storage event listener for real-time tab synchronization
window.addEventListener('storage', (e) => {
  if (e.key === 'theme' || e.key === 'infinyty_theme' || e.key === 'pitch_theme') {
    if (e.newValue) syncTheme(e.newValue);
  }
});

// ── CARD ENTRANCE ANIMATIONS (IntersectionObserver) ──
const animatables = document.querySelectorAll('.card, .team-card, .contact-card');
if ('IntersectionObserver' in window && animatables.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx % 3) * 80 + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animatables.forEach(el => observer.observe(el));
} else {
  animatables.forEach(el => el.classList.add('visible'));
}

// ── METRIC COUNTER ANIMATION ──
const counters = document.querySelectorAll('.metric-counter');
if ('IntersectionObserver' in window && counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetStr = el.getAttribute('data-count');
        if (!targetStr) return;

        const numMatch = targetStr.match(/([\d\.]+)/);
        if (numMatch) {
          const targetNum = parseFloat(numMatch[1]);
          const isDecimal = numMatch[1].includes('.');
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = (targetNum * easeProgress).toFixed(isDecimal ? 1 : 0);

            el.textContent = targetStr.replace(numMatch[1], currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = targetStr;
            }
          };
          requestAnimationFrame(animate);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => counterObserver.observe(c));
}
