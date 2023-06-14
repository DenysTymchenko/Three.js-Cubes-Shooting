import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'three';
import { scene } from '../Scene';
import { cubeParameters } from '../../CubeParameters';

export const meshes = []; // Three.js meshes will be contained here

// Scene object
const geometry = new BoxGeometry(cubeParameters.width, cubeParameters.height, cubeParameters.depth);
const material = new MeshStandardMaterial({ color: '#d13610', metalness: 0.3, roughness: 0.4, });

function generateCubesMeshes() {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < cubeParameters.towerHeight * cubeParameters.height; y += cubeParameters.height) {
      for (let z = 0; z < 3; z++) {
        // Because our boxes have height, they will be placed a little bit under the floor by default.
        // To fix that, we need to find an offset to push our cubes up by adding the offset to the y coordinate.
        const yOffset = cubeParameters.height / 2;

        const cubeMesh = new Mesh(geometry, material);
        cubeMesh.position.set(x, y + yOffset, z);
        cubeMesh.receiveShadow = true;
        cubeMesh.castShadow = true;
        meshes.push(cubeMesh);
        scene.add(cubeMesh);
      }
    }
  }
}

generateCubesMeshes();
