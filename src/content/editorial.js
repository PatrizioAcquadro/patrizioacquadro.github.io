import { siteData } from './siteData.js';

// Presentation choices live here; source facts live in siteData.js.
const ids = {
  projects: ['alexdoor-xas', 'isaac-audio-sensors', 'squadbot-av', 'ego2grip', 'vla-lego', 'code-agent-system', 'stm32n6-transformer', 'midi-transformer', 'hospital-scheduling', 'disneyland-reviews', 'employee-prediction', 'bif-translator', 'neural-dynamics', 'clinical-trial-search', 'castle-war'],
  research: ['purdue-robot-learning', 'purdue-visiting-research', 'polimi-generative-ai', 'bicocca-applied-ml', 'exprivia-quantum-ml'],
  ventures: ['bif', 'adunet', 'cubewar'],
  activities: ['toyp-2026', 'jci-biella', 'chiediamolo-ai', 'asl-biella', 'loreal-brandstorm', 'ielts', 'google-cloud', 'red-cross']
};

export const content = { ...siteData };
for (const [collection, keys] of Object.entries(ids)) {
  if (keys.length !== siteData[collection].length) throw new Error(`Update editorial IDs for ${collection}`);
  content[collection] = siteData[collection].map((item, index) => ({ ...item, id: keys[index] }));
}
content.news = [...siteData.news].sort((a, b) => b.isoDate.localeCompare(a.isoDate)).map((item) => ({ ...item, id: `update-${item.isoDate}` }));

// Education and languages are transcribed from the byte-identical local CV.
export const education = [
  { id: 'polimi-msc', institution: 'Politecnico di Milano', displayInstitution: 'Politecnico\ndi Milano', degree: 'M.S. Computer Science & Engineering · AI', timeframe: 'Sep 2024 – Present', notes: ['GPA: 27/30.', 'Honors in LLMs (PhD course) and Software Engineering II.'] },
  { id: 'bicocca-msc', institution: 'University of Milano-Bicocca', displayInstitution: 'University of\nMilano-Bicocca', degree: 'M.S. AI for Science and Technology', timeframe: 'Sep 2024 – Present', notes: ['Top grades (30/30) in Advanced AI and Machine Learning.', 'Also 30/30 in Deep Learning and Embedded Systems.'] },
  { id: 'purdue-exchange', institution: 'Purdue University', displayInstitution: 'Purdue\nUniversity', degree: 'Visiting Exchange Student', timeframe: 'Aug 2025 – May 2026', notes: ['Selected on merit: 1 of 2 students from a 674-student cohort.', 'First-year M.Sc. Computer Science at Politecnico di Milano.'] },
  { id: 'pavia-bsc', institution: 'University of Pavia', displayInstitution: 'University\nof Pavia', degree: 'B.S. Artificial Intelligence', timeframe: 'Sep 2021 – Oct 2024', notes: ['Graduated with 110/110.', 'Thesis on quantum machine learning in finance.'] }
];
export const languages = 'Italian (native), English (fluent; IELTS 7.5), French (basic).';

export const activityProfiles = {
  'toyp-2026': { title: 'TOYP 2026', category: 'Recognition' },
  'jci-biella': { title: 'JCI Biella', category: 'Community leadership' },
  'chiediamolo-ai': { title: 'Chiediamolo all’AI', category: 'Public speaking' },
  'asl-biella': { title: 'ASL Biella', category: 'Public speaking' },
  'loreal-brandstorm': { title: 'L’Oréal Brandstorm · You-Real', category: 'Product concept' },
  'ielts': { title: 'IELTS Academic · 7.5', category: 'Language certification' },
  'google-cloud': { title: 'Introduction to Generative AI', category: 'Google Cloud Skills Boost' },
  'red-cross': { title: 'Italian Red Cross', category: 'Training & volunteering' }
};

