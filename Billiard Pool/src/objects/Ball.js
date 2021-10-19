import * as THREE from "three";
import CANNON from "cannon";
import { TextureLoader } from "three";

const textureLoader = new TextureLoader();
const Ball = (num, position) => {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      map: textureLoader.load("/textures/ball/13.png"),
    })
  );
  mesh.castShadow = true;
  mesh.position.copy(position);

  const shape = new CANNON.Sphere(0.2);
  const body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 0.2, 0),
      shape: shape,
      material: defaultMaterial,
  })

};
export default Ball;
