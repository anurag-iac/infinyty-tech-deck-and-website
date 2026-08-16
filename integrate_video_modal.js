const fs = require('fs');

let content = fs.readFileSync('demos.html', 'utf8');

// 1. Add Video Modal CSS
const modalCSS = `
    /* ── VIDEO MODAL STYLES ── */
    .video-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    .video-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .video-modal-container {
      width: 100%;
      max-width: 900px;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.8);
      transform: scale(0.95);
      transition: transform 0.3s ease;
    }
    .video-modal-overlay.active .video-modal-container {
      transform: scale(1);
    }
    .video-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.95);
    }
    .video-modal-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .video-modal-close {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.25rem;
      line-height: 1;
      transition: all 0.2s;
    }
    .video-modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }
    .video-modal-body {
      padding: 0;
      background: #000;
    }

    /* Dual Action Overlay Buttons */
    .demo-action-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      justify-content: center;
      align-items: center;
    }
    .demo-action-btn-video {
      background: rgba(0, 0, 0, 0.75);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.65rem 1.15rem;
      border-radius: 50px;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .demo-action-btn-video:hover {
      background: #0072F4;
      border-color: #0072F4;
      transform: scale(1.05);
    }
    .demo-action-btn-live {
      background: #0072F4;
      color: #fff;
      border: none;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.65rem 1.15rem;
      border-radius: 50px;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 114, 244, 0.4);
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .demo-action-btn-live:hover {
      background: #005ecb;
      transform: scale(1.05);
    }

    .play-badge-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(0, 114, 244, 0.9);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 25px rgba(0, 114, 244, 0.5);
      transition: transform 0.3s ease, background 0.3s ease;
    }
    .demo-desktop-shell:hover .play-badge-center {
      transform: translate(-50%, -50%) scale(1.1);
      background: #0072F4;
    }
`;

content = content.replace('</style>', `${modalCSS}\n  </style>`);

// 2. Replace Prototype 02 (Assessment Generator) markup
const p2OldRegex = /<!-- PROTOTYPE 02: ASSESSMENT GENERATOR -->[\s\S]*?<!-- PROTOTYPE 03: CANDIDATE EVALUATOR -->/;

