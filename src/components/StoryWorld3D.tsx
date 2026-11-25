import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export type GameSection =
  | 'home'
  | 'quiz'
  | 'guess'
  | 'match'
  | 'order'
  | 'wordsearch'
  | 'cinema';

interface StoryWorld3DProps {
  completedGames: GameSection[];
  onSelectSection: (section: GameSection) => void;
}

function RainDrops({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const drops = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      x: ((i % 6) - 2.5) * 0.35,
      y: Math.random() * 2 - 0.5,
      z: -1.45 + (i % 3) * 0.08,
      speed: 1.8 + (i % 4) * 0.4,
    }))
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !active) return;
    groupRef.current.children.forEach((child, idx) => {
      const d = drops.current[idx];
      d.y -= d.speed * delta;
      if (d.y < -0.9) d.y = 1.1;
      child.position.y = d.y;
    });
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={[0, 1.35, 0]}>
      {drops.current.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <capsuleGeometry args={[0.018, 0.09, 4, 6]} />
          <meshStandardMaterial color="#7cc0ff" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function LittleBird({ onClick }: { onClick: () => void }) {
  const birdRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!birdRef.current) return;
    const t = clock.getElapsedTime();
    birdRef.current.rotation.z = Math.sin(t * 3) * 0.08;
    birdRef.current.position.y = 2.42 + Math.abs(Math.sin(t * 2.2)) * 0.05;
  });

  return (
    <group
      ref={birdRef}
      position={[0.75, 2.42, -1.35]}
      scale={hovered ? 1.18 : 1}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Body */}
      <mesh castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      {/* Head */}
      <mesh position={[0.12, 0.12, 0]} castShadow>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      {/* Beak */}
      <mesh position={[0.24, 0.11, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.04, 0.1, 8]} />
        <meshStandardMaterial color="#f5b82e" />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.18, 0.06, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.16, 0.05, 0.08]} />
        <meshStandardMaterial color="#d94e3b" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.38, 0]} center>
          <div className="bg-white border-2 border-[#2a2420] rounded-xl px-2 py-1 text-xs font-bold whitespace-nowrap shadow">
            🐦 ¡Adivina el personaje!
          </div>
        </Html>
      )}
    </group>
  );
}

function RedPhone({ onClick }: { onClick: () => void }) {
  const phoneRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!phoneRef.current) return;
    const t = clock.getElapsedTime();
    // Subtle ring wobble every few seconds
    const ring = Math.sin(t * 2) > 0.6 ? Math.sin(t * 35) * 0.06 : 0;
    phoneRef.current.rotation.z = ring;
  });

  return (
    <group
      ref={phoneRef}
      position={[-1.15, 0.68, 0.35]}
      scale={hovered ? 1.15 : 1}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base */}
      <mesh castShadow>
        <boxGeometry args={[0.42, 0.22, 0.36]} />
        <meshStandardMaterial color="#d94e3b" />
      </mesh>
      {/* Dial */}
      <mesh position={[0, 0.04, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
        <meshStandardMaterial color="#faf5e8" />
      </mesh>
      {/* Handset */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <boxGeometry args={[0.48, 0.09, 0.12]} />
        <meshStandardMaterial color="#b33827" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.45, 0]} center>
          <div className="bg-white border-2 border-[#2a2420] rounded-xl px-2 py-1 text-xs font-bold whitespace-nowrap shadow">
            ☎️ ¡Cruza los nombres!
          </div>
        </Html>
      )}
    </group>
  );
}

function LemonadeSet({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={[1.15, 0.68, 0.4]}
      scale={hovered ? 1.15 : 1}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Pitcher */}
      <mesh position={[-0.1, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.17, 0.36, 16]} />
        <meshStandardMaterial color="#f5d547" transparent opacity={0.88} />
      </mesh>
      {/* Glass */}
      <mesh position={[0.18, 0.11, 0.08]} castShadow>
        <cylinderGeometry args={[0.07, 0.06, 0.22, 14]} />
        <meshStandardMaterial color="#ffe875" transparent opacity={0.9} />
      </mesh>
      {/* Cookie plate */}
      <mesh position={[0.05, 0.02, -0.22]} castShadow>
        <cylinderGeometry args={[0.18, 0.16, 0.04, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.02, 0.05, -0.22]}>
        <cylinderGeometry args={[0.06, 0.06, 0.03, 12]} />
        <meshStandardMaterial color="#c98a4b" />
      </mesh>
      <mesh position={[0.1, 0.05, -0.18]}>
        <cylinderGeometry args={[0.06, 0.06, 0.03, 12]} />
        <meshStandardMaterial color="#b9783a" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.55, 0]} center>
          <div className="bg-white border-2 border-[#2a2420] rounded-xl px-2 py-1 text-xs font-bold whitespace-nowrap shadow">
            🍋 ¡Ordena las escenas!
          </div>
        </Html>
      )}
    </group>
  );
}

