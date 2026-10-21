# Mazhar Husain Shaikh — Full-Stack Developer Portfolio

A dark, cinematic, editorial personal portfolio built with React, TypeScript, Tailwind CSS, and Three.js. Inspired by award-winning Awwwards creative portfolios and Razorpay AI Builders' 3D chrome visual language.

---

## 🌟 Profile Snapshot

- **Name**: Mazhar Husain Shaikh
- **Headline**: Aspiring Software Engineer | Full-Stack Developer | AI Project Builder
- **Education**: Final-year B.E. Computer Science and Engineering student at P. A. College of Engineering, Mangaluru (Affiliated with VTU)
- **Graduation Year**: 2027
- **Current CGPA**: 7.52 / 10.0
- **Location**: Mangaluru, Karnataka, India
- **Activities**: IEEE Member
- **Hackathon Achievement**: Top-5 Team Placement at **NEXATHON 2025** (24-Hour National-Level Hackathon)

---

## 🚀 Key Features

1. **Interactive 3D Chrome Hero (Razorpay AI Builders Inspired)**:
   - High-performance WebGL / Three.js chrome torus knot and inner glowing geometric core.
   - Lit with electric lime key lighting and subtle rim highlights.
   - Pointer-responsive desktop parallax with smooth lerp inertia.
   - Automatic graceful fallback for non-WebGL environments.

2. **Accurate & Honest Representation**:
   - Accurately captures student developer status without fabricated metrics, fake clients, or exaggerated employment claims.
   - Honest distinction between core established skills (Java, Python, Spring Boot, SQL, PostgreSQL, DSA, DBMS, OpenAI, Pinecone, YOLO) and technologies used for building this portfolio (React, Tailwind CSS, Three.js).

3. **Featured Projects Showcase**:
   - **01 — HireSense**: Contextual resume QA assistant using RAG (Python, OpenAI API, Pinecone, Streamlit).
   - **02 — AI-Powered B2B Smart Marketing Assistant**: Automated campaign & email workflow (OpenAI API, SMTP automation) — *Top-5 Placement at NEXATHON 2025*.
   - **03 — Nirmaan AI**: Fraud job posting detector addressing student recruitment scams (Python, NLP, 3-member team).
   - **04 — Automatic Weapon Detection Using YOLO**: Real-time object detection and spatial bounding box overlays.
   - **05 — Explainable Multi-Modal Retinal Disease Diagnosis**: Dual-stream ResNet18 architecture classifying Fundus and OCT scans with Grad-CAM layer4 (7 × 7) activation map visualizations.
   - Interactive modal inspector for each project with full architecture details, problem/solution breakdown, and repository links.

4. **Interactive Resume Modal**:
   - Instant printable / PDF-exportable modal (`window.print()`).
   - One-click copyable plain text summary.

5. **Cinematic Aesthetics & Accessibility**:
   - Space Grotesk headings, Plus Jakarta Sans body, and JetBrains Mono technical labels.
   - Electric lime (`#ccff00`) accents on deep charcoal & near-black backdrops.
   - Live Indian Standard Time (IST) clock for Mangaluru in the footer.
   - Fully responsive across desktop, tablet, and mobile viewports with zero horizontal overflow.
   - Respects `prefers-reduced-motion`.

---

## 🛠️ Getting Started

### 1. Requirements
- Node.js (v18+)
- npm (v9+)

### 2. Development Server
To launch the local development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Production Build
To create a production-ready optimized bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📸 Adding Your Personal Photograph

When you are ready to replace the abstract 3D composition with your portrait photo:
1. Place your photograph (e.g., `mazhar-portrait.jpg`) in the `public/` directory.
2. In `src/components/hero/HeroSection.tsx`, locate the section marked `{/* Replaceable Portrait Slot */}` and replace the placeholder icon with:
```tsx
<img 
  src="/mazhar-portrait.jpg" 
  alt="Mazhar Husain Shaikh" 
  className="w-full h-full object-cover rounded-xl"
/>
```

---

## 🌐 Verified Links

- **GitHub**: [https://github.com/Mazhar74-UMP](https://github.com/Mazhar74-UMP)
- **LinkedIn**: [https://www.linkedin.com/in/mazhar-shaikh](https://www.linkedin.com/in/mazhar-shaikh)
- **Contact Email**: `mazharhusainshaikh74@gmail.com`
