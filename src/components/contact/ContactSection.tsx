import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle2, ArrowUpRight, Copy, Check, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto trigger
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pre-title */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
            06 / Get In Touch
          </span>
          <div className="h-[1px] w-12 bg-lime/40" />
        </div>

        {/* Section Headline */}
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-zinc-100 uppercase tracking-tight max-w-4xl leading-[1.05] mb-4">
          Let&apos;s build <span className="text-lime text-glow-lime">something useful.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-zinc-400 text-base sm:text-lg font-light max-w-2xl leading-relaxed mb-12">
          &ldquo;I&apos;m interested in software engineering opportunities, full-stack development, collaborative projects, and solving practical problems with technology.&rdquo;
        </p>

        {/* Main Grid: Direct channels on left, Interactive message dispatch on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Direct Contact &amp; Profiles
            </h3>

            {/* Email Card with Copy button */}
            <div className="p-6 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/30 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-mono text-xs text-lime flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Primary Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="font-mono text-[11px] text-zinc-400 hover:text-lime flex items-center gap-1 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lime" />
                      <span className="text-lime">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="block text-sm sm:text-base font-mono font-semibold text-zinc-100 hover:text-lime transition-colors mt-3 truncate"
              >
                {PERSONAL_INFO.email}
              </a>
              <span className="block text-xs text-zinc-400 mt-1 font-sans">
                Available for software engineering inquiries &amp; developer discussions.
              </span>
            </div>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/30 transition-colors flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-dark-950 border border-surface-border text-lime">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-100 group-hover:text-lime transition-colors">
                    GitHub Profile
                  </h4>
                  <p className="font-mono text-xs text-zinc-400">
                    Mazhar74-UMP
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-lime transition-colors" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/30 transition-colors flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-dark-950 border border-surface-border text-lime">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-100 group-hover:text-lime transition-colors">
                    LinkedIn Network
                  </h4>
                  <p className="font-mono text-xs text-zinc-400">
                    in/mazhar-shaikh
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-lime transition-colors" />
            </a>

            {/* Download Resume Action */}
            <button
              onClick={onOpenResume}
              className="w-full p-5 rounded-2xl bg-dark-900/90 border border-surface-border hover:border-lime/30 transition-colors flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-dark-950 border border-surface-border text-lime">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-100 group-hover:text-lime transition-colors">
                    Download Resume
                  </h4>
                  <p className="font-mono text-xs text-zinc-400">
                    Verified Academic &amp; Project Summary
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-lime transition-colors" />
            </button>
          </div>

          {/* Interactive Message Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-surface-border shadow-2xl relative">
              <div className="flex items-center gap-2 pb-4 mb-6 border-b border-zinc-800 font-mono text-xs text-zinc-400">
                <MessageSquare className="w-4 h-4 text-lime" />
                <span>DIRECT MESSAGE CONSOLE</span>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-lime/10 border border-lime/30 text-lime text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Opening your mail client to send your message to Mazhar. Thank you!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-dark-950 border border-surface-border focus:border-lime focus:outline-none text-zinc-100 text-sm font-sans placeholder-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-dark-950 border border-surface-border focus:border-lime focus:outline-none text-zinc-100 text-sm font-sans placeholder-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack SWE Role / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-dark-950 border border-surface-border focus:border-lime focus:outline-none text-zinc-100 text-sm font-sans placeholder-zinc-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share project details, opportunities, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-dark-950 border border-surface-border focus:border-lime focus:outline-none text-zinc-100 text-sm font-sans placeholder-zinc-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-lime hover:bg-lime-hover text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Mazhar</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
