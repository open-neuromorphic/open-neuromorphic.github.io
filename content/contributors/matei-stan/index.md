---
title: "Learning Long Sequences in Spiking Neural Networks with Matei Stan"
author:
  - "Matei Stan"
date: 2025-07-27
description: "Discover how combining State Space Models with Spiking Neural Networks and a novel Gated Spiking Unit beats Transformers on long-range sequence benchmarks."
upcoming: false
video: "RB11UYu7bFY"
image: "banner.png"
type: "student-talks"
speaker_paper: "https://arxiv.org/abs/2401.00955"
paper_license: "CC-BY-NC-SA"
experience_tags: ["researcher", "advanced"]
expertise_tags: ["snn", "machine-learning", "algorithms-learning"]
summary_points:
  - "State Space Models (SSMs) offer parallelizable training and iterative inference, making them an ideal match for Spiking Neural Networks."
  - "SSM-based SNNs outperform standard Transformers on long-sequence tasks like the Long-Range Arena benchmark."
  - "Binary activations in SNNs create a computational bottleneck due to saturating gradients."
  - "The novel Gated Spiking Unit (GSU) bypasses this bottleneck using non-saturating gradients, maintaining high accuracy without dense MAC operations."
---

Matei Stan’s research investigates the intersection of State Space Models (SSMs) and Spiking Neural Networks (SNNs) for long-range sequence modeling. By addressing the specific drawbacks of binary activations and saturating gradients, this approach scales neuromorphic solutions for complex, memory-intensive tasks while dramatically reducing energy consumption.

## Key Takeaways
- State Space Models (SSMs) offer parallelizable training and iterative inference, making them an ideal match for Spiking Neural Networks.
- SSM-based SNNs outperform standard Transformers on long-sequence tasks like the Long-Range Arena benchmark.
- Binary activations in SNNs create a computational bottleneck due to saturating gradients.
- The novel Gated Spiking Unit (GSU) bypasses this bottleneck using non-saturating gradients, maintaining high accuracy without dense MAC operations.

## About the Research
Based on the paper "Learning Long Sequences in Spiking Neural Networks," this session explores how SSMs share computational primitives with standard Leaky Integrate-and-Fire (LIF) neurons. Unlike traditional RNNs or SNNs, which require slow, iterative simulation during training, SSMs view recurrence as a convolution. This allows the entire operation to run in parallel on GPUs via Fast Fourier Transforms, drastically speeding up training times from days to hours.

However, applying binary activations (spikes) introduces saturating gradients, effectively placing a hard ceiling on model accuracy even when using ideal surrogate gradients. To solve this, the research introduces a feature mixing layer called the Gated Spiking Unit (GSU). By running a non-saturating gradient route in parallel with ternary weights, the GSU enables deep, accurate learning without relying on energy-heavy multiply-accumulate (MAC) operations.

## What This Means for Neuromorphic Computing
This work paves the way for deploying powerful SSM-based architectures—potentially reaching the scale of Large Language Models—on neuromorphic hardware. It proves that energy-efficient, long-range sequence modeling is possible without relying entirely on traditional transformer paradigms. Furthermore, the Gated Spiking Unit challenges strict assumptions about biological plausibility, showing that separating biological realism from mathematical efficiency can yield highly scalable, performant neuromorphic solutions.

## Resources
- **Paper**: [Learning Long Sequences in Spiking Neural Networks](https://arxiv.org/abs/2401.00955)
