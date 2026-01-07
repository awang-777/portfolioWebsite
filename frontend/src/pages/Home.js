import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as THREE from 'three';

const PROJECT_ROUTES = ['/projects/project1', '/projects/project2', '/projects/project3', '/projects/project4'];
const PROJECT_COLORS = {
  '/projects/project1': '#1a2535',
  '/projects/project2': '#6b5a75', 
  '/projects/project3': '#d4a5a5',
  '/projects/project4': '#9db5a0',
};

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const mountRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // closes menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // geometry
    const radius = 2.8;
    const geometry = new THREE.IcosahedronGeometry(radius);
    geometry.toNonIndexed();

    const originalColor = new THREE.Color(0xfafafa);
    
    // initialize colors
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

    // lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 1);
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight2.position.set(-5, -5, 1);
    scene.add(directionalLight2);

    camera.position.z = 5;

    // interaction setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    let hoveredFaceIndex = null;
    let fadeBackTimer = null;
    let isFadingBack = false;
    let fadingFaceIndex = null;
    let fadeStartTime = 0;
    let colorCounter = 0;
    const faceToProjectMap = new Map();
    
    const FADE_BACK_DELAY = 300;
    const FADE_DURATION = 500;
    
    // transitions state
    let isTransitioning = false;
    let transitionStartTime = 0;
    let transitionTargetRotation = { x: 0, y: 0, z: 0 };
    let transitionStartRotation = { x: 0, y: 0, z: 0 };
    let transitionTargetRoute = null;
    const TRANSITION_DURATION = 2500;
    const ROTATION_PHASE_DURATION = 1000; 
    const ZOOM_PHASE_DURATION = 6700; 
    const TEXT_FADE_DURATION = 300; 
    
    // zoom state
    let transitionStartCameraZ = 5;
    let transitionTargetCameraZ = 0.1;

    // helper: Calculate mouse coordinates
    function getMouseCoords(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      };
    }

    // helper: Get project index for a face
    function getProjectIndexForFace(faceIndex, shouldIncrement = false) {
      // if on a project page, use that project
      if (location.pathname !== '/' && PROJECT_COLORS[location.pathname]) {
        return PROJECT_ROUTES.indexOf(location.pathname);
      }
      
      // otherwise, cycle through all colors before repeating
      const projectIndex = colorCounter % PROJECT_ROUTES.length;
      if (shouldIncrement) {
        colorCounter = (colorCounter + 1) % PROJECT_ROUTES.length;
      }
      return projectIndex;
    }

    // helper: Get color for a face
    function getHoverColorForFace(faceIndex, shouldIncrement = false) {
      const projectIndex = getProjectIndexForFace(faceIndex, shouldIncrement);
      faceToProjectMap.set(faceIndex, projectIndex);
      
      const route = PROJECT_ROUTES[projectIndex];
      const colorHex = PROJECT_COLORS[route];
      return new THREE.Color(colorHex);
    }

    function setFaceColor(faceIndex, color) {
      const colorAttribute = geometry.attributes.color;
      const baseIndex = faceIndex * 3;
      colorAttribute.setXYZ(baseIndex, color.r, color.g, color.b);
      colorAttribute.setXYZ(baseIndex + 1, color.r, color.g, color.b);
      colorAttribute.setXYZ(baseIndex + 2, color.r, color.g, color.b);
      colorAttribute.needsUpdate = true;
    }

    function restoreFaceColor(faceIndex) {
      setFaceColor(faceIndex, originalColor);
    }

    function onMouseMove(event) {
      if (isTransitioning) return;
      
      const coords = getMouseCoords(event);
      mouse.set(coords.x, coords.y);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(shape);

      if (intersects.length > 0) {
        const faceIndex = intersects[0].faceIndex;

        if (fadeBackTimer) {
          clearTimeout(fadeBackTimer);
          fadeBackTimer = null;
        }
        isFadingBack = false;
        
        if (fadingFaceIndex !== null && fadingFaceIndex !== faceIndex) {
          restoreFaceColor(fadingFaceIndex);
          fadingFaceIndex = null;
        }

        if (hoveredFaceIndex !== faceIndex) {
          if (hoveredFaceIndex !== null) {
            restoreFaceColor(hoveredFaceIndex);
          }
          hoveredFaceIndex = faceIndex;
          setFaceColor(faceIndex, getHoverColorForFace(faceIndex, true));
        }

        renderer.domElement.style.cursor = 'pointer';
      } else {
        if (hoveredFaceIndex !== null) {
          fadingFaceIndex = hoveredFaceIndex;
          hoveredFaceIndex = null;
          fadeBackTimer = setTimeout(() => {
            isFadingBack = true;
            fadeStartTime = Date.now();
          }, FADE_BACK_DELAY);
        }
        renderer.domElement.style.cursor = 'default';
      }
    }

    function onMouseClick(event) {
      if (isTransitioning) return;
      
      const coords = getMouseCoords(event);
      mouse.set(coords.x, coords.y);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(shape);

      if (intersects.length > 0) {
        const intersection = intersects[0];
        const faceIndex = intersection.faceIndex;
        const projectIndex = faceToProjectMap.get(faceIndex) ?? (faceIndex % PROJECT_ROUTES.length);
        
        // get face normal in world space
        const faceNormal = intersection.face.normal.clone();
        faceNormal.transformDirection(shape.matrixWorld);
        faceNormal.normalize();
        
        const targetDirection = new THREE.Vector3(0, 0, 1);
        
        // calculates rotation needed to align face normal with camera
        const alignQuaternion = new THREE.Quaternion().setFromUnitVectors(
          faceNormal,
          targetDirection
        );
        
        // Get current rotation as quaternion
        const currentQuaternion = new THREE.Quaternion().setFromEuler(shape.rotation);
        
        // Apply alignment rotation on top of current rotation
        // multiply order: apply currentQuaternion first, then alignQuaternion
        const finalQuaternion = alignQuaternion.multiply(currentQuaternion);
        
        // convert to Euler angles
        const euler = new THREE.Euler().setFromQuaternion(finalQuaternion);
        
        // start transition
        isTransitioning = true;
        transitionStartTime = Date.now();
        setTextOpacity(1); 
        transitionStartRotation = {
          x: shape.rotation.x,
          y: shape.rotation.y,
          z: shape.rotation.z
        };
        transitionTargetRotation = {
          x: euler.x,
          y: euler.y,
          z: euler.z
        };
        transitionTargetRoute = PROJECT_ROUTES[projectIndex];
        
        // store camera start position for zoom
        transitionStartCameraZ = camera.position.z;
      }
    }

    function animate() {
      if (isTransitioning) {
        const elapsed = Date.now() - transitionStartTime;
        
        // rotation phase (first second)
        if (elapsed < ROTATION_PHASE_DURATION) {
          const rotationProgress = Math.min(elapsed / ROTATION_PHASE_DURATION, 1);
          const easedRotationProgress = 1 - Math.pow(1 - rotationProgress, 3); // Ease out cubic
          
          // interpolate rotation
          shape.rotation.x = transitionStartRotation.x + (transitionTargetRotation.x - transitionStartRotation.x) * easedRotationProgress;
          shape.rotation.y = transitionStartRotation.y + (transitionTargetRotation.y - transitionStartRotation.y) * easedRotationProgress;
          shape.rotation.z = transitionStartRotation.z + (transitionTargetRotation.z - transitionStartRotation.z) * easedRotationProgress;
        } else {
          // rotation complete, set to target
          shape.rotation.x = transitionTargetRotation.x;
          shape.rotation.y = transitionTargetRotation.y;
          shape.rotation.z = transitionTargetRotation.z;
          
          // zoom phase (second second)
          const zoomElapsed = elapsed - ROTATION_PHASE_DURATION;
          const zoomProgress = Math.min(zoomElapsed / ZOOM_PHASE_DURATION, 1);
          const easedZoomProgress = 1 - Math.pow(1 - zoomProgress, 3); // Ease out cubic
          
          // interpolate camera zoom
          camera.position.z = transitionStartCameraZ + (transitionTargetCameraZ - transitionStartCameraZ) * easedZoomProgress;
          
          // fade out text quickly at start of zoom phase and then slow down
          const textFadeProgress = Math.min(zoomElapsed / TEXT_FADE_DURATION, 1);
          const easedTextFadeProgress = 1 - Math.pow(1 - textFadeProgress, 3); 
          setTextOpacity(Math.max(0, 1 - easedTextFadeProgress));
        }
        
        // navigate when transition completes
        if (elapsed >= TRANSITION_DURATION && transitionTargetRoute) {
          navigate(transitionTargetRoute);
          isTransitioning = false;
          transitionTargetRoute = null;
          setTextOpacity(1); // reset opacity
        }
      } else {
        shape.rotation.x += 0.0005;
        shape.rotation.y += 0.0005;
      }

      const time = Date.now() * 0.001;
      const pulseScale = 1 + Math.sin(time * Math.PI / 3) * 0.03;
      shape.scale.set(pulseScale, pulseScale, pulseScale);

      if (isFadingBack && fadingFaceIndex !== null) {
        const elapsed = Date.now() - fadeStartTime;
        const progress = Math.min(elapsed / FADE_DURATION, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const hoverColor = getHoverColorForFace(fadingFaceIndex);
        const currentColor = new THREE.Color().lerpColors(hoverColor, originalColor, easedProgress);
        setFaceColor(fadingFaceIndex, currentColor);

        if (progress >= 1) {
          isFadingBack = false;
          fadingFaceIndex = null;
        }
      }

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    // event listeners
    window.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);

    // handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    // cleanup function
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onMouseClick);
      renderer.setAnimationLoop(null);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (fadeBackTimer) clearTimeout(fadeBackTimer);
    };
  }, [navigate, location.pathname]);

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: 'white', position: 'relative' }}>
      <div 
        ref={mountRef} 
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Hamburger Menu */}
      <div 
        ref={menuRef}
        style={{ 
          position: 'absolute', 
          top: '30px', 
          right: '30px',
          zIndex: 20,
          cursor: 'pointer',
          opacity: textOpacity,
          transition: 'opacity 0.1s ease-out'
        }}
      >
        {/* Hamburger Icon */}
        <div 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '30px',
            height: '3px',
            backgroundColor: '#333333',
            transition: 'all 0.3s ease'
          }} />
          <div style={{
            width: '30px',
            height: '3px',
            backgroundColor: '#333333',
            transition: 'all 0.3s ease'
          }} />
          <div style={{
            width: '30px',
            height: '3px',
            backgroundColor: '#333333',
            transition: 'all 0.3s ease'
          }} />
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid #333333',
            padding: '10px 0',
            minWidth: '150px',
            fontFamily: 'Courier New, monospace'
          }}>
            <div 
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: 'white',
                padding: '12px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              About
            </div>
            <div 
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/projects');
              }}
              style={{
                color: 'white',
                padding: '12px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Projects
            </div>
            <div 
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: 'white',
                padding: '12px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Experiments
            </div>
            <div 
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: 'white',
                padding: '12px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Contact
            </div>
          </div>
        )}
      </div>

      <div style={{ 
        position: 'absolute', 
        top: '6%', 
        left: '12%', 
        transform: 'translate(-50%, -50%)',
        color: '#333333',
        fontSize: '16px',
        fontFamily: 'Courier New, monospace',
        zIndex: 10,
        pointerEvents: 'none',
        opacity: textOpacity,
        transition: 'opacity 0.1s ease-out'
      }}>
        Amanda Wang
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '94%', 
        left: '88%', 
        transform: 'translate(-50%, -50%)',
        color: '#333333',
        fontSize: '16px',
        fontFamily: 'Courier New, monospace',
        zIndex: 10,
        pointerEvents: 'none',
        opacity: textOpacity,
        transition: 'opacity 0.1s ease-out'
      }}>
        Creative Technologist
      </div>
    </div>
  );
}

export default Home;
