'use client'

import { Line, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { CurvePath, LineCurve3, Mesh, QuadraticBezierCurve3, Vector3 } from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

function FlowPath({ active }: { active: boolean }) {
  const dashedLine = useRef<Line2>(null)
  const pulseOne = useRef<Mesh>(null)
  const pulseTwo = useRef<Mesh>(null)
  const pulseThree = useRef<Mesh>(null)
  const { viewport } = useThree()

  const curve = useMemo(() => {
    const { height, width } = viewport
    const top = height * 0.23
    const bottom = -height * 0.23
    const left = -width * 0.49
    const right = width * 0.49
    const cornerRadius = Math.min(width, height) * 0.035
    const path = new CurvePath<Vector3>()

    path.add(
      new LineCurve3(
        new Vector3(left + cornerRadius, top, 0),
        new Vector3(right - cornerRadius, top, 0),
      ),
    )
    path.add(
      new QuadraticBezierCurve3(
        new Vector3(right - cornerRadius, top, 0),
        new Vector3(right, top, 0),
        new Vector3(right, top - cornerRadius, 0),
      ),
    )
    path.add(
      new LineCurve3(
        new Vector3(right, top - cornerRadius, 0),
        new Vector3(right, bottom + cornerRadius, 0),
      ),
    )
    path.add(
      new QuadraticBezierCurve3(
        new Vector3(right, bottom + cornerRadius, 0),
        new Vector3(right, bottom, 0),
        new Vector3(right - cornerRadius, bottom, 0),
      ),
    )
    path.add(
      new LineCurve3(
        new Vector3(right - cornerRadius, bottom, 0),
        new Vector3(left + cornerRadius, bottom, 0),
      ),
    )
    path.add(
      new QuadraticBezierCurve3(
        new Vector3(left + cornerRadius, bottom, 0),
        new Vector3(left, bottom, 0),
        new Vector3(left, bottom + cornerRadius, 0),
      ),
    )
    path.add(
      new LineCurve3(
        new Vector3(left, bottom + cornerRadius, 0),
        new Vector3(left, top - cornerRadius, 0),
      ),
    )
    path.add(
      new QuadraticBezierCurve3(
        new Vector3(left, top - cornerRadius, 0),
        new Vector3(left, top, 0),
        new Vector3(left + cornerRadius, top, 0),
      ),
    )

    return path
  }, [viewport])

  const points = useMemo(() => curve.getPoints(180), [curve])

  useFrame(({ clock }, delta) => {
    if (!active) return

    if (dashedLine.current) {
      const material = dashedLine.current.material as LineMaterial
      material.dashOffset -= delta * 0.75
    }

    const elapsed = clock.getElapsedTime() * 0.075
    const pulses = [
      [pulseOne, 0],
      [pulseTwo, 0.34],
      [pulseThree, 0.68],
    ] as const

    pulses.forEach(([pulse, offset]) => {
      if (!pulse.current) return
      pulse.current.position.copy(curve.getPointAt((elapsed + offset) % 1))
      const flicker = 0.9 + Math.sin(clock.getElapsedTime() * 5 + offset * 10) * 0.18
      pulse.current.scale.setScalar(flicker)
    })
  })

  return (
    <>
      <Line color="#072a5b" lineWidth={5} opacity={0.62} points={points} transparent />
      <Line color="#2589ff" lineWidth={2.2} opacity={0.9} points={points} transparent />
      <Line
        color="#8deaff"
        dashScale={1}
        dashSize={0.16}
        dashed
        gapSize={0.72}
        lineWidth={1.5}
        opacity={0.98}
        points={points}
        ref={dashedLine}
        transparent
      />
      {[pulseOne, pulseTwo, pulseThree].map((pulse, index) => (
        <mesh key={index} ref={pulse}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color={index === 1 ? '#ffffff' : '#75e7ff'} toneMapped={false} />
        </mesh>
      ))}
    </>
  )
}

export function ProcessFlow({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], zoom: 58 }}
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      orthographic
    >
      <FlowPath active={active} />
      <Sparkles
        color="#2589ff"
        count={45}
        opacity={0.45}
        scale={[14, 7, 1]}
        size={1.1}
        speed={active ? 0.18 : 0}
      />
    </Canvas>
  )
}
