import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.grey};
`;

const Container = styled.div`
  width: 80vw;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;

  @media (max-width: 64em) {
    width: 85vw;
  }
  @media (max-width: 48em) {
    width: 90vw;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  color: ${(props) => props.theme.body};
  margin-bottom: 4rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const ExercisesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  width: 100%;
`;

const ExerciseCard = styled(motion.div)`
  width: 300px;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: ${(props) => props.theme.fontlg};
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    font-size: ${(props) => props.theme.fontmd};
    margin-bottom: 1.5rem;
  }

  @media (max-width: 30em) {
    width: 100%;
  }
`;

const CircleAnimation = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 auto 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .inner-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .breathing-text {
    font-size: ${(props) => props.theme.fontmd};
    text-align: center;
  }

  .animation {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: pulse 8s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: rgba(255, 255, 255, 0.1);
    }
    25% {
      transform: scale(1);
      background-color: rgba(255, 255, 255, 0.2);
    }
    50% {
      transform: scale(0.8);
      background-color: rgba(255, 255, 255, 0.1);
    }
    75% {
      transform: scale(1);
      background-color: rgba(255, 255, 255, 0.2);
    }
    100% {
      transform: scale(0.8);
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const BreathingExercises = () => {
  return (
    <Section id="exercises">
      <Container>
        <Title data-scroll data-scroll-speed="-2">
          Breathing Exercises
        </Title>
        <ExercisesContainer>
          <ExerciseCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <CircleAnimation>
              <div className="animation"></div>
              <div className="inner-circle">
                <div className="breathing-text">Breathe</div>
              </div>
            </CircleAnimation>
            <h2>Deep Breathing</h2>
            <p>
              A simple technique to help calm your mind and relax your body.
              Breathe in deeply through your nose for 4 counts, hold for 2
              counts, then exhale slowly through your mouth for 6 counts.
            </p>
            <p>
              Practice for 2-5 minutes when feeling stressed for immediate
              relief.
            </p>
          </ExerciseCard>

          <ExerciseCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <CircleAnimation>
              <div className="animation"></div>
              <div className="inner-circle">
                <div className="breathing-text">4-4-4-4</div>
              </div>
            </CircleAnimation>
            <h2>Box Breathing</h2>
            <p>
              Used by Navy SEALs to remain calm in stressful situations. Breathe
              in for 4 counts, hold for 4 counts, exhale for 4 counts, and hold
              for 4 counts.
            </p>
            <p>
              Complete this cycle 4-5 times for a reset when feeling
              overwhelmed.
            </p>
          </ExerciseCard>

          <ExerciseCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <CircleAnimation>
              <div className="animation"></div>
              <div className="inner-circle">
                <div className="breathing-text">4-7-8</div>
              </div>
            </CircleAnimation>
            <h2>4-7-8 Breathing</h2>
            <p>
              A tranquilizing breath that can help reduce anxiety and help with
              sleep. Breathe in quietly through your nose for 4 counts, hold for
              7 counts, then exhale completely through your mouth for 8 counts.
            </p>
            <p>
              Practice twice daily or when experiencing high levels of stress.
            </p>
          </ExerciseCard>
        </ExercisesContainer>
      </Container>
    </Section>
  );
};

export default BreathingExercises;
