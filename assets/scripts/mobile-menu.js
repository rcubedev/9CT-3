// Mobile menu toggling
function initMobileMenu(btnSelector, menuSelector) {
  const btn = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

initMobileMenu('button.mobile-menu-button', '.mobile-menu');
