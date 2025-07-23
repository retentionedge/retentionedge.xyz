// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Animated Counters
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(element) {
    const target = parseFloat(element.dataset.count);
    let current = 0;
    const step = target / 50;
    
    const updateCounter = () => {
        current += step;
        element.textContent = current.toFixed(1) + '%';
        
        if (current < target) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    testimonials[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Initialize first testimonial
showTestimonial(0);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        faqItem.classList.toggle('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const form = document.querySelector('.cta-form');
if (form) {
    form.addEventListener('submit', (e) => {
        // Add your form submission logic here
        // For now, we'll just show a simple alert
        // Replace this with your actual form handling
        
        const formData = new FormData(form);
        const name = formData.get('name');
        
        // You can add validation here
        console.log('Form submitted for:', name);
    });
}

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255,255,255,0.08)';
    } else {
        nav.style.background = 'var(--glass)';
    }
});
