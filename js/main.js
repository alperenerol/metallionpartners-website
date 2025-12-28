/**
 * Metallion Partners - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
});

/**
 * Navigation
 */
function initNavigation() {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Header scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks?.classList.toggle('mobile-active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenuBtn?.classList.remove('active');
                navLinks?.classList.remove('mobile-active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .solution-card, .pricing-card, .about-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Contact Form
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        try {
            await simulateSubmit(data);
            
            // Success
            submitBtn.textContent = 'Message Sent!';
            submitBtn.classList.add('success');
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Error
            submitBtn.textContent = 'Error. Try again.';
            submitBtn.classList.add('error');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('error');
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

/**
 * Simulate form submission (replace with actual API integration)
 */
function simulateSubmit(data) {
    return new Promise((resolve, reject) => {
        console.log('Form submitted:', data);
        
        // Simulate network delay
        setTimeout(() => {
            // Randomly succeed or fail for demo
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Submission failed'));
            }
        }, 1500);
    });
}

/**
 * Additional Animations
 */
function initAnimations() {
    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .solution-card,
        .pricing-card,
        .about-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in,
        .solution-card.animate-in,
        .pricing-card.animate-in,
        .about-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-links.mobile-active {
                display: flex;
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(3, 7, 18, 0.98);
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(20px);
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
        
        /* Form button states */
        .btn.success {
            background: #22c55e !important;
            border-color: #22c55e !important;
        }
        
        .btn.error {
            background: #ef4444 !important;
            border-color: #ef4444 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect on hero
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

