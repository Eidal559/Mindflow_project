import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.section`
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

const ProfileCard = styled(motion.div)`
  width: 60%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  margin-top: 2rem;
  
  @media (max-width: 48em) {
    width: 90%;
  }
`;

const ProfileInfo = styled.div`
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: ${(props) => props.theme.fontlg};
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: ${(props) => props.theme.fontmd};
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

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <ProfileContainer id="profile">
      <Title data-scroll data-scroll-speed="-2">
        Your Profile
      </Title>
      
      <ProfileCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfileInfo>
          <h2>Name</h2>
          <p>{user?.name || 'User'}</p>
        </ProfileInfo>
        
        <ProfileInfo>
          <h2>Email</h2>
          <p>{user?.email || 'No email provided'}</p>
        </ProfileInfo>
        
        <ProfileInfo>
          <h2>Member Since</h2>
          <p>{new Date().toLocaleDateString()}</p>
        </ProfileInfo>
        
        <Button onClick={logout}>
          Logout
        </Button>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;
