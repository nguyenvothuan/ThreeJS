import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */



const ambientLight = new THREE.AmbientLight()
ambientLight.color=new THREE.Color('0xffffff');ambientLight.intensity=0.4
//scene.add(ambientLight);
//gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01) ;


const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
directionalLight.position.set(1,0.25,0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000,0x0000ff,0.3);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff0000, 0.4,3);
pointLight.position.set(1,1,1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4c00ff, 2,3,1);
// rectAreaLight.lookAt()
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00,0.5,10, Math.PI*0.1, 0.25,1);
spotLight.position.set(0,2,3);
scene.add(spotLight);
spotLight.target.position.set(-0.75,1,1);
scene.add(spotLight.target);
//minimal cost: ambient and hemisphere
//moderate cost: directional and point
//high cost: spot and rectarea
const lightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1);
scene.add(lightHelper);
const  directionalHelper = new THREE.DirectionalLightHelper(directionalLight,0.2);
scene.add(directionalHelper);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper)
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper)

window.requestAnimationFrame(()=>{
    spotLightHelper.update();
})



/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()