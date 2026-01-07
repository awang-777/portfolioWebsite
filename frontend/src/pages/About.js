import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    function handleWheel(event) {
      if (event.deltaY > 0) {
        navigate('/home');
      }
    }

    window.addEventListener('wheel', handleWheel);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 7000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      backgroundColor: 'white',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    }}>
      <div style={{
        maxWidth: '600px',
        fontFamily: 'Courier New, monospace',
        fontSize: '18px',
        lineHeight: '1.8',
        color: '#333333',
        textAlign: 'left'
      }}>
        <div style={{ 
          fontSize: '24px', 
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Welcome :)
        </div>
        <div style={{ marginBottom: '20px' }}>
          I'm a <span style={{ color: '#5A7D9A' }}>creative technologist</span> who finds enjoyment in expressing myself through art.
        </div>
        <div style={{ marginBottom: '20px' }}>
          My interests include <span style={{ color: '#5A7D9A' }}>generative visuals</span>, <span style={{ color: '#5A7D9A' }}>interactive installations</span>, and <span style={{ color: '#5A7D9A' }}>projection mapping</span>.
        </div>
        <div style={{ 
          marginTop: '30px',
          fontStyle: 'italic'
        }}>
          Scroll down to see more !
        </div>
      </div>
      
      {/* Down Arrow */}
      {showArrow && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: showArrow ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
          cursor: 'pointer'
        }}>
          <div style={{
            fontSize: '32px',
            color: '#333333',
            animation: 'bounce 3s infinite'
          }}>
            ↓
          </div>
          <div style={{
            fontSize: '16px',
            color: '#333333',
            fontFamily: 'Courier New, monospace'
          }}>
            Projects
          </div>
        </div>
      )}
      
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
              backgroundColor: index === 0 ? '#666666' : '#cccccc',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}

export default About;
