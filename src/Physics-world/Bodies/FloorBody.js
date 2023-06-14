import * as CANNON from 'cannon-es';
import { world } from '../World';

const floorBody = new CANNON.Body(
  {
    mass: 0,
    shape: new CANNON.Plane(),
  }
);
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5) 
world.addBody(floorBody);
