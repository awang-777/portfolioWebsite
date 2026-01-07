import React from 'react';
import { useNavigate } from 'react-router-dom';

function Project4() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#9db5a0',
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
          color: '#333333',
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
    </div>
  );
}

export default Project4;