import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(5, 6, 7)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const pointLight = new THREE.PointLight(0xffffff, 400, 0, 1.6)
const ambientLight = new THREE.AmbientLight(0xffffff, 2.3)
scene.add(pointLight, ambientLight)

const geometry = new THREE.SphereGeometry(2, 32, 24);
const material = new THREE.MeshStandardMaterial({ color: 0xb44d1a,wireframe:true })
const sun = new THREE.Mesh(geometry, material)
scene.add(sun)

const earthOrbit = new THREE.Object3D();
sun.add(earthOrbit)

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0X1E40FF, roughness: 0.9 })
)
earth.position.x = 6
earthOrbit.add(earth)

const control = new OrbitControls(camera, renderer.domElement);
const moonOrbit = new THREE.Object3D();
earth.add(moonOrbit);

const moon= new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xece1e1, roughness: 0.9 })
)
moon.position.x = 1.6
moonOrbit.add(moon)

// Second planet: Mars
const marsOrbit = new THREE.Object3D();
sun.add(marsOrbit)

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xc1440e, roughness: 0.9 })
)
mars.position.x = 10
marsOrbit.add(mars)

// Mars moon: Phobos
const phobosOrbit = new THREE.Object3D();
mars.add(phobosOrbit)

const phobos = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0x8b7d6b, roughness: 0.9 })
)
phobos.position.x = 1.1
phobosOrbit.add(phobos)


const saturnOrbit = new THREE.Object3D();
sun.add(saturnOrbit)

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xe3c27a, roughness: 0.9 })
)
saturn.position.x = 17
saturn.rotation.z = 0.4
saturnOrbit.add(saturn)


const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.6, 2.4, 64),
    new THREE.MeshStandardMaterial({ color: 0xd8c48a, side: THREE.DoubleSide, roughness: 0.9 })
)
ring.rotation.x = Math.PI / 2
saturn.add(ring)

function animate() {
    requestAnimationFrame(animate)
    control.update()
    earthOrbit.rotation.y += 0.005
    moonOrbit.rotation.y += 0.04
    marsOrbit.rotation.y += 0.006
    phobosOrbit.rotation.y += 0.008
    
    saturnOrbit.rotation.y += 0.004
    saturn.rotation.y += 0.03
  
   sun.rotation.y += 0.006
    renderer.render(scene, camera)
}
animate()