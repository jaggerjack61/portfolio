import * as THREE from 'three'

import type { Destination, DestinationRequest, TravelPhase, WorldUpdate } from './destinations'

export type NeuralScene = {
  setMotion: (enabled: boolean) => void
  setOverview: (open: boolean) => void
  rotate: (dx: number, dy: number) => void
  setDestination: (request: DestinationRequest) => void
  dispose: () => void
}

export function createNeuralScene(
  host: HTMLElement,
  onFailure: () => void,
  destinations: Destination[] = [],
  onUpdate: (update: WorldUpdate) => void = () => {},
  onArrival: (request: DestinationRequest) => void = () => {},
): NeuralScene {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setClearColor(0x050a12, 0)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50)
  camera.position.z = 8.4
  const core = new THREE.Group()
  scene.add(core)
  const geometries: THREE.BufferGeometry[] = []
  const materials: THREE.Material[] = []
  const geometry = <T extends THREE.BufferGeometry>(item: T) => {
    geometries.push(item)
    return item
  }
  const material = <T extends THREE.Material>(item: T) => {
    materials.push(item)
    return item
  }
  const mobile = window.matchMedia('(max-width: 767px)')
  const cyan = new THREE.Color('#54e5ff')

  // A stable distribution keeps the composition consistent across refreshes.
  let seed = 61
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  const points: number[] = []
  for (let i = 0; i < 1600; i++) {
    const z = 2 * random() - 1
    const theta = random() * Math.PI * 2
    const radius = 1.39 + random() * 0.14
    const r = Math.sqrt(1 - z * z)
    points.push(radius * r * Math.cos(theta), radius * z, radius * r * Math.sin(theta))
  }
  const pointGeometry = geometry(new THREE.BufferGeometry())
  pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  const pointMaterial = material(
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { pixelRatio: { value: 1 }, color: { value: cyan } },
      vertexShader: `uniform float pixelRatio; varying float vDepth;
      void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); vDepth = smoothstep(-10.0, -5.0, p.z);
      gl_PointSize = clamp(24.0 / -p.z, 1.0, 4.0) * pixelRatio; gl_Position = projectionMatrix * p; }`,
      fragmentShader: `uniform vec3 color; varying float vDepth;
      void main() { float d = length(gl_PointCoord - 0.5); if(d > 0.5) discard;
      gl_FragColor = vec4(mix(color, vec3(0.86, 1.0, 1.0), vDepth * 0.55), (1.0 - smoothstep(0.1, 0.5, d)) * (0.25 + vDepth * 0.7)); }`,
    }),
  )
  core.add(new THREE.Points(pointGeometry, pointMaterial))

  const sphere = new THREE.Mesh(
    geometry(new THREE.SphereGeometry(1.4, 48, 32)),
    material(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `varying vec3 vNormal; varying vec3 vView;
      void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-p.xyz); gl_Position = projectionMatrix * p; }`,
        fragmentShader: `varying vec3 vNormal; varying vec3 vView;
      void main() { float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.0);
      gl_FragColor = vec4(0.17, 0.65, 0.8, rim * 0.65 + 0.022); }`,
      }),
    ),
  )
  core.add(sphere)

  const glow = new THREE.Mesh(
    geometry(new THREE.PlaneGeometry(7, 7)),
    material(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `varying vec2 vUv; void main() { float d = length(vUv - 0.5);
        float halo = exp(-d * d * 24.0) * 0.11;
        gl_FragColor = vec4(0.1, 0.7, 0.86, halo * smoothstep(0.5, 0.25, d)); }`,
      }),
    ),
  )
  glow.position.z = -1.8
  scene.add(glow)

  const wireMaterial = material(
    new THREE.LineBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
  // Latitude and longitude lines give the globe a precise, engineered structure.
  for (let latitude = -4; latitude <= 4; latitude++) {
    const phi = (latitude * Math.PI) / 12
    const path = Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2
      return new THREE.Vector3(
        1.46 * Math.cos(phi) * Math.cos(a),
        1.46 * Math.sin(phi),
        1.46 * Math.cos(phi) * Math.sin(a),
      )
    })
    core.add(new THREE.Line(geometry(new THREE.BufferGeometry().setFromPoints(path)), wireMaterial))
  }
  for (let longitude = 0; longitude < 12; longitude++) {
    const theta = (longitude / 12) * Math.PI
    const path = Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2
      return new THREE.Vector3(
        1.46 * Math.cos(a) * Math.cos(theta),
        1.46 * Math.sin(a),
        1.46 * Math.cos(a) * Math.sin(theta),
      )
    })
    core.add(new THREE.Line(geometry(new THREE.BufferGeometry().setFromPoints(path)), wireMaterial))
  }

  const connections: number[] = []
  for (let i = 0; i < 110; i++) {
    const a = new THREE.Vector3().fromArray(points, i * 3)
    const b = new THREE.Vector3().fromArray(points, (i + 1) * 3)
    if (a.distanceTo(b) < 1.1) connections.push(...a.toArray(), ...b.toArray())
  }
  const connectionGeometry = geometry(new THREE.BufferGeometry())
  connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3))
  core.add(
    new THREE.LineSegments(
      connectionGeometry,
      material(new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.3 })),
    ),
  )

  const orbits = new THREE.Group()
  scene.add(orbits)
  for (let index = 0; index < 4; index++) {
    const orbit = new THREE.Group()
    const radius = 1.85 + index * 0.24
    const path = Array.from(
      { length: 193 },
      (_, i) =>
        new THREE.Vector3(
          Math.cos((i / 192) * Math.PI * 2) * radius,
          Math.sin((i / 192) * Math.PI * 2) * radius,
          0,
        ),
    )
    const ringGeometry = geometry(new THREE.BufferGeometry().setFromPoints(path))
    const ring = new THREE.Line(
      ringGeometry,
      material(
        new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: index === 0 ? 0.5 : 0.22 }),
      ),
    )
    orbit.add(ring)
    const arc = new THREE.Line(
      geometry(new THREE.BufferGeometry().setFromPoints(path.slice(12 + index * 15, 35 + index * 15))),
      material(new THREE.LineBasicMaterial({ color: 0xb8f7ff, transparent: true, opacity: 0.9 })),
    )
    orbit.add(arc)
    const ticks: number[] = []
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2
      const length = i % 6 === 0 ? 0.08 : 0.03
      ticks.push(
        Math.cos(a) * radius,
        Math.sin(a) * radius,
        0,
        Math.cos(a) * (radius + length),
        Math.sin(a) * (radius + length),
        0,
      )
    }
    const ticksGeometry = geometry(new THREE.BufferGeometry())
    ticksGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ticks, 3))
    orbit.add(
      new THREE.LineSegments(
        ticksGeometry,
        material(new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.45 })),
      ),
    )
    orbit.rotation.set(index === 0 ? 0.3 : index === 1 ? 1.08 : 0.6, index === 2 ? 0.95 : 0.12, index * 0.45)
    orbits.add(orbit)
  }
  const ambientPoints: number[] = []
  for (let i = 0; i < 160; i++)
    ambientPoints.push((random() - 0.5) * 7, (random() - 0.5) * 6, (random() - 0.5) * 3 - 1)
  const ambientGeometry = geometry(new THREE.BufferGeometry())
  ambientGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ambientPoints, 3))
  const ambient = new THREE.Points(
    ambientGeometry,
    material(
      new THREE.PointsMaterial({
        color: cyan,
        size: 0.016,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      }),
    ),
  )
  scene.add(ambient)

  const dots = destinations.map((destination) => {
    const dot = new THREE.Mesh(
      geometry(new THREE.SphereGeometry(1, 16, 12)),
      material(new THREE.MeshBasicMaterial({ color: cyan })),
    )
    dot.position.fromArray(destination.position).multiplyScalar(1.53)
    core.add(dot)
    return dot
  })
  let request: DestinationRequest | undefined
  let phase: TravelPhase = 'focused'
  let overview = false
  const overviewFov = 40
  const focusedFov = 18
  let elapsed = 0
  let enabled = false
  let visible = true
  let failed = false
  let disposed = false
  let lastTime = 0
  let running = false
  let focusDistance = 5
  let retreatDistance = 10
  let distance = focusDistance
  let fromDistance = distance
  let framing = 1
  let fromFraming = framing
  const fromRotation = new THREE.Quaternion()
  const targetRotation = new THREE.Quaternion()
  const focusNormal = new THREE.Vector3()
  const framingNormal = new THREE.Vector3()
  // Each arrival looks at a different region, rather than always the globe's center.
  const focusRegions = [
    [-0.5, 0.5], [0, -0.6], [0.55, 0.25], [-0.55, -0.3],
    [0.2, 0.6],
  ]
  const projected = new THREE.Vector3()
  const overviewTurnMs = 60_000
  const worldUp = new THREE.Vector3(0, 1, 0)
  const overviewRotation = new THREE.Quaternion()
  const duration = { retreat: 380, rotate: 650, approach: 900 }
  const ease = (t: number) => t * t * (3 - 2 * t)

  function begin(next: TravelPhase) {
    phase = next
    if (next === 'rotate' || next === 'focused') framingNormal.copy(focusNormal)
    elapsed = 0
    fromDistance = distance
    fromFraming = framing
    fromRotation.copy(core.quaternion)
  }
  function settle() {
    core.quaternion.copy(targetRotation)
    distance = focusDistance
    framing = 1
    begin('focused')
    draw()
    if (request && !failed) onArrival({ ...request })
  }
  function settleOverview() {
    distance = retreatDistance
    framing = 0
    begin('overview')
    draw()
  }
  function setOverview(open: boolean) {
    if (disposed || failed || overview === open) return
    overview = open
    if (open) {
      if (enabled) begin('retreat')
      else settleOverview()
    } else if (!enabled) settle()
    else if (phase !== 'retreat') begin('rotate')
    draw()
  }
  function rotate(dx: number, dy: number) {
    if (!overview || disposed || failed) return
    if (phase !== 'overview') settleOverview()
    const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(dy * 0.006, dx * 0.006, 0, 'YXZ'))
    core.quaternion.premultiply(rotation).normalize()
    draw()
  }
  function setDestination(next: DestinationRequest) {
    if (disposed || failed) return
    const index = destinations.findIndex((item) => item.id === next.id)
    if (index < 0) return
    const same = request?.id === next.id
    const initial = !request
    request = { ...next }
    const [focusX, focusY] = focusRegions[index % focusRegions.length]
    focusNormal.set(focusX, focusY, Math.sqrt(1 - focusX * focusX - focusY * focusY))
    targetRotation.setFromUnitVectors(new THREE.Vector3().fromArray(destinations[index].position), focusNormal)
    dots.forEach((dot, i) => {
      dot.material.color.set(i === index ? 0xffffff : cyan)
    })
    if (overview) {
      if (!enabled) settleOverview()
    } else if (initial || !enabled) settle()
    else if (same && phase === 'focused') settle()
    else if (!same) {
      if (phase === 'rotate') begin('rotate')
      else if (phase !== 'retreat') begin('retreat')
    }
    draw()
  }
  function draw() {
    if (disposed || failed) return
    camera.fov = THREE.MathUtils.lerp(overviewFov, focusedFov, framing)
    camera.updateProjectionMatrix()
    camera.position.set(0, 0, distance)
    camera.lookAt(0, 0, 0)
    // Off-axis framing keeps the front destination directly above the HTML panel.
    const stage = host.closest<HTMLElement>('.portfolio-stage')
    const anchor = stage ? parseFloat(getComputedStyle(stage).paddingTop) - 28 : host.clientHeight * 0.3
    const anchorX = host.clientWidth * 0.72
    const ndcY = 1 - (2 * anchor) / Math.max(1, host.clientHeight)
    const projectedDepth = distance - framingNormal.z * 1.53
    const projectionScale = 1.53 / (projectedDepth * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))
    const regionX = framingNormal.x * projectionScale / camera.aspect
    const regionY = framingNormal.y * projectionScale
    camera.setViewOffset(host.clientWidth, host.clientHeight,
      framing * (regionX + 1 - 2 * anchorX / host.clientWidth) * host.clientWidth / 2,
      framing * (ndcY - regionY) * host.clientHeight / 2, host.clientWidth, host.clientHeight)
    core.updateMatrixWorld(true)
    dots.forEach((dot, index) => {
      dot.getWorldPosition(projected)
      const pixels = destinations[index].id === request?.id ? 6 : 3
      const worldPerPixel = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
        (distance - projected.z) / Math.max(1, host.clientHeight)
      dot.scale.setScalar(pixels * worldPerPixel)
    })
    try {
      renderer.render(scene, camera)
      if (request) {
        const index = destinations.findIndex((item) => item.id === request!.id)
        dots[index].getWorldPosition(projected)
        projected.project(camera)
        const dot = { x: (projected.x + 1) * host.clientWidth / 2, y: (1 - projected.y) * host.clientHeight / 2 }
        const panels = Object.fromEntries(dots.map((marker, i) => {
          marker.getWorldPosition(projected)
          const depth = distance - projected.z
          const visible = projected.z * distance > 1.53 * 1.53
          const [x, y] = focusRegions[i % focusRegions.length]
          const focusedDepth = focusDistance - 1.53 * Math.sqrt(1 - x * x - y * y)
          projected.project(camera)
          return [destinations[i].id, {
            x: (projected.x + 1) * host.clientWidth / 2,
            y: (1 - projected.y) * host.clientHeight / 2,
            scale: Math.min(1.25, focusedDepth / depth * Math.tan(THREE.MathUtils.degToRad(focusedFov / 2)) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))), visible, depth,
          }]
        }))
        onUpdate({ ...request, phase, dot, panels, anchor: { x: anchorX, y: anchor } })
      }
    } catch {
      fail()
    }
  }
  function render(time: number) {
    const elapsedMs = lastTime && time ? Math.max(0, time - lastTime) : 0
    const dt = Math.min(elapsedMs, 50)
    lastTime = time
    if (enabled) {
      if (phase !== 'focused' && phase !== 'overview') {
        elapsed += dt
        const t = Math.min(1, elapsed / duration[phase])
        const eased = ease(t)
        if (phase === 'retreat') {
          distance = THREE.MathUtils.lerp(fromDistance, retreatDistance, eased)
          framing = THREE.MathUtils.lerp(fromFraming, 0, eased)
        } else if (phase === 'rotate') {
          core.quaternion.slerpQuaternions(fromRotation, targetRotation, eased)
        } else {
          distance = THREE.MathUtils.lerp(fromDistance, focusDistance, eased)
          framing = THREE.MathUtils.lerp(fromFraming, 1, eased)
        }
        if (t === 1) {
          if (phase === 'retreat') begin(overview ? 'overview' : 'rotate')
          else if (phase === 'rotate') begin('approach')
          else settle()
        }
      }
      if (phase === 'overview') {
        // Use elapsed time so a full menu turn stays 60 seconds even at low frame rates.
        overviewRotation.setFromAxisAngle(worldUp, (elapsedMs % overviewTurnMs) * Math.PI * 2 / overviewTurnMs)
        core.quaternion.premultiply(overviewRotation).normalize()
      }
      orbits.children.forEach((orbit, i) => {
        orbit.rotation.z += dt / 1000 * (i % 2 ? -1 : 1) * (0.025 + i * 0.01)
      })
      ambient.rotation.z += dt / 1000 * 0.006
    }
    draw()
  }
  function sync() {
    if (disposed || failed) return
    const shouldRun = enabled && visible && !document.hidden
    if (shouldRun !== running) {
      running = shouldRun
      lastTime = 0
      renderer.setAnimationLoop(shouldRun ? render : null)
    }
    if (!shouldRun && visible && !document.hidden) draw()
  }
  function resize() {
    if (disposed || failed) return
    const width = host.clientWidth
    const height = host.clientHeight
    if (!width || !height) return
    const ratio = Math.min(window.devicePixelRatio, mobile.matches ? 1.25 : 1.75)
    renderer.setPixelRatio(ratio)
    renderer.setSize(width, height)
    pointMaterial.uniforms.pixelRatio.value = ratio
    pointGeometry.setDrawRange(0, mobile.matches ? 700 : 1600)
    ambientGeometry.setDrawRange(0, mobile.matches ? 65 : 160)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    const halfFov = THREE.MathUtils.degToRad(overviewFov / 2)
    const limitingFov = Math.min(halfFov, Math.atan(Math.tan(halfFov) * camera.aspect))
    // Include the outermost ring and ticks, with breathing room, at every aspect ratio.
    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0
    const footerHeight = host.closest('.portfolio-stage')?.querySelector('.stage-footer')?.getBoundingClientRect().height ?? 0
    const usableHeight = Math.max(100, height - headerHeight - footerHeight - 32)
    const travelHalfFov = Math.min(limitingFov, Math.atan(Math.tan(halfFov) * usableHeight / height))
    retreatDistance = 2.95 / Math.sin(travelHalfFov)
    focusDistance = mobile.matches ? 2.4 : 2.25
    distance = THREE.MathUtils.lerp(retreatDistance, focusDistance, framing)
    fromDistance = distance
    fromFraming = framing
    if (phase === 'retreat' || phase === 'approach') elapsed = 0
    if (visible && !document.hidden) draw()
  }
  function fail() {
    failed = true
    renderer.setAnimationLoop(null)
    onFailure()
  }
  function contextLost(event: Event) {
    event.preventDefault()
    fail()
  }
  const resizeObserver = new ResizeObserver(resize)
  const visibilityObserver = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting
    sync()
  })
  host.appendChild(renderer.domElement)
  renderer.domElement.addEventListener('webglcontextlost', contextLost)
  document.addEventListener('visibilitychange', sync)
  resizeObserver.observe(host)
  const footer = host.closest('.portfolio-stage')?.querySelector('.stage-footer')
  if (footer) resizeObserver.observe(footer)
  visibilityObserver.observe(host)
  resize()
  return {
    setDestination,
    setOverview,
    rotate,
    setMotion(value) {
      enabled = value
      if (!enabled && request) {
        if (overview) settleOverview()
        else settle()
      }
      sync()
    },
    dispose() {
      disposed = true
      renderer.setAnimationLoop(null)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)
      geometries.forEach((item) => item.dispose())
      materials.forEach((item) => item.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
