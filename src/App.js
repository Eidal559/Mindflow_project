// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { dark } from "./styles/Themes";
import GlobalStyles from "./styles/GlobalStyles";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/Loader";
import { AnimatePresence } from "framer-motion";
import Home from "./sections/Home";
import About from "./sections/About";
import BreathingExercises from "./sections/BreathingExercises";
import StressInputForm from "./components/StressInputForm";
import Footer from "./sections/Footer";

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
        <AuthProvider>
          <BrowserRouter>
            <AnimatePresence>
              {loaded ? null : <Loader />}
            </AnimatePresence>
            
            {loaded && (
              <main className="App">
                <Home />
                <About />
                <StressInputForm />
                <BreathingExercises />
                <Footer />
              </main>
            )}
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
