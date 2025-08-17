// Lightweight game popup: lazy-load iframe, open/close, focus restore
class Popup {
  constructor(btnSelector = '#play', popupSelector = '.popup') {
    this.btn = document.querySelector(btnSelector);
    this.popup = document.querySelector(popupSelector);
    if (!this.btn || !this.popup) return;

    this.overlay = this.popup.querySelector('.popup__overlay');
    this.closeBtns = this.popup.querySelectorAll('.popup__close');
    this.iframe = this.popup.querySelector('iframe');
    this.lastFocused = null;

    // bind handlers so we can add/remove listeners reliably
    this.onKey = this.onKey.bind(this);
    this.onAnimEnd = this.onAnimEnd.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.init();
  }

  init() {
    this.btn.addEventListener('click', (e) => { e.preventDefault(); this.open(); });
    if (this.overlay) this.overlay.addEventListener('click', this.close);
    this.closeBtns.forEach(b => b.addEventListener('click', this.close));
  }

  open() {
    this.lastFocused = document.activeElement;
  this.popup.classList.add('popup--open');
    this.popup.classList.add('active');

    // lazy-load iframe
    if (this.iframe && !this.iframe.dataset.loaded) {
      const src = this.iframe.dataset.src || this.iframe.getAttribute('data-src') || '';
      if (src) {
        this.iframe.src = src;
        this.iframe.dataset.loaded = 'true';
      }
    }

    // trap focus lightly
    const focusable = this.popup.querySelectorAll('button, a, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
    document.addEventListener('keydown', this.onKey);
  }

  close() {
    // play closing animation then remove open state
  this.popup.classList.add('popup--closing');
    // ensure open class removed so open animations don't conflict
  this.popup.classList.remove('popup--open');

    // listen for animation end on popup to teardown
    this.popup.addEventListener('animationend', this.onAnimEnd);

    // fallback: if animation doesn't fire, teardown after a short timeout
    this._fallback = setTimeout(() => {
      if (this.popup.classList.contains('popup--closing')) this.teardown();
    }, 35000);
  }

  teardown() {
    clearTimeout(this._fallback);
  this.popup.classList.remove('popup--closing');
    this.popup.classList.remove('active');
    // unload iframe to stop audio
    if (this.iframe && this.iframe.dataset.loaded) {
      this.iframe.removeAttribute('src');
      delete this.iframe.dataset.loaded;
    }
    if (this.lastFocused && this.lastFocused.focus) this.lastFocused.focus();
    document.removeEventListener('keydown', this.onKey);
    this.popup.removeEventListener('animationend', this.onAnimEnd);
  }

  onAnimEnd(e) {
  // wait for the window/overlay animation to finish
  const win = this.popup.querySelector('.popup__window');
  const ov = this.popup.querySelector('.popup__overlay');
    if (e.target === win || e.target === ov) {
      this.teardown();
    }
  }

  onKey(e) {
    if (e.key === 'Escape') return this.close();
    // simple tab trap
    if (e.key === 'Tab') {
      const focusables = Array.from(this.popup.querySelectorAll('button, a, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }
}

// instantiate to wire up behavior (follows carousel.js pattern)
new Popup();
