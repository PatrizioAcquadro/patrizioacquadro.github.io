import { siteData } from './siteData.js';

// Presentation choices live here; the copied source facts remain untouched.
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

export const selectedWork = [
  {
    id: 'alexdoor-xas', label: 'Robot learning', title: 'Learning to interact\nwith the real world.',
    summary: 'Exploring how action representations shape humanoid door manipulation.',
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
