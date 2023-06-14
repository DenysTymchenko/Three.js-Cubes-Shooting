import * as CANNON from 'cannon-es';
import { world } from '../World';
import { cubeParameters } from '../../CubeParameters';

export const bodies = []; // CANNON bodies will be contained here
const shape = new CANNON.Box(new CANNON.Vec3(cubeParameters.width, cubeParameters.height, cubeParameters.depth));

function generateCubesBodies() {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < cubeParameters.towerHeight * cubeParameters.height; y += cubeParameters.height) {
      for (let z = 0; z < 3; z++) {
        // Because our boxes have height, they will be placed a little bit under the floor by default.
        // To fix that, we need to find an offset to push our cubes up by adding the offset to the y coordinate.
        const yOffset = cubeParameters.height / 2;

        const cubeBody = new CANNON.Body({
          mass: 1,
          position: new CANNON.Vec3(x, y + yOffset, z),
          shape,
        });
        bodies.push(cubeBody);
        world.addBody(cubeBody);
      }
    }
  }
}

generateCubesBodies();
