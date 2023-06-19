import * as CANNON from 'cannon-es';
import PhysicsFloor from './PhysicsFloor.js';
import PhysicsCubesTower from './PhysicsCubesTower.js';
import Materials from '../Utils/Materials.js';
import PhysicsShootingObject from './PhysicsShootingObject.js';
import PhysicsConstraints from './PhysicsConstraints.js';

let physicsWorldInstance = null;

export default class PhysicsWorld {
  constructor() {
    if (physicsWorldInstance) return physicsWorldInstance;
    physicsWorldInstance = this;

    this.setInstance();

    this.materials = new Materials(); // materials for contact materials creation are stored there.
    this.createContactMaterials();

    // All shapes and materials for future bodies are created there.
    this.physicsFloor = new PhysicsFloor();
    this.physicsCubesTower = new PhysicsCubesTower();
    this.physicsShootingObject = new PhysicsShootingObject();
    this.physicsConstaints = new PhysicsConstraints();
  }

  setInstance() {
    this.instance = new CANNON.World();
    this.instance.gravity.set(0, -9.82, 0);
    this.instance.allowSleep = true;
  }

  createContactMaterials() {
    const cubeFloorContactMaterial = new CANNON.ContactMaterial(
      this.materials.cubeMaterial,
      this.materials.floorMaterial,
      {
        friction: 0.1,
        restitution: 0.5,
      },
    );
    this.instance.addContactMaterial(cubeFloorContactMaterial);

    const shootingObjectFloorContactMaterial = new CANNON.ContactMaterial(
      this.materials.shootingObjectMaterial,
      this.materials.floorMaterial,
      {
        friction: 0.1,
        restitution: 0.5,
      },
    );
    this.instance.addContactMaterial(shootingObjectFloorContactMaterial);

    const shootingObjectCubeContactMaterial = new CANNON.ContactMaterial(
      this.materials.shootingObjectMaterial,
      this.materials.cubeMaterial,
      {
        friction: 1,
        restitution: 1,
      },
    );
    this.instance.addContactMaterial(shootingObjectCubeContactMaterial);
  }
}
