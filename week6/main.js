
import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

const aspect = window.innerWidth / window.innerHeight;

const perspectiveCamera = new THREE.PerspectiveCamera(
    75,
    aspect,
    0.1,
    100
);

perspectiveCamera.position.set(2, 2, 10);
perspectiveCamera.lookAt(0, 0, 0);

const size = 8;
const orthographicCamera = new THREE.OrthographicCamera(
    -size * aspect,
    size * aspect,
    size,
    -size,
    0.1,
    100
);

orthographicCamera.position.set(0, 0, 10);
orthographicCamera.lookAt(0, 0, 0);

const cameras = [perspectiveCamera, orthographicCamera];
let current = 0;

console.log('active: perspective');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
directionalLight.position.set(5, 18, 4);
scene.add(directionalLight);

const depths = [0, -4, -8];
const colors = [0xa65c5c, 0x404f82, 0xed9494];

new PLYLoader().load('models/3dModel.ply', function (geometry) {
    geometry.center();

    for (let i = 0; i < depths.length; i++) {

        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: colors[i],
                roughness: 0.4
            })
        );

        mesh.scale.setScalar(0.02);
        mesh.rotation.x = Math.PI;

        mesh.position.x = (i - 1) * 2;
        mesh.position.z = depths[i];

        scene.add(mesh);
    }
});




//create a listener whenever i press space it will switch to the other camera 
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        current = (current + 1) % cameras.length;
        console.log('active: ' + (current === 0 ? 'perspective' : 'orthographic'));
    }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, cameras[current]);
}

animate();
