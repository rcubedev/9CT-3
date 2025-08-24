(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // include the top nav mobile button so it toggles the floating menu on mobile
        var toggleButtons = Array.prototype.slice.call(document.querySelectorAll('.floating-hamburger, .nav__mobile-button__button'));
        var menu = document.getElementById('floating-menu');
        var darkToggle = document.getElementById('dark-toggle');
        var closeDelay = 250;
        var closeTimer = null;

        if (!menu) return;

        function setButtonOpenState(open) {
            toggleButtons.forEach(function (b) {
                b.classList.toggle('floating-hamburger--open', open);
                b.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        }

        function openMenu() {
            clearTimeout(closeTimer);
            menu.classList.remove('floating-menu--closing');
            menu.classList.add('floating-menu--open');
            menu.setAttribute('aria-hidden', 'false');
            setButtonOpenState(true);
            // focus first interactive element for accessibility
            var focusable = menu.querySelector('input, a, button, [tabindex]');
            if (focusable) focusable.focus();
        }

        function closeMenu(immediate) {
            clearTimeout(closeTimer);
            if (immediate) {
                menu.classList.remove('floating-menu--open', 'floating-menu--closing');
                menu.setAttribute('aria-hidden', 'true');
                setButtonOpenState(false);
                return;
            }
            menu.classList.remove('floating-menu--open');
            menu.classList.add('floating-menu--closing');
            menu.setAttribute('aria-hidden', 'true');
            setButtonOpenState(false);
            closeTimer = setTimeout(function () {
                menu.classList.remove('floating-menu--closing');
            }, 200);
        }

        function toggleMenu() {
            if (menu.classList.contains('floating-menu--open')) closeMenu(); else openMenu();
        }

        // attach toggle to button clicks
        toggleButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleMenu();
            });

            // open on hover, close shortly after mouse leaves both button/menu
            btn.addEventListener('mouseenter', openMenu);
            btn.addEventListener('mouseleave', function () {
                // start close timer only if pointer leaves both button and menu
                closeTimer = setTimeout(function () {
                    if (!menu.matches(':hover')) closeMenu();
                }, closeDelay);
            });
        });

        // menu hover behaviour to keep it open
        menu.addEventListener('mouseenter', function () {
            clearTimeout(closeTimer);
            openMenu();
        });
        menu.addEventListener('mouseleave', function () {
            closeTimer = setTimeout(function () {
                if (!toggleButtons.some(function (b) { return b.matches(':hover'); })) closeMenu();
            }, closeDelay);
        });

        // close on outside click
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !toggleButtons.some(function (b) { return b.contains(e.target); })) {
                if (menu.classList.contains('floating-menu--open')) closeMenu();
            }
        });

        // close on ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('floating-menu--open')) {
                closeMenu(true);
            }
        });

        // Dark mode persistence and initialization
        function applyDarkClass(enabled) {
            document.documentElement.classList.toggle('dark', !!enabled);
        }

        try {
            var saved = localStorage.getItem('site-dark-mode');
            var enabled = saved === '1';
            if (darkToggle) darkToggle.checked = enabled;
            applyDarkClass(enabled);
        } catch (err) { /* ignore storage errors */ }

        if (darkToggle) {
            darkToggle.addEventListener('change', function () {
                var enabled = !!darkToggle.checked;
                applyDarkClass(enabled);
                try {
                    localStorage.setItem('site-dark-mode', enabled ? '1' : '0');
                } catch (err) {}
            });
        }
    });
})();
