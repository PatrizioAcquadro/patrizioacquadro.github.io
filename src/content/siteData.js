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
      'Privacy & Exposure: this site intentionally limits public personal data. Email, LinkedIn, GitHub, and Instagram are published; phone is optional and disabled by default.'
  },
  contactLinks: [
    { label: 'Mail', href: 'mailto:acquadropatrizio@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/patrizio-acquadro' },
    { label: 'GitHub', href: 'https://github.com/PatrizioAcquadro' },
    { label: 'Instagram', href: 'https://www.instagram.com/patrizioacquadro/' }
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
    },
    {
      dateLabel: 'Oct 2024',
      isoDate: '2024-10-01',
      text:
        'Obtained my thesis with the maximum grade (110/110), titled "Theoretical Foundations and Real-World Applications of Quantum Machine Learning in Finance".'
    }
  ],
  research: [
    {
      role: 'Visiting Research Student',
      org: 'Purdue University',
      timeframe: 'Jan 2026 - Present',
      bullets: [
        'Built a contact-rich MuJoCo LEGO benchmark to analyze failure modes and robustness in realistic interactions.',
        'Owned end-to-end experiments: data, training, tracking, rapid ablations, and fully reproducible runs.',
        'Deployed and validated a decoder-only transformer policy on the IHMC Alex humanoid for real-time evaluation.'
      ],
      href: 'https://websitepresentation.vercel.app/'
    },
    {
      role: 'Generative AI Researcher',
      org: 'Politecnico di Milano',
      timeframe: 'Feb 2025 - Sep 2025',
      bullets: [
        'Built a 7.6k-snippet repo KB with robust chunking and filtering for broader codebase coverage.',
        'Improved grounding with BM25, CodeBERT-cosine, RRF, and multi-hop query decomposition on harder tasks.',
        'Cut iteration time and GPU cost with 4-bit NF4, caching, and OOM-safe resume runs during large sweeps.'
      ],
      href: 'https://github.com/PatrizioAcquadro/RAG_Project_SE2'
    },
    {
      role: 'Generative AI Researcher & Re-Ranking Specialist',
      org: 'UNIMIB',
      timeframe: 'Mar 2024 - Jun 2024',
      bullets: [
        'Built a LangChain RAG pipeline with pairwise re-ranking for stronger clinical-trial retrieval quality.',
        'Constructed a UMLS-based knowledge base for grounding and concept normalization in medical queries.',
        'Benchmarked open-source and GPT models on clinical accuracy, latency, and cost across end-to-end workloads.'
      ]
    },
    {
      role: 'AI Researcher Intern',
      org: 'Exprivia',
      timeframe: 'Apr 2024 - Jun 2024',
      bullets: [
        'Assessed QML feasibility via market and financial analysis to prioritize practical use cases for deployment.',
        'Modeled the Heston process with PINN and WGAN baselines for quantitative finance in volatile regimes.',
        'Built a hybrid qWGAN in IBM Quantum/Qiskit with fast convergence and low error across pricing experiments.'
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
      title: 'Disneyland Review Analysis',
      timeframe: 'Jun 2023 - Jul 2023',
      built: 'Built a deep-learning pipeline to analyze and predict review ratings from client feedback data.',
      stack: 'Python, Deep Learning, Feedforward NN, Recurrent NN, Feature Engineering',
      href: 'https://github.com/PatrizioAcquadro/Disneyland-Review-Analysis',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Employee Future Prediction',
      timeframe: 'Jan 2023 - Feb 2023',
      built: 'Built a machine-learning workflow to predict employee attrition using comparative sampling and dimensionality reduction strategies.',
      stack: 'Python, Machine Learning, Resampling, Dimensionality Reduction, Model Evaluation',
      href: 'https://github.com/PatrizioAcquadro/Employee-Future-Prediction',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'BIF Translator',
      timeframe: 'Jun 2023 - Jul 2023',
      built: 'Developed an AI translator for BIF and benchmarked transformer-based and bidirectional GRU approaches.',
      stack: 'Python, NLP, Transformers, Bidirectional GRU, Deep Learning',
      href: 'https://github.com/PatrizioAcquadro/BIF-Translator',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Neural Models Analysis',
      timeframe: 'Jan 2024 - Feb 2024',
      built: 'Compared FitzHugh-Nagumo and Hindmarsh-Rose models to study neural dynamics and computational neuroscience behavior.',
      stack: 'Computational Neuroscience, Dynamical Systems, Data Analysis, Python',
      href: 'https://github.com/PatrizioAcquadro/Neural-Dynamics-Comparative-Study',
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
        'Managed local disco and live-event coverage for a youth audience across Biella province through Instagram.',
        'Scaled to 8.9k+ followers and ~550k monthly views in a ~43k-resident market with consistent publishing.',
        'Led a 4+ person team across content, design, communications, and partnerships during peak weeks.'
      ]
    },
    {
      name: 'Adunet Web App',
      role: 'Founder',
      timeframe: 'Apr 2025 - May 2025',
      bullets: [
        'Built and shipped the Next.js app end-to-end, optimizing delivery, security, and performance at launch.',
        'Mapped 50+ venues and 90+ POIs with time-aware events, routes, closures, and logistics for clear navigation.',
        'Led a 10-person onsite team with the local tourist office for promotion and field operations.'
      ]
    },
    {
      name: 'CubeWar Minecraft Server',
      role: 'Co-founder',
      timeframe: 'May 2018 - Jul 2019',
      bullets: [
        'Scaled a custom Minecraft mode to 70-90 daily players (300 peak) across Italy during seasonal events.',
        'Built custom Java plugins for mobs, enchantments, and weapon/armor effects to enrich gameplay.',
        'Managed server and domain operations in a 4-person team, maintaining stable uptime through releases.'
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
      text: 'Led social promotion and communications for the launch of four events, boosting local visibility and attendance.'
    },
    {
      title: 'Guest Speaker - "Chiediamolo all\'AI"',
      timeframe: 'Jun 2025',
      text: 'Spoke on an LLM awareness panel, translating core concepts, risks, and adoption best practices for a broad audience.'
    },
    {
      title: 'Guest Speaker - ASL Biella',
      timeframe: 'Apr 2025',
      text: 'Presented practical AI use cases in neuropsychiatry to ASL physicians to enable workflow integration.'
    },
    {
      title: 'L\'Oreal Brandstorm (You-Real)',
      timeframe: 'Feb 2025 - Mar 2025',
      text: 'Owned the tech concept and UX for an AI smart mirror in a three-person team, shaping the concept for judging.'
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
      text: 'Trained as a first-aid volunteer, supporting emergency response, incident management, and patient assistance.'
    }
  ]
};
