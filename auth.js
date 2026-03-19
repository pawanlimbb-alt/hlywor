// ════════════════════════════════════════════════════════
//  auth.js  —  HlyWor shared authentication module
//  Import this on every page that needs auth state
// ════════════════════════════════════════════════════════

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── Firebase config ──────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAg7yTP5YEDsTUpmNYhCi5iroqNQ_67o58",
  authDomain: "hlywor.firebaseapp.com",
  projectId: "hlywor",
  storageBucket: "hlywor.firebasestorage.app",
  messagingSenderId: "697637160825",
  appId: "1:697637160825:web:00dae42c1b0242c9f4d1a8",
  measurementId: "G-MQDXDWHLX8"
};

// Prevent duplicate app init when multiple pages import this
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Keep user logged in across tabs and page refreshes
setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// ── Exported state ───────────────────────────────────────
export let currentUser = null;

// ── Sign in ──────────────────────────────────────────────
export async function signIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    if (err.code !== "auth/popup-closed-by-user") {
      console.error("Sign-in error:", err);
    }
    return null;
  }
}

// ── Sign out ─────────────────────────────────────────────
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    console.error("Sign-out error:", err);
  }
}

// ── Auth state listener ──────────────────────────────────
// callback(user) — user is null when signed out
export function onAuthChange(callback) {
  onAuthStateChanged(auth, user => {
    currentUser = user;
    callback(user);
  });
}

// ── Helper: is this uid the author? ─────────────────────
export function isAuthor(authorUid) {
  return currentUser && currentUser.uid === authorUid;
}

// ── Helper: get display name safely ─────────────────────
export function getDisplayName(user) {
  if (!user) return "";
  return user.displayName || user.email?.split("@")[0] || "Anonymous";
}

