// Project 4:

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

function Project4() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);
  const transitionStartTimeRef = useRef(null);

  // initializes Three.js scene for transition
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // initially hide the overlay
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1000';
    
    mount.appendChild(renderer.domElement);

    const radius = 2.8;
    const geometry = new THREE.IcosahedronGeometry(radius);
    geometry.toNonIndexed();

    const originalColor = new THREE.Color(0xfafafa);
    
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

      // hanles transition animation
      if (isTransitioning && transitionStartTimeRef.current !== null) {
        const elapsed = Date.now() - transitionStartTimeRef.current;
        const FADE_IN_DURATION = 300;
        const ZOOM_DURATION = 2500;
        const TOTAL_DURATION = FADE_IN_DURATION + ZOOM_DURATION;

        // fades in the Three.js overlay
        if (elapsed < FADE_IN_DURATION) {
          const fadeProgress = elapsed / FADE_IN_DURATION;
          renderer.domElement.style.opacity = fadeProgress.toString();
        } else {
          renderer.domElement.style.opacity = '1';
        }

        // zooms out camera
        if (elapsed >= FADE_IN_DURATION) {
          const zoomElapsed = elapsed - FADE_IN_DURATION;
          const zoomProgress = Math.min(zoomElapsed / ZOOM_DURATION, 1);
          const easedZoomProgress = 1 - Math.pow(1 - zoomProgress, 3); // Ease out cubic
          
          // interpolate camera from z=0.1 to z=5
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
      backgroundColor: '#e8edea',
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
                backgroundColor: index === 3 ? '#666666' : '#cccccc',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project4;
