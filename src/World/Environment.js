import Experience from '../Experience.js';
import { AmbientLight, DirectionalLight } from 'three';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setAmbientLight();
    this.setDirectionalLight();
  }

  setAmbientLight() {
    this.ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);
  }

  setDirectionalLight() {
    this.directionalLight = new DirectionalLight(0xffffff, 0.5);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(-3, 2.5, 0);
    this.directionalLight.target.position.set(0, 0, 0);

    this.directionalLight.shadow.mapSize.set(1024, 1024);

    this.directionalLight.shadow.camera.top = 10;
    this.directionalLight.shadow.camera.bottom = 0;
    this.directionalLight.shadow.camera.right = 40;
    this.directionalLight.shadow.camera.left = -40;
    this.directionalLight.shadow.camera.far = 40;
    this.directionalLight.shadow.camera.near = -40;

    this.scene.add(this.directionalLight);

  }
}
