import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import MindFlowLogo from "../assets/Svgs/mindflow.svg";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 100%;
  color: ${(props) => props.theme.text};
  z-index: 5;

  a {
    display: flex;
    align-items: flex-end;
  }
`;

const LogoImg = styled.img`
  width: 4rem;
  height: auto;
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,
    transition: {
      duration: 2,
      delay: 5,
      ease: "easeInOut",
    },
  },
};

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <LogoImg src={MindFlowLogo} alt="MindFlow Logo" />
        <Text variants={textVariants} initial="hidden" animate="visible">
          MindFlow
        </Text>
      </Link>
    </Container>
  );
};

export default Logo;
