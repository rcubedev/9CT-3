// Mobile menu toggle
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});


document.querySelectorAll('.dropdown').forEach(dropdown => {
    const details = dropdown.querySelector('.dropdown__details');
    const content = dropdown.querySelector('.dropdown__content');
    if (!details || !content) return;

    // Helper to set the CSS variable on the parent .dropdown
    function setDropdownMaxHeight() {
        if (details.open) {
            dropdown.style.setProperty('--dropdown-max-height', content.scrollHeight + 'px');
        } else {
            dropdown.style.removeProperty('--dropdown-max-height');
        }
    }

    // Initialise on load
    setDropdownMaxHeight();

    // Update whenever <details> is toggled
    details.addEventListener('toggle', setDropdownMaxHeight);
});


// // Add fade-in animation to elements when they come into view
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('fade-in');
//         }
//     });
// }, {threshold: 0.1});

// document.querySelectorAll('.page').forEach(page => {
//     observer.observe(page);
// });
