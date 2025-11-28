// ***** B Pardiv copyright ***** //
// ** created for self satisfation ** //

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// State management using JavaScript variables (no localStorage)
let currentTheme = 'light';

// Initialize theme
function initTheme() {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? 'dark' : 'light';
    setTheme(currentTheme);
}

// Set theme
function setTheme(theme) {
    currentTheme = theme;
    htmlElement.setAttribute('data-theme', theme);
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
const footerLinks = document.querySelectorAll('.footer-nav a');

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

navLinks.forEach(link => link.addEventListener('click', smoothScroll));
footerLinks.forEach(link => link.addEventListener('click', smoothScroll));

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        navbar.style.padding = '0';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.academic-card, .project-card, .internship-card, .certification-card, .achievement-card');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
    observer.observe(section);
});

cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Active Navigation Link Highlighting
function highlightNavLink() {
    const sections = document.querySelectorAll('.section, .home-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 200;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Button Click Effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Tech Tags Click Effect
const techTags = document.querySelectorAll('.tech-tag');

techTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            tag.style.animation = '';
        }, 500);
    });
});

// Social Icons Hover Animation
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = '0.5s ease';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.animation = '';
    });
});

// Contact Items Click to Copy (for email and phone)
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    const link = item.querySelector('a');
    if (link && (link.href.startsWith('mailto:') || link.href.startsWith('tel:'))) {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                const text = link.textContent;
                
                // Create temporary element to copy text
                const tempInput = document.createElement('input');
                tempInput.value = text;
                document.body.appendChild(tempInput);
                tempInput.select();
                
                try {
                    document.execCommand('copy');
                    showCopyNotification(item);
                } catch (err) {
                    console.log('Copy failed');
                }
                
                document.body.removeChild(tempInput);
            }
        });
    }
});

function showCopyNotification(element) {
    const notification = document.createElement('div');
    notification.textContent = 'Copied!';
    notification.style.position = 'absolute';
    notification.style.top = '-30px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'var(--accent-primary)';
    notification.style.color = '#ffffff';
    notification.style.padding = '0.5rem 1rem';
    notification.style.borderRadius = '20px';
    notification.style.fontSize = '0.85rem';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '1000';
    notification.style.animation = 'fadeInUp 0.3s ease';
    
    element.style.position = 'relative';
    element.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add fade out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Parallax Effect for Profile Photo
const profilePhoto = document.querySelector('.profile-photo-wrapper');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled *0.2;
    
    if (profilePhoto && scrolled < 800) {
        profilePhoto.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic Year in Footer
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = `© ${currentYear} B Pardiv. All rights reserved.`;
}

// Initialize on page load
initTheme();
highlightNavLink();

// Typing Effect for Tagline (Optional Enhancement)
const tagline = document.querySelector('.home-tagline');
if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < originalText.length) {
            tagline.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

console.log('Portfolio website loaded successfully! 🚀');