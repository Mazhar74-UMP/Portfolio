export interface SkillGroup {
  category: string;
  badge: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    note?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  affiliation: string;
  period: string;
  graduationYear: string;
  cgpa: string;
  status: string;
  details: string[];
}

export interface AchievementItem {
  title: string;
  event: string;
  placement: string;
  duration: string;
  type: string;
  description: string;
}

export interface DisciplinePerspective {
  id: 'engineering' | 'ai' | 'building';
  tabLabel: string;
  tagline: string;
  headline: string;
  description: string;
  stackPills: string[];
  deliverables: string[];
}

export const PERSONAL_INFO = {
  name: "MAZHAR HUSAIN SHAIKH",
  firstName: "Mazhar",
  middleName: "Husain",
  lastName: "Shaikh",
  headline: "Aspiring Software Engineer | Full-Stack Developer | AI Project Builder",
  subHeadline: "Full-stack development, thoughtful engineering, and AI-powered ideas.",
  bioHero: "I'm a final-year Computer Science student who enjoys turning ideas into working applications. I explore software development through hands-on projects, problem-solving, and continuous learning.",
  statusLabel: "FINAL-YEAR CSE STUDENT · CLASS OF 2027",
  location: "Mangaluru, Karnataka, India",
  affiliation: "Visvesvaraya Technological University (VTU)",
  college: "P. A. College of Engineering, Mangaluru",
  graduation: "2027",
  cgpa: "7.52",
  membership: "IEEE Student Member",
  github: "https://github.com/Mazhar74-UMP",
  linkedin: "https://www.linkedin.com/in/mazhar-shaikh",
  email: "mazharhusainshaikh74@gmail.com",
  aboutIntro: `I'm a final-year Computer Science and Engineering student at P. A. College of Engineering, Mangaluru. I enjoy learning how software works, solving programming problems, and building applications that address practical needs.

My interests include full-stack development, backend engineering, and AI-powered applications. Through my projects, I aim to strengthen my understanding of software design, APIs, data handling, and application development.

I'm looking forward to growing as a software engineer, collaborating with others, and contributing to meaningful products.`,
  careerObjective: "Obtain software engineering, full-stack development, or related entry-level opportunities where I can build useful applications, improve my technical skills, and contribute to a development team."
};

export const DISCIPLINES: DisciplinePerspective[] = [
  {
    id: "engineering",
    tabLabel: "Engineering",
    tagline: "CORE SYSTEMS & BACKEND ARCHITECTURE",
    headline: "Structured foundations. Reliable logic.",
    description: "Writing maintainable object-oriented code, designing normalized relational databases, and implementing predictable REST API endpoints.",
    stackPills: ["Java", "Spring Boot", "SQL & PostgreSQL", "Data Structures & OOP", "Computer Networks"],
    deliverables: ["Modular backend services", "Relational database schemas", "Robust API endpoints"]
  },
  {
    id: "ai",
    tabLabel: "Applied AI",
    tagline: "RAG PIPELINES & COMPUTER VISION",
    headline: "Grounding intelligent models in verifiable data.",
    description: "Building retrieval-augmented generation systems that search vector spaces with Pinecone, eliminate LLM hallucinations, and utilizing YOLO for real-time computer vision inference.",
    stackPills: ["Python", "Retrieval-Augmented Generation", "Pinecone Vector DB", "OpenAI API", "YOLO Object Detection"],
    deliverables: ["Vector similarity search", "Document Q&A assistants", "Real-time spatial bounding boxes"]
  },
  {
    id: "building",
    tabLabel: "Building",
    tagline: "PRACTICAL FULL-STACK WORKFLOWS",
    headline: "Translating concepts into functional applications.",
    description: "Synthesizing frontend interfaces, backend endpoints, and automation scripts. Thriving under hackathon pressure, as demonstrated by our top-five finish at NEXATHON 2025.",
    stackPills: ["Responsive Web", "JavaScript", "HTML5 & CSS3", "Streamlit Prototypes", "Git & GitHub"],
    deliverables: ["Interactive web interfaces", "Hackathon prototypes", "Automated email workflows"]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programming Languages",
    badge: "Core Logic",
    description: "Foundational and modern languages used for backend logic, data processing, and client interactions.",
    skills: [
      { name: "Java", note: "Object-oriented programming, class hierarchies & enterprise backend" },
      { name: "Python", note: "AI pipelines, machine learning experiments & scripting" },
      { name: "JavaScript", note: "Interactive web behavior, DOM manipulation & async APIs" },
      { name: "SQL", note: "Querying, schema relationships, indexing & joins" },
      { name: "PostgreSQL", note: "Relational database management, data modeling & constraints" }
    ]
  },
  {
    category: "Core Computer Science",
    badge: "Foundations",
    description: "Core theoretical pillars taught throughout university CSE coursework.",
    skills: [
      { name: "Data Structures & Algorithms", note: "Trees, graphs, hash tables, sorting & asymptotic complexity" },
      { name: "Object-Oriented Programming", note: "Encapsulation, inheritance, polymorphism & abstraction" },
      { name: "Database Management Systems", note: "ACID transactions, relational design & normal forms" },
      { name: "Computer Networks", note: "TCP/IP protocol stack, HTTP/HTTPS, routing & OSI model" }
    ]
  },
  {
    category: "Backend Development",
    badge: "Architecture",
    description: "Server architecture, enterprise frameworks, and structured endpoints.",
    skills: [
      { name: "Spring Boot", note: "Java backend microservices, dependency injection & MVC" },
      { name: "REST API Fundamentals", note: "Stateless architecture, HTTP verbs, status codes & JSON payload design" }
    ]
  },
  {
    category: "Frontend Development",
    badge: "User Interface",
    description: "Responsive styling, semantic markup, and accessible web standards.",
    skills: [
      { name: "HTML5", note: "Semantic structure & document accessibility standards" },
      { name: "CSS3", note: "Modern layout models (Flexbox, CSS Grid), animations & media queries" },
      { name: "JavaScript (ES6+)", note: "Promises, fetch requests, modern syntax & modular code" },
      { name: "Responsive Web Development", note: "Mobile-first layouts & multi-device viewport design" }
    ]
  },
  {
    category: "AI & Application Development",
    badge: "Applied AI",
    description: "Practical implementation of intelligent language models, vector indexes, and visual detectors.",
    skills: [
      { name: "OpenAI API", note: "Embeddings, structured completions & context grounding" },
      { name: "Retrieval-Augmented Generation (RAG)", note: "Document vectorization & contextual question answering" },
      { name: "Pinecone", note: "Vector database index creation & cosine similarity queries" },
      { name: "Streamlit", note: "Rapid prototyping for machine learning and data applications" },
      { name: "YOLO (You Only Look Once)", note: "Single-stage convolutional object detection & inference" }
    ]
  },
  {
    category: "Developer Tools & Version Control",
    badge: "Workflow",
    description: "Standard engineering collaboration and version management tools.",
    skills: [
      { name: "Git", note: "Version control, branching, rebasing & merge resolution" },
      { name: "GitHub", note: "Code hosting, repository management & pull request reviews" }
    ]
  }
];

