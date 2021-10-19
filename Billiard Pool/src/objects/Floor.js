import * as THREE from 'three';

const textureLoader= new THREE.TextureLoader();
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5,10),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load("/textures/floor/color.jpg"),
        aoMap: textureLoader.load("/textures/floor/ambientOcclusion.jpg"),
        roughnessMap: textureLoader.load("/textures/floor/roughness.jpg"),
    })
)
floor.receiveShadow = true;
floor.rotation.x = -Math.PI*0.5
//TODO: Adjust the floor. Add a bar on each side. Add holes if possible
export default floor;