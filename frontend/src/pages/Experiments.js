// Experiments page 

import React, { useState, useEffect, useRef } from 'react';
import { useScrollTransition } from '../hooks/useScrollTransition';

function Experiments() {
  const fullText = "You've made it to my experiments page! What you'll find here are some projects that are not quite complete... but still pretty fun. Hope you enjoy.";
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFruitHovered, setIsFruitHovered] = useState(false);
  const [isRioHovered, setIsRioHovered] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const fruitVideoRef = useRef(null);
  const rioVideoRef = useRef(null);

  const carouselItems = [
    {
      id: 1,
      image: '/photosExperiments/cowboy.png',
    },
    {
      id: 2,
      image: '/photosExperiments/strawberrySmash.png',
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
        timeoutId = setTimeout(typeWriter, 30); // speed 
      }
    };

    typeWriter();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fullText]);

  // FRUIT VID PLAY/PAUSE
  useEffect(() => {
    if (isFruitHovered && fruitVideoRef.current) {
      fruitVideoRef.current.play().catch(() => {});
    } else if (!isFruitHovered && fruitVideoRef.current) {
      fruitVideoRef.current.pause();
      fruitVideoRef.current.currentTime = 0;
    }
  }, [isFruitHovered]);

  //RIO VID PLAY/PAUSE
  useEffect(() => {
    if (isRioHovered && rioVideoRef.current) {
      rioVideoRef.current.play().catch(() => {});
    } else if (!isRioHovered && rioVideoRef.current) {
      rioVideoRef.current.pause();
      rioVideoRef.current.currentTime = 0;
    }
  }, [isRioHovered]);

  // AUTO ROTATION - PAUSES WHEN ANY CAROUSEL ITEM IS HOVERED
  useEffect(() => {
    if (isFruitHovered || isRioHovered) {
      return;
    }
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselItems.length, isFruitHovered, isRioHovered]);

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
          margin: 0,
          opacity: isCarouselHovered ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}>
          {displayedText}
          <span style={{ opacity: displayedText.length < fullText.length ? 1 : 0 }}>|</span>
        </p>
      </div>

      {/* fruitTD.png and hand1.png - appear when hover */}
      <div style={{
        position: 'absolute',
        left: '50px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 15,
        pointerEvents: 'none',
        opacity: isFruitHovered ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}>
        <img 
          src="/photosExperiments/fruitTD.png" 
          alt=""
          style={{
            maxWidth: '370px',
            maxHeight: '60vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px'
          }}
        />
      </div>
      <div style={{
        position: 'absolute',
        left: '50px',
        top: '78%',
        transform: 'translateY(-50%)',
        zIndex: 15,
        pointerEvents: 'none',
        opacity: isFruitHovered ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}>
        <img 
          src="/photosExperiments/hand1.png" 
          alt=""
          style={{
            maxWidth: '370px',
            maxHeight: '60vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px'
          }}
        />
      </div>

      {/* FRUIT Smash Description */}
      <div style={{
        position: 'absolute',
        right: '80px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 15,
        pointerEvents: 'none',
        opacity: isFruitHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        maxWidth: '400px',
        padding: '0 35px'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#333333',
          fontFamily: 'Courier New, monospace',
          lineHeight: '1.8',
          margin: 0,
          textAlign: 'left'
        }}>
          One of my favourite games as a kid was the classic Fruit Ninja so I decided to bring a more modern version to life. This is an interactive hand-tracking game built in TouchDesigner using the MediaPipe plugin. Players 'smash' procedurally generated fruits using the closed-fist movement captured in real-time. The goal is to blend digital gameplay with interaction.
          <br /><br />
          The system incorporates difficulty scaling: starting with single fruits spawning every three seconds, then progressively increasing to multiple simultaneous targets with shortened intervals as players reach score thresholds. Each fruit generates at randomized screen coordinates with varied types.
          <br /><br />
          All visual assets were custom illustrated in Procreate and integrated as PNG sequences into the TouchDesigner environment. My eventual goal is to finalize this piece and have it be incorporated into a mundane space to cultivate play.
        </p>
      </div>

      {/* VR.jpg */} 
      <div style={{
        position: 'absolute',
        left: '100px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 15,
        pointerEvents: 'none',
        opacity: isRioHovered ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}>
        <img 
          src="/photosExperiments/VR.jpg" 
          alt=""
          style={{
            maxWidth: '370px',
            maxHeight: '60vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px'
          }}
        />
      </div>

      {/* VR Game Description Text */}
      <div style={{
        position: 'absolute',
        right: '80px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 15,
        pointerEvents: 'none',
        opacity: isRioHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        maxWidth: '500px',
        padding: '0 30px'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#333333',
          fontFamily: 'Courier New, monospace',
          lineHeight: '1.8',
          margin: 0,
          textAlign: 'left'
        }}>
          Western-themed VR shootout game created in Unity. This was a collaboration between myself and two other students.
          <br /><br />
          My contributions:
          <br />
          • implemented core systems including VR hardware setup (Oculus/macOS compatibility)
          <br />
          • character integration (mesh selection and Mixamo rigging)
          <br />
          • C# scripting for movement mechanics, shooting systems, game state logic, round management, and ballistics.
          <br /><br />
          Project is on my github. 
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
        <div style={{
          display: 'flex',
          width: `${carouselItems.length * 100}%`,
          height: '100%',
          transform: `translateX(-${currentIndex * (100 / carouselItems.length)}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}>
          {carouselItems.map((item, index) => {
            const isFruitImage = item.image === '/photosExperiments/strawberrySmash.png';
            const isCowboyImage = item.image === '/photosExperiments/cowboy.png';
            
            const handleMouseEnter = () => {
              setIsCarouselHovered(true);
              
              if (isFruitImage) {
                setIsFruitHovered(true);
              } else if (isCowboyImage) {
                setIsRioHovered(true);
              }
            };
            
            const handleMouseLeave = () => {
              setIsCarouselHovered(false);
              
              if (isFruitImage) {
                setIsFruitHovered(false);
              } else if (isCowboyImage) {
                setIsRioHovered(false);
              }
            };
            
            return (
              <div
                key={item.id}
                style={{
                  width: `${100 / carouselItems.length}%`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isCowboyImage && isRioHovered && (
                  <video
                    ref={rioVideoRef}
                    src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/rio.mp4"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      zIndex: 1
                    }}
                    loop
                    muted
                    playsInline
                  />
                )}
                
                
                {isFruitImage && isFruitHovered && (
                  <video
                    ref={fruitVideoRef}
                    src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/fruitsmash.mp4"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      zIndex: 1
                    }}
                    loop
                    muted
                    playsInline
                    onCanPlay={() => {
                      if (fruitVideoRef.current && isFruitHovered) {
                        fruitVideoRef.current.play();
                      }
                    }}
                  />
                )}
                
                <img 
                  src={item.image} 
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: (isFruitImage && isFruitHovered) || (isCowboyImage && isRioHovered) ? 0.05 : 1,
                    transition: 'opacity 0.3s ease',
                    position: 'relative',
                    zIndex: 2
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* slide bar */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 10
      }}>
        {carouselItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? '30px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: index === currentIndex ? '#666666' : '#cccccc',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Experiments;
