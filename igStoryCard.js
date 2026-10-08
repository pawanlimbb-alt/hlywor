/**
 * igStoryCard.js — Instagram Story Card Generator for HlyWor
 * Creates high-resolution (1080x1920) 9:16 Instagram Story cards ready to share directly in Instagram App
 * with clickable Link Sticker integration so viewers are redirected to the HlyWor post.
 */

// Global state for current post being shared
let currentStoryPost = null;
let currentStoryTheme = 'midnight';
let currentStoryBlob = null;
let currentStoryDataUrl = null;
let isRendering = false;

/**
 * Open the Instagram Story Sharing Modal for a given post
 * @param {Object} post - { title, desc, content, author, category, thumbnail, slug, date, readTime }
 */
export async function openIgStoryModal(post) {
  if (!post) return;
  currentStoryPost = post;
  
  ensureModalDOMElements();
  const overlay = document.getElementById('igStoryModalOverlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Set default theme button active
  updateThemeButtonsUI(currentStoryTheme);

  // Auto-copy post link immediately for maximum convenience
  const postUrl = getFullPostUrl(post);
  try {
    await navigator.clipboard.writeText(postUrl);
  } catch(e) {}

  // Render the story card on canvas
  await renderStoryCanvas();
}

/**
 * Close the Instagram Story Modal
 */
export function closeIgStoryModal() {
  const overlay = document.getElementById('igStoryModalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function getFullPostUrl(post) {
  const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/post.html');
  const slug = post?.slug || post?.id || '';
  return `${base}?slug=${encodeURIComponent(slug)}`;
}

/**
 * Ensure the Modal HTML & CSS exist in DOM
 */
function ensureModalDOMElements() {
  if (document.getElementById('igStoryModalOverlay')) return;

  // Insert styles
  const styleEl = document.createElement('style');
  styleEl.id = 'igStoryModalStyles';
  styleEl.textContent = `
    .ig-story-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(10, 6, 3, 0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
      font-family: var(--sans, 'DM Sans', sans-serif);
    }
    .ig-story-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .ig-story-modal {
      background: #18110a;
      border: 1.5px solid rgba(212, 160, 32, 0.35);
      border-radius: 16px;
      width: 100%;
      max-width: 860px;
      max-height: 94vh;
      overflow-y: auto;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.85), 0 0 32px rgba(232, 104, 26, 0.2);
      display: flex;
      flex-direction: column;
      position: relative;
      color: #fff;
      transform: scale(0.94) translateY(12px);
      transition: transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1);
    }
    .ig-story-overlay.open .ig-story-modal {
      transform: scale(1) translateY(0);
    }
    .ig-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(26, 18, 10, 0.6);
    }
    .ig-modal-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ig-modal-badge {
      font-family: var(--pixel, monospace);
      font-size: 0.52rem;
      background: linear-gradient(135deg, #e1306c, #f77737);
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      letter-spacing: 1px;
    }
    .ig-modal-heading {
      font-family: var(--serif, 'Crimson Pro', Georgia, serif);
      font-size: 1.15rem;
      font-style: italic;
      color: #fdf6e2;
      margin: 0;
    }
    .ig-modal-close-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.7);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      transition: all 0.2s;
    }
    .ig-modal-close-btn:hover {
      background: var(--fire, #e8681a);
      color: #fff;
      border-color: var(--fire, #e8681a);
    }

    .ig-modal-body {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 24px;
      padding: 20px;
      align-items: start;
    }
    @media (max-width: 740px) {
      .ig-modal-body {
        grid-template-columns: 1fr;
        padding: 16px;
        gap: 18px;
      }
    }

    /* Preview Canvas Wrapper (9:16 Aspect Ratio) */
    .ig-preview-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .ig-preview-frame {
      width: 100%;
      max-width: 270px;
      aspect-ratio: 9 / 16;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7), 0 0 16px rgba(212, 160, 32, 0.2);
      border: 2px solid rgba(212, 160, 32, 0.3);
      position: relative;
      background: #0d0804;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ig-preview-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .ig-preview-loading {
      position: absolute;
      inset: 0;
      background: rgba(18, 12, 8, 0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 0.75rem;
      color: var(--gold, #d4a020);
      font-family: var(--pixel, monospace);
    }
    .ig-spinner {
      width: 28px;
      height: 28px;
      border: 3px solid rgba(212, 160, 32, 0.2);
      border-top-color: var(--fire, #e8681a);
      border-radius: 50%;
      animation: igSpin 0.8s linear infinite;
    }
    @keyframes igSpin {
      to { transform: rotate(360deg); }
    }

    /* Options & Actions Column */
    .ig-controls-col {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ig-section-label {
      font-family: var(--pixel, monospace);
      font-size: 0.52rem;
      letter-spacing: 1.5px;
      color: var(--gold, #d4a020);
      margin-bottom: 8px;
      display: block;
    }
    .ig-theme-picker {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 8px;
    }
    .ig-theme-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 10px 8px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.75);
      font-size: 0.78rem;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.2s;
    }
    .ig-theme-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(212, 160, 32, 0.5);
      color: #fff;
    }
    .ig-theme-btn.active {
      background: rgba(232, 104, 26, 0.15);
      border-color: var(--fire, #e8681a);
      color: #fff;
      box-shadow: 0 0 12px rgba(232, 104, 26, 0.3);
    }
    .ig-theme-swatch {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1.5px solid rgba(255, 255, 255, 0.2);
    }
    .ig-theme-swatch.midnight { background: linear-gradient(135deg, #18110a, #331f10); }
    .ig-theme-swatch.parchment { background: linear-gradient(135deg, #fdf6e2, #f5edd8); border-color: #d4a020; }
    .ig-theme-swatch.sunset { background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); }
    .ig-theme-swatch.minimal { background: linear-gradient(135deg, #0f0f0f, #222); }

    /* How Link Redirection Works (Step by step guide) */
    .ig-redirect-guide {
      background: rgba(232, 104, 26, 0.08);
      border: 1px solid rgba(232, 104, 26, 0.3);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ig-guide-title {
      font-family: var(--pixel, monospace);
      font-size: 0.52rem;
      color: var(--fire, #e8681a);
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ig-guide-steps {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.4;
    }
    .ig-step-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .ig-step-num {
      background: var(--fire, #e8681a);
      color: #fff;
      font-weight: 700;
      font-size: 0.65rem;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* Action Buttons */
    .ig-actions-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 4px;
    }
    .ig-main-btn {
      background: linear-gradient(135deg, #e1306c 0%, #fd1d1d 50%, #f77737 100%);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 0.96rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 6px 20px rgba(225, 48, 108, 0.4);
      transition: all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1);
    }
    .ig-main-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(225, 48, 108, 0.55);
    }
    .ig-main-btn:active {
      transform: translateY(0);
    }
    .ig-secondary-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .ig-sub-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: rgba(255, 255, 255, 0.85);
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .ig-sub-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      border-color: var(--gold, #d4a020);
    }

    .ig-toast {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #2ecc71;
      color: #0b1c10;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);
      z-index: 10;
      white-space: nowrap;
    }
    .ig-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(styleEl);

  // Insert Modal DOM
  const overlay = document.createElement('div');
  overlay.id = 'igStoryModalOverlay';
  overlay.className = 'ig-story-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Instagram Story Card Generator');

  overlay.innerHTML = `
    <div class="ig-story-modal" id="igStoryModal">
      <div class="ig-modal-header">
        <div class="ig-modal-title-wrap">
          <span class="ig-modal-badge">📸 INSTAGRAM APP</span>
          <h3 class="ig-modal-heading">Instagram Story Card & Link</h3>
        </div>
        <button type="button" class="ig-modal-close-btn" id="igModalCloseBtn" aria-label="Close modal">✕</button>
      </div>

      <div class="ig-modal-body">
        <!-- 9:16 Canvas Preview Frame -->
        <div class="ig-preview-col">
          <div class="ig-preview-frame">
            <img id="igPreviewImg" class="ig-preview-img" alt="Instagram Story Card Preview" />
            <div id="igPreviewLoading" class="ig-preview-loading" style="display:none;">
              <div class="ig-spinner"></div>
              <span>GENERATING CARD...</span>
            </div>
          </div>
        </div>

        <!-- Controls & Sharing Actions -->
        <div class="ig-controls-col">
          <div>
            <span class="ig-section-label">1. CHOOSE AESTHETIC THEME</span>
            <div class="ig-theme-picker">
              <button type="button" class="ig-theme-btn active" data-theme="midnight">
                <span class="ig-theme-swatch midnight"></span>
                <span>🌙 Midnight</span>
              </button>
              <button type="button" class="ig-theme-btn" data-theme="parchment">
                <span class="ig-theme-swatch parchment"></span>
                <span>📜 Diary Paper</span>
              </button>
              <button type="button" class="ig-theme-btn" data-theme="sunset">
                <span class="ig-theme-swatch sunset"></span>
                <span>🌅 Ember Sunset</span>
              </button>
              <button type="button" class="ig-theme-btn" data-theme="minimal">
                <span class="ig-theme-swatch minimal"></span>
                <span>🖤 Obsidian</span>
              </button>
            </div>
          </div>

          <!-- Step-by-step Link Sticker Guide -->
          <div class="ig-redirect-guide">
            <div class="ig-guide-title">
              <span>🎯 HOW VIEWERS CLICK & OPEN YOUR POST</span>
            </div>
            <div class="ig-guide-steps">
              <div class="ig-step-item">
                <span class="ig-step-num">1</span>
                <span>Tap <strong>"Open in Instagram Story"</strong> — card saves & Instagram opens directly.</span>
              </div>
              <div class="ig-step-item">
                <span class="ig-step-num">2</span>
                <span>In Instagram Story editor, tap <strong>Sticker 😊</strong> → <strong>LINK 🔗</strong> → <strong>Paste</strong> (link is already in your clipboard!).</span>
              </div>
              <div class="ig-step-item">
                <span class="ig-step-num">✓</span>
                <span>Place the Link Sticker over the card's link zone. Viewers tapping your story will be <strong>instantly redirected to this post</strong>!</span>
              </div>
            </div>
          </div>

          <div class="ig-actions-box">
            <button type="button" class="ig-main-btn" id="igShareMainBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>Open in Instagram Story</span>
            </button>

            <div class="ig-secondary-actions">
              <button type="button" class="ig-sub-btn" id="igDownloadBtn">
                <span>📥 Save Story Image</span>
              </button>
              <button type="button" class="ig-sub-btn" id="igCopyLinkBtn">
                <span>📋 Copy Story Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="igToast" class="ig-toast">Link Copied! Ready to paste in Instagram 🔗</div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Hidden offscreen canvas
  let canvas = document.getElementById('igStoryCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'igStoryCanvas';
    canvas.width = 1080;
    canvas.height = 1920;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
  }

  // Wire event listeners
  document.getElementById('igModalCloseBtn')?.addEventListener('click', closeIgStoryModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeIgStoryModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeIgStoryModal();
    }
  });

  // Theme buttons
  document.querySelectorAll('.ig-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentStoryTheme = btn.dataset.theme || 'midnight';
      updateThemeButtonsUI(currentStoryTheme);
      renderStoryCanvas();
    });
  });

  // Share to Story Action Button
  document.getElementById('igShareMainBtn')?.addEventListener('click', handleStoryShare);

  // Download Action Button
  document.getElementById('igDownloadBtn')?.addEventListener('click', handleStoryDownload);

  // Copy Link Action Button
  document.getElementById('igCopyLinkBtn')?.addEventListener('click', handleCopyLink);
}

