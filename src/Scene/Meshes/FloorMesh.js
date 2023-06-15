import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { scene } from '../Scene';
import { cubeParameters } from '../../CubeParameters.js';

// Three.js floor
const floorMesh = new Mesh(
  new PlaneGeometry(1000, 1000),
  new MeshStandardMaterial({
    color: '#E3E3E3',
    metalness: 0.3,
    roughness: 0.4,
  }),
)

// Setting floor position lower, so the cubes would be placed on top of it.
floorMesh.position.y = - cubeParameters.height / 2;
floorMesh.rotation.x = - Math.PI / 2;
floorMesh.receiveShadow = true;

scene.add(floorMesh);
