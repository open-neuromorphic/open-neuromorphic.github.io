---
title: "Spyx Hackathon: Speeding up Neuromorphic Computing"
author:
  - Kade Heckel
date: 2023-12-13
video: gKNegntASLI
software_tags: ["spyx", "snntorch", "norse", "nengo"]
speaker_code: https://github.com/kmheckel/spyx
image: workshop-thumbnail-default.png
description: "Learn how to use Spyx, a JAX-based framework that leverages JIT compilation to train spiking neural networks entirely on the GPU in minutes."
type: "workshops"
experience_tags: ["practitioner", "researcher", "intermediate"]
expertise_tags: ["snn", "software", "machine-learning"]
summary_points:
  - "Spyx is a JAX-based SNN framework that uses Just-In-Time (JIT) compilation to run entire training loops on the GPU."
  - "By avoiding CPU-GPU data transfers, Spyx enables training spiking networks for hundreds of epochs in a matter of minutes."
  - "The library integrates smoothly with the broader JAX ecosystem, including Optax for deep learning optimization and Evosax for neuroevolution."
  - "Spyx supports the Neuromorphic Intermediate Representation (NIR), allowing seamless deployment to low-power hardware."
---

In this workshop, Kade Heckel introduces Spyx, a high-performance spiking neural network (SNN) library built on JAX. The session provides a deep dive into how Spyx maximizes training throughput by caching data in VRAM and fusing entire training loops into single GPU kernels, eliminating the traditional bottlenecks of iterative CPU-to-GPU data transfers.

## Key Takeaways
- Spyx is a JAX-based SNN framework that uses Just-In-Time (JIT) compilation to run entire training loops on the GPU.
- By avoiding CPU-GPU data transfers, Spyx enables training spiking networks for hundreds of epochs in a matter of minutes.
- The library integrates smoothly with the broader JAX ecosystem, including Optax for deep learning optimization and Evosax for neuroevolution.
- Spyx supports the Neuromorphic Intermediate Representation (NIR), allowing seamless deployment to low-power hardware.

## Workshop Format & Takeaways
The session features a technical overview of Spyx’s architecture, highlighting its reliance on DeepMind’s Haiku library and JAX's functional programming paradigm. As demonstrated in a live notebook walkthrough, defining a surrogate gradient and constructing a model in Spyx is highly compact.

A major focus of the demonstration is Spyx's ability to compress and push entire datasets (like the Spiking Heidelberg Digits) into GPU memory. Using JAX's `scan` and `jit` functions, the framework compiles the dataset shuffling, batch evaluation, loss computation, and weight updates into one continuous execution graph. As noted in the session, this technique can reduce the training time of a 600,000-parameter SNN from hours to under a minute.

## What This Means for the Field
Spyx fundamentally accelerates the iterative research process in neuromorphic computing. By reducing training times to a fraction of traditional limits on standard consumer or high-end GPUs, it allows researchers to rapidly prototype architectures, test new surrogate gradients, and experiment with evolutionary algorithms at scale. Combined with hooks into standard interoperability layers like NIR, this tooling bridges the gap between high-throughput deep learning workflows and ultra-efficient, low-power edge deployment.

## Resources
- **Speaker Code**: [Spyx GitHub Repository](https://github.com/kmheckel/spyx)
