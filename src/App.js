// src/App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";

import Home from "./sections/Home";
import About from "./sections/About";
import Footer from './sections/Footer';
import Loader from "./components/Loader";
import StressInputForm from "./components/StressInputForm";
import BreathingExercises from "./sections/BreathingExercises";

// Basic app without problematic imports
function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        {!loaded && <Loader />}
        
        <main className='App'>
          <Home />
          <About />
          <StressInputForm />
          <BreathingExercises />
          <Footer />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
