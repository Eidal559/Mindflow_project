import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MindFlowLogo from "../assets/Svgs/mindflow.svg";

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const LogoImg = styled(motion.img)`
  width: 10vw;
  height: auto;
  
  @media (max-width: 48em) {
    width: 20vw;
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  padding-top: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};

const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const Loader = () => {
  return (
    <Container
      initial={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "100%",
        opacity: 0,
      }}
      transition={{
        duration: 2,
      }}
    >
      <LogoImg 
        src={MindFlowLogo} 
        alt="MindFlow Logo"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      />
      <Text variants={textVariants} initial="hidden" animate="visible">
        MindFlow
      </Text>
    </Container>
  );
};

export default Loader;
