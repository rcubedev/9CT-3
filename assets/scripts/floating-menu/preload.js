// Preload dark mode preference before CSS loads to prevent FOUC
function preloadTheme() {
    try {
        var enabled = localStorage.getItem('site-dark-mode') === '1';
        if (enabled) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (err) {}
}
preloadTheme();
