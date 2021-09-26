import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Color, PointLightShadow } from 'three';
import * as dat from 'dat.gui';
/**
 * Base
 */


//debug
const gui = new dat.GUI();


//Texture
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader()
const doorAmbient = textureLoader.load('/textures/door/color.jpg');
const metalball=textureLoader.load('textures/matcaps/2.png');
const roughness = textureLoader.load('textures/door/roughness.jpg');
const gradient = textureLoader.load('/textures/gradients/3.jpg');
gradient.minFilter=THREE.NearestFilter;
gradient.magFilter=THREE.NearestFilter;
gradient.generateMipmaps = false;
const doorAlpha = textureLoader.load('textures/door/alpha.jpg');
const goldball = textureLoader.load('textures/matcaps/4.png');
const door = textureLoader.load('textures/door/ambient.jpg');
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//material

// const material = new THREE.MeshBasicMaterial({
//     map: door, 
// });
// material.color=new Color('red');//not just red
// material.color.set('purple');
// material.map=metalball;
// material.wireframe=true;
// material.opacity=0.5; 
// material.transparent=true;
// material.alphaMap = doorAlpha;
// material.side = THREE.DoubleSide;
// const material = new THREE.MeshNormalMaterial()
// material.wireframe=true;
// material.flatShading=true;
// const material = new THREE.MeshMatcapMaterial();
// material.matcap=goldball;
// const material=new THREE.MeshDepthMaterial();
// const material = new THREE.MeshLambertMaterial()
// const material= new THREE.MeshPhongMaterial()
// material.shininess=100;
// material.specular=new THREE.Color(0xff0000);
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradient;




const material = new THREE.MeshStandardMaterial();//better material
material.metalness = 0.45;
material.roughness = 0.65;
material.aoMap = door;
material.aoMapIntensity = 10;
material.displacementMap = door;
material.wireframe = true;
material.displacementScale = 0.05
material.normalScale = door


gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);
gui.add(material, 'displacementScale').min(0).max(10).step(0.0001);
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

//objects
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,64,64),material
)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2));


const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1,100),material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2));


sphere.position.x=-1.5;
const torus =new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.1, 16, 32), material
)
torus.position.x=1.5;



scene.add(sphere, plane, torus);
 

//Axes
const axes = new THREE.AxesHelper(3);
scene.add(axes);

//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x=2;
pointLight.position.y=3;
pointLight.position.z=4;
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update object
    sphere.rotation.y=elapsedTime
    plane.rotation.y=elapsedTime;
    torus.rotation.y=elapsedTime;
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()