---
title: "Programming Scalable Neuromorphic Algorithms with Fugu"
author:
  - "Brad Aimone"
  - Gregor Lenz
date: 2023-12-19
video: UDM9Mbd0Vaw
description: "Fugu provides a hardware-agnostic intermediate representation to compile scalable, non-deep-learning neuromorphic algorithms into spiking circuits."
image: fugu-neuromorphic-algorithyms.png
speaker_code: https://github.com/sandialabs/Fugu
speaker_slides: Fugu_Aimone.pdf
type: workshops
experience_tags:
  - researcher
  - advanced
expertise_tags:
  - snn
  - software
  - algorithms-learning
  - neuroscience
content_source: "talk-summary"
summary_points:
  - "Fugu serves as a hardware-agnostic intermediate representation, compiling computational graphs into spiking circuits."
  - "The framework uses 'bricks' (reusable functional neural circuits) and 'scaffolds' (programs organizing those circuits into complex data flows)."
  - "It targets scalable, non-deep-learning workloads like Markov chain Monte Carlo, random walks, and streaming binary arithmetic."
  - "Fugu is entirely Python-based, utilizing NetworkX to handle arbitrary directed acyclic graphs before compiling them to specific hardware backends."
---

Fugu is a high-level, open-source framework developed by Sandia National Laboratories, specifically designed for developing spiking circuits in terms of computation graphs. With a base leaky-integrate-and-fire (LIF) neuron model at its core, neural circuits are built as "bricks." These foundational computations are then combined and composed as "scaffolds" to construct larger computations. This allows researchers to describe spiking circuits in terms of neural features common to most neuromorphic architectures, rather than platform-specific hardware designs.

## Key Takeaways
- **Hardware-agnostic representation:** Fugu acts as a crucial intermediate layer between high-level algorithm design and changing physical hardware, allowing the same spiking graph to compile down to Loihi, SpiNNaker, or other custom backends.
- **Compositional circuit building:** Fugu introduces "bricks" (pre-defined neural circuits for tasks like addition or multiplication) and "scaffolds" (directed acyclic graphs dictating how bricks interact).
- **Beyond deep learning:** While it can support artificial neural networks, the framework is optimized for "Artisan algorithms" and biologically-inspired computing, including graph optimization, streaming arithmetic, and Markov chain Monte Carlo processes.
- **Integration with evolutionary search:** Fugu can be paired with evolutionary algorithms like NEAT to automatically discover highly efficient, specialized neural topologies for specific tasks.

## Workshop Format & Takeaways
The session outlined the conceptual gap between neuroscience, algorithm design, and device physics, positioning Fugu as the necessary bridge. The presentation detailed the underlying Python and NetworkX architecture that powers Fugu's graph generation, walking through a concrete example of streaming binary arithmetic (building an adder and a multiplier entirely out of spiking neurons). Finally, the workshop showcased advanced use-cases, illustrating how coupling Fugu with evolutionary algorithms on high-performance computing (HPC) clusters can automate the discovery of novel spiking topologies.

## What This Means for Neuromorphic Computing
As the neuromorphic hardware landscape fragments—with diverse chips offering differing constraints on fan-in, time scales, and precision—algorithm designers face a steep barrier to entry. Fugu abstracts away hardware-specific register routing and timing constraints. By standardizing the description of spiking algorithms into a generic, mathematically sound representation, the framework ensures that algorithmic breakthroughs are not lost when hardware generations inevitably turn over.

Furthermore, Fugu challenges the field to look beyond porting traditional Deep Learning models (like CNNs) to spiking substrates. By providing the tools to build scalable, dynamically complex, and temporally rich architectures, it accelerates the exploration of genuinely brain-inspired computing paradigms.

## Resources
- **Speaker Code:** [https://github.com/sandialabs/Fugu](https://github.com/sandialabs/Fugu)
- **Speaker Slides:** [Fugu_Aimone.pdf](Fugu_Aimone.pdf)
