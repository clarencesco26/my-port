'use client';

import { useState, useEffect } from 'react';

// Color constants from your theme
const COLORS = {
  primary: "#418BE6",      // neon blue
  accent: "#E4002B",      // neon red
  dark1: "#000000",       // pure black
  dark2: "#111111",       // slightly lighter black
  text: "#FFFFFF",        // white text
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;

    const doScroll = () => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (isMobileViewport && isMenuOpen) {
      // Close menu first so body scroll is restored, then scroll
      setIsMenuOpen(false);
      // wait a tick for the effect to restore scroll position, then animate
      setTimeout(() => {
        doScroll();
      }, 60);
    } else {
      doScroll();
      // ensure the mobile menu closes if called programmatically
      setIsMenuOpen(false);
    }
  };

  // lock body scroll when mobile menu is open while preserving current scroll position
  useEffect(() => {
    let scrollY = 0;
    if (isMenuOpen) {
      scrollY = window.scrollY || document.documentElement.scrollTop;
      // lock body in place
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // restore
      const top = document.body.style.top;
      if (top) {
        const prevScroll = -parseInt(top || '0', 10) || 0;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, prevScroll);
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      // cleanup in case component unmounts while menu open
      const top = document.body.style.top;
      if (top) {
        const prevScroll = -parseInt(top || '0', 10) || 0;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, prevScroll);
      } else {
        document.body.style.overflow = '';
      }
    };
  }, [isMenuOpen]);

  // close on ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-black/90 backdrop-blur-sm' : 'py-4 bg-transparent'
      }`}
      style={{
        boxShadow: isScrolled ? `0 0 20px ${COLORS.primary}22` : 'none',
      }}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#"
          className="text-2xl font-bold text-white tracking-wider"
          style={{
            textShadow: `0 0 10px ${COLORS.primary}66`,
          }}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          CLARENCE
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Services', 'Projects'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-white/90 hover:text-[#E4002B] transition-all duration-300 relative group"
              style={{
                textShadow: '0 0 0 transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#E4002B';
                e.currentTarget.style.textShadow = '0 0 10px #E4002B, 0 0 20px #E4002B66';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.textShadow = '0 0 0 transparent';
              }}
            >
              {item}
              <span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E4002B] transition-all duration-300 group-hover:w-full"
                style={{ boxShadow: `0 0 10px #E4002B` }}
              />
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection('contact');
              setIsMenuOpen(false);
            }}
            className="px-4 py-2 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-transparent hover:text-[#E4002B] border-2 border-transparent hover:border-[#E4002B]"
            style={{
              background: COLORS.primary,
              boxShadow: `0 0 20px ${COLORS.primary}33`,
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
              e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.primary}33`;
            }}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(prev => !prev); }}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`} />
            <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu-overlay"
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: '#000' }}
        onClick={() => setIsMenuOpen(false)}
      >
        <aside
          id="mobile-menu"
          className={`fixed left-0 top-0 h-full bg-[#0b0b0b] shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ width: 'min(85vw, 320px)' }}
          onClick={e => e.stopPropagation()}
          aria-hidden={!isMenuOpen}
        >
          <div className="relative h-full flex flex-col">
            <button aria-label="Close menu" className="absolute right-3 top-3 text-white p-2" onClick={() => setIsMenuOpen(false)}>✕</button>
            <div className="mt-12 px-4 flex-1 flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Projects'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white/90 hover:text-[#E4002B] py-2 px-4 transition-all duration-300 text-left"
                  style={{ textShadow: '0 0 0 transparent' }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="px-4 pb-8">
              <button
                onClick={() => {
                  scrollToSection('contact');
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 rounded-full text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-transparent hover:text-[#E4002B] border-2 border-transparent hover:border-[#E4002B]"
                style={{ background: COLORS.primary, boxShadow: `0 0 20px ${COLORS.primary}33` }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}