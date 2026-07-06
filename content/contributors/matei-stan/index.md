---
title: "Learning Long Sequences in Spiking Neural Networks with Matei Stan"
author:
  - "Matei Stan"
date: 2025-07-27
description: "Discover how combining State Space Models (SSMs) and Spiking Neural Networks (SNNs) outperforms Transformers on long-sequence tasks using Gated Spiking Units."
upcoming: false
video: "RB11UYu7bFY"
image: "banner.png"
type: "student-talks"
speaker_paper: "https://arxiv.org/abs/2401.00955"
paper_license: "CC-BY-NC-SA"
content_source: "talk-summary"
hardware_tags:
  - "loihi"
summary_points:
  - "State Space Models (SSMs) share fundamental computational primitives with Leaky Integrate-and-Fire (LIF) neurons, bridging modern sequence modeling with neuromorphic hardware."
  - "Introducing binary activations in SSMs causes gradient saturation, a performance bottleneck directly analogous to optimization issues in standard Spiking Neural Networks (SNNs)."
  - "A novel Gated Spiking Unit (GSU) bypasses these saturation limits, allowing spiking models to beat Transformers on the Long-Range Arena benchmark."
  - "Energy efficiency can be successfully decoupled from strict biological plausibility to build highly scalable and performant neuromorphic sequence models."
---

Matei’s published work, “Learning Long Sequences in Spiking Neural Networks” [1], systematically investigates, for the first time, the intersection of the State‑of‑The‑Art State Space Models (SSMs) with Spiking Neural Networks (SNNs) for long‑range sequence modelling. Results suggest that SSM‑based SNNs can outperform the Transformer on all tasks of a well‑established long‑range sequence modelling benchmark - the “Long-Range Arena” [2]. It is also shown that the SSM‑based SNNs can outperform current State‑of‑The‑Art SNNs with fewer parameters on sequential image classification. Finally, a novel feature mixing layer is introduced, improving SNN accuracy while challenging assumptions about the role of binary activations in SNNs. This work paves the way for deploying powerful SSM-based architectures, such as Large Language Models, on neuromorphic hardware for energy-efficient long-range sequence modelling.

## Key Takeaways
- State Space Models (SSMs) share fundamental computational primitives with Leaky Integrate-and-Fire (LIF) neurons, bridging modern sequence modeling with neuromorphic hardware.
- Introducing binary activations in SSMs causes gradient saturation, a performance bottleneck directly analogous to optimization issues in standard Spiking Neural Networks (SNNs).
- A novel Gated Spiking Unit (GSU) bypasses these saturation limits, allowing spiking models to beat Transformers on the Long-Range Arena benchmark.
- Energy efficiency can be successfully decoupled from strict biological plausibility to build highly scalable and performant neuromorphic sequence models.

## About the Research
The research systematically compares the iterative, recurrent nature of SNNs with modern deep-learning sequence architectures. By integrating the computational paradigms of SSMs (like S4D) with spiking primitives, the study isolates the exact cause of performance degradation in spiking networks: the saturation of binary activations.

To overcome this, the study introduces the Gated Spiking Unit (GSU). Inspired by Gated Linear Units, the GSU creates a dual-pathway architecture where one path remains non-saturating. This design restores gradient flow while preserving the ternary/binary operations that make neuromorphic feature-mixing energy efficient.

> "There is a rift forming between neuromorphic computing that focuses on raw performance and neuromorphic computing in the sense of keeping it brain-inspired. If your only goal is to avoid multiply-accumulate operations, you are breaking biological plausibility, but you are pushing the network much further."

## What This Means for Neuromorphic Computing
State Space Models offer a realistic, scalable alternative to the Transformer's quadratic attention mechanism. By proving that SSMs can be effectively "spikified," this work establishes a credible roadmap for deploying Large Language Models (LLMs) and long-sequence agents onto highly constrained edge hardware. It demonstrates that the neuromorphic community does not have to settle for sub-par performance on toy datasets; carefully designed spiking architectures can rival and exceed conventional deep learning baselines on rigorous, thousands-of-tokens-long benchmarks like the Long-Range Arena and Path-X.

## Resources
- **Paper:** [Learning long sequences in spiking neural networks](https://arxiv.org/abs/2401.00955) (Scientific Reports, 2024)
- **Reference:** Tay et al., Long Range Arena: A benchmark for efficient transformers. arXiv preprint arXiv:2011.04006.
