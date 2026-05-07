import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import './Home.css';

function getLayout(aspect) {
  if (aspect < 0.6) {
    return { cameraZ: 28 };
  } else if (aspect < 1.0) {
    return { cameraZ: 22 };
  } else {
    return { cameraZ: 17 };
  }
}

function Home() {
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mount = mountRef.current;

    // my scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    // the camera pos
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const initialLayout = getLayout(window.innerWidth / window.innerHeight);
    camera.position.z = initialLayout.cameraZ;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // lowers exposure
    renderer.toneMappingExposure = 0.55; // lower to make darker
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
      color: 0xe0e0e8,
      metalness: 0.9,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      iridescence: 0.3,
      iridescenceIOR: 1.5,
      iridescenceThicknessRange: [0, 800],
      sheen: 0.5,
      sheenColor: new THREE.Color(0xdde8ff),
      sheenRoughness: 0.4,
    });

    // models
    const loader = new GLTFLoader();
    let model;

    loader.load(
      '/website.glb',
      (gltf) => {
        model = gltf.scene;
        model.scale.setScalar(1.1);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.y -= 1.8;
        model.position.x -= 1;
        model.traverse((child) => {
          if (child.isMesh) child.material = iridescentMaterial;
        });
        scene.add(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // animating (rotation)
    function animate() {
      if (model) model.rotation.y += 0.0005;
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
    <div className="home-page">
      <div ref={mountRef} className="home-mount" />
      <div className="home-title">
        <div className="home-title-row">
          <span>Amanda Wang</span>
          <span className="home-subtitle">Creative Technologist | Multimedia Artist</span>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="home-menu">
        <div className="home-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="home-bar" />
          <div className="home-bar" />
          <div className="home-bar" />
        </div>

        {menuOpen && (
          <div className="home-nav">
            <div className="home-nav-item" onClick={() => navigate('/projects')}>Projects</div>
            <div className="home-nav-item" onClick={() => navigate('/about')}>About</div>
            <div className="home-nav-item" onClick={() => navigate('/contact')}>Contact</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
