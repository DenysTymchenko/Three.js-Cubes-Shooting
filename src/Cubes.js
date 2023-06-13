import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'three';
import { scene } from './Scene';

const geometry = new BoxGeometry(5, 5, 5);
const material = new MeshStandardMaterial({ metalness: 0.3, roughness: 0.4, });
const height = 5;

function generateCubes() {
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        // Because our boxes got height, it will be placed a little bit under the floor by default.
        // To fix that we need to find an offset to push our cubes up, by adding offset to y coordinate.
        const yOffset = geometry.parameters.height / 2;
        
        const cube = new Mesh(geometry, material);
        cube.position.set(x,  y + yOffset, z);
        cube.receiveShadow = true;
        cube.castShadow = true;
        scene.add(cube);
      }
    }
  }
}

generateCubes();
