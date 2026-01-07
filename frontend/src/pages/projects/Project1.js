// Project 1: SpaceTime

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Project1() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#1a2535',
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
        src="https://q8gn8lidy3ewsjwd.public.blob.vercel-storage.com/spaceTime.mp4"
        autoPlay
        loop
        muted
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
        top: 'calc(50% - 360px)',
        left: 'calc(50% - 450px)',
        margin: 0,
        textAlign: 'left'
      }}>
        SpaceTime
      </p>
      <p style={{ 
        color: '#F5F5DC',
        fontSize: '16px',
        fontFamily: 'Courier New, monospace',
        position: 'absolute',
        top: 'calc(50% + 240px)',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: 0,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        A representation of time dialtion. Particles closer to mass moves slower in rotation.
      </p>
      <p style={{ 
        color: '#F5F5DC',
        fontSize: '16px',
        fontFamily: 'Courier New, monospace',
        position: 'absolute',
        top: 'calc(50% + 280px)',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: 0,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        Made in TouchDesigner.
      </p>
    </div>
  );
}

export default Project1;

