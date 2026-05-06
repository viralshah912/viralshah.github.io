// ==================== CAROUSEL STATE ====================
let currentLanguage = 'english';
let currentSlide = 0;
let slides = [];

// Screenshots organized by language
const screenshots = {
    english: [
        'images/gsrtc/English/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.40.png',
        'images/gsrtc/English/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.42.png',
        'images/gsrtc/English/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.45.png',
        'images/gsrtc/English/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.53.png',
        'images/gsrtc/English/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.55.png'
    ],
    hindi: [
        'images/gsrtc/Hindi/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.40.png',
        'images/gsrtc/Hindi/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.42.png',
        'images/gsrtc/Hindi/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.45.png',
        'images/gsrtc/Hindi/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.53.png',
        'images/gsrtc/Hindi/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.55.png'
    ],
    gujarati: [
        'images/gsrtc/Gujarati/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.40.png',
        'images/gsrtc/Gujarati/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.42.png',
        'images/gsrtc/Gujarati/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.45.png',
        'images/gsrtc/Gujarati/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.53.png',
        'images/gsrtc/Gujarati/Simulator Screenshot - iPhone 17 Pro - 2026-05-06 at 14.33.55.png'
    ]
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function () {
    initializeCarousel();
    setupMobileMenu();
    setupSmoothScroll();
});

// ==================== CAROUSEL FUNCTIONS ====================
function initializeCarousel() {
    slides = screenshots[currentLanguage];
    renderCarousel();
}

function renderCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    const carouselDots = document.getElementById('carouselDots');

    // Clear existing content
    carouselInner.innerHTML = '';
    carouselDots.innerHTML = '';

    // Create image elements
    slides.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide;
        img.alt = `Screenshot ${index + 1}`;
        img.onerror = function () {
            img.alt = `Screenshot ${index + 1} - Unable to load`;
        };
        carouselInner.appendChild(img);

        // Create dots
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        carouselDots.appendChild(dot);
    });

    // Position carousel
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const carouselInner = document.getElementById('carouselInner');
    const offset = -currentSlide * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;

    // Update active dot
    const dots = document.querySelectorAll('.carousel-dots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarouselPosition();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarouselPosition();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarouselPosition();
}

function switchLanguage(language) {
    currentLanguage = language;
    currentSlide = 0;
    slides = screenshots[currentLanguage];
    renderCarousel();
}

// ==================== MOBILE MENU ====================
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.style.display = 'none';
            });
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[class*="animation"]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.8s ease';
    observer.observe(el);
});