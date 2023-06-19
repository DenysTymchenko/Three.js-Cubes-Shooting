import * as CANNON from 'cannon-es';

export default class Materials {
  constructor() {
    this.floorMaterial = new CANNON.Material('floor');
    this.cubeMaterial = new CANNON.Material('cube');
    this.shootingObjectMaterial = new CANNON.Material('shootingObject');
  }

}
