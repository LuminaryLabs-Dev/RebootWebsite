/**
 * app.js
 * Router, nav management, and app initialization.
 * Depends on components.js and pages.js.
 */

(function () {
  'use strict';

  const app = document.getElementById('app');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  let currentPage = 'home';

  // ── Page registry ─────────────────────────────────────────────────────────

  const pageBuilders = {
    'home': () => PageHome(navigateTo),
    'it-support': () => PageITSupport(),
    'software-vendor': () => PageSoftwareVendor(),
    'about': () => PageAbout(),
    'news': () => PageNews(),
    'contact': () => PageContact(),
  };

  // ── Navigation ────────────────────────────────────────────────────────────

  function navigateTo(pageId) {
    if (!pageBuilders[pageId]) return;
    currentPage = pageId;

    // --- The Global Theme Switch ---
    // This adds the class to the BODY, affecting everything on the page
    document.body.classList.toggle('support-theme', pageId === 'it-support');
    // -------------------------------

    app.innerHTML = '';
    const newContent = pageBuilders[pageId]();
    app.appendChild(newContent);

    window.scrollTo({ top: 0, behavior: 'instant' });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });

    closeMobileMenu();
  }

  // ── Mobile menu ───────────────────────────────────────────────────────────

  function openMobileMenu() {
    if (!mobileNav || !mobileMenuBtn) return;
    mobileNav.classList.add('open');
    mobileMenuBtn.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    if (!mobileNav || !mobileMenuBtn) return;
    mobileNav.classList.remove('open');
    mobileMenuBtn.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn?.addEventListener('click', () => {
    if (!mobileNav) return;

    if (mobileNav.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // ── Wire up all nav links (desktop + mobile) ──────────────────────────────

  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  // ── Logo link ─────────────────────────────────────────────────────────────

  document.querySelector('.logo[data-page]').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home');
  });

  // ── Footer functions ─────────────────────────────────────────────────────────

  function initFooterForm() {
    const formContainer = document.getElementById('footer-form-container');
    if (formContainer) {
        // Clear it first to prevent double-injection
        formContainer.innerHTML = '';
        // Inject your existing ContactForm component
        formContainer.appendChild(ContactForm());
    }
  }

  // Run this when the DOM is ready
  document.addEventListener('DOMContentLoaded', initFooterForm);

  // ── Initial render ────────────────────────────────────────────────────────

  navigateTo('home');

})();
