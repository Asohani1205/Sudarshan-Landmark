// DOM Elements
const header = document.querySelector('.header');
const projectFilters = document.querySelectorAll('.filter-btn');
const projectGrid = document.querySelector('.project-grid');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav a');
const videoBackground = document.querySelector('.video-background video');

// Sample project data
const projects = [
    {
        id: 1,
        title: 'Luxury Villas',
        category: 'villas',
        image: 'assets/images/projects/villa-1.jpg',
        location: 'Prime Location',
        description: 'Exclusive residential villas with premium amenities'
    },
    {
        id: 2,
        title: 'Modern Township',
        category: 'township',
        image: 'assets/images/projects/township-1.jpg',
        location: 'Strategic Location',
        description: 'Integrated township with world-class infrastructure'
    },
    {
        id: 3,
        title: 'Resort Complex',
        category: 'resort',
        image: 'assets/images/projects/resort-1.jpg',
        location: 'Scenic Location',
        description: 'Luxury resort with premium facilities'
    }
    // Add more projects as needed
];

// Video background handling
if (videoBackground) {
    videoBackground.addEventListener('loadeddata', () => {
        videoBackground.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });
    });
}

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Project filtering
function filterProjects(category) {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    displayProjects(filteredProjects);
}

function displayProjects(projectsToShow) {
    projectGrid.innerHTML = projectsToShow.map(project => `
        <div class="project-card fade-in">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-location">${project.location}</p>
                <p class="project-description">${project.description}</p>
                <a href="#" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Initialize projects preview on home page
const projectPreviewGrid = document.querySelector('.project-preview-grid');
if (projectPreviewGrid) {
    // Show only first 3 projects in preview
    const previewProjects = projects.slice(0, 3);
    projectPreviewGrid.innerHTML = previewProjects.map(project => `
        <div class="project-card fade-in">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-location">${project.location}</p>
                <p class="project-description">${project.description}</p>
                <a href="#projects" class="btn btn-primary">Learn More</a>
            </div>
        </div>
    `).join('');
}

// Project filter click handlers
projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        projectFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        // Filter projects
        filterProjects(filter.dataset.filter);
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, phone, message });
        
        // Show success message
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
sections.forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.project-card, .highlight-card, .feature-item').forEach(element => {
    observer.observe(element);
}); 