const p2NewSection = `<!-- PROTOTYPE 02: ASSESSMENT GENERATOR -->
    <div style="margin-bottom: 2.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; padding-top: 2rem;">
      <span class="case-meta" style="margin-bottom: 0.5rem; display: inline-block;">Featured Prototype &mdash; 02</span>
      <h2 class="case-title" style="font-size: 2.2rem; margin-bottom: 0.5rem;">Assessment Generator</h2>
      <p style="font-size: 1.05rem; color: var(--text-muted); font-weight: 500; margin: 0;">Automated Candidate Questionnaire Builder &amp; Forms Integration</p>
    </div>

    <div class="demo-showcase-row">
      <div class="demo-desktop-shell" style="flex: 1; min-width: 280px; max-width: 540px; margin: 0;" title="Assessment Generator Demo">
        <img src="assets/assessment-generator-real.png" alt="Assessment Generator Screenshot" loading="lazy">
        <div class="play-badge-center" onclick="openVideoModal('assets/form-generator-demo.mp4', 'Assessment Generator &mdash; Walkthrough Video')" title="Watch Video Walkthrough">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </div>
        <div class="demo-launch-overlay">
          <div class="demo-action-buttons">
            <button type="button" class="demo-action-btn-video" onclick="event.stopPropagation(); openVideoModal('assets/form-generator-demo.mp4', 'Assessment Generator &mdash; Walkthrough Video')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              Watch Video
            </button>
            <a href="/demos/assessment-generator/" target="_blank" class="demo-action-btn-live" onclick="event.stopPropagation();">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Open Live Demo
            </a>
          </div>
        </div>
      </div>

      <div style="flex: 1; min-width: 280px; max-width: 520px; display: flex; flex-direction: column; gap: 1.75rem;">
        <div>
          <div class="case-subtitle" style="margin-top: 0; margin-bottom: 0.5rem;">Challenge</div>
          <p style="font-size: 0.93rem; color: var(--text-muted); line-height: 1.65; margin: 0;">HR and recruiting teams spent hours manually drafting evaluation questions for diverse job roles and copy-pasting them into forms, leading to inconsistent candidate assessments.</p>
        </div>
        <div>
          <div class="case-subtitle" style="margin-top: 0; margin-bottom: 0.5rem;">Solution</div>
          <p style="font-size: 0.93rem; color: var(--text-muted); line-height: 1.65; margin: 0;">Built a Python-based web application (hosted on Render) that uses AI to analyze Job Descriptions and cultural values, tailors relevant evaluation questions, and programmatically deploys a fully functional Google Form.</p>
        </div>
        <div class="case-impact" style="margin-top: 0;">
          <div class="impact-title">Business Impact</div>
          <p class="impact-desc" style="margin: 0;">Cut assessment creation time from hours to seconds, automated 100% of Google Form deployment, and ensured consistent, role-specific evaluations.</p>
        </div>
        <div>
          <div class="case-subtitle" style="margin-top: 0; margin-bottom: 0.75rem;">Key System Capabilities</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">AI Question Generation</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Google API Integration</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Automatic Email Dispatch</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Admin &amp; Candidate Links</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Render Cloud Deployment</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Custom Cultural Alignment</span>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
          <a href="/demos/assessment-generator/" target="_blank" class="btn-primary demo-open-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open Live Demo
          </a>
          <button type="button" class="btn-secondary demo-open-btn" style="cursor: pointer;" onclick="openVideoModal('assets/form-generator-demo.mp4', 'Assessment Generator &mdash; Walkthrough Video')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            Watch Video (1:41)
          </button>
        </div>
      </div>
    </div>

    <!-- PROTOTYPE 03: CANDIDATE EVALUATOR -->`;

content = content.replace(p2OldRegex, p2NewSection);

// 3. Replace Prototype 03 (Candidate Evaluator) markup
const p3OldRegex = /<!-- PROTOTYPE 03: CANDIDATE EVALUATOR -->[\s\S]*?<!-- PROTOTYPE 04: FLEET SETTLEMENT APP -->/;

