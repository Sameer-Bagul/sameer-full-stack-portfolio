"use client";

import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "@/contexts/ThemeContext";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

// Helper function to sanitize Float32Array and replace NaN values
const sanitizePositions = (positions: Float32Array): Float32Array => {
  for (let i = 0; i < positions.length; i++) {
    if (isNaN(positions[i])) {
      positions[i] = 0;
    }
  }
  return positions;
};

const StarField = () => {
  const smallStarsRef = useRef<any>(null);
  const mediumStarsRef = useRef<any>(null);
  const largeStarsRef = useRef<any>(null);
  const glowingStarsRef = useRef<any>(null);
  const { theme } = useTheme();
  const [time, setTime] = useState(0);

  // Reduced number of stars in each layer
  const [smallStars] = useState(() =>
    sanitizePositions(random.inSphere(new Float32Array(1500), { radius: 1.5 }))
  );
  
  const [mediumStars] = useState(() =>
    sanitizePositions(random.inSphere(new Float32Array(500), { radius: 1.3 }))
  );
  
  const [largeStars] = useState(() =>
    sanitizePositions(random.inSphere(new Float32Array(100), { radius: 1.4 }))
  );

  const [glowingStars] = useState(() =>
    sanitizePositions(random.inSphere(new Float32Array(30), { radius: 1.6 }))
  );

  useFrame((state, delta) => {
    setTime(prev => prev + delta);

    // Create orbital rotation patterns
    if (smallStarsRef.current) {
      smallStarsRef.current.rotation.y = time * 0.1;
      smallStarsRef.current.rotation.z = Math.sin(time * 0.15) * 0.1;
    }
    if (mediumStarsRef.current) {
      mediumStarsRef.current.rotation.y = time * 0.08;
      mediumStarsRef.current.rotation.z = Math.sin(time * 0.1) * 0.15;
    }
    if (largeStarsRef.current) {
      largeStarsRef.current.rotation.y = time * 0.05;
      largeStarsRef.current.rotation.z = Math.sin(time * 0.08) * 0.2;
    }
    if (glowingStarsRef.current) {
      glowingStarsRef.current.rotation.y = time * 0.03;
      glowingStarsRef.current.rotation.z = Math.sin(time * 0.05) * 0.25;
    }
  });

  return (
    <group>
      {/* Base small stars layer */}
      <group rotation={[0, 0, Math.PI * 0.2]}>
        <Points ref={smallStarsRef} positions={smallStars} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color={theme === 'dark' ? '#ffffff' : '#000000'}
            size={0.002}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>

      {/* Medium stars with slight glow */}
      <group rotation={[0, Math.PI * 0.1, 0]}>
        <Points ref={mediumStarsRef} positions={mediumStars} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color={theme === 'dark' ? '#E6E6FA' : '#4B0082'}
            size={0.004}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>

      {/* Large bright stars */}
      <group rotation={[Math.PI * 0.1, 0, 0]}>
        <Points ref={largeStarsRef} positions={largeStars} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color={theme === 'dark' ? '#FFD700' : '#1E90FF'}
            size={0.006}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>

      {/* Extra glowing stars */}
      <group rotation={[0, -Math.PI * 0.15, Math.PI * 0.1]}>
        <Points ref={glowingStarsRef} positions={glowingStars} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color={theme === 'dark' ? '#FF69B4' : '#4169E1'}
            size={0.008}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.8}
          />
        </Points>
      </group>
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
      {/* Cosmic Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`cosmic-orb-1 ${theme === 'dark' ? 'dark' : 'light'}`} />
        <div className={`cosmic-orb-2 ${theme === 'dark' ? 'dark' : 'light'}`} />
        <div className={`cosmic-orb-3 ${theme === 'dark' ? 'dark' : 'light'}`} />
      </div>
      <div 
        className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-purple-900/20 via-violet-800/10 to-background/95 bg-blend-multiply' 
            : 'bg-gradient-to-b from-indigo-200/20 via-violet-100/10 to-background/90'
        }`} 
      />
      <div className={`absolute inset-0 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-[#030014]/70 bg-gradient-radial from-violet-950/5 via-background/80 to-background/95'
          : 'bg-white/40 bg-gradient-radial from-violet-100/10 via-background/60 to-background/80'
      }`} />
      <style>
        {`
          .cosmic-orb-1 {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            filter: blur(80px);
            animation: float1 15s ease-in-out infinite;
            opacity: 0.5;
          }
          .cosmic-orb-1.dark {
            background: radial-gradient(circle at center, rgba(147, 51, 234, 0.3), rgba(88, 28, 135, 0.1));
          }
          .cosmic-orb-1.light {
            background: radial-gradient(circle at center, rgba(199, 210, 254, 0.3), rgba(165, 180, 252, 0.1));
          }
          
          .cosmic-orb-2 {
            position: absolute;
            width: 250px;
            height: 250px;
            border-radius: 50%;
            filter: blur(90px);
            animation: float2 20s ease-in-out infinite;
            opacity: 0.4;
            right: 10%;
            top: 20%;
          }
          .cosmic-orb-2.dark {
            background: radial-gradient(circle at center, rgba(139, 92, 246, 0.3), rgba(91, 33, 182, 0.1));
          }
          .cosmic-orb-2.light {
            background: radial-gradient(circle at center, rgba(224, 231, 255, 0.3), rgba(199, 210, 254, 0.1));
          }
          
          .cosmic-orb-3 {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            filter: blur(70px);
            animation: float3 18s ease-in-out infinite;
            opacity: 0.3;
            left: 20%;
            bottom: 10%;
          }
          .cosmic-orb-3.dark {
            background: radial-gradient(circle at center, rgba(167, 139, 250, 0.3), rgba(126, 34, 206, 0.1));
          }
          .cosmic-orb-3.light {
            background: radial-gradient(circle at center, rgba(238, 242, 255, 0.3), rgba(224, 231, 255, 0.1));
          }

          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, 20px) scale(1.05); }
          }
          
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, 30px) scale(1.03); }
          }
          
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(25px, -20px) scale(1.04); }
          }
        `}
      </style>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarBackground;
