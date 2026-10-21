import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { PROJECTS, Project } from '../../data/projectsData';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-surface-border gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                02 / Selected Work
              </span>
              <div className="h-[1px] w-12 bg-lime/40" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-zinc-100 uppercase tracking-tight leading-[1.05]">
              Ideas are a start.
              <br />
              <span className="font-serif italic font-normal text-lime text-glow-lime lowercase text-4xl sm:text-6xl lg:text-7xl">
                this is the work.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-mono max-w-md leading-relaxed">
            From RAG vector indexing to real-time YOLO object detection and explainable dual-stream medical vision. Built with code, tested locally, verified with honesty.
          </p>
        </div>

        {/* Projects List */}
        <div className="divide-y divide-surface-border">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Project Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
