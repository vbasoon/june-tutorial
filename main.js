import './style.css'
import * as THREE from 'three'

// Main Variable
let scene, camera, renderer;

// Light Variables
let pointLight, ambientLight

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
// Shadow enabled
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(
  60,
  innerWidth / innerHeight,
  0.1,
  1000
);

camera.position.set(0, 6, 10);
camera.lookAt(0, 0, 0);

ambientLight = new THREE.AmbientLight('white');
ambientLight.intensity = 0.1;
scene.add(ambientLight);

pointLight = new THREE.PointLight('white');
pointLight.intensity = 100;
pointLight.position.set(0, 10, 0);
pointLight.castShadow = true;
scene.add(pointLight);


// Mesh
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 'green' });

// Ground
const planeGeometry = new THREE.PlaneGeometry(10, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
const ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.set(0, 2, 0);
cube.castShadow = true;
scene.add(cube);


function animate() {
  requestAnimationFrame(animate);
  // cube.position.x += 0.01;
  // cube.position.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);  
}

animate();