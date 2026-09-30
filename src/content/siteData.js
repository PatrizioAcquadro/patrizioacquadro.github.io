/**
 * @typedef {{ label: string, href: string }} ContactLink
 * @typedef {{ showPhone: boolean, phoneLabel: string, phoneHref: string }} PrivacyExposure
 * @typedef {{ dateLabel: string, isoDate: string, text: string, href?: string }} NewsItem
 * @typedef {{ role: string, org: string, timeframe: string, bullets: string[], href?: string }} ResearchItem
 * @typedef {{ title: string, timeframe: string, built: string, stack: string, href?: string, hrefLabel?: string, links?: { href: string, label: string }[] }} ProjectItem
 * @typedef {{ name: string, role: string, timeframe: string, bullets: string[] }} VentureItem
 * @typedef {{ title: string, timeframe: string, text: string }} ActivityItem
 */

/**
 * @type {{
 *   name: string,
 *   siteUrl: string,
 *   positioning: string,
 *   bio: string,
 *   lastUpdated: string,
 *   privacyExposure: PrivacyExposure,
 *   contactLinks: ContactLink[],
 *   news: NewsItem[],
 *   research: ResearchItem[],
 *   projects: ProjectItem[],
 *   ventures: VentureItem[],
 *   activities: ActivityItem[]
 * }}
 */
