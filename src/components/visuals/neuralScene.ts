import * as THREE from 'three'

export type WorldView = { kind: string; item?: number; imageSrc?: string }
export type NeuralScene = {
  setMotion: (enabled: boolean) => void
  setView: (view: WorldView) => void
  setScroll: (progress: number) => void
  dispose: () => void
}

export function createNeuralScene(
  host: HTMLElement,
  onFailure: () => void,
  onViewReady: (ready: boolean) => void = () => {},
): NeuralScene {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setClearColor(0x050a12, 0)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50)
  camera.position.z = 8.4
  const core = new THREE.Group()
  core.rotation.set(0.2, 0, -0.22)
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
  const pointerSurface = host.closest('.portfolio-stage') ?? host
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
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

  const heroAssembly = new THREE.Group()
  heroAssembly.add(core, orbits, glow)
  scene.add(heroAssembly)

  // Project screenshots are real textured surfaces in the same world as the neural core.
  const screenAssembly = new THREE.Group()
  const screenMaterial = material(
    new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false, side: THREE.DoubleSide }),
  )
  const screen = new THREE.Mesh(geometry(new THREE.PlaneGeometry(1, 1)), screenMaterial)
  screen.position.z = 0.081
  const chassis = new THREE.Mesh(
    geometry(new THREE.BoxGeometry(1, 1, 1)),
    material(new THREE.MeshBasicMaterial({ color: 0x102331 })),
  )
  const chassisEdges = new THREE.LineSegments(
    geometry(new THREE.EdgesGeometry(geometry(new THREE.BoxGeometry(1, 1, 1)))),
    material(new THREE.LineBasicMaterial({ color: 0x54e5ff, transparent: true, opacity: 0.65 })),
  )
  const rearFrame = new THREE.LineSegments(
    geometry(new THREE.EdgesGeometry(geometry(new THREE.BoxGeometry(1, 1, 1)))),
    material(new THREE.LineBasicMaterial({ color: 0x54e5ff, transparent: true, opacity: 0.18 })),
  )
  rearFrame.position.set(0.12, -0.08, -0.45)
  screenAssembly.add(chassis, chassisEdges, rearFrame, screen)
  screenAssembly.visible = false
  scene.add(screenAssembly)
  const grid = new THREE.GridHelper(7, 18, 0x285565, 0x17303c)
  grid.rotation.x = Math.PI / 2
  grid.position.z = -1.3
  ;(grid.material as THREE.Material).transparent = true
  ;(grid.material as THREE.Material).opacity = 0.3
  geometries.push(grid.geometry)
  materials.push(...(Array.isArray(grid.material) ? grid.material : [grid.material]))
  screenAssembly.add(grid)

  const textureCache = new Map<string, THREE.Texture>()
  const textureLoader = new THREE.TextureLoader()
  let viewRevision = 0
  let flight = 0
  let theta = -0.85
  let elevation = 0.2
  let radius = 11
  let from = { theta, elevation, radius }
  let destination = { theta: 0.12, elevation: 0.025, radius: 8.7 }
  let direction = 1
  let scrollOrbit = 0
  let currentScroll = 0
  let idleTime = 0

  function frameTexture(texture: THREE.Texture) {
    const source = texture.image as { width: number; height: number }
    const aspect = source.width / source.height
    const width = Math.min(4.65, 3.3 * aspect)
    const height = width / aspect
    screen.scale.set(width, height, 1)
    chassis.scale.set(width + 0.15, height + 0.15, 0.15)
    chassisEdges.scale.copy(chassis.scale)
    rearFrame.scale.set(width + 0.4, height + 0.4, 0.1)
    screenMaterial.map = texture
    screenMaterial.needsUpdate = true
    screenAssembly.visible = true
    onViewReady(true)
    if (!enabled) render(0)
  }
  function setView(next: WorldView) {
    if (disposed || failed) return
    const revision = ++viewRevision
    from =
      revision === 1 && enabled ? { theta: -0.95, elevation: 0.22, radius: 12 } : { theta, elevation, radius }
    direction = (next.item ?? 0) % 2 ? -1 : 1
    destination =
      next.kind === 'project'
        ? { theta: direction * 0.12, elevation: 0.055, radius: 8.25 }
        : {
            theta: next.kind === 'hero' ? 0.12 : direction * 0.48,
            elevation: next.kind === 'hero' ? 0.025 : 0.13,
            radius: next.kind === 'hero' ? 8.7 : 9.5,
          }
    flight = enabled ? 0 : 1
    heroAssembly.visible = next.kind !== 'project'
    screenAssembly.visible = false
    if (next.kind === 'project' && next.imageSrc) {
      onViewReady(false)
      const cached = textureCache.get(next.imageSrc)
      if (cached) frameTexture(cached)
      else
        textureLoader.load(
          next.imageSrc,
          (texture) => {
            if (disposed || failed || revision !== viewRevision) {
              texture.dispose()
              return
            }
            texture.colorSpace = THREE.SRGBColorSpace
            texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
            textureCache.set(next.imageSrc!, texture)
            frameTexture(texture)
            // Keep a bounded set of GPU textures while visitors browse projects.
            while (textureCache.size > 3) {
              const oldest = textureCache.keys().next().value!
              textureCache.get(oldest)?.dispose()
              textureCache.delete(oldest)
            }
          },
          undefined,
          () => {
            if (!disposed && revision === viewRevision) onViewReady(false)
          },
        )
    } else onViewReady(true)
    if (!enabled) render(0)
  }

  let enabled = false
  let visible = true
  let failed = false
  let disposed = false
  let lastTime = 0
  let running = false
  const target = new THREE.Vector2()
  const current = new THREE.Vector2()
  function render(time: number) {
    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
    lastTime = time
    if (enabled) {
      flight = Math.min(1, flight + dt / 1.8)
      idleTime += dt
      current.lerp(target, 1 - Math.exp(-dt * 3))
      currentScroll += (scrollOrbit - currentScroll) * (1 - Math.exp(-dt * 4))
      core.rotation.y += dt * 0.055
      core.rotation.x = 0.2 + current.y * 0.06
      orbits.children.forEach((orbit, i) => {
        orbit.rotation.z += dt * (i % 2 ? -1 : 1) * (0.025 + i * 0.01)
      })
      ambient.rotation.z += dt * 0.006
    } else flight = 1
    const ease = flight * flight * (3 - 2 * flight)
    const arc = Math.sin(flight * Math.PI)
    theta =
      THREE.MathUtils.lerp(from.theta, destination.theta, ease) +
      (enabled
        ? arc * direction * 0.68 +
          currentScroll * 0.32 +
          current.x * 0.065 +
          Math.sin(idleTime * 0.16) * 0.025
        : 0)
    elevation =
      THREE.MathUtils.lerp(from.elevation, destination.elevation, ease) +
      (enabled ? arc * 0.13 + current.y * 0.035 : 0)
    radius = THREE.MathUtils.lerp(from.radius, destination.radius, ease) + (enabled ? arc * 1.05 : 0)
    camera.position.set(
      Math.sin(theta) * Math.cos(elevation) * radius,
      Math.sin(elevation) * radius,
      Math.cos(theta) * Math.cos(elevation) * radius,
    )
    camera.lookAt(0, 0, 0)
    screenAssembly.position.y = enabled ? Math.sin(idleTime * 0.4) * 0.025 : 0
    screenAssembly.rotation.z = enabled ? Math.sin(idleTime * 0.25) * 0.006 : 0
    screenAssembly.scale.setScalar(0.94 + ease * 0.06)
    try {
      renderer.render(scene, camera)
    } catch {
      fail()
    }
  }
  function sync() {
    if (disposed || failed) return
    const shouldRun = enabled && visible && !document.hidden
    if (shouldRun !== running) {
      running = shouldRun
      lastTime = 0
      renderer.setAnimationLoop(shouldRun ? render : null)
    }
    if (!shouldRun && visible && !document.hidden) render(0)
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
    if (visible && !document.hidden) render(0)
  }
  function pointer(event: PointerEvent) {
    if (!enabled || !finePointer.matches) return
    const bounds = host.getBoundingClientRect()
    target.set(
      THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1),
      THREE.MathUtils.clamp(-(((event.clientY - bounds.top) / bounds.height) * 2 - 1), -1, 1),
    )
  }
  function resetPointer() {
    target.set(0, 0)
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
  pointerSurface.addEventListener('pointermove', pointer as EventListener)
  pointerSurface.addEventListener('pointerleave', resetPointer)
  document.addEventListener('visibilitychange', sync)
  resizeObserver.observe(host)
  visibilityObserver.observe(host)
  resize()
  return {
    setView,
    setScroll(progress) {
      scrollOrbit = Math.max(-0.5, Math.min(0.5, progress))
    },
    setMotion(value) {
      enabled = value
      sync()
    },
    dispose() {
      disposed = true
      renderer.setAnimationLoop(null)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      pointerSurface.removeEventListener('pointermove', pointer as EventListener)
      pointerSurface.removeEventListener('pointerleave', resetPointer)
      document.removeEventListener('visibilitychange', sync)
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)
      geometries.forEach((item) => item.dispose())
      materials.forEach((item) => item.dispose())
      textureCache.forEach((texture) => texture.dispose())
      textureCache.clear()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
