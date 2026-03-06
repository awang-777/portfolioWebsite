import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

function getLayout(aspect) { 
  if (aspect < 0.6) {
    return { cameraZ: 28, sphereY: -12, sphereSpacing: 3.5 }; //phone 
  } else if (aspect < 1.0) {
    return { cameraZ: 22, sphereY: -10, sphereSpacing: 4.5 }; // tablet
  } else {
    return { cameraZ: 17, sphereY: -8, sphereSpacing: 5 }; // desktop 
  }
}

function Home() {
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const hoveredRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // my scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF2F0EF);

    // the camera pos
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const initialLayout = getLayout(window.innerWidth / window.innerHeight);
    camera.position.z = initialLayout.cameraZ;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // lowers exposure
    renderer.toneMappingExposure = 0.7; // lower to make darker
    mount.appendChild(renderer.domElement);

    // lighting (the more lighting the better the iridescence :D)
    scene.add(new THREE.AmbientLight(0xffffff, 0.05));
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(15, 2, 3);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0xaaddff, 1.0);
    dirLight2.position.set(-12, -2, -8);
    scene.add(dirLight2);
    const dirLight3 = new THREE.DirectionalLight(0xffaadd, 1.0);
    dirLight3.position.set(2, -10, 3);
    scene.add(dirLight3);

    // environment map so iridescence has something to reflect
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    pmremGenerator.dispose();

    // iridescent effect
    const iridescentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe8e8ec,
      metalness: 0.0,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      iridescence: 1.0,
      iridescenceIOR: 1.5,
      iridescenceThicknessRange: [0, 2000]
    });


    // models
    const loader = new GLTFLoader();
    let model;

    loader.load(
      '/website.glb',
      (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.traverse((child) => {
          if (child.isMesh) child.material = iridescentMaterial;
        });
        scene.add(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // spheres
    const sphereGeo = new THREE.SphereGeometry(0.5, 64, 64);
    const makeSphereMat = () => new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.0,
      transmission: 1.0,
      thickness: 2.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      iridescence: 1.0,
      iridescenceIOR: 1.5,
      iridescenceThicknessRange: [0, 2000],
      emissive: new THREE.Color(0xffcc88),
      emissiveIntensity: 0,
    });

    const matLeft = makeSphereMat();
    const matMiddle = makeSphereMat();
    const matRight = makeSphereMat();

    const sphereLeft = new THREE.Mesh(sphereGeo, matLeft);
    const sphereMiddle = new THREE.Mesh(sphereGeo, matMiddle);
    const sphereRight = new THREE.Mesh(sphereGeo, matRight);

    const { sphereY, sphereSpacing } = initialLayout;
    sphereLeft.position.set(-sphereSpacing, sphereY, 0);
    sphereMiddle.position.set(0, sphereY, 0);
    sphereRight.position.set(sphereSpacing, sphereY, 0);
    scene.add(sphereLeft);
    scene.add(sphereMiddle);
    scene.add(sphereRight);

    // warm glow lights for the spheres - on hover, the respective sphere glows !!
    const glowColor = 0xffcc88;
    const glowLeft = new THREE.PointLight(glowColor, 0, 8);
    glowLeft.position.set(-sphereSpacing, sphereY, 1);
    scene.add(glowLeft);

    const glowMiddle = new THREE.PointLight(glowColor, 0, 8);
    glowMiddle.position.set(0, sphereY, 1);
    scene.add(glowMiddle);

    const glowRight = new THREE.PointLight(glowColor, 0, 8);
    glowRight.position.set(sphereSpacing, sphereY, 1);
    scene.add(glowRight);

    // animating (rotation) + light hover
    function animate() {
      if (model) model.rotation.y += 0.0005;

      const h = hoveredRef.current;

      matLeft.emissiveIntensity = h === 'projects' ? 2.0 : 0;
      matMiddle.emissiveIntensity = h === 'about' ? 2.0 : 0;
      matRight.emissiveIntensity = h === 'contact' ? 2.0 : 0;

      glowLeft.intensity = h === 'projects' ? 10 : 0;
      glowMiddle.intensity = h === 'about' ? 10 : 0;
      glowRight.intensity = h === 'contact' ? 10 : 0;

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // resize handler
    function handleResize() {
      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      const layout = getLayout(aspect);
      camera.position.z = layout.cameraZ;

      sphereLeft.position.set(-layout.sphereSpacing, layout.sphereY, 0);
      sphereMiddle.position.set(0, layout.sphereY, 0);
      sphereRight.position.set(layout.sphereSpacing, layout.sphereY, 0);
      glowLeft.position.set(-layout.sphereSpacing, layout.sphereY, 1);
      glowMiddle.position.set(0, layout.sphereY, 1);
      glowRight.position.set(layout.sphereSpacing, layout.sphereY, 1);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.setAnimationLoop(null);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute',
        top: 'clamp(16px, 3vw, 32px)',
        left: 'clamp(16px, 3vw, 32px)',
        fontFamily: 'Moralana, serif',
        fontSize: 'clamp(15px, 2.5vw, 20px)',
        lineHeight: '2',
        color: '#3a3a3a',
        letterSpacing: '0.05em',
      }}>
        Amanda Wang
        <div style={{ fontSize: 'clamp(9px, 1.5vw, 11px)', letterSpacing: '0.15em', fontFamily: 'Georgia, serif', lineHeight: '2', color: '#5a5a5a' }}>
          Multimedia Artist
        </div>
        <div style={{ fontSize: 'clamp(9px, 1.5vw, 11px)', letterSpacing: '0.15em', fontFamily: 'Georgia, serif', lineHeight: '2', color: '#5a5a5a' }}>
          Creative Technologist
        </div>
      </div>

      {/* Hamburger Menu */}
      <div style={{ position: 'absolute', bottom: 'clamp(16px, 3vw, 32px)', right: 'clamp(16px, 3vw, 32px)' }}>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px' }}
        >
          <div style={{ width: '24px', height: '2px', backgroundColor: '#3a3a3a' }} />
          <div style={{ width: '24px', height: '2px', backgroundColor: '#3a3a3a' }} />
          <div style={{ width: '24px', height: '2px', backgroundColor: '#3a3a3a' }} />
        </div>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            bottom: '44px',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(20px, 3vw, 30px)',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(14px, 2vw, 16px)',
            letterSpacing: '0.1em',
            color: '#3a3a3a',
            textAlign: 'right',
          }}>
            <div style={{ cursor: 'pointer', padding: '4px 0' }} onClick={() => navigate('/projects')} onMouseEnter={() => hoveredRef.current = 'projects'} onMouseLeave={() => hoveredRef.current = null}>Projects</div>
            <div style={{ cursor: 'pointer', padding: '4px 0' }} onClick={() => navigate('/about')} onMouseEnter={() => hoveredRef.current = 'about'} onMouseLeave={() => hoveredRef.current = null}>About</div>
            <div style={{ cursor: 'pointer', padding: '4px 0' }} onClick={() => navigate('/contact')} onMouseEnter={() => hoveredRef.current = 'contact'} onMouseLeave={() => hoveredRef.current = null}>Contact</div>
          </div>
        )}
      </div>
    </div>

  );
}

export default Home;
