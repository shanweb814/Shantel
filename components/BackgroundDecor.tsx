
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FloatingShape: React.FC<{ delay: number, left: string, top: string, size: string, color: string }> = ({ delay, left, top, size, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0.4, 0],
      scale: [0.8, 1.2, 0.8],
      y: [0, -40, 0],
      rotate: [0, 45, -45, 0]
    }}
    transition={{ 
      duration: 12 + Math.random() * 6, 
      repeat: Infinity, 
      delay, 
      ease: "easeInOut" 
    }}
    className={`fixed pointer-events-none rounded-3xl ${color} ${size} backdrop-blur-[4px] shadow-sm`}
    style={{ left, top }}
  />
);

export const BackgroundDecor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;
    const colors = ['#f43f5e', '#fbbf24', '#fdf2f8', '#ffffff', '#e2e8f0'];

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      angle: number;
      spin: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 4 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 0.2 - 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4;
        
        // Draw varied shapes: small circles or squares
        if (this.density > 15) {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
        }
        
        ctx.restore();
      }

      update() {
        // Subtle drift
        this.y += 0.2;
        this.angle += this.spin;
        
        if (this.y > canvas!.height) {
          this.y = -10;
          this.x = Math.random() * canvas!.width;
        }

        // Mouse interaction physics
        let dx = mouseRef.current.x - this.x;
        let dy = mouseRef.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 150;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Slow return/drift if not disturbed
          if (this.x !== this.baseX) {
             let dxReturn = this.x - this.baseX;
             this.x -= dxReturn / 100;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.x;
      mouseRef.current.y = e.y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f6] via-rose-50/30 to-amber-50/20" />
      
      {/* Modern gradient blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-rose-200/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-15%] left-[-15%] w-[50%] h-[50%] bg-amber-100/20 blur-[120px] rounded-full" />

      {/* Interactive Particle Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-60 mix-blend-multiply"
      />

      {/* Sophisticated geometric floating elements */}
      <FloatingShape color="bg-rose-100/30" delay={0} left="8%" top="12%" size="w-32 h-32" />
      <FloatingShape color="bg-amber-100/30" delay={4} left="82%" top="18%" size="w-24 h-24" />
      <FloatingShape color="bg-slate-200/20" delay={2} left="72%" top="65%" size="w-44 h-44" />
      <FloatingShape color="bg-rose-200/15" delay={6} left="12%" top="78%" size="w-20 h-20" />
      <FloatingShape color="bg-slate-800/5" delay={1} left="45%" top="40%" size="w-64 h-64" />
    </div>
  );
};
