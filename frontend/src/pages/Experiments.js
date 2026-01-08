// Experiments page 

import React, { useState, useEffect } from 'react';
import { useScrollTransition } from '../hooks/useScrollTransition';

function Experiments() {
  const fullText = "You've made it to my experiments page! What you'll find here are some silly projects that are not quite complete... but still pretty fun. Hope you enjoy.";
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems = [
    {
      id: 1,
      image: '/photosExperiments/cowboy.png',
    },
  ];

  useScrollTransition({
    currentPath: '/experiments',
    transitions: {
      scrollUp: '/home'
    }
  });

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;
    
    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeWriter, 30); // can adjust speed here
      }
    };

    typeWriter();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fullText]);

  // auto rotation 
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: 'white', position: 'relative' }}>
      {/* Welcome Text */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          textAlign: 'left',
          zIndex: 20,
          pointerEvents: 'none',
          maxWidth: '600px',
          padding: '0 20px'
        }}
      >
        <p style={{
          fontSize: '16px',
          color: '#333333', 
          fontFamily: 'Courier New, monospace',
          lineHeight: '1.6',
          margin: 0
        }}>
          {displayedText}
          <span style={{ opacity: displayedText.length < fullText.length ? 1 : 0 }}>|</span>
        </p>
      </div>

      {/* Page Indicator */}
      <div style={{
        position: 'absolute',
        right: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === 2 ? '#666666' : '#cccccc',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Carousel */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '800px',
        height: '60%',
        overflow: 'hidden',
        borderRadius: '10px'
      }}>
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={item.image} 
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experiments;
