import { DirectionalLight, PerspectiveCamera, CameraHelper, DirectionalLightHelper, Vector3 } from 'three';
import { scene } from './Scene';

const directionalLight = new DirectionalLight(0xffffff, 0.5);
directionalLight.castShadow = true;
directionalLight.position.set(15, 50, 0);
directionalLight.target.position.set(0, 0, 0);

directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = 0;
directionalLight.shadow.camera.far = 40;
directionalLight.shadow.camera.near = -40;
directionalLight.shadow.camera.right = 40;
directionalLight.shadow.camera.left = -40;

scene.add(directionalLight, helper, cameraHelper);
