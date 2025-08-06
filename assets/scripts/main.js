// Mobile menu toggle
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

// // Page navigation
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
        
//         // Hide all pages
//         document.querySelectorAll('.page').forEach(page => {
//             page.classList.add('hidden');
//         });
        
//         // Show selected page
//         const targetId = this.getAttribute('href');
//         const targetPage = document.querySelector(targetId);
//         if (targetPage) {
//             targetPage.classList.remove('hidden');
            
//             // Update active nav link
//             document.querySelectorAll('.nav-link').forEach(link => {
//                 link.classList.remove('active', 'text-blue-500');
//                 link.classList.add('text-gray-500');
//             });
            
//             if (targetId !== '#home') {
//                 this.classList.add('active', 'text-blue-500');
//                 this.classList.remove('text-gray-500');
//             } else {
//                 document.querySelector('.nav-link[href="#home"]').classList.add('active', 'text-blue-500');
//             }

//             // Close mobile menu if open
//             menu.classList.add('hidden');
            
//             // Scroll to top
//             window.scrollTo(0, 0);
//         }
//     });
// });

// // Set home as default page
// window.addEventListener('load', () => {
//     document.querySelector('.page').classList.remove('hidden');
// });

// Add fade-in animation to elements when they come into view
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
