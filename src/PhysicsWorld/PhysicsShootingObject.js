import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import PhysicsWorlds from './PhysicsWorlds.js';
import Experience from '../Experience.js';
import cubeParameters from '../Utils/CubeParameters.js';

export default class PhysicsShootingObject {
  constructor() {
    this.experience = new Experience();
    this.physicsWorld = new PhysicsWorlds();

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

