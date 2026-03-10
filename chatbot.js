/**
 * HandWriters Publication — AI Chatbot
 * Smart rule-based chatbot with rich knowledge base about publication services
 */

(function () {
  'use strict';

  /* ── Knowledge Base ──────────────────────────────────────────── */
  const KB = {
    services: {
      keywords: ['service', 'offer', 'provide', 'help', 'do you', 'what can', 'available', 'package'],
      answer: `We offer a comprehensive suite of publication services:

📝 **Manuscript Writing & Structuring** — Expert drafting, thesis-to-article conversion, abstract writing & journal-template formatting.

🔬 **Editing & Proofreading** — Academic tone refinement, structural review, plagiarism detection & reference formatting by subject-matter experts.

🎯 **Journal Selection & Submission** — Tailored shortlisting for Scopus, WoS, PubMed and full submission management handled for you.

💼 **Publication Consultancy** — Full guidance on APCs, open-access models, publisher coordination — zero hidden commissions.

🧪 **Research Guidance** — Literature reviews, statistical analysis, methodology development & PhD/UGC NET compliance.

📋 **Patent Filing** — Prior-art search, patent drafting, provisional & complete specifications, IP strategy advisory.`,
      quickReplies: ['Pricing info', 'Timeline?', 'Scopus publication', 'Contact team']
    },

    publications: {
      keywords: ['scopus', 'wos', 'web of science', 'pubmed', 'abdc', 'sjr', 'q1', 'q2', 'index', 'indexed', 'ugc', 'esci'],
      answer: `We publish in all major indexed databases:

🏆 **Scopus** — We target Q1 & Q2 quartile journals with 90–95% success rate.
📊 **Web of Science (WoS)** — Including SCIE, SSCI and ESCI indexed journals.
🔬 **PubMed / MEDLINE** — For healthcare, medicine and life sciences research.
📚 **ABDC, SJR, DOAJ** — Business, economics and open-access journals.
🎓 **UGC-CARE Listed** — For Indian researchers needing UGC-listed publications.

Tell me your subject area and I'll help identify the best fit!`,
      quickReplies: ['My subject area', 'What is Q1 journal?', 'Timeline?', 'Cost?']
    },

    pricing: {
      keywords: ['price', 'cost', 'fee', 'charge', 'how much', 'rate', 'pay', 'payment', 'money', 'budget', 'affordable', 'expensive', 'cheap'],
      answer: `Our pricing is **transparent and result-oriented**. Here's how it works:

💰 **Our service fees** depend on the type of service and journal level (Q1/Q2/Q3) — contact us for a custom quote.

🔒 **100% Refund Guarantee** — If we fail to publish your paper, you get a full refund with no questions asked.

✅ **No APC commission** — Article Processing Charges (APC) are paid directly to the publisher by you, only after acceptance. We never take a cut.

❌ **No hidden charges** — You know exactly what you pay upfront.

📩 Want a personalised quote? <a href="contact.html">Fill our contact form</a> or <a href="https://wa.me/916205170397" target="_blank">WhatsApp us</a> with your manuscript details.`,
      quickReplies: ['Get a quote', 'What is APC?', 'Refund policy', 'Start now']
    },

    apc: {
      keywords: ['apc', 'article processing', 'processing charge', 'open access', 'publication fee', 'commission'],
      answer: `Regarding Article Processing Charges (APC):

💡 **What is APC?** — Some journals charge a fee to publish your paper (especially open-access journals). This fee goes to the publisher and makes your paper freely available online.

📅 **When is APC paid?** — Only **after** your paper is accepted. We notify you of acceptance, then you pay APC directly to the journal publisher.

🚫 **We take zero commission** on APCs — it's paid 100% directly to the journal.

💼 **We guide you** on which journals have zero APC (subscription journals) vs. which have APC, so you can make an informed choice.`,
      quickReplies: ['Is there 0 APC option?', 'Pricing', 'Timeline', 'Contact team']
    },

    timeline: {
      keywords: ['time', 'timeline', 'how long', 'duration', 'days', 'weeks', 'months', 'fast', 'quick', 'turnaround', 'deadline', 'when'],
      answer: `Here's a realistic timeline breakdown:

✍️ **Manuscript Preparation** — 1–3 weeks (writing, editing & formatting for your target journal)

📤 **Journal Submission** — 1–3 days after manuscript is ready

⏳ **Peer Review Process** — Varies by journal: typically 4–12 weeks

📋 **Revision & Acceptance** — 2–6 weeks post-review

🔖 **Publication** — Usually 1–4 weeks after acceptance

So overall from start to publication: **approximately 3–5 months** for most Scopus/WoS journals. We keep you updated at every milestone!`,
      quickReplies: ['Can it be faster?', 'Guaranteed?', 'Services', 'Contact team']
    },

    guarantee: {
      keywords: ['guarantee', 'refund', 'money back', 'assured', 'assured', 'success rate', 'fail', 'rejected', 'rejection', 'what if'],
      answer: `Our guarantee is rock-solid:

🔒 **100% Money-Back Guarantee** — If we fail to get your paper published, you get a full refund. No questions asked.

📊 **90–95% Success Rate** — We maintain this industry-leading acceptance rate across Scopus/WoS journals.

🤝 **We handle rejections** — If a journal rejects your paper, we revise and resubmit to another suitable journal at no extra cost.

✅ **Transparent process** — You're kept informed at every step, and we get your confirmation before any major action.

Our success is measured by your publication!`,
      quickReplies: ['Pricing', 'Timeline', 'Services', 'Start now']
    },

    manuscript: {
      keywords: ['manuscript', 'paper', 'write', 'writing', 'draft', 'thesis', 'dissertation', 'convert', 'structure', 'format', 'template'],
      answer: `Our manuscript services cover everything:

📝 **Original Writing** — Give us your research data/notes and our experts write a publication-ready manuscript from scratch.

🔄 **Thesis-to-Article Conversion** — We transform your thesis chapters into journal-format research articles.

✏️ **Editing & Proofreading** — Academic grammar, style, tone, and flow refinement by subject experts.

📐 **Journal Formatting** — We format your paper to the exact template of your target journal.

🔍 **Plagiarism Check** — We run plagiarism detection and paraphrase where needed.

📚 **Reference Management** — Proper APA, MLA, Vancouver, or journal-specific citation formatting.`,
      quickReplies: ['I have a thesis', 'Editing only', 'Plagiarism check', 'Pricing']
    },

    patent: {
      keywords: ['patent', 'ip', 'intellectual property', 'prior art', 'provisional', 'invention', 'trademark'],
      answer: `Our Patent Filing Services include:

🔍 **Prior-Art Search** — Comprehensive search of existing patents to assess novelty.

📄 **Patent Drafting** — Professional preparation of provisional and complete patent specifications.

📋 **Filing Assistance** — We handle the complete filing process with the patent office.

🧠 **IP Strategy** — Advisory on the best type of IP protection for your invention.

💡 **Types of Patents** — We handle Indian patents (Indian Patent Office), and assist with international filings (PCT applications).

<a href="contact.html">Contact us</a> with your invention details for a free consultation!`,
      quickReplies: ['Patent types', 'Indian patent', 'Filing fee', 'Contact team']
    },

    contact: {
      keywords: ['contact', 'reach', 'call', 'phone', 'email', 'whatsapp', 'talk', 'speak', 'human', 'agent', 'support', 'team'],
      answer: `You can reach our team through multiple channels:

📞 **Phone** — <a href="tel:+916205170397">+91 62051 70397</a>

💬 **WhatsApp** — <a href="https://wa.me/916205170397" target="_blank">WhatsApp us anytime</a> (fastest response!)

📧 **Email** — <a href="mailto:info@handwriterspublication.in">info@handwriterspublication.in</a>

📤 **Submit your paper** — <a href="mailto:submissionwritingservices@outlook.com">submissionwritingservices@outlook.com</a>

📋 **Contact Form** — <a href="contact.html">Fill our detailed inquiry form</a>

🕐 We typically respond within **2–4 hours** during business hours (IST).`,
      quickReplies: ['Services', 'Pricing', 'Get started']
    },

    qualifications: {
      keywords: ['qualify', 'eligible', 'requirement', 'who can', 'student', 'professor', 'researcher', 'phd', 'mphil', 'ugnet', 'faculty', 'industry'],
      answer: `We work with a wide range of clients:

🎓 **PhD Scholars** — Full support for doctoral research publication and UGC compliance.

👩‍🏫 **Faculty & Professors** — Research output support for tenure and promotions.

🔬 **Independent Researchers** — Individual researchers from any field or background.

🏥 **Medical & Clinical Professionals** — Healthcare and clinical research publication in PubMed-indexed journals.

🏢 **Industry Professionals** — R&D teams and corporate researchers seeking to publish innovations.

🌍 **International Authors** — We serve researchers from 20+ countries worldwide.

**No minimum qualification required** — what matters is your research!`,
      quickReplies: ['Services', 'Timeline', 'Contact team']
    },

    subjects: {
      keywords: ['subject', 'field', 'domain', 'discipline', 'engineering', 'medical', 'science', 'management', 'arts', 'humanities', 'business', 'computer', 'chemistry', 'biology', 'physics', 'social'],
      answer: `We cover a very wide range of disciplines:

🔬 **STEM** — Engineering, Computer Science, Physics, Chemistry, Mathematics, Biology

🏥 **Medical & Health Sciences** — Medicine, Pharmacy, Dentistry, Nursing, Public Health

📊 **Social Sciences** — Psychology, Sociology, Education, Political Science

💼 **Management & Business** — MBA research, Marketing, Finance, HRM, Operations

🌿 **Agriculture & Environmental Sciences**

📚 **Arts, Humanities & Languages**

⚖️ **Law & Governance**

Whatever your field, our team includes subject-matter experts who'll ensure your paper meets discipline-specific standards!`,
      quickReplies: ['Journal options', 'Timeline', 'Services', 'Contact team']
    },

    plagiarism: {
      keywords: ['plagiarism', 'turnitin', 'ithenticate', 'similarity', 'copy', 'duplicate', 'original', 'unique'],
      answer: `We take originality very seriously:

🔍 **Plagiarism Detection** — We check your manuscript using professional tools like iThenticate/Turnitin.

✏️ **Paraphrasing & Restructuring** — Our editors rework flagged sections while maintaining your original ideas.

📊 **Target Similarity** — We aim for below 10–15% similarity (or whatever your target journal requires).

🛡️ **Original Content** — All writing we do for you is original and checked before delivery.

⚠️ **Note** — We do NOT promote academic fraud. All our services are legitimate and follow ethical publication guidelines.`,
      quickReplies: ['Editing service', 'Manuscript writing', 'Services', 'Contact team']
    },

    process: {
      keywords: ['process', 'step', 'how does', 'procedure', 'how it work', 'workflow', 'start', 'begin', 'journey', 'submit my'],
      answer: `Here's how our end-to-end process works:

**Step 1 — Free Consultation** 📋
Share your manuscript or research topic with us. We assess and recommend the best path forward.

**Step 2 — Agreement & Onboarding** 📝
We agree on scope, target journals, and fee. You receive a clear breakdown with no hidden charges.

**Step 3 — Manuscript Preparation** ✍️
Our team writes, edits, and formats your paper to meet the target journal's guidelines.

**Step 4 — Journal Selection** 🎯
We shortlist suitable Scopus/WoS journals for your approval before submitting.

**Step 5 — Submission & Review** 📤
We handle submission and communicate with the journal throughout the peer review process.

**Step 6 — Revisions & Acceptance** ✅
We address reviewer comments and guide the paper to acceptance.

**Step 7 — Publication** 🎉
Your paper gets published with a DOI!`,
      quickReplies: ['Get started', 'Pricing', 'Timeline', 'Contact team']
    },

    greetings: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'namaste'],
      answer: null // handled specially
    },

    thanks: {
      keywords: ['thank', 'thanks', 'thank you', 'appreciate', 'helpful', 'great', 'awesome', 'perfect', 'excellent'],
      answer: `You're very welcome! 😊 It's our pleasure to help.

If you have any more questions about our publication services, feel free to ask anytime. And when you're ready to take the next step, our team is just a message away!

<a href="https://wa.me/916205170397" target="_blank">💬 WhatsApp Us</a> | <a href="contact.html">📋 Contact Form</a>`,
      quickReplies: ['More questions', 'Get started', 'Services']
    },

    getStarted: {
      keywords: ['get started', 'start', 'begin', 'enroll', 'join', 'register', 'sign up', 'apply', 'proceed', 'i want to'],
      answer: `Excellent! Taking that first step is easy 🚀

Here's how to get started:

**Option 1 — WhatsApp (Fastest!)**
Send us your manuscript or topic on <a href="https://wa.me/916205170397?text=Hello%2C%20I%20want%20to%20publish%20my%20paper" target="_blank">WhatsApp: +91 62051 70397</a>

**Option 2 — Contact Form**
Fill out our <a href="contact.html">detailed inquiry form</a> and we'll get back to you within 2–4 hours.

**Option 3 — Email**
Send your manuscript directly to <a href="mailto:submissionwritingservices@outlook.com">submissionwritingservices@outlook.com</a>

We'll review your paper and provide a **free initial assessment** with our recommendation!`,
      quickReplies: ['Pricing', 'Timeline', 'Services', 'Contact team']
    }
  };

  /* ── Helpers ──────────────────────────────────────────────────── */
  function getCurrentTime() {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  function matchIntent(text) {
    const lower = text.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    for (const [intent, data] of Object.entries(KB)) {
      if (!data.keywords) continue;
      let score = 0;
      for (const kw of data.keywords) {
        if (lower.includes(kw)) score += kw.length; // longer keyword = more specific
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = { intent, data };
      }
    }

    return bestScore > 0 ? bestMatch : null;
  }

  function formatBotText(text) {
    // Bold: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Line breaks
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  /* ── DOM Creation ─────────────────────────────────────────────── */
  function buildChatUI() {
    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'chat-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Open chat assistant');
    toggleBtn.innerHTML = `
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <div id="chat-badge">1</div>
    `;
    document.body.appendChild(toggleBtn);

    // Chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.setAttribute('role', 'dialog');
    chatWindow.setAttribute('aria-label', 'Chat with HandWriters Publication assistant');
    chatWindow.innerHTML = `
      <div class="chat-header">
        <div class="chat-avatar">📖</div>
        <div class="chat-header-info">
          <div class="chat-header-name">Aria — Publication Assistant</div>
          <div class="chat-header-status">Online · Typically replies instantly</div>
        </div>
        <div class="chat-header-actions">
          <button class="chat-header-btn" id="chat-minimize-btn" title="Minimize" aria-label="Minimize chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="chat-suggestions" id="chat-suggestions">
        <div class="chat-suggestions-label">Quick topics</div>
        <button class="suggestion-chip" data-query="What services do you offer?">📝 Services</button>
        <button class="suggestion-chip" data-query="How much does it cost?">💰 Pricing</button>
        <button class="suggestion-chip" data-query="How long does publication take?">⏱️ Timeline</button>
        <button class="suggestion-chip" data-query="Do you guarantee publication?">🔒 Guarantee</button>
        <button class="suggestion-chip" data-query="How to get started?">🚀 Get Started</button>
      </div>

      <div class="chat-messages" id="chat-messages"></div>

      <div class="chat-input-area">
        <textarea
          id="chat-input"
          placeholder="Ask about our publication services…"
          rows="1"
          maxlength="500"
          aria-label="Type your message"
        ></textarea>
        <button id="chat-send-btn" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div class="chat-footer-brand">Powered by <span>HandWriters AI</span> · <a href="contact.html" style="color:#b8882a;">Talk to a real expert →</a></div>
    `;
    document.body.appendChild(chatWindow);

    return { toggleBtn, chatWindow };
  }

  /* ── Message Rendering ─────────────────────────────────────────── */
  function appendMessage(role, html, quickReplies) {
    const messagesEl = document.getElementById('chat-messages');

    const msgEl = document.createElement('div');
    msgEl.className = `msg ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = role === 'bot' ? '📖' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = html;

    if (quickReplies && quickReplies.length) {
      const qrWrap = document.createElement('div');
      qrWrap.className = 'msg-quick-replies';
      quickReplies.forEach(qr => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = qr;
        btn.addEventListener('click', () => handleUserMessage(qr));
        qrWrap.appendChild(btn);
      });
      bubble.appendChild(qrWrap);
    }

    const timeEl = document.createElement('div');
    timeEl.className = 'msg-time';
    timeEl.textContent = getCurrentTime();

    const inner = document.createElement('div');
    inner.style.display = 'flex';
    inner.style.flexDirection = 'column';
    inner.style.gap = '3px';
    inner.style.maxWidth = '85%';
    inner.appendChild(bubble);
    inner.appendChild(timeEl);

    msgEl.appendChild(avatar);
    msgEl.appendChild(inner);
    messagesEl.appendChild(msgEl);

    // Scroll to bottom
    setTimeout(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 50);

    return msgEl;
  }

  function showTypingIndicator() {
    const messagesEl = document.getElementById('chat-messages');
    const typingEl = document.createElement('div');
    typingEl.className = 'msg bot msg-typing';
    typingEl.id = 'chat-typing';
    typingEl.innerHTML = `
      <div class="msg-avatar">📖</div>
      <div class="msg-bubble">
        <div class="dots-container">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return typingEl;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('chat-typing');
    if (el) el.remove();
  }

  /* ── Bot Response Logic ────────────────────────────────────────── */
  function getBotReply(userText) {
    const lower = userText.toLowerCase().trim();

    // Greeting
    if (KB.greetings.keywords.some(kw => lower.includes(kw))) {
      const hour = new Date().getHours();
      const timePart = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      return {
        text: `${timePart}! 👋 I'm **Aria**, your HandWriters Publication assistant.\n\nI can help you with:\n🔹 Our publication services\n🔹 Pricing & timelines\n🔹 Scopus/WoS journal selection\n🔹 Manuscript guidance\n🔹 Patent filing\n🔹 Getting started\n\nWhat would you like to know?`,
        quickReplies: ['Services', 'Pricing', 'Get started', 'Contact team']
      };
    }

    // Look for intent match
    const match = matchIntent(userText);
    if (match && match.data.answer) {
      return {
        text: match.data.answer,
        quickReplies: match.data.quickReplies || []
      };
    }

    // Quick reply shortcuts
    const shortcuts = {
      'contact team': KB.contact.answer,
      'get started': KB.getStarted.answer,
      'more questions': `Of course! Ask me anything about:\n\n📝 **Services** — Manuscript writing, editing, journal submission\n💰 **Pricing** — Transparent fees, refund guarantee\n⏱️ **Timeline** — Publication timelines\n📋 **Process** — How we work step by step\n📞 **Contact** — Get in touch with our team\n\nWhat would you like to know?`,
      'is there 0 apc option': `Yes! Many high-quality journals have **zero APC** (article processing charge). These are subscription-based journals where readers pay to access content — authors publish for free.\n\nWe help you identify and target such journals when they fit your research. This means you pay only our service fee, with no additional publisher fee.\n\n<a href="contact.html">Contact us</a> to discuss the best zero-APC options for your field!`,
      'i have a thesis': `Great! Thesis-to-article conversion is one of our most popular services.\n\nWe can:\n✍️ Extract 2–4 publishable papers from your thesis\n📐 Reformat each chapter into a journal article\n🎯 Match each paper to the right indexed journal\n📤 Handle submission and revisions\n\nShare your thesis topic and we'll guide you from there. <a href="https://wa.me/916205170397" target="_blank">WhatsApp us</a> or use our <a href="contact.html">contact form</a>.`,
      'editing only': `Absolutely! We offer standalone Editing & Proofreading services:\n\n✏️ **Language editing** — Grammar, academic tone, sentence clarity\n📖 **Structural editing** — Abstract, intro, methodology, conclusion flow\n🔍 **Plagiarism check** — Full similarity report + paraphrasing\n📚 **Reference formatting** — APA, AMA, Vancouver, journal-specific styles\n📐 **Journal formatting** — Template matching for your target journal\n\n<a href="contact.html">Send us your manuscript</a> for a free assessment!`,
      'what is q1 journal': `A **Q1 journal** is one that ranks in the **top 25%** of journals in its subject category by the SJR (Scimago Journal Rank) metric — the highest quartile.\n\n📊 Quartile breakdown:\n🥇 **Q1** — Top 25% (most prestigious)\n🥈 **Q2** — Top 26–50%\n🥉 **Q3** — Top 51–75%\n🔸 **Q4** — Bottom 25%\n\nWe primarily target Q1 and Q2 Scopus/WoS journals for maximum impact and credibility. Want to know which Q1 journals suit your field?`,
      'refund policy': KB.guarantee.answer,
      'indian patent': `For Indian patents, we provide:\n\n🏛️ **Indian Patent Office (IPO) filing** — For protection within India.\n📄 **Provisional application** — Secures your priority date while you develop the invention further.\n📋 **Complete specification** — Full patent with claims, drawings, and abstract.\n⏱️ **Timeline** — Typically 2–3 years for grant, with immediate provisional protection.\n\nWant a free consultation? <a href="contact.html">Contact us</a> with your invention details.`,
      'can it be faster': `Yes, in some cases! Here's how:\n\n⚡ **Quick-decision journals** — Some journals give editorial decisions within 4–8 weeks.\n📋 **Express review tracks** — Certain journals offer paid fast-track peer review.\n✅ **Well-prepared manuscripts** — A polished, journal-ready paper reduces revision rounds significantly.\n\nTell us your deadline and we'll recommend journals with the fastest turnaround that match your research quality!`,
      'plagiarism check': KB.plagiarism.answer,
    };

    const shortcutKey = Object.keys(shortcuts).find(k => lower.includes(k) || lower === k);
    if (shortcutKey) {
      return { text: shortcuts[shortcutKey], quickReplies: ['Services', 'Pricing', 'Contact team'] };
    }

    // Default fallback
    return {
      text: `I'm not sure I understood that perfectly, but I'm here to help! 🤔\n\nYou can ask me about:\n🔹 **Services** — What we offer\n🔹 **Pricing** — Fees and guarantees\n🔹 **Timeline** — How long it takes\n🔹 **Scopus/WoS** — Journal options\n🔹 **Process** — How we work\n🔹 **Patent filing** — IP protection\n\nOr you can <a href="https://wa.me/916205170397" target="_blank">WhatsApp our team directly</a> for immediate help!`,
      quickReplies: ['Services', 'Pricing', 'Get started', 'Contact team']
    };
  }

  /* ── Main Interaction Handler ─────────────────────────────────── */
  function handleUserMessage(text) {
    if (!text || !text.trim()) return;

    const input = document.getElementById('chat-input');
    if (input) input.value = '';
    autoResizeInput(input);

    // Hide suggestions after first message
    const suggestions = document.getElementById('chat-suggestions');
    if (suggestions) suggestions.style.display = 'none';

    // Show user message
    appendMessage('user', text.replace(/</g, '&lt;').replace(/>/g, '&gt;'));

    // Show typing
    const typingEl = showTypingIndicator();

    // Simulate thinking delay
    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      removeTypingIndicator();
      const reply = getBotReply(text);
      appendMessage('bot', formatBotText(reply.text), reply.quickReplies);
    }, delay);
  }

  function autoResizeInput(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  }

  /* ── Welcome Message ─────────────────────────────────────────── */
  function sendWelcomeMessage() {
    const welcomeText = `👋 Hi! I'm **Aria**, your HandWriters Publication assistant.\n\nI can help you with publication services, pricing, Scopus/WoS journal selection, timelines, patents and more.\n\nWhat brings you here today?`;

    const categoriesHTML = `
      <div class="chat-categories">
        <div class="chat-category-card" data-query="What services do you offer?">
          <div class="cat-icon">📝</div>
          <div class="cat-label">Publication Services</div>
        </div>
        <div class="chat-category-card" data-query="How much does it cost?">
          <div class="cat-icon">💰</div>
          <div class="cat-label">Pricing & Fees</div>
        </div>
        <div class="chat-category-card" data-query="How long does publication take?">
          <div class="cat-icon">⏱️</div>
          <div class="cat-label">Timeline</div>
        </div>
        <div class="chat-category-card" data-query="How to get started?">
          <div class="cat-icon">🚀</div>
          <div class="cat-label">Get Started</div>
        </div>
      </div>
    `;

    setTimeout(() => {
      appendMessage('bot', formatBotText(welcomeText) + categoriesHTML);
      // Add click handlers to category cards
      document.querySelectorAll('.chat-category-card').forEach(card => {
        card.addEventListener('click', () => handleUserMessage(card.dataset.query));
      });
    }, 400);
  }

  /* ── Init ─────────────────────────────────────────────────────── */
  function init() {
    const { toggleBtn, chatWindow } = buildChatUI();
    let isOpen = false;
    let hasOpened = false;

    // Toggle
    toggleBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      toggleBtn.classList.toggle('open', isOpen);
      chatWindow.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-label', isOpen ? 'Close chat' : 'Open chat assistant');

      if (isOpen) {
        // Hide badge
        const badge = document.getElementById('chat-badge');
        if (badge) badge.classList.add('hidden');

        if (!hasOpened) {
          hasOpened = true;
          sendWelcomeMessage();
        }

        // Focus input
        setTimeout(() => {
          const input = document.getElementById('chat-input');
          if (input) input.focus();
        }, 350);
      }
    });

    // Minimize button
    document.getElementById('chat-minimize-btn').addEventListener('click', () => {
      isOpen = false;
      toggleBtn.classList.remove('open');
      chatWindow.classList.remove('open');
    });

    // Send button
    document.getElementById('chat-send-btn').addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      handleUserMessage(input.value.trim());
    });

    // Input keydown
    document.getElementById('chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        handleUserMessage(input.value.trim());
      }
    });

    // Auto-resize textarea
    document.getElementById('chat-input').addEventListener('input', function () {
      autoResizeInput(this);
    });

    // Suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        handleUserMessage(chip.dataset.query);
      });
    });

    // Auto-open after delay on first visit (only once per session)
    if (!sessionStorage.getItem('chatAutoOpened')) {
      setTimeout(() => {
        if (!isOpen) {
          // Just pulse the badge to attract attention without auto-opening
          const badge = document.getElementById('chat-badge');
          if (badge) {
            badge.style.animation = 'none';
            badge.offsetHeight; // reflow
            badge.style.animation = 'badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards';
          }
        }
        sessionStorage.setItem('chatAutoOpened', '1');
      }, 3000);
    }
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
