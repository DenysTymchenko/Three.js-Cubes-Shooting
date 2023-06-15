import * as CANNON from 'cannon-es';
import { world } from '../World';
import { cubeParameters } from '../../CubeParameters';

export const bodies = []; // CANNON bodies will be contained here
const shape = new CANNON.Box(new CANNON.Vec3(cubeParameters.width / 2, cubeParameters.height / 2, cubeParameters.depth / 2));

function generateCubesBodies() {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < cubeParameters.towerHeight * cubeParameters.height; y += cubeParameters.height) {
      for (let z = 0; z < 3; z++) {
        const cubeBody = new CANNON.Body({
          mass: 1,
          position: new CANNON.Vec3(x, y + cubeParameters.yOffset, z),
          shape,
        });
        bodies.push(cubeBody);
        world.addBody(cubeBody);
      }
    }
  }
}

generateCubesBodies();