function updateThemeButtonsUI(theme) {
  document.querySelectorAll('.ig-theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function showToast(msg) {
  const toast = document.getElementById('igToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/**
 * Main Direct Instagram App Share Handler
 */
async function handleStoryShare() {
  if (!currentStoryPost || !currentStoryBlob) return;

  const postUrl = getFullPostUrl(currentStoryPost);

  // 1. Auto-copy link to clipboard for the Link Sticker
  try {
    await navigator.clipboard.writeText(postUrl);
  } catch(e) {
    console.warn('Clipboard copy skipped');
  }

  const file = new File([currentStoryBlob], `hlywor-${currentStoryPost.slug || 'story'}.png`, { type: 'image/png' });

  // 2. Try Native Web Share API if device supports sharing files directly into Instagram App
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      showToast('📋 Link Copied! Choose Instagram Stories');
      await navigator.share({
        title: currentStoryPost.title,
        text: `Read "${currentStoryPost.title}" on HlyWor: ${postUrl}`,
        files: [file],
        url: postUrl
      });
      return;
    } catch (err) {
      if (err.name === 'AbortError') return; // User closed sheet
      console.warn('Web Share failed, falling back to direct Instagram app launch:', err);
    }
  }

  // 3. Fallback: Save Card Image + Direct Open Instagram App URL Scheme
  handleStoryDownload();
  showToast('Image Saved & Link Copied! Opening Instagram...');

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  setTimeout(() => {
    if (isIOS) {
      // Direct iOS Instagram Story scheme
      window.location.href = 'instagram-stories://share';
      setTimeout(() => {
        window.location.href = 'instagram://story';
      }, 500);
      setTimeout(() => {
        window.open('https://www.instagram.com/stories/create/', '_blank');
      }, 1500);
    } else if (isAndroid) {
      // Direct Android Instagram Story intent
      window.location.href = 'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end';
      setTimeout(() => {
        window.location.href = 'instagram://story';
      }, 500);
      setTimeout(() => {
        window.open('https://www.instagram.com/stories/create/', '_blank');
      }, 1500);
    } else {
      window.open('https://www.instagram.com/stories/create/', '_blank');
    }
  }, 400);
}

/**
 * Download generated story card PNG
 */
function handleStoryDownload() {
  if (!currentStoryDataUrl) return;
  const link = document.createElement('a');
  link.download = `hlywor-${currentStoryPost?.slug || 'story'}.png`;
  link.href = currentStoryDataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Saved to Camera Roll / Downloads! 📥');
}

/**
 * Copy post URL to clipboard
 */
async function handleCopyLink() {
  if (!currentStoryPost) return;
  const postUrl = getFullPostUrl(currentStoryPost);
  try {
    await navigator.clipboard.writeText(postUrl);
    showToast('Post Link Copied! Ready to Paste 📋');
  } catch (e) {
    showToast('Link: ' + postUrl);
  }
}

/**
 * Renders the high resolution 1080x1920 Instagram Story Canvas
 */
async function renderStoryCanvas() {
  if (!currentStoryPost || isRendering) return;
  isRendering = true;

  const loadingEl = document.getElementById('igPreviewLoading');
  if (loadingEl) loadingEl.style.display = 'flex';

  const canvas = document.getElementById('igStoryCanvas');
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;

  // Ensure fonts are loaded
  try {
    await document.fonts.ready;
  } catch(e) {}

  // Clean canvas
  ctx.clearRect(0, 0, W, H);

  // 1. Draw Background Theme
  drawStoryBackground(ctx, W, H, currentStoryTheme);

  // 2. Load post image if present
  let imgObj = null;
  if (currentStoryPost.thumbnail) {
    try {
      imgObj = await loadImageWithTimeout(currentStoryPost.thumbnail, 3500);
    } catch(e) {
      console.warn('Image load failed, continuing with layout without cover photo', e);
    }
  }

  // 3. Draw Post Card Layout
  drawStoryCardContent(ctx, W, H, currentStoryPost, currentStoryTheme, imgObj);

  // Convert to Blob & DataURL
  canvas.toBlob(blob => {
    currentStoryBlob = blob;
    currentStoryDataUrl = canvas.toDataURL('image/png');

    const previewImg = document.getElementById('igPreviewImg');
    if (previewImg) {
      previewImg.src = currentStoryDataUrl;
    }

    if (loadingEl) loadingEl.style.display = 'none';
    isRendering = false;
  }, 'image/png');
}

/**
 * Draw background styles per theme
 */
function drawStoryBackground(ctx, W, H, theme) {
  if (theme === 'midnight') {
    // Deep dark cork & amber ambient background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#0c0704');
    bgGrad.addColorStop(0.5, '#181008');
    bgGrad.addColorStop(1, '#090503');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Warm radial glow at center-top
    const rad = ctx.createRadialGradient(W / 2, 600, 50, W / 2, 600, 650);
    rad.addColorStop(0, 'rgba(232, 104, 26, 0.16)');
    rad.addColorStop(0.5, 'rgba(212, 160, 32, 0.06)');
    rad.addColorStop(1, 'transparent');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, W, H);

    // Vignette border
    drawVignette(ctx, W, H);
  } 
  else if (theme === 'parchment') {
    // Vintage warm board
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#261b12');
    bgGrad.addColorStop(1, '#150d07');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle center glow
    const rad = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 700);
    rad.addColorStop(0, 'rgba(250, 246, 238, 0.08)');
    rad.addColorStop(1, 'transparent');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, W, H);
  }
  else if (theme === 'sunset') {
    // Rich sunset to midnight gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#190616');
    bgGrad.addColorStop(0.4, '#381308');
    bgGrad.addColorStop(0.8, '#180a06');
    bgGrad.addColorStop(1, '#0b0402');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Sunset accent circles
    const sunGlow = ctx.createRadialGradient(W / 2, 500, 20, W / 2, 500, 500);
    sunGlow.addColorStop(0, 'rgba(255, 110, 40, 0.22)');
    sunGlow.addColorStop(0.6, 'rgba(225, 48, 108, 0.1)');
    sunGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, W, H);
  }
  else {
    // Obsidian / Minimal
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    const rad = ctx.createRadialGradient(W / 2, 500, 0, W / 2, 500, 600);
    rad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
    rad.addColorStop(1, 'transparent');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, W, H);
  }
}

