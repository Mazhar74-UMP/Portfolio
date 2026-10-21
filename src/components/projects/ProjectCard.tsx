import React from 'react';
import { ArrowUpRight, Github, Trophy, Users, Layers, ExternalLink } from 'lucide-react';
import { Project } from '../../data/projectsData';
import { ProjectVisual } from './ProjectVisuals';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenModal }) => {
  const isEven = index % 2 === 0;

  return (
    <article className="py-14 border-b border-surface-border last:border-b-0">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}>
        {/* Project Visual Container with Browser Bar & Artifact Tag (Sarthak Sharma Inspired) */}
        <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="group rounded-2xl overflow-hidden border border-surface-border bg-dark-900 shadow-2xl hover:border-lime/40 transition-all duration-300">
            {/* Sleek Browser Bar */}
            <div className="px-4 py-2.5 bg-dark-950 border-b border-surface-border flex items-center justify-between font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-red-500/80 transition-colors" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-yellow-500/80 transition-colors" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-emerald-500/80 transition-colors" />
              </div>
              <span className="text-[11px] text-zinc-400 tracking-wider">
                {project.browserUrl}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </div>

            {/* Interactive Visual Canvas / Diagram */}
            <div 
              onClick={() => onOpenModal(project)}
              className="cursor-pointer relative overflow-hidden"
            >
              <ProjectVisual type={project.visualType} />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime text-black font-mono text-xs font-bold uppercase shadow-lg">
                  <Layers className="w-4 h-4" />
                  Inspect Architecture
                </span>
              </div>
            </div>

            {/* Artifact Bottom Label */}
            <div className="px-4 py-2 bg-dark-950/90 border-t border-surface-border flex items-center justify-between font-mono text-[10px] text-zinc-400">
              <span className="text-lime">{project.artifactLabel}</span>
              <span>VERIFIED EXPLORATION</span>
            </div>
          </div>
        </div>

        {/* Project Editorial Content */}
        <div className={`lg:col-span-5 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* Project Number & Category Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-lime">
              {project.number}
            </span>
            <div className="h-4 w-[1px] bg-zinc-700" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              {project.category}
            </span>
          </div>

          {/* Title with Serif Accent & Subtitle */}
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-zinc-100 group-hover:text-lime transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-lime mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Hackathon Achievement / Team Badge */}
          {project.achievement && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-lime/10 border border-lime/30 text-lime text-xs font-mono font-medium">
              <Trophy className="w-3.5 h-3.5" />
              <span>{project.achievement}</span>
            </div>
          )}

          {project.teamInfo && !project.achievement && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-dark-900 border border-surface-border text-zinc-400 text-xs font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>{project.teamInfo}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            &ldquo;{project.description}&rdquo;
          </p>

          {/* Technologies Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-1 rounded bg-dark-900 border border-surface-border text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expandable Workbench Notes (Inspired by Sarthak Sharma) */}
          <details className="mt-3 group/notes border border-surface-border rounded-xl bg-dark-950/70 p-3.5 cursor-pointer">
            <summary className="font-mono text-xs text-zinc-400 flex items-center justify-between select-none hover:text-lime transition-colors list-none">
              <span>Inside the architecture</span>
              <span className="text-lime group-open/notes:rotate-45 transition-transform text-sm font-bold">+</span>
            </summary>
            <div className="mt-2.5 pt-2.5 border-t border-zinc-800 text-xs text-zinc-400 leading-relaxed font-light">
              <p>{project.workbenchNotes}</p>
              <button
                onClick={() => onOpenModal(project)}
                className="mt-2 text-lime hover:underline font-mono text-[11px] flex items-center gap-1"
              >
                Read engineering breakdown <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </details>

          {/* CTAs */}
          <div className="flex items-center gap-5 pt-3">
            <button
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-lime hover:text-white transition-colors"
            >
              <span>Explore Architecture</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
