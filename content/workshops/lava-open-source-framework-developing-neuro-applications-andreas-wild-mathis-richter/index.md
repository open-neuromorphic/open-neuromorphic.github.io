---
title: "Lava: An Open-Source Software Framework for Developing Neuro-Inspired Applications"
author:
  - "Andreas Wild"
  - "Mathis Richter"
date: 2023-05-31
video: vXZukQ6A79k
image: lava-open-source-framework.png
speaker_slides: lava-slides.pdf
type: "workshops"
software_tags: ["lava"]
hardware_tags: ["loihi-intel", "loihi-2-intel"]
experience_tags: ["researcher", "practitioner", "intermediate", "advanced"]
expertise_tags: ["software", "snn", "machine-learning", "algorithms-learning"]
summary_points:
  - "Lava utilizes an asynchronous, event-based programming model where independent processes communicate strictly via message passing."
  - "The framework is hardware-agnostic, capable of compiling heterogeneous workloads to CPUs, GPUs, and Loihi neurocores."
  - "Lava includes specialized algorithm libraries like Lava DL for deep learning and Lava Optim for quadratic and continuous constraint optimization."
  - "The software stack allows developers to map high-level behaviors to distinct hardware models using a unified API."
description: "Explore how Intel's Lava framework uses asynchronous message passing and specialized libraries to compile neuromorphic workloads for Loihi 2 and CPUs."
---

Intel's Lava framework addresses the historical fragmentation of neuromorphic software by providing an open-source, hardware-agnostic stack. Built on an explicitly parallel and asynchronous programming model, Lava enables developers to construct neuro-inspired applications that compile seamlessly to standard CPUs, GPUs, and specialized neuromorphic backends like Loihi 2.

## Key Takeaways
- Lava utilizes an asynchronous, event-based programming model where independent processes communicate strictly via message passing.
- The framework is hardware-agnostic, capable of compiling heterogeneous workloads to CPUs, GPUs, and Loihi neurocores.
- Lava includes specialized algorithm libraries like Lava DL for deep learning and Lava Optim for quadratic and continuous constraint optimization.
- The software stack allows developers to map high-level behaviors to distinct hardware models using a unified API.

## Workshop Format & Takeaways
The session provided a comprehensive structural overview of the Lava software stack, moving from runtime concepts to high-level application libraries. Instead of relying on standard neural network "layers," Lava abstracts everything as a "Process"—a fundamental building block that communicates via asynchronous message channels.

The workshop detailed Lava's algorithmic libraries, highlighting `Lava DL` (for training deep neural networks and performing hardware-aware quantization) and `Lava Optim` (which leverages recurrent dynamics to achieve orders-of-magnitude gains on constraint satisfaction and quadratic programming problems). The speakers also detailed the network exchange format (`netx`), demonstrating how an SNN trained offline in Lava DL is instantiated and deployed directly to Loihi 2 for real-time inference.

As discussed in the session, Lava maintains a clear separation between its open-source API (available on GitHub for CPU/GPU simulation) and its proprietary Loihi backend extensions, which remain restricted to Intel Neuromorphic Research Community (INRC) members.

## What This Means for Neuromorphic Computing
Lava represents a significant step toward tooling convergence in the neuromorphic community. By abstracting hardware-specific requirements behind an open, process-oriented API, developers can focus on algorithmic design without being locked into a single proprietary hardware SDK. This structural flexibility opens the door to cross-platform benchmarks and broader adoption in standard computing workflows.

## Resources
- [Speaker Slides](lava-slides.pdf)
- [Intel Neuromorphic Research Community (INRC)](#)
