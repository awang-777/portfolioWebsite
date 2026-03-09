import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import './Contact.css';

function Contact() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
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
      color: 0xe8e8ec,
      metalness: 0.0,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      iridescence: 1.0,
      iridescenceIOR: 1.5,
      iridescenceThicknessRange: [0, 2000],
    });

    let model;
    const loader = new GLTFLoader();
    loader.load(
      '/website2.glb',
      (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.x -= 3.5;
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
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
    <div className="contact-page">
      <div ref={mountRef} className="contact-mount" />
      <div className="contact-overlay">
        <div className="contact-card">
          <a
            href="https://www.instagram.com/m3ii.22"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <div className="contact-divider" />

          <div className="contact-text">
            <p>Hello :)</p>
            <p className="contact-p">
              For all inquiries regarding commissions, collaborative projects, partnerships, or anything else — please reach out using the email below.
            </p>
            <p className="contact-email">amndaawang@gmail.com</p>
            <p className="contact-p">I look forward to hearing from you!</p>
            <p className="contact-signature">Best,<br />Amanda</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
