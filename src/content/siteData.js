/**
 * @typedef {{ label: string, href: string }} ContactLink
 * @typedef {{ showPhone: boolean, phoneLabel: string, phoneHref: string, note: string }} PrivacyExposure
 * @typedef {{ dateLabel: string, isoDate: string, text: string, href?: string }} NewsItem
 * @typedef {{ role: string, org: string, timeframe: string, bullets: string[], href?: string }} ResearchItem
 * @typedef {{ title: string, timeframe: string, built: string, stack: string, href?: string, hrefLabel?: string }} ProjectItem
 * @typedef {{ name: string, role: string, timeframe: string, bullets: string[] }} VentureItem
 * @typedef {{ group: string, items: string[] }} SkillGroup
 * @typedef {{ title: string, timeframe: string, text: string }} ActivityItem
 */

/**
 * @type {{
 *   name: string,
 *   positioning: string,
 *   bio: string,
 *   lastUpdated: string,
 *   privacyExposure: PrivacyExposure,
 *   contactLinks: ContactLink[],
 *   news: NewsItem[],
 *   thesis: { title: string, text: string, href: string },
 *   research: ResearchItem[],
 *   projects: ProjectItem[],
 *   ventures: VentureItem[],
 *   skills: SkillGroup[],
 *   activities: ActivityItem[]
 * }}
 */
