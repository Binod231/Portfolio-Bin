"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let isActive = true;
    let mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Drift velocity
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1; // Size 1-3
        this.density = Math.random() * 20 + 1;
        
        // Get theme colors dynamically from CSS variables
        const computedStyle = getComputedStyle(document.documentElement);
        const colors = [
          `hsl(${computedStyle.getPropertyValue('--primary').trim()})`,
          `hsl(${computedStyle.getPropertyValue('--secondary').trim()})`,
          `hsl(${computedStyle.getPropertyValue('--accent').trim()})`,
          "#38BDF8" // Fallback Sky Blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Mouse Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 150; // Interaction radius

        if (distance < forceDistance) {
            // "Antigravity" Repulsion: Push away from mouse
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (forceDistance - distance) / forceDistance;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;

            this.x -= directionX * 0.8; 
            this.y -= directionY * 0.8;
        }

        // Constant Drift
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges to keep them on screen (Practicality)
        if (this.x < 0 || this.x > canvas!.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas!.height) this.vy = -this.vy;

        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      // "More Practical" -> Higher density
      const count = (window.innerWidth * window.innerHeight) / 8000; 
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => particle.update());
      
      // Optional: Add connections for "Constellation" look? 
      // User said "move and perform", let's keep it clean particles first, maybe add lines if requested later.
      // But "Antigravity" site often has loose particles.

      if (isActive) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      isActive = false;
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50" 
    />
  );
}
