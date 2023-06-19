import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Experience from '../Experience.js';

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.physicsWorld = this.experience.physicsWorld;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.createFloor();
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

  createFloor() {
    this.body = new CANNON.Body(
      {
        mass: 0,
        shape: this.physicsWorld.physicsFloor.shape,
        material: this.physicsWorld.physicsFloor.material,
      });
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);
    this.physicsWorld.instance.addBody(this.body);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
