"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseR: number;
  color: string;
  alpha: number;
  phase: number;
}

export default function DotMatrixPortrait({
  src = "/profile-headshot.jpg",
  size = 220,
}: {
  src?: string;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: size / 2,
    y: size / 2,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const dots: Dot[] = [];
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const grid = 34;
      const off = document.createElement("canvas");
      off.width = grid;
      off.height = grid;
      const octx = off.getContext("2d");
      if (!octx) return;

      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) / 2;
      const sy = Math.max(0, (img.height - side) * 0.06);
      octx.drawImage(img, sx, sy, side, side, 0, 0, grid, grid);
      const data = octx.getImageData(0, 0, grid, grid).data;

      const pad = 16;
      const step = (size - pad * 2) / (grid - 1);

      for (let gy = 0; gy < grid; gy++) {
        for (let gx = 0; gx < grid; gx++) {
          const dx = (gx - (grid - 1) / 2) / (grid / 2);
          const dy = (gy - (grid - 1) / 2) / (grid / 2);
          const dist = Math.hypot(dx, dy);
          if (dist > 0.96) continue;

          const idx = (gy * grid + gx) * 4;
          const lum = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;

          // Edge gradient approximation with right/bottom neighbors
          const idxR = (gy * grid + Math.min(grid - 1, gx + 1)) * 4;
          const idxD = (Math.min(grid - 1, gy + 1) * grid + gx) * 4;
          const lumR = (0.299 * data[idxR] + 0.587 * data[idxR + 1] + 0.114 * data[idxR + 2]) / 255;
          const lumD = (0.299 * data[idxD] + 0.587 * data[idxD + 1] + 0.114 * data[idxD + 2]) / 255;
          const edge = Math.min(1, (Math.abs(lum - lumR) + Math.abs(lum - lumD)) * 3.2);

          // Drop white studio background
          if (lum > 0.85 && edge < 0.22) continue;

          const sphere = Math.sqrt(Math.max(0, 1 - dist * dist));
          const intensity = Math.min(1, Math.max(0.2, (1 - lum) * 0.55 + edge * 0.85));
          const baseR = (0.9 + intensity * 1.95) * (0.8 + 0.22 * sphere);

          let color = "#8ae234";
          if (edge > 0.36) color = "#eeeeec";
          else if (lum < 0.36) color = "#38bdf8";

          dots.push({
            x: pad + gx * step,
            y: pad + gy * step,
            baseR,
            color,
            alpha: Math.min(1, 0.55 + intensity * 0.45),
            phase: (gx + gy) * 0.25,
          });
        }
      }
    };

    let t = 0;
    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, size, size);

      // Cyber rings
      ctx.strokeStyle = "rgba(138, 226, 52, 0.55)";
      ctx.lineWidth = 1.4;
      ctx.setLineDash([8, 5]);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 5, t * 0.2, t * 0.2 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 11, 0, Math.PI * 2);
      ctx.stroke();

      const ptr = pointerRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let ox = d.x;
        let oy = d.y;
        let r = d.baseR + Math.sin(t + d.phase) * 0.16;

        if (ptr.active) {
          const pdx = d.x - ptr.x;
          const pdy = d.y - ptr.y;
          const pdist = Math.hypot(pdx, pdy);
          if (pdist < 56 && pdist > 0.1) {
            const force = (1 - pdist / 56) * 5;
            ox += (pdx / pdist) * force;
            oy += (pdy / pdist) * force;
            r *= 1.25;
          }
        }

        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [src, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((e.clientX - rect.left) / rect.width) * size,
          y: ((e.clientY - rect.top) / rect.height) * size,
          active: true,
        };
      }}
      onMouseLeave={() => {
        pointerRef.current.active = false;
      }}
      className="rounded-full cursor-crosshair shrink-0"
      title="Interactive 3D Dot-Matrix Profile (Hover to interact)"
    />
  );
}

