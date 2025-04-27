// src/components/ScrollManager.js
import { useEffect } from 'react';

const ScrollManager = () => {
  useEffect(() => {
    // Helper function to check if an element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll animations
    const handleScroll = () => {
      // Get all elements with data-scroll attribute
      const scrollElements = document.querySelectorAll('[data-scroll]');
      
      scrollElements.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('is-visible');
        } else {
          // Optional: remove the class when element is not in viewport
          // element.classList.remove('is-visible');
        }
      });
    };

    // Run once on mount to check initial visible elements
    handleScroll();

    // Set up scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollManager;
