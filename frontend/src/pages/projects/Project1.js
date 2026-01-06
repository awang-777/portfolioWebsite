import React from 'react';

function Project1() {
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
      <video
        src="/Videos/spaceTime.mp4"
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

