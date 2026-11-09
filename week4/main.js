
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xFFFFFF)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(8, 6, 12)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide
    })
)

ground.rotation.x = -Math.PI / 2

const grid = new THREE.GridHelper(20, 20)
scene.add(ground, grid)

const ambient = new THREE.AmbientLight(0xFFFFFF, 0.5)
const directional = new THREE.DirectionalLight(0xFFFFFF, 2)

directional.position.set(5, 10, 7)

scene.add(ambient, directional)

const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32)
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 })
const base = new THREE.Mesh(baseGeometry, baseMaterial)

scene.add(base)

const shoulder = new THREE.Group()
shoulder.position.y = 0.5
base.add(shoulder)

const shoulderJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    baseMaterial
)

shoulder.add(shoulderJoint)

const armMaterial = new THREE.MeshStandardMaterial({ color: 0x3399ff })

const upperArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 3, 0.7),
    armMaterial
)

upperArm.position.y = 1.2
shoulder.add(upperArm)

const elbow = new THREE.Group()
elbow.position.y = 2.6
shoulder.add(elbow)

const elbowJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 32),
    baseMaterial
)

elbow.add(elbowJoint)

const foreArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 3, 0.6),
    armMaterial
)

foreArm.position.y = 1.25
elbow.add(foreArm)

const wrist = new THREE.Group()
wrist.position.y = 2.8
elbow.add(wrist)

const wristJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    baseMaterial
)

wrist.add(wristJoint)

const palmMaterial = new THREE.MeshStandardMaterial({
    color: 0xffaa55
})

const palm = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.5, 0.5),
    palmMaterial
)

palm.position.y = 1
wrist.add(palm)

const fingerMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc88,
    roughness: 0.65
})

const jointMaterial = new THREE.MeshStandardMaterial({
    color: 0xe6a66e,
    roughness: 0.7
})

const fingers = []

function createFinger(parent, x, y, length, angle = 0) {
    const fingerJoint = new THREE.Group()

    fingerJoint.position.set(x, y, 0)
    fingerJoint.rotation.z = angle
    parent.add(fingerJoint)

    const firstLength = length * 0.55

    const firstSegment = new THREE.Mesh(
        new THREE.BoxGeometry(0.23, firstLength, 0.23),
        fingerMaterial
    )

    firstSegment.position.y = firstLength / 2
    fingerJoint.add(firstSegment)

    const firstKnuckle = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 16, 16),
        jointMaterial
    )

    firstKnuckle.position.y = firstLength
    fingerJoint.add(firstKnuckle)

    const secondJoint = new THREE.Group()
    secondJoint.position.y = firstLength
    fingerJoint.add(secondJoint)

    const secondLength = length * 0.45

    const secondSegment = new THREE.Mesh(
        new THREE.BoxGeometry(0.21, secondLength, 0.21),
        fingerMaterial
    )

    secondSegment.position.y = secondLength / 2
    secondJoint.add(secondSegment)

    const fingertip = new THREE.Mesh(
        new THREE.SphereGeometry(0.115, 16, 16),
        fingerMaterial
    )

    fingertip.position.y = secondLength
    secondJoint.add(fingertip)

    fingers.push({
        base: fingerJoint,
        tip: secondJoint
    })

    return fingerJoint
}

createFinger(palm, -0.62, 0.72, 1.15, -0.04)
createFinger(palm, -0.21, 0.72, 1.35, 0.01)
createFinger(palm, 0.21, 0.72, 1.30, 0.02)
createFinger(palm, 0.62, 0.72, 1.05, 0.06)

const thumb = new THREE.Group()

thumb.position.set(-0.88, 0.18, 0)
thumb.rotation.z = THREE.MathUtils.degToRad(48)

palm.add(thumb)

const thumbFirstLength = 0.65

const thumbFirst = new THREE.Mesh(
    new THREE.BoxGeometry(0.29, thumbFirstLength, 0.25),
    fingerMaterial
)

thumbFirst.position.y = thumbFirstLength / 2
thumb.add(thumbFirst)

const thumbKnuckle = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 20, 20),
    jointMaterial
)

thumbKnuckle.position.y = thumbFirstLength
thumb.add(thumbKnuckle)

const thumbTipJoint = new THREE.Group()
thumbTipJoint.position.y = thumbFirstLength
thumb.add(thumbTipJoint)

const thumbSecondLength = 0.48

const thumbSecond = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, thumbSecondLength, 0.23),
    fingerMaterial
)

thumbSecond.position.y = thumbSecondLength / 2
thumbTipJoint.add(thumbSecond)

const thumbTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 20, 20),
    fingerMaterial
)

thumbTip.position.y = thumbSecondLength
thumbTipJoint.add(thumbTip)

shoulder.rotation.z = THREE.MathUtils.degToRad(-20)
elbow.rotation.z = THREE.MathUtils.degToRad(40)
wrist.rotation.z = THREE.MathUtils.degToRad(-20)

const rotationSteps = THREE.MathUtils.degToRad(5)

window.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase()

    if (key === 'q') {
        shoulder.rotation.z += rotationSteps
    }

    if (key === 'a') {
        shoulder.rotation.z -= rotationSteps
    }

    if (key === 'w') {
        elbow.rotation.z += rotationSteps
    }

    if (key === 's') {
        elbow.rotation.z -= rotationSteps
    }

    if (key === 'e') {
        wrist.rotation.z += rotationSteps
    }

    if (key === 'd') {
        wrist.rotation.z -= rotationSteps
    }
})

const orbitControl = new OrbitControls(camera, renderer.domElement)
orbitControl.enableDamping = true

function animate() {
    requestAnimationFrame(animate)
    orbitControl.update()
    renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
