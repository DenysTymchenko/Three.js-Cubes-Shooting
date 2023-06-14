import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { scene } from './Scene';

const floor = new Mesh(
  new PlaneGeometry(1000, 1000),
  new MeshStandardMaterial({
    color: '#E3E3E3',
    metalness: 0.3,
    roughness: 0.4,
  }),
)
floor.rotation.x = - Math.PI / 2;
floor.receiveShadow = true;

scene.add(floor);
