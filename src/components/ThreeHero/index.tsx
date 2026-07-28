'use client'

import { Edges, Grid, Line, PresentationControls, RoundedBox, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  Group,
  MathUtils,
  Mesh,
  SRGBColorSpace,
  Vector3,
} from 'three'

const BLUE = '#1579ff'
const CYAN = '#6ee7ff'
const WHITE = '#f8fbff'

type BlockSpec = {
  label: string
  position: [number, number, number]
  delay: number
}

const defaultBlocks: BlockSpec[] = [
  { label: 'HTML', position: [-1.48, -1.55, 0], delay: 0 },
  { label: 'CSS', position: [0, -1.55, 0], delay: 0.13 },
  { label: 'JAVASCRIPT', position: [1.48, -1.55, 0], delay: 0.26 },
  { label: 'TYPESCRIPT', position: [-1.48, -0.12, 0], delay: 0.62 },
  { label: 'REACT', position: [0, -0.12, 0], delay: 0.76 },
  { label: 'NEXT.JS', position: [1.48, -0.12, 0], delay: 0.9 },
  { label: 'NODE.JS', position: [-1.48, 1.31, 0], delay: 1.24 },
  { label: 'MONGODB', position: [0, 1.31, 0], delay: 1.38 },
  { label: 'GITHUB', position: [1.48, 1.31, 0], delay: 1.52 },
]

function easeOutBack(value: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2)
}

