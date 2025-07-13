// Initialize AOS
AOS.init({
    duration: 800, // animation duration
    once: false,    // whether animation should happen only once - while scrolling down
    mirror: true // Whether elements should animate out while scrolling past them
});

// Sticky Navbar Logic
// const navbar = document.getElementById('navbar');
// const heroSection = document.getElementById('hero');
// const heroHeight = heroSection.offsetHeight; // Get height of hero section

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Adjust 50px for a smoother transition
        navbar.classList.add('md:bg-white/90', 'md:dark:bg-gray-900/90', 'md:shadow-md');
        navbar.classList.remove('py-3');
    } else {
        navbar.classList.remove('md:bg-white/90', 'md:dark:bg-gray-900/90', 'md:shadow-md');
        navbar.classList.add('py-3');
    }

    // Show/hide back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (window.scrollY > 300) { // Show button after scrolling 300px
        backToTopBtn.classList.remove('opacity-0', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        backToTopBtn.classList.add('opacity-0', 'translate-y-4');
    }

    // Scroll progress indicator
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (mobileMenu.classList.contains('block')) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
    });
});

// Back to Top Button functionality
document.getElementById('backToTopBtn').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('darkModeToggle');
const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const mobileSunIcon = document.getElementById('mobileSunIcon');
const mobileMoonIcon = document.getElementById('mobileMoonIcon');

// Function to set theme
function setTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        mobileSunIcon.classList.remove('hidden');
        mobileMoonIcon.classList.add('hidden');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        mobileSunIcon.classList.add('hidden');
        mobileMoonIcon.classList.remove('hidden');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference or system preference on load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
} else {
    setTheme(false);
}

// Event listeners for dark mode toggles
darkModeToggle.addEventListener('click', () => {
    setTheme(!document.documentElement.classList.contains('dark'));
});
mobileDarkModeToggle.addEventListener('click', () => {
    setTheme(!document.documentElement.classList.contains('dark'));
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('block');
});

// Modal Logic
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    // Animate modal in
    setTimeout(() => {
        modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
        modal.querySelector('div').classList.add('scale-100', 'opacity-100');
    }, 50);
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    // Animate modal out
    modal.querySelector('div').classList.remove('scale-100', 'opacity-100');
    modal.querySelector('div').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Match transition duration
}

// Close modal when clicking outside
document.querySelectorAll('.fixed.inset-0.bg-opacity-50').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === this) {
            hideModal(this.id);
        }
    });
});