const p3NewSection = `<!-- PROTOTYPE 03: CANDIDATE EVALUATOR -->
    <div style="margin-bottom: 2.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; padding-top: 2rem;">
      <span class="case-meta" style="margin-bottom: 0.5rem; display: inline-block;">Featured Prototype &mdash; 03</span>
      <h2 class="case-title" style="font-size: 2.2rem; margin-bottom: 0.5rem;">Candidate Evaluator</h2>
      <p style="font-size: 1.05rem; color: var(--text-muted); font-weight: 500; margin: 0;">AI-Powered Assessment Grading &amp; Professional PDF Reporter</p>
    </div>

    <div class="demo-showcase-row">
      <div class="demo-desktop-shell" style="flex: 1; min-width: 280px; max-width: 540px; margin: 0;" title="Candidate Evaluator Demo">
        <img src="assets/candidate-evaluator-real.png" alt="Candidate Evaluator Screenshot" loading="lazy">
        <div class="play-badge-center" onclick="openVideoModal('assets/report-generator-demo.mp4', 'Candidate Evaluator &mdash; Walkthrough Video')" title="Watch Video Walkthrough">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </div>
        <div class="demo-launch-overlay">
          <div class="demo-action-buttons">
            <button type="button" class="demo-action-btn-video" onclick="event.stopPropagation(); openVideoModal('assets/report-generator-demo.mp4', 'Candidate Evaluator &mdash; Walkthrough Video')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              Watch Video
            </button>
            <a href="/demos/candidate-evaluator/" target="_blank" class="demo-action-btn-live" onclick="event.stopPropagation();">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Open Live Demo
            </a>
          </div>
        </div>
      </div>

      <div style="flex: 1; min-width: 280px; max-width: 520px; display: flex; flex-direction: column; gap: 1.75rem;">
        <div>
          <div class="case-subtitle" style="margin-top: 0; margin-bottom: 0.5rem;">Challenge</div>
          <p style="font-size: 0.93rem; color: var(--text-muted); line-height: 1.65; margin: 0;">Grading candidate answers, assessing role-fit, and drafting professional PDF feedback reports for stakeholders was a slow, manual process prone to formatting delays.</p>
        </div>
        <div>
          <div class="case-subtitle" style="margin-top: 0; margin-bottom: 0.5rem;">Solution</div>
          <p style="font-size: 0.93rem; color: var(--text-muted); line-height: 1.65; margin: 0;">Built a report generation utility that passes candidate responses, job descriptions, and rubrics to an AI model to generate structured Excel reports, then programmatically renders them into client-ready PDFs.</p>
        </div>
        <div class="case-impact" style="margin-top: 0;">
          <div class="impact-title">Business Impact</div>
          <p class="impact-desc" style="margin: 0;">Reduced report generation and delivery times from hours to seconds, standardized AI-driven grading, and automated instant PDF delivery to HR.</p>
        </div>
        <div>
          <div class="case-subtitle" style="margin-top: 0; margin-bottom: 0.75rem;">Key System Capabilities</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Deepseek AI Evaluation</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Structured Excel Grading</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Professional PDF Rendering</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Automated HR Emailing</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Command-Line Utility</span>
            <span style="background: var(--chip-bg, var(--card-bg)); border: 1px solid var(--border); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Role-Fit Scoring</span>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
          <a href="/demos/candidate-evaluator/" target="_blank" class="btn-primary demo-open-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open Live Demo
          </a>
          <button type="button" class="btn-secondary demo-open-btn" style="cursor: pointer;" onclick="openVideoModal('assets/report-generator-demo.mp4', 'Candidate Evaluator &mdash; Walkthrough Video')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            Watch Video (1:41)
          </button>
        </div>
      </div>
    </div>

    <!-- PROTOTYPE 04: FLEET SETTLEMENT APP -->`;

content = content.replace(p3OldRegex, p3NewSection);

// 4. Add Video Modal HTML and JS before </body>
const modalHTMLAndJS = `
  <!-- VIDEO MODAL COMPONENT -->
  <div id="video-modal" class="video-modal-overlay" onclick="closeVideoModalOnOverlay(event)">
    <div class="video-modal-container">
      <div class="video-modal-header">
        <span id="video-modal-title" class="video-modal-title">Demo Walkthrough</span>
        <button class="video-modal-close" onclick="closeVideoModal()" aria-label="Close Video">&times;</button>
      </div>
      <div class="video-modal-body">
        <video id="video-player" controls playsinline style="width: 100%; border-radius: 0 0 12px 12px; display: block; background: #000; max-height: 70vh;">
          <source id="video-source" src="" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>

  <script>
    function openVideoModal(videoSrc, title) {
      const modal = document.getElementById('video-modal');
      const player = document.getElementById('video-player');
      const source = document.getElementById('video-source');
      const titleElem = document.getElementById('video-modal-title');

      titleElem.innerHTML = title || 'Demo Walkthrough';
      source.src = videoSrc;
      player.load();
      modal.classList.add('active');
      player.play().catch(() => {});
      document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
      const modal = document.getElementById('video-modal');
      const player = document.getElementById('video-player');
      player.pause();
      player.currentTime = 0;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    function closeVideoModalOnOverlay(e) {
      if (e.target.id === 'video-modal') {
        closeVideoModal();
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    });
  </script>
</body>`;

content = content.replace('</body>', modalHTMLAndJS);

fs.writeFileSync('demos.html', content, 'utf8');
console.log('Successfully configured video modal and dual action buttons in demos.html.');
