/**
 * 3D Beaker Canvas
 * A cursor-following beaker with Three.js wiggle animation
 */
import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class BeakerCanvas {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.wiggleAmplitude = 0;
    this.time = 0;

    this.setupRenderer();
    this.setupLighting();
    this.createBeaker();
    this.setupEventListeners();
    this.animate();
  }

  setupRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.z = 3;
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Point light for highlights
    const pointLight = new THREE.PointLight(0x00ffff, 0.5);
    pointLight.position.set(-5, 5, 5);
    this.scene.add(pointLight);
  }

  createBeaker() {
    const beakerGroup = new THREE.Group();
    // Create bubble group for animation inside the tube
    const bubbleGroup = new THREE.Group();
    beakerGroup.add(bubbleGroup);

    // Test tube body - long thin cylinder (transparent)
    const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.35, 2.2, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd0b3ff,
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      side: THREE.DoubleSide,
      emissive: 0x6b5b95,
      emissiveIntensity: 0.05,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    beakerGroup.add(body);

    // Test tube rim
    const rimGeometry = new THREE.TorusGeometry(0.38, 0.06, 16, 32);
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a4a84,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.position.y = 1.15;
    rim.rotation.x = Math.PI / 2;
    rim.castShadow = true;
    rim.receiveShadow = true;
    rim.transparent = true;
    rim.opacity = 0.4;
    beakerGroup.add(rim);

    // Test tube rounded bottom
    const bottomGeometry = new THREE.SphereGeometry(
      0.35,
      32,
      16,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2,
    );
    const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
    bottom.position.y = -1.1;
    bottom.castShadow = true;
    bottom.receiveShadow = true;
    beakerGroup.add(bottom);

    // Liquid inside - purple liquid
    const liquidGeometry = new THREE.CylinderGeometry(0.32, 0.32, 1.2, 32);
    const liquidMaterial = new THREE.MeshStandardMaterial({
      color: 0x9d4edd,
      metalness: 0.15,
      roughness: 0.4,
      transparent: true,
      opacity: 0,
      // emissive: 0x7b2cbf,
      // emissiveIntensity: 0.3,
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = -0.3;
    liquid.castShadow = true;
    liquid.receiveShadow = true;
    beakerGroup.add(liquid);

    // Bubbles in liquid
    for (let i = 0; i < 8; i++) {
      const bubbleGeometry = new THREE.SphereGeometry(
        0.08 + Math.random() * 0.08,
        16,
        16,
      );
      const bubbleMaterial = new THREE.MeshStandardMaterial({
        color: 0xc77dff,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
      });
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      bubble.position.set(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 1 - 0.3,
        (Math.random() - 0.5) * 0.25,
      );
      bubbleGroup.add(bubble);
    }

    this.beaker = beakerGroup;
    this.scene.add(beakerGroup);
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('resize', () => this.onWindowResize());
  }

  onMouseMove(event) {
    this.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    this.wiggleAmplitude = 0.15; // Trigger wiggle on movement
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.time += 0.016; // ~60fps

    // Smoothly move towards target
    this.mouseX += (this.targetX - this.mouseX) * 0.08;
    this.mouseY += (this.targetY - this.mouseY) * 0.08;

    // Apply wiggle based on movement speed
    const moveSpeed = Math.hypot(
      this.targetX - this.mouseX,
      this.targetY - this.mouseY,
    );
    this.wiggleAmplitude +=
      (Math.min(moveSpeed, 0.3) - this.wiggleAmplitude) * 0.1;

    // Position beaker based on cursor
    this.beaker.position.x = this.mouseX * 2;
    this.beaker.position.y = this.mouseY * 2;

    // Apply wiggle rotation
    const wiggleX = Math.sin(this.time * 12) * this.wiggleAmplitude * 0.3;
    const wiggleY = Math.cos(this.time * 15) * this.wiggleAmplitude * 0.35;
    const wiggleZ = Math.sin(this.time * 10) * this.wiggleAmplitude * 0.25;

    this.beaker.rotation.x = wiggleX;
    this.beaker.rotation.y = wiggleY;
    this.beaker.rotation.z = wiggleZ;

    // Rotate on its own axis
    this.beaker.rotation.z += 0.002;

    // Decay wiggle amplitude
    this.wiggleAmplitude *= 0.95;

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  new BeakerCanvas();
});

export { BeakerCanvas };
