import './style.css'
import * as THREE from 'three'

// Main Variable
let scene, camera, renderer;

// Light Variables
let pointLight, ambientLight

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(
  60,
  innerWidth / innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 5);

ambientLight = new THREE.AmbientLight('white');
ambientLight.intensity = 0.1;
scene.add(ambientLight);

pointLight = new THREE.PointLight('white');
pointLight.intensity = 10;
pointLight.position.set(0, 3, 0);
scene.add(pointLight);


// Mesh

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 'green'});

const cube = new THREE.Mesh(geometry, material);
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