import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const ProofStrip: React.FC = () => {
  return (
    <section aria-label="Verified highlights" className="relative z-10 border-y border-surface-border bg-dark-900/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {/* Metric 1 */}
          <div className="border-l-2 border-lime pl-4">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-100 flex items-baseline gap-1">
              <span>{PERSONAL_INFO.cgpa}</span>
              <span className="font-mono text-xs text-lime">/ 10.0</span>
            </div>
            <p className="font-mono text-xs text-zinc-400 mt-0.5">
              Current CGPA · VTU Affiliated
            </p>
          </div>

          {/* Metric 2 */}
          <div className="border-l-2 border-zinc-700 pl-4">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-100 flex items-baseline gap-1">
              <span>Top 5</span>
              <span className="font-mono text-xs text-lime">Finalist</span>
            </div>
            <p className="font-mono text-xs text-zinc-400 mt-0.5">
              NEXATHON 2025 · 24h Hackathon
            </p>
          </div>

          {/* Metric 3 */}
          <div className="border-l-2 border-zinc-700 pl-4">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-100 flex items-baseline gap-1">
              <span>2027</span>
              <span className="font-mono text-xs text-zinc-500">B.E. CSE</span>
            </div>
            <p className="font-mono text-xs text-zinc-400 mt-0.5">
              Final-Year Student · PACE Mangaluru
            </p>
          </div>

          {/* Action Link */}
          <a
            href="#projects"
            className="group p-3 rounded-xl bg-dark-950/80 border border-surface-border hover:border-lime/40 transition-all flex items-center justify-between"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-lime block">
                Selected Work
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-zinc-200 group-hover:text-white transition-colors">
                Explore The Projects
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
