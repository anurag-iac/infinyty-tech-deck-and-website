// ── THEME INIT (runs before DOM paint to prevent flash) ──
// Handled in <head> inline script per page.
// main.js handles the interactive toggle and cross-tab storage sync.

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

// ── MOBILE MENU (with outside-click dismiss and ARIA sync) ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    })
  );

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open')) {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
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
  localStorage.setItem('deck-theme', theme);
  applyThemeIcons();
}

// Initial sync
const initialTheme = localStorage.getItem('theme') || localStorage.getItem('infinyty_theme') || localStorage.getItem('pitch_theme') || localStorage.getItem('deck-theme');
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
  if (e.key === 'theme' || e.key === 'infinyty_theme' || e.key === 'pitch_theme' || e.key === 'deck-theme') {
    if (e.newValue) syncTheme(e.newValue);
  }
});

// ── CARD ENTRANCE & TILE POP ANIMATIONS (IntersectionObserver) ──
const animatables = document.querySelectorAll('.card, .team-card, .contact-card, .job-card, .roadmap-step-card, .service-card, .deck-model-card, .stats-pedigree-card, .hero-stat-card, .why-matrix-table');
if ('IntersectionObserver' in window && animatables.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx >= 0 ? (idx % 4) * 75 : 0) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  animatables.forEach(el => observer.observe(el));
} else {
  animatables.forEach(el => el.classList.add('visible'));
}

// ── MOUSE SPOTLIGHT GLOW ON TILES & CARDS ──
document.querySelectorAll('.card, .team-card, .contact-card, .job-card, .roadmap-step-card, .service-card, .deck-model-card, .stats-pedigree-card, .hero-stat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, { passive: true });
});

// ── METRIC COUNTER ANIMATION ──
const counters = document.querySelectorAll('.metric-counter, [data-count]');
if ('IntersectionObserver' in window && counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetStr = el.getAttribute('data-count') || el.textContent.trim();
        if (!targetStr) return;

        // Find all number sequences (integers and decimals)
        const matches = [...targetStr.matchAll(/(\d+(?:\.\d+)?)/g)];
        if (matches.length > 0) {
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            let newText = targetStr;
            for (let i = matches.length - 1; i >= 0; i--) {
              const m = matches[i];
              const targetNum = parseFloat(m[0]);
              const isDecimal = m[0].includes('.');
              const currentVal = (targetNum * easeProgress).toFixed(isDecimal ? 1 : 0);
              const idx = m.index;
              newText = newText.slice(0, idx) + currentVal + newText.slice(idx + m[0].length);
            }

            el.textContent = newText;

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
  }, { threshold: 0.15 });

  counters.forEach(c => counterObserver.observe(c));
}

// ── GLOBAL VIDEO MODAL CONTROLLERS & KEYBOARD LISTENERS ──
function openVideoModal(videoSrc, title) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideoPlayer');
  const source = document.getElementById('modalVideoSource');
  const titleElem = document.getElementById('videoModalTitle');
  if (!modal || !video) return;

  if (source) {
    source.src = videoSrc;
    source.type = videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4';
  }
  video.src = videoSrc;
  video.load();

  if (title && titleElem) {
    titleElem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg> ' + title;
  }
  modal.classList.add('active');
  video.play().catch(() => {});
}

function closeVideoModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.video-modal-close')) return;
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideoPlayer');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  if (modal) modal.classList.remove('active');
}

// Close modals or mobile menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVideoModal();
    const mm = document.getElementById('mobile-menu');
    const hb = document.getElementById('hamburger');
    if (mm && mm.classList.contains('open')) {
      mm.classList.remove('open');
      if (hb) {
        hb.classList.remove('open');
        hb.setAttribute('aria-expanded', 'false');
      }
    }
  }
});

// ── MAGNETIC BUTTON HOVER EFFECT (3.6) ──
const magneticButtons = document.querySelectorAll('.btn-primary, .book-meeting-btn, .demo-launch-btn, .btn-secondary, .nav-deck-pill, .filter-pill');
magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── SUCCESS STORIES & SERVICES INTERACTIVE FILTERING (3.8) ──
const filterPills = document.querySelectorAll('.filter-pill');
const caseCards = document.querySelectorAll('.case-bento-card');
if (filterPills.length > 0 && caseCards.length > 0) {
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filterCat = (pill.getAttribute('data-filter') || 'all').toLowerCase();

      caseCards.forEach((card, idx) => {
        const text = (card.textContent || '').toLowerCase();
        const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
        const matches = filterCat === 'all' || cardCat.includes(filterCat) || text.includes(filterCat);

        if (matches) {
          card.style.display = 'flex';
          card.style.transitionDelay = (idx % 3) * 60 + 'ms';
          setTimeout(() => {
            card.classList.remove('filtering-out');
            card.classList.add('visible');
          }, 15);
        } else {
          card.classList.add('filtering-out');
          setTimeout(() => {
            card.style.display = 'none';
          }, 240);
        }
      });
    });
  });
}

// ── FLOATING BACK TO TOP BUTTON (4.9) ──
let bttBtn = document.getElementById('back-to-top');
if (!bttBtn) {
  bttBtn = document.createElement('button');
  bttBtn.id = 'back-to-top';
  bttBtn.setAttribute('aria-label', 'Scroll Back to Top');
  bttBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  document.body.appendChild(bttBtn);
}
window.addEventListener('scroll', () => {
  bttBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
bttBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


