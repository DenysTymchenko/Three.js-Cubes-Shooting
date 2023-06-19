import * as CANNON from 'cannon-es';
import PhysicsWorld from './PhysicsWorld.js';
import Experience from '../Experience.js';

export default class PhysicsShootingObject {
  constructor() {
    this.physicsWorld = new PhysicsWorld();

    this.setShape();
    this.setMaterial();
  }

  setShape() {
    this.shape = new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1,));
  }

  setMaterial() {
    this.material = this.physicsWorld.materials.shootingObjectMaterial;
  }
}

