// src/App.js - updated with new sections
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useEffect, useRef, useState } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css'

import Home from "./sections/Home";
import { AnimatePresence } from "framer-motion";
import About from "./sections/About";
import ScrollTriggerProxy from './components/ScrollTriggerProxy';
import ScrollBehavior from './components/ScrollBehavior'; // Add this
import Footer from './sections/Footer';
import Loader from "./components/Loader";
import StressInputForm from "./components/StressInputForm";
import BreathingExercises from "./sections/BreathingExercises";
import Authentication from "./sections/Authentication"; // Add this
import UserProfile from "./sections/UserProfile"; // Add this

function App() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track auth state

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, [])

  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            lerp: 0.1, // Smoother scrolling
            multiplier: 0.5, // Slower scroll
            smartphone:{
              smooth: true,
              lerp: 0.1,
            },
            tablet:{
              smooth: true,
              lerp: 0.1,
            }
          }}
          watch={[loggedIn]} // Watch auth state for content changes
          containerRef={containerRef}
        >
        <AnimatePresence>
        {loaded ? null : <Loader />}
        </AnimatePresence>
        <ScrollTriggerProxy />
        <ScrollBehavior /> {/* Add the scroll behavior controller */}
          <AnimatePresence>
          <main className='App' data-scroll-container ref={containerRef}>
            <Home />
            <About />
            {loggedIn ? <UserProfile /> : <Authentication />} {/* Conditionally render */}
            <StressInputForm />
            <BreathingExercises />
            <Footer />
          </main>
          </AnimatePresence>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
