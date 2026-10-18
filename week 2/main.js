import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
const scene = new THREE.Scene();
const camera= new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5,6,7);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// n*p=d the plane equation
const n = new THREE.Vector3(0, 1, 0);
const p = new THREE.Vector3(0, 0, 0);
const d = n.dot(p);

const geometry = new THREE.PlaneGeometry(12, 12);
const material = new THREE.MeshBasicMaterial({ color: 0x9c6d6d});
const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = -Math.PI / 2; //rotate for 90 degrees so we can bring it to a horizontal 
floor.updateMatrixWorld(true); //update the world matrix so we can use it for raycasting
const grid=new THREE.GridHelper(12, 12);
scene.add(floor, grid);

//ray
const rayOrigin = new THREE.Vector3(2, 5, -1);
const rayDirection = new THREE.Vector3(-1, -1, 1).normalize();
const t=(d - n.dot(rayOrigin)) / n.dot(rayDirection); 

const hit=rayOrigin.clone().addScaledVector(rayDirection, t);

const ray=new THREE.Line(new THREE.BufferGeometry().setFromPoints([rayOrigin, hit]), new THREE.MeshBasicMaterial({ color: 0xff0000 }));

scene.add(ray);

const dot= new THREE.Mesh(new THREE.SphereGeometry(0.18), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
dot.position.copy(hit);
scene.add(dot);

//compare with raycaster
const raycaster = new THREE.Raycaster(rayOrigin, rayDirection).intersectObject(floor)[0]; //we use [0] because it returns an array of intersections, we only want the first one
console.log("our formula", hit);
console.log("raycaster", raycaster.point);


const control= new OrbitControls(camera, renderer.domElement);
function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
}
animate();

