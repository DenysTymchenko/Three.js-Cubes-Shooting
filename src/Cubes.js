import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from 'three';
import { scene } from './Scene';

const geometry = new BoxGeometry(5, 5, 5);
const material = new MeshBasicMaterial();
const height = 5;

function generateCubes() {
  for (let y = height; y > 0; y--) {
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        const cube = new Mesh(geometry, material);
        cube.position.set(x, y, z);
        scene.add(cube);
      }
    }
  }
}

generateCubes();
