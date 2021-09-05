import './style.css'
import * as THREE from 'three'
import gsap from 'gsap';
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
  
let time = Date.now();

const tick =()=> {
    
    const cur = Date.now();
    const delta = cur - time;
    time=cur;
    mesh.position.x+=0.01*delta;
    mesh.rotation.x+=0.01*delta;

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick);
}

gsap.to(mesh.position, {duration:1, delay: 1,x:2,y:2})

const clock = new THREE.Clock();
const tick2 = () => {
    // const elapseTime = clock.getElapsedTime()
    // mesh.rotation.y=Math.sin(elapseTime);
    // mesh.position.x = Math.cos(elapseTime);
    // camera.rotation.y=-Math.sin(elapseTime);
    // camera.position.x=-Math.cos(elapseTime);
    // camera.lookAt(mesh.position);
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick2);
}
tick2();


