/**
 * components.js
 * Reusable UI components for Reboot Imagine website.
 * All components return HTML strings or DOM elements.
 */

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────

/**
 * @param {string} fill  - CSS color value for the triangle fill
 * @param {boolean} inverted
 */
function SectionDivider(fill, inverted = false) {
    const div = document.createElement('div');
    div.className = 'section-divider' + (inverted ? ' inverted' : '');
    div.innerHTML = `
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,120 L600,0 L1200,120 Z" fill="${fill}" />
    </svg>
  `;
    return div;
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm() {
    const wrap = document.createElement('div');
    wrap.className = 'contact-form-wrap';
    wrap.innerHTML = `
    <form class="contact-form" novalidate>
      <div class="form-row">
        <div class="form-group">
          <label>
            Name<br>
            <span>First Name (required)</span>
          </label>
          <input type="text" placeholder="" required />
        </div>
        <div class="form-group">
          <label><span>Last Name (required)</span></label>
          <input type="text" placeholder="" required />
        </div>
      </div>
      <div class="form-stack">
        <div class="form-group">
          <label>Company or Organization <span>(required)</span></label>
          <input type="text" required />
        </div>
        <div class="form-group">
          <label>Email <span>(required)</span></label>
          <input type="email" required />
        </div>
        <div class="form-group">
          <label>Message <span>(required)</span></label>
          <textarea required></textarea>
        </div>
        <div>
          <button type="submit" class="btn-submit">SUBMIT</button>
        </div>
      </div>
    </form>
  `;

    wrap.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We will be in touch shortly.');
        e.target.reset();
    });

    return wrap;
}

// ─── ACCORDION ───────────────────────────────────────────────────────────────

/**
 * @param {Array<{title: string, content: string|HTMLElement, open?: boolean}>} items
 */
function Accordion(items) {
    const container = document.createElement('div');
    container.className = 'accordion';

    items.forEach(({ title, content, open = false }) => {
        const item = document.createElement('div');
        item.className = 'accordion-item' + (open ? ' open' : '');

        const trigger = document.createElement('button');
        trigger.className = 'accordion-trigger';
        trigger.innerHTML = `
      <span>${title}</span>
      <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    `;

        const body = document.createElement('div');
        body.className = 'accordion-body';

        if (typeof content === 'string') {
            body.innerHTML = content;
        } else {
            body.appendChild(content);
        }

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all siblings
            container.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });

        item.appendChild(trigger);
        item.appendChild(body);
        container.appendChild(item);
    });

    return container;
}

// ─── PARTNERS CAROUSEL ────────────────────────────────────────────────────────

function PartnersCarousel() {
    const partners = [
        { name: 'ASTEC', slug: 'astec', ext: 'svg' },
        { name: "King's College London", slug: 'kcl' },
        { name: 'Mt Sinai', slug: 'mount-sinai', },
        { name: 'Prisms', slug: 'prisms' },
        { name: 'Pico', slug: 'pico', ext: 'svg' },
        { name: 'ArborXR', slug: 'arborxr', ext: 'svg' },
        { name: 'ManageXR', slug: 'managexr', ext: 'svg' },
        { name: 'Meta', slug: 'meta' },
        { name: 'The Glimpse Group', slug: 'glimpse-group' },
        { name: 'UVISAN', slug: 'uvisan', ext: 'jpg' },
        { name: 'MXT Reality', slug: 'mxt-reality', ext: 'jpg' },
        { name: 'Skillmaker.ai', slug: 'skillmaker', ext: 'jpg' },
        { name: 'Acadicus', slug: 'acadicus' },
        { name: 'VOY', slug: 'voy', ext: 'webp' },
        { name: 'Magic Leap', slug: 'magic-leap' },
        { name: 'Motive.io', slug: 'motive', ext: 'svg' }
    ];

    const section = document.createElement('div');
    section.className = 'partners-carousel-container big-carousel';

    const doublePartners = [...partners, ...partners];

    section.innerHTML = `
    <div class="carousel-spotlight-overlay focused"></div>
    <div class="carousel-track">
      ${doublePartners.map(p => `
          <div class="carousel-item">
            <img src="assets/logos/${p.slug}.${p.ext || 'png'}" alt="${p.name}">
          </div>
        `).join('')}
    </div>
  `;
    return section;
}

