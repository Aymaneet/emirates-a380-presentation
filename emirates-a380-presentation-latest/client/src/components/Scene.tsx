import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
import * as THREE from "three";

const MODEL_PATH = "/assets/model.glb";

function Model({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;

      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((material) => {
        if (!(material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial)) {
          return;
        }

        material.roughness = Math.min(material.roughness ?? 0.85, 0.75);
        material.metalness = Math.min(material.metalness ?? 0.2, 0.12);
        material.envMapIntensity = 0.6;
        material.needsUpdate = true;
      });
    });
  }, [scene]);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollProgress * Math.PI * 2.5;
      modelRef.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
      modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.22} floatIntensity={0.35}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.0041}
        position={[0, 0, 0]}
      />
    </Float>
  );
}

function BackgroundVideo() {
  return (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60 saturate-125 contrast-110"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/custom-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.18)_100%)]" />
    </>
  );
}

export default function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <BackgroundVideo />
      <Canvas shadows camera={{ position: [0, 1.8, 13.2], fov: 33 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[8, 6, 10]} intensity={1.2} color="#ffffff" castShadow />
          <spotLight position={[10, 12, 12]} angle={0.28} penumbra={1} intensity={1.4} castShadow />
          <pointLight position={[-10, -4, 8]} intensity={0.45} color="#D4AF37" />
          <Environment preset="city" />

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
