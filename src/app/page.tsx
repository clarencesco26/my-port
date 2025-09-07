'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import NeonParallaxBackground from '@/components/NeonParallaxBackground';
import ProjectModal from '@/components/ProjectModal';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';

const COLORS = {
  primary: "#418BE6",      // neon blue
  secondary: "#1A1A1A",   // slightly lighter than black
  accent: "#E4002B",      // neon red
  dark1: "#000000",       // pure black
  dark2: "#111111",       // slightly lighter black
  card1: "#1A1A1A",       // dark card bg
  card2: "#222222",       // slightly lighter card bg
  card3: "#2A2A2A",       // lightest card bg
  highlight: "#418BE6",   // neon blue for highlights
  button: "#418BE6",      // neon blue for buttons
  text: "#FFFFFF",        // white text
  textMuted: "#CCCCCC"    // muted text
};

const services = [
  {
    icon: "/file.svg",
    title: "UI/UX Design",
    desc: "Modern, user-focused interfaces and experiences for web and mobile.",
    color: COLORS.card1,
  },
  {
    icon: "/window.svg",
    title: "Website Building",
    desc: "We craft beautiful, functional websites from the ground up, ensuring a seamless and impactful online presence for your business.",
    color: COLORS.card1,
  },
  {
    icon: "/globe.svg",
    title: "Responsive Design",
    desc: "Websites that look and work great on any device, any screen size.",
    color: COLORS.card1,
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slideCount = services.length;

  // Auto-scroll logic
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 3000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, slideCount]);

  // Navigation
  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  const next = () => setCurrent((prev) => (prev + 1) % slideCount);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-2xl" style={{ background: COLORS.secondary, padding: 0, height: 'clamp(220px, 30vh, 360px)' }}>
        <div
  className="flex transition-transform duration-700 ease-in-out items-stretch h-full"
  style={{
    transform: `translateX(-${current * 100}%)`,
    height: '100%'
  }}