// ─── SVG ICONS ────────────────────────────────────────────────────────────────

const Icons = {
    package: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>`,

    headset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>`,

    wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>`,

    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>`,

    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>`,

    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>`,

  trendingUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>`,
};

/**
 * WHITE-GLOVE SUPPORT SERVICES COMPONENT
 * Models a vertical list where each item triggers a detail modal.
 */

const whiteGloveData = [
    { 
        id: 'fleet', 
        title: 'Fleet Management', 
        icon: Icons.users, 
        summary: 'Full lifecycle management for your XR hardware.',
        details: 'Our proactive management minimizes downtime by continuously monitoring hardware performance. We handle lifecycle planning, rotation, usage analytics, and multi-location logistics to ensure your fleet is always ready for action.'
    },
    { 
        id: 'provision', 
        title: 'Provisioning & Deployment', 
        icon: Icons.headset, 
        summary: 'Custom software imaging and global logistics.',
        details: 'We take the "out of box" headache away. Every headset is pre-loaded with your specific MDM configurations, custom APKs, and security protocols before it ever touches your site. Plug and play, globally.'
    },
    { 
        id: 'repair', 
        title: 'RMA & Repair Services', 
        icon: Icons.wrench, 
        summary: 'Expedited repairs and warranty claim handling.',
        details: 'Skip the manufacturer queues. We manage the entire Return Merchandise Authorization process. From logistics to technical repair and warranty verification, we ensure your downtime is measured in hours, not weeks.'
    },
    { 
        id: 'growth', 
        title: 'Growth & Scaling', 
        icon: Icons.trendingUp, 
        summary: 'Infrastructure planning for enterprise expansion.',
        details: 'Scaling from 10 to 1,000 headsets requires more than just chargers. We consult on network infrastructure, storage solutions, and hygiene protocols to ensure your XR expansion is sustainable and professional.'
    }
];

function createWhiteGloveSection() {
    const whiteGloveSec = document.createElement('section');
    whiteGloveSec.className = 'section-white glove-list-section';

    whiteGloveSec.innerHTML = `
        <div class="container">
            <h2 class="section-title">White-Glove Support Services</h2>
            <div class="glove-vertical-list">
                ${whiteGloveData.map(item => `
                    <div class="glove-item" data-id="${item.id}">
                        <div class="glove-icon">${item.icon}</div>
                        <div class="glove-text">
                            <h3>${item.title}</h3>
                            <p>${item.summary}</p>
                        </div>
                        <div class="glove-action">
                            <span class="view-btn">View Details</span>
                            <svg class="arrow" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Modal Overlay -->
        <div class="glove-modal-overlay" id="gloveModalOverlay">
            <div class="glove-modal">
                <button class="glove-modal-close" id="gloveModalClose">&times;</button>
                <div class="glove-modal-icon" id="gloveModalIcon"></div>
                <h3 class="glove-modal-title" id="gloveModalTitle"></h3>
                <p class="glove-modal-body" id="gloveModalBody"></p>
            </div>
        </div>
    `;

    // Wire up item clicks
    whiteGloveSec.querySelectorAll('.glove-item').forEach(item => {
        item.addEventListener('click', () => {
            const data = whiteGloveData.find(d => d.id === item.dataset.id);
            if (!data) return;
            whiteGloveSec.querySelector('#gloveModalIcon').innerHTML = data.icon;
            whiteGloveSec.querySelector('#gloveModalTitle').textContent = data.title;
            whiteGloveSec.querySelector('#gloveModalBody').textContent = data.details;
            whiteGloveSec.querySelector('#gloveModalOverlay').classList.add('open');
        });
    });

    // Close on button or overlay click
    whiteGloveSec.querySelector('#gloveModalClose').addEventListener('click', () => {
        whiteGloveSec.querySelector('#gloveModalOverlay').classList.remove('open');
    });
    whiteGloveSec.querySelector('#gloveModalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('open');
        }
    });

    return whiteGloveSec;
}
