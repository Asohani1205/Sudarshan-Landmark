// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Remove page loader when page is loaded
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.display = 'none';
    }

    // Project filters functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Initialize Swiper for Hero Slider
const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Initialize Lightbox for Gallery
const lightbox = GLightbox({
    selector: '.gallery-item',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
});

// Smooth Scroll for Navigation Links
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

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Email validation helper function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Parallax Effect for About and Projects Hero Sections
const parallaxBg = document.querySelector('.parallax-bg');
if (parallaxBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.5
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-item h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetNumber = parseInt(target.getAttribute('data-number'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = targetNumber / (duration / 16); // 60fps

            function updateCount() {
                count += increment;
                if (count < targetNumber) {
                    target.textContent = Math.round(count);
                    requestAnimationFrame(updateCount);
                } else {
                    target.textContent = targetNumber;
                }
            }

            updateCount();
        }
    });
}, {
    threshold: 1,
    once: true
});

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Virtual Tour Button Animation
const tourBtn = document.querySelector('.tour-btn');
if (tourBtn) {
    tourBtn.addEventListener('mouseenter', () => {
        tourBtn.classList.add('pulse');
    });
    
    tourBtn.addEventListener('mouseleave', () => {
        tourBtn.classList.remove('pulse');
    });
    
    tourBtn.addEventListener('click', () => {
        // Add your virtual tour logic here
        alert('Virtual tour feature coming soon!');
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainNav && mainNav.classList.contains('active')) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Video background
const video = document.querySelector('.video-background video');
if (video) {
    video.playbackRate = 0.75; // Slow down the video slightly
}

// Image frame hover effect
document.querySelectorAll('.image-frame').forEach(frame => {
    frame.addEventListener('mouseenter', () => {
        frame.style.transform = 'scale(1.02)';
    });
    frame.addEventListener('mouseleave', () => {
        frame.style.transform = 'scale(1)';
    });
});

// Image loading optimization
document.querySelectorAll('.image-frame img').forEach(img => {
    // Remove placeholder when image loads
    img.addEventListener('load', function() {
        this.classList.add('loaded');
        this.parentElement.classList.remove('loading');
    });

    // Handle loading errors
    img.addEventListener('error', function() {
        this.parentElement.classList.add('error');
        this.src = 'assets/images/placeholder.jpg';
    });
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Refresh AOS on page load
window.addEventListener('load', () => {
    AOS.refresh();
}); 