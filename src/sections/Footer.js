import React from "react";
import styled from "styled-components";
import Logo from "../assets/Svgs/mindflow.svg";
import { motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";

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
    
    span {
      transform: none !important;
    }
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const NavItem = styled.li`
  /* Inherit styles from parent li */
`;

const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);
    
    if (elem) {
      scroll.scrollTo(elem, {
        offset: "-100",
        duration: "2000",
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    }
  };

  return (
    <Section>
      <LogoContainer>
        <img data-scroll data-scroll-speed="2" src={Logo} alt="MindFlow" />
        <h3 data-scroll data-scroll-speed="-1">
          MindFlow
        </h3>
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
              <a href="/account" rel="noreferrer">
                account
              </a>
            </NavItem>
            <NavItem>
              <a href="/contact" rel="noreferrer">
                contact
              </a>
            </NavItem>
          </ul>
        </nav>
        <Bottom>
          <span
            data-scroll
            data-scroll-speed="2"
            data-scroll-direction="horizontal"
          >
            &copy; {new Date().getFullYear()}. All Rights Reserved.
          </span>
          <span
            data-scroll
            data-scroll-speed="-2"
            data-scroll-direction="horizontal"
          >
            MindFlow - Your personal wellness companion
          </span>
        </Bottom>
      </FooterComponent>
    </Section>
  );
};

export default Footer;
