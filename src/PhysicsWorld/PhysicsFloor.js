import * as CANNON from 'cannon-es';
import PhysicsWorlds from './PhysicsWorlds.js';

export default class PhysicsFloor {
  constructor() {
    this.physicsWorld = new PhysicsWorlds();

    this.setShape();
    this.setMaterial();
    this.setBody();
  }

  setShape() {
    this.shape = new CANNON.Plane();
  }

  setMaterial() {
    this.material = this.physicsWorld.materials.floorMaterial;
  }

  setBody() {
    this.body = new CANNON.Body(
      {
        mass: 0,
        shape: this.shape,
        material: this.material,
      });
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI / 2);

    this.physicsWorld.instance.addBody(this.body);
  }
}
