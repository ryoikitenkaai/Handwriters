const fs = require('fs');
let contents = fs.readFileSync('script.js', 'utf8');

const regex = /function bindWhatsappLock\(wrap\) \{[\s\S]*?input\.placeholder = 'Write with code \(e\.g\. \+91\)';\n\s*\}\n\s*\}\);\n\s*\}/;

const newBindWhatsappLock = `
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
    
    // In case dom doesn't have the new custom UI, gracefully exit or log
    const trigger = wrap.querySelector('.country-selector-trigger');
    if (!trigger) {
      console.warn("Dropdown trigger not found in wrap", wrap);
      return; 
    }

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
`;

contents = contents.replace(regex, newBindWhatsappLock);

const oldPopupHtml = `<div class="form-group">
            <label>WhatsApp Number <span style="color:var(--gold)">*</span></label>
            <div class="wa-input-wrap">
              <span class="wa-badge"></span>
              <input type="hidden" name="wa_prefix" value="">
              <input type="tel" name="whatsapp_local" placeholder="Write with code (e.g. +91)" pattern="[\\d\\s\\+\\-]{7,20}" title="Enter country code and full number" required>
            </div>
          </div>`.trim();

const newPopupHtml = `<div class="form-group">
            <label>WhatsApp Number <span style="color:var(--gold)">*</span></label>
            <div class="wa-input-wrap">
              <div class="country-selector" id="cfpCountrySelector">
                <div class="country-selector-trigger" id="cfpCountrySelectorTrigger">
                  <span class="selected-flag" id="cfpSelectedFlag">🇮🇳</span>
                  <i class="fas fa-caret-down"></i>
                  <span class="selected-code" id="cfpSelectedCode">+91</span>
                </div>
                <div class="country-dropdown fade-in" id="cfpCountryDropdown">
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
              <input type="tel" name="whatsapp_local" placeholder="Phone Number" pattern="[\\d\\s\\+\\-]{7,20}" title="Enter full number" required>
            </div>
          </div>`.trim();

// Use regex matching exactly the old structure
const oldHtmlRegex = /<div class="form-group">\s*<label>WhatsApp Number <span style="color:var\(--gold\)">\*<\/span><\/label>\s*<div class="wa-input-wrap">\s*<span class="wa-badge"><\/span>\s*<input type="hidden" name="wa_prefix" value="">\s*<input type="tel" name="whatsapp_local" placeholder="Write with code \(e\.g\. \+91\)" pattern="\[\\d\\s\\+\\-\]\{7,20\}" title="Enter country code and full number" required>\s*<\/div>\s*<\/div>/g;

contents = contents.replace(oldHtmlRegex, newPopupHtml);

fs.writeFileSync('script.js', contents);
