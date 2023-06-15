import * as CANNON from 'cannon-es';
import Experience from '../Experience.js';
import PhysicObjects from './PhysicObjects.js';

export default class PhysicFloor {
  constructor() {
    this.experience = new Experience()
    this.physicsWorld = this.experience.physicsWorld;
    this.physicObjects = new PhysicObjects();

    this.setShape();
    this.setMaterial();
    this.setBody();
  }

  setShape() {
    this.shape = new CANNON.Plane();
  }

  setMaterial() {
    this.material = this.physicObjects.materials.floorMaterial;
  }

  setBody() {
    this.body = new CANNON.Body(
      {
        mass: 0,
        shape: this.shape,
        material: this.material,
      });
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI / 2);

    this.physicsWorld.addBody(this.body);
  }
}
