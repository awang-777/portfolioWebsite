import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import './Home.css';

const PROJECTS = [
  { src: '/photos/christina.png', alt: 'EEG', path: '/projects/eeg' },
  { src: '/photos/surrealLandscape.jpg', alt: 'Surreal Landscape', path: '/projects/surreal-landscape' },
  { src: '/photos/templeinthesky.JPG', alt: 'Castle', path: '/projects/castle' },
  { src: '/photos/tape.png', alt: 'Tape', path: '/projects/tape' },
];

function getLayout(aspect) {
  if (aspect < 0.6) {
    return { cameraZ: 20 };
  } else if (aspect < 1.0) {
    return { cameraZ: 15 };
  } else {
    return { cameraZ: 11 };
  }
}

function Home() {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    const initialLayout = getLayout(w / h);
    camera.position.z = initialLayout.cameraZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.7;
    mount.appendChild(renderer.domElement);

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

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    pmremGenerator.dispose();

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

    const loader = new GLTFLoader();
    let model;

    loader.load(
      '/website2.glb',
      (gltf) => {
        model = gltf.scene;
        model.scale.setScalar(1.35);
        model.rotation.y = 100;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.y -= 1;
        model.position.x -= -.9;
        model.traverse((child) => {
          if (child.isMesh) child.material = iridescentMaterial;
        });
        scene.add(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    function animate() {
      if (model) model.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    function handleResize() {
      const mw = mount.clientWidth;
      const mh = mount.clientHeight;
      const aspect = mw / mh;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(mw, mh);
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

      <div className="home-projects">
        {PROJECTS.map((p) => (
          <div key={p.path} className="home-project-card" onClick={() => navigate(p.path)}>
            <img src={p.src} alt={p.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
