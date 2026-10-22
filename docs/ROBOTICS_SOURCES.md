# Robotics editorial sources

Reviewed on 22 October 2026 through the connected GitHub integration. These notes record the source basis for the Projects presentation; they are not a new validation of the robotics repositories.

## Editorial rule

The page presents a full research direction while separating the current contribution from the long-term destination. No future roadmap item is presented as a completed experiment, physical deployment, publication, or measured performance result. The “Long-term direction” label is visible in the static HTML for every robotics project.

The original source snapshot in `src/content/siteData.js` is unchanged. Updated robotics narratives live in `roboticsProfiles` in `src/content/editorial.js`. Project IDs, timeframes, technology tags, existing links, illustrations and collaborator attribution are retained. AI/software descriptions are unchanged.

## Reconciliation decisions

- **AlexDoor-XAS:** foreground humanoid manipulation, observed RGB-D inputs and the action-representation research question. The 32-door corpus is completed; the matched A1–A4 × ACT/Diffusion comparison is a study design. The current B1 learning/data and held-out evaluation are pending. Do not describe the historical state-only B0 experiment as a completed B1 comparison, or the current stack as a demonstrated VLA controller. Generalization and other articulated objects are the research destination.
- **Isaac Audio Sensors:** describe the implemented open-source SDK, acoustic simulation, array signals, recording/replay and learning interfaces. End-to-end qualification and physical transfer remain bounded future validation. The source checkout is 3.0.0 unreleased; the published package is 2.0.0. The portfolio makes no new release or universal real-time/physical-fidelity claim.
- **SquadBot-AV:** replace the outdated MiniSceneGraph emphasis with the maintained attention task: synchronized audiovisual sensing, temporal memory, operator instructions, policies and independent evaluation. The current platform is fixed-base Alex003 in simulation. Physical sensing/control integration is a long-term direction. No mobility, manipulation, autonomous assistance inference, medical decision or physical deployment is claimed. The repository is private; no new public CTA to it is introduced. The portfolio uses a high-level research summary and does not copy private experiment measurements or partner details.
- **Ego2Grip:** keep Patrizio’s mentorship role and the collaborator’s repository attribution explicit. The unchanged-HaWoR baseline is accepted; language-aligned datasets, gripper retargeting, simulation validation and physical playback are later milestones. The full roadmap motivates the vision, without implying these later deliverables already exist.
- **VLA-LEGO:** retain the sourced MuJoCo benchmark and VLA architecture contribution. The architecture report supports a vision-language backbone and continuous flow-matching action head. Training, assembly performance, robustness evaluation and humanoid transfer are framed as direction. The detailed plans take precedence over the older README’s aspirational feature list; architecture/software validation is not successful physical assembly.

## Source snapshot

GitHub links point to the reviewed default-branch paths; the Git blob SHA identifies the exact content read. The source documents may evolve after this review. The VLA-LEGO completion report was read through line 110; its executive summary and architecture sections support the claims used here.

| Document | Reviewed blob SHA |
| --- | --- |
| [AlexDoor-XAS](https://github.com/PatrizioAcquadro/AlexDoor-XAS/blob/main/README.md) | `5c06561acf296538a704d49e6ba86e4701f69ab6` |
| [AlexDoor-XAS: current status](https://github.com/PatrizioAcquadro/AlexDoor-XAS/blob/main/knowledge/wiki/status.md) | `a39345fe85dba16d94608e3891699934dd2f819e` |
| [AlexDoor-XAS: benchmark decision](https://github.com/PatrizioAcquadro/AlexDoor-XAS/blob/main/knowledge/wiki/decisions/visuoproprioceptive-generalization-benchmark.md) | `54c65d0edf55a7dbdf636fd0582494ba6d6004b5` |
| [Isaac Audio Sensors](https://github.com/PatrizioAcquadro/isaac-audio-sensors/blob/main/README.md) | `1655ace0e7801a195d74f6e995cc93ce09cbb3b4` |
| [Isaac Audio Sensors: current status](https://github.com/PatrizioAcquadro/isaac-audio-sensors/blob/main/knowledge/wiki/status.md) | `66fa183c2bc6f8fef2d5979de62b541faa58a453` |
| [Isaac Audio Sensors: product closeout plan](https://github.com/PatrizioAcquadro/isaac-audio-sensors/blob/main/knowledge/wiki/implementation_phases/10-end-to-end-validation-and-product-closeout.md) | `9b128d11eee08dc428d9915ab1010f407aac2f8e` |
| [SquadBot-AV: current scope](https://github.com/PatrizioAcquadro/squadbot-av/blob/main/README.md) | `36d7e5342f2eab2e459353d4ea960266d7390361` |
| [SquadBot-AV: current status](https://github.com/PatrizioAcquadro/squadbot-av/blob/main/knowledge/wiki/status.md) | `54391d95df06348d615ad21f159a56fa25365104` |
| [SquadBot-AV: roadmap](https://github.com/PatrizioAcquadro/squadbot-av/blob/main/knowledge/wiki/topics/alex003-scope-and-roadmap.md) | `2b00f4b6cc4859884b1f8cb5b6e617d887f3f615` |
| [Ego2Grip: collaborator repository](https://github.com/grmpn/Egocentric-Videos/blob/main/README.md) | `9cd42a09487f5e8f34e99f0f02e02baefe6d82a6` |
| [Ego2Grip: accepted baseline](https://github.com/grmpn/Egocentric-Videos/blob/main/knowledge/agent/PROJECT_STATUS.md) | `6991cfa4ca65ee607445a250b7eea2ebaa72eff7` |
| [Ego2Grip: overall milestones](https://github.com/grmpn/Egocentric-Videos/blob/main/knowledge/raw/Project-Milestones-and-Timeline.md) | `db8ab81ffa38a8c9ab70ade9037708fb3b775281` |
| [VLA-LEGO: overall research goals](https://github.com/PatrizioAcquadro/VLA-LEGO_Project/blob/main/README.md) | `d083c6c0d93153fdfb3a52e95db078728316c8e6` |
| [VLA-LEGO: architecture completion report](https://github.com/PatrizioAcquadro/VLA-LEGO_Project/blob/main/docs/phase3.1-3.2-report.md) | `3f81cfc697bb3f57391f60c66c6af950dd9b4218` |
| [VLA-LEGO: training plan](https://github.com/PatrizioAcquadro/VLA-LEGO_Project/blob/main/docs/roadmap/phase4.2.md) | `1356f68b5f84c97201f825c5a2b389f83cde47a3` |

## Verification scope

Site validation checks narrative coverage, explicit mentorship/direction labels, preserved collections and links, all five robotics shortcuts, image loading and relative desktop prominence, contrast, reflow and no-JavaScript operation. It does not rerun robot experiments or qualify hardware.
