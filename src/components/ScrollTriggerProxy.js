// src/components/ScrollTriggerProxy.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const ScrollTriggerProxy = () => {
  // First let's get instance of locomotive scroll
  const { scroll } = useLocomotiveScroll();

  // Register scroll trigger plugin
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (scroll) {
      const element = scroll?.el; // locomotive scrolling element, in our case it's app (main)

      scroll.on("scroll", ScrollTrigger.update); // No throttling for smoother experience

      // Let's use scroller proxy
      ScrollTrigger.scrollerProxy(element, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: element.style.transform ? "transform" : "fixed",
      });

      // Refresh ScrollTrigger after the scroll is ready
      scroll.on("call", (value, way, obj) => {
        if (value === "refresh") {
          ScrollTrigger.refresh();
        }
      });
    }

    return () => {
      if (scroll) {
        // Clean up listeners when component unmounts
        ScrollTrigger.addEventListener("refresh", () => scroll?.update());
        ScrollTrigger.refresh();
      }
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;
