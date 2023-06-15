import * as CANNON from 'cannon-es';
import { world } from '../World';
import { floorMaterial } from './Materials.js';
import { cubeParameters } from '../../CubeParameters.js';

const floorBody = new CANNON.Body(
  {
    mass: 0,
    shape: new CANNON.Plane(),
    material: floorMaterial,
  }
);

// Setting floor position lower, so the cubes would be placed on top of it.
floorBody.position.y = - cubeParameters.height / 2;
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)
world.addBody(floorBody);
