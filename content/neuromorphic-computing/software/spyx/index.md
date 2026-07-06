---
title: "Spyx Hackathon: Speeding up Neuromorphic Computing"
author: 
  - Kade Heckel
date: 2023-12-13
video: gKNegntASLI
speaker_code: https://github.com/kmheckel/spyx
image: workshop-thumbnail-default.png
description: "The Spyx framework leverages JAX JIT compilation to fuse SNN training loops into a single GPU kernel, unlocking massive throughput speedups on temporal datasets."
type: workshops
software_tags: ["spyx"]
hardware_tags: []
experience_tags: ["researcher", "practitioner", "advanced"]
expertise_tags: ["snn", "machine-learning", "software"]
field_of_application_tags: ["education", "robotics"]
summary_points:
  - Spyx is a lightweight, JAX-based framework for SNNs that builds on DeepMind's Haiku.
  - JAX's Just-In-Time (JIT) compilation allows the entire SNN training loop to be fused into a single GPU kernel.
  - Fusing the computational graph eliminates CPU-GPU bottlenecks, enabling hundreds of epochs of training in seconds.
  - Data compression along the temporal axis allows multi-gigabyte event datasets to fit securely within GPU VRAM.
---

Training Spiking Neural Networks (SNNs) over long time horizons using traditional PyTorch frameworks often results in massive performance bottlenecks, largely caused by continuous data-shuttling between the CPU and the GPU. This workshop introduces Spyx, a radically lightweight SNN framework built on top of DeepMind's Haiku and JAX. By exploiting JAX's functional programming paradigms and Just-In-Time (JIT) compilation, Spyx shifts the entire SNN training loop—data loading, forward pass, gradient calculation, and optimizer updates—directly onto the accelerator, achieving unprecedented training throughput.

## Key Takeaways
- **Spyx is a lightweight, JAX-based framework for SNNs that builds on DeepMind's Haiku.**
- **JAX's Just-In-Time (JIT) compilation allows the entire SNN training loop to be fused into a single GPU kernel.**
- **Fusing the computational graph eliminates CPU-GPU bottlenecks, enabling hundreds of epochs of training in seconds.**
- **Data compression along the temporal axis allows multi-gigabyte event datasets to fit securely within GPU VRAM.**

## Workshop Format & Takeaways
The session walks attendees through the architectural philosophy of Spyx and steps directly into a live coding demonstration. Unlike object-oriented frameworks, JAX enforces a functionally pure programming style. The workshop showcases how to define stateless spiking layers and wrap them in dynamic unrolls that JAX can safely parse.

A major focus of the session is maximizing VRAM efficiency and GPU utilization. The speaker noted that treating time-series event data conventionally chokes performance. Instead, the framework encourages packing eight binary spikes into a single 8-bit integer along the temporal axis. This allows a user to compress and cache an entire dataset, such as the Spiking Heidelberg Digits, directly into GPU memory.

Through the use of JAX's `scan` control flow, the entire multi-epoch training and validation procedure is JIT-compiled into intermediate representation and lowered into a single, fused Cuda kernel. The results demonstrated during the session were staggering: training an SNN on the SHD dataset for 300 epochs took approximately 20 seconds on a consumer-grade laptop GPU, a task that traditionally spans hours due to interpreter overhead and host-to-device memory transfers.

## What This Means for Neuromorphic Computing
Iteration speed is arguably the most critical variable in algorithmic research. When testing novel surrogate gradients, evolving hyperparameters, or applying gradient-free optimization to spiking control tasks (like those found in Brax or MuJoCo), waiting hours for a network to converge severely limits exploration. By shifting SNN development into the JAX ecosystem, Spyx eliminates the software overhead native to Python. It equips neuromorphic engineers with the same high-throughput, highly vectorized tooling utilized by Large Language Model researchers, vastly accelerating the search for optimal, deployable spike-based architectures.

## Resources
- **Speaker Code:** [https://github.com/kmheckel/spyx](https://github.com/kmheckel/spyx)
