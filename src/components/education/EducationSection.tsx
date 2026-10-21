import React from 'react';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA, ACHIEVEMENTS } from '../../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-surface-border gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                05 / Credentials &amp; Milestones
              </span>
              <div className="h-[1px] w-12 bg-lime/40" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-zinc-100 uppercase tracking-tight">
              Education &amp; <span className="text-lime text-glow-lime">Honors</span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-mono max-w-md leading-relaxed">
            Academic milestones, hackathon placement, and technical organization activities verified with zero fabricated claims.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-12 items-start">
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-lime" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                Formal Academic Education
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-lime/40 space-y-8">
              {/* Ongoing B.E. Degree */}
              <div className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-dark-950 border-2 border-lime" />

                <div className="p-6 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/30 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                    <span className="font-mono text-xs text-lime font-semibold px-2.5 py-0.5 rounded bg-lime/10 border border-lime/20">
                      {EDUCATION_DATA.status}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {EDUCATION_DATA.period}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <h4 className="font-display font-bold text-lg sm:text-xl text-zinc-100">
                      {EDUCATION_DATA.degree}
                    </h4>
                    <p className="text-sm text-zinc-300 font-medium">
                      {EDUCATION_DATA.institution}
                    </p>
                    <p className="font-mono text-xs text-zinc-400">
                      Affiliation: {EDUCATION_DATA.affiliation}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded bg-dark-950 border border-surface-border">
                      <span className="text-[10px] text-zinc-400 block uppercase">Current CGPA</span>
                      <span className="text-base font-bold text-lime">{EDUCATION_DATA.cgpa}</span>
                    </div>
                    <div className="p-2.5 rounded bg-dark-950 border border-surface-border">
                      <span className="text-[10px] text-zinc-400 block uppercase">Graduation</span>
                      <span className="text-base font-bold text-zinc-100">{EDUCATION_DATA.graduationYear}</span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-zinc-400 font-sans">
                    {EDUCATION_DATA.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expandable slot for future achievements/internships */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-dark-950 border-2 border-zinc-700" />
                <div className="p-4 rounded-xl bg-dark-950/60 border border-dashed border-zinc-800 text-xs text-zinc-400 font-mono flex items-center justify-between">
                  <span>Future Milestones / Certifications</span>
                  <span className="text-[11px] text-lime">Slot Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Activities */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-lime" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                Recognitions &amp; Activities
              </h3>
            </div>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/30 transition-colors"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="font-mono text-xs font-semibold text-lime">
                      {item.placement}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {item.type}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-zinc-100 mt-3">
                    {item.event}
                  </h4>

                  <span className="font-mono text-xs text-zinc-400 block mb-2">
                    {item.duration}
                  </span>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
