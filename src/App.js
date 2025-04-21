// src/App.js - simplified version
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef, useState } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css'

import Home from "./sections/Home";
import { AnimatePresence } from "framer-motion";
import About from "./sections/About";
import ScrollTriggerProxy from './components/ScrollTriggerProxy';
import Footer from './sections/Footer';
import Loader from "./components/Loader";
import StressInputForm from "./components/StressInputForm";
import BreathingExercises from "./sections/BreathingExercises";


function App() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Set up a timeout to show the loader for 3 seconds
  setTimeout(() => {
    setLoaded(true);
  }, 3000);

  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            smartphone:{
              smooth: true,
            },
            tablet:{
              smooth: true,
            }
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <AnimatePresence>
            {loaded ? null : <Loader />}
          </AnimatePresence>
          <ScrollTriggerProxy />
          {/* <ScrollBehavior /> */}
          <AnimatePresence>
            <main className='App' data-scroll-container ref={containerRef}>
              <Home />
              <About />
              {/* {isLoggedIn ? <UserProfile /> : <Authentication />} */}
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