/**
 * Draw Story Card content inside a styled container
 */
function drawStoryCardContent(ctx, W, H, post, theme, imgObj) {
  // Top Story Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#d4a020';
  ctx.font = '24px "Press Start 2P", monospace';
  ctx.fillText('H L Y W O R', W / 2, 160);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = 'italic 32px "Crimson Pro", Georgia, serif';
  ctx.fillText('a place to open up', W / 2, 210);

  // Main Card Dimensions (Centered)
  const cardW = 920;
  const cardX = (W - cardW) / 2;
  const cardY = 270;
  const cardH = 1260;
  const cardRadius = 24;

  // Draw Card Container
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 16;

  if (theme === 'parchment') {
    ctx.fillStyle = '#faf6ee';
  } else if (theme === 'sunset') {
    ctx.fillStyle = 'rgba(26, 12, 18, 0.94)';
  } else if (theme === 'minimal') {
    ctx.fillStyle = '#141414';
  } else {
    // midnight
    ctx.fillStyle = 'rgba(20, 14, 9, 0.95)';
  }

  roundRect(ctx, cardX, cardY, cardW, cardH, cardRadius, true, false);
  ctx.restore();

  // Card Border
  ctx.save();
  if (theme === 'parchment') {
    ctx.strokeStyle = 'rgba(212, 160, 32, 0.4)';
    ctx.lineWidth = 2;
  } else if (theme === 'sunset') {
    const borderGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    borderGrad.addColorStop(0, 'rgba(255, 122, 42, 0.7)');
    borderGrad.addColorStop(0.5, 'rgba(225, 48, 108, 0.5)');
    borderGrad.addColorStop(1, 'rgba(212, 160, 32, 0.6)');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 3;
  } else if (theme === 'minimal') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
  } else {
    ctx.strokeStyle = 'rgba(212, 160, 32, 0.45)';
    ctx.lineWidth = 2.5;
  }
  roundRect(ctx, cardX, cardY, cardW, cardH, cardRadius, false, true);
  ctx.restore();

  // Ruled Notebook Lines for Parchment Theme
  if (theme === 'parchment') {
    ctx.save();
    ctx.strokeStyle = 'rgba(180, 160, 120, 0.22)';
    ctx.lineWidth = 1.5;
    for (let y = cardY + 80; y < cardY + cardH - 60; y += 42) {
      ctx.beginPath();
      ctx.moveTo(cardX + 40, y);
      ctx.lineTo(cardX + cardW - 40, y);
      ctx.stroke();
    }
    // Red left margin line
    ctx.strokeStyle = 'rgba(220, 80, 80, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 110, cardY + 20);
    ctx.lineTo(cardX + 110, cardY + cardH - 20);
    ctx.stroke();
    ctx.restore();
  }

  // Top Washi Tape at Card Top
  drawWashiTape(ctx, W / 2, cardY, theme);

  let currentY = cardY + 85;

  // Category & Read Time Pill
  const categoryText = (post.category || 'STORY').toUpperCase();
  const readTimeText = post.readTime || '~2 MIN READ';
  
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '700 20px "DM Sans", sans-serif';
  const tagText = `📌 ${categoryText}  ·  ${readTimeText}`;
  
  const tagW = ctx.measureText(tagText).width + 36;
  const tagH = 40;
  const tagX = (W - tagW) / 2;
  
  ctx.fillStyle = theme === 'parchment' ? 'rgba(232, 104, 26, 0.12)' : 'rgba(232, 104, 26, 0.18)';
  roundRect(ctx, tagX, currentY, tagW, tagH, 20, true, false);
  
  ctx.strokeStyle = 'rgba(232, 104, 26, 0.5)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, tagX, currentY, tagW, tagH, 20, false, true);
  
  ctx.fillStyle = theme === 'parchment' ? '#c05210' : '#ff954a';
  ctx.fillText(tagText, W / 2, currentY + 27);
  ctx.restore();

  currentY += 80;

  // Cover Image (if available)
  if (imgObj) {
    const imgMaxH = 420;
    const imgW = cardW - 120;
    const imgH = Math.min(imgMaxH, (imgObj.height / imgObj.width) * imgW);
    const imgX = (W - imgW) / 2;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    
    // Draw rounded image
    roundRect(ctx, imgX, currentY, imgW, imgH, 16, false, false);
    ctx.clip();
    ctx.drawImage(imgObj, imgX, currentY, imgW, imgH);
    ctx.restore();

    // Image border
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, imgX, currentY, imgW, imgH, 16, false, true);
    ctx.restore();

    currentY += imgH + 35;
  } else {
    currentY += 20;
  }

  // Post Title (Centered, expressive font)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = theme === 'parchment' ? '#1a1208' : '#fdf6e2';
  
  // Choose font size based on title length
  let titleFontSize = 64;
  if (post.title.length > 50) titleFontSize = 52;
  if (post.title.length > 90) titleFontSize = 44;

  ctx.font = `700 ${titleFontSize}px "Caveat", cursive`;
  
  const titleLines = wrapText(ctx, `"${post.title}"`, cardW - 140);
  const titleLineH = titleFontSize * 1.15;

  titleLines.forEach((line, idx) => {
    ctx.fillText(line, W / 2, currentY + (idx * titleLineH));
  });

  currentY += (titleLines.length * titleLineH) + 26;
  ctx.restore();

  // Excerpt / Quotation Text
  const rawExcerpt = post.desc || (post.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 180) : '');
  if (rawExcerpt) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = theme === 'parchment' ? '#4a3828' : 'rgba(253, 246, 226, 0.82)';
    ctx.font = 'italic 32px "Crimson Pro", Georgia, serif';
    
    const maxExcerptLines = imgObj ? 3 : 5;
    const excerptLines = wrapText(ctx, rawExcerpt, cardW - 160).slice(0, maxExcerptLines);
    if (excerptLines.length === maxExcerptLines && excerptLines[maxExcerptLines - 1].length > 10) {
      excerptLines[maxExcerptLines - 1] += '...';
    }

    const excerptLineH = 46;
    excerptLines.forEach((line, idx) => {
      ctx.fillText(line, W / 2, currentY + (idx * excerptLineH));
    });

    currentY += (excerptLines.length * excerptLineH) + 32;
    ctx.restore();
  }

  // Author Signature Tag
  const authorName = post.author || 'Anonymous Writer';
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = theme === 'parchment' ? '#b85d19' : '#e8681a';
  ctx.font = '700 36px "Caveat", cursive';
  ctx.fillText(`— penned by ${authorName}`, W / 2, cardY + cardH - 160);
  ctx.restore();

  // 🎯 Designated Link Sticker Target Area (Interactive sticker look)
  ctx.save();
  const stickerBoxW = 540;
  const stickerBoxH = 68;
  const stickerBoxX = (W - stickerBoxW) / 2;
  const stickerBoxY = cardY + cardH - 96;

  // Realistic Instagram Link Sticker Look
  ctx.fillStyle = theme === 'parchment' ? '#ffffff' : '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  roundRect(ctx, stickerBoxX, stickerBoxY, stickerBoxW, stickerBoxH, 34, true, false);
  ctx.restore();

  // Inner text & icon for link sticker
  ctx.save();
  ctx.fillStyle = '#0f1419';
  ctx.font = '700 24px "DM Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🔗 TAP TO READ STORY · HLYWOR', W / 2, stickerBoxY + 42);
  ctx.restore();

  // Bottom Instagram Story Sticker Prompt
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = '600 22px "DM Sans", sans-serif';
  ctx.fillText('✨ Tap the Link Sticker above to read on HlyWor ✨', W / 2, H - 120);
  ctx.restore();
}

