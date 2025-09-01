'use client';

import { useState, useEffect } from 'react';

// Color constants from your theme
const COLORS = {
  primary: "#418BE6",      // neon blue
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

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
              className="text-white/90 hover:text-white transition-all duration-300 relative group"
            >
              {item}
              <span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"
                style={{ boxShadow: `0 0 10px ${COLORS.primary}` }}
              />
            </button>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full text-white transition-all duration-300
                     hover:scale-105 hover:shadow-lg"
            style={{
              background: COLORS.primary,
              boxShadow: `0 0 20px ${COLORS.primary}33`,
            }}
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
        className={`md:hidden fixed inset-x-0 bg-black/95 backdrop-blur-md transition-all duration-300 ${
          isMenuOpen ? 'top-[calc(100%+0px)] opacity-100' : 'top-[-100%] opacity-0'
        }`}
        style={{
          boxShadow: `0 10px 20px ${COLORS.primary}22`,
        }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {['Home', 'About', 'Services', 'Projects'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-white/90 hover:text-white py-2 px-4 transition-colors duration-300 text-left"
            >
              {item}
            </button>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full text-white text-center transition-all duration-300
                     hover:scale-105 hover:shadow-lg"
            style={{
              background: COLORS.primary,
              boxShadow: `0 0 20px ${COLORS.primary}33`,
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
}
