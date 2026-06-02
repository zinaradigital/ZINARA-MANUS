/* ========================================
   ZINARA DIGITAL - MAIN JAVASCRIPT
   ======================================== */

// ========================================
// MOBILE MENU TOGGLE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && menuToggle) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickInsideToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickInsideToggle) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            businessName: document.getElementById('businessName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            industry: document.getElementById('industry').value,
            achieve: document.getElementById('achieve').value,
            challenge: document.getElementById('challenge').value
        };

        // Validate form
        if (!validateContactForm(formData)) {
            alert('Please fill in all required fields.');
            return;
        }

        // Log form data (in production, this would send to a server)
        console.log('Contact Form Submitted:', formData);

        // Show success message
        showSuccessMessage('Thank you for reaching out! We will contact you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Validate contact form
function validateContactForm(data) {
    return data.fullName.trim() !== '' &&
           data.businessName.trim() !== '' &&
           data.phone.trim() !== '' &&
           data.email.trim() !== '' &&
           data.industry !== '' &&
           data.achieve.trim() !== '' &&
           data.challenge.trim() !== '';
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(successDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// ========================================
// NEWSLETTER FORM HANDLING
// ========================================

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;

        if (!email.trim()) {
            alert('Please enter a valid email address.');
            return;
        }

        console.log('Newsletter Signup:', { email });
        showSuccessMessage('Thank you for subscribing! Check your email for confirmation.');
        this.reset();
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.solution-card, .service-item, .step-card, .value-card, .blog-post-card, .service-detail-card'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollToTop';
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #1e40af;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#1e3a8a';
        this.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#1e40af';
        this.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ========================================
// ANIMATIONS KEYFRAMES
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// FORM INPUT VALIDATION
// ========================================

function setupFormValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    const urlInputs = document.querySelectorAll('input[type="url"]');

    // Email validation
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = '#e5e7eb';
                this.style.boxShadow = 'none';
            }
        });
    });

    // Phone validation
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
        });
    });

    // URL validation
    urlInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const url = this.value.trim();
            if (url && !isValidUrl(url)) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = '#e5e7eb';
                this.style.boxShadow = 'none';
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', setupFormValidation);

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Log page analytics (can be replaced with actual analytics)
function trackPageView() {
    const pageInfo = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };
    console.log('Page View:', pageInfo);
}

document.addEventListener('DOMContentLoaded', trackPageView);

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Skip to main content with keyboard shortcut (Alt + M)
    if (e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ========================================
// INITIALIZATION
// ========================================

console.log('Zinara Digital Website - JavaScript Loaded Successfully');
