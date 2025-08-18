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

// auto-init
initFadeInOnScroll();
