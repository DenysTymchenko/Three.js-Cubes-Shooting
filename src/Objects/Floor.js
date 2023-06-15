import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import * as CANNON from 'cannon-es';
import { scene } from '../Scene.js';
import { world } from '../World.js';
import { cubeParameters } from './CubeParameters.js';
import { floorMaterial } from './Materials.js';

// Floor CANNON
const floorBody = new CANNON.Body(
  {
    mass: 0,
    shape: new CANNON.Plane(),
    material: floorMaterial,
  }
);

// Setting floor position lower, so the cubes would be placed on top of it.
floorBody.position.y = - cubeParameters.height / 2;
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)
world.addBody(floorBody);


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