function TechBlock({
  delay,
  index,
  label,
  position,
  reducedMotion,
}: BlockSpec & { index: number; reducedMotion: boolean }) {
  const group = useRef<Group>(null)
  const glow = useRef<Mesh>(null)
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const normalizedLabel = label.toUpperCase()
      const centerX = canvas.width / 2
      const iconY = 195

      context.save()
      context.lineCap = 'round'
      context.lineJoin = 'round'

      if (normalizedLabel === 'HTML' || normalizedLabel === 'CSS') {
        context.fillStyle = normalizedLabel === 'HTML' ? '#f05a28' : '#2f75e8'
        context.beginPath()
        context.moveTo(centerX - 74, iconY - 82)
        context.lineTo(centerX + 74, iconY - 82)
        context.lineTo(centerX + 58, iconY + 80)
        context.lineTo(centerX, iconY + 106)
        context.lineTo(centerX - 58, iconY + 80)
        context.closePath()
        context.fill()
        context.fillStyle = '#ffffff'
        context.font = '900 118px Arial, sans-serif'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(normalizedLabel === 'HTML' ? '5' : '3', centerX, iconY + 4)
      } else if (normalizedLabel === 'JAVASCRIPT' || normalizedLabel === 'TYPESCRIPT') {
        context.fillStyle = normalizedLabel === 'JAVASCRIPT' ? '#f5cf35' : '#3178c6'
        context.beginPath()
        context.roundRect(centerX - 78, iconY - 78, 156, 156, 14)
        context.fill()
        context.fillStyle = normalizedLabel === 'JAVASCRIPT' ? '#111820' : '#ffffff'
        context.font = '900 74px Arial, sans-serif'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(normalizedLabel === 'JAVASCRIPT' ? 'JS' : 'TS', centerX, iconY + 10)
      } else if (normalizedLabel === 'REACT') {
        context.strokeStyle = '#61dafb'
        context.lineWidth = 15
        for (const rotation of [0, Math.PI / 3, -Math.PI / 3]) {
          context.save()
          context.translate(centerX, iconY)
          context.rotate(rotation)
          context.beginPath()
          context.ellipse(0, 0, 102, 39, 0, 0, Math.PI * 2)
          context.stroke()
          context.restore()
        }
        context.fillStyle = '#61dafb'
        context.beginPath()
        context.arc(centerX, iconY, 18, 0, Math.PI * 2)
        context.fill()
      } else if (normalizedLabel === 'NEXT.JS') {
        context.fillStyle = '#f7fbff'
        context.font = '300 154px Arial, sans-serif'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText('N', centerX - 8, iconY)
        context.strokeStyle = '#f7fbff'
        context.lineWidth = 8
        context.beginPath()
        context.moveTo(centerX + 42, iconY - 78)
        context.lineTo(centerX + 42, iconY + 78)
        context.stroke()
      } else if (normalizedLabel === 'NODE.JS') {
        context.strokeStyle = '#69b84b'
        context.lineWidth = 17
        context.beginPath()
        for (let point = 0; point < 6; point++) {
          const angle = -Math.PI / 2 + point * (Math.PI / 3)
          const x = centerX + Math.cos(angle) * 92
          const y = iconY + Math.sin(angle) * 92
          if (point === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.closePath()
        context.stroke()
        context.fillStyle = '#69b84b'
        context.font = '900 76px Arial, sans-serif'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText('JS', centerX, iconY + 8)
      } else if (normalizedLabel === 'MONGODB') {
        context.fillStyle = '#57b66b'
        context.beginPath()
        context.moveTo(centerX, iconY - 104)
        context.bezierCurveTo(
          centerX + 84,
          iconY - 36,
          centerX + 48,
          iconY + 62,
          centerX,
          iconY + 102,
        )
        context.bezierCurveTo(
          centerX - 48,
          iconY + 62,
          centerX - 84,
          iconY - 36,
          centerX,
          iconY - 104,
        )
        context.fill()
        context.strokeStyle = '#dff6e4'
        context.lineWidth = 6
        context.beginPath()
        context.moveTo(centerX, iconY - 72)
        context.lineTo(centerX, iconY + 115)
        context.stroke()
      } else if (normalizedLabel === 'GITHUB') {
        context.fillStyle = '#f7fbff'
        context.beginPath()
        context.arc(centerX, iconY, 100, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = '#07111f'
        context.beginPath()
        context.moveTo(centerX - 70, iconY - 34)
        context.lineTo(centerX - 56, iconY - 86)
        context.lineTo(centerX - 18, iconY - 62)
        context.quadraticCurveTo(centerX, iconY - 72, centerX + 18, iconY - 62)
        context.lineTo(centerX + 56, iconY - 86)
        context.lineTo(centerX + 70, iconY - 34)
        context.quadraticCurveTo(centerX + 88, iconY + 60, centerX, iconY + 76)
        context.quadraticCurveTo(centerX - 88, iconY + 60, centerX - 70, iconY - 34)
        context.closePath()
        context.fill()
        context.strokeStyle = '#07111f'
        context.lineWidth = 17
        context.beginPath()
        context.moveTo(centerX - 12, iconY + 68)
        context.lineTo(centerX - 12, iconY + 113)
        context.stroke()
      } else {
        context.strokeStyle = '#eef7ff'
        context.lineWidth = 13
        context.beginPath()
        context.moveTo(centerX - 65, iconY - 78)
        context.lineTo(centerX + 62, iconY + 78)
        context.moveTo(centerX + 62, iconY - 78)
        context.lineTo(centerX - 65, iconY + 78)
        context.stroke()
      }

      context.restore()
      context.fillStyle = '#f6fbff'
      const fontSize = normalizedLabel.length > 10 ? 39 : normalizedLabel.length > 7 ? 44 : 50
      context.font = `900 ${fontSize}px Arial, sans-serif`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(normalizedLabel, centerX, 422)
    }

    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    return texture
  }, [label])

  useEffect(() => () => labelTexture.dispose(), [labelTexture])

  useFrame(({ clock }) => {
    if (!group.current) return

    const elapsed = reducedMotion ? 10 : clock.getElapsedTime()
    const progress = MathUtils.clamp((elapsed - delay) / 0.75, 0, 1)
    const eased = easeOutBack(progress)
    const idle =
      progress === 1 && !reducedMotion ? Math.sin(elapsed * 1.15 + index * 0.7) * 0.025 : 0

    group.current.position.set(
      MathUtils.lerp(position[0] + (index % 2 === 0 ? -2.2 : 2.2), position[0], eased),
      MathUtils.lerp(position[1] + 5, position[1], eased) + idle,
      MathUtils.lerp(-1.8, position[2], eased),
    )
    group.current.rotation.z =
      MathUtils.lerp(index % 2 === 0 ? 0.18 : -0.18, 0, eased) +
      (progress === 1 && !reducedMotion ? Math.sin(elapsed * 0.55 + index) * 0.006 : 0)
    group.current.scale.setScalar(MathUtils.lerp(0.72, 1, progress))

    if (glow.current) {
      const pulse = Math.max(0, 1 - Math.abs(progress - 0.82) * 6)
      glow.current.scale.setScalar(1 + pulse * 0.14)
      ;(glow.current.material as import('three').MeshBasicMaterial).opacity = 0.08 + pulse * 0.32
    }
  })

  return (
    <group ref={group}>
      <RoundedBox args={[1.32, 1.25, 0.62]} radius={0.16} smoothness={5}>
        <meshStandardMaterial
          color="#071526"
          emissive="#06224e"
          emissiveIntensity={0.36}
          metalness={0.72}
          roughness={0.14}
        />
        <Edges color="#65bdff" opacity={0.82} threshold={12} transparent />
      </RoundedBox>
      <RoundedBox args={[1.12, 1.06, 0.055]} position={[0, 0, 0.324]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color="#07111f"
          emissive="#03142d"
          emissiveIntensity={0.42}
          metalness={0.48}
          roughness={0.24}
        />
        <Edges color="#2f78b5" opacity={0.52} transparent />
      </RoundedBox>
      <mesh position={[0, 0, 0.356]} ref={glow}>
        <planeGeometry args={[1.08, 1.02]} />
        <meshBasicMaterial blending={AdditiveBlending} color={BLUE} opacity={0.05} transparent />
      </mesh>
      <mesh position={[0, 0, 0.365]}>
        <planeGeometry args={[0.94, 0.94]} />
        <meshBasicMaterial alphaTest={0.02} map={labelTexture} transparent />
      </mesh>
    </group>
  )
}

function EnergyCore({ reducedMotion }: { reducedMotion: boolean }) {
  const core = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!core.current || reducedMotion) return
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2.2) * 0.12
    core.current.scale.set(pulse, pulse, pulse)
  })

  return (
    <group position={[-0.55, -2.34, -0.16]}>
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[2.75, 2.9, 0.34, 80]} />
        <meshStandardMaterial color="#03101e" metalness={0.86} roughness={0.16} />
        <Edges color="#185c91" opacity={0.5} transparent />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[2.55, 2.72, 0.2, 80]} />
        <meshStandardMaterial
          color="#07182b"
          emissive="#06285b"
          emissiveIntensity={0.38}
          metalness={0.8}
          roughness={0.13}
        />
      </mesh>
      <mesh position={[0, 0.075, 0]} ref={core}>
        <cylinderGeometry args={[2.35, 2.45, 0.08, 80]} />
        <meshBasicMaterial blending={AdditiveBlending} color={BLUE} opacity={0.24} transparent />
      </mesh>
      <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.7, 0.035, 8, 100]} />
        <meshBasicMaterial color={CYAN} opacity={0.88} toneMapped={false} transparent />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.12, 0.018, 8, 100]} />
        <meshBasicMaterial color="#2b8fff" opacity={0.7} toneMapped={false} transparent />
      </mesh>
    </group>
  )
}

