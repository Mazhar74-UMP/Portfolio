import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText, Play, Pause } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  motionReduced: boolean;
  onToggleMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, motionReduced, onToggleMotion }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Process', href: '#process' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-surface-border py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark with Serif Accent */}
          <a
            href="#"
            className="group flex items-center gap-3 text-zinc-100 hover:text-lime transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-dark-900 border border-surface-border flex items-center justify-center font-mono font-bold text-xs text-lime group-hover:border-lime/50 transition-colors">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight uppercase">
                Mazhar <span className="font-serif italic lowercase font-normal text-base text-lime">husain</span> Shaikh
              </span>
              <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                CSE · CLASS OF 2027
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-lime transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-lime transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs + Motion Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Motion Toggle Button (Inspired by Sarthak Sharma) */}
            <button
              onClick={onToggleMotion}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono tracking-wider uppercase text-zinc-400 bg-dark-900/80 hover:text-zinc-200 border border-surface-border transition-all"
              title={motionReduced ? "Enable animations" : "Reduce animations"}
            >
              {motionReduced ? <Play className="w-3 h-3 text-lime" /> : <Pause className="w-3 h-3 text-zinc-400" />}
              <span>{motionReduced ? 'MOTION OFF' : 'MOTION ON'}</span>
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono tracking-wider uppercase text-zinc-300 bg-dark-900 hover:bg-dark-850 border border-surface-border hover:border-zinc-700 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-lime" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono font-semibold tracking-wider uppercase text-black bg-lime hover:bg-lime-hover shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-dark-900 border border-surface-border text-zinc-300 hover:text-lime"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950/98 backdrop-blur-xl border-b border-surface-border px-6 py-6 space-y-4">
          <div className="space-y-3 pb-4 border-b border-zinc-800">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-mono text-sm uppercase tracking-wider text-zinc-300 hover:text-lime py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-mono uppercase bg-dark-900 border border-surface-border text-zinc-300"
            >
              <FileText className="w-4 h-4 text-lime" />
              View Resume
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-mono font-semibold uppercase bg-lime text-black"
            >
              Contact Mazhar
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
