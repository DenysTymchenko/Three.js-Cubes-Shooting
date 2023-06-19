import * as CANNON from 'cannon-es';
import PhysicsWorld from './PhysicsWorld.js';

export default class PhysicsFloor {
  constructor() {
    this.physicsWorld = new PhysicsWorld();

    this.setShape();
    this.setMaterial();
  }

  setShape() {
    this.shape = new CANNON.Plane();
  }

  setMaterial() {
    this.material = this.physicsWorld.materials.floorMaterial;
  }
}
