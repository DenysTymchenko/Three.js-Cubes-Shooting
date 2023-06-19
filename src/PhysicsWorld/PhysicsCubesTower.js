import * as CANNON from 'cannon-es';
import cubeParameters from '../Utils/CubeParameters.js';
import PhysicsWorlds from './PhysicsWorlds.js';

export default class PhysicsCubesTower {
  constructor() {
    this.physicsWorld = new PhysicsWorlds();

    this.setShape();
    this.setMaterial();
  }

  setShape() {
    this.shape = new CANNON.Box(new CANNON.Vec3(
      cubeParameters.cubeWidth / 2,
      cubeParameters.cubeHeight / 2,
      cubeParameters.cubeDepth / 2,
    ));
  }

  setMaterial() {
    this.material = this.physicsWorld.materials.cubeMaterial;
  }
}
