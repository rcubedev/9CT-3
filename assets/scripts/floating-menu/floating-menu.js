
class FloatingMenu {
    constructor(menuSelector, buttonSelector, darkToggleSelector) {
        this.menu = document.querySelector(menuSelector);
        this.toggleButtons = Array.from(document.querySelectorAll(buttonSelector));
        this.darkToggle = document.querySelector(darkToggleSelector);
        if (!this.menu) return;
        this.init();
    }

    setButtonOpenState(open) {
        this.toggleButtons.forEach(b => {
            b.classList.toggle('active', open);
        });
    }

    openMenu() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
        this.menu.classList.remove('floating-menu--closing');
        this.menu.classList.add('active');
        this.setButtonOpenState(true);
    }

    closeMenu() {
        this.menu.classList.remove('active');
        this.menu.classList.add('floating-menu--closing');
        this.setButtonOpenState(false);
    }

    toggleMenu() {
        if (this.menu.classList.contains('active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    handleButtonEvents(btn) {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            this.toggleMenu();
        });
        btn.addEventListener('mouseenter', () => this.openMenu());
        btn.addEventListener('mouseleave', e => {
            if (this.closeTimer) clearTimeout(this.closeTimer);
            const to = e.relatedTarget;
            this.closeTimer = setTimeout(() => {
                // Only close if not moving to menu or another button
                if (!(to && (this.menu.contains(to) || this.toggleButtons.some(b => b.contains(to))))) {
                    this.closeMenu();
                }
                this.closeTimer = null;
            }, 150);
        });
    }

    handleMenuEvents() {
        this.menu.addEventListener('mouseenter', () => this.openMenu());
        this.menu.addEventListener('mouseleave', e => {
            if (this.closeTimer) clearTimeout(this.closeTimer);
            const to = e.relatedTarget;
            this.closeTimer = setTimeout(() => {
                // Only close if not moving to button or another menu
                if (!(to && (this.menu.contains(to) || this.toggleButtons.some(b => b.contains(to))))) {
                    this.closeMenu();
                }
                this.closeTimer = null;
            }, 150);
        });
    }

    handleDocumentEvents() {
        document.addEventListener('click', e => {
            if (!this.menu.contains(e.target) && !this.toggleButtons.some(b => b.contains(e.target))) {
                if (this.menu.classList.contains('floating-menu--open')) this.closeMenu();
            }
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.menu.classList.contains('floating-menu--open')) {
                this.closeMenu();
            }
        });
    }

    applyDarkClass(enabled) {
        document.documentElement.classList.toggle('dark', !!enabled);
    }

    handleDarkMode() {
        try {
            const saved = localStorage.getItem('site-dark-mode');
            const enabled = saved === '1';
            if (this.darkToggle) this.darkToggle.checked = enabled;
            this.applyDarkClass(enabled);
        } catch (err) {}
        if (this.darkToggle) {
            this.darkToggle.addEventListener('change', () => {
                const enabled = !!this.darkToggle.checked;
                this.applyDarkClass(enabled);
                try {
                    localStorage.setItem('site-dark-mode', enabled ? '1' : '0');
                } catch (err) {}
            });
        }
    }

    init() {
        this.toggleButtons.forEach(btn => this.handleButtonEvents(btn));
        this.handleMenuEvents();
        this.handleDocumentEvents();
        this.handleDarkMode();
    }
}

new FloatingMenu('#floating-menu', '.floating-menu-button', '#dark-toggle');
