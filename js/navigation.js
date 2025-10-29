document.addEventListener('DOMContentLoaded', () => {
  // Collect focusable/navigable items across the whole page
  let items = Array.from(document.querySelectorAll('a, button, .tab-button, .back-button, .anime-card'))
    .filter(el => el && el.offsetParent !== null && !el.hasAttribute('disabled'));

  // Make non-natively focusable elements keyboard focusable
  items.forEach(el => {
    if (!['A', 'BUTTON'].includes(el.tagName)) {
      el.setAttribute('tabindex', '0');
    }
  });

  if (items.length === 0) return;

  let selectedIndex = 0;
  items[selectedIndex].classList.add('selected');

  function updateSelection(newIndex) {
    if (!items.length) return;
    items[selectedIndex].classList.remove('selected');
    selectedIndex = newIndex;
    items[selectedIndex].classList.add('selected');
    // Move focus for accessibility
    try { items[selectedIndex].focus({ preventScroll: true }); } catch (e) {}
  }

  // Recompute items on layout/content changes (basic: when window resizes)
  function refreshItems() {
    const prev = items[selectedIndex];
    items = Array.from(document.querySelectorAll('a, button, .tab-button, .back-button, .anime-card'))
      .filter(el => el && el.offsetParent !== null && !el.hasAttribute('disabled'));
    items.forEach(el => { if (!['A','BUTTON'].includes(el.tagName)) el.setAttribute('tabindex', '0'); });
    if (items.length === 0) return;
    const keepIndex = Math.max(0, items.indexOf(prev));
    selectedIndex = keepIndex >= 0 ? keepIndex : 0;
    items.forEach(el => el.classList.remove('selected'));
    items[selectedIndex].classList.add('selected');
  }

  window.addEventListener('resize', refreshItems);

  document.addEventListener('keydown', (e) => {
    // Don’t hijack keys when typing in inputs/textareas or with modifiers
    const tag = document.activeElement && document.activeElement.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable);
    if (isTyping || e.altKey || e.ctrlKey || e.metaKey) return;

    if (!items.length) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        updateSelection((selectedIndex + 1) % items.length);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        updateSelection((selectedIndex - 1 + items.length) % items.length);
        break;
      case 'Enter':
        e.preventDefault();
        const item = items[selectedIndex];
        if (item) item.click();
        break;
    }
  });
});

