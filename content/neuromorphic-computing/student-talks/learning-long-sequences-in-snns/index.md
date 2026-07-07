---
title: "Learning Long Sequences in Spiking Neural Networks with Matei Stan"
author:
  - "Matei Stan"
date: 2025-07-27
description: "Combining State Space Models with Spiking Neural Networks via a Gated Spiking Unit eliminates saturation and outperforms Transformers on long sequence tasks."
upcoming: false
upcoming_url: "https://teams.microsoft.com/l/meetup-join/19%3Ameeting_OTBkNTY5MjgtMjE3Ni00OTFmLWEwNzktN2QwZTU1NWIxNDc2%40thread.v2/0?context=%7B%22Tid%22%3A%22c152cb07-614e-4abb-818a-f035cfa91a77%22%2C%22Oid%22%3A%223f444780-d657-4917-993e-0f42adeff90e%22%7D"
video: "RB11UYu7bFY"
image: "banner.png"
type: "student-talks"
speaker_paper: "https://arxiv.org/abs/2401.00955"
paper_license: "CC-BY-NC-SA"
experience_tags:
  - student
  - advanced
expertise_tags:
  - machine-learning
  - snn
  - algorithms-learning
content_source: "talk-summary"
summary_points:
  - "State Space Models (SSMs) treat recurrence as a convolution, allowing for parallel training while deploying iteratively like an SNN."
  - "Standard spiking activations suffer from gradient saturation, but a Gated Spiking Unit (GSU) bypasses this issue using non-saturating identity functions."
  - "Combining SSMs and SNNs enables the model to outperform Transformers on long-sequence benchmarks like the Long-Range Arena."
  - "The model replaces dense vector-matrix multiplications with ternary operations to maintain energy efficiency without sacrificing accuracy."
---

Traditional Spiking Neural Networks (SNNs) and Recurrent Neural Networks (RNNs) suffer from iterative simulation bottlenecks, preventing them from leveraging GPU parallelism for long-sequence tasks. In this session, PhD student Matei Stan outlines a novel approach combining SNNs with structured State Space Models (SSMs). By substituting continuous nonlinearities in SSMs with spiking activations and utilizing a custom "Gated Spiking Unit" (GSU), the resulting architecture successfully trains in parallel while maintaining sparse, energy-efficient inference, outperforming standard Transformers on long-range dependency benchmarks.

## Key Takeaways
- **Parallel training with sequential deployment:** State Space Models view recurrence as a convolution. This allows the entire operation to be computed in parallel with a fast Fourier transform during training, while still deploying iteratively like a standard SNN during inference.
- **Solving the saturation bottleneck:** Standard spiking activation functions suffer from saturating gradients (similar to sigmoid or tanh functions), which degrade accuracy in backward passes. The Gated Spiking Unit (GSU) bypasses this by gating a non-saturating identity function with ternary weights, restoring gradient flow without requiring dense multiply-accumulate (MAC) operations.
- **Outperforming Transformers on long sequences:** On the Long-Range Arena (LRA) benchmark—specifically the difficult Path-X task (16,000 tokens)—standard Transformers failed to converge above random chance, whereas the GSU-equipped SNN achieved competitive accuracy while using approximately half the energy of a baseline SSM.
- **Biological plausibility vs. energy efficiency:** To achieve scalable neuromorphic solutions that compete with modern deep learning, the architecture deliberately prioritizes MAC-free energy efficiency over strict biological realism, utilizing non-saturating gradients and discrete ternary weights in the feature mixing layers.

## About the Research
Based on Stan’s published work, *“Learning Long Sequences in Spiking Neural Networks,”* the research replaces the dense vector-matrix multiplications inside the SSM feature-mixing layers with spiking ternary operations to eliminate costly multiply-accumulate (MAC) operations. The speaker explained how structured State Space Models (like S4) compress input signal history into higher-dimensional fixed-width vectors. However, combining SSMs with SNNs initially introduces a significant hurdle: spiking activations are non-differentiable step functions that require surrogate gradients and inherently suffer from saturation.

To address this, Stan developed the Gated Spiking Unit (GSU), drawing inspiration from the Gated Linear Unit (GLU) utilized in traditional deep learning. The GSU mitigates the saturation bottleneck by passing the input through two parallel routes. One route applies a non-saturating identity function paired with ternary weights, ensuring that robust gradients can flow backward through the network without being suppressed by the saturated tails of standard spiking functions. When tested against sequential MNIST and LRA tasks, the model not only reached higher accuracy than baseline SNNs with fewer parameters but also trained in a fraction of the time, cutting execution cycles down from days to merely an hour or two.

## What This Means for Neuromorphic Computing
The integration of State Space Models with spiking substrates provides a viable pathway for neuromorphic hardware to tackle massive sequence modeling tasks, such as language modeling and high-resolution sequential image processing. By adopting parallelizable SSM architectures, neuromorphic researchers can leverage the massive training throughput of modern GPUs, eliminating the iterative simulation penalty that has historically held SNNs back from matching the scale of mainstream deep learning models.

## Resources
- **Speaker Paper:** [Learning long sequences in spiking neural networks](https://arxiv.org/abs/2401.00955)
