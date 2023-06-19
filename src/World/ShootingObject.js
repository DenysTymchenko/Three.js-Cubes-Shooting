import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Experience from '../Experience.js';

export default class ShootingObject {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.controls = this.camera.controls;
    this.physicsWorld = this.experience.physicsWorld;

    this.shootingObjectsMeshes = [];
    this.shootingObjectsBodies = [];

    this.setGeometry();
    this.setMaterial();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(0.1, 15, 15);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: '#0bcbea',
      metalness: 0.3,
      roughness: 0.4,
    });
  }

  shoot() {
    const body = new CANNON.Body({
      mass: 1,
      position: this.getMeshSpawnPosition(),
      shape: this.physicsWorld.physicsShootingObject.shape,
      material: this.physicsWorld.physicsShootingObject.material,
    });
    this.setLocalForce(body);

    this.shootingObjectsBodies.push(body);
    this.physicsWorld.instance.addBody(body);

    const mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.position.copy(this.getMeshSpawnPosition());
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    this.shootingObjectsMeshes.push(mesh);
    this.scene.add(mesh);
  }

  getMeshSpawnPosition() {
    // Finding the direction in which camera is looking at
    const cameraDirection = new THREE.Vector3(); // the way in which camera looking will be stored here
    const quaternion = new THREE.Quaternion(); // camera rotation will be stored here
    this.camera.instance.getWorldQuaternion(quaternion); // getting camera's rotation in world space
    // x: 0, y: 0, z: -1 - represents the forward direction of the camera
    cameraDirection.set(0, 0, -1).applyQuaternion(quaternion).normalize();

    const spawnDistance = 0.2;
    const spawnPosition = new THREE.Vector3();
    // setting the spawn position from the camera's position in the direction in which camera is looking, at the specified distance.
    spawnPosition.copy(this.camera.instance.position).add(cameraDirection.multiplyScalar(spawnDistance));

    return spawnPosition;
  }

  setLocalForce(body) {
    const force = new CANNON.Vec3(0, 0, -1); // Initial force in the forward direction

    const cameraDirection = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    this.camera.instance.getWorldQuaternion(quaternion);
    cameraDirection.set(0, 0, -400).applyQuaternion(quaternion);

    force.copy(cameraDirection);
    body.applyLocalForce(force);
  }
}
