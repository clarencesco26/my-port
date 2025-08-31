
'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

const COLORS = {
  primary: "#007AAD",      // blue
  secondary: "#D9E2E9",   // light gray-blue
  accent: "#FFFBFC",      // off-white
  dark1: "#0C1D32",       // dark navy
  dark2: "#D9E2E9",       // use as light section bg
  card1: "#FFFFFF",       // white for card bg
  card2: "#F5F8FA",       // very light gray for card bg
  card3: "#D9E2E9",       // light gray-blue for card bg
  highlight: "#007AAD",   // blue for highlights
  button: "#007AAD",      // blue for buttons
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
    title: "Product Design",
    desc: "End-to-end product design, from concept to launch, with a focus on usability.",
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
    }, 3500);
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
      <div className="overflow-hidden rounded-2xl" style={{ background: COLORS.secondary }}>
        <div
  className="flex transition-transform duration-700 ease-in-out"
  style={{
    transform: `translateX(-${current * 100}%)`,
  }}
>
          {services.map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 min-w-full px-6 py-10 flex flex-col items-center text-center gap-4 shadow-lg"
              style={{ background: s.color, minHeight: 260, borderRadius: 24, boxShadow: '0 4px 24px 0 rgba(12,29,50,0.08)' }}
            >
              <Image src={s.icon} alt={s.title} width={48} height={48} />
              <h4 className="text-xl font-semibold text-[#0C1D32] tracking-wide">{s.title}</h4>
              <p className="text-[#0C1D32]/80 text-base max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
  className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#FFF] hover:bg-[#D9E2E9] text-[#007AAD] rounded-full p-2 transition border-2 border-[#007AAD]"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        aria-label="Next"
        onClick={next}
  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFF] hover:bg-[#D9E2E9] text-[#007AAD] rounded-full p-2 transition border-2 border-[#007AAD]"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {services.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === i ? 'bg-[#007AAD]' : 'bg-[#D9E2E9]'}`}
            style={{ border: '1.5px solid #007AAD' }}
          />
        ))}
      </div>
    </div>
  );
}

const PROJECT_PLACEHOLDERS = [
  "https://placehold.co/600x400/0C1D32/FFF?text=1",
  "https://placehold.co/300x180/007AAD/FFF?text=2",
  "https://placehold.co/300x180/007AAD/FFF?text=3",
  "https://placehold.co/300x180/007AAD/FFF?text=4",
  "https://placehold.co/300x180/007AAD/FFF?text=5",
  "https://placehold.co/300x180/007AAD/FFF?text=6",
  "https://placehold.co/300x180/007AAD/FFF?text=7",
  "https://placehold.co/300x180/007AAD/FFF?text=8",
  "https://placehold.co/300x180/007AAD/FFF?text=9",
];

const NEON = "#007AAD";

function RecentProjectsCarousel() {
  const [order, setOrder] = useState([0,1,2,3,4,5,6,7,8]);
  const [animating, setAnimating] = useState(false);
  const [zooming, setZooming] = useState({inIdx: 1, outIdx: 0});
  const timeoutRef = useRef<any>(null);

  // Animation logic
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setZooming({inIdx: 1, outIdx: 0});
      setTimeout(() => {
        setOrder((prev) => {
          const next = [...prev];
          const first = next.shift();
          if (typeof first === 'number') next.push(first);
          return next;
        });
        setAnimating(false);
      }, 700); // match transition duration
    }, 3000);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [order]);

  // Responsive layout
  const getGrid = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 900) {
      // Mobile/tablet: show 4 images, 2x2 grid
      return ([
        {row:1,col:1,span:2,style:{gridRow:'1/3',gridColumn:'1/3'}},
        {row:1,col:3,span:1,style:{gridRow:'1/2',gridColumn:'3/4'}},
        {row:2,col:3,span:1,style:{gridRow:'2/3',gridColumn:'3/4'}},
        {row:3,col:1,span:1,style:{gridRow:'3/4',gridColumn:'1/2'}},
      ]);
    }
    // Desktop: 9 images, big left
    return ([
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
  }, []);

  // Neon hover effect
  const [hovered, setHovered] = useState<number | null>(null);

  // Render
  const grid = getGrid();
  return (
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
        const imgIdx = order[idx] ?? idx;
        let transition = 'transform 0.7s cubic-bezier(.7,.2,.2,1), box-shadow 0.3s';
        let style: any = {
          ...g.style,
          transition,
          zIndex: idx === 0 ? 2 : 1,
          boxShadow: hovered === idx ? `0 0 0 4px ${NEON}, 0 0 16px 2px ${NEON}` : '0 2px 16px 0 #0C1D3222',
          cursor: 'pointer',
        };
        if (animating && idx === 0) style.transform = 'scale(0.95)';
        if (animating && idx === 1) style.transform = 'scale(1.08)';
        return (
          <div
            key={idx}
            style={style}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className="rounded-2xl overflow-hidden bg-[#0C1D32]"
          >
            <img
              src={PROJECT_PLACEHOLDERS[imgIdx]}
              alt={`Project ${imgIdx+1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 16,
                transition: 'filter 0.3s',
                filter: hovered === idx ? 'brightness(1.1) saturate(1.2)' : 'none',
                background: '#0C1D32',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className="font-sans min-h-screen" style={{ background: COLORS.dark1 }}>
      {/* Hero Section */}
      <header
        className="w-full flex flex-col items-center justify-center text-center relative py-16 md:py-24"
        style={{
          background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.dark1} 100%)`,
        }}
      >
        <div className="max-w-4xl w-full px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[#FFFBFC]">
            Hi, I am <span style={{ color: COLORS.primary }}>Clarence Xavier G. Escoto</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6 text-[#D9E2E9]">
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
      </header>

      {/* About Section */}
      <section className="w-full py-16 px-4" style={{ background: COLORS.secondary }}>
        <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="w-56 h-64 flex items-center justify-center">
              <Image
                src="/assets/ESCOTO_5R.png"
                alt="Profile"
                width={170}
                height={170}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
          <div className="flex-1 text-[#0C1D32]">
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>ABOUT ME</h2>
            <div className="bg-[#FFFBFC] rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-1">Hi There! I'm Clarence Xavier G. Escoto</h3>
              <p className="mb-4" style={{ color: COLORS.primary }}>Visual Designer</p>
              <p className="mb-4">
                I am a Visual Designer with a strong focus on digital branding. Visual design helps to express, attract, 
                create emotion and convince people to engage with brands, always leaving a fantastic impact.
              </p>
              <ul className="text-sm grid grid-cols-2 gap-x-6 gap-y-1 mb-4">
                {[
                  ['Birthday', 'Feb 26, 2003'],
                  ['Phone', '+639661335879'],
                  ['From', 'General Trias, Cavite'],
                  ['Email', 'clarence.sco26@gmail.com'],
                  ['Language', 'English, Filipino'],
                  ['Freelance', 'Available'],
                ].map(([label, value]) => (
                  <li key={label}>
                    <span className="font-semibold" style={{ color: COLORS.primary }}>{label}:</span> {value}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-block px-6 py-2 rounded-full font-semibold text-white"
                style={{ background: COLORS.primary }}
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16 px-4" style={{ background: COLORS.dark1 }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: COLORS.primary }}>SERVICES</h2>
          <Carousel />
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="w-full py-16 px-4" style={{ background: COLORS.secondary }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: COLORS.primary, letterSpacing: 2 }}>
            RECENT PROJECTS
          </h2>
          <RecentProjectsCarousel />
        </div>
      </section>
    </div>
  );
}
