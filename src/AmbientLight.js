import { AmbientLight } from 'three';
import { scene } from './Scene';

const ambientLight = new AmbientLight(0xffffff, 0.7);

scene.add(ambientLight);
