import React, { useState } from 'react';
import { GraduationCap, Award, Compass, ArrowUpRight, CheckCircle2, Terminal } from 'lucide-react';
import { PERSONAL_INFO, DISCIPLINES, DisciplinePerspective } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplinePerspective>(DISCIPLINES[0]);

  return (
    <section id="about" className="relative py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pre-title */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
              01 / The Person Behind The Work
            </span>
            <div className="h-[1px] w-12 bg-lime/40" />
          </div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest hidden sm:inline">
            A Genuine Perspective
          </span>
        </div>

        {/* Section Headline with Italic Serif Accent */}
        <div className="max-w-4xl mb-14">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-zinc-100 uppercase tracking-tight leading-[1.05]">
            Curious about technology.
            <br />
            <span className="font-serif italic font-normal text-lime text-glow-lime lowercase text-4xl sm:text-6xl lg:text-7xl">
              driven to build.
            </span>
          </h2>
        </div>

        {/* 2-Column Editorial Grid: Story Narrative on Left, Signal Explorer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            <p className="border-l-2 border-lime pl-5 text-zinc-100 font-normal">
              I&apos;m a final-year Computer Science and Engineering student at P. A. College of Engineering, Mangaluru. I enjoy learning how software works, solving programming problems, and building applications that address practical needs.
            </p>

            <p className="pl-5 text-zinc-400">
              My interests include full-stack development, backend engineering, and AI-powered applications. Through my projects, I aim to strengthen my understanding of software design, APIs, data handling, and application development.
            </p>

            <p className="pl-5 text-zinc-400">
              I&apos;m looking forward to growing as a software engineer, collaborating with others, and contributing to meaningful products.
            </p>

            {/* Identity Triad Notes (Inspired by Sarthak Sharma) */}
            <div className="pt-2 pl-5 flex flex-wrap gap-4 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span className="text-zinc-300">• Engineering Mind</span>
              <span className="text-lime">• Applied AI Instinct</span>
              <span className="text-zinc-300">• Builder&apos;s Ambition</span>
            </div>

            {/* Career Objective Card */}
            <div className="mt-8 p-6 rounded-2xl bg-dark-900 border border-surface-border relative overflow-hidden">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-lime mb-2">
                <Compass className="w-4 h-4" />
                <span>Career Objective</span>
              </div>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {PERSONAL_INFO.careerObjective}
              </p>
            </div>

            {/* Academic Credentials Mini-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-dark-900/80 border border-surface-border flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-100">
                    B.E. Computer Science &amp; Eng
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {PERSONAL_INFO.college}
                  </p>
                  <p className="font-mono text-[11px] text-zinc-500 mt-1">
                    {PERSONAL_INFO.affiliation} · 2027
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-900/80 border border-surface-border flex items-start gap-3">
                <Award className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-100">
                    IEEE Student Member
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    PACE Student Branch
                  </p>
                  <p className="font-mono text-[11px] text-lime mt-1">
                    CGPA: {PERSONAL_INFO.cgpa} / 10.0
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Signal Explorer (Inspired by Sarthak Sharma's Discipline Explorer) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-dark-900/95 border border-surface-border shadow-2xl relative overflow-hidden">
              {/* Explorer Topline */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono">
                <span className="text-lime uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  THREE DISCIPLINES. ONE PERSPECTIVE.
                </span>
                <span className="text-zinc-500">
                  {selectedDiscipline.id === 'engineering' ? '01 / 03' : selectedDiscipline.id === 'ai' ? '02 / 03' : '03 / 03'}
                </span>
              </div>

              {/* Interactive Discipline Buttons */}
              <div className="grid grid-cols-3 gap-2 my-5">
                {DISCIPLINES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDiscipline(d)}
                    className={`py-2 px-3 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-all ${
                      selectedDiscipline.id === d.id
                        ? 'bg-lime text-black font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                        : 'bg-dark-950 text-zinc-400 hover:text-zinc-200 border border-surface-border'
                    }`}
                  >
                    <span>{d.tabLabel}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                ))}
              </div>

              {/* Dynamic Discipline Story Box */}
              <div className="p-5 rounded-xl bg-dark-950 border border-zinc-800/80 space-y-3">
                <span className="font-mono text-[10px] text-lime tracking-widest uppercase block">
                  {selectedDiscipline.tagline}
                </span>

                <h3 className="font-display font-bold text-lg text-zinc-100">
                  {selectedDiscipline.headline}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {selectedDiscipline.description}
                </p>

                {/* Stack Pills */}
                <div className="pt-2">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1.5">
                    Core Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDiscipline.stackPills.map((pill) => (
                      <span
                        key={pill}
                        className="font-mono text-[11px] px-2 py-0.5 rounded bg-dark-900 border border-zinc-800 text-zinc-300"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="pt-3 border-t border-zinc-800/80 space-y-1.5 font-mono text-xs text-zinc-300">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    Key Outcomes
                  </span>
                  {selectedDiscipline.deliverables.map((deliv) => (
                    <div key={deliv} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hint */}
              <p className="text-center font-mono text-[11px] text-zinc-500 mt-4">
                Click any perspective above to view engineering focus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
