/* ============================================================
   HAND WRITERS PUBLICATION — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Header scroll behavior ──────────────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile nav toggle ───────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Active nav link ─────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Intersection Observer fade-in ───────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Animated counter ────────────────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const display = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
      el.textContent = prefix + display + suffix;
    }, step);
  }

  // ── FAQ accordion ───────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Particles (home page hero only) ─────────────────────────
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) spawnParticles(particleContainer);

  function spawnParticles(container) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 20 + 15;
      Object.assign(p.style, {
        width: size + 'px',
        height: size + 'px',
        left: left + '%',
        animationDelay: delay + 's',
        animationDuration: duration + 's',
      });
      container.appendChild(p);
    }
  }

  // ── Contact Form — CRM Submission ──────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Indexing radio pill selection styling
    contactForm.querySelectorAll('input[name="indexing"]').forEach(radio => {
      radio.closest('label').addEventListener('click', function() {
        contactForm.querySelectorAll('input[name="indexing"]').forEach(r => {
          r.closest('label').style.background = '';
          r.closest('label').style.color = '';
          r.closest('label').style.borderColor = '';
        });
        this.style.background = 'var(--gold)';
        this.style.color = '#fff';
        this.style.borderColor = 'var(--gold)';
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit-btn');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';
      btn.disabled = true;

      const CRM_URL = 'https://crm.handwriterspublication.com';
      const API_KEY = 'hwp_lp_8f3a2b9e1c7d4f06a5e0b2c8d3f1e7a9';

      const formData = new FormData(contactForm);

      fetch(CRM_URL + '/api/receive_lead.php', {
        method: 'POST',
        headers: { 'X-API-Key': API_KEY },
        body: formData
      })
      .then(response => {
        if (!response.ok && response.status !== 422 && response.status !== 429) {
          throw new Error('Server error (' + response.status + '). Please try again.');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          btn.innerHTML = '✓ Submitted Successfully';
          btn.style.background = '#22c55e';
          const success = document.getElementById('formSuccess');
          if (success) success.style.display = 'block';
          contactForm.reset();
          // Reset indexing pill styles
          contactForm.querySelectorAll('input[name="indexing"]').forEach(r => {
            r.closest('label').style.background = '';
            r.closest('label').style.color = '';
            r.closest('label').style.borderColor = '';
          });
        } else {
          alert('Submission failed: ' + (data.message || 'Unknown error. Please try again.'));
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please check your connection and try again.');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      });
    });
  }

  // ── Smooth reveal for hero elements ─────────────────────────
  const heroEls = document.querySelectorAll('.hero-left > *');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  });

  // ── Hero card float animation ────────────────────────────────
  const hcardFront = document.querySelector('.hcard-front');
  if (hcardFront) {
    let t = 0;
    const floatCard = () => {
      t += 0.01;
      hcardFront.style.transform = `translateY(${Math.sin(t) * 8}px)`;
      requestAnimationFrame(floatCard);
    };
    floatCard();
  }

});
