"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, Float, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════════════
   3D LAPTOP GEOMETRY
   Programmatic MacBook-style laptop with metallic materials.
   The screen surface hosts a drei <Html> portal for VidBolt UI content.
   ═══════════════════════════════════════════════════════════════════════════ */

function LaptopModel({
  children,
  screenOpen = 110,
}: {
  children: React.ReactNode;
  screenOpen?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const screenAngle = THREE.MathUtils.degToRad(-(180 - screenOpen));

  // Subtle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }
  });

  // Dimensions (proportional to a real MacBook Pro 16")
  const baseW = 3.6;
  const baseD = 2.5;
  const baseH = 0.08;
  const screenW = 3.4;
  const screenH = 2.2;
  const screenThickness = 0.06;
  const bezelSize = 0.12;

  // Materials
  const bodyMaterial = (
    <meshStandardMaterial
      color="#555555"
      metalness={0.85}
      roughness={0.25}
    />
  );

  const screenFrameMaterial = (
    <meshStandardMaterial
      color="#1a1a1a"
      metalness={0.7}
      roughness={0.3}
    />
  );

  const displayW = screenW - bezelSize * 2;
  const displayH = screenH - bezelSize * 1.5;

  return (
    <group ref={groupRef}>
      {/* ── BASE (keyboard deck) ───────────────────────────────────── */}
      <mesh position={[0, baseH / 2, 0]} castShadow>
        <boxGeometry args={[baseW, baseH, baseD]} />
        {bodyMaterial}
      </mesh>

      {/* Keyboard surface (dark inset) */}
      <mesh position={[0, baseH + 0.001, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[baseW * 0.85, baseD * 0.55]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, baseH + 0.001, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[baseW * 0.35, baseD * 0.22]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* ── SCREEN (lid) ──────────────────────────────────────────── */}
      <group position={[0, baseH, -baseD / 2]} rotation={[screenAngle, 0, 0]}>
        {/* Screen frame/housing */}
        <mesh position={[0, screenH / 2, -screenThickness / 2]} castShadow>
          <boxGeometry args={[screenW, screenH, screenThickness]} />
          {screenFrameMaterial}
        </mesh>

        {/* Camera notch */}
        <mesh position={[0, screenH - 0.06, 0.001]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="#222" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Display surface (where UI renders) */}
        <mesh position={[0, screenH / 2 - bezelSize * 0.15, 0.001]}>
          <planeGeometry args={[displayW, displayH]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* UI CONTENT — rendered as HTML in 3D space */}
        <group position={[0, screenH / 2 - bezelSize * 0.15, 0.002]}>
          <Html
            transform
            occlude="blending"
            distanceFactor={2.4}
            position={[0, 0, 0]}
            style={{
              width: "960px",
              height: "600px",
              overflow: "hidden",
              borderRadius: "4px",
              background: "#000",
              pointerEvents: "none",
            }}
          >
            <div style={{ width: "960px", height: "600px", overflow: "hidden", transform: "scale(1)", transformOrigin: "top left" }}>
              {children}
            </div>
          </Html>
        </group>

        {/* Subtle screen edge highlight */}
        <mesh position={[0, screenH / 2 - bezelSize * 0.15, 0.0015]}>
          <planeGeometry args={[displayW + 0.02, displayH + 0.02]} />
          <meshBasicMaterial color="#111" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ── HINGE ──────────────────────────────────────────────────── */}
      <mesh position={[0, baseH, -baseD / 2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, baseW * 0.95, 16]} />
        {bodyMaterial}
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCENE WRAPPER
   Canvas with lighting, environment, and optional reflective ground plane.
   ═══════════════════════════════════════════════════════════════════════════ */

interface LaptopSceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  showReflection?: boolean;
  height?: string;
}

function LaptopScene({
  children,
  cameraPosition = [0, 2.2, 4.5],
  cameraFov = 35,
  showReflection = true,
  height = "500px",
}: LaptopSceneProps) {
  return (
    <div style={{ width: "100%", height, position: "relative" }}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight
            position={[-3, 4, -2]}
            intensity={0.4}
            color="#cbd5e1"
          />
          {/* Rim light for edge definition */}
          <pointLight position={[0, 2, -4]} intensity={0.5} color="#f97316" />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Floating animation wrapper */}
          <Float
            speed={1.5}
            rotationIntensity={0.15}
            floatIntensity={0.3}
            floatingRange={[-0.08, 0.08]}
          >
            <LaptopModel>{children}</LaptopModel>
          </Float>

          {/* Reflective ground plane */}
          {showReflection && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
              <planeGeometry args={[12, 12]} />
              <MeshReflectorMaterial
                mirror={0.4}
                blur={[300, 100]}
                resolution={512}
                mixBlur={1}
                mixStrength={0.6}
                roughness={1}
                depthScale={1}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#080808"
                metalness={0.5}
              />
            </mesh>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORTED COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export function Laptop3D({
  children,
  cameraPosition,
  cameraFov,
  showReflection,
  height,
}: {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  showReflection?: boolean;
  height?: string;
}) {
  return (
    <LaptopScene
      cameraPosition={cameraPosition}
      cameraFov={cameraFov}
      showReflection={showReflection}
      height={height}
    >
      {children}
    </LaptopScene>
  );
}
