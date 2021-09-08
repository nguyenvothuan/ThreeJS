import './style.css'
import * as THREE from 'three';
import { Vector2 } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';



console.log(OrbitControls)
//Cursor
const cursor ={
    x:0,
    y:0
}
window.addEventListener('mousemove', (e)=>{
    cursor.x = e.clientX / sizes.width -0.5;
    cursor.y=-(e.clientY/sizes.height-0.5);
})


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
 const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.0001, 2000)//bug: z-fighting

// const aspectRatio = sizes.width/sizes.height 
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1, 100)//left, right, top, bot
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//COntrols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls.target.y=2;

// Animate
const clock = new THREE.Clock()

const tick = () =>
{ 
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // camera.position.x=Math.sin(cursor.x*Math.PI*2)*3;
    // camera.position.z=Math.cos(cursor.x*Math.PI*2)*3;
    // camera.position.y=cursor.y*5;
    // camera.lookAt(new THREE.Vector3())

    //OrbitControl
    

    controls.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()