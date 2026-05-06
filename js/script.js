// ==================== MOBILE MENU ==================== //
document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    setupNavigation();
    setupAnimations();
});

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.style.display = 'none';
                hamburger.classList.remove('active');
            });
        });
    }
}

// ==================== SMOOTH SCROLLING ==================== //
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== ANIMATIONS ON SCROLL ==================== //
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-card, .project-showcase, .skill-group, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = '0.8s ease';
        observer.observe(el);
    });
}

// ==================== NAVBAR SCROLL EFFECT ==================== //
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ==================== SCROLL TO TOP BUTTON (Optional) ==================== //
function showScrollTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top-btn';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0066ff, #00d9ff);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', function () {
        scrollButton.style.display = window.scrollY > 300 ? 'flex' : 'none';
        scrollButton.style.alignItems = 'center';
        scrollButton.style.justifyContent = 'center';
    });

    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollButton.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.4)';
    });

    scrollButton.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.3)';
    });
}

showScrollTopButton();

// ==================== PERFORMANCE OPTIMIZATION ==================== //
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== ACTIVE NAV LINK ==================== //
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== FORM HANDLING (if contact form added) ==================== //
function handleContactForm(e) {
    if (e) {
        e.preventDefault();
        // Add your form submission logic here
    }
}

// ==================== RESPONSIVE CHECKS ==================== //
function isDesktop() {
    return window.innerWidth > 768;
}

function isTablet() {
    return window.innerWidth > 480 && window.innerWidth <= 768;
}

function isMobile() {
    return window.innerWidth <= 480;
}

// ==================== CURSOR EFFECT (Premium) ==================== //
document.addEventListener('mousemove', function (e) {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    // You can add custom cursor effects here
    document.documentElement.style.setProperty('--cursor-x', cursorX + 'px');
    document.documentElement.style.setProperty('--cursor-y', cursorY + 'px');
});

console.log('✨ Portfolio loaded successfully!');
console.log('📱 Fully responsive design');
console.log('🎨 Modern animations enabled');