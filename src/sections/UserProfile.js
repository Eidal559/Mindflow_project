// src/sections/UserProfile.js
import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Section = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;
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
  margin-bottom: 3rem;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const ProfileContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 48em) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontxxl};
  color: ${(props) => props.theme.body};
`;

const UserInfo = styled.div`
  flex: 1;
  
  h2 {
    font-size: ${(props) => props.theme.fontxl};
    margin-bottom: 0.5rem;
  }
  
  p {
    opacity: 0.8;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const StatCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  
  h3 {
    font-size: ${(props) => props.theme.fontlg};
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: ${(props) => props.theme.fontxl};
    font-weight: 600;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontmd};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return null; // Don't render if no user
  }

  return (
    <Section id="profile">
      <Title data-scroll data-scroll-speed="-1">Your Profile</Title>
      <ProfileContainer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <ProfileHeader>
          <Avatar>{user.name.charAt(0)}</Avatar>
          <UserInfo>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Member since: {user.joinDate}</p>
          </UserInfo>
        </ProfileHeader>
        
        <StatsContainer>
          <StatCard 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Sessions Completed</h3>
            <div className="value">{user.stats.sessionsCompleted}</div>
          </StatCard>
          
          <StatCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Average Stress Level</h3>
            <div className="value">{user.stats.averageStressLevel}</div>
          </StatCard>
          
          <StatCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Current Streak</h3>
            <div className="value">{user.stats.streakDays} days</div>
          </StatCard>
        </StatsContainer>
        
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <LogoutButton onClick={logout}>
            Log Out
          </LogoutButton>
        </div>
      </ProfileContainer>
    </Section>
  );
};

export default UserProfile;
