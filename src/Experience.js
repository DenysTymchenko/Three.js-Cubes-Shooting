import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import PhysicsWorld from './PhysicsWorld/PhysicsWorld.js';
import Resources from './Utils/Resources.js';

let instance = null

export default class Experience {
  constructor(hint, canvas) {
    if (instance) return instance;
    instance = this;

    this.hint = hint;
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.physicsWorld = new PhysicsWorld(); // All CANNON.js params, contact materials, shapes, etc. - are stored here.
    this.world = new World(); // All that we can see on screen - is stored here. (CANNON.js bodies are created here).

    window.addEventListener('click', () => {
      this.camera.controls.isLocked ? this.world.shootingObject.shoot() : this.camera.controls.lock();
    });

    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());
    this.camera.on('lock', () => this.hideHint());
    this.camera.on('unlock', () => this.showHint());
  }

  hideHint() {
    this.hint.style.display = 'none';
    this.camera.controls.lock();
  }

  showHint() {
    this.hint.style.display = 'flex';
    this.camera.controls.unlock();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.move();
    if (this.camera.controls.isLocked) this.simulatePhysics();
    this.renderer.update();
  }

  simulatePhysics() {
    // Update physics
    this.physicsWorld.instance.step(1 / 60, this.time.delta / 1000, 3);

    // Cubes physics
    for (let i = 0; i < this.world.cubesTower.cubesMeshes.length; i++) {
      // updating position
      this.world.cubesTower.cubesMeshes[i].position.copy(
        this.world.cubesTower.cubesBodies[i].position
      );

      // updating rotation
      this.world.cubesTower.cubesMeshes[i].quaternion.copy(
        this.world.cubesTower.cubesBodies[i].quaternion
      );
    }

    // Shooting objects physics
    for (let i = 0; i < this.world.shootingObject.shootingObjectsMeshes.length; i++) {
      // updating position
      this.world.shootingObject.shootingObjectsMeshes[i].position.copy(
        this.world.shootingObject.shootingObjectsBodies[i].position
      )

      // updating rotation
      this.world.shootingObject.shootingObjectsMeshes[i].quaternion.copy(
        this.world.shootingObject.shootingObjectsBodies[i].quaternion
      )
    }

    // Constraints physics
    for (let i = 0; i < this.world.constraints.constraintsMeshes.length; i++) {
      // updating position
      this.world.constraints.constraintsMeshes[i].position.copy(
        this.world.constraints.constraintsBodies[i].position
      );

      // updating rotation
      this.world.constraints.constraintsMeshes[i].quaternion.copy(
        this.world.constraints.constraintsBodies[i].quaternion
      );
    }
  }

}
