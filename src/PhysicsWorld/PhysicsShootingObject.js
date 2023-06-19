import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import PhysicsWorlds from './PhysicsWorlds.js';
import Experience from '../Experience.js';

export default class PhysicsShootingObject {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.physicsWorld = new PhysicsWorlds();

    this.setShape();
    this.setMaterial();
  }

  setShape() {
    this.shape = new CANNON.Sphere(0.1);
  }

  setMaterial() {
    this.material = this.physicsWorld.materials.shootingObjectMaterial;
  }
}

