/**
 * Lazy Loading Implementation with Intersection Observer
 * Fallback untuk browser yang tidak support native lazy loading
 */

(function() {
  'use strict';

  // Check if browser supports native lazy loading
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading, no need for polyfill
    console.log('Native lazy loading supported');
    return;
  }

  // Fallback: Implement Intersection Observer for lazy loading
  console.log('Using Intersection Observer fallback for lazy loading');

  // Get all images with loading="lazy" attribute
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          
          // Load srcset if available
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Remove loading attribute
          img.removeAttribute('loading');
          
          // Add loaded class for styling
          img.classList.add('lazy-loaded');
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      // Load images 50px before they enter viewport
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all lazy images
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    // Load all images immediately
    console.warn('Intersection Observer not supported, loading all images immediately');
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      img.removeAttribute('loading');
    });
  }

  // Handle image load errors
  lazyImages.forEach(img => {
    img.addEventListener('error', function() {
      console.error('Failed to load image:', this.src);
      // Add error class for styling
      this.classList.add('lazy-error');
    });
  });
})();
