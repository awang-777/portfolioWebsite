<<<<<<< Updated upstream
import React from 'react';
import { Link } from 'react-router-dom';
=======
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> Stashed changes
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  padding-top: 80px; /* Account for fixed header */
  min-height: 100vh;
  background: #000;
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #000000;
  gap: 4rem;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  
  @media (max-width: 968px) {
    flex: 1;
  }
`;

const CyclingImage = styled.img`
  width: 1200px;
  height: auto;
  transition: opacity 0.3s ease-in-out;
  flex-shrink: 0;
  
  @media (max-width: 1600px) {
    width: 1000px;
  }
  
  @media (max-width: 1400px) {
    width: 900px;
  }
  
  @media (max-width: 1200px) {
    width: 700px;
  }
  
  @media (max-width: 968px) {
    width: 600px;
    max-width: 90vw;
  }
  
  @media (max-width: 768px) {
    width: 500px;
    max-width: 85vw;
  }
  
  @media (max-width: 480px) {
    width: 350px;
    max-width: 80vw;
  }
`;

const SelectionBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #ffffff;
  max-width: 50%;
  
  @media (max-width: 968px) {
    max-width: 100%;
    align-items: flex-start;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
`;

const TextLine = styled(motion.div)`
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'Calibri', 'Calibri Light', 'Candara', 'Segoe UI', 'Trebuchet MS', sans-serif;
  text-align: left;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NavLink = styled(motion.div)`
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'Calibri', 'Calibri Light', 'Candara', 'Segoe UI', 'Trebuchet MS', sans-serif;
  text-align: left;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #cccccc;
  }
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const BearImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-bottom: 2rem;
  opacity: 1;
  filter: none;
  
  @media (max-width: 768px) {
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    max-width: 95%;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: #ffffff;
  color: black;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const images = [
    '/A.png',    // 0 - default
    '/B.png',   // 1 - mouse moving
    '/C.png'    // 2 - hovering nav items
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Default to A.png
  const [currentLine, setCurrentLine] = useState(0);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const mouseMoveTimeoutRef = useRef(null);

  const menuItems = [
    'Welcome, where would you like to go?',
    'Interactive Installation',
    'Generative Visuals',
    'Experiments/Studio'
  ];

  // Handle hover state - takes priority over mouse movement
  useEffect(() => {
    if (isHoveringNav) {
      setCurrentImageIndex(2); // Show C.png when hovering nav items
      // Clear any pending mouse move timeout
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
        mouseMoveTimeoutRef.current = null;
      }
    }
  }, [isHoveringNav]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!isHoveringNav) {
        setCurrentImageIndex(1); // Show B.png when mouse moves
        
        // Clear existing timeout
        if (mouseMoveTimeoutRef.current) {
          clearTimeout(mouseMoveTimeoutRef.current);
        }
        
        // Set timeout to return to default after mouse stops moving
        mouseMoveTimeoutRef.current = setTimeout(() => {
          if (!isHoveringNav) {
            setCurrentImageIndex(0); // Return to default A.png
          }
        }, 1000); // 1 second after mouse stops moving
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, [isHoveringNav]);

  useEffect(() => {
    const timers = menuItems.map((_, index) => {
      return setTimeout(() => {
        setCurrentLine(index + 1);
      }, index * 1500); // 1.5 seconds between each line, same as Loading.js
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigation = (category) => {
    const encodedCategory = encodeURIComponent(category);
    navigate(`/projects/category/${encodedCategory}`);
  };

  const handleNavHoverEnter = () => {
    setIsHoveringNav(true);
  };

  const handleNavHoverLeave = () => {
    setIsHoveringNav(false);
    // Will return to default or B.png based on mouse movement
    setCurrentImageIndex(0); // Return to default, mouse movement will update if needed
  };

  return (
    <HomeContainer>
      <HeroSection>
<<<<<<< Updated upstream
        <HeroContent>
          <BearImage src="/bear.jpeg" alt="Bear" />
          <CTAButton to="/projects">Explore</CTAButton>
        </HeroContent>
=======
        <ImageContainer>
          <CyclingImage 
            src={images[currentImageIndex]} 
            alt="Cycling images"
          />
        </ImageContainer>
        <SelectionBar>
          <TextContainer>
            {menuItems.slice(0, currentLine).map((item, index) => {
              // First item is the welcome message
              if (index === 0) {
                return (
                  <TextLine
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {item}
                  </TextLine>
                );
              }
              // Other items are navigation links
              return (
                <NavLink
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onClick={() => handleNavigation(item)}
                  onMouseEnter={handleNavHoverEnter}
                  onMouseLeave={handleNavHoverLeave}
                  whileHover={{ x: 10 }}
                >
                  {item}
                </NavLink>
              );
            })}
          </TextContainer>
        </SelectionBar>
>>>>>>> Stashed changes
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;
