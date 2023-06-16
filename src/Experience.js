import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import PhysicObjects from './PhysicWorld/PhysicObjects.js';

let instance = null

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.createPhysicsWorld();
    this.physicObjects = new PhysicObjects();

    this.configureScene();

    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
    console.log(this)
  }

  createPhysicsWorld() {
    this.physicsWorld = new CANNON.World();
    this.physicsWorld.gravity.set(0, -9.82, 0);
  }

  configureScene() {
    this.scene.fog = new THREE.Fog(0x000000, 0, 100);
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.simulatePhysics();
  }

  simulatePhysics() {
    // Update physics
    this.physicsWorld.step(1 / 60, this.time.delta / 1000, 3);

    for (let i = 0; i < this.world.cubesTower.cubes.length; i++) {
      // updating position
      this.world.cubesTower.cubes[i].position.copy(
        this.physicObjects.physicsCubesTower.bodies[i].position
      );

      // updating rotation
      this.world.cubesTower.cubes[i].quaternion.copy(
        this.physicObjects.physicsCubesTower.bodies[i].quaternion
      );
    }
  }

}
