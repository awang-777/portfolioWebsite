import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Main container for the entire loading page - no scrolling needed
const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< Updated upstream
  justify-content: center;
=======
  justify-content: flex-start;
>>>>>>> Stashed changes
  background: #000000;
  color: #ffffff;
  padding: 2rem;
  text-align: center;
<<<<<<< Updated upstream
=======
  position: relative;
  overflow: hidden;
>>>>>>> Stashed changes
`;

// Container for the animated text lines that appear in the center of the viewport
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< Updated upstream
  gap: 1.5rem;
  max-width: 800px;
=======
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  position: relative;
  min-height: 100px;
  width: 100%;
>>>>>>> Stashed changes
`;

// Individual text line component with fade in/out animations
const TextLine = styled(motion.div)`
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'Calibri', 'Calibri Light', 'Candara', 'Segoe UI', 'Trebuchet MS', sans-serif;
<<<<<<< Updated upstream
=======
  text-align: center;
  white-space: nowrap;
  position: absolute;
  left: 50%;
>>>>>>> Stashed changes
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

<<<<<<< Updated upstream
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

=======
// Container for the Name.png image that animates up into view
const NameContainer = styled(motion.div)`
  position: fixed;
  z-index: 20;
`;

// Styled component for the Name.png image
const NameImage = styled(motion.img)`
  height: 400px;
  width: auto;
  
  @media (max-width: 1200px) {
    height: 350px;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
  
  @media (max-width: 480px) {
    height: 200px;
  }
`;

// Star image that falls from top to bottom during the animation
const StarImage = styled(motion.img)`
  position: fixed;
  width: 700px; 
  height: auto;
  z-index: 30;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 250px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
  }
`;

// Image component for A.png, B.png, and C.png that cycles through or moves with keyboard
const CyclingImage = styled(motion.img)` 
  position: fixed;
  width: 1100px;
  max-width: 100vw;
  height: auto;
  max-height: 100vh;
  object-fit: contain;
  object-position: center;
  z-index: 10;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 700px;
  }
  
  @media (max-width: 480px) {
    width: 400px;
  }
