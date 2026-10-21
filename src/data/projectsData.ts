export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  browserUrl: string;
  artifactLabel: string;
  technologies: string[];
  description: string;
  problem: string;
  solution: string;
  workbenchNotes: string;
  architectureDetails: string[];
  keyHighlights: string[];
  teamInfo?: string;
  achievement?: string;
  visualType: 'rag-pipeline' | 'b2b-workflow' | 'fraud-detector' | 'yolo-vision' | 'retinal-gradcam';
  githubUrl: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "hiresense",
    number: "01",
    title: "HireSense",
    subtitle: "Contextual Resume Question-Answering System",
    category: "AI Application / RAG",
    browserUrl: "hiresense-rag.ai",
    artifactLabel: "RAG PIPELINE · VECTOR RETRIEVAL",
    technologies: ["Python", "OpenAI API", "Pinecone", "Streamlit"],
    description: "An AI-powered resume question-answering system that uses retrieval-augmented generation to help users ask questions about resume content.",
    problem: "Recruiters and applicants often need to query specific candidate milestones, toolchains, or experiences across dense multi-page resumes without manually scanning dozens of paragraphs.",
    solution: "Engineered an AI-assisted question-answering pipeline. Resumes are segmented into semantic text chunks, transformed into high-dimensional vector embeddings, and indexed into Pinecone. When queried, cosine similarity fetches the most relevant context excerpts to feed OpenAI's API, ensuring answers remain strictly grounded in document text.",
    workbenchNotes: "Uses Pinecone's serverless vector index with cosine distance metric. Text chunking applies sliding window overlaps (200 tokens) to preserve semantic boundaries between work history bullets.",
    architectureDetails: [
      "Document ingestion and semantic text chunking in Python",
      "Vector embeddings indexed into Pinecone vector database",
      "Cosine similarity retrieval to fetch top-k candidate excerpts",
      "OpenAI API synthesis providing grounded answers without speculation",
      "Streamlit interface for document uploads and responsive chat querying"
    ],
    keyHighlights: [
      "Strict retrieval grounding to minimize hallucination",
      "Real-time semantic vector search over resume content",
      "Clean Streamlit interface for rapid prototype evaluation"
    ],
    visualType: "rag-pipeline",
    githubUrl: "https://github.com/Mazhar74-UMP"
  },
  {
    id: "b2b-marketing-assistant",
    number: "02",
    title: "AI-Powered B2B Smart Marketing Assistant",
    subtitle: "Automated Campaign Drafting & Email Distribution Pipeline",
    category: "AI / Workflow Automation",
    browserUrl: "b2b-assistant.marketing",
    artifactLabel: "HACKATHON FINALIST · EMAIL AUTOMATION",
    technologies: ["OpenAI API", "Python", "SMTP Automation"],
    description: "An AI-assisted B2B marketing project designed to support marketing workflows and email automation.",
    problem: "B2B client outreach demands customized messaging tailored to business sectors and prospect roles, but manual email drafting and repetitive delivery scheduling bottleneck small marketing teams.",
    solution: "Designed and built an end-to-end campaign automation workflow. OpenAI's API generates contextually tailored B2B outreach proposals from target business parameters, followed by programmatic SMTP dispatch to automate the transmission lifecycle.",
    achievement: "Top-Five Placement at NEXATHON 2025 (24-Hour National-Level Hackathon)",
    teamInfo: "Built collaboratively during the NEXATHON 2025 hackathon",
    workbenchNotes: "Developed under 24-hour hackathon conditions at NEXATHON 2025. Tested with structured prompt engineering templates to ensure generated email copy complies with commercial outreach etiquette.",
    architectureDetails: [
      "Parameter intake for target company, industry niche, and core value proposition",
      "OpenAI API prompt chaining for audience-tailored B2B email generation",
      "SMTP server automation script handling programmatic delivery",
      "Template validation and recipient list processing"
    ],
    keyHighlights: [
      "Recognized in the top 5 at NEXATHON 2025 national hackathon",
      "Automated pipeline from prompt parameters to outbound transmission",
      "Rapid prototype successfully presented within a 24-hour sprint"
    ],
    visualType: "b2b-workflow",
    githubUrl: "https://github.com/Mazhar74-UMP"
  },
  {
    id: "nirmaan-ai",
    number: "03",
    title: "Nirmaan AI: Fraud Job Posting Detector",
    subtitle: "Intelligent Text Analysis for Job Listing Verification",
    category: "AI / Trust & Safety",
    browserUrl: "nirmaan-trust.safety",
    artifactLabel: "TRUST & SAFETY · 3-MEMBER TEAM",
    technologies: ["Python", "NLP / Text Classification", "Web Interface"],
    description: "An AI-based project designed to help identify potentially fraudulent job postings.",
    problem: "Online employment platforms frequently face fraudulent listings designed to harvest applicant credentials or extract advance fees, presenting significant risks for entry-level candidates.",
    solution: "Prototyped a trust-and-safety analysis utility with a 3-member team. The system evaluates textual features of job listings (salary anomalies, suspicious contact domains, urgency phrasing) to flag risk indicators for review.",
    teamInfo: "Collaborative 3-member team project",
    workbenchNotes: "Focuses on transparent rule-based and NLP feature checks rather than black-box scoring, ensuring students and job seekers understand why a listing was flagged.",
    architectureDetails: [
      "Text extraction and preprocessing pipeline for job descriptions",
      "Domain and pattern heuristics identifying known scam structures",
      "Feature classification scoring risk indicators for user inspection",
      "Lightweight user interface to paste job specifications for immediate analysis"
    ],
    keyHighlights: [
      "Three-member team collaboration addressing a real-world student vulnerability",
      "Honest trust-and-safety heuristics without fabricating production accuracy claims",
      "Provides plain-language explanations for each flagged attribute"
    ],
    visualType: "fraud-detector",
    githubUrl: "https://github.com/Mazhar74-UMP"
  },
  {
    id: "weapon-detection-yolo",
    number: "04",
    title: "Automatic Weapon Detection Using YOLO",
    subtitle: "Real-Time Object Detection for Visual Surveillance",
    category: "Computer Vision / Deep Learning",
    browserUrl: "yolo-surveillance.cv",
    artifactLabel: "COMPUTER VISION · REAL-TIME INFERENCE",
    technologies: ["Python", "YOLO", "OpenCV", "Deep Learning"],
    description: "A computer vision project exploring object detection for identifying weapons in images or video.",
    problem: "Real-time threat monitoring in surveillance environments requires automated object detection to identify hazardous objects quickly without operator fatigue.",
    solution: "Explored single-stage YOLO convolutional neural networks to localize and identify weapon objects within camera feeds, rendering spatial bounding boxes, class labels, and confidence thresholds over processed frames.",
    workbenchNotes: "Employs Non-Maximum Suppression (NMS threshold 0.45) to filter redundant overlapping candidate bounding boxes while maintaining real-time video frame rates.",
    architectureDetails: [
      "OpenCV video stream decoding and frame preprocessing pipeline",
      "YOLO single-pass convolutional backbone for spatial feature extraction",
      "Non-Maximum Suppression (NMS) to eliminate duplicate bounding boxes",
      "Visual overlay engine annotating bounding boxes and detection telemetry"
    ],
    keyHighlights: [
      "Hands-on exploration of real-time computer vision deep learning pipelines",
      "Bounding box spatial coordinate mapping and frame annotation",
      "Focuses on practical computer vision fundamentals and object detection"
    ],
    visualType: "yolo-vision",
    githubUrl: "https://github.com/Mazhar74-UMP"
  },
  {
    id: "retinal-disease-diagnosis",
    number: "05",
    title: "Explainable Multi-Modal Retinal Disease Diagnosis",
    subtitle: "Dual-Stream ResNet18 with Grad-CAM Visual Interpretability",
    category: "Deep Learning / Explainable AI",
    browserUrl: "retinal-gradcam.research",
    artifactLabel: "RESEARCH EXPLORATION · LAYER4 (7 × 7)",
    technologies: ["PyTorch", "Dual-Stream ResNet18", "Grad-CAM", "Medical Imaging"],
    description: "A research-oriented project exploring retinal disease classification from fundus and OCT images, with Grad-CAM visualizations to help explain model predictions.",
    problem: "Deep learning models in medical diagnostics often operate as uninterpretable black boxes, providing disease classifications without indicating the anatomical lesions or fluid regions that drove the model's prediction.",
    solution: "Constructed a dual-stream multi-modal architecture. Independent ResNet18 streams process surface Fundus photographs and cross-sectional Optical Coherence Tomography (OCT) scans. Feature representations are fused to predict disease probabilities, while Grad-CAM visualizes the layer4 activation map (7 × 7) to generate diagnostic heatmaps for clinician review.",
    workbenchNotes: "Grad-CAM calculates gradients of the predicted class score with respect to feature maps of ResNet18's layer4, producing a coarse 7 × 7 2D localization map highlighting significant discriminative regions.",
    architectureDetails: [
      "Twin ResNet18 convolutional backbones dedicated to Fundus and OCT scans",
      "Multi-modal feature fusion layer outputting class predictions and probabilities",
      "Grad-CAM implementation hooked into layer4 (7 × 7 activation map)",
      "Heatmap normalization and alpha-channel overlay rendering",
      "Research exploration: strictly non-diagnostic proof of concept"
    ],
    keyHighlights: [
      "Explainability-first architecture prioritizing transparent medical decision support",
      "Multi-modal fusion combining surface photography and cross-sectional OCT data",
      "Clear distinction: research exploration without unverified clinical claims"
    ],
    visualType: "retinal-gradcam",
    githubUrl: "https://github.com/Mazhar74-UMP"
  }
];
