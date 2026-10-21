import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail, MapPin, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat('en-IN', options).format(now);
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-surface-border bg-dark-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-800/80">
          {/* Identity & Ambition */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-lime box-glow-lime animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-lime">
                Open for Opportunities
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-zinc-100 tracking-tight">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              Final-year Computer Science & Engineering student at P. A. College of Engineering (VTU), Mangaluru. Focused on full-stack software development, structured backend logic, and AI-powered systems.
            </p>
            
            {/* Live Location & Local Time */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-900 border border-surface-border">
                <MapPin className="w-3.5 h-3.5 text-lime" />
                Mangaluru, Karnataka, India
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-900 border border-surface-border">
                <Clock className="w-3.5 h-3.5 text-lime" />
                {currentTime ? `${currentTime} IST` : 'IST Zone'}
              </span>
            </div>
          </div>

          {/* Quick Links & Socials */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Navigation
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <a href="#about" className="text-zinc-400 hover:text-lime transition-colors">
                  01. About Me
                </a>
              </li>
              <li>
                <a href="#projects" className="text-zinc-400 hover:text-lime transition-colors">
                  02. Selected Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-zinc-400 hover:text-lime transition-colors">
                  03. Technical Stack
                </a>
              </li>
              <li>
                <a href="#process" className="text-zinc-400 hover:text-lime transition-colors">
                  04. Engineering Process
                </a>
              </li>
              <li>
                <a href="#education" className="text-zinc-400 hover:text-lime transition-colors">
                  05. Education & Milestones
                </a>
              </li>
              <li>
                <a href="#contact" className="text-zinc-400 hover:text-lime transition-colors">
                  06. Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Verified Profiles
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-lime transition-colors p-2 rounded bg-dark-900 border border-surface-border hover:border-lime/30"
              >
                <Github className="w-4 h-4 text-lime" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-lime transition-colors p-2 rounded bg-dark-900 border border-surface-border hover:border-lime/30"
              >
                <Linkedin className="w-4 h-4 text-lime" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2.5 text-zinc-300 hover:text-lime transition-colors p-2 rounded bg-dark-900 border border-surface-border hover:border-lime/30"
              >
                <Mail className="w-4 h-4 text-lime" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 font-mono text-center sm:text-left">
            &copy; {new Date().getFullYear()} Mazhar Husain Shaikh. All accurate details verified.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
              React · Three.js · Tailwind
            </span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900 border border-surface-border hover:border-lime text-xs font-mono text-zinc-300 hover:text-lime transition-all"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
