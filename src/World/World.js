import Floor from './Floor.js';
import CubesTower from './CubesTower.js';
import ShootingObject from './ShootingObject.js';
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Constaints from './Constraints.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Starting to create meshes only after textures loading, because they will be used by them.
    this.resources.on('loaded', () => {
      this.scene.background = this.resources.items['background'];
      this.environment = new Environment(); // Lights are stored here.
      this.floor = new Floor();
      this.cubesTower = new CubesTower();
      this.shootingObject = new ShootingObject();
      this.constraints = new Constaints();
    })
  }
}
