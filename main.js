import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

// Main Variable
let scene, camera, renderer, controls;

// Mesh Variable
// let cube, ground
let board, cubeGeo, lightMaterial, darkMaterial;

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
  controls.target.set(4.5, 0, 4.5);
  controls.enableDamping = true;
  controls.zoomSpeed = 5;
  controls.maxDistance = 50;
  controls.minDistance = 3;

  // Light
  ambientLight = new THREE.AmbientLight('white');
  ambientLight.intensity = 0.1;
  scene.add(ambientLight);

  // pointLight = new THREE.PointLight('white');
  // pointLight.intensity = 100;
  // pointLight.position.set(0, 10, 0);
  // pointLight.castShadow = true;
  // scene.add(pointLight);


  // Objects
  // ground = GetPlane(10, 10, '#e5e5e5');
  // ground.rotation.x = -Math.PI / 2;
  // ground.receiveShadow = true;
  // scene.add(ground);

  // cube = GetCube(2,2,2, 'green');
  // cube.position.set(0, 3, 0);
  // cube.castShadow = true;
  // scene.add(cube);

  cubeGeo = new THREE.BoxGeometry(1, 0.1, 1);
  lightMaterial = new THREE.MeshBasicMaterial({ color: 0xc5c5c5 });
  darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  board = new THREE.Group();
  let cube;
  for (let x = 0; x < 8; x++) {
    for (let z = 0; z < 8; z++) {
      if (z % 2 == false) {
        
        cube = new THREE.Mesh(cubeGeo, x % 2 == false ? lightMaterial : darkMaterial);
      } else {
        cube = new THREE.Mesh(cubeGeo, x % 2 == false ? darkMaterial : lightMaterial);
      }
      cube.position.set(x, 0, z);
      board.add(cube);
      }
  }
  
  scene.add(board)
  
  animate()

}


// // Function of geometries
// function GetCube(w,h,d,c) {
//   const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(w, h, d),
//     new THREE.MeshStandardMaterial({ color: c })
//   );
//   mesh.castShadow = true;
//   mesh.receiveShadow = true;

//   return mesh;
// }

// function GetPlane(w,d,c) {
//   const mesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(w, d),
//     new THREE.MeshStandardMaterial({ color: c })
//   );
//   mesh.castShadow = true;
//   mesh.receiveShadow = true;

//   return mesh;
// }

// Animate Function

function animate() {
  requestAnimationFrame(animate);
  // cube.position.x += 0.01;
  // cube.position.y += 0.01;

  controls.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);  
}

init();