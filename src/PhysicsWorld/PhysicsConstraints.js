import * as CANNON from 'cannon-es';
import cubeParameters from '../Utils/CubeParameters.js';
import PhysicsWorld from './PhysicsWorld.js';

export default class PhysicsConstraints {
  constructor() {
    this.physicsWorld = new PhysicsWorld();

    this.setShape();
    this.setMaterial();
  }

  setShape() {
    this.shape = new CANNON.Box(new CANNON.Vec3(
      cubeParameters.cubeWidth / 2,
      cubeParameters.cubeHeight / 2,
      cubeParameters.cubeDepth / 2,
    )); // making x,y,z parameters two times less, because that way it'll be perfect to the mesh.
  }

  setMaterial() {
    this.material = this.physicsWorld.materials.cubeMaterial;
  }
}
