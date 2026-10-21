import React from 'react';
import { X, Github, Layers, Trophy, Users } from 'lucide-react';
import { Project } from '../../data/projectsData';
import { ProjectVisual } from './ProjectVisuals';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-dark-900 border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-dark-950">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-lime">
              PROJECT {project.number}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-dark-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-surface-border transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-100">
              {project.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-lime mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Hackathon Achievement / Team Badge if available */}
          {(project.achievement || project.teamInfo) && (
            <div className="flex flex-wrap gap-3">
              {project.achievement && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-lime/10 border border-lime/30 text-lime text-xs font-mono font-medium">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{project.achievement}</span>
                </div>
              )}
              {project.teamInfo && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-dark-950 border border-surface-border text-zinc-400 text-xs font-mono">
                  <Users className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{project.teamInfo}</span>
                </div>
              )}
            </div>
          )}

          {/* Bespoke Visual Mockup / Diagram */}
          <div className="w-full rounded-xl overflow-hidden border border-surface-border">
            <ProjectVisual type={project.visualType} />
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-dark-950 border border-surface-border">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                Problem Statement
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-dark-950 border border-surface-border">
              <span className="font-mono text-xs uppercase tracking-wider text-lime font-semibold block mb-2">
                Intended Solution
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture & Engineering Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-lime" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                Technical Architecture &amp; Implementation Details
              </h3>
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-zinc-400 bg-dark-950 p-5 rounded-xl border border-surface-border">
              {project.architectureDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-lime mt-0.5">•</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
              Technologies &amp; Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded bg-dark-950 border border-surface-border font-mono text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-dark-950 border-t border-surface-border flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-lime hover:bg-lime-hover text-black font-mono text-xs font-bold uppercase transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          >
            <Github className="w-4 h-4" />
            <span>Explore on GitHub</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono uppercase text-zinc-300 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
