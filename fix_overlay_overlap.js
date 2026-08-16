const fs = require('fs');

let content = fs.readFileSync('demos.html', 'utf8');

// Replace the CSS styling for demo shells and overlays
const oldStyleStart = '/* ── VIDEO MODAL STYLES ── */';
const oldStyleEnd = '</style>';

const newStyles = `/* ── VIDEO MODAL STYLES ── */
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

    /* Thumbnail Badges and Clean Non-Overlapping Overlay */
    .play-badge-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(0, 114, 244, 0.9);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 25px rgba(0, 114, 244, 0.5);
      transition: opacity 0.2s ease, transform 0.2s ease;
      pointer-events: none;
      z-index: 2;
    }
    .demo-desktop-shell:hover .play-badge-center {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }

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
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      transition: all 0.25s ease;
      z-index: 5;
      padding: 1.5rem;
    }
    .demo-phone-shell .demo-launch-overlay {
      border-radius: 36px;
    }
    .demo-desktop-shell:hover .demo-launch-overlay,
    .demo-phone-shell:hover .demo-launch-overlay {
      background: rgba(9, 13, 22, 0.78);
      opacity: 1;
      visibility: visible;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .demo-action-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
      width: 100%;
      max-width: 240px;
      transform: translateY(8px);
      transition: transform 0.25s ease;
    }
    .demo-desktop-shell:hover .demo-action-buttons,
    .demo-phone-shell:hover .demo-action-buttons {
      transform: translateY(0);
    }

    .demo-action-btn-video {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.25);
      font-weight: 700;
      font-size: 0.88rem;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .demo-action-btn-video:hover {
      background: #ffffff;
      color: #0f172a;
      border-color: #ffffff;
      transform: translateY(-1px);
    }

    .demo-action-btn-live {
      background: #0072F4;
      color: #ffffff;
      border: none;
      font-weight: 700;
      font-size: 0.88rem;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 114, 244, 0.4);
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .demo-action-btn-live:hover {
      background: #005ecb;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0, 114, 244, 0.6);
    }
`;

const startIndex = content.indexOf(oldStyleStart);
const endIndex = content.indexOf(oldStyleEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newStyles + '\n  ' + content.substring(endIndex);
}

fs.writeFileSync('demos.html', content, 'utf8');
console.log('Fixed styling in demos.html without overlapping buttons.');