`;

// Array of text lines that appear sequentially at the start of the loading animation
>>>>>>> Stashed changes
const LINES = [
  "Hi",
  "Nice to meet you",
  "My name is Amanda Wang",
  "and I'm a creative technologist",
  "Curious?",
  "Come take a look...",
<<<<<<< Updated upstream
=======
  "(To continue, use a and d to move)",
>>>>>>> Stashed changes
];

const images = ['/A.png', '/B.png', '/C.png', '/D.png', '/E.png', '/F.png'];
// Sequence pattern: A B C D E F E D C B A...
const imageSequence = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]; // Indices: A, B, C, D, E, F, E, D, C, B, A (repeats)

const Loading = ({ onComplete }) => {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);
=======
  
  // State management for the loading animation sequence
  const [currentLine, setCurrentLine] = useState(0); // Index of currently displayed text line
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index for cycling through A/B/C images
  const [imageX, setImageX] = useState(null); // X position of cycling image: null = centered, otherwise pixel value
  const [isCycling, setIsCycling] = useState(false); // Whether A/B/C images are automatically cycling
  const [showNameImages, setShowNameImages] = useState(false); // Controls visibility of Amanda/Wang name images
  const [textSequenceComplete, setTextSequenceComplete] = useState(false); // True when all text lines have been shown
  const [showCyclingImages, setShowCyclingImages] = useState(false); // Controls visibility of A/B/C cycling images
  const [showStar, setShowStar] = useState(false); // Controls visibility of falling star animation
  const [starAnimationComplete, setStarAnimationComplete] = useState(false); // True when star animation finishes
  const [viewportHeight, setViewportHeight] = useState(0); // Height of viewport, used for star animation calculations
  
  // Refs for managing animations and DOM references
  const cyclingImageRef = useRef(null); // Reference to the cycling image element for position calculations
  const textTimersRef = useRef([]); // Reference to store text sequence timers for cleanup
  const sequencePositionRef = useRef(0); // Position in the image sequence pattern
  const starViewportHeightRef = useRef(null); // Captured viewport height when star animation starts
>>>>>>> Stashed changes

  // Initialize viewport height and reset scroll position on component mount
  // This ensures the page starts at the top and we have accurate viewport measurements
  useEffect(() => {
    // Ensure page starts at top when component loads
    window.scrollTo(0, 0);
    
    // Function to update viewport height (needed for star animation calculations)
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    updateViewportHeight(); // Set initial value
    window.addEventListener('resize', updateViewportHeight); // Update on window resize
    return () => window.removeEventListener('resize', updateViewportHeight); // Cleanup
  }, []);

  // Function to skip to animation sequence (called on click)
  const skipToAnimation = () => {
    // Don't skip if already completed
    if (textSequenceComplete) return;
    
    // Clear all text sequence timers
    textTimersRef.current.forEach(timer => clearTimeout(timer));
    textTimersRef.current = [];
    
    // Immediately complete text sequence and show images
    setTextSequenceComplete(true);
    setCurrentLine(LINES.length + 1); // Set beyond last line to hide all text
    
    // Immediately show images and start cycling (skip star animation)
    setShowCyclingImages(true);
    setIsCycling(true);
    setShowNameImages(true);
    
    // Initialize image position
    setTimeout(() => {
      if (cyclingImageRef.current && imageX === null) {
        const screenWidth = window.innerWidth;
        const imageWidth = cyclingImageRef.current.offsetWidth;
        const centerX = (screenWidth / 2) - (imageWidth / 2);
        setImageX(centerX);
      }
    }, 50);
  };

  // Text sequence animation: displays each line from LINES array sequentially
  // After all lines are shown, triggers the star animation
  useEffect(() => {
    // Create timers for each text line - each appears 1.5 seconds after the previous one
    const timers = LINES.map((_, index) => {
      return setTimeout(() => {
<<<<<<< Updated upstream
        setCurrentLine(index + 1);
        if (index === LINES.length - 1) {
          // After the last line, wait 2.5 seconds then show button
          setTimeout(() => {
            setShowButton(true);
          }, 2500);
        }
      }, index * 2500); // 2.5 seconds between each line
    });

=======
        setCurrentLine(index + 1); // Display the next line
        
        // After the last line (index === LINES.length - 1), prepare for star animation
        if (index === LINES.length - 1) {
          setTimeout(() => {
            setTextSequenceComplete(true); // Mark text sequence as complete (hides text)
            // Start star animation after text exit animation completes
            setTimeout(() => {
              setShowStar(true); // Trigger falling star animation
            }, 600); // Wait for text exit animation to complete (0.6s duration)
          }, 1500); // Wait 1.5s after last line appears before starting transition
        }
      }, index * 1500); // 1.5 seconds delay between each line
    });

    // Store timers in ref for cleanup on click
    textTimersRef.current = timers;

    // Cleanup: clear all timers if component unmounts
>>>>>>> Stashed changes
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

<<<<<<< Updated upstream
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
=======
  // Automatically cycle through A.png, B.png, C.png images every 2 seconds
  // Only runs when cycling is enabled (isCycling) and images are visible (showCyclingImages)
  // Cycling stops when user presses 'a' or 'd' keys to manually control image position
  // Pattern: A B C B A B C B A...
  useEffect(() => {
    if (!isCycling || !showCyclingImages) return; // Don't cycle if disabled or images hidden
    
    // Set up interval to change image index every 2 seconds
    const interval = setInterval(() => {
      const nextPos = (sequencePositionRef.current + 1) % imageSequence.length;
      sequencePositionRef.current = nextPos;
      setCurrentImageIndex(imageSequence[nextPos]);
    }, 700); // 0.7 seconds between each image change

    return () => clearInterval(interval); // Cleanup: clear interval on unmount or dependency change
  }, [isCycling, showCyclingImages]);

  // Keyboard controls: 'a' moves image left, 'd' moves image right
  // When user presses a key, cycling stops and image moves horizontally
  // Moving image off the right edge triggers navigation to home page
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        setIsCycling(false); // Stop automatic cycling
        setCurrentImageIndex(0); // Reset to first image (A.png)
        sequencePositionRef.current = 0; // Reset sequence position
        setImageX(prev => prev !== null ? prev - 50 : 0); // Move 50px left (or start at 0 if centered)
      } else if (e.key === 'd' || e.key === 'D') {
        setIsCycling(false); // Stop automatic cycling
        setCurrentImageIndex(0); // Reset to first image (A.png)
        sequencePositionRef.current = 0; // Reset sequence position
        setImageX(prev => prev !== null ? prev + 50 : 0); // Move 50px right (or start at 0 if centered)
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress); // Cleanup: remove listener
    };
  }, []);

  // When star starts falling, show images
  useEffect(() => {
    if (showStar && viewportHeight > 0) {
      // Capture viewport height when star animation starts (only once)
      if (starViewportHeightRef.current === null) {
        starViewportHeightRef.current = viewportHeight;
      }
      
      // Show all images when star animation begins
      setShowCyclingImages(true); // Show A/B/C cycling images
      setIsCycling(true); // Start automatic cycling through images
      setShowNameImages(true); // Show Amanda/Wang name images
      
      // Calculate the center position of the cycling image in pixels
      // This converts from CSS percentage to pixel value for keyboard movement
      setTimeout(() => {
        if (cyclingImageRef.current && imageX === null) {
          const screenWidth = window.innerWidth;
          const imageWidth = cyclingImageRef.current.offsetWidth;
          // Calculate center: screen center minus half image width
          const centerX = (screenWidth / 2) - (imageWidth / 2);
          setImageX(centerX); // Set initial centered position in pixels
        }
      }, 100); // Small delay to ensure image is rendered before measuring
    }
  }, [showStar, viewportHeight, imageX]);

  // Hide star image when its animation completes
  useEffect(() => {
    if (starAnimationComplete) {
      setShowStar(false); // Remove star from DOM after animation finishes
    }
  }, [starAnimationComplete]);

  // Navigation logic: when user moves image off the right edge, navigate to home page
  // This happens when user presses 'd' key repeatedly to move image to the right
  useEffect(() => {
    if (imageX === null) return; // Don't navigate if image is still centered (hasn't moved yet)
    
    const screenWidth = window.innerWidth;
    // If image X position is beyond screen width, trigger navigation
    if (imageX > screenWidth) {
      if (onComplete) {
        onComplete(); // Call completion callback if provided
      } else {
        navigate('/'); // Otherwise navigate to home page
      }
    }
  }, [imageX, navigate, onComplete]);


  return (
    <LoadingContainer onClick={!textSequenceComplete ? skipToAnimation : undefined} style={{ cursor: !textSequenceComplete ? 'pointer' : 'default' }}>
      {/* Text animations: Display lines from LINES array sequentially in center of viewport */}
      <TextContainer style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}>
        <AnimatePresence mode="wait">
          {/* Show current line if text sequence hasn't completed */}
          {currentLine > 0 && !textSequenceComplete && (
            <TextLine
              key={currentLine - 1}
              initial={{ opacity: 0, y: 20, x: "-50%" }} // Start below and invisible
              animate={{ opacity: 1, y: 0, x: "-50%" }} // Fade in and move to center
              exit={{ opacity: 0, y: -20, x: "-50%" }} // Fade out and move up
              transition={{ duration: 0.6 }}
            >
              {LINES[currentLine - 1]}
            </TextLine>
          )}
        </AnimatePresence>
>>>>>>> Stashed changes
      </TextContainer>

      {/* Falling star animation: Falls from top to bottom over 4 seconds */}
      {showStar && viewportHeight > 0 && (
        <StarImage
          src="/star.png"
          alt="Star"
          initial={{ 
            opacity: 0,
            y: -100 // Start 100px above viewport
          }}
          animate={{ 
            opacity: [0, 1, 1, 0], // Fade in at start, fade out at end
            y: (starViewportHeightRef.current || viewportHeight) + 100 // Fall to 100px below viewport
          }}
          transition={{ 
            duration: 4, // 4 second animation
            ease: "easeIn", // Starts slow, speeds up
            times: [0, 0.1, 0.9, 1] // Opacity keyframes: 0% fade in, 10-90% visible, 100% fade out
          }}
          onAnimationComplete={() => {
            setStarAnimationComplete(true); // Mark animation as complete
          }}
          style={{ left: '50%', transform: 'translateX(-50%)' }} // Center horizontally
        />
      )}

      {/* Name image (Name.png) - animate up from below viewport, positioned to the left of cycling image */}
      {showNameImages && showCyclingImages && viewportHeight > 0 && (
        <NameContainer
          initial={{ 
            y: viewportHeight + 200, // Start below viewport
            x: 100, // Position at left edge
            opacity: 0
          }}
          animate={{ 
            y: 50, // Position near top of viewport
            x: 0, // Position at left edge
            opacity: 1
          }}
          transition={{ 
            duration: 4, // 4 seconds to match star animation
            delay: 0.2, // Start shortly after star animation begins
            ease: "easeIn"
          }}
          style={{ top: 0, left: '2rem' }}
        >
          <NameImage
            src="/Name.png"
            alt="Name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </NameContainer>
      )}

      {/* Cycling images (A.png, B.png, C.png) - animate up from below viewport to center */}
      {showCyclingImages && viewportHeight > 0 && (
        <CyclingImage
          ref={cyclingImageRef}
          src={images[currentImageIndex]}
          alt="Cycling images"
          initial={{ 
            y: viewportHeight + 200, // Start below viewport, slightly lower than names
            x: imageX === null ? '-50%' : 0, // Center horizontally if not moved
            opacity: 0
          }}
          animate={{ 
            y: viewportHeight / 3 - 200, // Position higher on screen, aligned with name container
            x: imageX === null ? '-50%' : 0, // Center horizontally if not moved
            opacity: 1
          }}
          transition={{ 
            duration: 4, // 4 seconds to match star animation
            delay: 0.2, // Start shortly after star animation begins
            ease: "easeIn"
          }}
          style={{ 
            top: 0,
            left: imageX !== null ? `${imageX}px` : '50%',
          }}
        />
      )}
    </LoadingContainer>
  );
};

export default Loading;
