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

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/9.png");
//Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: "#ff88cc",
});
particlesMaterial.alphaMap = particleTexture;
//particlesMaterial.alphaTest = 0.01
particlesMaterial.transparent = true;
// particlesMaterial.depthTest = true;//not showing what behind
particlesMaterial.depthWrite = false;//not drawing what is inside//
// particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.vertexColors = true


const particles = new THREE.Points(particlesGeometry, particlesMaterial);
const count = 20000;
const position = new Float32Array(count * 3);
const colors = new Float32Array(count*3);
for (let i = 0; i < count * 3; i++) {
  position[i] = Math.random() * 10 - 5;
  colors[i] = Math.random()*3;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(position, 3)
);
particlesGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colors, 3)
)

//points

scene.add(particles);

//cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())

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
  //
  //particles.rotation.y = elapsedTime
  for (let i=0;i<count;i++){
    const i3 = i*3;
    const x = particlesGeometry.attributes.position.array[i3];
    particlesGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime-x);

  }
  particlesGeometry.attributes.position.needsUpdate=true;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
