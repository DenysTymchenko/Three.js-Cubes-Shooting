import * as THREE from 'three';
import Experience from '../Experience.js';
import cubeParameters from '../Utils/CubeParameters.js';

export default class CubesTower {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.cubes = [];

    this.setGeometry();
    this.setMaterial();
    this.createTower();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry( cubeParameters.cubeWidth, cubeParameters.cubeHeight, cubeParameters.cubeDepth);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ color: '#d13610', metalness: 0.3, roughness: 0.4, });
  }

  createTower() {
    // Used to place a cubes on the floor perfectly
    this.yOffset = cubeParameters.cubeHeight / 2;

    for (let x = 0; x < cubeParameters.cubeWidth * 3; x += cubeParameters.cubeWidth) {
      for (let y = 0; y < cubeParameters.cubeHeight * cubeParameters.towerHeight; y += cubeParameters.cubeHeight) {
        for (let z = 0; z < cubeParameters.cubeDepth * 3; z += cubeParameters.cubeDepth) {
          const mesh = new THREE.Mesh(this.geometry, this.material);
          mesh.position.set(x, y + this.yOffset, z);
          mesh.receiveShadow = true;
          mesh.castShadow = true;

          this.cubes.push(mesh);
          this.scene.add(mesh);
        }
      }
    }
  }
}
