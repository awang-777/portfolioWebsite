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
          //fontWeight: 'bold'
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
        <div style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          {/* GitHub Button */}
          <a
            href="https://github.com/awang-777"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '4px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              style={{ display: 'block' }}
            >
              <circle cx="12" cy="12" r="12" fill="#e5e5e5"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#999999"/>
            </svg>
          </a>
          
          {/* Instagram Button */}
          <a
            href="https://instagram.com/m3ii.22"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '4px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              style={{ display: 'block' }}
            >
              <circle cx="12" cy="12" r="12" fill="#e5e5e5"/>
              <g fill="#999999">
                <rect x="7" y="7" width="10" height="10" rx="2.5" ry="2.5" fill="none" stroke="#999999" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="2.5" fill="#999999"/>
                <circle cx="15.5" cy="8.5" r="0.8" fill="#999999"/>
              </g>
            </svg>
          </a>
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
            color: '#999999',
            animation: 'bounce 3s infinite'
          }}>
            ↓
          </div>
          <div style={{
            fontSize: '16px',
            color: '#999999',
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
