import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({ color: 0xE8431C });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const coneGeometry = new THREE.ConeGeometry(1, 1.5, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x2ecc71, wireframe: true });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(3, 0, 0);
scene.add(cone);




const light = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(light);
const dirlight = new THREE.DirectionalLight(0xffffff, 2.5);
scene.add(dirlight);

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;

    cone.rotation.x += 0.001;
    cone.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);

}

animate();





