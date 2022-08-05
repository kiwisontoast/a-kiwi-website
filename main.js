import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene,camera);

const map = new THREE.TextureLoader().load( 'github.png' );
const spritematerial = new THREE.SpriteMaterial( { map: map } );
const github = new THREE.Sprite( spritematerial );
github.scale.set(15,15,1)
map.userData = { URL: "http://github.com/kiwisontoast"};
scene.add( github );

github.position.z=-3;
github.position.setX(20);

const geometry = new THREE.TorusGeometry(10,3,16,300)
const material = new THREE.MeshStandardMaterial( {color: 0x7180AC, wireframe : true});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)
torus.position.z = -3;
torus.position.setX(20);

const geometry2 = new THREE.TorusGeometry(10,3,16,300)
const material2 = new THREE.MeshStandardMaterial( {color: 0x7180AC, wireframe : true});
const torus2 = new THREE.Mesh(geometry2,material2);

scene.add(torus2)
torus2.position.z = 3;
torus2.position.setX(-15);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,50,0)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)

const controls = new OrbitControls(camera,renderer.domElement);

const bgTexture = new THREE.TextureLoader().load('gradient.png');
scene.background = bgTexture;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  // github.rotation.x+=.05;
  // github.rotation.y+=.075;
  // github.rotation.z+=.05;

  torus.rotation.y+=.075;
  torus.rotation.z+=.01;

  torus2.rotation.y+=.075;
  torus2.rotation.z+=.01;

  camera.rotation.x = t*-.01;
  camera.rotation.y = t*-.0002;
  camera.rotation.z = t*-.0002;
}
document.body.onscroll=moveCamera

function animate(){
  requestAnimationFrame(animate);

torus.rotation.x += .01;
torus.rotation.y += .005;
torus.rotation.z += .01;

torus2.rotation.x += .01;
torus2.rotation.y += .005;
torus2.rotation.z += .01;

  renderer.render(scene,camera);
}

animate();