export const siteData = {
  name: 'Patrizio Acquadro',
  siteUrl: 'https://patrizioacquadro.github.io/',
  positioning:
    'I build learning and perception systems for humanoid robots.',
  bio:
    'I’m an R&D Assistant in Robot Learning at Purdue University, based in West Lafayette, Indiana. I work on humanoid manipulation, simulation, and perception that connects vision and hearing. I’m especially interested in transferring learned skills across robots and tasks, alongside my master’s studies in AI at Politecnico di Milano and the University of Milano-Bicocca.',
  lastUpdated: '2026-09-30',
  privacyExposure: {
    showPhone: false,
    phoneLabel: 'Phone',
    phoneHref: 'tel:+10000000000'
  },
  contactLinks: [
    { label: 'Mail', href: 'mailto:acquadropatrizio@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/patrizioacquadro' },
    { label: 'GitHub', href: 'https://github.com/PatrizioAcquadro' },
    { label: 'Instagram', href: 'https://www.instagram.com/patrizioacquadro/' }
  ],
  news: [
    {
      dateLabel: 'Jun 2026',
      isoDate: '2026-06-01',
      text: 'Joined Purdue University as an R&D Assistant in Robot Learning, working on humanoid manipulation and multimodal perception.'
    },
    {
      dateLabel: 'May 2026',
      isoDate: '2026-05-24',
      text: 'Completed V1 of Isaac Audio Sensors, an open-source SDK for simulated robot hearing in Isaac Sim and Isaac Lab.',
      href: 'https://isaac-audio-showcase-site.vercel.app/'
    },
    {
      dateLabel: 'Jan 2026',
      isoDate: '2026-01-01',
      text: 'Started as a Visiting Student Researcher at Purdue University, working on vision-language-action policies and contact-rich bimanual manipulation.'
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
      role: 'R&D Assistant - Robot Learning',
      org: 'Purdue University',
      timeframe: 'Jun 2026 - Present',
      bullets: [
        'Build simulation and control infrastructure in Isaac Sim and Isaac Lab for manipulation with the IHMC Alex humanoid.',
        'Develop Isaac Audio Sensors and audio-visual perception systems for Office of Naval Research (ONR) robotics research.',
        'Mentor an undergraduate researcher on Ego2Grip, guiding the extraction of 3D hand trajectories from first-person video.'
      ]
    },
    {
      role: 'Visiting Student Researcher',
      org: 'Purdue University',
      timeframe: 'Jan 2026 - May 2026',
      bullets: [
        'Built a contact-rich MuJoCo benchmark for bimanual LEGO assembly to study robustness and failure modes.',
        'Integrated a decoder-only transformer policy on the IHMC Alex humanoid for real-time validation.',
        'Owned the experiment pipeline from data and training to tracking and ablations, with reproducible runs.'
      ],
      href: 'https://websitepresentation.vercel.app/'
    },
    {
      role: 'Generative AI Researcher',
      org: 'Politecnico di Milano',
      timeframe: 'Feb 2025 - Sep 2025',
      bullets: [
        'Curated a 7.6k-snippet knowledge base from PySCF and SEED-Emulator, standardizing code chunking and filtering.',
        'Compared BM25, CodeBERT, hybrid retrieval, and multi-hop strategies for repository-level code generation.',
        'Used 4-bit NF4 quantization, caching, and resumable runs to manage GPU memory and experiment costs.'
      ],
      href: 'https://github.com/PatrizioAcquadro/RAG-Code-Generation'
    },
    {
      role: 'Applied ML Researcher',
      org: 'University of Milano-Bicocca',
      timeframe: 'Mar 2024 - Jun 2024',
      bullets: [
        'Built a LangChain retrieval pipeline with pairwise re-ranking for clinical-trial search.',
        'Created a UMLS-based knowledge base to ground medical queries and normalize clinical concepts.',
        'Benchmarked open-source and GPT models on accuracy, latency, and cost.'
      ]
    },
    {
      role: 'AI Research Intern - Quantum ML',
      org: 'Exprivia S.p.A.',
      timeframe: 'Apr 2024 - Jun 2024',
      bullets: [
        'Evaluated quantum machine learning for Heston financial modeling against classical PINN and WGAN baselines.',
        'Implemented a hybrid quantum WGAN in Qiskit and compared its behavior with the classical models.'
      ]
    }
  ],
  projects: [
    {
      title: 'AlexDoor-XAS - Humanoid Door Manipulation',
      timeframe: '2026 - Present',
      built: 'Developing a door-opening benchmark for the IHMC Alex humanoid. I implemented the simulation control and RGB-D sensing setup. The study will compare four action representations with ACT and diffusion policies, testing generalization to unseen doors.',
      stack: 'Python, Isaac Sim, Isaac Lab, RGB-D, PyTorch',
      href: 'https://github.com/PatrizioAcquadro/AlexDoor-XAS',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Isaac Audio Sensors - Robot Hearing SDK',
      timeframe: '2026 - Present',
      built: 'Built an open-source SDK that turns simulated sound into microphone-array recordings, spatial observations, and robot-learning datasets. I developed acoustic simulation, recording and replay, and Isaac Sim/Lab integrations. The package is available open source and remains under active development.',
      stack: 'Python, Isaac Sim, Isaac Lab, Microphone arrays, Acoustic simulation',
      links: [
        {
          href: 'https://github.com/PatrizioAcquadro/isaac-audio-sensors',
          label: 'GitHub repository'
        },
        {
          href: 'https://github.com/PatrizioAcquadro/isaac-audio-sensors/blob/main/knowledge/wiki/index.md',
          label: 'Documentation'
        },
        {
          href: 'https://isaac-audio-showcase-site.vercel.app/',
          label: 'V1 showcase'
        }
      ]
    },
    {
      title: 'SquadBot-AV - Audio-Visual Perception',
      timeframe: '2026 - Present',
      built: 'Developing perception that uses sound to guide visual search and confirm candidate sources. I integrated audio cues, visual objects, and search decisions in a persistent scene graph, with recording and replay for evaluation. Next work connects these decisions to robot head control.',
      stack: 'Python, Audio-visual perception, Scene graphs, ReSpeaker, Isaac Sim',
      hrefLabel: 'Research in progress'
    },
    {
      title: 'Ego2Grip - Learning from First-Person Video',
      timeframe: '2026 - Present',
      built: 'Mentoring an undergraduate researcher on extracting 3D hand trajectories from first-person video. I guide the technical development and evaluation of the trajectory pipeline. The next goal is to turn these trajectories into robot-compatible manipulation demonstrations.',
      stack: 'Python, PyTorch, HaWoR, Ego4D, 3D hand reconstruction',
      href: 'https://github.com/grmpn/Egocentric-Videos',
      hrefLabel: 'Collaborator’s repository'
    },
    {
      title: 'VLA-LEGO - Bimanual Assembly Benchmark',
      timeframe: '2026',
      built: 'Built a contact-rich MuJoCo benchmark for bimanual LEGO assembly with the IHMC Alex model. I developed simulation and reproducible experiment workflows to study robustness and failure modes. The benchmark provides a foundation for vision-language-action policy experiments.',
      stack: 'Python, MuJoCo, PyTorch, Hugging Face Transformers, Hydra, Weights & Biases',
      href: 'https://github.com/PatrizioAcquadro/VLA-LEGO_Project',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Code Agent System & Mini-Transformer Benchmark',
      timeframe: 'May 2025 - Jul 2025',
      built: 'Built a multi-model coding agent with five structured tools and co-designed a 15-task repository benchmark.',
      stack: 'OpenAI, Gemini, OpenRouter, LangChain, Pydantic',
      href: 'https://github.com/PatrizioAcquadro/code-agent-replication',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'STM32N6 NPU On-Device Transformer',
      timeframe: 'May 2025 - Jul 2025',
      built: 'Co-developed and deployed an INT8 transformer on the STM32N6 NPU within memory and latency limits, validated with STMicroelectronics engineers.',
      stack: 'STM32 Edge-AI, X-Cube-AI, CubeIDE, CubeProgrammer, AI Dev Cloud',
      links: [
        {
          href: 'https://patrizioacquadro.github.io/stm32n6-docs/',
          label: 'Documentation'
        },
        {
          href: 'https://github.com/PatrizioAcquadro/Transformer-NPU-STM32N6',
          label: 'GitHub repository'
        }
      ]
    },
    {
      title: 'Transformer for Piano MIDI Generation',
      timeframe: 'Jun 2025 - Jul 2025',
      built: 'Trained and evaluated a 15M-parameter piano MIDI transformer, using attribution and attention analysis to inspect its predictions.',
      stack: 'PyTorch, AdamW, mixed precision, Integrated Gradients, Attention Rollout',
      href: 'https://github.com/PatrizioAcquadro/autoregressive-midi-transformer',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Patient-Nurse-Room Scheduling via MILP',
      timeframe: 'Jan 2025 - Feb 2025',
      built: 'Solved hospital admission scheduling with capacity, compatibility, and staffing constraints using mixed-integer optimization.',
      stack: 'MILP, CBC solver, mip (Python)',
      href: 'https://github.com/PatrizioAcquadro/PatientNurseRoomAssignment_FOR',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Disneyland Review Analysis',
      timeframe: 'Jun 2023 - Jul 2023',
      built: 'Built a deep-learning pipeline to analyze customer reviews and predict their ratings.',
      stack: 'Python, Deep Learning, Feedforward NN, Recurrent NN, Feature Engineering',
      href: 'https://github.com/PatrizioAcquadro/Disneyland-Review-Analysis',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Employee Future Prediction',
      timeframe: 'Jan 2023 - Feb 2023',
      built: 'Predicted employee attrition, comparing resampling and dimensionality reduction strategies.',
      stack: 'Python, Machine Learning, Resampling, Dimensionality Reduction, Model Evaluation',
      href: 'https://github.com/PatrizioAcquadro/Employee-Future-Prediction',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'BIF Translator',
      timeframe: 'Jun 2023 - Jul 2023',
      built: 'Built an AI translator for BIF, comparing transformer and bidirectional GRU models.',
      stack: 'Python, NLP, Transformers, Bidirectional GRU, Deep Learning',
      href: 'https://github.com/PatrizioAcquadro/BIF-Translator',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Neural Models Analysis',
      timeframe: 'Jan 2024 - Feb 2024',
      built: 'Compared FitzHugh-Nagumo and Hindmarsh-Rose models to study neuronal dynamics.',
      stack: 'Computational Neuroscience, Dynamical Systems, Data Analysis, Python',
      href: 'https://github.com/PatrizioAcquadro/Neural-Dynamics-Comparative-Study',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Medical Trials Search Engine',
      timeframe: 'Dec 2023 - Jan 2024',
      built: 'Built a clinical-trial search engine with LLM-assisted keyword extraction and filtering.',
      stack: 'GPT-3.5 Turbo, retrieval pipeline, knowledge base integration',
      href: 'https://github.com/PatrizioAcquadro/Clinical-Trial-Search-Engine',
      hrefLabel: 'GitHub repository'
    },
    {
      title: 'Castle War',
      timeframe: 'Jul 2022 - Sep 2022',
      built: 'Built a Python game from scratch, including gameplay logic, algorithms, and graphics.',
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
  activities: [
    {
      title: 'TOYP 2026',
      timeframe: 'Apr 2026',
      text: 'Won the volunteering category as a Talent Inspiring the Future, recognized for the local impact of BiellaInFesta and Adunet.'
    },
    {
      title: 'JCI (Junior Chamber International) Biella',
      timeframe: 'Jul 2025 - Present',
      text: 'Led social promotion and communications in a 14-member JCI team, supporting the launch of four events and boosting local visibility and attendance.'
    },
    {
      title: 'Guest Speaker - "Chiediamolo all\'AI"',
      timeframe: 'Jun 2025',
      text: 'Spoke on an LLM-awareness panel with live demos, translating core concepts, risks, ethics, and adoption best practices for a broad audience.'
    },
    {
      title: 'Guest Speaker - ASL Biella',
      timeframe: 'Apr 2025',
      text: 'Presented practical AI use cases in neuropsychiatry to ASL physicians for workflow integration, then moderated clinician Q&A on pilot design.'
    },
    {
      title: 'L\'Oreal Brandstorm (You-Real)',
      timeframe: 'Feb 2025 - Mar 2025',
      text: 'Owned the tech concept and UX for an AI smart mirror and companion app in a three-person team, shaping the concept for judging.'
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
      text: 'Completed first-aid volunteer training and qualification, then supported emergency response, incident management, and patient assistance.'
    }
  ]
};
