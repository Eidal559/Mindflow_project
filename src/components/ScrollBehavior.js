// src/components/ScrollBehavior.js
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const ScrollBehavior = () => {
  const { scroll } = useLocomotiveScroll();
  
  useEffect(() => {
    if (!scroll) return;
    
    // Add a small delay to ensure DOM elements are fully rendered
    const timeoutId = setTimeout(() => {
      // Disable animations for specific sections
      const aboutSection = document.querySelector('.about');
      const exercisesSection = document.querySelector('#exercises');
      const stressToolSection = document.querySelector('#stress-tool');
      const authSection = document.querySelector('#auth');
      const profileSection = document.querySelector('#profile');
      
      if (aboutSection) scroll.stop(aboutSection);
      if (exercisesSection) scroll.stop(exercisesSection);
      if (stressToolSection) scroll.stop(stressToolSection);
      if (authSection) scroll.stop(authSection);
      if (profileSection) scroll.stop(profileSection);
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      if (scroll) scroll.start();
    };
  }, [scroll]);
  
  return null;
};

export default ScrollBehavior;
