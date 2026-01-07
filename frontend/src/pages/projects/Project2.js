// Project 2: Northern Lights

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Project2() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#1a0f1f',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#F5F5DC',
          fontSize: '32px',
          cursor: 'pointer',
          padding: '10px',
          fontFamily: 'Courier New, monospace',
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        ←
      </button>
        <video
        src="https://q8gn8lidy3ewsjwd.public.blob.vercel-storage.com/NL.mp4"
        autoPlay
        loop
        style={{
          width: '900px',
          height: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          marginTop: '-60px'
        }}
      />
      <p style={{ 
        color: '#F5F5DC',
        fontSize: '22px',
        fontFamily: 'Courier New, monospace',
        position: 'absolute',
        top: 'calc(47% - 360px)',
        left: 'calc(50% - 450px)',
        margin: 0,
        textAlign: 'left'
      }}>
        Northern Lights
      </p>
      <p style={{ 
        color: '#F5F5DC',
        fontSize: '16px',
        fontFamily: 'Courier New, monospace',
        position: 'absolute',
        top: 'calc(52% + 240px)',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: 0,
        textAlign: 'center',
        //whiteSpace: 'nowrap'
        lineHeight: '1.5'
      }}>
        One day I woke up to the news of missing a rare chance to see the northern lights in Maryland. 
        <br />
        I decided to bring it to life myself. 
      </p>
      <p style={{ 
        color: '#F5F5DC',
        fontSize: '16px',
        fontFamily: 'Courier New, monospace',
        position: 'absolute',
        top: 'calc(57% + 280px)',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: 0,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        Made in Touchdesigner with media pipe plugin for gestural interaction.
      </p>
    </div>
  );
}

export default Project2;