function EsopoBook({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group
        position={[0, 0.72, 0.85]}
        rotation={[0.2, 0.3, 0]}
        scale={hovered ? 1.15 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.08, 0.38]} />
          <meshStandardMaterial color="#9e2f24" />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <boxGeometry args={[0.44, 0.02, 0.32]} />
          <meshStandardMaterial color="#faf5e8" />
        </mesh>
        {hovered && (
          <Html position={[0, 0.35, 0]} center>
            <div className="bg-white border-2 border-[#2a2420] rounded-xl px-2 py-1 text-xs font-bold whitespace-nowrap shadow">
              📖 ¡Preguntas del libro!
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function DioramaScene({
  completedGames,
  onSelectSection,
}: StoryWorld3DProps) {
  const isStarryMode = completedGames.length >= 3;

  return (
    <>
      <ambientLight intensity={isStarryMode ? 0.65 : 0.75} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
      <pointLight position={[-3, 3, 2]} intensity={0.5} color="#ffd580" />

      {/* Floor Island */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.6, 2.8, 0.25, 32]} />
        <meshStandardMaterial color="#d8c7a3" />
      </mesh>
      {/* Green rug */}
      <mesh position={[0, 0.04, 0.3]} receiveShadow>
        <cylinderGeometry args={[1.45, 1.45, 0.03, 32]} />
        <meshStandardMaterial color="#6b9e78" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1.35, -1.6]} receiveShadow>
        <boxGeometry args={[3.6, 2.7, 0.16]} />
        <meshStandardMaterial color={isStarryMode ? '#2f3d56' : '#efe7d2'} />
      </mesh>

      {/* Window Frame */}
      <group position={[0, 1.45, -1.48]}>
        {/* Sky pane */}
        <mesh>
          <planeGeometry args={[1.6, 1.5]} />
          <meshStandardMaterial
            color={isStarryMode ? '#18243c' : '#8cb3d9'}
            emissive={isStarryMode ? '#142038' : '#000000'}
          />
        </mesh>
        {/* Window wooden bars */}
        <mesh position={[0, 0.76, 0.03]}>
          <boxGeometry args={[1.72, 0.1, 0.08]} />
          <meshStandardMaterial color="#9c7248" />
        </mesh>
        <mesh position={[0, -0.76, 0.03]}>
          <boxGeometry args={[1.72, 0.1, 0.08]} />
          <meshStandardMaterial color="#9c7248" />
        </mesh>
        <mesh position={[-0.81, 0, 0.03]}>
          <boxGeometry args={[0.1, 1.62, 0.08]} />
          <meshStandardMaterial color="#9c7248" />
        </mesh>
        <mesh position={[0.81, 0, 0.03]}>
          <boxGeometry args={[0.1, 1.62, 0.08]} />
          <meshStandardMaterial color="#9c7248" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.6, 0.06, 0.06]} />
          <meshStandardMaterial color="#9c7248" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.06, 1.5, 0.06]} />
          <meshStandardMaterial color="#9c7248" />
        </mesh>
      </group>

      {/* Rain or Stars */}
      <RainDrops active={!isStarryMode} />
      {isStarryMode && (
        <Sparkles
          count={40}
          scale={[3.5, 2.5, 2.5]}
          position={[0, 1.5, -0.5]}
          size={4}
          speed={0.4}
          color="#f5b82e"
        />
      )}

      {/* Left Table + Red Phone */}
      <group position={[-1.15, 0.3, 0.35]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.06, 20]} />
          <meshStandardMaterial color="#8c583a" />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 0.3, 12]} />
          <meshStandardMaterial color="#704329" />
        </mesh>
      </group>
      <RedPhone onClick={() => onSelectSection('match')} />

      {/* Right Table + Lemonade */}
      <group position={[1.15, 0.3, 0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.06, 20]} />
          <meshStandardMaterial color="#8c583a" />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 0.3, 12]} />
          <meshStandardMaterial color="#704329" />
        </mesh>
      </group>
      <LemonadeSet onClick={() => onSelectSection('order')} />

      {/* Center Book */}
      <EsopoBook onClick={() => onSelectSection('quiz')} />

      {/* Perched Bird */}
      <LittleBird onClick={() => onSelectSection('guess')} />

      {/* Floating Reward Stars */}
      {completedGames.map((g, i) => {
        const angle = (i / Math.max(completedGames.length, 1)) * Math.PI * 2;
        return (
          <Float key={g} speed={3} floatIntensity={0.4}>
            <mesh
              position={[Math.cos(angle) * 1.9, 2.2 + (i % 2) * 0.25, Math.sin(angle) * 1.2]}
              rotation={[0, angle, 0]}
            >
              <octahedronGeometry args={[0.14, 0]} />
              <meshStandardMaterial
                color="#f5b82e"
                emissive="#f5b82e"
                emissiveIntensity={0.45}
              />
            </mesh>
          </Float>
        );
      })}

      <OrbitControls
        enablePan={false}
        minDistance={3.2}
        maxDistance={6.5}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 5}
      />
    </>
  );
}

export const StoryWorld3D: React.FC<StoryWorld3DProps> = ({
  completedGames,
  onSelectSection,
}) => {
  return (
    <div className="relative w-full h-[280px] sm:h-[400px] rounded-[22px] overflow-hidden border-[3px] border-[#2a2420] bg-gradient-to-b from-[#dcebfa] to-[#faf5e8] shadow-[0_8px_0_#2a2420] touch-none">
      <Canvas shadows camera={{ position: [0, 2.1, 4.7], fov: 45 }}>
        <DioramaScene
          completedGames={completedGames}
          onSelectSection={onSelectSection}
        />
      </Canvas>
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur border-2 border-[#2a2420] rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-2 pointer-events-none">
        <span>✨ Mundo 3D de Cristóbal</span>
        <span className="text-[#6e635b] font-normal hidden sm:inline">
          (Gira con el mouse y haz clic en los objetos)
        </span>
      </div>
      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur border-2 border-[#2a2420] rounded-xl px-3 py-1 text-xs font-bold">
        {completedGames.length >= 3
          ? '🌟 ¡Cielo despejado con estrellas!'
          : `🌧️ Lluvia afuera (${completedGames.length}/3 juegos para despejar)`}
      </div>
    </div>
  );
};

