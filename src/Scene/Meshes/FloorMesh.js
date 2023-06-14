import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { scene } from '../Scene';

// Three.js floor
const floorMesh = new Mesh(
  new PlaneGeometry(1000, 1000),
  new MeshStandardMaterial({
    color: '#E3E3E3',
    metalness: 0.3,
    roughness: 0.4,
  }),
)
floorMesh.rotation.x = - Math.PI / 2;
floorMesh.receiveShadow = true;

scene.add(floorMesh);
