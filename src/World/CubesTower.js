import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Experience from '../Experience.js';
import cubeParameters from '../Utils/CubeParameters.js';

export default class CubesTower {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physicsWorld = this.experience.physicsWorld;

    this.cubesBodies = []
    this.cubesMeshes = [];

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.createTower();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(cubeParameters.cubeWidth, cubeParameters.cubeHeight, cubeParameters.cubeDepth);
  }

  setTexture() {
    this.texture = this.resources.items['diamond-ore'];
    this.texture.magFilter = THREE.NearestFilter; // Used to make texture quality better. If you delete this line, the texture will be blury
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ map: this.texture, });
  }

  createTower() {
    // Used to place a cubes on the floor perfectly
    this.yOffset = cubeParameters.cubeHeight / 2;

    for (let x = 0; x < cubeParameters.cubeWidth * 3; x += cubeParameters.cubeWidth) {
      for (let y = 0; y < cubeParameters.cubeHeight * cubeParameters.towerHeight; y += cubeParameters.cubeHeight) {
        for (let z = 0; z < cubeParameters.cubeDepth * 3; z += cubeParameters.cubeDepth) {
          // Creating cube body
          const body = new CANNON.Body({
            mass: 0.5,
            position: new CANNON.Vec3(x, y + this.yOffset, z),
            shape: this.physicsWorld.physicsCubesTower.shape,
            material: this.physicsWorld.physicsCubesTower.material,
          });

          this.cubesBodies.push(body);
          this.physicsWorld.instance.addBody(body);

          // Creating cube mesh
          const mesh = new THREE.Mesh(this.geometry, this.material);
          mesh.position.copy(body.position);
          mesh.receiveShadow = true;
          mesh.castShadow = true;

          this.cubesMeshes.push(mesh);
          this.scene.add(mesh);
        }
      }
    }
  }
}
