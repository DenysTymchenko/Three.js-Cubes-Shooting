import * as CANNON from 'cannon-es';
import Experience from '../Experience.js';
import PhysicFloor from './PhysicFloor.js';
import PhysicCubesTower from './PhysicCubesTower.js';
import Materials from '../Utils/Materials.js';

let objects = null;
export default class PhysicObjects {
  constructor() {
    if (objects) return objects;
    objects = this;

    this.experience = new Experience()
    this.physicsWorld = this.experience.physicsWorld;

    this.materials = new Materials();
    this.createCubeFloorContactMaterial();

    this.physicFloor = new PhysicFloor();
    this.physicsCubesTower = new PhysicCubesTower();
  }

  createCubeFloorContactMaterial() {
    const cubeFloorContactMaterial = new CANNON.ContactMaterial(
      this.materials.cubeMaterial,
      this.materials.floorMaterial,
      {
        friction: 0.1,
        restitution: 0.5,
      },
    )

    this.physicsWorld.addContactMaterial(cubeFloorContactMaterial);
  }
}
