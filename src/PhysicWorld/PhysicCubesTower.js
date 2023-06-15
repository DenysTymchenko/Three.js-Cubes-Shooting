import * as CANNON from 'cannon-es';
import cubeParameters from '../Utils/CubeParameters.js';
import Experience from '../Experience.js';
import PhysicObjects from './PhysicObjects.js';

export default class PhysicCubesTower {
  constructor() {
    this.experience = new Experience()
    this.physicsWorld = this.experience.physicsWorld;
    this.physicObjects = new PhysicObjects();

    this.bodies = [];

    this.setShape();
    this.setMaterial();
    this.setBody();
  }

  setShape() {
    this.shape = new CANNON.Box(new CANNON.Vec3(
      cubeParameters.cubeWidth / 2,
      cubeParameters.cubeHeight / 2,
      cubeParameters.cubeDepth / 2,
    ));
  }

  setMaterial() {
    this.material = this.physicObjects.materials.cubeMaterial;
  }

  setBody() {
    // Used to place a cubes on the floor perfectly
    this.yOffset = cubeParameters.cubeHeight / 2;

    for (let x = 0; x < cubeParameters.cubeWidth * 3; x += cubeParameters.cubeWidth) {
      for (let y = 0; y < cubeParameters.cubeHeight * cubeParameters.towerHeight; y += cubeParameters.cubeHeight) {
        for (let z = 0; z < cubeParameters.cubeDepth * 3; z += cubeParameters.cubeDepth) {
          const body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(x, y + this.yOffset, z),
            shape: this.shape,
            material: this.material,
          });

          this.bodies.push(body);
          this.physicsWorld.addBody(body)
        }
      }
    }
  }
}
