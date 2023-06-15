import * as CANNON from 'cannon-es';
import { world } from '../World';
import { cubeMaterial } from './Materials.js';
import { cubeParameters } from '../../CubeParameters';

export const bodies = []; // CANNON bodies will be contained here
const shape = new CANNON.Box(new CANNON.Vec3(
  cubeParameters.width / 2,
  cubeParameters.height / 2,
  cubeParameters.depth / 2,
));

function generateCubesBodies() {
  for (let x = 0; x < cubeParameters.width * 3; x+= cubeParameters.width) {
    for (let y = 0; y < cubeParameters.towerHeight * cubeParameters.height; y += cubeParameters.height) {
      for (let z = 0; z < cubeParameters.depth * 3; z+= cubeParameters.depth) {
        const cubeBody = new CANNON.Body({
          mass: 1,
          position: new CANNON.Vec3(x, y, z),
          shape,
          material: cubeMaterial,
        });
        bodies.push(cubeBody);
        world.addBody(cubeBody);
      }
    }
  }
}

generateCubesBodies();
