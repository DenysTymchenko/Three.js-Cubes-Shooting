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
  for (let x = 0; x < cubeParameters.width * 3; x+= cubeParameters.width) {
    for (let y = 0; y < cubeParameters.towerHeight * cubeParameters.height; y += cubeParameters.height) {
      for (let z = 0; z < cubeParameters.depth * 3; z+= cubeParameters.depth) {
        const cubeMesh = new Mesh(geometry, material);
        cubeMesh.position.set(x, y, z);
        cubeMesh.receiveShadow = true;
        cubeMesh.castShadow = true;
        meshes.push(cubeMesh);
        scene.add(cubeMesh);
      }
    }
  }
}

generateCubesMeshes();