// ════════════════════════════════════════════════════════
//  injectAuthNav(navEl, options)
//
//  Call this from any page to wire up the nav auth UI.
//
//  navEl   — the <nav> or container element to inject into
//  options — {
//    onSignIn(user)  : called after successful sign-in
//    onSignOut()     : called after sign-out
//    requireAuth     : if true, shows login modal on page
//                      load when user is not signed in
//    loginPrompt     : custom message shown in login modal
//  }
// ════════════════════════════════════════════════════════
export function injectAuthNav(navEl, options = {}) {
  const { onSignIn, onSignOut, requireAuth = false, loginPrompt } = options;

  // ── Inject CSS (once) ──────────────────────────────────
  if (!document.getElementById("auth-nav-style")) {
    const style = document.createElement("style");
    style.id = "auth-nav-style";
    style.textContent = `
      .auth-nav-btn {
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.76rem;
        padding: 6px 14px;
        background: #e8681a;
        color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 2px;
        display: flex;
        align-items: center;
        gap: 7px;
        transition: all 0.2s;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .auth-nav-btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
      .auth-nav-btn img {
        width: 22px; height: 22px;
        border-radius: 50%;
        object-fit: cover;
        border: 1.5px solid rgba(255,255,255,0.4);
      }
      .auth-user-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }
      .auth-user-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 20px;
        padding: 4px 12px 4px 4px;
        cursor: pointer;
        transition: all 0.2s;
        color: rgba(255,255,255,0.85);
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.76rem;
        white-space: nowrap;
      }
      .auth-user-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); }
      .auth-user-btn img {
        width: 26px; height: 26px;
        border-radius: 50%; object-fit: cover;
        border: 1.5px solid rgba(255,255,255,0.3);
      }
      .auth-user-btn .auth-chevron {
        font-size: 0.6rem;
        color: rgba(255,255,255,0.4);
        margin-left: 2px;
      }
      .auth-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: #1a1208;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        padding: 6px;
        min-width: 180px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        z-index: 9999;
        display: none;
        flex-direction: column;
        gap: 2px;
      }
      .auth-dropdown.open { display: flex; }
      .auth-dropdown-header {
        padding: 8px 10px 10px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
        margin-bottom: 4px;
      }
      .auth-dropdown-name {
        font-family: 'Caveat', cursive;
        font-size: 1.05rem;
        color: #faf6ee;
        font-weight: 600;
        display: block;
      }
      .auth-dropdown-email {
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.65rem;
        color: rgba(255,255,255,0.35);
        display: block;
        margin-top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 160px;
      }
      .auth-dropdown-item {
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.76rem;
        color: rgba(255,255,255,0.6);
        padding: 8px 10px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        transition: background 0.15s, color 0.15s;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
      }
      .auth-dropdown-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9); }
      .auth-dropdown-item.danger { color: rgba(255,80,80,0.7); }
      .auth-dropdown-item.danger:hover { background: rgba(255,80,80,0.08); color: rgba(255,80,80,1); }

      /* ── Login Modal ── */
      .auth-login-modal-bg {
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0,0,0,0.88);
        backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        animation: authFadeIn 0.2s ease;
      }
      @keyframes authFadeIn { from{opacity:0} to{opacity:1} }
      .auth-login-modal {
        background: #faf6ee;
        max-width: 380px; width: calc(100% - 40px);
        padding: 36px 32px 32px;
        position: relative;
        box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        animation: authSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
      }
      @keyframes authSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      .auth-login-modal::before {
        content: '';
        position: absolute; top: -10px; left: 0; right: 0; height: 14px;
        background: #faf6ee;
        clip-path: polygon(0% 100%,2% 0%,5% 100%,8% 0%,11% 100%,14% 0%,17% 100%,20% 0%,23% 100%,26% 0%,29% 100%,32% 0%,35% 100%,38% 0%,41% 100%,44% 0%,47% 100%,50% 0%,53% 100%,56% 0%,59% 100%,62% 0%,65% 100%,68% 0%,71% 100%,74% 0%,77% 100%,80% 0%,83% 100%,86% 0%,89% 100%,92% 0%,95% 100%,98% 0%,100% 100%,100% 100%,0% 100%);
      }
      .auth-modal-pin {
        position: absolute; top: -18px; left: 50%; transform: translateX(-50%);
        width: 14px; height: 14px; border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #ff6b6b, #cc2222);
        box-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 2;
      }
      .auth-modal-pin::after {
        content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
        width: 2px; height: 10px; background: linear-gradient(to bottom,#888,#444);
      }
      .auth-modal-close {
        position: absolute; top: 12px; right: 14px;
        font-family: 'Press Start 2P', monospace; font-size: 0.26rem;
        color: #a09078; cursor: pointer; background: none; border: none;
        letter-spacing: 1px;
      }
      .auth-modal-eyebrow {
        font-family: 'Press Start 2P', monospace; font-size: 0.3rem;
        color: #e8681a; letter-spacing: 3px; margin-bottom: 10px;
      }
      .auth-modal-title {
        font-family: 'Caveat', cursive; font-size: 1.8rem;
        color: #1a1208; font-weight: 600; margin-bottom: 8px; line-height: 1.2;
      }
      .auth-modal-desc {
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.8rem; color: #6a5840; line-height: 1.65; margin-bottom: 24px;
      }
      .auth-google-btn {
        width: 100%; padding: 12px 16px;
        background: #fff; border: 1.5px solid rgba(26,18,8,0.15);
        display: flex; align-items: center; justify-content: center; gap: 10px;
        cursor: pointer; transition: all 0.2s; border-radius: 3px;
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.88rem; color: #1a1208; font-weight: 500;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      .auth-google-btn:hover { border-color: #e8681a; box-shadow: 0 4px 16px rgba(232,104,26,0.15); transform: translateY(-1px); }
      .auth-google-btn svg { flex-shrink: 0; }
      .auth-modal-note {
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.7rem; color: #a09078; text-align: center;
        margin-top: 14px; line-height: 1.5;
      }

      /* ── Confirm delete modal ── */
      .auth-confirm-bg {
        position: fixed; inset: 0; z-index: 10001;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
      }
      .auth-confirm-box {
        background: #faf6ee; max-width: 360px; width: calc(100% - 40px);
        padding: 28px 28px 24px; box-shadow: 0 16px 60px rgba(0,0,0,0.5);
      }
      .auth-confirm-title {
        font-family: 'Caveat', cursive; font-size: 1.5rem;
        color: #1a1208; margin-bottom: 8px; font-weight: 600;
      }
      .auth-confirm-desc {
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.8rem; color: #6a5840; margin-bottom: 20px; line-height: 1.6;
      }
      .auth-confirm-btns { display: flex; gap: 10px; }
      .auth-confirm-cancel {
        flex: 1; padding: 10px; background: transparent;
        border: 1px solid rgba(26,18,8,0.15); color: #6a5840;
        font-family: 'DM Sans', system-ui, sans-serif; font-size: 0.82rem;
        cursor: pointer; border-radius: 2px; transition: all 0.15s;
      }
      .auth-confirm-cancel:hover { background: rgba(26,18,8,0.05); }
      .auth-confirm-delete {
        flex: 1; padding: 10px; background: #c0392b;
        border: none; color: #fff;
        font-family: 'DM Sans', system-ui, sans-serif; font-size: 0.82rem;
        cursor: pointer; border-radius: 2px; transition: all 0.15s;
      }
      .auth-confirm-delete:hover { background: #e74c3c; }

      @media(max-width:480px) {
        .auth-user-btn .auth-user-name { display: none; }
        .auth-login-modal { padding: 28px 20px 24px; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Create nav auth slot ─────────────────────────────
  // Looks for an element with id="authSlot" in the nav,
  // or appends to the nav directly
  let slot = navEl.querySelector("#authSlot") || navEl;

  // ── Signed-out state ─────────────────────────────────
  function renderSignedOut() {
    slot.innerHTML = `
      <button class="auth-nav-btn" id="authSignInBtn">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="8.5" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
          <path d="M9 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-4 4.5a4 4 0 018 0" stroke="rgba(255,255,255,0.7)" stroke-width="1" stroke-linecap="round"/>
        </svg>
        Sign in
      </button>`;
    document.getElementById("authSignInBtn")?.addEventListener("click", () => showLoginModal());
  }

  // ── Signed-in state ──────────────────────────────────
  function renderSignedIn(user) {
    const name = getDisplayName(user);
    const photo = user.photoURL || "";
    slot.innerHTML = `
      <div class="auth-user-wrap" id="authUserWrap">
        <button class="auth-user-btn" id="authUserBtn">
          ${photo
            ? `<img src="${photo}" alt="${name}" referrerpolicy="no-referrer">`
            : `<div style="width:26px;height:26px;border-radius:50%;background:#e8681a;display:flex;align-items:center;justify-content:center;font-family:'Caveat',cursive;font-size:1rem;color:#fff;font-weight:700">${name[0].toUpperCase()}</div>`
          }
          <span class="auth-user-name">${name.split(" ")[0]}</span>
          <span class="auth-chevron">▾</span>
        </button>
        <div class="auth-dropdown" id="authDropdown">
          <div class="auth-dropdown-header">
            <span class="auth-dropdown-name">${name}</span>
            <span class="auth-dropdown-email">${user.email || ""}</span>
          </div>
          <a class="auth-dropdown-item" href="dashboard.html">
            <span>📌</span> My Board
          </a>
          <button class="auth-dropdown-item danger" id="authSignOutBtn">
            <span>↪</span> Sign out
          </button>
        </div>
      </div>`;

    document.getElementById("authUserBtn")?.addEventListener("click", e => {
      e.stopPropagation();
      document.getElementById("authDropdown")?.classList.toggle("open");
    });
    document.addEventListener("click", () => {
      document.getElementById("authDropdown")?.classList.remove("open");
    }, { once: false });
    document.getElementById("authSignOutBtn")?.addEventListener("click", async () => {
      await signOut();
      if (onSignOut) onSignOut();
    });
  }

  // ── Auth state watcher ───────────────────────────────
  onAuthChange(user => {
    if (user) {
      renderSignedIn(user);
      if (onSignIn) onSignIn(user);
    } else {
      renderSignedOut();
      if (requireAuth) showLoginModal({ closeable: false, prompt: loginPrompt });
      if (onSignOut) onSignOut();
    }
  });
}

// ════════════════════════════════════════════════════════
//  showLoginModal(options)
//  Can be called standalone from any page
// ════════════════════════════════════════════════════════
export function showLoginModal(options = {}) {
  const {
    closeable = true,
    prompt = "Sign in to share your story, pin yourself on the crew wall, or add photos to the gallery.",
    onSuccess
  } = options;

  // Remove existing modal if any
  document.getElementById("authLoginModalBg")?.remove();

  const bg = document.createElement("div");
  bg.className = "auth-login-modal-bg";
  bg.id = "authLoginModalBg";
  bg.innerHTML = `
    <div class="auth-login-modal">
      <div class="auth-modal-pin"></div>
      ${closeable ? `<button class="auth-modal-close" id="authModalClose">[ close ]</button>` : ""}
      <div class="auth-modal-eyebrow">// JOIN IN</div>
      <div class="auth-modal-title">Welcome to HlyWor</div>
      <p class="auth-modal-desc">${prompt}</p>
      <button class="auth-google-btn" id="authGoogleBtn">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
          <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
        </svg>
        Continue with Google
      </button>
      <p class="auth-modal-note">No password needed. Your Google account keeps you signed in across all of HlyWor.</p>
    </div>`;

  document.body.appendChild(bg);

  if (closeable) {
    document.getElementById("authModalClose")?.addEventListener("click", () => bg.remove());
    bg.addEventListener("click", e => { if (e.target === bg) bg.remove(); });
  }

  document.getElementById("authGoogleBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("authGoogleBtn");
    btn.textContent = "Opening Google...";
    btn.disabled = true;
    const user = await signIn();
    if (user) {
      bg.remove();
      if (onSuccess) onSuccess(user);
    } else {
      btn.disabled = false;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/><path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/></svg> Continue with Google`;
    }
  });
}

