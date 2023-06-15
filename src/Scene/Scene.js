import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  PCFSoftShadowMap,
  Fog,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
export const scene = new Scene();
scene.fog = new Fog(0x000000, 0, 40);

// Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
//camera.position.x = 25;
camera.position.y = 1;
camera.position.z = -15;
scene.add(camera);

// Renderer
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Updates scene on browser window resizing, so it's always occupy whole viewport
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

// Used for proper work of controls
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();