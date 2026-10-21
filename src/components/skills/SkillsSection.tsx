import React, { useState } from 'react';
import { Code, Server, Layout, Brain, GitBranch, Layers, Check, Info } from 'lucide-react';
import { SKILL_GROUPS } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_GROUPS.map((g) => g.category)];

  const filteredGroups = activeCategory === 'All'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter((g) => g.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code className="w-4 h-4 text-lime" />;
      case 'Core Computer Science':
        return <Layers className="w-4 h-4 text-lime" />;
      case 'Backend Development':
        return <Server className="w-4 h-4 text-lime" />;
      case 'Frontend Development':
        return <Layout className="w-4 h-4 text-lime" />;
      case 'AI & Application Development':
        return <Brain className="w-4 h-4 text-lime" />;
      case 'Developer Tools & Version Control':
        return <GitBranch className="w-4 h-4 text-lime" />;
      default:
        return <Code className="w-4 h-4 text-lime" />;
    }
  };

  return (
    <section id="skills" className="relative py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-surface-border gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                03 / Technical Competencies
              </span>
              <div className="h-[1px] w-12 bg-lime/40" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-zinc-100 uppercase tracking-tight">
              Full-Stack <span className="text-lime text-glow-lime">Focus</span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-mono max-w-md leading-relaxed">
            Targeting full-stack software engineering opportunities with a grounded grasp of core computing foundations, object-oriented systems, and applied AI tools.
          </p>
        </div>

        {/* Honest Transparency Note Banner */}
        <div className="my-8 p-4 sm:p-5 rounded-xl bg-dark-900/80 border border-zinc-800 flex items-start gap-3.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-lime shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono font-semibold text-lime uppercase tracking-wider block">
              Skill Authenticity &amp; Portfolio Transparency
            </span>
            <p className="text-zinc-400 leading-relaxed font-sans">
              All proficiencies listed below reflect my hands-on university curriculum, verified projects, and technical practice. Technologies used exclusively for constructing this portfolio interface (such as React, TypeScript, and Three.js) are intentionally kept distinct from my established academic and backend engineering stack.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-lime text-black font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-dark-900 text-zinc-400 hover:text-zinc-200 border border-surface-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-200 font-display font-bold text-sm">
                    {getCategoryIcon(group.category)}
                    <span>{group.category}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-dark-950 text-lime border border-lime/20">
                    {group.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 my-3 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills list */}
                <div className="space-y-2.5 mt-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-lg bg-dark-950/80 border border-surface-border group-hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-zinc-200">
                          {skill.name}
                        </span>
                        <Check className="w-3.5 h-3.5 text-lime" />
                      </div>
                      {skill.note && (
                        <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-tight">
                          {skill.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="pt-4 mt-4 border-t border-zinc-800/60 font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                <span>Verified student capability</span>
                <span className="text-lime">No fake ratings</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
