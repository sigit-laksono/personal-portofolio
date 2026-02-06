/**
 * Navigation Module - Vanilla JavaScript
 * Handles smooth scrolling, mobile menu toggle, and scroll spy
 * Replaces jQuery dependencies with native JavaScript
 */

(function() {
  'use strict';

  /**
   * Smooth Scroll Navigation
   * Handles clicks on anchor links and smoothly scrolls to target sections
   */
  function initSmoothScroll() {
    // Select all navigation links with href starting with #
    const scrollTriggers = document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])');
    
    scrollTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        // Check if link is for same page
        if (
          location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
          location.hostname === this.hostname
        ) {
          // Get target element
          const targetId = this.hash;
          const target = document.querySelector(targetId);
          
          if (target) {
            e.preventDefault();
            
            // Smooth scroll to target
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL hash without jumping
            if (history.pushState) {
              history.pushState(null, null, targetId);
            } else {
              // Fallback for older browsers
              location.hash = targetId;
            }
            
            return false;
          }
        }
      });
    });
  }

  /**
   * Mobile Menu Toggle
   * Closes responsive menu when a scroll trigger link is clicked
   */
  function initMobileMenuClose() {
    const scrollTriggers = document.querySelectorAll('.js-scroll-trigger');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarCollapse) return;
    
    scrollTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        // Check if menu is open (has 'show' class)
        if (navbarCollapse.classList.contains('show')) {
          // Remove 'show' class to close menu
          navbarCollapse.classList.remove('show');
          
          // Update aria-expanded on toggle button
          const toggleButton = document.querySelector('.navbar-toggler');
          if (toggleButton) {
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.classList.add('collapsed');
          }
        }
      });
    });
  }

  /**
   * Click Outside to Close Navbar
   * Closes mobile menu when user clicks outside the navbar
   */
  function initClickOutsideClose() {
    const navbar = document.getElementById('sideNav');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (!navbar || !navbarCollapse || !navbarToggler) return;
    
    // Only handle click outside on mobile (when toggler is visible)
    document.addEventListener('click', function(event) {
      // Check if navbar toggler is visible (mobile view)
      const isTogglerVisible = window.getComputedStyle(navbarToggler).display !== 'none';
      
      // Check if menu is open
      const isMenuOpen = navbarCollapse.classList.contains('show');
      
      // Check if click is outside navbar
      const isClickOutside = !navbar.contains(event.target);
      
      // Close menu if all conditions are met
      if (isTogglerVisible && isMenuOpen && isClickOutside) {
        navbarCollapse.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.classList.add('collapsed');
      }
    });
  }

  /**
   * Scroll Spy
   * Adds active class to navbar items based on scroll position
   */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link.js-scroll-trigger');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveLink() {
      let currentSection = '';
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      // Find which section is currently in view
      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Check if section is in viewport (with offset for navbar)
        if (scrollPosition >= sectionTop - 100) {
          currentSection = section.getAttribute('id');
        }
      });
      
      // Update active class on nav links
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        
        // Check if link href matches current section
        const href = link.getAttribute('href');
        if (href === '#' + currentSection) {
          link.classList.add('active');
        }
      });
    }
    
    // Update on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = window.requestAnimationFrame(function() {
        updateActiveLink();
      });
    });
    
    // Initial update
    updateActiveLink();
  }

  /**
   * Keyboard Navigation
   * Handles keyboard events for accessibility
   */
  function initKeyboardNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link.js-scroll-trigger');
    
    // Handle Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          if (navbarToggler) {
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarToggler.classList.add('collapsed');
            navbarToggler.focus(); // Return focus to toggle button
          }
        }
      }
    });
    
    // Handle Enter and Space on navigation links
    navLinks.forEach(function(link) {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
          e.preventDefault();
          link.click();
        }
      });
    });
    
    // Handle navbar toggler keyboard activation
    if (navbarToggler) {
      navbarToggler.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
          e.preventDefault();
          navbarToggler.click();
        }
      });
    }
    
    // Trap focus within mobile menu when open
    if (navbarCollapse) {
      const focusableElements = navbarCollapse.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        navbarCollapse.addEventListener('keydown', function(e) {
          if (e.key === 'Tab' || e.keyCode === 9) {
            if (navbarCollapse.classList.contains('show')) {
              if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                  e.preventDefault();
                  lastFocusable.focus();
                }
              } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                  e.preventDefault();
                  firstFocusable.focus();
                }
              }
            }
          }
        });
      }
    }
  }

  /**
   * Initialize all navigation functionality
   */
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initMobileMenuClose();
        initClickOutsideClose();
        initScrollSpy();
        initKeyboardNavigation();
      });
    } else {
      // DOM already loaded
      initSmoothScroll();
      initMobileMenuClose();
      initClickOutsideClose();
      initScrollSpy();
      initKeyboardNavigation();
    }
  }

  // Initialize navigation
  init();

})();
