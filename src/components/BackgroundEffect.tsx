'use client';

import React, { useEffect, useState } from 'react';

interface Icon {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  icon: string;
  color: string;
}

const ICONS = [
  'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M3 10h18', // laptop
  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', // code
  'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4', // server
  'M4 4h16v16H4V4zm4 4h8v8H8V8z', // cpu
  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // gear
];

const COLORS = ['#418BE6', '#00FF00', '#FF1493', '#00FFFF'];

const BackgroundEffect = () => {
  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const createIcons = () => {
      const numberOfIcons = Math.min(25, Math.floor((window.innerWidth * window.innerHeight) / 40000));
      const newIcons = Array.from({ length: numberOfIcons }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 20, // 20-40px
        speed: Math.random() * 10 + 10, // 10-20s
        delay: Math.random() * -15,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      }));
      setIcons(newIcons);
    };

    createIcons();

    window.addEventListener('resize', createIcons);
    return () => window.removeEventListener('resize', createIcons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none bg-transparent" style={{ zIndex: -1 }}>
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animation: `floating ${icon.speed}s ${icon.delay}s infinite ease-in-out`,
          }}
        >
          <svg
            width={icon.size}
            height={icon.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={icon.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: `drop-shadow(0 0 8px ${icon.color})`,
              opacity: 0.6,
            }}
          >
            <path d={icon.icon} />
          </svg>
        </div>
      ))}
      <style jsx global>{`
        @keyframes floating {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, -15px) rotate(5deg);
          }
          50% {
            transform: translate(0, -25px) rotate(0deg);
          }
          75% {
            transform: translate(-10px, -15px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
}

export default BackgroundEffect;
