import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Galaxy
const parameters = {
  count: 1000,
  size: 0.1,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 1,
  randomnessPower: 3,
  insideColor: '#ff5588',
  outsideColor: '#ff5588'
};
let particlesGeometry = null;
let particlesMaterial = null;
let particles = null;

const generateGalaxy = () => {
  if (particles !== null) {
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    scene.remove(particles);
  }

  particlesMaterial = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    color: "#ff88cc",
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });
  // let boxGeometry = new THREE.BoxGeometry(5,5,5);
  particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count*3)

  const colorIn = new THREE.Color(parameters.insideColor);
  const colorOut = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * parameters.radius;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
    const spinAngle = radius * parameters.spin;
    const randomX = Math.pow(Math.random(), parameters.randomnessPower) *(Math.random()<0.5? 1:-1);
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) *(Math.random()<0.5? 1:-1);
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) *(Math.random()<0.5? 1:-1);

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorIn.clone();
    mixedColor.lerp(colorOut, radius/parameters.radius );

    colors[i3] = mixedColor.r;
    colors[i3+1]=mixedColor.g;
    colors[i3+2] = mixedColor.b;

  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
  )
  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);
};

generateGalaxy();
gui
  .add(parameters, "count")
  .min(100)
  .max(100000)
  .step(10)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.005)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(2)
  .max(10)
  .step(0.1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy);
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy);

/**
 * Test cube
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);
//scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
