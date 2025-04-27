// src/sections/Footer.js
import React from "react";
import styled from "styled-components";
import Logo from "../assets/Svgs/mindflow.svg";
import { motion } from "framer-motion";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 10vw;
    height: auto;
  }
  
  h3 {
    font-size: ${(props) => props.theme.fontxxl};
    font-family: "Kaushan Script";

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxl};
    }
  }
`;

const FooterComponent = styled(motion.footer)`
  width: 80vw;

  @media (max-width: 48em) {
    width: 90vw;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 2rem;
    margin-top: 4rem;
    padding: 0 1rem;
    border-top: 1px solid ${(props) => props.theme.text};
    border-bottom: 1px solid ${(props) => props.theme.text};

    @media (max-width: 48em) {
      justify-content: center;
    }
  }

  li {
    padding: 2rem;
    font-size: ${(props) => props.theme.fontlg};
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 48em) {
      padding: 1rem;
      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const Bottom = styled.div`
  padding: 0.5rem 0;
  margin: 0 4rem;
  font-size: ${(props) => props.theme.fontlg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  a {
    text-decoration: underline;
  }

  @media (max-width: 64em) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0;
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const NavItem = styled.li`
  /* Inherit styles from parent li */
`;

const Footer = () => {
  const handleScroll = (id) => {
    let elem = document.querySelector(id);
    
    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section>
      <LogoContainer>
        <img src={Logo} alt="MindFlow" />
        <h3>MindFlow</h3>
      </LogoContainer>

      <FooterComponent
        initial={{ y: "-400px" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
        }}
      >
        <nav aria-label="Footer Navigation">
          <ul>
            <NavItem 
              onClick={() => handleScroll("#home")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleScroll("#home")}
            >
              home
            </NavItem>
            <NavItem 
              onClick={() => handleScroll(".about")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleScroll(".about")}
            >
              about
            </NavItem>
            <NavItem 
              onClick={() => handleScroll("#exercises")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleScroll("#exercises")}
            >
              exercises
            </NavItem>
            <NavItem 
              onClick={() => handleScroll("#stress-tool")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleScroll("#stress-tool")}
            >
              stress tool
            </NavItem>
            <NavItem>
              <a href="#auth" onClick={() => handleScroll("#auth")}>
                account
              </a>
            </NavItem>
            <NavItem>
              <a href="#contact" onClick={() => handleScroll("#contact")}>
                contact
              </a>
            </NavItem>
          </ul>
        </nav>
        <Bottom>
          <span>
            &copy; {new Date().getFullYear()}. All Rights Reserved.
          </span>
          <span>
            MindFlow - Your personal wellness companion
          </span>
        </Bottom>
      </FooterComponent>
    </Section>
  );
};

export default Footer;