export const ventureProfiles = {
  bif: { name: 'BiellaInFesta', purpose: 'Local events & community', metrics: [['10k+', 'followers'], ['800k', 'monthly views'], ['4+', 'team members at peak']] },
  adunet: { name: 'Adunet', purpose: 'Festival navigation', metrics: [['8–10k', 'festival visitors / day'], ['90+', 'mapped points of interest'], ['10', 'onsite team members']] },
  cubewar: { name: 'CubeWar', purpose: 'Minecraft & multiplayer', metrics: [['70–90', 'daily players'], ['300', 'peak players'], ['4', 'team members']] }
};

export const projectArt = {
  'alexdoor-xas': { art: 'door', alt: 'Concept diagram of a door, its motion arc, and a robot end effector.', caption: 'Door manipulation / Concept diagram' },
  'isaac-audio-sensors': { art: 'sound', alt: 'Concept diagram of sound waves arriving at a circular microphone array.', caption: 'Spatial listening / Concept diagram' },
  'squadbot-av': { art: 'squadbot-av', alt: 'Visual and acoustic observations connect to a scene graph and a temporal world model around a robot head.', caption: 'Audiovisual perception / Concept diagram' },
  'ego2grip': { art: 'ego2grip', alt: 'A reconstructed hand skeleton is mapped from a first-person video frame to a robot gripper.', caption: 'Hand motion retargeting / Concept diagram' },
  'vla-lego': { art: 'vla-lego', alt: 'Two robot grippers coordinate the placement of a brick onto an assembly plate.', caption: 'Bimanual assembly / Concept diagram' },
  'code-agent-system': { art: 'code-agent-system', alt: 'A coding task connects to a model, five structured tools, generated code, and a benchmark grid.', caption: 'Coding agents and evaluation / Concept diagram' },
  'stm32n6-transformer': { art: 'chip', alt: 'Concept diagram of a processor with connected computation blocks.', caption: 'Embedded intelligence / Concept diagram' },
  'midi-transformer': { art: 'midi-transformer', alt: 'A sequence of piano-roll notes connects to a piano keyboard through a token generation path.', caption: 'Symbolic music generation / Concept diagram' },
  'hospital-scheduling': { art: 'hospital-scheduling', alt: 'Patient, nurse, and room symbols are connected through an assignment matrix and a scheduling grid.', caption: 'Constrained hospital scheduling / Concept diagram' },
  'disneyland-reviews': { art: 'disneyland-reviews', alt: 'Written review bubbles pass through a neural representation to a row of rating stars.', caption: 'Review analysis and rating prediction / Concept diagram' },
  'employee-prediction': { art: 'employee-prediction', alt: 'Anonymous employee records connect to a reduced feature space and two model output branches.', caption: 'Employee attrition modeling / Concept diagram' },
  'bif-translator': { art: 'bif-translator', alt: 'Italian and English message cards are connected by parallel transformer and bidirectional GRU paths.', caption: 'Neural translation / Concept diagram' },
  'neural-dynamics': { art: 'neural-dynamics', alt: 'Two illustrative neuronal spike patterns sit alongside a phase portrait for comparing dynamical models.', caption: 'Neuronal dynamics / Concept diagram' },
  'clinical-trial-search': { art: 'clinical-trial-search', alt: 'A search query is connected to extracted keywords, document retrieval, and filtered study records.', caption: 'Clinical-trial retrieval / Concept diagram' },
  'castle-war': { art: 'castle-war', alt: 'Two stylized castles face each other across a gridded landscape with a player token and movement route.', caption: 'Game systems / Concept illustration' }
};

