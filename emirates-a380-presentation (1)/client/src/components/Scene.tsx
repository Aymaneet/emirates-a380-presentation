import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

// Use the path relative to the public directory
const MODEL_PATH = "/assets/model.glb";

function Model({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollProgress * Math.PI * 2.5;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <primitive 
        ref={modelRef} 
        object={scene} 
        scale={0.0045} 
        position={[0, 0, 0]} 
      />
    </Float>
  );
}

export default function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60 saturate-125 contrast-110"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/a380-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.18)_100%)]" />
      <Canvas camera={{ position: [0, 2, 12], fov: 30 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <spotLight position={[15, 20, 15]} angle={0.2} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-15, -10, -10]} intensity={1} color="#D4AF37" />
          <Environment preset="studio" />
          
          <Model scrollProgress={scrollProgress} />
          
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.3} 
            scale={25} 
            blur={2.5} 
            far={5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}