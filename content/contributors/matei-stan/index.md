---
title: "Learning Long Sequences in Spiking Neural Networks with Matei Stan"
author:
  - "Matei Stan"
date: 2025-07-27
description: "Combining State Space Models with Spiking Neural Networks enables parallel GPU training and outperforms Transformers on long-sequence modeling tasks."
upcoming: false
upcoming_url: "https://teams.microsoft.com/l/meetup-join/19%3Ameeting_OTBkNTY5MjgtMjE3Ni00OTFmLWEwNzktN2QwZTU1NWIxNDc2%40thread.v2/0?context=%7B%22Tid%22%3A%22c152cb07-614e-4abb-818a-f035cfa91a77%22%2C%22Oid%22%3A%223f444780-d657-4917-993e-0f42adeff90e%22%7D"
video: "RB11UYu7bFY"
image: "banner.png"
type: "student-talks"
speaker_paper: "https://arxiv.org/abs/2401.00955"
paper_license: "CC-BY-NC-SA"
hardware_tags:
  - loihi
experience_tags:
  - researcher
  - advanced
expertise_tags:
  - snn
  - machine-learning
  - algorithms-learning
content_source: "talk-summary"
summary_points:
  - "By combining State Space Models (SSMs) with Spiking Neural Networks (SNNs), researchers achieve parallelized GPU training while retaining sparse, iterative deployment on neuromorphic hardware."
  - "SSM-based SNNs successfully outperformed standard Transformers on complex sequence tasks like the Long-Range Arena (LRA) Pathfinder challenge."
  - "Traditional binary spikes introduce a saturating activation bottleneck that limits gradient flow and degrades model accuracy."
  - "A novel Gated Spiking Unit bypasses this saturation by running a non-saturating gradient path in parallel with the ternary quantized feature mixing layer."
---

Training Spiking Neural Networks (SNNs) at scale has historically been hamstrung by the need for iterative, sequential simulation, preventing the massive GPU parallelism that fueled the rise of Transformers. However, as standard deep learning models demand increasingly unsustainable energy footprints, the need for sparse, brain-inspired computation is critical. In this session, Matei Stan details an approach that merges the computational primitives of State Space Models (SSMs) with SNNs. By eliminating non-linearities between time steps, the recurrence in SSMs can be computed in parallel as a convolution during training, while still deploying as an energy-efficient, sparse network on neuromorphic hardware.

## Key Takeaways
- **SSMs bridge the training gap:** By structuring recurrent dynamics linearly, SSMs allow networks to process entire sequences simultaneously on GPUs during training, bypassing the vanishing gradient and time-intensive sequential bottlenecks of traditional SNNs.
- **SNNs beat Transformers on long sequences:** On the Long-Range Arena (LRA) Pathfinder task—a highly complex visual sequence challenge spanning 16,000 tokens—standard Transformers completely failed to converge. In contrast, the quantized, SSM-based spiking model successfully achieved above-random accuracy while maintaining high sparsity.
- **Binary spikes cause saturation bottlenecks:** A permanent limitation of standard spiking models is that binary spikes inherently saturate, capping accuracy limits even when utilizing ideal surrogate gradients.
- **The Gated Spiking Unit restores gradient flow:** Inspired by Gated Linear Units (GLUs), a novel architecture runs a non-saturating identity gate in parallel with the quantized spiking output. This allows continuous gradients to flow backward through the network while still performing energy-efficient ternary additions in the forward pass.

## About the Research
This presentation expands on the findings published in *"Learning Long Sequences in Spiking Neural Networks"* (Scientific Reports, 2024). The research formally demonstrates that modern initialization schemes and structured memory states used in SSMs can be mapped directly to spiking architectures. As noted in the session, implementing the Gated Spiking Unit reduced operations to simple ternary accumulations in the feature mixing layer, effectively halving the baseline energy consumption while remaining within 1% of the baseline unquantized accuracy.

## What This Means for Neuromorphic Computing
A persistent challenge in neuromorphic research has been the growing divergence between biologically plausible models and performance-oriented deep learning. By adapting SSMs into spiking architectures, the field gains a scalable path forward. It proves that energy-efficient spiking models no longer need to be restricted to toy datasets like sequential MNIST, but can actively compete with—and in some long-context scenarios, outperform—the current generation of Transformer architectures without sacrificing their deployment efficiency at the edge.

## Resources
- **Speaker Paper:** [Learning long sequences in spiking neural networks](https://arxiv.org/abs/2401.00955)
