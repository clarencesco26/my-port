'use client';

import { FC } from 'react';

// Color constants to match your theme
const COLORS = {
  primary: "#418BE6",      // neon blue
  dark1: "#000000",       // pure black
  dark2: "#111111",       // slightly lighter black
  text: "#FFFFFF",        // white text
  textMuted: "#CCCCCC",   // muted text
};

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = ['Home', 'About', 'Services', 'Projects'];
  
  return (
    <footer className="w-full pt-16 pb-8"
      style={{
        background: `linear-gradient(180deg, ${COLORS.dark2} 0%, ${COLORS.dark1} 100%)`,
        boxShadow: `0 -10px 30px ${COLORS.primary}11`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold"
                style={{
                  color: COLORS.primary,
                  textShadow: `0 0 10px ${COLORS.primary}66`
                }}>
              Work With Us
            </h2>
            <p className="text-[#CCCCCC] leading-relaxed">
              Collaboration starts with a simple message. Our team will listen, understand your goals, and bring the right people together to deliver results.
            </p>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className="text-[#CCCCCC] hover:text-white transition-all duration-300 relative group text-left"
                >
                  <span className="relative">
                    {link}
                    <span 
                      className="absolute -bottom-0.5 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"
                      style={{ boxShadow: `0 0 10px ${COLORS.primary}` }}
                    />
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <div className="space-y-3">
                <p className="flex items-center space-x-2">
                  <span className="text-[#CCCCCC]">Email:</span>
                  <a 
                    href="mailto:Clarence.sco26@gmail.com"
                    className="text-white hover:text-[#418BE6] transition-all duration-300"
                    style={{
                      textShadow: '0 0 0 transparent',
                    }}
                    onMouseEnter={e => e.currentTarget.style.textShadow = `0 0 10px ${COLORS.primary}66`}
                    onMouseLeave={e => e.currentTarget.style.textShadow = '0 0 0 transparent'}
                  >
                    Clarence.sco26@gmail.com
                  </a>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-[#CCCCCC]">Phone:</span>
                  <a 
                    href="tel:+639929607332"
                    className="text-white hover:text-[#418BE6] transition-all duration-300"
                    style={{
                      textShadow: '0 0 0 transparent',
                    }}
                    onMouseEnter={e => e.currentTarget.style.textShadow = `0 0 10px ${COLORS.primary}66`}
                    onMouseLeave={e => e.currentTarget.style.textShadow = '0 0 0 transparent'}
                  >
                    +639929607332
                  </a>
                </p>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#418BE6] transition-all duration-300 transform hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 0 0 transparent)',
                }}
                onMouseEnter={e => e.currentTarget.style.filter = `drop-shadow(0 0 5px ${COLORS.primary})`}
                onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)'}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#418BE6] transition-all duration-300 transform hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 0 0 transparent)',
                }}
                onMouseEnter={e => e.currentTarget.style.filter = `drop-shadow(0 0 5px ${COLORS.primary})`}
                onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)'}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="mailto:Clarence.sco26@gmail.com"
                className="text-white hover:text-[#418BE6] transition-all duration-300 transform hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 0 0 transparent)',
                }}
                onMouseEnter={e => e.currentTarget.style.filter = `drop-shadow(0 0 5px ${COLORS.primary})`}
                onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-white/10">
          <p className="text-center text-sm text-[#CCCCCC]">
            © {new Date().getFullYear()} Clarence Xavier G. Escoto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
