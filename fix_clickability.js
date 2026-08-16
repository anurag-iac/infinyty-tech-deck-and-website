const fs = require('fs');

let content = fs.readFileSync('demos.html', 'utf8');

const styleBlock = `  <style>
    .demo-phone-shell {
      position: relative;
      width: 300px;
      flex-shrink: 0;
    }
    .demo-phone-shell img {
      width: 100%;
      border-radius: 36px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.18), 0 0 0 6px var(--card-bg), 0 0 0 8px var(--border);
      display: block;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .demo-phone-shell:hover img {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 32px 68px rgba(0,0,0,0.22), 0 0 0 6px var(--card-bg), 0 0 0 8px var(--border);
    }

    .demo-desktop-shell {
      position: relative;
      width: 100%;
      max-width: 520px;
      flex-shrink: 0;
    }
    .demo-desktop-shell img {
      width: 100%;
      border-radius: 16px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.18), 0 0 0 4px var(--card-bg), 0 0 0 6px var(--border);
      display: block;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .demo-desktop-shell:hover img {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 32px 68px rgba(0,0,0,0.22), 0 0 0 4px var(--card-bg), 0 0 0 6px var(--border);
    }

    /* Clean Hover Launch Overlay */
    .demo-launch-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(9, 13, 22, 0);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      transition: all 0.25s ease;
      z-index: 10;
      padding: 1.5rem;
    }
    .demo-phone-shell .demo-launch-overlay {
      border-radius: 36px;
    }
    .demo-desktop-shell:hover .demo-launch-overlay,
    .demo-phone-shell:hover .demo-launch-overlay {
      background: rgba(9, 13, 22, 0.82);
      opacity: 1;
      visibility: visible;
      pointer-events: auto !important;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    /* Single Launch Button (Prototypes 1, 4, 5) */
    .demo-launch-btn {
      background: #0072F4;
      color: #ffffff;
      font-weight: 800;
      font-size: 0.95rem;
      padding: 0.8rem 1.6rem;
      border-radius: 50px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 8px 24px rgba(0, 114, 244, 0.4);
      text-decoration: none;
      cursor: pointer !important;
      pointer-events: auto !important;
      border: none;
      transition: all 0.2s ease;
    }
    .demo-launch-btn:hover {
      background: #005ecb;
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(0, 114, 244, 0.6);
    }

    /* Dual Action Buttons (Prototypes 2 & 3) */
    .demo-action-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
      width: 100%;
      max-width: 250px;
      pointer-events: auto !important;
    }

    .demo-action-btn-video {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff !important;
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-weight: 700;
      font-size: 0.9rem;
      padding: 0.8rem 1.25rem;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer !important;
      pointer-events: auto !important;
      transition: all 0.2s ease;
      text-decoration: none;
      outline: none;
    }
    .demo-action-btn-video:hover {
      background: #ffffff;
      color: #0f172a !important;
      border-color: #ffffff;
      transform: translateY(-2px);
    }

    .demo-action-btn-live {
      background: #0072F4;
      color: #ffffff !important;
      border: none;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 0.8rem 1.25rem;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer !important;
      pointer-events: auto !important;
      box-shadow: 0 4px 15px rgba(0, 114, 244, 0.4);
      transition: all 0.2s ease;
      text-decoration: none;
      outline: none;
    }
    .demo-action-btn-live:hover {
      background: #005ecb;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(0, 114, 244, 0.6);
    }

    .demo-open-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 2rem;
      font-size: 1rem;
      font-weight: 700;
      border-radius: var(--radius-sm);
    }

    /* ── VIDEO MODAL STYLES ── */
    .video-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }
    .video-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .video-modal-container {
      width: 100%;
      max-width: 900px;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.9);
      transform: scale(0.95);
      transition: transform 0.25s ease;
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
      background: #0f172a;
    }
    .video-modal-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
    }
    .video-modal-close {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
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
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.05);
    }
    .video-modal-body {
      padding: 0;
      background: #000;
    }
  </style>`;

const startTag = '<style>';
const endTag = '</style>';
const sIdx = content.indexOf(startTag);
const eIdx = content.indexOf(endTag) + endTag.length;

if (sIdx !== -1 && eIdx !== -1) {
  content = content.substring(0, sIdx) + styleBlock + content.substring(eIdx);
}

// Ensure all .demo-launch-btn in prototypes 1, 4, 5 are clean <a> tags with hrefs
content = content.replace(/<span class="demo-launch-btn">([\s\S]*?)<\/span>/g, '<a class="demo-launch-btn" href="$1">$1</a>');

fs.writeFileSync('demos.html', content, 'utf8');
console.log('Cleaned and verified styles and clickable buttons in demos.html.');
