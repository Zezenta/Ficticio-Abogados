document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Dropdown Menus for Mobile
    const dropdownItems = document.querySelectorAll('.header__nav-item--has-dropdown');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only handle click for mobile view
            if (window.innerWidth < 768) {
                // If clicking on the item itself and not a child link
                if (e.target === item || e.target === item.querySelector('.header__nav-link')) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            }
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.testimonials__control--prev');
    const nextButton = document.querySelector('.testimonials__control--next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't interfere with dropdown functionality on mobile
            if (this.parentElement.classList.contains('header__nav-item--has-dropdown') && 
                window.innerWidth < 768) {
                return;
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = 'red';
                }
            }
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
                contactForm.reset();
            } else {
                alert('Por favor complete todos los campos requeridos correctamente.');
            }
        });
    }

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.specialty, .team__member, .blog__post');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.specialty, .team__member, .blog__post').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});