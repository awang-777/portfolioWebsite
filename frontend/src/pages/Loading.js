import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #000000;
  color: #ffffff;
  padding: 2rem;
  text-align: left;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 800px;
  text-align: left;
`;

const TextLine = styled(motion.div)`
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'Calibri', 'Calibri Light', 'Candara', 'Segoe UI', 'Trebuchet MS', sans-serif;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;


const CharacterImage = styled(motion.img)` 
  position: fixed;
  bottom: 4rem;
  width: 1100px;
  height: auto;
  z-index: 10;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 700px;
    bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    width: 400px;
    bottom: 2rem;
  }
`;

const GrassImage = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: auto;
  object-fit: cover;
  z-index: 5;
  pointer-events: none;
`;

const LINES = [
  "Hi :)",
  "Nice to meet you.",
  "My name is Amanda Wang...",
  "and I'm a creative technologist.",
  "Curious?",
  "Come take a look... (Press A or D to move//move off the right side of the screen to continue)",
];

const Loading = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentLine, setCurrentLine] = useState(0);
  const [characterX, setCharacterX] = useState(32); // Starting position in pixels (2rem = 32px)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  useEffect(() => {
    const timers = LINES.map((_, index) => {
      return setTimeout(() => {
        setCurrentLine(index + 1);
      }, index * 1500); // 1.5 seconds between each line
    });

    // Mark as animated in after initial animation completes
    setTimeout(() => {
      setHasAnimatedIn(true);
    }, 1300); // 0.5s delay + 0.8s duration

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!hasAnimatedIn) return;

    const handleKeyPress = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        setCharacterX(prev => prev - 50); // Move left
      } else if (e.key === 'd' || e.key === 'D') {
        setCharacterX(prev => prev + 50); // Move right
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [hasAnimatedIn]);

  useEffect(() => {
    if (!hasAnimatedIn) return;

    const screenWidth = window.innerWidth;
    
    // Check if character's left edge has moved off the right side of the screen
    if (characterX > screenWidth) {
      if (onComplete) {
        onComplete();
      } else {
        navigate('/');
      }
    }
  }, [characterX, navigate, onComplete, hasAnimatedIn]);

  return (
    <LoadingContainer>
      <GrassImage
        src="/grass3.png"
        alt="Grass"
      />
      <CharacterImage
        src="/final.png"
        alt="Character"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
        style={{ 
          left: `${characterX}px`,
          transition: hasAnimatedIn ? 'left 0.2s ease-out' : 'none'
        }}
      />
      <TextContainer>
        {LINES.slice(0, currentLine).map((line, index) => (
          <TextLine
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {line}
          </TextLine>
        ))}
      </TextContainer>
    </LoadingContainer>
  );
};

export default Loading;
