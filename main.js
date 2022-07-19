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

renderer.render(scene,camera);

const map = new THREE.TextureLoader().load( 'github.png' );
const spritematerial = new THREE.SpriteMaterial( { map: map } );
const github = new THREE.Sprite( spritematerial );
github.scale.set(15,15,1)
map.userData = { URL: "http://github.com/kiwisontoast"};
scene.add( github );


const geometry = new THREE.TorusGeometry(10,3,16,300)
const material = new THREE.MeshStandardMaterial( {color: 0x7180AC, wireframe : true});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,50,0)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.gridHelper(200,50);
// scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera,renderer.domElement);

const skobeloffTexture = new THREE.TextureLoader().load('gradient.png');
scene.background = skobeloffTexture;

function animate(){
  requestAnimationFrame(animate);

torus.rotation.x += .01;
torus.rotation.y += .005;
torus.rotation.z += .01;

  renderer.render(scene,camera);
}

animate();