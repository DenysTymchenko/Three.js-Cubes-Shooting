import { Clock } from 'three'
import { world } from './World'
import { meshes } from '../Scene/Meshes/CubesMeshes'
import { bodies } from './Bodies/CubesBodies'

const clock = new Clock()
let oldElapsedTime = 0

function doPhysics() {
  window.requestAnimationFrame(doPhysics);

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  // Update physics
  world.step(1 / 60, deltaTime, 3)

  for (let i = 0; i < bodies.length; i++) {
    meshes[i].position.copy(bodies[i].position);
    meshes[i].quaternion.copy(bodies[i].quaternion);
  }
}

doPhysics();
