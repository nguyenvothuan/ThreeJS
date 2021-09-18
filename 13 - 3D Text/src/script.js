import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)
//Axes
const axes = new THREE.AxesHelper(3);
scene.add(axes);

// scene.add(cube)
//Font loader
let text;
const fontLoader = new THREE.FontLoader();
fontLoader.load(
	// resource URL
	'/fonts/helvetiker_regular.typeface.json',

	// onLoad callback
	(font)=> {
        const textGeometry = new THREE.TextBufferGeometry(
            'Tobey Maguire',
            {
                
                font: font,
                size: 0.5,
                height:0.2,
                curveSegments:2,
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:5
            }
        )
        textGeometry.center();
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x-0.02)*0.5,
        //     -(textGeometry.boundingBox.max.y-0.02)*0.5,
        //     -(textGeometry.boundingBox.max.z-0.02)*0.5
        // )
        console.log(textGeometry.boundingBox)
        const textMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture })
        text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text)


        console.time('donuts',)
        for (let i=0;i<100;i++){
            const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45);
            const donut = new THREE.Mesh(donutGeometry, textMaterial)
            donut.position.set(Math.random()*10-5, Math.random()*10-5,Math.random()*10-5 )
            donut.rotation.x = Math.random()*Math.PI;
            donut.rotation.y=Math.random()*Math.PI;
            donut.rotation.z=Math.random()*Math.PI;
            const scale = Math.random();
            donut.scale.set(scale, scale, scale);
            scene.add(donut);
        }
        console.timeEnd('donuts')
    },

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% load' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);


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
    camera.lookAt(text)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()