function Track() {
  const lines = useMemo(
    () =>
      [0, 0.48, 0.96].map((offset) =>
        Array.from({ length: 48 }, (_, index) => {
          const x = -8 + index * 0.34
          return new Vector3(x, -2.48 - offset, -1.4 + Math.pow((x + 2) / 9, 2) * 0.7)
        }),
      ),
    [],
  )

  return (
    <group rotation={[-0.05, 0, 0.02]}>
      {lines.map((points, index) => (
        <Line
          color={index === 0 ? WHITE : BLUE}
          key={index}
          lineWidth={index === 0 ? 1.5 : 1}
          opacity={0.4 - index * 0.08}
          points={points}
          transparent
        />
      ))}
    </group>
  )
}

function Scene({
  centered,
  reducedMotion,
  showSportsDetails,
  technologies,
}: {
  centered: boolean
  reducedMotion: boolean
  showSportsDetails: boolean
  technologies: string[]
}) {
  const rig = useRef<Group>(null)
  const { pointer, viewport } = useThree()
  const sceneX = centered ? 0.55 : MathUtils.clamp(viewport.width * 0.18, 1.35, 3.1)
  const sceneBlocks = defaultBlocks.map((block, index) => ({
    ...block,
    label: technologies[index] || block.label,
  }))

  useFrame(({ clock }) => {
    if (!rig.current) return
    const time = clock.getElapsedTime()
    const targetX = reducedMotion ? 0 : pointer.y * 0.1
    const targetY = reducedMotion ? 0 : pointer.x * 0.14
    rig.current.rotation.x = MathUtils.lerp(rig.current.rotation.x, targetX, 0.035)
    rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, targetY, 0.035)
    rig.current.position.y = Math.sin(time * 0.55) * (reducedMotion ? 0 : 0.035)
  })

  return (
    <>
      <color args={['#02050b']} attach="background" />
      <fog args={['#02050b', 8, 17]} attach="fog" />
      <ambientLight color="#b8d8ff" intensity={1.35} />
      <hemisphereLight color="#d9edff" groundColor="#071b42" intensity={1.8} />
      <directionalLight color={WHITE} intensity={4.8} position={[2, 6, 5]} />
      <pointLight color={BLUE} intensity={48} position={[2.5, 0, 3.5]} />
      <pointLight color={CYAN} intensity={28} position={[-3, -1, 2.5]} />
      <spotLight angle={0.55} color="#75c8ff" intensity={42} penumbra={0.8} position={[4, 7, 5]} />

      <Grid
        args={[24, 18]}
        cellColor="#0a315e"
        cellSize={0.7}
        cellThickness={0.35}
        fadeDistance={13}
        fadeStrength={1.5}
        infiniteGrid
        position={[0, -2.64, -1.1]}
        sectionColor="#155ea1"
        sectionSize={3.5}
        sectionThickness={0.7}
      />

      <PresentationControls
        azimuth={[-0.42, 0.42]}
        cursor
        enabled={!reducedMotion}
        global
        polar={[-0.18, 0.18]}
        snap
        speed={1.1}
      >
        <group position={[sceneX, 0.04, 0]} ref={rig} scale={0.92}>
          {showSportsDetails && <Track />}
          <group position={[-0.55, -0.15, 0]}>
            {sceneBlocks.map((block, index) => (
              <TechBlock
                index={index}
                key={`${block.label}-${index}`}
                {...block}
                reducedMotion={reducedMotion}
              />
            ))}
          </group>
          <EnergyCore reducedMotion={reducedMotion} />
          <Sparkles
            color={CYAN}
            count={reducedMotion ? 22 : 70}
            opacity={0.65}
            scale={[8, 5, 3]}
            size={1.5}
            speed={reducedMotion ? 0 : 0.25}
          />
        </group>
      </PresentationControls>
    </>
  )
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

type ThreeHeroProps = {
  centered?: boolean
  showSportsDetails?: boolean | null
  technologies?: string[]
}

export function ThreeHero({
  centered = false,
  showSportsDetails = true,
  technologies = defaultBlocks.map(({ label }) => label),
}: ThreeHeroProps) {
  const reducedMotion = useReducedMotion()

  return (
    <SceneBoundary>
      <Canvas
        camera={{ fov: 39, position: [0.3, 0.35, 11] }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new Color('#02050b'))
          scene.background = new Color('#02050b')
        }}
      >
        <Scene
          centered={centered}
          reducedMotion={reducedMotion}
          showSportsDetails={showSportsDetails ?? true}
          technologies={technologies}
        />
      </Canvas>
    </SceneBoundary>
  )
}
