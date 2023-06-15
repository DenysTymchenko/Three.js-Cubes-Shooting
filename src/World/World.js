import Environment from './Environment.js';
import Floor from './Floor.js';
import CubesTower from './CubesTower.js';

export default class World {
  constructor() {
    this.environment = new Environment();
    this.floor = new Floor();
    this.cubesTower = new CubesTower();
  }

}