export const siteData = {
  name: 'Patrizio Acquadro',
  positioning: 'I build AI systems across research, engineering, and real-world product execution.',
  bio:
    'I am an MSc student in Artificial Intelligence and a visiting student at Purdue University. My recent work spans sim-to-real vision-language-action systems, LLM code-generation workflows, and hands-on projects from benchmarking to deployment.',
  lastUpdated: 'February 2026',
  privacyExposure: {
    showPhone: false,
    phoneLabel: 'Phone',
    phoneHref: 'tel:+10000000000',
    note:
      'Privacy & Exposure: this site intentionally limits public personal data. Email, LinkedIn, and GitHub are published; phone is optional and disabled by default.'
  },
  contactLinks: [
    { label: 'Mail', href: 'mailto:acquadropatrizio@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/patrizio-acquadro' },
    { label: 'GitHub', href: 'https://github.com/PatrizioAcquadro' }
  ],
  news: [
    {
      dateLabel: 'Jan 2026',
      isoDate: '2026-01-01',
      text: 'Started as a Visiting Research Student at Purdue University on sim-to-real VLA for precision bimanual manipulation.'
    },
    {
      dateLabel: 'Aug 2025',
      isoDate: '2025-08-01',
      text: 'Began my visiting student period at Purdue University through a competitive exchange from Politecnico di Milano.'
    },
    {
      dateLabel: 'Jul 2025',
      isoDate: '2025-07-01',
      text: 'Completed multiple AI systems projects, including a code agent benchmark, an STM32N6 on-device transformer, and MIDI generation experiments.'
    },
    {
      dateLabel: 'Jun 2025',
      isoDate: '2025-06-01',
      text: 'Spoke at "Chiediamolo all\'AI" on practical AI adoption, live demos, and LLM implementation workflows.'
    },
    {
      dateLabel: 'Apr 2025',
      isoDate: '2025-04-01',
      text: 'Started building Adunet, a mobile-first city festival web app focused on event and service discovery.'
    },
    {
      dateLabel: 'Feb 2025',
      isoDate: '2025-02-01',
      text: 'Joined Politecnico di Milano as a Generative AI Researcher on LLM optimization for large-scale code generation tasks.'
    }
  ],
  thesis: {
    title: 'Current Thesis Work',
    text: 'Sim-to-real VLA for precision bimanual manipulation, with a LEGO assembly benchmark and full training-to-deployment pipeline.',
    href: 'https://websitepresentation.vercel.app/'
  },
  research: [
    {
      role: 'Visiting Research Student',
      org: 'Purdue University',
      timeframe: 'Jan 2026 - Present',
      bullets: [
        'Built a MuJoCo benchmark and evaluation suite with rich-contact dynamics.',
        'Implemented an EO-1-style decoder-only transformer policy with a Qwen2.5-VL backbone.',
        'Managed the end-to-end pipeline: simulation, annotations, training, fine-tuning, and deployment on Unitree H1.'
      ]
    },
    {
      role: 'Generative AI Researcher',
      org: 'Politecnico di Milano',
      timeframe: 'Feb 2025 - Sep 2025',
      bullets: [
        'Optimized LLM pipelines for code generation on large-scale database tasks.',
        'Combined multi-hop retrieval, adaptive thresholds, dynamic-k, and a 4-bit NF4 DeepSeek-R1-Distill-Qwen-7B generator.',
        'Tracked Clean-Reference@k, Repo-Recall@k, BLEU, ChrF, CodeBLEU, and API-Recall.'
      ]
    },
    {
      role: 'Generative AI Researcher & Re-Ranking Specialist',
      org: 'UNIMIB',
      timeframe: 'Mar 2024 - Jun 2024',
      bullets: [
        'Co-developed work on clinical trial search with RAG-focused re-ranking.',
        'Applied pairwise relevance strategies in a LangChain-based pipeline.',
        'Built and integrated a UMLS-based knowledge base for retrieval quality.'
      ]
    },
    {
      role: 'AI Researcher Intern',
      org: 'Exprivia',
      timeframe: 'Apr 2024 - Jun 2024',
      bullets: [
        'Explored ML and DL model development in quantum computing contexts.',
        'Designed and adapted generative AI models for advanced platforms.',
        'Evaluated financial scenario applications for AI algorithms.'
      ]
    }
  ],
  projects: [
    {
      title: 'Code Agent System & Mini-Transformer Benchmark',
      timeframe: 'May 2025 - Jul 2025',
      built: 'Designed and integrated a multi-provider coding-agent pipeline with structured tools and realistic benchmark tasks.',
      stack: 'OpenAI, Gemini, OpenRouter, LangChain, Pydantic',
      href: 'https://github.com/PatrizioAcquadro/code-agent-replication',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'STM32N6 NPU On-Device Transformer',
      timeframe: 'May 2025 - Jul 2025',
      built: 'Deployed an INT8 encoder-only transformer under strict Flash, SRAM, and latency constraints.',
      stack: 'STM32 Edge-AI, X-Cube-AI, CubeIDE, CubeProgrammer, AI Dev Cloud',
      href: 'https://github.com/TitoNicolaDrugman/Transformer-NPU-STM32N6',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Transformer for Piano MIDI Generation',
      timeframe: 'Jun 2025 - Jul 2025',
      built: 'Trained and evaluated a ~15M REMI transformer with explainability methods for sequence generation.',
      stack: 'PyTorch, AdamW, mixed precision, Integrated Gradients, Attention Rollout',
      href: 'https://github.com/PatrizioAcquadro/autoregressive-midi-transformer',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Patient-Nurse-Room Scheduling via MILP',
      timeframe: 'Jan 2025 - Feb 2025',
      built: 'Formulated and solved constrained hospital admission scheduling to optimality across multiple instances.',
      stack: 'MILP, CBC solver, mip (Python)',
      href: 'https://github.com/PatrizioAcquadro/PatientNurseRoomAssignment_FOR',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Student & Companies Platform',
      timeframe: 'Jan 2025 - Feb 2025',
      built: 'Produced end-to-end requirements and design documentation across requirements, architecture, data, and deployment views.',
      stack: 'RASD, DD, Alloy, API/UI specification',
      hrefLabel: 'Link coming soon'
    },
    {
      title: 'MongoDB & Elasticsearch on Unstructured Data',
      timeframe: 'Nov 2024 - Dec 2024',
      built: 'Built query pipelines and analytics workflows on large unstructured datasets.',
      stack: 'MongoDB, Elasticsearch, JSON data modeling',
      href: 'https://github.com/PatrizioAcquadro/SMBUD-2024-2025-AcquadroDrugmanGadiaga',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Medical Trials Search Engine',
      timeframe: 'Dec 2023 - Jan 2024',
      built: 'Developed a clinical trial search engine with LLM-assisted keyword extraction and filtering.',
      stack: 'GPT-3.5 Turbo, retrieval pipeline, knowledge base integration',
      href: 'https://github.com/PatrizioAcquadro/Clinical-Trial-Search-Engine',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Castle War',
      timeframe: 'Jul 2022 - Sep 2022',
      built: 'Built a Python game from scratch, covering gameplay logic, algorithms, and graphics implementation.',
      stack: 'Python, Pygame',
      href: 'https://github.com/PatrizioAcquadro/CastleWarGame',
      hrefLabel: 'GitHub repository'
    }
  ],
  ventures: [
    {
      name: 'BIF (BiellaInFesta) Social Page',
      role: 'Founder',
      timeframe: 'Jul 2022 - Present',
      bullets: [
        'Created a youth-focused local events channel for the province of Biella.',
        'Reached 8,500+ followers and about 550k monthly views in three years.',
        'Coordinated and supervised a cross-functional team of 4+ collaborators.'
      ]
    },
    {
      name: 'Adunet Web App',
      role: 'Founder',
      timeframe: 'Apr 2025 - May 2025',
      bullets: [
        'Built a mobile-first interactive map for festival events and city services.',
        'Coordinated onboarding across 50+ venues and 90+ points of interest.',
        'Led a 10-person team through planning and live operations during a high-traffic three-day event.'
      ]
    },
    {
      name: 'CubeWar Minecraft Server',
      role: 'Co-founder',
      timeframe: 'May 2018 - Jul 2019 (sold)',
      bullets: [
        'Co-developed a custom Minecraft game mode used by players across Italy.',
        'Built Java plugins and managed server configuration and operations.',
        'Directed collaboration among programmers and game designers during key development phases.'
      ]
    }
  ],
  skills: [
    {
      group: 'Programming & Data',
      items: [
        'Python',
        'R',
        'MATLAB',
        'Java (basics)',
        'C# (basics)',
        'PostgreSQL',
        'SQL',
        'MetaBase',
        'HTML',
        'CSS',
        'JavaScript'
      ]
    },
    {
      group: 'ML & AI Libraries',
      items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'seaborn']
    },
    {
      group: 'IR & Knowledge Tools',
      items: ['PyTerrier', 'NLTK', 'LangChain', 'SPARQL', 'Protege', 'RDFLib']
    },
    {
      group: 'Languages',
      items: ['Italian (native)', 'English (fluent)', 'French (basic)']
    },
    {
      group: 'Professional Skills',
      items: ['Perseverance', 'Creativity', 'Problem solving', 'Leadership', 'Emotional intelligence']
    }
  ],
  activities: [
    {
      title: 'JCI (Junior Chamber International) Biella',
      timeframe: 'Jul 2025 - Present',
      text: 'Handled communications, budgets, and sponsor outreach in a team of 14 while launching and supporting community events.'
    },
    {
      title: 'Guest Speaker - "Chiediamolo all\'AI"',
      timeframe: 'Jun 2025',
      text: 'Presented AI and LLM fundamentals with live demos, adoption guidance, and discussion on ethics, work, and legal context.'
    },
    {
      title: 'Guest Speaker - ASL Biella',
      timeframe: 'Apr 2025',
      text: 'Delivered a practical AI-in-neuropsychiatry session and moderated clinician Q&A on pilot design and implementation.'
    },
    {
      title: 'L\'Oreal Brandstorm (You-Real)',
      timeframe: 'Feb 2025 - Mar 2025',
      text: 'Led the technical concept and UX direction for an AI smart mirror and companion app in a three-person team.'
    },
    {
      title: 'IELTS Academic 7.5',
      timeframe: 'Apr 2024',
      text: 'Completed IELTS Academic with an overall score of 7.5.'
    },
    {
      title: 'Google Cloud Skills Boost - Introduction to Generative AI',
      timeframe: 'Mar 2024',
      text: 'Completed introductory coursework on generative AI tools and workflows.'
    },
    {
      title: 'Italian Red Cross Training & Volunteer Program',
      timeframe: 'Nov 2023 - Dec 2023',
      text: 'Completed a 14-hour training course and exam for volunteer qualification.'
    }
  ]
};
