---
title: "Project Phasor - Kickoff"
author:
  - "Brian Anderson"
  - "Florence Lee"
  - "Jason Eshraghian"
  - "Dylan Muir"
  - "Jamie Knight"
  - "William Zeng"
  - "Petrut Bogdan"
  - "Blessing Effiong"
date: 2025-01-28
start_time: 19:00
end_time: 20:00
time_zone: CET
upcoming: false
video: vZ0mlHpSeD0
speaker_slides: https://drive.google.com/drive/folders/1RHIv9JaBvOLeo0MveBvnEAkqKe2Vc9_I?usp=drive_link
image: project-phasor-kickoff.png
description: "Brian Anderson and others discuss the newly launched Project Phasor, aiming to organize efforts towards neuromorphic and NeuroAI virtualization and compilation."
speaker_photo: brian.jpg
speaker_bio: "Brian Anderson is a Neuromorphic Engineer with experience from industry heavy-hitters such as ML Commons, Intel Labs, Google, and NVIDIA. He has pioneered neuromorphic engineering methods and championed neuromorphic technologies in the industry and academia alike. A position he is well suited for, given his degrees in Electrical Engineering and Computer Science from MIT."
---

Project Phasor ([https://www.project-phasor.org/](https://www.project-phasor.org/)) is a collaborative initiative launched to address key gaps and inefficiencies within the neuromorphic and NeuroAI ecosystem. This kickoff session, featuring contributions from Brian Anderson, Florence Lee, Jason Eshraghian, Dylan Muir, Jamie Knight, William Zeng, Petrut Bogdan, and Blessing Effiong, outlines the project's ambitious goals and proposed efforts.

### Core Motivation & Goals

Project Phasor seeks to unite the neuromorphic community to:
*   **Bridge Academia and Commercialization:** Address the disconnect where academic research prioritizes novelty over sustainability, and commercial entities struggle to invest in non-proprietary standards.
*   **Support Large-Scale Training:** Move beyond the current commercial focus on edge inference to enable data center-scale training for neuromorphic models.
*   **Integrate with NeuroAI:** Foster collaboration with the NeuroAI field to guide the development of compute-focused workloads.
*   **Simplify Development:** Tackle the inherent difficulties in compiler development and architecture search for neuromorphic hardware.
*   **Achieve Data Center Scale Engineering:** Leverage and adapt existing conventional ML infrastructure for neuromorphic robustness and error recovery.
*   **Embrace Heterogeneous Computing:** Position neuromorphic hardware as a key component alongside CPUs and GPUs in future compute landscapes.
*   **Fund Promising Research:** Establish resources to support innovative research and its translation to practical applications.

As noted by Dylan Muir (SynSense), "bridges are sorely needed between commercial and academic neuromorphic efforts." Project Phasor aims to speed up the commercial impact of neuromorphic processors by fostering this collaboration and providing shared infrastructure.

### Proposed Key Efforts

1.  **Neuromorphic Virtual Machines (VMs):**
  *   **Purpose:** Lower the barrier to entry for users and system designers by enabling neuromorphic hardware exploration, architecture design, and debugging without physical hardware.
  *   **Approach:** Leverage existing SoC design tools (e.g., SystemC) to create a curated library of behavioral and cycle-accurate reference models for neuromorphic cores and systems.

2.  **Shared Neuromorphic Compiler:**
  *   **Focus:** A production-quality, lower-level compiler framework optimized for heterogeneous integration.
  *   **Goal:** To be a foundational layer ("compiler-first mentality") that enables flexibility for higher-level frameworks, rather than being a high-level framework itself. Will explore techniques like fusion and rematerialization for large, sparse models.

3.  **Open Neuromorphic Datasets:**
  *   **Challenge:** Address the critical shortage of large-scale, publicly available, event-based neuromorphic datasets.
  *   **Solution:** Propose an "Open Source data warehouse for neuromorphic data" to facilitate training and benchmarking of SNNs.

4.  **Joint Research Fund & Microgrants:**
  *   **Aim:** Provide funding to support promising research and incentivize the translation of academic work towards commercial relevance (e.g., implementing benchmarks, contributing to tools).

### Guiding Principles

*   **User-First & Compiler-First Mentality:** Prioritize enabling users and establishing a robust compiler foundation.
*   **Open Development & Governance:** Ensure the project is not biased towards any single hardware vendor, fostering community-driven tools and standards.
*   **Iterate Fast:** Employ rapid development cycles.
*   **Embrace Heterogeneous Computing:** Design for integration within diverse computing environments.
*   **Standardization:** Promote and integrate with industry benchmarks (e.g., ML Commons) to demonstrate neuromorphic advantages.

### Challenges and The Path Forward

The discussion highlighted challenges such as balancing generalizability with efficiency in compilers, accurate power estimation for neuromorphic systems, managing proprietary information while fostering open models, and securing sustainable funding. Insights from analogous initiatives like the Unitary Foundation (Quantum Technologies) suggest starting with high-impact, low-activation-energy projects like microgrants to build momentum.

Project Phasor's success hinges on broad participation, effective governance, and sustained effort to build these foundational elements, ultimately aiming to make neuromorphic computing a competitive and integral part of the future compute landscape. This kickoff session serves as an invitation to the community to get involved and shape this endeavor.
