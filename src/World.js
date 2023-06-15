import * as CANNON from 'cannon-es';

export const world = new CANNON.World();
world.gravity.set(0, - 9.82, 0);
