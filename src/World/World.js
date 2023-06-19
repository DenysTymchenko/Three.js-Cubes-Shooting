import Floor from './Floor.js';
import CubesTower from './CubesTower.js';
import ShootingObject from './ShootingObject.js';
import Experience from '../Experience.js';
import Environment from './Environment.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.resources.on('loaded', () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.cubesTower = new CubesTower();
      this.shootingObject = new ShootingObject();
    })
  }
}
