// Create a new component: src/components/ScrollBehavior.js
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const ScrollBehavior = () => {
  const { scroll } = useLocomotiveScroll();
  
  useEffect(() => {
    if (!scroll) return;
    
    // Disable animations for specific sections
    const aboutSection = document.querySelector('.about');
    const exercisesSection = document.querySelector('#exercises');
    const stressToolSection = document.querySelector('#stress-tool');
    
    if (aboutSection) scroll.stop(aboutSection);
    if (exercisesSection) scroll.stop(exercisesSection);
    if (stressToolSection) scroll.stop(stressToolSection);
    
    return () => {
      // Clean up if needed
      if (scroll) scroll.start();
    };
  }, [scroll]);
  
  return null;
};

export default ScrollBehavior;
