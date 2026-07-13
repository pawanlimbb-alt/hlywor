"""
Run this once in the same folder as your index.html:
    python3 patch_index.py

It will:
  1. Add a static A-ADS iframe right after <body> — visible to the A-ADS bot crawler
  2. Inject an ad card into the pinboard at position 3 — blends with post cards
  3. Add the needed CSS for the ad card
  4. Update firebase.json CSP to allow acceptable.a-ads.com frames
  5. Save index.html (backs up original to index.html.bak)
"""

import re, shutil, os

INDEX = "index.html"
FIREBASE = "firebase.json"

if not os.path.exists(INDEX):
    print(f"ERROR: {INDEX} not found. Run this script in the same folder as index.html.")
    exit(1)

shutil.copy(INDEX, INDEX + ".bak")
print(f"✅ Backed up original to {INDEX}.bak")

with open(INDEX, "r", encoding="utf-8") as f:
    html = f.read()

# ── CHANGE 1: Static bot-visible iframe right after <body> ──────────────────
BOT_AD = '''
  <!-- BEGIN AADS AD UNIT 2446799 — Static, bot-visible -->
  <!-- Invisible to users; exists so the A-ADS crawler verifies the unit -->
  <div style="position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;" aria-hidden="true">
    <iframe data-aa='2446799' src='//acceptable.a-ads.com/2446799/?size=Adaptive'
      style='border:0;padding:0;width:1px;height:1px;' title="Advertisement"></iframe>
  </div>
  <!-- END AADS AD UNIT 2446799 — Static -->
'''

BODY_TARGET = '<a href="#posts" class="skip-link">Skip to content</a>'
if BODY_TARGET in html and 'BEGIN AADS' not in html:
    html = html.replace(
        BODY_TARGET,
        BODY_TARGET + BOT_AD
    )
    print("✅ Change 1: Static bot-visible iframe added after <body>")
elif 'BEGIN AADS' in html:
    print("⚠️  Change 1: A-ADS static block already present, skipped")
else:
    print("❌ Change 1: Could not find insertion point. Check your <body> tag.")

# ── CHANGE 2: CSS for ad card ────────────────────────────────────────────────
AD_CSS = '''
    /* ── A-ADS pinboard ad card ── */
    .ad-card-pin {
      background: var(--paper);
      box-shadow: var(--pin-shadow);
      position: relative;
      cursor: default;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .ad-card-pin:hover {
      transform: rotate(0deg) translateY(-4px) scale(1.01) !important;
      box-shadow: 0 12px 32px rgba(0,0,0,0.4);
      z-index: 10;
    }
    .ad-card-label {
      font-family: var(--pixel);
      font-size: 0.2rem;
      color: var(--ink3);
      letter-spacing: 2px;
      opacity: 0.45;
      padding: 12px 14px 4px;
      display: block;
    }
    .ad-card-footer {
      font-family: var(--hand);
      font-size: 0.75rem;
      color: var(--ink3);
      font-style: italic;
      padding: 6px 14px 12px;
      border-top: 1px dashed rgba(26,18,8,0.1);
      margin-top: 6px;
    }
'''

CSS_TARGET = '    /* ✅ Captivation Tweaks */'
if CSS_TARGET in html and 'ad-card-pin' not in html:
    html = html.replace(CSS_TARGET, AD_CSS + '\n' + CSS_TARGET)
    print("✅ Change 2: Ad card CSS added")
elif 'ad-card-pin' in html:
    print("⚠️  Change 2: Ad card CSS already present, skipped")
else:
    print("❌ Change 2: Could not find CSS insertion point")

# ── CHANGE 3: Inject ad card at position 2 inside renderPosts ───────────────
AD_CARD_JS = r"""
        // ── A-ADS ad card at position 3 ─────────────────────────────────
        if (i === 2) {
          const adCard = document.createElement('div');
          adCard.className = 'ad-card-pin';
          adCard.style.cssText = '--rot:1.1deg; transform:rotate(1.1deg);';
          adCard.setAttribute('role', 'listitem');
          adCard.setAttribute('aria-label', 'Sponsored');
          adCard.innerHTML = `
            <div class="post-pin" style="left:50%;background:radial-gradient(circle at 35% 35%,#ffd700,#b8860b);" aria-hidden="true"></div>
            <span class="ad-card-label">// SPONSORED</span>
            <div style="padding:0 14px;">
              <iframe data-aa='2446799' src='//acceptable.a-ads.com/2446799/?size=Adaptive'
                style='border:0;padding:0;width:100%;height:220px;overflow:hidden;display:block;'
                title="Advertisement" loading="lazy"></iframe>
            </div>
            <div class="ad-card-footer">Ads keep HlyWor free ✦</div>`;
          grid.appendChild(adCard);
          requestAnimationFrame(() => ro.observe(adCard));
        }
        // ── End ad card ──────────────────────────────────────────────────
"""

# Target the line just before grid.appendChild(card)
FOREACH_TARGET = "        grid.appendChild(card);"
if FOREACH_TARGET in html and 'A-ADS ad card at position 3' not in html:
    html = html.replace(
        FOREACH_TARGET,
        AD_CARD_JS + FOREACH_TARGET
    )
    print("✅ Change 3: Ad card JS injected into renderPosts")
elif 'A-ADS ad card at position 3' in html:
    print("⚠️  Change 3: Ad card JS already present, skipped")
else:
    print("❌ Change 3: Could not find grid.appendChild(card) in renderPosts")

with open(INDEX, "w", encoding="utf-8") as f:
    f.write(html)
print(f"\n✅ {INDEX} saved successfully!")

# ── CHANGE 4: Update firebase.json CSP ──────────────────────────────────────
import json

if os.path.exists(FIREBASE):
    with open(FIREBASE, "r") as f:
        fb = json.load(f)

    headers = fb.get("hosting", {}).get("headers", [])
    updated = False
    for h in headers:
        for header in h.get("headers", []):
            if header.get("key") == "Content-Security-Policy":
                val = header["value"]
                if "acceptable.a-ads.com" not in val:
                    # Add frame-src or append to existing
                    if "frame-src" in val:
                        val = val.replace("frame-src", "frame-src https://acceptable.a-ads.com")
                    else:
                        val = val.rstrip(";") + "; frame-src 'self' https://acceptable.a-ads.com;"
                    header["value"] = val
                    updated = True

    if updated:
        with open(FIREBASE, "w") as f:
            json.dump(fb, f, indent=2)
        print("✅ Change 4: firebase.json CSP updated with acceptable.a-ads.com")
    else:
        print("⚠️  Change 4: firebase.json CSP already has acceptable.a-ads.com or couldn't be found")
else:
    print(f"⚠️  Change 4: {FIREBASE} not found — place the firebase.json (from earlier) in the same folder")

print("\n🎉 Done! Deploy with: firebase deploy --only hosting")
print("Then verify on A-ADS at: https://hlywor.fun/")