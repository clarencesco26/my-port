import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Neon color palette
const NEON_COLORS = [
  '#41B6E6', // blue
  '#00FFC6', // cyan
  '#E4002B', // pink/red
  '#A259FF', // purple
  '#00FF85', // green
  '#FF61F6', // magenta
];

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
];

// Generate random icon positions and properties
const ICON_COUNT = 18;
const ICONS_DATA = Array.from({ length: ICON_COUNT }).map((_, i) => {
  const iconIdx = Math.floor(Math.random() * ICONS.length);
  const colorIdx = Math.floor(Math.random() * NEON_COLORS.length);
  return {
    icon: ICONS[iconIdx],
    color: NEON_COLORS[colorIdx],
    top: Math.random() * 90, // vh
    left: Math.random() * 95, // vw
    size: 32 + Math.random() * 32, // px
    speed: 0.2 + Math.random() * 0.8, // parallax speed
    key: `${iconIdx}-${colorIdx}-${i}`,
  };
});

const NeonParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      controls.start({
        y: 0 // dummy to trigger rerender
      });
      if (containerRef.current) {
        Array.from(containerRef.current.children).forEach((child, idx) => {
          const icon = ICONS_DATA[idx];
          const el = child as HTMLElement;
          // Parallax: move icons at different speeds
          const translateY = scrollY * icon.speed;
          el.style.transform = `translateY(${translateY}px)`;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

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
      {ICONS_DATA.map((icon, idx) => (
        <motion.div
          key={icon.key}
          initial={false}
          animate={controls}
          style={{
            position: 'absolute',
            top: `${icon.top}vh`,
            left: `${icon.left}vw`,
            width: icon.size,
            height: icon.size,
            color: icon.color,
            filter: `drop-shadow(0 0 8px ${icon.color}) drop-shadow(0 0 16px ${icon.color}99)`,
            opacity: 0.9,
            transition: 'filter 0.3s',
            zIndex: 0,
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default NeonParallaxBackground;
