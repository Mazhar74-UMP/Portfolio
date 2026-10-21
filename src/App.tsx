import React, { useState, useEffect } from 'react';
import { BackgroundNoise } from './components/common/BackgroundNoise';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ProofStrip } from './components/common/ProofStrip';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProcessSection } from './components/process/ProcessSection';
import { EducationSection } from './components/education/EducationSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { ResumeModal } from './components/contact/ResumeModal';

declare global {
  interface Window {
    CodeReveal?: {
      init: (target?: any) => void;
      enable: () => void;
      disable: () => void;
      destroy: () => void;
      THEMES?: any;
      SNIPPETS?: string[];
    };
  }
}

export const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);

  // Initialize CodeReveal on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.CodeReveal) {
      window.CodeReveal.init();
    }
  }, []);

  // Hook up Navbar "MOTION ON/OFF" toggle to CodeReveal
  useEffect(() => {
    if (typeof window !== 'undefined' && window.CodeReveal) {
      if (motionReduced) {
        window.CodeReveal.disable();
      } else {
        window.CodeReveal.enable();
      }
    }
  }, [motionReduced]);

  return (
    <div className={`relative min-h-screen bg-[#050507] text-zinc-100 font-sans selection:bg-lime selection:text-black ${motionReduced ? 'motion-reduce' : ''}`}>
      {/* Cinematic Ambient Backdrop */}
      <BackgroundNoise />

      {/* Global Navbar with Motion Toggle */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        motionReduced={motionReduced}
        onToggleMotion={() => setMotionReduced(!motionReduced)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          motionReduced={motionReduced}
        />
        <ProofStrip />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ProcessSection />
        <EducationSection />
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Global Footer with Live IST Clock */}
      <Footer />

      {/* Global Resume Viewer / Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
