import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { scene } from './Scene';

const floor = new Mesh(
  new PlaneGeometry(1000, 1000),
  new MeshStandardMaterial({ color: 0x66767f }),
)
floor.rotation.x = - Math.PI / 2;

scene.add(floor);
