import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(500, 500);
  }

  setTexture() {
    this.ambientOcclusion = this.resources.items['grassAmbientOcclusion'];
    this.color = this.resources.items['grassColor'];
    this.normal = this.resources.items['grassNormal'];
    this.roughness = this.resources.items['grassRoughness']

    this.repeatTextures([this.ambientOcclusion, this.color, this.normal, this.roughness]);
  }

  repeatTextures(textures) {
    textures.forEach(texture => {
      texture.repeat.set(100, 100)
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    });
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.color,
      aoMap: this.ambientOcclusion,
      normalMap: this.normal,
      roughnessMap: this.roughness,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }
}
