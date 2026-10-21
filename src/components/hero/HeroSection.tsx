import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { HeroPortraitReveal } from './HeroPortraitReveal';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
  motionReduced?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, motionReduced = false }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D Interactive Background Centerpiece with Integrated 3D Personal Portrait */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Hero3DCanvas />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Editorial Topline Banner (Inspired by Sarthak Sharma) */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-surface-border text-xs font-mono text-zinc-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="tracking-widest uppercase text-zinc-300">
              ENGINEER · FULL-STACK DEVELOPER · AI BUILDER
            </span>
          </div>
          <span className="tracking-widest uppercase text-zinc-500">
            MANGALURU, INDIA · VTU &apos;27
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-surface-border backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                {PERSONAL_INFO.statusLabel}
              </span>
            </div>

            {/* Oversized Name with Italic Serif Accent */}
            <div className="space-y-1">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-lime font-semibold block">
                Portfolio &amp; Engineering Work
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-zinc-100 uppercase leading-[0.92]">
                Mazhar
                <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                  husain
                </span>
                <br />
                <span className="text-lime text-glow-lime">Shaikh</span>
              </h1>
            </div>

            {/* Main Headline */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-zinc-200 max-w-xl xl:max-w-2xl leading-snug">
              &ldquo;{PERSONAL_INFO.subHeadline}&rdquo;
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl xl:max-w-2xl leading-relaxed font-light">
              {PERSONAL_INFO.bioHero}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-black bg-lime hover:bg-lime-hover shadow-[0_0_25px_rgba(204,255,0,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-zinc-200 bg-dark-900/90 hover:bg-dark-850 border border-surface-border hover:border-zinc-500 backdrop-blur-sm transition-all transform hover:-translate-y-0.5"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-4 h-4 text-lime" />
              </button>
            </div>

            {/* Secondary Profile Links */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-zinc-400 border-t border-zinc-800/60 max-w-lg">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-lime transition-colors group"
              >
                <Github className="w-4 h-4 text-zinc-400 group-hover:text-lime transition-colors" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-lime transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-lime transition-colors" />
                <span>LinkedIn</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 text-zinc-400 hover:text-lime transition-colors group"
              >
                <Mail className="w-4 h-4 text-zinc-400 group-hover:text-lime transition-colors" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Portrait with Razorpay-Inspired Character & Wave Reveal */}
          <div className="flex lg:col-span-5 items-center justify-center relative z-20 w-full py-4 lg:py-0">
            <HeroPortraitReveal motionReduced={motionReduced} />
          </div>
        </div>

        {/* Small Scroll Indicator */}
        <div className="pt-12 flex flex-col items-center justify-center text-zinc-400 font-mono text-xs">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 hover:text-lime transition-colors group"
          >
            <span className="tracking-widest uppercase text-[10px]">Scroll To Discover</span>
            <div className="w-5 h-8 rounded-full border border-zinc-700 group-hover:border-lime flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 bg-lime rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