// Research narratives are checked against the repository plans and status pages.
// Directions describe the intended destination, not completed experimental results.
// See ROBOTICS_SOURCES.md for the source snapshot and attribution decisions.
export const roboticsProfiles = {
  'alexdoor-xas': {
    name: 'AlexDoor-XAS', focus: 'Humanoid manipulation',
    headline: 'Learning to open\nunseen doors.',
    overview: 'How should a humanoid represent an action when the door in front of it is new? A research platform connecting RGB-D perception, contact-aware control, and imitation learning.',
    contribution: 'I develop simulation, perception, action adapters, and evaluation infrastructure for IHMC Alex, with a qualified 32-door corpus and a matched A1–A4 × ACT/Diffusion study design.',
    direction: 'Establish how joint-, Cartesian-, door-, and object-centric actions affect generalization to unseen doors, then extend the approach to other articulated objects.'
  },
  'isaac-audio-sensors': {
    name: 'Isaac Audio Sensors', focus: 'Robot hearing · Open source',
    headline: 'A sense of hearing\nfor simulated robots.',
    overview: 'An open-source toolkit for robot hearing. It turns simulated sound into microphone-array signals and spatial observations for perception and robot-learning experiments.',
    contribution: 'I build acoustic simulation, multichannel recording and replay, dataset tools, and learning-ready observations across Python, Isaac Sim, and Isaac Lab.',
    direction: 'Validate robot hearing from acoustic scenes to live learning, with physical comparisons and defined operating conditions.'
  },
  'squadbot-av': {
    name: 'SquadBot-AV', focus: 'Audiovisual attention',
    headline: 'Seeing, hearing.\nKnowing where to look.',
    overview: 'Assistive humanoid attention that combines vision, sound, and an operator’s instructions to decide whom to attend to—and where to turn its head.',
    contribution: 'I develop synchronized sensing, GPU perception, temporal audiovisual memory, attention policies, and independent evaluation for the fixed-base IHMC Alex003 in simulation.',
    direction: 'Connect robust audiovisual attention to calibrated physical sensing and bounded head control on Alex003, progressing through independent evaluation and shadow integration.'
  },
  'ego2grip': {
    name: 'Ego2Grip', focus: 'Learning from human demonstrations',
    headline: 'Human motion.\nRobot demonstrations.',
    overview: 'A research pipeline for learning from everyday human demonstrations. It starts with 3D hand motion from first-person video and works toward annotated robot-gripper trajectories.',
    contribution: 'I mentor the undergraduate researcher developing the pipeline, guiding 3D hand reconstruction, dataset design, and retargeting to IHMC Alex grippers. The reproducible HaWoR baseline is complete.',
    direction: 'Build a diverse, annotated demonstration dataset, validate hand-to-gripper trajectories in simulation, and transfer selected motions to the physical robot.'
  },
  'vla-lego': {
    name: 'VLA-LEGO', focus: 'Vision-language-action learning',
    headline: 'Language to action.\nOne brick at a time.',
    overview: 'A contact-rich assembly testbed for studying how vision-language models generate coordinated, continuous actions for two robot arms.',
    contribution: 'I built a MuJoCo bimanual LEGO benchmark and VLA architecture, connecting visual-language representations to a flow-matching action head and reproducible experiment tooling.',
    direction: 'Train and evaluate language-conditioned bimanual assembly, study robustness and failure modes, and work toward transfer to the IHMC Alex humanoid.'
  }
};

export const ventureArt = {
  bif: { art: 'venture-bif', alt: 'BiellaInFesta lettering beside an outdoor music stage and a connected crowd in a town square.', caption: 'BiellaInFesta / Events & community' },
  adunet: { art: 'venture-adunet', alt: 'Adunet lettering beside a mobile festival map with a route connecting venues, events, and city landmarks.', caption: 'Adunet / A festival, connected' },
  cubewar: { art: 'venture-cubewar', alt: 'CubeWar lettering above a floating voxel island with a fortress, block characters, trees, and a multiplayer server.', caption: 'CubeWar / Minecraft & multiplayer' }
};

export const selectedWork = [
  {
    id: 'alexdoor-xas', label: 'Robot learning', title: 'Learning to open\nunseen doors.',
    summary: 'A research platform for studying action representations in humanoid door manipulation.',
  },
  {
    id: 'isaac-audio-sensors', label: 'Multimodal perception', title: 'Giving robots\na sense of hearing.',
    summary: 'An open-source SDK for simulated robot hearing in Isaac Sim and Isaac Lab.',
  },
  {
    id: 'stm32n6-transformer', label: 'AI engineering', title: 'Intelligence,\non the device.',
    summary: 'A co-developed INT8 transformer deployed on the STM32N6 NPU.',
  }
].map((work) => ({ ...work, ...projectArt[work.id] }));
