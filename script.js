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
    // const animateNumbers = () => {
    //     const statNumbers = document.querySelectorAll('.stat-number');

    //     statNumbers.forEach(number => {
    //         const target = parseInt(number.innerText.replace(/[+%]/g, ''));
    //         const suffix = number.innerText.match(/[+%]/)?.[0] || '';

    //         const duration = 2000;
    //         const startTime = performance.now();

    //         const updateNumber = (currentTime) => {
    //             const elapsedTime = currentTime - startTime;
    //             const progress = Math.min(elapsedTime / duration, 1);
    //             const value = Math.floor(progress * target);
    //             number.innerText = value + suffix;

    //             if (progress < 1) {
    //                 requestAnimationFrame(updateNumber);
    //             }
    //         };

    //         requestAnimationFrame(updateNumber);
    //     });
    // };

    // Animate numbers when scrolled into view - Improved Version
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.stat-number');

        // First reset all numbers to 0 to prevent stuck values
        statNumbers.forEach(number => {
            if (!number.dataset.initialized) {
                number.dataset.target = number.innerText.replace(/[+%]/g, '');
                number.dataset.suffix = number.innerText.match(/[+%]/)?.[0] || '';
                number.innerText = '0' + number.dataset.suffix;
                number.dataset.initialized = 'true';
            }
        });

        statNumbers.forEach(number => {
            const target = parseInt(number.dataset.target);
            const suffix = number.dataset.suffix;
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
  
// // Testimonial Slider
// document.addEventListener('DOMContentLoaded', function() {
//     const track = document.querySelector('.testimonials-track');
//     const cards = document.querySelectorAll('.testimonial-card');
//     const prevBtn = document.querySelector('.slider-prev');
//     const nextBtn = document.querySelector('.slider-next');
//     let currentIndex = 0;
//     const cardCount = cards.length;

//     function updateSlider() {
//         const cardWidth = cards[0].offsetWidth;
//         track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
//     }

//     nextBtn.addEventListener('click', function() {
//         currentIndex = (currentIndex + 1) % cardCount;
//         updateSlider();
//     });

//     prevBtn.addEventListener('click', function() {
//         currentIndex = (currentIndex - 1 + cardCount) % cardCount;
//         updateSlider();
//     });

//     // Image Viewer
//     const modal = document.querySelector('.image-viewer-modal');
//     const modalImg = document.getElementById('modal-image');
//     const closeModal = document.querySelector('.close-modal');
//     const viewButtons = document.querySelectorAll('.view-screenshot-btn');

//     viewButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const imgSrc = this.getAttribute('data-image');
//             modalImg.src = imgSrc;
//             modal.style.display = "block";
//         });
//     });

//     closeModal.addEventListener('click', function() {
//         modal.style.display = "none";
//     });

//     window.addEventListener('click', function(event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//         }
//     });

//     // Initialize slider on load
//     updateSlider();
// });

// // Testimonial Slider with looping
// document.addEventListener('DOMContentLoaded', function () {
//     const track = document.querySelector('.testimonials-track');
//     const cards = document.querySelectorAll('.testimonial-card');
//     const prevBtn = document.querySelector('.slider-prev');
//     const nextBtn = document.querySelector('.slider-next');
//     const cardCount = cards.length;
//     let currentIndex = 0;

//     // Clone cards to create an infinite loop effect
//     const firstTwoCards = [...cards].slice(0, 2);
//     const lastTwoCards = [...cards].slice(-2);
//     firstTwoCards.forEach(card => track.appendChild(card.cloneNode(true)));
//     lastTwoCards.reverse().forEach(card => track.prepend(card.cloneNode(true)));

//     let totalCards = track.querySelectorAll('.testimonial-card').length;
//     let transitionEnabled = true;

//     // Helper function to update slider position
//     function updateSlider(animate = true) {
//         if (!transitionEnabled) return;

//         const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
//         const transformValue = -(currentIndex + 2) * cardWidth;

//         if (animate) {
//             track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//         } else {
//             track.style.transition = 'none';
//         }

//         track.style.transform = `translateX(${transformValue}px)`;
//     }

//     // Handle next button click
//     nextBtn.addEventListener('click', function () {
//         if (!transitionEnabled) return;
//         currentIndex++;
//         updateSlider();
//     });

//     // Handle previous button click
//     prevBtn.addEventListener('click', function () {
//         if (!transitionEnabled) return;
//         currentIndex--;
//         updateSlider();
//     });

//     // Handle transition end for infinite loop logic
//     track.addEventListener('transitionend', function () {
//         transitionEnabled = false;

//         // Reset to real first card after sliding to last clone
//         if (currentIndex >= cardCount) {
//             currentIndex = 0;
//             updateSlider(false); // No animation on reset
//         }

//         // Reset to real last card after sliding to first clone
//         if (currentIndex < 0) {
//             currentIndex = cardCount - 1;
//             updateSlider(false); // No animation on reset
//         }

//         transitionEnabled = true;
//     });

//     // Initialize slider position
//     updateSlider(false);

//     // Image Viewer
//     const modal = document.querySelector('.image-viewer-modal');
//     const modalImg = document.getElementById('modal-image');
//     const closeModal = document.querySelector('.close-modal');
//     const viewButtons = document.querySelectorAll('.view-screenshot-btn');

//     viewButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const imgSrc = this.getAttribute('data-image');
//             modalImg.src = imgSrc;
//             modal.style.display = "block";
//         });
//     });

//     closeModal.addEventListener('click', function () {
//         modal.style.display = "none";
//     });

//     window.addEventListener('click', function (event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//         }
//     });

//     // Recalculate slider position on resize
//     window.addEventListener('resize', () => {
//         updateSlider(false);
//     });
// });

// // Fixed Testimonial Slider
// document.addEventListener('DOMContentLoaded', function () {
//     const track = document.querySelector('.testimonials-track');
//     const cards = document.querySelectorAll('.testimonial-card');
//     const prevBtn = document.querySelector('.slider-prev');
//     const nextBtn = document.querySelector('.slider-next');

//     let currentIndex = 0;
//     const totalCards = cards.length;
//     let cardsPerView = 3; // Default for desktop
//     let cardGap = 30; // Gap between cards

//     // Function to determine cards per view based on screen size
//     function getCardsPerView() {
//         if (window.innerWidth <= 480) {
//             return 1; // Mobile
//         } else if (window.innerWidth <= 768) {
//             return 2; // Tablet
//         } else {
//             return 3; // Desktop
//         }
//     }

//     // Function to calculate card width including gap
//     function getCardWidth() {
//         const card = cards[0];
//         const containerWidth = document.querySelector('.testimonials-slider').offsetWidth;
//         cardsPerView = getCardsPerView();

//         // Calculate card width based on container and gaps
//         const totalGaps = (cardsPerView - 1) * cardGap;
//         const availableWidth = containerWidth - totalGaps - 40; // 40px for padding
//         const cardWidth = availableWidth / cardsPerView;

//         // Set card widths
//         cards.forEach(card => {
//             card.style.width = cardWidth + 'px';
//             card.style.marginRight = cardGap + 'px';
//         });

//         return cardWidth + cardGap;
//     }

//     // Function to update slider position
//     function updateSlider() {
//         const cardWidthWithGap = getCardWidth();
//         const translateX = currentIndex * cardWidthWithGap;

//         track.style.transform = `translateX(-${translateX}px)`;
//         track.style.transition = 'transform 0.5s ease-in-out';

//         // Update button states
//         updateButtonStates();
//     }

//     // Function to update button states (optional - for visual feedback)
//     function updateButtonStates() {
//         const maxIndex = totalCards - cardsPerView;

//         if (currentIndex <= 0) {
//             prevBtn.style.opacity = '0.5';
//         } else {
//             prevBtn.style.opacity = '1';
//         }

//         if (currentIndex >= maxIndex) {
//             nextBtn.style.opacity = '0.5';
//         } else {
//             nextBtn.style.opacity = '1';
//         }
//     }

//     // Next button functionality with looping
//     nextBtn.addEventListener('click', function () {
//         const maxIndex = totalCards - cardsPerView;

//         if (currentIndex >= maxIndex) {
//             // Loop back to beginning
//             currentIndex = 0;
//         } else {
//             currentIndex++;
//         }

//         updateSlider();
//     });

//     // Previous button functionality with looping
//     prevBtn.addEventListener('click', function () {
//         if (currentIndex <= 0) {
//             // Loop to end
//             currentIndex = Math.max(0, totalCards - cardsPerView);
//         } else {
//             currentIndex--;
//         }

//         updateSlider();
//     });

//     // Auto-slide functionality (optional)
//     let autoSlideInterval;

//     function startAutoSlide() {
//         autoSlideInterval = setInterval(() => {
//             nextBtn.click();
//         }, 5000); // Change slide every 5 seconds
//     }

//     function stopAutoSlide() {
//         if (autoSlideInterval) {
//             clearInterval(autoSlideInterval);
//         }
//     }

//     // Start auto-slide
//     startAutoSlide();

//     // Pause auto-slide on hover
//     const sliderContainer = document.querySelector('.testimonials-slider');
//     sliderContainer.addEventListener('mouseenter', stopAutoSlide);
//     sliderContainer.addEventListener('mouseleave', startAutoSlide);

//     // Handle window resize
//     let resizeTimeout;
//     window.addEventListener('resize', function () {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             // Reset to first slide on resize to avoid positioning issues
//             currentIndex = 0;
//             updateSlider();
//         }, 250);
//     });

//     // Image Viewer Modal functionality
//     const modal = document.querySelector('.image-viewer-modal');
//     const modalImg = document.getElementById('modal-image');
//     const closeModal = document.querySelector('.close-modal');
//     const viewButtons = document.querySelectorAll('.view-screenshot-btn');

//     viewButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const imgSrc = this.getAttribute('data-image');
//             modalImg.src = imgSrc;
//             modal.style.display = "block";
//             stopAutoSlide(); // Stop auto-slide when modal is open
//         });
//     });

//     closeModal.addEventListener('click', function () {
//         modal.style.display = "none";
//         startAutoSlide(); // Resume auto-slide when modal is closed
//     });

//     window.addEventListener('click', function (event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//             startAutoSlide(); // Resume auto-slide when modal is closed
//         }
//     });

//     // Initialize slider
//     updateSlider();

//     // Touch/swipe support for mobile
//     let startX = 0;
//     let endX = 0;

//     track.addEventListener('touchstart', function (e) {
//         startX = e.touches[0].clientX;
//         stopAutoSlide();
//     });

//     track.addEventListener('touchmove', function (e) {
//         endX = e.touches[0].clientX;
//     });

//     track.addEventListener('touchend', function (e) {
//         const difference = startX - endX;

//         if (Math.abs(difference) > 50) { // Minimum swipe distance
//             if (difference > 0) {
//                 // Swipe left - next slide
//                 nextBtn.click();
//             } else {
//                 // Swipe right - previous slide
//                 prevBtn.click();
//             }
//         }

//         startAutoSlide();
//     });
// });

// // Header scroll effect
// window.addEventListener('scroll', function() {
//     const header = document.getElementById('header');
//     if (window.scrollY > 50) {
//         header.style.padding = '0.1rem 0';
//         header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
//     } else {
//         header.style.padding = '1rem 0';
//         header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
//     }});

    
// Simple Testimonial Slider Fix - Replace your existing testimonial slider code with this
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!track || !cards.length || !prevBtn || !nextBtn) {
        console.error('Testimonial slider elements not found');
        return;
    }

    let currentIndex = 0;
    const totalCards = cards.length; // 7 cards
    let cardWidth = 0;
    let cardsPerView = 3; // Default
    const gap = 30;

    // Function to get cards per view based on screen width
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        return 3;
    }

    // Calculate card width and setup
    function setupCards() {
        cardsPerView = getCardsPerView();
        const sliderWidth = document.querySelector('.testimonials-slider').offsetWidth;
        const totalGaps = (cardsPerView - 1) * gap;
        cardWidth = (sliderWidth - totalGaps) / cardsPerView;

        // Set card widths
        cards.forEach(card => {
            card.style.width = cardWidth + 'px';
            card.style.marginRight = gap + 'px';
            card.style.flexShrink = '0';
        });

        // Remove margin from last card
        cards[cards.length - 1].style.marginRight = '0px';
    }

    // Update slider position
    function updateSlider() {
        const translateX = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${translateX}px)`;
        track.style.transition = 'transform 0.4s ease-in-out';
    }

    // Next button
    nextBtn.addEventListener('click', function () {
        const maxIndex = totalCards - cardsPerView;

        if (currentIndex >= maxIndex) {
            // Loop back to start
            currentIndex = 0;
        } else {
            currentIndex++;
        }

        updateSlider();
    });

    // Previous button  
    prevBtn.addEventListener('click', function () {
        if (currentIndex <= 0) {
            // Loop to end
            const maxIndex = totalCards - cardsPerView;
            currentIndex = Math.max(0, maxIndex);
        } else {
            currentIndex--;
        }

        updateSlider();
    });

    // Auto-slide functionality
    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextBtn.click();
        }, 4000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = 0; // Reset to first slide
            setupCards();
            updateSlider();
        }, 250);
    });

    // Touch support for mobile
    let startX = 0;
    let endX = 0;

    if (slider) {
        slider.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            stopAutoSlide();
        });

        slider.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextBtn.click();
                } else {
                    prevBtn.click();
                }
            }

            startAutoSlide();
        });
    }

    // Image modal functionality (keeping your existing functionality)
    const modal = document.querySelector('.image-viewer-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    if (modal && modalImg && closeModal) {
        // Handle view screenshot buttons
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('view-screenshot-btn')) {
                const imgSrc = e.target.getAttribute('data-image');
                modalImg.src = imgSrc;
                modal.style.display = "block";
                stopAutoSlide();
            }
        });

        closeModal.addEventListener('click', function () {
            modal.style.display = "none";
            startAutoSlide();
        });

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                startAutoSlide();
            }
        });
    }

    // Initialize slider
    setupCards();
    updateSlider();
    startAutoSlide();

    console.log(`Testimonial slider initialized with ${totalCards} cards`);
});
    
    // // Initialize Calendly
    // function initCalendly() {
    //   Calendly.initPopupWidget({
    //     url: 'https://calendly.com/handwriterspublication',
    //     text: 'Book Appointment',
    //     color: '#d4af37',
    //     textColor: '#1a2a3a',
    //     branding: false
    //   });
    //   return false;
    // }
    
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


// // Auto-show after 5 seconds
// setTimeout(() => {
//     document.getElementById('academicPopup').style.display = 'flex';
// }, 5000);

// // Close functionality
// document.getElementById('closeBtn').addEventListener('click', () => {
//     document.getElementById('academicPopup').style.display = 'none';
// });

// // Close when clicking outside
// window.addEventListener('click', (e) => {
//     if (e.target === document.getElementById('academicPopup')) {
//         document.getElementById('academicPopup').style.display = 'none';
//     }
// });
// Update your script.js
function initPopup() {
    const popup = document.getElementById('academicPopup');

    // Auto-show after 5 seconds
    setTimeout(() => {
        document.body.classList.add('popup-active');
        popup.style.display = 'flex';
    }, 5000);

    // Close functionality
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.classList.remove('popup-active');
        popup.style.display = 'none';
    });

    // Close when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            document.body.classList.remove('popup-active');
            popup.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', initPopup);

//download brochure

// Download Brochure Functionality
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            // Create a temporary anchor element to trigger download
            const a = document.createElement('a');
            a.href = 'BROCHURE_HANDWRITERSPUBLICATION.pdf'; // Path to your PDF file
            a.download = 'BROCHURE_HANDWRITERSPUBLICATION.pdf'; // Name for downloaded file

            // Append to body, click, and remove
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Optional: Show a confirmation message
            showDownloadMessage('Download started!', 'success');
        });
    }

    // Function to show download status message
    function showDownloadMessage(text, type) {
        // Remove any existing message first
        const existingMessage = document.getElementById('downloadMessage');
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement('div');
        message.id = 'downloadMessage';
        message.textContent = text;
        message.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#4CAF50; color:white; padding:10px 20px; border-radius:5px; z-index:1000; font-weight:bold;';

        if (type === 'error') {
            message.style.background = '#e74c3c';
        }

        document.body.appendChild(message);

        // Remove message after 3 seconds
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 3000);
    }

    // Optional: Check if file exists on page load
    function checkFileExists() {
        fetch('BROCHURE_HANDWRITERSPUBLICATION.pdf')
            .then(response => {
                if (response.status !== 200) {
                    console.error('Brochure file not found!');
                }
            })
            .catch(error => {
                console.error('Error checking brochure file:', error);
            });
    }

    // Uncomment the line below if you want to check if file exists on page load
    // checkFileExists();
});


// Testimonial Slider - Working Version
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    let currentIndex = 0;
    let cardsPerView = 3; // default
    const gap = 20; // px gap between cards

    function getCardsPerView() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function updateSlider() {
        cardsPerView = getCardsPerView();
        const cardWidth = cards[0].offsetWidth + gap;
        const translateX = currentIndex * cardWidth;
        track.style.transform = `translateX(-${translateX}px)`;
        track.style.transition = 'transform 0.5s ease';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0; // loop back
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - cardsPerView; // loop to end
        }
        updateSlider();
    });

    // Responsive resize handling
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlider();
    });

    updateSlider();
});