export const WORK_PROCESS = [
  {
    step: "01",
    title: "Understand the problem",
    short: "Analyze core constraints & user requirements",
    description: "Before writing code, I break down the specific challenge, analyze input/output expectations, study edge cases, and define clear success criteria.",
    deliverable: "Requirement breakdown & data flow schema"
  },
  {
    step: "02",
    title: "Explore possible solutions",
    short: "Compare architectural options & trade-offs",
    description: "I evaluate different algorithms, data models, or third-party integrations to choose the approach that balances maintainability, speed, and simplicity.",
    deliverable: "Architecture outline & tech selection"
  },
  {
    step: "03",
    title: "Build and test a working implementation",
    short: "Construct modular code & verify functionality",
    description: "I write clean, understandable code with modular functions, test edge cases locally, and ensure the basic workflow operates without silent failures.",
    deliverable: "Functional prototype & validated endpoints"
  },
  {
    step: "04",
    title: "Learn from feedback and improve",
    short: "Iterate on user experience & code quality",
    description: "Practical engineering is an iterative craft. I gather feedback from peers, review bottlenecks, refactor where necessary, and incorporate new lessons into future projects.",
    deliverable: "Refined codebase & documented findings"
  }
];

export const EDUCATION_DATA: EducationItem = {
  degree: "Bachelor of Engineering (B.E.) in Computer Science and Engineering",
  institution: "P. A. College of Engineering, Mangaluru",
  affiliation: "Visvesvaraya Technological University (VTU), Belagavi, Karnataka",
  period: "2023 — 2027 (Expected)",
  graduationYear: "2027",
  cgpa: "7.52 / 10.0",
  status: "Final-Year Undergraduate Student",
  details: [
    "Rigorous coursework in Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and OOP",
    "Active member of the IEEE Student Branch participating in technical workshops, webinars, and hackathons",
    "Developing practical full-stack applications with Spring Boot backend architecture and AI vector search"
  ]
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Top-Five Finalist",
    event: "NEXATHON 2025",
    placement: "Top 5 Placement (National Finalist)",
    duration: "24-Hour National-Level Hackathon",
    type: "National Hackathon",
    description: "Collaborated under 24-hour hackathon constraints to architect and prototype an AI-powered smart B2B workflow solution, competing against multidisciplinary teams across India."
  },
  {
    title: "Active Member",
    event: "IEEE Student Branch",
    placement: "Student Member",
    duration: "Ongoing",
    type: "Professional Organization",
    description: "Engaging with the global technical community through student chapter initiatives, peer programming, and technical symposiums."
  }
];
