// src/sections/Authentication.js
import React, { useState } from "react";
import styled from "styled-components";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: relative;
`;

const Container = styled.div`
  width: 80vw;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;

  @media (max-width: 48em) {
    width: 90vw;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  margin-bottom: 4rem;
  text-align: center;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <Section id="auth">
      <Container>
        <Title data-scroll data-scroll-speed="-2">
          {isLogin ? "Welcome Back" : "Join MindFlow"}
        </Title>
        
        {isLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </Container>
    </Section>
  );
};

export default Authentication;
