import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import Experience from './Experience';
import EventEmitter from './Utils/EventEmmiter.js';

export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance(); // Creating camera
    this.setPointerLockControls(); // Adding OrbitControls

    this.controls.addEventListener('lock', () => this.trigger('lock')); // If controls are locked - hint div is hidden.
    this.controls.addEventListener('unlock', () => this.trigger('unlock')); // If controls are unlocked - hint div is shown.
    window.addEventListener('keydown', (e) => this.pressKey(e.code));
    window.addEventListener('keyup', (e) => this.unpressKey(e.code));
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      1,
      100
    );
    this.instance.position.set(0, 1, -15);
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.instance);
  }

  setPointerLockControls() {
    this.controls = new PointerLockControls(this.instance, this.canvas);
    this.controls.pressedKeys = {
      W: false,
      A: false,
      S: false,
      D: false,
    }
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  pressKey(key) {
    if (this.controls.isLocked) {
      switch (key) {
        case 'KeyW':
        case 'ArrowUp':
          this.controls.pressedKeys.W = true;
          break;

        case 'KeyA':
        case 'ArrowLeft':
          this.controls.pressedKeys.A = true;
          break;

        case 'KeyS':
        case 'ArrowDown':
          this.controls.pressedKeys.S = true;
          this.controls.moveForward(-0.3);
          break;

        case 'KeyD':
        case 'ArrowRight':
          this.controls.pressedKeys.D = true;
          this.controls.moveRight(0.3);
          break;
      }
    }
  }

  unpressKey(key) {
    if (this.controls.isLocked) {
      switch (key) {
        case 'KeyW':
        case 'ArrowUp':
          this.controls.pressedKeys.W = false;
          break;

        case 'KeyA':
        case 'ArrowLeft':
          this.controls.pressedKeys.A = false;
          break;

        case 'KeyS':
        case 'ArrowDown':
          this.controls.pressedKeys.S = false;
          this.controls.moveForward(-0.3);
          break;

        case 'KeyD':
        case 'ArrowRight':
          this.controls.pressedKeys.D = false;
          this.controls.moveRight(0.3);
          break;
      }
    }
  }

  move() {
    if (this.controls.pressedKeys.W) this.controls.moveForward(0.3);
    if (this.controls.pressedKeys.A) this.controls.moveRight(-0.3);
    if (this.controls.pressedKeys.S) this.controls.moveForward(-0.3);
    if (this.controls.pressedKeys.D) this.controls.moveRight(0.3);
  }
}
