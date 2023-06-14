import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'three';
import * as CANNON from 'cannon-es';
import { scene } from './Scene';

// Those arrays will be used to combine meshes' positions with bodies' positions
const bodies = []; // CANNON bodies will be contained here
const meshes = []; // Three.js meshes will be contained here

// Cube parameters
const cubeWidth = 1;
const cubeHeight = 1;
const cubeDepth = 1;

// Physics world
const world = new CANNON.World();
const shape = new CANNON.Box(new CANNON.Vec3(cubeWidth, cubeHeight, cubeDepth));

// Scene object
const geometry = new BoxGeometry(cubeWidth, cubeHeight, cubeDepth);
const material = new MeshStandardMaterial({ color: '#d13610', metalness: 0.3, roughness: 0.4, });
const height = 3;

function generateCubes() {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < height * cubeHeight; y += cubeHeight) {
      for (let z = 0; z < 3; z++) {
        // Because our boxes have height, they will be placed a little bit under the floor by default.
        // To fix that, we need to find an offset to push our cubes up by adding the offset to the y coordinate.
        const yOffset = cubeHeight / 2;

        const cubeBody = new CANNON.Body({
          mass: 1,
          position: new CANNON.Vec3(x, y + yOffset, z),
          shape,
        });
        bodies.push(cubeBody);
        world.addBody(cubeBody);

        const cubeMesh = new Mesh(geometry, material);
        cubeMesh.position.set(x, y + yOffset, z);
        cubeMesh.receiveShadow = true;
        cubeMesh.castShadow = true;
        console.log(cubeMesh.position);
        meshes.push(cubeMesh);
        scene.add(cubeMesh);
      }
    }
  }
}

generateCubes();
