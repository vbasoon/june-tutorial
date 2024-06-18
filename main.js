import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

// Main Variable
let scene, camera, renderer, controls;

// Mesh Variable
let cube, ground

// Light Variables
let pointLight, ambientLight

function init() {
  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight)
  })

  scene = new THREE.Scene();

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  // Shadow enabled
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  //Camera
  camera = new THREE.PerspectiveCamera(
    60,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 6, 10);
  camera.lookAt(0, 0, 0);

  // Skybox
  const skybox = new THREE.CubeTextureLoader();
  scene.background = skybox.load([
    './assets/textures/1/blizzard_ft.jpg',
    './assets/textures/1/blizzard_bk.jpg',
    './assets/textures/1/blizzard_up.jpg',
    './assets/textures/1/blizzard_dn.jpg',
    './assets/textures/1/blizzard_rt.jpg',
    './assets/textures/1/blizzard_lf.jpg',
  ]);

  

  // Control
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 2, 0);
  controls.zoomSpeed = 1;
  controls.maxDistance = 20;
  controls.minDistance = 5;

  // Light
  ambientLight = new THREE.AmbientLight('white');
  ambientLight.intensity = 0.1;
  scene.add(ambientLight);

  pointLight = new THREE.PointLight('white');
  pointLight.intensity = 100;
  pointLight.position.set(0, 10, 0);
  pointLight.castShadow = true;
  scene.add(pointLight);


  // Objects
  ground = GetPlane(10, 10, '#e5e5e5');
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  cube = GetCube(2,2,2, 'green');
  cube.position.set(0, 3, 0);
  cube.castShadow = true;
  scene.add(cube);
  
  animate()

}


// Function of geometries
function GetCube(w,h,d,c) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color: c })
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

function GetPlane(w,d,c) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color: c })
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

// Animate Function

function animate() {
  requestAnimationFrame(animate);
  // cube.position.x += 0.01;
  // cube.position.y += 0.01;

  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);  
}

init();