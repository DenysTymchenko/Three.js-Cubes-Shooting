import * as CANNON from 'cannon-es';
import { world } from '../World.js';

export const floorMaterial = new CANNON.Material('floor');
export const cubeMaterial = new CANNON.Material('cube');

const cubeFloorContactMaterial = new CANNON.ContactMaterial(
  cubeMaterial,
  floorMaterial,
  {
    friction: 0.1,
    restitution: 0.5,
  }
)

world.addContactMaterial(cubeFloorContactMaterial);
