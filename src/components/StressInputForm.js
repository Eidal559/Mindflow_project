import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FormContainer = styled.section`
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

const Form = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 48em) {
    width: 90%;
  }
`;

const StressLevel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const SliderContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const Slider = styled.input`
  width: 100%;
  height: 15px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    #4CAF50,
    #FFEB3B,
    #FF5722
  );
  border-radius: 10px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    background: ${(props) => props.theme.text};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

const Label = styled.span`
  font-size: ${(props) => props.theme.fontmd};
`;

const ResultContainer = styled(motion.div)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  margin-top: 2rem;
`;

const RecommendationTitle = styled.h2`
  font-size: ${(props) => props.theme.fontlg};
  margin-bottom: 1rem;
`;

const RecommendationItem = styled.div`
  margin-bottom: 1.5rem;
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
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StressInputForm = () => {
  const [stressLevel, setStressLevel] = useState(5);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSliderChange = (e) => {
    setStressLevel(parseInt(e.target.value));
  };

  const getRecommendations = () => {
    setShowRecommendations(true);
  };

  // Define recommendations based on stress levels
  const getBreathingExercise = () => {
    if (stressLevel <= 3) {
      return "Deep Breathing: Breathe in for 4 counts, hold for 2, exhale for 6. Repeat for 2 minutes.";
    } else if (stressLevel <= 7) {
      return "Box Breathing: Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat for 5 minutes.";
    } else {
      return "4-7-8 Breathing: Breathe in for 4 counts, hold for 7, exhale for 8. Repeat for 5-10 minutes.";
    }
  };

  const getPhysicalActivity = () => {
    if (stressLevel <= 3) {
      return "Light stretching or a short walk outside.";
    } else if (stressLevel <= 7) {
      return "15-minute yoga session focused on mindfulness.";
    } else {
      return "30-minute brisk walk or moderate exercise to release tension.";
    }
  };

  return (
    <FormContainer id="stress-tool">
      <Title data-scroll data-scroll-speed="-2">
        Stress Management Tool
      </Title>
      <Form>
        <StressLevel>
          <h2>How stressed are you feeling right now?</h2>
          <SliderContainer>
            <Slider 
              type="range" 
              min="1" 
              max="10" 
              value={stressLevel} 
              onChange={handleSliderChange}
            />
          </SliderContainer>
          <SliderLabels>
            <Label>Low Stress (1)</Label>
            <Label>Moderate (5)</Label>
            <Label>High Stress (10)</Label>
          </SliderLabels>
          <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>
            Current level: {stressLevel}
          </h3>
        </StressLevel>
        
        <Button onClick={getRecommendations}>
          Get Personalized Recommendations
        </Button>

        {showRecommendations && (
          <ResultContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RecommendationTitle>
              Personalized Recommendations for Stress Level {stressLevel}
            </RecommendationTitle>
            
            <RecommendationItem>
              <h3>Breathing Exercise</h3>
              <p>{getBreathingExercise()}</p>
            </RecommendationItem>
            
            <RecommendationItem>
              <h3>Physical Activity</h3>
              <p>{getPhysicalActivity()}</p>
            </RecommendationItem>
          </ResultContainer>
        )}
      </Form>
    </FormContainer>
  );
};

export default StressInputForm;
