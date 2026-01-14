"use client";

import React, { useEffect, useRef } from "react";

export default function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // --- Configuration ---
    // --- Configuration ---
    // Antigravity Style Configuration
    const PARTICLE_DENSITY = width < 768 ? 50 : 80;
    const cols = Math.floor(width / PARTICLE_DENSITY);
    const rows = Math.floor(height / PARTICLE_DENSITY);
    
    // Interaction Settings
    const MOUSE_RADIUS = 200; 
    const REPULSION_STRENGTH = 2; // Tuned for dash movement (not too explosive)
    const RETURN_SPEED = 0.02; // Slow energetic return
    const FRICTION = 0.94; // Slidey friction
    
    // Antigravity Blue
    const GOOGLE_BLUE = "#4285F4";

    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      angle: number; // For dash rotation
    }

    const particles: Particle[] = [];
    
    // Create Grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = (i * PARTICLE_DENSITY) + (Math.random() * 30);
            const y = (j * PARTICLE_DENSITY) + (Math.random() * 30);
            particles.push({
                x,
                y,
                originX: x,
                originY: y,
                vx: 0,
                vy: 0,
                size: Math.random() * 2 + 1,
                angle: 0
            });
        }
    }

    // Static Background Stars
    const stars: {x: number, y: number, alpha: number}[] = [];
    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            alpha: Math.random() * 0.3
        });
    }

    // --- State ---
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Background Gradient (Deep Space Blue)
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width
      );
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#020617");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);


      // 2. Static Background Layer (Faint dots)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      stars.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, 1, 0, Math.PI * 2);
          ctx.fill();
      });

      // 3. Physics & Dashes
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      particles.forEach((p) => {
        // Physics Calculation
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion
        if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * force * REPULSION_STRENGTH;
            const pushY = Math.sin(angle) * force * REPULSION_STRENGTH;
            
            p.vx -= pushX;
            p.vy -= pushY;
        }

        // Return to Origin (Spring)
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * RETURN_SPEED;
        p.vy += homeDy * RETURN_SPEED;

        // Friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Apply
        p.x += p.vx;
        p.y += p.vy;

        // Rotation (Point in direction of velocity)
        // Only rotate if moving fast enough to have a direction
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.1) {
            p.angle = Math.atan2(p.vy, p.vx);
        }

        // Draw Dash
        const dashLength = Math.min(speed * 3, 15) + 3; // Lengthen with speed
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        // Color based on speed? Or static Google Blue?
        // Let's make it brighter/whiter when moving fast, Blue when slow
        ctx.strokeStyle = GOOGLE_BLUE;
        ctx.globalAlpha = Math.min(speed * 0.2 + 0.3, 1); // Fade in when moving

        ctx.beginPath();
        ctx.moveTo(-dashLength/2, 0);
        ctx.lineTo(dashLength/2, 0);
        ctx.stroke();
        
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Note: In a real robust app we might want to regenerate particles on resize
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
