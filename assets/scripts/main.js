function initMobileMenu(btnSelector, menuSelector) {
  const btn = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}

function initDropdowns(dropdownSelector) {
  document.querySelectorAll(dropdownSelector).forEach(dropdown => {
    const details = dropdown.querySelector('.dropdown__details');
    const content = dropdown.querySelector('.dropdown__content');
    if (!details || !content) return;

    setDropdownMaxHeight(dropdown, details, content);

    details.addEventListener('toggle', () => setDropdownMaxHeight(dropdown, details, content));
  });
}

// Helper: Set the CSS variable on the parent .dropdown
function setDropdownMaxHeight(dropdown, details, content) {
  if (!dropdown || !details || !content) return;
  if (details.open) {
    dropdown.style.setProperty('--dropdown-max-height', content.scrollHeight + 'px');
  } else {
    dropdown.style.removeProperty('--dropdown-max-height');
  }
}

// Add fade-in animation to elements when they come into view
function initFadeInOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {threshold: 0.1});

  document.querySelectorAll('.page').forEach(page => {
    observer.observe(page);
  });
}

initMobileMenu("button.mobile-menu-button", ".mobile-menu");
initDropdowns(".dropdown");
initFadeInOnScroll();