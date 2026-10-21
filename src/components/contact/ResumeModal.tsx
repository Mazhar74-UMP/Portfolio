import React, { useState } from 'react';
import { X, Printer, Copy, Check, ExternalLink, Award, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, SKILL_GROUPS, EDUCATION_DATA, ACHIEVEMENTS } from '../../data/portfolioData';
import { PROJECTS } from '../../data/projectsData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `
MAZHAR HUSAIN SHAIKH
${PERSONAL_INFO.headline}
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}
Email: ${PERSONAL_INFO.email}

EDUCATION:
${EDUCATION_DATA.degree}
${EDUCATION_DATA.institution} (${EDUCATION_DATA.affiliation})
Graduation: ${EDUCATION_DATA.graduationYear} | CGPA: ${EDUCATION_DATA.cgpa}

TECHNICAL SKILLS:
- Programming: Java, Python, JavaScript, SQL, PostgreSQL
- Core CS: Data Structures & Algorithms, OOP, DBMS, Computer Networks
- Backend: Spring Boot, REST API Fundamentals
- Frontend: HTML5, CSS3, JavaScript, Responsive Web Development
- AI & Application Dev: OpenAI API, RAG, Pinecone, Streamlit, YOLO
- Tools: Git, GitHub

KEY PROJECTS:
1. HireSense - AI Resume Question-Answering (Python, OpenAI, Pinecone, Streamlit)
2. AI B2B Smart Marketing Assistant - Hackathon Top 5 Finalist (OpenAI, SMTP, Python)
3. Nirmaan AI - Fraud Job Posting Detector (Python, NLP)
4. Automatic Weapon Detection Using YOLO (Python, YOLO, OpenCV)
5. Explainable Retinal Disease Diagnosis (Dual-Stream ResNet18, Grad-CAM, PyTorch)

ACHIEVEMENTS:
- Top-5 Team Placement at NEXATHON 2025 (24-Hour National-Level Hackathon)
- IEEE Student Member
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-dark-900 border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-dark-950">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
            <h2 className="font-display font-bold text-base sm:text-lg text-zinc-100">
              Verified Developer Resume
            </h2>
            <span className="hidden sm:inline-block font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
              VTU · Class of 2027
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-dark-900 hover:bg-dark-850 text-zinc-400 hover:text-lime border border-surface-border text-xs flex items-center gap-1.5 transition-colors"
              title="Copy Resume Summary"
            >
              {copied ? <Check className="w-4 h-4 text-lime" /> : <Copy className="w-4 h-4" />}
              <span className="hidden md:inline font-mono text-xs">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-dark-900 hover:bg-dark-850 text-zinc-400 hover:text-lime border border-surface-border text-xs flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-xs">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-dark-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-surface-border transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-zinc-200">
          {/* Resume Header */}
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <img
                  src="/mazhar-studio.jpg"
                  alt="Mazhar Husain Shaikh"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-lime/40 shadow-xl shrink-0"
                />
                <div>
                  <h1 className="font-display font-bold text-2xl sm:text-3xl text-zinc-100">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="font-mono text-xs sm:text-sm text-lime mt-0.5">
                    {PERSONAL_INFO.headline}
                  </p>
                  <span className="font-mono text-xs text-zinc-400 block mt-1">
                    Mangaluru, Karnataka, India · VTU &apos;27
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-zinc-400">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-lime flex items-center gap-1">
                GitHub: Mazhar74-UMP <ExternalLink className="w-3 h-3" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-lime flex items-center gap-1">
                LinkedIn: mazhar-shaikh <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-zinc-400">Email: {PERSONAL_INFO.email}</span>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-lime" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                Education
              </h3>
            </div>
            <div className="bg-dark-950 p-4 rounded-xl border border-surface-border">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h4 className="font-bold text-sm text-zinc-100">{EDUCATION_DATA.degree}</h4>
                <span className="font-mono text-xs text-zinc-400">{EDUCATION_DATA.period}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {EDUCATION_DATA.institution} · {EDUCATION_DATA.affiliation}
              </p>
              <div className="mt-2 flex items-center gap-2 font-mono text-xs text-lime">
                <span>Current CGPA: {EDUCATION_DATA.cgpa}</span>
                <span>·</span>
                <span>Status: {EDUCATION_DATA.status}</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-lime font-bold mb-3">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SKILL_GROUPS.map((group) => (
                <div key={group.category} className="p-3.5 rounded-lg bg-dark-950 border border-surface-border">
                  <span className="font-mono text-[11px] text-zinc-400 uppercase block mb-1">
                    {group.category}
                  </span>
                  <p className="text-xs text-zinc-300">
                    {group.skills.map((s) => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-lime font-bold mb-3">
              Featured Engineering Projects
            </h3>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-dark-950 border border-surface-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <span className="font-display font-bold text-sm text-zinc-100">
                      {proj.title}
                    </span>
                    <span className="font-mono text-[11px] text-lime">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Activities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-lime" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                Achievements & Activities
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-dark-950 border border-surface-border">
                  <span className="font-mono text-[11px] text-lime font-semibold block">
                    {item.placement}
                  </span>
                  <h4 className="font-bold text-sm text-zinc-100 mt-0.5">{item.event}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-dark-950 border-t border-surface-border flex items-center justify-between">
          <span className="font-mono text-[11px] text-zinc-400">
            Open for full-stack engineering & software development roles
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono uppercase text-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
