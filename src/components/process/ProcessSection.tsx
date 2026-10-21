import React from 'react';
import { Lightbulb, Compass, Hammer, Repeat } from 'lucide-react';
import { WORK_PROCESS } from '../../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Lightbulb className="w-5 h-5 text-lime" />;
      case 1:
        return <Compass className="w-5 h-5 text-lime" />;
      case 2:
        return <Hammer className="w-5 h-5 text-lime" />;
      case 3:
        return <Repeat className="w-5 h-5 text-lime" />;
      default:
        return <Lightbulb className="w-5 h-5 text-lime" />;
    }
  };

  return (
    <section id="process" className="relative py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-surface-border gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                04 / Engineering Methodology
              </span>
              <div className="h-[1px] w-12 bg-lime/40" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-zinc-100 uppercase tracking-tight">
              How I <span className="text-lime text-glow-lime">Work</span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-mono max-w-md leading-relaxed">
            My practical approach to decomposing requirements, developing working prototypes, and refining software through continuous learning.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          {WORK_PROCESS.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <span className="font-mono font-bold text-2xl text-lime">
                    {step.step}
                  </span>
                  <div className="p-2 rounded-lg bg-dark-950 border border-surface-border">
                    {getStepIcon(idx)}
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-zinc-100 mt-4 mb-1">
                  {step.title}
                </h3>
                
                <span className="font-mono text-[11px] text-lime/80 block mb-3">
                  {step.short}
                </span>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Deliverable tag */}
              <div className="pt-4 mt-6 border-t border-zinc-800/60">
                <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">
                  Outcome Focus
                </span>
                <span className="font-mono text-xs text-zinc-300">
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Statement Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-surface-border text-center max-w-3xl mx-auto">
          <blockquote className="text-base sm:text-lg text-zinc-200 font-light italic leading-relaxed">
            &ldquo;I believe in writing understandable code, learning through practical implementation, and prioritizing clean interfaces so that software actually solves real-world needs.&rdquo;
          </blockquote>
          <div className="mt-4 font-mono text-xs text-lime uppercase tracking-widest">
            — Mazhar Husain Shaikh · Core Development Mindset
          </div>
        </div>
      </div>
    </section>
  );
};