>
          {services.map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full box-border px-6 py-10 flex flex-col items-center text-center gap-4"
              style={{ 
                background: COLORS.card1,
                height: 'clamp(220px, 30vh, 360px)',
                borderRadius: 24,
                boxShadow: `0 4px 24px 0 rgba(65,139,230,0.1), 0 0 0 1px rgba(65,139,230,0.1)`,
                transition: 'box-shadow 0.3s ease',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ 
                filter: `drop-shadow(0 0 8px ${COLORS.primary}66)`,
                transition: 'filter 0.3s ease'
               }}>
                <Image src={s.icon} alt={s.title} width={48} height={48} 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <h4 className="text-xl font-semibold tracking-wide" style={{ 
                color: COLORS.text,
                textShadow: `0 0 10px ${COLORS.primary}33`
              }}>{s.title}</h4>
              <p className="text-base max-w-xs" style={{ color: COLORS.textMuted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent text-[#418BE6] rounded-full p-2 transition-all duration-300 border-2 border-[#418BE6] hover:bg-transparent hover:text-[#E4002B] hover:border-[#E4002B]"
        style={{
          boxShadow: '0 0 10px rgba(65,139,230,0.3)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#E4002B';
          e.currentTarget.style.borderColor = '#E4002B';
          e.currentTarget.style.boxShadow = '0 0 10px #E4002B, 0 0 20px #E4002B66';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = '#418BE6';
          e.currentTarget.style.borderColor = '#418BE6';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(65,139,230,0.3)';
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" style={{
          filter: 'drop-shadow(0 0 3px #418BE6)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = 'drop-shadow(0 0 6px #E4002B)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = 'drop-shadow(0 0 3px #418BE6)';
        }}
        ><path d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-[#418BE6] rounded-full p-2 transition-all duration-300 border-2 border-[#418BE6] hover:bg-transparent hover:text-[#E4002B] hover:border-[#E4002B]"
        style={{
          boxShadow: '0 0 10px rgba(65,139,230,0.3)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#E4002B';
          e.currentTarget.style.borderColor = '#E4002B';
          e.currentTarget.style.boxShadow = '0 0 10px #E4002B, 0 0 20px #E4002B66';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = '#418BE6';
          e.currentTarget.style.borderColor = '#418BE6';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(65,139,230,0.3)';
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" style={{
          filter: 'drop-shadow(0 0 3px #418BE6)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = 'drop-shadow(0 0 6px #E4002B)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = 'drop-shadow(0 0 3px #418BE6)';
        }}
        ><path d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {services.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300`}
            style={{ 
              background: current === i ? COLORS.primary : 'transparent',
              border: `1.5px solid ${COLORS.primary}`,
              boxShadow: current === i ? `0 0 10px ${COLORS.primary}` : 'none'
            }}
          />
        ))}
      </div>
        </div>
  );
}

// We model projects as objects with 4 images each (first is main/default)
const PROJECT_PLACEHOLDERS = [
  "https://placehold.co/600x400/000000/418BE6?text=1",
  "https://placehold.co/300x180/000000/418BE6?text=2",
  "https://placehold.co/300x180/000000/418BE6?text=3",
  "https://placehold.co/300x180/000000/418BE6?text=4",
  "https://placehold.co/300x180/000000/418BE6?text=5",
  "https://placehold.co/300x180/000000/418BE6?text=6",
  "https://placehold.co/300x180/000000/418BE6?text=7",
  "https://placehold.co/300x180/000000/418BE6?text=8",
  "https://placehold.co/300x180/000000/418BE6?text=9",
];

const PROJECTS = PROJECT_PLACEHOLDERS.map((p, idx) => ({
  images: [
    p,
    `https://placehold.co/600x400/000000/418BE6?text=${idx + 10}`,
    `https://placehold.co/600x400/000000/418BE6?text=${idx + 20}`,
    `https://placehold.co/600x400/000000/418BE6?text=${idx + 30}`,
  ],
  title: `Project ${idx + 1}`,
  details: `This is a demo description for project ${idx + 1}.`,
  link: 'https://example.com',
}));

const NEON = {
  primary: "#418BE6",
  accent: "#E4002B",
  glow: "0 0 20px"
};

function RecentProjectsCarousel() {
  const total = PROJECTS.length;
  // start deterministic on server: assume desktop until mounted
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
  const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
  // set initial value on mount
  setIsMobile(window.innerWidth < 900);
  setIsMounted(true);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Autoplay for mobile carousel: 5s delay
  useEffect(() => {
    // Autoplay both on mobile and desktop to preserve rotation/auto-advance
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    if (!isPaused) {
      const intervalMs = isMobile ? 5000 : 3000; // desktop: 3s per your spec
      autoplayRef.current = window.setInterval(() => {
        setCurrent((c) => (c + 1) % total);
      }, intervalMs);
    }
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [isMobile, isPaused, total]);
  // Toggle pause/resume immediately on tap. Arrows/dots will resume autoplay when clicked.
  const handleTapPause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      if (next) {
        // paused: clear interval
        if (autoplayRef.current) {
          window.clearInterval(autoplayRef.current);
          autoplayRef.current = null;
        }
      } else {
        // resumed: interval will be set by effect
      }
      return next;
    });
  };

  const openModalAt = (idx: number) => {
    setModalIndex(idx);
    setModalOpen(true);
    // pause autoplay immediately
    setIsPaused(true);
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    // resume autoplay on close if mobile
    setIsPaused(false);
  };

  // Swipe handlers for touch support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (dx > threshold) {
      // swipe right -> prev
      setCurrent((c) => (c - 1 + total) % total);
    } else if (dx < -threshold) {
      // swipe left -> next
      setCurrent((c) => (c + 1) % total);
    }
    touchStartX.current = null;
  };

  // Manual nav (also resume autoplay)
  const goTo = (idx: number) => {
    setCurrent((idx + total) % total);
    setIsPaused(false);
  };

  // Desktop grid rendering (unchanged)
  if (!isMobile) {
    // reuse previous grid logic
    const getGrid = () => ([
      {row:1,col:1,span:2,style:{gridRow:'1/3',gridColumn:'1/3'}}, // big
      {row:1,col:3,span:1,style:{gridRow:'1/2',gridColumn:'3/4'}},
      {row:1,col:4,span:1,style:{gridRow:'1/2',gridColumn:'4/5'}},
      {row:2,col:3,span:1,style:{gridRow:'2/3',gridColumn:'3/4'}},
      {row:2,col:4,span:1,style:{gridRow:'2/3',gridColumn:'4/5'}},
      {row:3,col:1,span:1,style:{gridRow:'3/4',gridColumn:'1/2'}},
      {row:3,col:2,span:1,style:{gridRow:'3/4',gridColumn:'2/3'}},
      {row:3,col:3,span:1,style:{gridRow:'3/4',gridColumn:'3/4'}},
      {row:3,col:4,span:1,style:{gridRow:'3/4',gridColumn:'4/5'}},
    ]);
    const grid = getGrid();
    return (
      <>
        <div
          className="w-full mx-auto"
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(3, 140px)',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            maxWidth: 1200,
            minHeight: 440,
            position: 'relative',
          }}
        >
          {grid.map((g, idx) => {
            // rotate images so they shift forward as `current` increments
            const imgIdx = (idx + current) % total;
            // big spot is idx===0, last spot is idx===grid.length-1 (subtle zoom-out)
            const lastIdx = grid.length - 1;
            const isBigSpot = idx === 0;
            const isLastSpot = idx === lastIdx;
            let style: any = {
              ...g.style,
              transition: 'transform 0.7s cubic-bezier(.7,.2,.2,1), box-shadow 0.7s, border-color 0.3s, box-shadow 0.3s, opacity 0.5s',
              zIndex: isBigSpot ? 3 : 1,
              boxShadow: isBigSpot ? '0 12px 48px rgba(65,139,230,0.22)' : '0 2px 16px 0 #0C1D3222',
              cursor: 'pointer',
              transform: isBigSpot ? 'scale(1.06) translateY(-10px)' : isLastSpot ? 'scale(0.96) translateY(4px)' : 'scale(1) translateY(0)'
            };
            return (
              <div
                key={idx}
                style={style}
                className="rounded-2xl overflow-hidden bg-[#0C1D32]"
                onClick={() => openModalAt(imgIdx)}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `2px solid ${COLORS.primary}`;
                  el.style.boxShadow = `0 0 20px ${COLORS.primary}`;
                  el.style.transition = 'box-shadow 0.3s, border-color 0.3s';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = 'none';
                  el.style.boxShadow = isBigSpot ? '0 12px 48px rgba(65,139,230,0.22)' : '0 2px 16px 0 #0C1D3222';
                }}
              >
                <img src={PROJECTS[imgIdx]?.images?.[0] ?? PROJECT_PLACEHOLDERS[imgIdx]} alt={`Project ${imgIdx+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 16, transition: 'transform 0.7s, opacity 0.5s' }} />
              </div>
            );
          })}
        </div>
        {isMounted && (
          <ProjectModal open={modalOpen} project={PROJECTS[modalIndex] ?? null} onClose={closeModal} />
        )}
      </>
    );
  }

  // Mobile carousel rendering
  return (
    <div className="w-full mx-auto relative" style={{ maxWidth: 900, height: 440, overflow: 'hidden' }} ref={containerRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)`, height: '100%' }}>
            {PROJECTS.map((proj, i) => (
              <div key={i} className="flex-shrink-0 w-full h-full rounded-2xl overflow-hidden p-2" style={{ boxSizing: 'border-box' }} onClick={() => openModalAt(i)}>
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#0C1D32]" style={{ height: '100%' }}>
                  <img src={proj.images[0]} alt={`Project ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            ))}
      </div>

      {/* Arrows */}
  <button aria-label="Prev" onClick={() => { setCurrent((c) => (c - 1 + total) % total); setIsPaused(false); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent text-[#418BE6] rounded-full p-2 transition-all duration-300 border-2 border-[#418BE6] hover:bg-transparent hover:text-[#E4002B] hover:border-[#E4002B]" style={{ boxShadow: '0 0 10px rgba(65,139,230,0.3)' }}>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 3px #418BE6)' }}><path d="M15 19l-7-7 7-7" /></svg>
      </button>
  <button aria-label="Next" onClick={() => { setCurrent((c) => (c + 1) % total); setIsPaused(false); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-[#418BE6] rounded-full p-2 transition-all duration-300 border-2 border-[#418BE6] hover:bg-transparent hover:text-[#E4002B] hover:border-[#E4002B]" style={{ boxShadow: '0 0 10px rgba(65,139,230,0.3)' }}>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 3px #418BE6)' }}><path d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4 absolute left-1/2 -translate-x-1/2 bottom-4">
        {PROJECTS.map((_, i) => (
          <button key={i} aria-label={`Go to ${i+1}`} onClick={() => { goTo(i); }} className={`w-3 h-3 rounded-full transition-all duration-300`} style={{ background: current === i ? COLORS.primary : 'transparent', border: `1.5px solid ${COLORS.primary}`, boxShadow: current === i ? `0 0 10px ${COLORS.primary}` : 'none' }} />
        ))}
      </div>
      {/* Modal for project details */}
      {/* Import dynamically to avoid server-side issues */}
      {isMounted && (
        <ProjectModal open={modalOpen} project={PROJECTS[modalIndex] ?? null} onClose={closeModal} />
      )}
    </div>
  );
}

// helper to map index safely for desktop grid (keeps previous rotation behavior)
function orderAtIndex(idx: number, total: number) {
  // simple mapping: use idx (bounded)
  return idx % total;
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (inView) setKey(prev => prev + 1);
  }, [inView]);

  return (
    <div className="font-sans min-h-screen" style={{ background: COLORS.dark1 }}>
      <NeonParallaxBackground />
      <Header />
      {/* Hero Section */}
      <section id="home"
        ref={ref}
        className="w-full flex flex-col items-center justify-center text-center relative py-16 md:py-24"
        style={{
          background: COLORS.dark1,
          boxShadow: `0 0 40px rgba(65, 139, 230, 0.1)`,
        }}
      >
        <div className="max-w-5xl w-full px-4 md:px-6 overflow-hidden">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-white whitespace-nowrap"
              style={{
                textShadow: `0 0 10px ${COLORS.primary}, 0 0 20px ${COLORS.primary}33`,
                transition: 'text-shadow 0.3s ease-in-out',
                maxWidth: '100%'
              }}>
            Hi, I am{' '}
            <span style={{ 
              color: COLORS.primary, 
              textShadow: `0 0 10px ${COLORS.primary}, 0 0 20px ${COLORS.primary}66`,
              display: 'inline-block'
            }}>
              <TypeAnimation
                key={key}
                sequence={['Clarence Xavier G. Escoto', 1200, '', 500]}
                speed={50}
                deletionSpeed={50}
                repeat={Infinity}
                cursor={true}
                style={{ 
                  display: 'inline-block', 
                  fontWeight: 'bold', 
                  fontSize: 'inherit', 
                  color: COLORS.primary 
                }}
              />
            </span>
          </h1>
          <p className="text-lg sm:text-xl mb-6 text-[#CCCCCC] leading-relaxed"
             style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            I am a frontend developer. I can provide clean code and pixel perfect design.<br />
            I also make websites more interactive with web animations.
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="text-[#FFFBFC]/80 hover:text-[#FFFBFC] transition">
              <svg width="24" height="24" fill="none" stroke={COLORS.primary} strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
            </a>
            <a href="#" className="text-[#FFFBFC]/80 hover:text-[#FFFBFC] transition">
              <svg width="24" height="24" fill="none" stroke={COLORS.primary} strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            </a>
            <a href="#" className="text-[#FFFBFC]/80 hover:text-[#FFFBFC] transition">
              <svg width="24" height="24" fill="none" stroke={COLORS.primary} strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 12h-4V8" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-16 px-4" style={{ background: COLORS.dark2 }}>
        <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg" 
               style={{ 
                 background: COLORS.dark1,
                 boxShadow: `0 0 30px ${COLORS.primary}33`
               }}>
            <div className="w-56 h-64 flex items-center justify-center">
              <Image
                src="/assets/ESCOTO_5R.png"
                alt="Profile"
                width={170}
                height={170}
                className="rounded-xl object-cover"
                style={{
                  border: `2px solid ${COLORS.primary}33`,
                  boxShadow: `0 0 20px ${COLORS.primary}33`
                }}
              />
            </div>
          </div>
          <div className="flex-1 text-white min-w-0">
            <h2 className="text-2xl font-bold mb-2" 
                style={{ 
                  color: COLORS.primary,
                  textShadow: `0 0 10px ${COLORS.primary}66`
                }}>ABOUT ME</h2>
            <div className="rounded-lg p-6 mb-4" 
                 style={{ 
                   background: COLORS.card1,
                   boxShadow: `0 0 30px ${COLORS.primary}22, 0 0 0 1px ${COLORS.primary}33`,
                   boxSizing: 'border-box'
                 }}>
              <h3 className="text-xl font-semibold mb-1 text-white">Hi There! I'm Clarence Xavier G. Escoto</h3>
              <p className="mb-4" style={{ color: COLORS.primary }}>Front-End Developer</p>
              <p className="mb-4 text-[#CCCCCC]" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                I am a Front-End Developer with a strong focus on building seamless, user-friendly digital experiences. I combine creativity and code to craft interfaces that not only look great but also engage users and leave a lasting impact.
              </p>
              <ul className="text-sm grid grid-cols-2 gap-x-6 gap-y-1 mb-4" style={{ minWidth: 0 }}>
                {[
                  ['Birthday', 'Feb 26, 2003'],
                  ['Phone', '+639661335879'],
                  ['From', 'General Trias, Cavite'],
                  ['Email', 'clarence.sco26@gmail.com'],
                  ['Language', 'English, Filipino'],
                  ['Freelance', 'Available'],
                ].map(([label, value]) => (
                  <li key={label} className="text-[#CCCCCC]" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', minWidth: 0 }}>
                    <span className="font-semibold" style={{ color: COLORS.primary }}>{label}:</span> {value}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-block px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:bg-transparent hover:text-[#E4002B] border-2 border-transparent hover:border-[#E4002B]"
                style={{
                  background: COLORS.primary,
                  boxShadow: `0 0 20px ${COLORS.primary}66`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#E4002B';
                  e.currentTarget.style.color = '#E4002B';
                  e.currentTarget.style.textShadow = '0 0 10px #E4002B';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(228,0,43,0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = COLORS.primary;
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.primary}66`;
                }}
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-16 px-4" style={{ background: COLORS.dark1 }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center tracking-wide"
              style={{ 
                color: COLORS.primary,
                textShadow: `0 0 10px ${COLORS.primary}66`
              }}>SERVICES</h2>
          <Carousel />
        </div>
      </section>

      {/* Recent Projects Section */}
      <section id="projects" className="w-full py-16 px-4" style={{ background: COLORS.dark2 }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center tracking-wider"
              style={{ 
                color: COLORS.primary,
                textShadow: `0 0 15px ${COLORS.primary}66`,
                letterSpacing: '0.15em'
              }}>
            RECENT PROJECTS
          </h2>
                    <RecentProjectsCarousel />
        </div>
      </section>

      {/* Footer */}
          <Footer />
        </div>
      );
    }
