import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { ThemeProvider } from 'styled-components';
import { dark } from '../styles/Themes';
import GlobalStyles from '../styles/GlobalStyles';
import NavBar from '../components/NavBar';
import Footer from '../sections/Footer';
import ScrollTriggerProxy from '../components/ScrollTriggerProxy';

const MainLayout = () => {
  const containerRef = useRef(null);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            smartphone: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            }
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <ScrollTriggerProxy />
          <main className="App" data-scroll-container ref={containerRef}>
            <NavBar />
            <Outlet /> {/* This is where the route components will be rendered */}
            <Footer />
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
