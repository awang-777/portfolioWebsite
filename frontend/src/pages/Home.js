import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { registerPending } from '../components/loadingRegistry';
import './Home.css';

const PROJECTS = [
  { src: '/photos/christina.png', alt: 'EEG', path: '/projects/eeg', tag: 'interactive installation' },
  { src: '/photos/surrealLandscape.jpg', alt: 'Surreal Landscape', path: '/projects/surreal-landscape', tag: '3d environment' },
  { src: 'https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/hoang.mp4', alt: 'Hoang', path: '/projects/hoang', tag: 'live event' },
];

// Pull the camera back smoothly as the mount gets narrower so the model
// keeps the same apparent width. Stepped thresholds made the size jump when
// the aspect landed on different sides of a cutoff — e.g. Safari's taller
// viewport pushing the 35%-wide mount below 0.6 and shrinking the model.
const CAMERA_Z_AT_SQUARE = 9;
const MAX_CAMERA_Z = 20;

// On phones the mount spans the full screen width instead of 35%, so the
// model would fill the screen; pull the camera back further there. Keep the
// query in sync with the mobile breakpoint in Home.css.
const MOBILE_QUERY = '(max-width: 600px)';
const MOBILE_CAMERA_Z_FACTOR = 1.6;

function getLayout(aspect) {
  const cameraZ = Math.min(MAX_CAMERA_Z, CAMERA_Z_AT_SQUARE / Math.min(1, aspect));
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;
  return { cameraZ: isMobile ? cameraZ * MOBILE_CAMERA_Z_FACTOR : cameraZ };
}

function Home() {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth || mount.parentElement.clientWidth * 0.35;
    const h = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    const initialLayout = getLayout(w / h);
    camera.position.z = initialLayout.cameraZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h, false);
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

    const glbPending = registerPending();
    const resolveGlb = glbPending.resolve;

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
        // Force the first real draw (not just shader compile) to happen now,
        // while the page is still hidden behind the loader — then wait two
        // animation frames so the browser has actually painted it and any
        // driver-side deferred work has settled. Otherwise that first heavy
        // render happens right as the overlay lifts, blocking the main
        // thread and turning the opacity fade into an abrupt pop.
        renderer.compile(scene, camera);
        renderer.render(scene, camera);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolveGlb();
          });
        });
      },
      (event) => {
        if (event.lengthComputable && event.total > 0) {
          glbPending.setProgress(event.loaded / event.total);
        }
      },
      (error) => {
        console.error('Error loading model:', error);
        resolveGlb();
      }
    );

    function animate() {
      if (model) model.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    function handleResize(mw, mh) {
      if (!mw || !mh) return;
      const aspect = mw / mh;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(mw, mh, false);
      const layout = getLayout(aspect);
      camera.position.z = layout.cameraZ;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      handleResize(width, height);
    });
    resizeObserver.observe(mount);

    return () => {
      resolveGlb();
      resizeObserver.disconnect();
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
            {p.src.endsWith('.mp4') ? (
              <video src={p.src} autoPlay loop muted playsInline />
            ) : (
              <img src={p.src} alt={p.alt} />
            )}
            {p.tag && <span className="home-project-tag">{p.tag}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
