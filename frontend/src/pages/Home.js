import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: #000;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #000000;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
        </HeroContent>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;
