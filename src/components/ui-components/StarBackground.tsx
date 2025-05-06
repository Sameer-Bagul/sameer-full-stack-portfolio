
"use client";

import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "@/contexts/ThemeContext";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarField = () => {
  const ref = useRef<any>(null);
  const { theme } = useTheme();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta/10;
      ref.current.rotation.y -= delta/15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color={theme === 'dark' ? '#ffffff' : '#000000'}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarBackground = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <div className="w-full h-full fixed inset-0 -z-10">
      <div 
        className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-violet-500/10 via-background to-background/95' 
            : 'bg-gradient-to-b from-violet-200/20 via-violet-100/10 to-background/90'
        }`} 
      />
      <div className={`absolute inset-0 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-[#030014]/70'
          : 'bg-white/40'
      }`} />
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarBackground;
