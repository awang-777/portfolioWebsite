import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000000;
  color: #ffffff;
  padding: 2rem;
  text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 800px;
`;

const TextLine = styled(motion.div)`
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'Calibri', 'Calibri Light', 'Candara', 'Segoe UI', 'Trebuchet MS', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const EnterButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Calibri', 'Calibri Light', 'Candara', 'Segoe UI', 'Trebuchet MS', sans-serif;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
`;

const LINES = [
  "Hi :)",
  "Nice to meet you.",
  "My name is Amanda Wang...",
  "and I'm a creative technologist.",
  "Curious?",
  "Come take a look...",
];

const Loading = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers = LINES.map((_, index) => {
      return setTimeout(() => {
        setCurrentLine(index + 1);
        if (index === LINES.length - 1) {
          // After the last line, wait 2.5 seconds then show button
          setTimeout(() => {
            setShowButton(true);
          }, 2500);
        }
      }, index * 2500); // 2.5 seconds between each line
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleEnter = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate('/');
    }
  };

  return (
    <LoadingContainer>
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
        
        {showButton && (
          <EnterButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={handleEnter}
          >
            Enter
          </EnterButton>
        )}
      </TextContainer>
    </LoadingContainer>
  );
};

export default Loading;
