import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Experience from '../Experience.js';

export default class ShootingObject {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.controls = this.camera.controls;
    this.physicsWorld = this.experience.physicsWorld;

    // Meshes and bodies will be stored here, for future physics simulation.
    this.shootingObjectsMeshes = [];
    this.shootingObjectsBodies = [];

    this.setModel();
  }

  setModel() {
    this.model = this.resources.items['pickaxe-model'].scene;
    this.model.scale.set(0.005, 0.005, 0.005); // The model is huge by itself, so we making it smaller.
  }

  shoot() {
    // Creating shooting object body
    const body = new CANNON.Body({
      mass: 1,
      position: this.getMeshSpawnPosition(), // Finds the direction in which camera is looking at.
      shape: this.physicsWorld.physicsShootingObject.shape,
      material: this.physicsWorld.physicsShootingObject.material,
    });
    this.setLocalForce(body); // Setting perfect localForce to push body forward
    this.shootingObjectsBodies.push(body);
    this.physicsWorld.instance.addBody(body);

    // Creating shooting object mesh
    const pickaxe = this.model.clone();
    pickaxe.position.copy(body.position);
    pickaxe.receiveShadow = true;
    pickaxe.castShadow = true;
    this.shootingObjectsMeshes.push(pickaxe);
    this.scene.add(pickaxe);
  }

  getMeshSpawnPosition() {
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
