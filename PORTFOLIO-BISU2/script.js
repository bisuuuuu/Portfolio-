// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopButton = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const skillCards = document.querySelectorAll('.skill-card');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    observeElements();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTopButton.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        scrollTopButton.classList.remove('show');
    }
    
    updateActiveNavLink();
});

// Mobile menu toggle
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top functionality
scrollTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Contact form handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    simulateFormSubmission(name, email, subject, message);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission
function simulateFormSubmission(name, email, subject, message) {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showFormStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real implementation, you would send the data to your server
        console.log('Form submission:', { name, email, subject, message });
    }, 2000);
}

// Show form status message
function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = type;
    formStatus.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Initialize skill bar animations

// Initialize animations
function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.section-title, .project-card, .skill-card, .timeline-item');
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Observe elements for animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Particle effect for hero section (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Call createParticles if you want the particle effect
// createParticles();

// Handle resume link clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href*="drive.google.com"]')) {
        // Analytics or tracking can be added here
        console.log('Resume link clicked');
    }
});

// Smooth reveal animations for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Enhanced smooth scrolling with offset for fixed navbar
function smoothScrollTo(element) {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const elementPosition = element.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     typeWriter(heroTitle, 'Your Name', 150);
// }

// Handle external links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="http"]') || e.target.closest('a[href^="http"]')) {
        const link = e.target.matches('a') ? e.target : e.target.closest('a');
        if (link.hostname !== window.location.hostname) {
            e.preventDefault();
            window.open(link.href, '_blank', 'noopener,noreferrer');
        }
    }
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTopButton.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        scrollTopButton.classList.remove('show');
    }
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);