import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'three';
import * as CANNON from 'cannon-es';
import { world } from '../World.js';
import { scene } from '../Scene.js';
import { cubeMaterial } from './Materials.js';
import { cubeParameters } from './CubeParameters.js';

export const bodies = []; // CANNON bodies will be contained here
export const meshes = []; // Three.js meshes will be contained here

// CANNON
const shape = new CANNON.Box(new CANNON.Vec3(
  cubeParameters.width / 2,
  cubeParameters.height / 2,
  cubeParameters.depth / 2,
));

// Three.js
const geometry = new BoxGeometry(cubeParameters.width, cubeParameters.height, cubeParameters.depth);
const material = new MeshStandardMaterial({ color: '#d13610', metalness: 0.3, roughness: 0.4, });

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

        const cubeMesh = new Mesh(geometry, material);
        cubeMesh.position.copy(cubeBody.position);
        cubeMesh.receiveShadow = true;
        cubeMesh.castShadow = true;
        meshes.push(cubeMesh);
        scene.add(cubeMesh);
      }
    }
  }
}

generateCubesBodies();
