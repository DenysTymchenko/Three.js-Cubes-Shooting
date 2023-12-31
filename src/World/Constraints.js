import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Experience from '../Experience.js';
import cubeParameters from '../Utils/CubeParameters.js';

export default class Constaints {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physicsWorld = this.experience.physicsWorld;

    // Cubes bodies and meshes will be stored here
    this.constraintsBodies = [];
    this.constraintsMeshes = [];


    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.createPlatform(); // Creating two cubes, on which constraint are going to stand
    this.createConstraints();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(cubeParameters.cubeWidth, cubeParameters.cubeHeight, cubeParameters.cubeDepth);
  }

  setTexture() {
    this.texture = this.resources.items['diamond-ore'];
    this.texture.magFilter = THREE.NearestFilter;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ map: this.texture, });
  }

  createPlatform() {
    for (let i = 1; i <= 2; i++) {
      // Creating platform cube body
      const body = new CANNON.Body({
        mass: 0.5,
        position: new CANNON.Vec3(-cubeParameters.cubeWidth * 3 * i, cubeParameters.cubeHeight / 2, 0),
        shape: this.physicsWorld.physicsConstaints.shape,
        material: this.physicsWorld.physicsConstaints.material,
      });
      this.physicsWorld.instance.addBody(body);

      // Creating platform cube mesh
      const mesh = new THREE.Mesh(this.geometry, this.material);
      mesh.position.copy(body.position);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);

      this.constraintsBodies.push(body);
      this.constraintsMeshes.push(mesh);
    }
  }

  createConstraints() {
    let previous = null; // Used for creating constraints

    for (let x = 0; x < 4; x++) {
      // Creating cube body
      const body = new CANNON.Body({
        mass: 0.5,
        position: new CANNON.Vec3(
          -cubeParameters.cubeWidth * 3 + (-cubeParameters.cubeWidth * x),
          cubeParameters.cubeHeight / 2 + cubeParameters.cubeHeight,
          0
        ),
        shape: this.physicsWorld.physicsConstaints.shape,
        material: this.physicsWorld.physicsConstaints.material,
      });
      this.physicsWorld.instance.addBody(body);

      // Creating cube mesh
      const mesh = new THREE.Mesh(this.geometry, this.material);
      mesh.position.copy(body.position);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);

      this.constraintsBodies.push(body);
      this.constraintsMeshes.push(mesh);

      // "Gluing" this cube's body and previous one
      if (previous) {
        const constraint = new CANNON.LockConstraint(body, previous);
        this.physicsWorld.instance.addConstraint(constraint);
      }

      previous = body;
    }
  }
}
