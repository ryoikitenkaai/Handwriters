document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerContent = document.querySelector('.header-content');
    
    mobileMenuBtn.addEventListener('click', function() {
        headerContent.style.display = headerContent.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                headerContent.style.display = 'none';
            }
        });
    });
    
    // Animate numbers when scrolled into view
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(number => {
            const target = +number.innerText.replace('+', '');
            const suffix = number.innerText.includes('+') ? '+' : '';
            const duration = 2000;
            const startTime = performance.now();
            
            const updateNumber = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const value = Math.floor(progress * target);
                number.innerText = value + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            };
            
            requestAnimationFrame(updateNumber);
        });
    };
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('achievements')) {
                    animateNumbers();
                }
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
// Floating Research Bubble
const bubbleTrigger = document.getElementById('bubbleTrigger');
const researchBubble = document.getElementById('researchBubble');
const closeBubble = document.getElementById('closeBubble');

// Show bubble after 5 seconds
setTimeout(() => {
    researchBubble.style.display = 'block';
}, 5000);

bubbleTrigger.addEventListener('click', () => {
    researchBubble.style.display = researchBubble.style.display === 'block' ? 'none' : 'block';
});

closeBubble.addEventListener('click', (e) => {
    e.stopPropagation();
    researchBubble.style.display = 'none';
});

// Close bubble when clicking outside
document.addEventListener('click', (e) => {
    if (!researchBubble.contains(e.target) && e.target !== bubbleTrigger) {
        researchBubble.style.display = 'none';
    }
});