/**
 * Draw washi tape effect on card top
 */
function drawWashiTape(ctx, x, y, theme) {
  ctx.save();
  const tapeW = 180;
  const tapeH = 34;
  ctx.translate(x, y);
  ctx.rotate(-0.02);

  ctx.fillStyle = theme === 'parchment' ? 'rgba(232, 104, 26, 0.45)' : 'rgba(212, 160, 32, 0.45)';
  ctx.fillRect(-tapeW / 2, -tapeH / 2, tapeW, tapeH);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(-tapeW / 2, -tapeH / 2, tapeW, tapeH);
  ctx.restore();
}

/**
 * Vignette shading
 */
function drawVignette(ctx, W, H) {
  ctx.save();
  const vig = ctx.createRadialGradient(W / 2, H / 2, H / 3, W / 2, H / 2, H / 1.2);
  vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vig.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

/**
 * Text wrapping helper
 */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Helper to draw rounded rectangle on Canvas
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

/**
 * Helper to load remote image with timeout and CORS
 */
function loadImageWithTimeout(url, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      reject(new Error('Image load timed out'));
    }, timeoutMs);

    img.onload = () => {
      if (!timedOut) {
        clearTimeout(timer);
        resolve(img);
      }
    };
    img.onerror = (err) => {
      if (!timedOut) {
        clearTimeout(timer);
        reject(err);
      }
    };
    img.src = url;
  });
}
