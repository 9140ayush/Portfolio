import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function NodesNetwork({ count = 35 }) {
  const pointsRef = useRef(null)
  const linesRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { mouse, viewport } = useThree()

  const nodes = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003
        )
      })
    }
    return arr
  }, [count])

  const maxLines = (count * (count - 1)) / 2
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines])
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return

    const pointsGeometry = pointsRef.current.geometry
    const linesGeometry = linesRef.current.geometry
    
    const positions = pointsGeometry.attributes.position.array
    let lineIdx = 0

    nodes.forEach((node, i) => {
      if (!prefersReducedMotion) {
        node.position.add(node.velocity)

        if (Math.abs(node.position.x) > 3) node.velocity.x *= -1
        if (Math.abs(node.position.y) > 3) node.velocity.y *= -1
        if (Math.abs(node.position.z) > 2) node.velocity.z *= -1

        const mouseWorld = new THREE.Vector3(
          (mouse.x * viewport.width) / 2,
          (mouse.y * viewport.height) / 2,
          0
        )
        const distToMouse = node.position.distanceTo(mouseWorld)
        if (distToMouse < 2) {
          const force = (2 - distToMouse) * 0.008
          const dir = mouseWorld.clone().sub(node.position).normalize()
          node.position.addScaledVector(dir, force)
        }
      }

      positions[i * 3] = node.position.x
      positions[i * 3 + 1] = node.position.y
      positions[i * 3 + 2] = node.position.z
    })

    pointsGeometry.attributes.position.needsUpdate = true

    const maxDistance = 1.6
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position)
        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance

          linePositions[lineIdx * 6] = nodes[i].position.x
          linePositions[lineIdx * 6 + 1] = nodes[i].position.y
          linePositions[lineIdx * 6 + 2] = nodes[i].position.z
          
          linePositions[lineIdx * 6 + 3] = nodes[j].position.x
          linePositions[lineIdx * 6 + 4] = nodes[j].position.y
          linePositions[lineIdx * 6 + 5] = nodes[j].position.z

          const r = 0.05
          const g = 0.58
          const b = 0.53

          lineColors[lineIdx * 6] = r * alpha
          lineColors[lineIdx * 6 + 1] = g * alpha
          lineColors[lineIdx * 6 + 2] = b * alpha
          lineColors[lineIdx * 6 + 3] = r * alpha
          lineColors[lineIdx * 6 + 4] = g * alpha
          lineColors[lineIdx * 6 + 5] = b * alpha

          lineIdx++
        }
      }
    }

    linesGeometry.attributes.position.copyArray(linePositions)
    linesGeometry.attributes.color.copyArray(lineColors)
    linesGeometry.drawRange.count = lineIdx * 2
    linesGeometry.attributes.position.needsUpdate = true
    linesGeometry.attributes.color.needsUpdate = true

    if (!prefersReducedMotion) {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 0.6, 0.05)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 0.6, 0.05)
      state.camera.lookAt(0, 0, 0)
    }
  })

  const initialPositions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    nodes.forEach((node, i) => {
      pos[i * 3] = node.position.x
      pos[i * 3 + 1] = node.position.y
      pos[i * 3 + 2] = node.position.z
    })
    return pos
  }, [count, nodes])

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#0d9488"
          size={0.08}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

export function HeroCanvas() {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg className="w-[85%] h-[85%] max-w-[500px] text-teal-accent" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="20" cy="30" r="1.5" fill="currentColor"/>
          <circle cx="50" cy="20" r="1.5" fill="currentColor"/>
          <circle cx="80" cy="35" r="1.5" fill="currentColor"/>
          <circle cx="35" cy="65" r="1.5" fill="currentColor"/>
          <circle cx="70" cy="70" r="1.5" fill="currentColor"/>
          <line x1="20" y1="30" x2="50" y2="20" strokeWidth="0.3" strokeOpacity="0.4"/>
          <line x1="50" y1="20" x2="80" y2="35" strokeWidth="0.3" strokeOpacity="0.4"/>
          <line x1="20" y1="30" x2="35" y2="65" strokeWidth="0.3" strokeOpacity="0.4"/>
          <line x1="35" y1="65" x2="70" y2="70" strokeWidth="0.3" strokeOpacity="0.4"/>
          <line x1="80" y1="35" x2="70" y2="70" strokeWidth="0.3" strokeOpacity="0.4"/>
        </svg>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ pointerEvents: 'auto' }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <NodesNetwork />
      </Canvas>
    </div>
  )
}