// ════════════════════════════════════════════════════════
//  showConfirmDelete(message) → Promise<boolean>
//  Reusable confirm dialog for deletes
// ════════════════════════════════════════════════════════
export function showConfirmDelete(message = "This can't be undone.") {
  return new Promise(resolve => {
    document.getElementById("authConfirmBg")?.remove();
    const bg = document.createElement("div");
    bg.className = "auth-confirm-bg";
    bg.id = "authConfirmBg";
    bg.innerHTML = `
      <div class="auth-confirm-box">
        <div class="auth-confirm-title">Are you sure?</div>
        <p class="auth-confirm-desc">${message}</p>
        <div class="auth-confirm-btns">
          <button class="auth-confirm-cancel" id="authConfirmCancel">Cancel</button>
          <button class="auth-confirm-delete" id="authConfirmOk">Yes, delete it</button>
        </div>
      </div>`;
    document.body.appendChild(bg);
    document.getElementById("authConfirmCancel")?.addEventListener("click", () => { bg.remove(); resolve(false); });
    document.getElementById("authConfirmOk")?.addEventListener("click", () => { bg.remove(); resolve(true); });
  });
}

// ════════════════════════════════════════════════════════
//  requireLogin(prompt) → Promise<user|null>
//  Call before any write action. Resolves with user
//  if signed in, shows modal + resolves when they sign in,
//  or resolves null if they close the modal.
// ════════════════════════════════════════════════════════
export function requireLogin(prompt) {
  return new Promise(resolve => {
    if (currentUser) { resolve(currentUser); return; }
    showLoginModal({
      closeable: true,
      prompt,
      onSuccess: user => resolve(user)
    });
    // If modal is closed without signing in
    const observer = new MutationObserver(() => {
      if (!document.getElementById("authLoginModalBg")) {
        observer.disconnect();
        if (!currentUser) resolve(null);
      }
    });
    observer.observe(document.body, { childList: true });
  });
}

export { auth };