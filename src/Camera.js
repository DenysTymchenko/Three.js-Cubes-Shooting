import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;


    this.setInstance(); // Creating camera
    this.setPointerLockControls(); // Adding OrbitControls

    window.addEventListener('keydown', (e) => this.move(e.code));
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.01,
      100
    );
    this.instance.position.set(0, 1, -15);
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.instance);
  }

  setPointerLockControls() {
    this.controls = new PointerLockControls(this.instance, this.canvas);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  move(key) {
    switch (key) {
      case 'KeyW':
      case 'ArrowUp':
        this.controls.moveForward(0.5);
        break;

      case 'KeyA':
      case 'ArrowLeft':
        this.controls.moveRight(-0.5);
        break;

      case 'KeyS':
      case 'ArrowDown':
        this.controls.moveForward(-0.5);
        break;

      case 'KeyD':
      case 'ArrowRight':
        this.controls.moveRight(0.5);
        break;

      case 'Escape':
        this.experience.handleHint()
        break;
    }
  }
}
