<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasElement = ref(null)

let disposed = false
let animationFrame = null
let renderer
let scene
let camera
let object
let particles
let objectGeometry
let objectMaterial
let particleGeometry
let particleMaterial
let particleTexture
let resizeHandler
let resizeObserver
let pointerMoveHandler
let pointerOutHandler
let motionPreference

const pointer = { x: 0, y: 0 }
const lerpSpeed = 0.05

function resizeCanvas() {
  if (!renderer || !camera) return

  const width = canvasElement.value?.clientWidth || window.innerWidth
  const height = canvasElement.value?.clientHeight || window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setSize(width, height, false)
}

function updatePointer(event) {
  const bounds = canvasElement.value?.getBoundingClientRect()
  if (!bounds) return
  pointer.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1))
  pointer.y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1))
}

function resetPointer(event) {
  if (event.relatedTarget === null) {
    pointer.x = 0
    pointer.y = 0
  }
}

function disposeScene() {
  if (animationFrame !== null) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  resizeObserver?.disconnect()
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (pointerMoveHandler) window.removeEventListener('pointermove', pointerMoveHandler)
  if (pointerOutHandler) window.removeEventListener('pointerout', pointerOutHandler)
  if (motionPreference) motionPreference.removeEventListener('change', handleMotionChange)

  scene?.clear()
  objectGeometry?.dispose()
  objectMaterial?.dispose()
  particleGeometry?.dispose()
  particleMaterial?.dispose()
  particleTexture?.dispose()
  renderer?.dispose()

  renderer = undefined
  scene = undefined
  camera = undefined
  object = undefined
  particles = undefined
  objectGeometry = undefined
  objectMaterial = undefined
  particleGeometry = undefined
  particleMaterial = undefined
  particleTexture = undefined
}

function renderStaticFrame() {
  if (!renderer || !scene || !camera) return
  renderer.render(scene, camera)
}

function handleMotionChange() {
  if (motionPreference?.matches) {
    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
    if (object) {
      object.rotation.set(0, 0, 0)
      object.position.y = 0
    }
    if (particles) particles.rotation.set(0, 0, 0)
    if (camera) camera.rotation.set(0, 0, 0)
    renderStaticFrame()
  } else if (animationFrame === null) {
    animationFrame = window.requestAnimationFrame(animate)
  }
}

let previousTime = 0

function animate(time) {
  if (disposed || !renderer || !scene || !camera) return

  const delta = previousTime === 0 ? 0 : Math.min((time - previousTime) / 1000, 0.05)
  previousTime = time
  const elapsed = time / 1000

  if (object) {
    object.rotation.x += delta * 0.11
    object.rotation.y += delta * 0.16
    object.position.y = Math.sin(elapsed * 0.55) * 0.16
  }
  if (particles) particles.rotation.y += delta * 0.018

  camera.rotation.x += pointer.y * 0.08 * lerpSpeed - camera.rotation.x * lerpSpeed
  camera.rotation.y += pointer.x * 0.12 * lerpSpeed - camera.rotation.y * lerpSpeed

  renderer.render(scene, camera)
  animationFrame = window.requestAnimationFrame(animate)
}

async function initializeCanvas() {
  const THREE = await import('three')
  if (disposed || !canvasElement.value) return

  try {
    scene = new THREE.Scene()
    const width = canvasElement.value.clientWidth || window.innerWidth
    const height = canvasElement.value.clientHeight || window.innerHeight
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 9

    renderer = new THREE.WebGLRenderer({
      canvas: canvasElement.value,
      alpha: true,
      antialias: window.devicePixelRatio <= 1,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(width, height, false)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.setAttribute('role', 'presentation')

    scene.add(new THREE.AmbientLight(0xffffff, 0.35))
    const keyLight = new THREE.PointLight(0x84cc16, 22, 20)
    keyLight.position.set(3, 2, 5)
    scene.add(keyLight)

    objectGeometry = new THREE.IcosahedronGeometry(1.65, 1)
    objectMaterial = new THREE.MeshStandardMaterial({
      color: 0x84cc16,
      emissive: 0x84cc16,
      emissiveIntensity: 0.65,
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.8,
      wireframe: true,
    })
    object = new THREE.Mesh(objectGeometry, objectMaterial)
    scene.add(object)

    const positions = new Float32Array(500 * 3)
    for (let index = 0; index < 500; index += 1) {
      const radius = 3.2 + Math.random() * 5.8
      const theta = Math.random() * Math.PI * 2
      const vertical = Math.random() * 2 - 1
      const horizontal = Math.sqrt(1 - vertical * vertical)
      positions[index * 3] = radius * horizontal * Math.cos(theta)
      positions[index * 3 + 1] = radius * vertical
      positions[index * 3 + 2] = radius * horizontal * Math.sin(theta)
    }

    particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const textureCanvas = document.createElement('canvas')
    textureCanvas.width = 64
    textureCanvas.height = 64
    const context = textureCanvas.getContext('2d')
    if (!context) throw new Error('Could not create the particle texture canvas context.')
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.18, 'rgba(210, 255, 120, 0.9)')
    gradient.addColorStop(1, 'rgba(132, 204, 22, 0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, 64, 64)

    particleTexture = new THREE.CanvasTexture(textureCanvas)
    particleGeometry.computeBoundingSphere()
    particleMaterial = new THREE.PointsMaterial({
      color: 0x84cc16,
      map: particleTexture,
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    pointerMoveHandler = updatePointer
    pointerOutHandler = resetPointer
    resizeHandler = resizeCanvas
    window.addEventListener('resize', resizeHandler, { passive: true })
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resizeCanvas)
      resizeObserver.observe(canvasElement.value)
    }
    window.addEventListener('pointermove', pointerMoveHandler, { passive: true })
    window.addEventListener('pointerout', pointerOutHandler, { passive: true })

    motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionPreference.addEventListener('change', handleMotionChange)
    renderStaticFrame()
    if (!motionPreference.matches) {
      animationFrame = window.requestAnimationFrame(animate)
    }
  } catch (error) {
    disposeScene()
    console.error('Failed to initialize the 3D hero canvas.', error)
  }
}

onMounted(initializeCanvas)
onBeforeUnmount(() => {
  disposed = true
  disposeScene()
})
</script>

<template>
  <canvas
    ref="canvasElement"
    class="hero-canvas fixed inset-0 -z-10 pointer-events-none"
    aria-hidden="true"
  ></canvas>
</template>
