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

export const selectedWork = [
  {
    id: 'alexdoor-xas', label: 'Robot learning', title: 'Learning to interact\nwith the real world.',
    summary: 'Exploring how action representations shape humanoid door manipulation.',
    art: 'door', alt: 'Concept diagram of a door, its motion arc, and a robot end effector.',
    caption: 'Door manipulation / Concept diagram'
  },
  {
    id: 'isaac-audio-sensors', label: 'Multimodal perception', title: 'Giving robots\na sense of hearing.',
    summary: 'An open-source SDK for simulated robot hearing in Isaac Sim and Isaac Lab.',
    art: 'sound', alt: 'Concept diagram of sound waves arriving at a circular microphone array.',
    caption: 'Spatial listening / Concept diagram'
  },
  {
    id: 'stm32n6-transformer', label: 'AI engineering', title: 'Intelligence,\non the device.',
    summary: 'A co-developed INT8 transformer deployed on the STM32N6 NPU.',
    art: 'chip', alt: 'Concept diagram of a processor with connected computation blocks.',
    caption: 'Embedded intelligence / Concept diagram'
  }
];
