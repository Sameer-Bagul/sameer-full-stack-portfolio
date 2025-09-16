
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef } from 'react';

interface DottedBackgroundProps {
  dotSize?: number;
  spacing?: number;
}

export const DottedBackground = ({ dotSize = 1.5, spacing = 28 }: DottedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawDots();
    };

    const drawDots = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseColor = theme === 'dark'
        ? 'rgba(30, 58, 138, 0.08)'
        : 'rgba(59, 130, 246, 0.05)';

      const accentColor = theme === 'dark'
        ? 'rgba(124, 58, 237, 0.12)'
        : 'rgba(147, 51, 234, 0.07)';

      const highlightColor = theme === 'dark'
        ? 'rgba(79, 70, 229, 0.15)'
        : 'rgba(99, 102, 241, 0.08)';

      const numCols = Math.ceil(canvas.width / spacing);
      const numRows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          let dotColor;
          if ((i + j) % 7 === 0) {
            dotColor = highlightColor;
          } else if ((i + j) % 5 === 0) {
            dotColor = accentColor;
          } else {
            dotColor = baseColor;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
      }
    };

    const animateDots = () => {
      drawDots();
      animationFrameId = requestAnimationFrame(animateDots);
    };

    resizeCanvas();
    animateDots();

    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resizeCanvas, 200);
    };

    window.addEventListener('resize', throttledResize);

    return () => {
      window.removeEventListener('resize', throttledResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, dotSize, spacing]);

  return (
    <>
      {/* Enhanced Gradient Background with better violet colors */}
      <div 
        className="fixed inset-0 w-full h-full -z-20"
        style={{
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(125% 125% at 50% 10%, rgba(35, 38, 45, 0.95) 40%, rgba(139, 92, 246, 0.6) 100%)'
            : 'radial-gradient(125% 125% at 50% 10%, rgba(255, 255, 255, 0.95) 40%, rgba(139, 92, 246, 0.2) 100%)'
        }}
      />
      
      {/* Animated dots overlay with adjusted opacity */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-50"
        aria-hidden="true"
      />
      
      {/* Enhanced noise texture with better visibility */}
      <div 
        className={`fixed inset-0 w-full h-full -z-15 pointer-events-none mix-blend-overlay ${
          theme === 'dark' ? 'opacity-[0.07]' : 'opacity-[0.04]'
        }`}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          transform: 'scale(1.5)'
        }}
      />

      {/* Additional gradient overlay for depth */}
      <div 
        className="fixed inset-0 w-full h-full -z-18 pointer-events-none opacity-40"
        style={{
          backgroundImage: theme === 'dark'
            ? 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.15), rgba(124, 58, 237, 0.15))'
            : 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.08), rgba(167, 139, 250, 0.12))'
        }}
      />

      {/* Animated gradient accent */}
      <div 
        className="fixed inset-0 w-full h-full -z-19 pointer-events-none opacity-30 animate-pulse"
        style={{
          backgroundImage: theme === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
        }}
      />
    </>
  );
};
