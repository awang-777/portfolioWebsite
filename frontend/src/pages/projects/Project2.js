// Project 2: Northern Lights

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

function Project2() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);
  const transitionStartTimeRef = useRef(null);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Initialize Three.js scene for transition
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Initially hide the overlay
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1000';
    
    mount.appendChild(renderer.domElement);

    // Geometry (same as Home.js)
    const radius = 2.8;
    const geometry = new THREE.IcosahedronGeometry(radius);
    geometry.toNonIndexed();

    const originalColor = new THREE.Color(0xfafafa);
    
    // Initialize colors
    const positionCount = geometry.attributes.position.count;
    const colors = new Float32Array(positionCount * 3);
    for (let i = 0; i < positionCount; i++) {
      colors[i * 3] = originalColor.r;
      colors[i * 3 + 1] = originalColor.g;
      colors[i * 3 + 2] = originalColor.b;
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshPhongMaterial({ color: "#fafafa", vertexColors: true });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Lighting (same as Home.js)
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 1);
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight2.position.set(-5, -5, 1);
    scene.add(directionalLight2);

    camera.position.z = 0.1;

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (isTransitioning && transitionStartTimeRef.current !== null) {
        const elapsed = Date.now() - transitionStartTimeRef.current;
        const FADE_IN_DURATION = 300;
        const ZOOM_DURATION = 2500;
        const TOTAL_DURATION = FADE_IN_DURATION + ZOOM_DURATION;

        if (elapsed < FADE_IN_DURATION) {
          const fadeProgress = elapsed / FADE_IN_DURATION;
          renderer.domElement.style.opacity = fadeProgress.toString();
        } else {
          renderer.domElement.style.opacity = '1';
        }

        if (elapsed >= FADE_IN_DURATION) {
          const zoomElapsed = elapsed - FADE_IN_DURATION;
          const zoomProgress = Math.min(zoomElapsed / ZOOM_DURATION, 1);
          const easedZoomProgress = 1 - Math.pow(1 - zoomProgress, 3); // Ease out cubic
          
          camera.position.z = 0.1 + (5 - 0.1) * easedZoomProgress;
        }

        if (elapsed >= TOTAL_DURATION) {
          navigate('/home');
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.setAnimationLoop(null);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isTransitioning, navigate]);

  const handleTransition = () => {
    setIsTransitioning(true);
    transitionStartTimeRef.current = Date.now();
  };


  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#e0dce4',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Three.js Overlay */}
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, pointerEvents: 'none' }} />
      
      {/* Page Content */}
      <div style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        width: '100%',
        height: '100%'
      }}>
        {/* Back Button */}
        <button
          onClick={handleTransition}
          style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#999999',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '0',
            margin: '0',
            fontFamily: 'Courier New, monospace',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          back to home
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
            marginTop: '-60px',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 1s ease-in'
          }}
        />
        <p style={{ 
          color: '#999999',
          fontSize: '22px',
          fontFamily: 'Courier New, monospace',
          position: 'absolute',
          top: 'calc(47% - 360px)',
          left: 'calc(50% - 450px)',
          margin: 0,
          textAlign: 'left',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 3s ease-in'
        }}>
          02 Northern Lights
        </p>
        <p style={{ 
          color: '#999999',
          fontSize: '16px',
          fontFamily: 'Courier New, monospace',
          position: 'absolute',
          top: 'calc(52% + 240px)',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: 0,
          textAlign: 'center',
          lineHeight: '1.5',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 3s ease-in'
        }}>
          One day I woke up to the news of missing a rare chance to see the northern lights in Maryland. 
          <br />
          I decided to bring it to life myself. 
        </p>
        <p style={{ 
          color: '#999999',
          fontSize: '16px',
          fontFamily: 'Courier New, monospace',
          position: 'absolute',
          top: 'calc(57% + 280px)',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: 0,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 3s ease-in'
        }}>
          Made in Touchdesigner with media pipe plugin for gestural interaction.
        </p>
        {/* Page Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          zIndex: 10
        }}>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              onClick={() => navigate(`/projects/project${index + 1}`)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index === 1 ? '#666666' : '#cccccc',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project2;
