import React from 'react';
import { Database, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Crosshair, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface ProjectVisualProps {
  type: 'rag-pipeline' | 'b2b-workflow' | 'fraud-detector' | 'yolo-vision' | 'retinal-gradcam';
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ type }) => {
  switch (type) {
    case 'rag-pipeline':
      return (
        <div className="w-full h-full min-h-[300px] p-6 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-surface-border rounded-xl flex flex-col justify-between overflow-hidden relative group">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">RAG Vector Pipeline</span>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
              Pinecone + OpenAI
            </span>
          </div>

          {/* Interactive RAG Flow Diagram */}
          <div className="relative z-10 grid grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-lg bg-dark-950/80 border border-surface-border flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs">
                <FileText className="w-4 h-4 text-lime" />
                <span>Doc Chunks</span>
              </div>
              <div className="space-y-1.5 font-mono text-[10px] text-zinc-500">
                <div className="h-2 w-4/5 bg-zinc-800 rounded animate-pulse" />
                <div className="h-2 w-3/5 bg-zinc-800/70 rounded" />
                <div className="h-2 w-full bg-zinc-800/50 rounded" />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-dark-950/80 border border-lime/30 flex flex-col gap-2 relative">
              <div className="flex items-center gap-2 text-lime font-mono text-xs">
                <Database className="w-4 h-4 text-lime" />
                <span>Pinecone Index</span>
              </div>
              <div className="font-mono text-[10px] text-zinc-400 space-y-1">
                <div className="text-zinc-500">Cosine Similarity:</div>
                <div className="text-lime font-semibold">0.894 · Top-K = 3</div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-dark-950/80 border border-surface-border flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs">
                <Sparkles className="w-4 h-4 text-lime" />
                <span>LLM Synthesis</span>
              </div>
              <div className="font-mono text-[10px] text-zinc-400">
                Context-grounded QA output without hallucination
              </div>
            </div>
          </div>

          {/* Simulated Query Console */}
          <div className="relative z-10 p-3 rounded-lg bg-dark-950 border border-surface-border font-mono text-xs text-zinc-300">
            <span className="text-lime">$ query:</span> &quot;Summarize candidate&apos;s distributed systems experience&quot;
            <div className="text-zinc-400 text-[11px] mt-1 pl-3 border-l-2 border-lime">
              &quot;Candidate led migration to microservices, configured Redis caching, and modeled relational schemas.&quot;
            </div>
          </div>
        </div>
      );

    case 'b2b-workflow':
      return (
        <div className="w-full h-full min-h-[300px] p-6 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-surface-border rounded-xl flex flex-col justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">B2B Automation Engine</span>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-lime/10 text-lime border border-lime/30 font-semibold">
              NEXATHON 2025 · TOP 5
            </span>
          </div>

          {/* Workflow Sequence */}
          <div className="relative z-10 my-4 flex items-center justify-between gap-2">
            <div className="flex-1 p-3 rounded-lg bg-dark-950 border border-surface-border text-center">
              <span className="font-mono text-[10px] text-zinc-500 uppercase block">Input</span>
              <span className="text-xs text-zinc-200 font-medium">Prospect Parameters</span>
            </div>
            <ArrowRight className="w-4 h-4 text-lime shrink-0" />
            <div className="flex-1 p-3 rounded-lg bg-dark-950 border border-lime/30 text-center">
              <span className="font-mono text-[10px] text-lime uppercase block">OpenAI</span>
              <span className="text-xs text-zinc-200 font-medium">Contextual Copy</span>
            </div>
            <ArrowRight className="w-4 h-4 text-lime shrink-0" />
            <div className="flex-1 p-3 rounded-lg bg-dark-950 border border-surface-border text-center">
              <span className="font-mono text-[10px] text-zinc-500 uppercase block">SMTP</span>
              <span className="text-xs text-zinc-200 font-medium">Automated Dispatch</span>
            </div>
          </div>

          <div className="relative z-10 p-3 rounded-lg bg-dark-950 border border-surface-border font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400 pb-1.5 border-b border-zinc-800 text-[11px]">
              <span>Subject: Scalable Partnership Brief</span>
              <span className="text-lime flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ready</span>
            </div>
            <p className="text-zinc-400 text-[11px] mt-1.5 line-clamp-2">
              Automated campaign pipeline developed and validated within a 24-hour national hackathon sprint.
            </p>
          </div>
        </div>
      );

    case 'fraud-detector':
      return (
        <div className="w-full h-full min-h-[300px] p-6 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-surface-border rounded-xl flex flex-col justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-lime" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">Listing Analysis Console</span>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
              Team of 3
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 my-4">
            <div className="p-3 rounded-lg bg-dark-950 border border-surface-border">
              <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px] mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Heuristic Checks</span>
              </div>
              <ul className="text-[11px] text-zinc-400 space-y-1 font-mono">
                <li>• Unregistered Domain: <span className="text-amber-400">Flagged</span></li>
                <li>• Outlier Salary: <span className="text-amber-400">High Risk</span></li>
                <li>• Generic Job Spec: <span className="text-zinc-400">Medium</span></li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-dark-950 border border-surface-border flex flex-col justify-between">
              <span className="font-mono text-[10px] text-zinc-500 uppercase">Risk Evaluation</span>
              <div>
                <span className="text-xl font-display font-bold text-amber-400">Suspicious</span>
                <span className="block text-[11px] text-zinc-400 font-mono">Confidence Level: 84%</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-amber-400 h-full w-[84%]" />
              </div>
            </div>
          </div>

          <div className="relative z-10 p-2.5 rounded bg-dark-950/90 border border-surface-border text-[11px] text-zinc-400 font-mono">
            Prototyped to protect students from predatory recruiter scams and credential phishing.
          </div>
        </div>
      );

    case 'yolo-vision':
      return (
        <div className="w-full h-full min-h-[300px] p-6 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-surface-border rounded-xl flex flex-col justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-lime animate-spin-slow" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">YOLO Detection Stream</span>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-800/80 text-lime border border-lime/30">
              Live Frame Inferencing
            </span>
          </div>

          {/* Computer Vision Frame Simulation */}
          <div className="relative z-10 my-4 h-36 bg-dark-950 border border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 border border-dashed border-zinc-800/60 pointer-events-none" />
            
            {/* Simulated Bounding Box */}
            <div className="relative border-2 border-lime/80 bg-lime/5 p-2 rounded w-48 h-24 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="bg-lime text-black font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  target_obj: 0.93
                </span>
                <span className="font-mono text-[9px] text-lime">ID: #0492</span>
              </div>
              <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                <span>[X: 142, Y: 88]</span>
                <span>[W: 96, H: 48]</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span>Pipeline: Single-pass CNN</span>
            <span className="text-zinc-500">NMS Threshold: 0.45</span>
          </div>
        </div>
      );

    case 'retinal-gradcam':
      return (
        <div className="w-full h-full min-h-[300px] p-6 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-surface-border rounded-xl flex flex-col justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-lime" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">Dual-Stream ResNet18</span>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
              Layer4 Map: 7 × 7
            </span>
          </div>

          {/* Dual Stream Architecture View */}
          <div className="relative z-10 grid grid-cols-2 gap-3 my-4">
            <div className="p-3 rounded-lg bg-dark-950 border border-surface-border">
              <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">Fundus Stream</span>
              <div className="h-16 rounded bg-gradient-to-br from-amber-950/40 via-red-950/20 to-zinc-950 flex items-center justify-center border border-zinc-800">
                <span className="font-mono text-[10px] text-zinc-400">Surface Features</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-dark-950 border border-lime/30 relative">
              <span className="font-mono text-[10px] text-lime uppercase block mb-1">OCT + Grad-CAM</span>
              <div className="h-16 rounded bg-gradient-to-br from-lime-950/50 via-emerald-950/30 to-zinc-950 flex items-center justify-center border border-lime/30 relative overflow-hidden">
                {/* Heatmap overlay */}
                <div className="absolute w-8 h-8 rounded-full bg-lime/40 blur-md pointer-events-none" />
                <span className="font-mono text-[10px] text-lime font-semibold z-10">Layer4 Saliency</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 p-2.5 rounded bg-dark-950/90 border border-surface-border font-mono text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Twin ResNet18 Fusion</span>
            <span className="text-lime">Explainability First</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
