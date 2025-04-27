// src/components/FallbackScrolling.js
import { useEffect } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const FallbackScrolling = () => {
  const { scroll } = useLocomotiveScroll();
  
  useEffect(() => {
    // Check if scrolling is working after a reasonable time
    const timeoutId = setTimeout(() => {
      // If there's a scroll instance but window scrolling isn't working
      if (scroll && window.scrollY === 0) {
        console.log("Applying fallback scrolling");
        
        // Add normal scrolling styles to body
        document.body.style.height = 'auto';
        document.body.style.overflow = 'auto';
        document.body.style.overscrollBehavior = 'auto';
        
        // Add scrolling styles to main container
        const mainContainer = document.querySelector('[data-scroll-container]');
        if (mainContainer) {
          mainContainer.style.position = 'relative';
          mainContainer.style.overflow = 'visible';
          mainContainer.style.height = 'auto';
        }
        
        // Re-enable native scrolling on all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
          section.style.position = 'relative';
          section.style.overflow = 'visible';
        });
      }
    }, 5000); // 5 seconds should be enough to determine if scrolling is working
    
    return () => clearTimeout(timeoutId);
  }, [scroll]);
  
  return null;
};

export default FallbackScrolling;
