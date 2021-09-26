import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui';
import imageSource from './color.jpg';


//threeD texture
//poliigon.com
//3dtextures.me
//arroway-textures.ch

//jpg -> img -> texture
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = ()=>{
//     texture.needsUpdate = true;
// }


// image.src = '/textures/door/color.jpg'
//loading manager
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart=()=>{
    console.log('start')
}
const textureLoader = new THREE.TextureLoader(loadingManager);//a tool to load img: texture <- [textureLoader.load(jpg)] <- jpg 
const colortexture = textureLoader.load(
    './textures/minecraft.png',
    ()=>{
        console.log('load');
    },
    ()=>{
        console.log('progress');
    },
    ()=>{
        console.log('error');
    }
);
const alphaTexture = textureLoader.load('texture/door/alpha.jpg');
const heightTexture = textureLoader.load('texture/door/height.jpg');
const normalTexture = textureLoader.load('texture/door/normal.jpg');
colortexture.magFilter=THREE.NearestFilter;
colortexture.minFilter=THREE.NearestFilter;
colortexture.generateMipmaps=false;
// colortexture.repeat.x=2;
// colortexture.repeat.y=3;
// colortexture.wrapS =THREE.RepeatWrapping
// colortexture.wrapT=THREE.RepeatWrapping
// colortexture.rotation=Math.PI/4
// colortexture.center.x=0.5
// colortexture.center.y=0.5


const gui = new dat.GUI();
gui.hide()
const parameters = {
    color: 0xff0000,
    spin: ()=>{
        gsap.to(mesh.rotation, {duration: 1, y:mesh.rotation.y + 10})
    }
}
gui
    .addColor(parameters,'color')
    .onChange(()=> {
        material.color.set(parameters.color);
    })

gui
    .add(parameters, 'spin')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//axes
const axes = new THREE.AxesHelper(3);
scene.add(axes);

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const geo1 = new THREE.ConeBufferGeometry(1,0.35, 32,100);
const material = new THREE.MeshBasicMaterial({ map: colortexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
gui.add(mesh.position,'y',-3,3,0.01);
gui.add(mesh, 'visible');
gui.add(mesh.material,'wireframe');


function spin() {

}


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
camera.position.z = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()