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
            const target = parseInt(number.innerText.replace(/[+%]/g, ''));
            const suffix = number.innerText.match(/[+%]/)?.[0] || '';

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
document.addEventListener('DOMContentLoaded', function() {
    const bubbleTrigger = document.getElementById('bubbleTrigger');
    const researchBubble = document.getElementById('researchBubble');
    const closeBubble = document.getElementById('closeBubble');
    
    bubbleTrigger.addEventListener('click', function() {
        researchBubble.classList.toggle('active');
    });
    
    closeBubble.addEventListener('click', function() {
        researchBubble.classList.remove('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.research-bubble') && researchBubble.classList.contains('active')) {
            researchBubble.classList.remove('active');
        }
    });
});
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
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});
  // Detect SVG support and add fallback class
document.addEventListener("DOMContentLoaded", function() {
    if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")) {
      document.documentElement.className += ' no-svg';
    }
  });
  
// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    const cardCount = cards.length;
    
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateSlider();
    });
    
    // Image Viewer
    const modal = document.querySelector('.image-viewer-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-screenshot-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-image');
            modalImg.src = imgSrc;
            modal.style.display = "block";
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // Initialize slider on load
    updateSlider();
});


// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.padding = '0.1rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    }});

    
    
    
    // Initialize Calendly
    function initCalendly() {
      Calendly.initPopupWidget({
        url: 'https://calendly.com/handwriterspublication',
        text: 'Book Appointment',
        color: '#d4af37',
        textColor: '#1a2a3a',
        branding: false
      });
      return false;
    }
    
    // Mobile detection
    function isMobile() {
      return window.innerWidth <= 767;
    }
    
    // Event listeners
    document.getElementById('book-now-btn').addEventListener('click', initCalendly);
    document.getElementById('mobile-fab').addEventListener('click', initCalendly);
    
    // Adjust for mobile view
    window.addEventListener('resize', function() {
      const fab = document.getElementById('mobile-fab');
      fab.style.display = isMobile() ? 'flex' : 'none';
    });
    