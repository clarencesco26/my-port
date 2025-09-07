"use client";
import { useEffect, useRef, useState } from 'react';

// Expanded neon color palette
const NEON_COLORS = [
  '#41B6E6', // blue
  '#00FFC6', // cyan
  '#E4002B', // red
  '#A259FF', // purple
  '#00FF85', // green
  '#FF61F6', // magenta
  '#FFD54F', // amber
  '#7CFFFA', // aqua
  '#FF7AD1', // pink
  '#8AFF6B', // lime
];

// Global speed multiplier: >1 = faster, <1 = slower
const SPEED_MULTIPLIER = 1.6;

// SVG icon definitions (outlined, neon-ready)
const ICONS = [
  // Laptop
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="12" width="24" height="14" rx="2"/><path d="M2 32h36M10 26v2a2 2 0 002 2h16a2 2 0 002-2v-2"/></svg>,
  // Server
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="8" width="28" height="8" rx="2"/><rect x="6" y="24" width="28" height="8" rx="2"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="28" r="1.5"/></svg>,
  // Code brackets
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l-7 10 7 10"/><path d="M25 10l7 10-7 10"/></svg>,
  // Gears
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="20" cy="20" r="6"/><path d="M20 4v4M20 32v4M4 20h4M32 20h4M8.5 8.5l2.8 2.8M28.7 28.7l2.8 2.8M8.5 31.5l2.8-2.8M28.7 11.3l2.8-2.8"/></svg>,
  // Cloud
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M32 28a6 6 0 00-6-6H14a6 6 0 100 12h12a6 6 0 006-6z"/><path d="M28 16a8 8 0 10-16 0"/></svg>,
  // Keyboard
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="14" width="28" height="12" rx="2"/><path d="M10 18h0M14 18h0M18 18h0M22 18h0M26 18h0M30 18h0M10 22h0M14 22h0M18 22h0M22 22h0M26 22h0M30 22h0"/></svg>,
  // Mouse
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="14" y="6" width="12" height="24" rx="6"/><path d="M20 6v6"/></svg>,
  // Chip
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="10" width="20" height="20" rx="3"/><path d="M4 18h4M4 22h4M32 18h4M32 22h4M18 4v4M22 4v4M18 32v4M22 32v4"/></svg>,
  // Terminal
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="8" width="28" height="24" rx="2"/><path d="M12 18l4 4-4 4M20 26h8"/></svg>,
  // Network
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3"/><circle cx="32" cy="8" r="3"/><circle cx="20" cy="28" r="3"/><path d="M9.8 10.2L20 24M30.2 10.2L20 24"/></svg>,
  // USB
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6v12"/><circle cx="20" cy="22" r="2"/><path d="M18 16h4M20 28v6"/></svg>,
];

// ICONS_DATA is generated client-side to avoid SSR/client mismatch

const NeonParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // generate icons data on client only
  const [iconsData, setIconsData] = useState<any[] | null>(null);
  useEffect(() => {
    const ICON_COUNT = 24;
    const data = Array.from({ length: ICON_COUNT }).map((_, i) => {
      const iconIdx = Math.floor(Math.random() * ICONS.length);
      const colorIdx = Math.floor(Math.random() * NEON_COLORS.length);
      const speed = 0.4 + Math.random() * 1.4; // affects duration
      const baseDuration = 30 + Math.random() * 30; // seconds
      const duration = Math.max(8, (baseDuration / speed) / SPEED_MULTIPLIER); // ensure not too fast
      const delay = -Math.random() * duration; // negative delay to distribute positions
      return {
        icon: ICONS[iconIdx],
        color: NEON_COLORS[colorIdx],
        top: Math.random() * 110, // start beyond view for smoother loop
        left: Math.random() * 98, // vw
        size: 24 + Math.random() * 48, // px
        duration,
        delay,
        key: `${iconIdx}-${colorIdx}-${i}`,
      };
    });
    setIconsData(data);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 w-full h-full z-0 select-none"
      style={{
        overflow: 'hidden',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0.18,
        mixBlendMode: 'screen',
      }}
    >
      <style>{`
        @keyframes moveUp {
          0% { transform: translateY(0); opacity: 1 }
          95% { opacity: 1 }
          100% { transform: translateY(-120vh); opacity: 0 }
        }
      `}</style>
      {iconsData && iconsData.map((icon) => (
        <div
          key={icon.key}
          style={{
            position: 'absolute',
            top: `${icon.top}vh`,
            left: `${icon.left}vw`,
            width: icon.size,
            height: icon.size,
            color: icon.color,
            filter: `drop-shadow(0 0 8px ${icon.color}) drop-shadow(0 0 16px ${icon.color}99)`,
            opacity: 0.95,
            zIndex: 0,
            animation: `moveUp ${icon.duration}s linear infinite`,
            animationDelay: `${icon.delay}s`,
            willChange: 'transform, opacity',
          }}
        >
          {icon.icon}
        </div>
      ))}
    </div>
  );
};

export default NeonParallaxBackground;
