import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

function Home() {
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mount = mountRef.current;

    // my scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF2F0EF);

    // the camera pos
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 17;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
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


    // model
    const loader = new GLTFLoader();
    let model;
    loader.load(
      '/website.glb',
      (gltf) => {
        model = gltf.scene;

        // centering the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.traverse((child) => { //applying the iridescent material 
          if (child.isMesh) {
            child.material = iridescentMaterial;
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // animating (roation)
    function animate() {
      if (model) {
        model.rotation.y += 0.0005;
      }
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // resize handler - this means that no matter the screen size, the model will be properly displayed and not stretched or squished
    function handleResize() {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
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
        top: '32px',
        left: '32px',
        fontFamily: 'Moralana, serif',
        fontSize: '20px',
        lineHeight: '2',
        color: '#3a3a3a',
        letterSpacing: '0.05em',
      }}>
        Amanda Wang
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', fontFamily: 'Georgia, serif', lineHeight: '2', color: '#5a5a5a' }}>
          Multimedia Artist
        </div>
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', fontFamily: 'Georgia, serif', lineHeight: '2', color: '#5a5a5a' }}>
          Creative Technologist
        </div>
      </div>

      {/* Hamburger Menu */}
      <div style={{ position: 'absolute', bottom: '32px', right: '32px' }}>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <div style={{ width: '24px', height: '2px', backgroundColor: '#3a3a3a' }} />
          <div style={{ width: '24px', height: '2px', backgroundColor: '#3a3a3a' }} />
          <div style={{ width: '24px', height: '2px', backgroundColor: '#3a3a3a' }} />
        </div>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            bottom: '36px',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            fontFamily: 'Georgia, serif',
            fontSize: '16px',
            letterSpacing: '0.1em',
            color: '#3a3a3a',
            textAlign: 'right',
          }}>
            <div style={{ cursor: 'pointer' }} onClick={() => navigate('/projects')}>Projects</div>
            <div style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>About</div>
            <div style={{ cursor: 'pointer' }} onClick={() => navigate('/contact')}>Contact</div>
          </div>
        )}
      </div>
    </div>

  );
}

export default Home;
