import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x=0.7;
mesh.position.y=-0.6;
mesh.position.z=1;
console.log(mesh.position.length());
// scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y=-1;
camera.position.x=1;
scene.add(camera)
// console.log('mesh to camera: ',mesh.position.distanceTo(camera.position))
// // mesh.position.normalize();

// // mesh.position.set(1,1,1);
// mesh.scale.x=2;
// mesh.scale.y=0.5;
// mesh.scale.z=0.5;
// //axes helper
// camera.lookAt(new THREE.Vector3(3,0,0));
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);//x:red, y:green, z:blue

// mesh.rotation.reorder('YXZ');
// mesh.rotation.x=Math.PI/4;
// mesh.rotation.y=Math.PI/4;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color:0xff0000}));
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color:0x00ff00}));
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(4,1,1), new THREE.MeshBasicMaterial({color:0x0000ff}));

cube2.position.x=-2;

group.add(cube1);
group.add(cube2);
group.add(cube3);
group.position.y=1;
group.scale.y=2;
group.rotation.y=1;
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)