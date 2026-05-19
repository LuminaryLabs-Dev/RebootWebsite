/**
 * pages.js
 * Page-level renderers. Each returns a DOM element.
 * Relies on components.js being loaded first.
 */

// ─── COMPONENT: PARTNERS CAROUSEL ────────────────────────────────────────────

function PartnersCarousel() {
    const partners = [
        { name: 'ASTEC', slug: 'astec', ext: 'svg' },
        { name: "King's College London", slug: 'kcl', ext: 'png' },
        { name: 'Mt Sinai', slug: 'mount-sinai', ext: 'png' },
        { name: 'Prisms', slug: 'prisms' },
        { name: 'Pico', slug: 'pico', ext: 'svg' },
        { name: 'ArborXR', slug: 'arborxr', ext: 'svg' },
        { name: 'ManageXR', slug: 'managexr', ext: 'svg' },
        { name: 'Meta', slug: 'meta' },
        { name: 'The Glimpse Group', slug: 'glimpse-group' },
        { name: 'UVISAN', slug: 'uvisan', ext: 'jpg' },
        { name: 'MXT Reality', slug: 'mxt-reality', ext: 'jpg' },
        { name: 'Skillmaker.ai', slug: 'skillmaker', ext: 'jpg' },
        { name: 'Acadicus', slug: 'acadicus', ext: 'png' },
        { name: 'VOY', slug: 'voy', ext: 'webp' },
        { name: 'Magic Leap', slug: 'magic-leap' },
        { name: 'Motive.io', slug: 'motive', ext: 'svg' }
    ];

    const section = document.createElement('div');
    section.className = 'partners-carousel-container big-carousel';

    // Double for seamless scrolling
    const doublePartners = [...partners, ...partners];

    section.innerHTML = `
    <div class="carousel-spotlight-overlay focused"></div>
    <div class="carousel-track">
      ${doublePartners.map(p => {
        // Fallback to 'png' if ext is missing, then build the full string
        const fileExt = p.ext || 'png';
        const imgPath = `assets/logos/${p.slug}.${fileExt}`;
        return `
          <div class="carousel-item">
            <img src="${imgPath}" alt="${p.name}" class="sharpened-logo">
          </div>
        `;
    }).join('')}
    </div>
  `;
    return section;
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function PageHome(navigateTo) {
    const page = document.createElement('div');

    // ── Hero
    const hero = document.createElement('section');
    hero.className = 'hero home-hero';
    hero.innerHTML = `
    <div class="hero-bg"></div>
    <div class="hero-content">
      <h1>Confident VR Adoption,<br>Backed by Expert IT Support.</h1>
    </div>
  `;
    page.appendChild(hero);

    // ── Services
    const servicesSec = document.createElement('section');
    servicesSec.className = 'section-white';
    servicesSec.innerHTML = `
    <div class="container">
      <h2 class="section-title">The Reboot Imagine Experience</h2>
      <div class="services-grid">
        ${[
            {
                icon: Icons.package,
                title: 'Procurement',
                desc: 'We remove the hassle from sourcing XR devices and accessories by procuring the right equipment from trusted distributors and resellers.'
            },
            {
                icon: Icons.headset,
                title: 'Provisioning',
                desc: 'We pre-configure spatial computing/XR devices with our client\'s desired software, inclusive of MDM solutions and custom applications.'
            },
            {
                icon: Icons.wrench,
                title: 'RMA & Repair Services',
                desc: 'We make the return authorization process for devices hassle-free. Additionally, we handle all warranty claims and repairs.'
            },
            {
                icon: Icons.users,
                title: 'Fleet Management & Tech Support',
                desc: 'We work with our clients to create a friction-less deployment plan and offer on-site or remote installation services.'
            }
        ].map(s => `
          <div class="service-card">
            <div class="service-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
    page.appendChild(servicesSec);

    // ── IT Support split
    const itSec = document.createElement('section');
    itSec.className = 'section-light';
    itSec.innerHTML = `
    <div class="container">
      <div class="split-section">
        <div class="split-img">
          <img src="https://images.squarespace-cdn.com/content/v1/6797d095c267b9313ded1035/bf8f365e-b712-4a38-9afa-7f0c7fbc98ac/Untitled+design+%282%29.png?format=2500w" alt="VR Headsets in a classroom" />
        </div>
        <div class="split-text">
          <h2>Looking for IT Support for Virtual Reality (VR) or Augmented Reality (AR)?</h2>
          <p>Managed IT services that ensure smooth operations, enhanced security, and optimal performance, specialized for VR + AR.</p>
          <button class="btn-primary" id="home-it-btn">Learn More ${Icons.arrowRight}</button>
        </div>
      </div>
    </div>
  `;
    itSec.querySelector('#home-it-btn').addEventListener('click', () => navigateTo('it-support'));
    page.appendChild(itSec);

    // ── Software Vendor CTA
    const vendorSec = document.createElement('section');
    vendorSec.className = 'section-white';
    vendorSec.innerHTML = `
    <div class="container">
      <div class="vendor-cta">
        <h2>Are you a Virtual Reality (VR) or Augmented Reality (AR) software vendor or provider?</h2>
        <p>We offer comprehensive services to simplify provisioning, deployment, and technical support operations for your clients. We've taken care of the complex work behind the scenes, enabling you to scale effortlessly.</p>
        <div class="vendor-cta-icon">${Icons.arrowRight}</div>
      </div>
    </div>
    `;
    vendorSec.querySelector('.vendor-cta').addEventListener('click', () => {
        navigateTo('software-vendor');
    });
    page.appendChild(vendorSec);

    // ── Partners (Big Carousel)
    page.appendChild(PartnersCarousel());

    return page;
}

// ─── IT SUPPORT ───────────────────────────────────────────────────────────────

function PageITSupport(navigateTo) {
    const page = document.createElement('div');

    // ── Hero (Scoped for IT Support)
    const hero = document.createElement('section');
    /* We add 'support-hero' here so we can target it in CSS */
    hero.className = 'hero support-hero';
    hero.innerHTML = `
    <div class="hero-bg"></div>
    <div class="hero-content">
      <h1>Minimize Downtime <br>& Maximize Utilization</h1>
      <p class="hero-subtitle">Maximize uptime with proactive VR/AR management. Our IT Service Desk monitors and resolves issues before they impact your workflow, keeping your team focused and your fleet operational.</p>
    </div>
  `;
    page.appendChild(hero);

    const supportSec = document.createElement('section');
    supportSec.className = 'section-white';
    const supportInner = document.createElement('div');
    supportInner.className = 'container-sm';
    supportInner.innerHTML = `<h2 class="section-title">Levels of IT Support</h2>`;

    const accordion = Accordion([
        { title: 'Level 1: Standard', content: '<p>Resolve common issues such as tracking, controller use, and login credentials.</p>', open: true },
        { title: 'Level 2: Advanced', content: '<p>Handle complex issues such as network troubleshooting and server settings.</p>' },
        { title: 'Level 3: Critical Response', content: '<p>Address time-sensitive incidents and basic ISV-specific software troubleshooting.</p>' }
    ]);
    supportInner.appendChild(accordion);
    supportSec.appendChild(supportInner);
    page.appendChild(supportSec);

    const provSec = document.createElement('section');
    provSec.className = 'section-light';
    provSec.innerHTML = `
    <div class="container">
      <h2 class="section-title section-title-dark">Provisioning &amp; Pre-Configuration</h2>
      <div class="provisioning-grid">
        <div class="provisioning-card">
          <div class="img-wrap"><img src="https://images.squarespace-cdn.com/content/v1/6797d095c267b9313ded1035/57118fb9-b4b5-454e-83ce-ea1ea6a23bf3/IMG_3061.jpg?format=1000w" alt="Standard" /></div>
          <h3>Essentials</h3>
          <p>Designed for clients who need provisioning, pre-configuration, device management, and technical support services<br> 
          Need your device provisisoned? Need your headsets managed? <br>
          We handle it all, with our multi-channel technical support available through our support desk at all times (tiers 1-2).
          </p>
        </div>
        <div class="provisioning-card">
          <div class="img-wrap"><img src="assets/logos/HighTierProvisioning.jpg" alt="Premium" /></div>
          <h3>Growth and Scaling</h3>
          <p>Reboot is here to help you grow your VR/AR fleet with scalable provisioning and management solutions.<br>
          This tier is ideal for clients seeking comprehensive, custom solutions and on-demand support for their operations. <br>
          We handle everything in Essentials, plus 24/7 Level 3 support for critical incidents and preferred provisioning priority & pricing.
          </p>
        </div>
      </div>
    </div>
  `;
    page.appendChild(provSec);
    page.appendChild(createWhiteGloveSection());
    page.appendChild(PartnersCarousel());

    return page;
}

// ─── SOFTWARE VENDOR ──────────────────────────────────────────────────────────

function PageSoftwareVendor() {
    const page = document.createElement('div');

    const hero = document.createElement('section');
    hero.className = 'hero';
    hero.innerHTML = `
    <div class="hero-content">
      <h1><span class="accent">Simplify</span> and <span class="accent">scale</span> with our expert ISV services</h1>
      <p>We'll work with you to create the perfect provisioning and pre-configuration package.</p>
    </div>
  `;
    page.appendChild(hero);

    const accordionSec = document.createElement('section');
    accordionSec.className = 'section-white';
    const accordion = Accordion([
        { title: 'Spatial Computing Specialists', content: '<ul><li>VR/AR/MR/PCVR</li></ul>', open: true },
        { title: 'IT Services & Support', content: '<ul><li>On-Demand Support, Repairs, Compliance</li></ul>' },
        { title: 'Tailored Solutions', content: '<ul><li>MDM, Fleet Management, Logistics</li></ul>' }
    ]);
    accordionSec.appendChild(accordion);
    page.appendChild(accordionSec);

    const plansSec = document.createElement('section');
    plansSec.className = 'section-light';
    plansSec.innerHTML = `
    <div class="container">
      <h2 class="section-title section-title-dark">White-Glove Support Services</h2>
      <div class="plans-grid">
        <div class="plan-card"><h3>Essentials</h3><p>Provisioning, MDM, and Level 1/2 Support.</p></div>
        <div class="plan-card"><h3>Growth</h3><p>Includes everything in Essentials plus 24/7 Level 3 Support.</p></div>
      </div>
    </div>
  `;
    page.appendChild(plansSec);

    const contactSec = document.createElement('section');
    contactSec.className = 'section-white';
    const cInner = document.createElement('div');
    cInner.className = 'container-sm';
    cInner.innerHTML = `<div class="contact-intro"><h2>Let's work together!</h2></div>`;
    cInner.appendChild(ContactForm());
    contactSec.appendChild(cInner);
    page.appendChild(contactSec);

    return page;
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function PageAbout() {
    const page = document.createElement('div');
    const hero = document.createElement('section');
    hero.className = 'hero about-hero';
    hero.innerHTML = `
    <div class="hero-content">
      <h1>Who We Are</h1>
      <p>Reboot Imagine is Spatial Computing's Geek Squad!</p>
    </div>
  `;
    page.appendChild(hero);

    const bodySec = document.createElement('section');
    bodySec.className = 'section-white';
    bodySec.innerHTML = `
    <div class="about-cards container">
      <div class="about-row">
        <div class="about-panel light-bg"><p>We specialize in emerging XR-related technologies.</p></div>
        <div class="about-img"><img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800" alt="VR" /></div>
      </div>
    </div>
  `;
    page.appendChild(bodySec);
    page.appendChild(PartnersCarousel());
    return page;
}

// ─── NEWS ─────────────────────────────────────────────────────────────────────

function PageNews() {
    const page = document.createElement('div');
    page.innerHTML = `
    <div class="news-page"><div class="container"><h1>News &amp; Insights</h1><div class="news-grid">
      <article class="news-article"><h2>Delivering Custom Meta Quest 3</h2><span>Read More</span></article>
      <article class="news-article"><h2>Meta for Work Partnership</h2><span>Read More</span></article>
    </div></div></div>
  `;
    return page;
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function PageContact() {
    const page = document.createElement('div');
    page.className = 'contact-page';
    page.innerHTML = `
    <div class="contact-page-header"><h1>Contact Us</h1><p>Email: hello@rebootimagine.com</p></div>
  `;
    page.appendChild(ContactForm());
    return page;
}