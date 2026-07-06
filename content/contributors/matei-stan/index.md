---
title: "Learning Long Sequences in Spiking Neural Networks with Matei Stan"
author:
  - "Matei Stan"
date: 2025-07-27
description: "Discover how combining State Space Models with Spiking Neural Networks and Gated Spiking Units outperforms Transformers on long-range sequence tasks."
upcoming: false
video: "RB11UYu7bFY"
image: "banner.png"
type: "student-talks"
speaker_paper: "https://arxiv.org/abs/2401.00955"
paper_license: "CC-BY-NC-SA"
experience_tags:
  - researcher
  - advanced
expertise_tags:
  - snn
  - machine-learning
  - algorithms-learning
content_source: "talk-summary"
summary_points:
  - "Spiking Neural Networks (SNNs) traditionally rely on sequential iteration, creating training bottlenecks compared to parallelized models."
  - "State Space Models (SSMs) remove non-linearities between time steps, allowing recurrence to be computed in parallel via Fast Fourier Transforms."
  - "Applying binary spiking activations inside SSMs cuts energy usage but introduces a saturating bottleneck that degrades gradients."
  - "The Gated Spiking Unit (GSU) routes gradients through a parallel, non-saturating gate, matching baseline SSM accuracy with fewer operations."
  - "SSM-based SNNs successfully converge on the 16,000-token Path-X task, outperforming standard Transformers while remaining highly energy efficient."
---

While State-of-the-Art models like Transformers have revolutionized sequence modeling, their parameter counts and quadratic computational complexity demand an unsustainable amount of energy. Spiking Neural Networks (SNNs) offer a biologically plausible path to extreme energy efficiency, but their reliance on iterative sequential processing creates massive training bottlenecks that make them impractical for standard GPU parallelism. In this session, Matei Stan details how bridging SNNs with modern State Space Models (SSMs) can resolve these bottlenecks, allowing spiking networks to tackle long-range sequence modeling tasks that standard Transformers outright fail to complete.

## Key Takeaways
- **Iterative processing is an SNN bottleneck:** SNNs traditionally require passing through non-linearities at every time step, preventing the parallelized computation that makes deep learning models fast to train on GPUs.
- **SSMs enable parallelization:** By removing non-linearities between time steps, State Space Models allow sequence recurrence to be viewed as a convolution, which can be parallelized efficiently using Fast Fourier Transforms.
- **Binarization causes gradient saturation:** Replacing dense matrix multiplications in SSMs with binary spiking activations cuts energy consumption, but creates a non-differentiable, saturating bottleneck that degrades the gradient signal during training.
- **Gated Spiking Units (GSUs) solve the bottleneck:** A novel GSU routes gradients through a parallel, non-saturating identity gate while retaining ternary weights, restoring gradient flow and maintaining near-baseline accuracy.
- **Spiking SSMs outperform Transformers on length:** On the 16,000-token Path-X benchmark, standard Transformers fail to converge entirely (50% random accuracy), while SSM-based spiking architectures reliably solve the binary classification task.

## About the Research
This presentation is grounded in the published work *“Learning Long Sequences in Spiking Neural Networks”* (Stan & Rhodes, 2024). The paper systematically investigates the intersection of modern SSMs and SNNs for long-range sequence modeling. By leveraging the Long-Range Arena benchmark, the research proves that replacing typical non-linearities with structured state-space approaches allows spiking models to beat traditional architectures.

As discussed in the session, introducing the Gated Spiking Unit further challenges foundational assumptions in neuromorphic engineering about the strict role of binary activations. By splitting the route that gradients travel, the architecture achieves non-saturating properties without relying on standard multiply-accumulate (MAC) operations in the feature mixing layer.

## What This Means for Neuromorphic Computing
For years, a philosophical rift has existed between the performance-oriented deep learning community and the biologically constrained neuromorphic community. This work bridges that gap by demonstrating that SNNs no longer have to be restricted to toy tasks like sequential MNIST.

By utilizing State Space Models, developers can train spiking networks efficiently on standard GPU clusters in a fraction of the time, while preserving the mathematical properties needed to deploy the resulting model efficiently on dedicated neuromorphic hardware. Reaching convergence on extreme long-range dependencies proves that energy-efficient spiking models can compete directly with—and in specific context, surpass—Transformer architectures.

## Resources
- **Speaker Paper:** [Learning long sequences in spiking neural networks](https://arxiv.org/abs/2401.00955)
