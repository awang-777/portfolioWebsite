import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding-top: 80px; /* Account for fixed header */
  min-height: 100vh;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Immersive Art Experiences</HeroTitle>
          <HeroSubtitle>
            Creating boundary-pushing digital art that challenges perception and engages the senses
          </HeroSubtitle>
          <CTAButton href="/projects">Explore Projects</CTAButton>
        </HeroContent>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;
