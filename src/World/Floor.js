import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1000, 1000);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: '#E3E3E3',
      metalness: 0.3,
      roughness: 0.4,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = - Math.PI / 2;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }
}
