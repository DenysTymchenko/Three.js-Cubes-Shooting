import * as CANNON from 'cannon-es';
import PhysicsWorlds from './PhysicsWorlds.js';

export default class PhysicsFloor {
  constructor() {
    this.physicsWorld = new PhysicsWorlds();

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
