/**
 * Resume.js - Main initialization script
 * Vanilla JavaScript implementation (No jQuery)
 * 
 * This file serves as the main entry point and initializes all components.
 * Individual component logic is separated into their own modules:
 * - navigation.js: Handles smooth scrolling, menu toggle, and scroll spy
 * - lazy-loading.js: Handles image lazy loading
 */

(function() {
  'use strict';

  /**
   * Initialize all components when DOM is ready
   */
  function init() {
    // All functionality is now handled by separate modules:
    // - navigation.js handles smooth scrolling, menu toggle, and scroll spy
    // - lazy-loading.js handles image lazy loading
    
    // Log initialization for debugging
    if (window.console && console.log) {
      console.log('Portfolio initialized successfully');
      console.log('Navigation module loaded:', typeof window.Navigation !== 'undefined');
      console.log('Lazy loading module loaded:', typeof window.LazyLoadingManager !== 'undefined');
    }
    
    // Add any additional initialization code here if needed
    initAccessibilityFeatures();
  }

  /**
   * Initialize accessibility features
   */
  function initAccessibilityFeatures() {
    // Ensure skip-to-content link works properly
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Add focus visible polyfill for better keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('user-is-tabbing');
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


