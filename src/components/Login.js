import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const LoginContainer = styled.section`
  width: 80vw;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: relative;
  padding: 5rem 0;

  @media (max-width: 48em) {
    width: 90vw;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 48em) {
    width: 90%;
  }
`;

const InputField = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: ${(props) => props.theme.fontmd};
  }
  
  input {
    width: 100%;
    padding: 1rem;
    font-size: ${(props) => props.theme.fontmd};
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
    border-radius: 5px;
    outline: none;
    
    &:focus {
      border-color: ${(props) => props.theme.accent};
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontmd};
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    
    // In a real app, you would make an API call here
    // For this example, we'll just simulate a successful login
    login({ 
      email, 
      name: email.split('@')[0] // Just use part of the email as the name
    });
    
    // Clear the form
    setEmail("");
    setPassword("");
  };

  return (
    <LoginContainer id="login">
      <Title data-scroll data-scroll-speed="-2">
        Login
      </Title>
      <Form onSubmit={handleSubmit}>
        <InputField>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </InputField>
        
        <InputField>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </InputField>
        
        <Button type="submit">
          Login
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;
