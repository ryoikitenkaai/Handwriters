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

  // ── Lead Submission Helpers ───────────────────────────────────
  const LOCAL_LEADS_STORAGE_KEY = 'hwp_local_leads_v1';
  const LOCAL_LEAD_RETENTION_DAYS = 90;
  const WHATSAPP_PATTERN = /^\+?\d{7,15}$/;

  // CRM webhook config preserved for quick re-enable in future.
  // const LEAD_ENDPOINT = 'https://xcrm.handwriterspublication.com/api/webhook/lead';
  // const LANDING_API_KEY = 'REPLACE_WITH_YOUR_LANDING_API_KEY';

  const countriesData = [
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Nepal', code: '+977', flag: '🇳🇵' },
  { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Peru', code: '+51', flag: '🇵🇪' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' }
  ];

  function bindWhatsappLock(wrap) {
    if (!wrap) return;
    const trigger = wrap.querySelector('.country-selector-trigger');
    if (!trigger) return;

    const dropdown = wrap.querySelector('.country-dropdown');
    const searchInput = wrap.querySelector('.country-search-wrap input');
    const list = wrap.querySelector('.country-list');
    const selectedFlag = wrap.querySelector('.selected-flag');
    const selectedCode = wrap.querySelector('.selected-code');
    const hiddenPrefix = wrap.querySelector('input[name="wa_prefix"]');

    function renderList(filter = '') {
      list.innerHTML = '';
      const lowerFilter = filter.toLowerCase();
      const filtered = countriesData.filter(c => c.name.toLowerCase().includes(lowerFilter) || c.code.includes(lowerFilter));
      
      filtered.forEach(country => {
        const li = document.createElement('li');
        li.innerHTML = '<span class="country-flag">' + country.flag + '</span>' +
                       '<span class="country-name">' + country.name + '</span>' +
                       '<span class="country-dial">' + country.code + '</span>';
        li.addEventListener('click', (e) => {
          e.stopPropagation();
          selectedFlag.textContent = country.flag;
          selectedCode.textContent = country.code;
          hiddenPrefix.value = country.code;
          dropdown.classList.remove('show');
          const telInput = wrap.querySelector('input[type="tel"]');
          if (telInput) telInput.focus();
        });
        list.appendChild(li);
      });
    }

    renderList();

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.country-dropdown.show').forEach(d => {
        if(d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
      if(dropdown.classList.contains('show') && searchInput) {
        searchInput.focus();
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderList(e.target.value);
      });
      searchInput.addEventListener('click', (e) => e.stopPropagation());
    }
  }

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.country-dropdown').forEach(d => {
      if(!d.contains(e.target) && !d.previousElementSibling.contains(e.target)) {
        d.classList.remove('show');
      }
    });
  });

  function normalizeWhatsappNumber(value) {
    return (value || '').trim().replace(/[()\-\s]/g, '');
  }

  function countWords(value) {
    return (value || '').trim().split(/\s+/).filter(Boolean).length;
  }

  function extractPayloadMessage(payload) {
    if (!payload || typeof payload !== 'object') return '';
    if (typeof payload.message === 'string' && payload.message.trim()) {
      return payload.message.trim();
    }

    const detail = payload.detail;
    if (Array.isArray(detail)) {
      const joined = detail
        .map(item => (item && typeof item.msg === 'string' ? item.msg.trim() : ''))
        .filter(Boolean)
        .join(', ');
      if (joined) return joined;
    }

    if (typeof detail === 'string' && detail.trim()) {
      return detail.trim();
    }

    return '';
  }

  function isLeadWithinRetention(lead) {
    if (!lead || typeof lead !== 'object') return false;
    if (!lead.submitted_at) return true;

    const submittedMs = Date.parse(lead.submitted_at);
    if (Number.isNaN(submittedMs)) return true;

    const retentionMs = LOCAL_LEAD_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() - submittedMs <= retentionMs;
  }

  function getStoredLeads() {
    try {
      const raw = window.localStorage.getItem(LOCAL_LEADS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const leads = Array.isArray(parsed) ? parsed.filter(isLeadWithinRetention) : [];

      if (Array.isArray(parsed) && leads.length !== parsed.length) {
        window.localStorage.setItem(LOCAL_LEADS_STORAGE_KEY, JSON.stringify(leads));
      }

      return leads;
    } catch (_err) {
      return [];
    }
  }

  function saveLeadLocally(lead) {
    if (!window.localStorage) {
      throw new Error('Local storage is not available in this browser.');
    }

    const existing = getStoredLeads();
    const updated = [lead, ...existing].slice(0, 5000);

    try {
      window.localStorage.setItem(LOCAL_LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (_err) {
      throw new Error('Could not save lead locally. Please clear browser storage and try again.');
    }
  }

  function downloadLeadBackup(lead) {
    const content = [
      'Temporary Lead Backup',
      'Submitted: ' + String(lead.submitted_at || ''),
      'Name: ' + String(lead.name || ''),
      'Email: ' + String(lead.email || ''),
      'WhatsApp: ' + String(lead.whatsapp || ''),
      'Subject: ' + String(lead.subject || ''),
      'Indexing: ' + String(lead.indexing || ''),
      'Message: ' + String(lead.message || ''),
      'Source Form: ' + String(lead.source_form || ''),
      'Source Page: ' + String(lead.source_page || '')
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lead-backup-' + Date.now() + '.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function submitLeadForm(form) {
    const formData = new FormData(form);

    const waPrefix = String(formData.get('wa_prefix') || '');
    let rawWhatsapp = String(formData.get('whatsapp_local') || '');
    if (!rawWhatsapp && formData.has('whatsapp')) {
      rawWhatsapp = String(formData.get('whatsapp') || '');
    }

    const whatsapp = normalizeWhatsappNumber(waPrefix + rawWhatsapp);
    if (!WHATSAPP_PATTERN.test(whatsapp)) {
      throw new Error('Please enter a valid WhatsApp number (7-15 digits, optional +).');
    }
    formData.set('whatsapp', whatsapp);
    formData.delete('wa_prefix');
    formData.delete('whatsapp_local');

    const message = String(formData.get('message') || '').trim();
    if (message && countWords(message) > 50) {
      throw new Error('Please keep additional information within 50 words.');
    }

    const leadRecord = {
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      whatsapp,
      subject: String(formData.get('subject') || '').trim(),
      indexing: String(formData.get('indexing') || '').trim(),
      message,
      source_form: form.id || 'lead-form',
      source_page: window.location.pathname || '',
      submitted_at: new Date().toISOString()
    };

    try {
      saveLeadLocally(leadRecord);
    } catch (_storageError) {
      downloadLeadBackup(leadRecord);
      throw new Error('Local save failed, so a backup .txt file was downloaded. Please keep it and share it with your team.');
    }

    /*
    // CRM webhook submission is intentionally paused while CRM is down.
    // Re-enable by uncommenting this block and LEAD_ENDPOINT/LANDING_API_KEY.
    const response = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-API-Key': LANDING_API_KEY
      },
      body: formData,
    });

    let payload = {};
    try {
      const parsed = await response.json();
      if (parsed && typeof parsed === 'object') {
        payload = parsed;
      }
    } catch (_err) {
      payload = {};
    }

    if (!response.ok || payload.success === false) {
      const serverMessage = extractPayloadMessage(payload);
      if (serverMessage) {
        throw new Error(serverMessage);
      }

      if (response.status === 403) {
        throw new Error('Submission authentication failed. Please contact support.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait and try again.');
      }
      if (response.status === 422) {
        throw new Error('Please check the form details and try again.');
      }

      throw new Error(`Server error (${response.status}). Please try again.`);
    }

    return payload;
    */

    return {
      success: true,
      message: 'Lead saved locally.',
      storage: 'local',
      lead: leadRecord
    };
  }

  // ── Contact Form — Local Lead Store (CRM paused) ───────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const staticWaWrap = contactForm.querySelector('.wa-input-wrap');
    if (staticWaWrap) bindWhatsappLock(staticWaWrap);

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

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const btn = contactForm.querySelector('.form-submit-btn');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';
      btn.disabled = true;

      try {
        const data = await submitLeadForm(contactForm);
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
      } catch (error) {
        console.error('Error:', error);
        alert(error?.message || 'There was an error submitting your form. Please check your connection and try again.');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }
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

  // ── Call for Papers Popup ──────────────────────────────────────
  (function initCFPPopup() {
    // Only show once per session (disabled for testing)
    // if (sessionStorage.getItem('cfpShown')) return;

    const monthNames = ['January','February','March','April','May','June',
      'July','August','September','October','November','December'];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    // Create popup HTML
    const overlay = document.createElement('div');
    overlay.className = 'cfp-overlay';
    overlay.innerHTML = `
      <div class="cfp-popup">
        <button class="cfp-close" aria-label="Close popup">&times;</button>
        <div class="cfp-badge">📢 Open Now</div>
        <div class="cfp-title">Call for Papers — <span>${currentMonth} ${currentYear}</span></div>
        <p class="cfp-subtitle">Submit your manuscript for publication in Scopus, WoS & other top-indexed journals. Free consultation included.</p>
        <form class="cfp-form" id="cfpForm" novalidate>
          <div class="form-group">
            <label>Full Name <span style="color:var(--gold)">*</span></label>
            <input type="text" name="name" placeholder="Enter your full name" required>
          </div>
          <div class="form-group">
            <label>Email Address <span style="color:var(--gold)">*</span></label>
            <input type="email" name="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label>WhatsApp Number <span style="color:var(--gold)">*</span></label>
            <div class="wa-input-wrap">
              <div class="country-selector" id="cfpCountrySelector">
                <div class="country-selector-trigger" id="cfpCountrySelectorTrigger">
                  <span class="selected-flag" id="cfpSelectedFlag">🇮🇳</span>
                  <i class="fas fa-caret-down"></i>
                  <span class="selected-code" id="cfpSelectedCode">+91</span>
                </div>
                <div class="country-dropdown" id="cfpCountryDropdown">
                  <div class="country-search-wrap">
                    <i class="fas fa-search"></i>
                    <input type="text" id="cfpCountrySearch" placeholder="Search country...">
                  </div>
                  <ul class="country-list" id="cfpCountryList">
                    <!-- Populated by JS -->
                  </ul>
                </div>
              </div>
              <input type="hidden" id="cfpWaPrefix" name="wa_prefix" value="+91">
              <input type="tel" name="whatsapp_local" placeholder="Phone Number" pattern="[\d\s\+\-]{7,20}" title="Enter full number" required>
            </div>
          </div>
          <div class="form-group">
            <label>Subject Area <span style="color:var(--gold)">*</span></label>
            <input type="text" name="subject" placeholder="e.g. Computer Science, Medicine" required>
          </div>
          <div class="form-group">
            <label>Target Indexing</label>
            <div class="cfp-pills">
              <label class="cfp-pill selected"><input type="radio" name="indexing" value="scopus" checked><span>Scopus</span></label>
              <label class="cfp-pill"><input type="radio" name="indexing" value="web-of-science"><span>WoS</span></label>
              <label class="cfp-pill"><input type="radio" name="indexing" value="abdc"><span>ABDC</span></label>
              <label class="cfp-pill"><input type="radio" name="indexing" value="google-scholar"><span>Google Scholar</span></label>
              <label class="cfp-pill"><input type="radio" name="indexing" value="others"><span>Others</span></label>
            </div>
          </div>
          <button type="submit" class="btn btn-gold cfp-submit"><i class="fas fa-paper-plane"></i> Submit Paper Inquiry</button>
          <div class="cfp-success" id="cfpSuccess">✓ Thank you! We'll contact you within 24 hours.</div>
        </form>
        <div class="cfp-footer-text">🔒 100% Refund Guarantee · No Hidden Fees · 95% Success Rate</div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Pill selection
    overlay.querySelectorAll('.cfp-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        overlay.querySelectorAll('.cfp-pill').forEach(p => p.classList.remove('selected'));
        this.classList.add('selected');
      });
    });

    // Close handlers
    const closePopup = () => {
      overlay.classList.remove('active');
      sessionStorage.setItem('cfpShown', '1');
    };
    overlay.querySelector('.cfp-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
    });

    // Show after 2 seconds for testing
    setTimeout(() => {
      overlay.classList.add('active');
      sessionStorage.setItem('cfpShown', '1');
    }, 2000);

    // Form submission
    const cfpForm = document.getElementById('cfpForm');
    if (cfpForm) {
      const cfpWaWrap = cfpForm.querySelector('.wa-input-wrap');
      if (cfpWaWrap) bindWhatsappLock(cfpWaWrap);

      cfpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!cfpForm.checkValidity()) {
          cfpForm.reportValidity();
          return;
        }

        const btn = cfpForm.querySelector('.cfp-submit');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';
        btn.disabled = true;

        try {
          const data = await submitLeadForm(cfpForm);
          if (data.success) {
            btn.innerHTML = '✓ Submitted!';
            btn.style.background = '#22c55e';
            const success = document.getElementById('cfpSuccess');
            if (success) success.style.display = 'block';
            cfpForm.reset();
            setTimeout(closePopup, 2500);
          } else {
            alert('Submission failed: ' + (data.message || 'Please try again.'));
            btn.innerHTML = originalHTML;
            btn.disabled = false;
          }
        } catch (error) {
          alert(error?.message || 'Error submitting. Please check your connection.');
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }
      });
    }
  })();

});
