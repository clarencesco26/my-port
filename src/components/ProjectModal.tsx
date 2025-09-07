"use client";
import React, { useEffect, useRef, useState } from 'react';

type Project = {
  images: string[];
  title?: string;
  details?: string;
  link?: string;
};

type Props = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ open, project, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // reset to first image whenever modal opens or project changes
    if (open) setIndex(0);
  }, [open, project]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      const len = project.images.length;
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % len);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + len) % len);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, project, onClose]);

  if (!open || !project) return null;

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const onThumbClick = (i: number) => setIndex(i);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
  if (!project) return;
  const len = project.images.length;
  if (dx > threshold) setIndex((i) => (i - 1 + len) % len);
  else if (dx < -threshold) setIndex((i) => (i + 1) % len);
    touchStartX.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onOverlayClick}>
      <div ref={contentRef} className="relative w-full h-full sm:h-auto sm:w-11/12 sm:max-w-4xl bg-[#0b0b0b] rounded-none sm:rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Close Button */}
        <button aria-label="Close modal" onClick={onClose} className="absolute right-3 top-3 z-20 text-white p-2 rounded-full bg-transparent border border-[#2a2a2a] hover:border-[#E4002B]" style={{ filter: 'drop-shadow(0 0 6px #E4002B)' }}>✕</button>

        {/* Main image area */}
        <div className="flex-1 w-full bg-black flex items-center justify-center" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img src={project.images[index]} alt={`Image ${index + 1}`} className="w-full h-full object-contain sm:object-cover" style={{ maxHeight: '80vh' }} />
        </div>

        {/* Thumbnails (show up to 3 other images) */}
        <div className="w-full p-3 bg-[#070707] flex items-center gap-3 overflow-x-auto">
          {project.images.map((src, i) => (
            i === index ? null : (
              <button key={i} onClick={() => onThumbClick(i)} className={`flex-shrink-0 rounded-md overflow-hidden border ${i === index ? 'border-[#418BE6]' : 'border-transparent'}`} style={{ width: 96, height: 64 }}>
                <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            )
          ))}
        </div>

        {/* Title / details area */}
        <div className="p-4 bg-[#050505] text-white text-sm">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold text-lg">{project.title}</h3>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-4 inline-flex items-center px-4 py-2 bg-[#418BE6] text-black font-semibold rounded-md hover:shadow-[0_0_12px_rgba(65,139,230,0.5)]">
                Visit Project
              </a>
            )}
          </div>
          <p className="text-sm text-[#cfcfcf] mt-2">{project.details}</p>
        </div>
      </div>
    </div>
  );
}
