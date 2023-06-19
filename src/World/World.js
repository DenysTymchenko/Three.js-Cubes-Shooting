import Environment from './Environment.js';
import Floor from './Floor.js';
import CubesTower from './CubesTower.js';
import ShootingObject from './ShootingObject.js';

export default class World {
  constructor() {
    this.environment = new Environment();
    this.floor = new Floor();
    this.cubesTower = new CubesTower();
    this.shootingObject = new ShootingObject();
  }
}
