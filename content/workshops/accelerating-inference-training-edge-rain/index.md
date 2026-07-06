---
title: "Accelerating Inference and Training at the Edge"
author:
  - "Maxence Ernoult"
  - "Gregor Lenz"
date: 2024-03-05
description: "Digital in-memory computing and INT8 quantization directly accelerate efficient edge training and inference for small vision models on neuromorphic hardware."
upcoming: false
video: _Jyhu97HiP4
image: rain-ai-workshop-inference.png
type: "workshops"
experience_tags: ["researcher", "advanced"]
expertise_tags: ["digital-hardware", "analog-hardware", "algorithms-learning", "computer-vision"]
field_of_application_tags: ["iot", "consumer-electronics"]
content_source: "talk-summary"
summary_points:
  - "Digital in-memory computing (SRAM) offers immediate energy efficiency gains over purely analog systems."
  - "Edge training requires capabilities like test-time adaptation and federated learning using integer quantization."
  - "Physical and mathematical principles are prioritized over strict biological inspiration for hardware design."
---

In this session, Maxence Ernoult, Research Scientist at Rain AI, breaks down the technological roadmap for building hardware optimized for inference and training at the edge. The presentation explores the hardware and algorithmic tradeoffs required to achieve extreme energy efficiency, highlighting why pragmatic engineering often supersedes strict biological mimicking in commercial deployments.

## Key Takeaways
- **Digital in-memory computing (SRAM) offers immediate energy efficiency gains over purely analog systems.**
- **Edge training requires capabilities like test-time adaptation and federated learning using integer quantization.**
- **Physical and mathematical principles are prioritized over strict biological inspiration for hardware design.**

## Workshop Format & Takeaways
The session was structured as a deep-dive presentation followed by a community Q&A. The core technical focus was divided into short-term and long-term horizons. In the short term, the roadmap emphasizes highly customized digital in-memory computing blocks (utilizing SRAM cells to store weights and perform bitwise multiplications simultaneously) alongside custom INT8 quantization. Because data movement accounts for the vast majority of AI energy costs—with memory access being up to 200 times more expensive than the compute operation itself—this co-location of memory and processing represents a massive efficiency gain.

In the long run, the session explored analog in-memory computing paired with physics-driven learning algorithms, like equilibrium propagation, where the circuit effectively becomes the model itself. However, Ernoult stressed that pure analog hardware is currently hindered by noise and materials challenges, leading Rain AI to pivot its immediate engineering efforts toward reliable, scalable digital IP that targets small vision models (like ResNets and MobileNets) for edge devices rather than massive language models.

## What This Means for the Field
A recurring debate in the neuromorphic community is whether to pursue pure analog architectures or stick to digital paradigms. This session highlights a pragmatic, hybrid middle ground: prioritizing scalable, digital in-memory compute today while paving the theoretical groundwork for analog systems tomorrow. By moving away from "mimicking the brain for the sake of mimicking the brain," the field can focus on what actually drives commercial viability at the edge: overcoming the memory wall and drastically reducing the power cost of data movement.

The implications for edge computing are substantial. The capacity to execute on-device learning—specifically through quantized gradients that support test-time adaptation and federated learning—means edge devices can continually adapt to novel environments without constantly streaming data back to a centralized cloud. This preserves user privacy and drastically reduces operational latency.

> "I think that this neuroscience inspiration in so-called neuromorphic computing is a little bit overhyped, and people fool themselves into mimicking the brain rather than using it as a means to achieve better energy efficiency." — as noted in the session.

> "AI is costly because of data movement, compute, and because of the gap between software and circuits... it's at most 200 times more expensive to access data than compute with it." — as noted in the session.
