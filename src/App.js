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
import Footer from './sections/Footer';
import Loader from "./components/Loader";
import StressInputForm from "./components/StressInputForm";
import BreathingExercises from "./sections/BreathingExercises";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider

function App() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, [])

  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={dark}>
        {/* Wrap everything with the AuthProvider */}
        <AuthProvider>
          <LocomotiveScrollProvider
            options={{
              smooth: true,
              smartphone:{
                smooth:true,
              },
              tablet:{
                smooth:true,
              }
            }}
            watch={[]}
            containerRef={containerRef}
          >
            <AnimatePresence>
              {loaded ? null : <Loader />}
            </AnimatePresence>
            <ScrollTriggerProxy />
            <AnimatePresence>
              <main className='App' data-scroll-container ref={containerRef}>
                <Home />
                <About />
                <StressInputForm />
                <BreathingExercises />
                <Footer />
              </main>
            </AnimatePresence>
          </LocomotiveScrollProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
