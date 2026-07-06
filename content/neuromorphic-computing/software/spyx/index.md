---
title: "Spyx Hackathon: Speeding up Neuromorphic Computing"
author:
  - Kade Heckel
date: 2023-12-13
video: gKNegntASLI
type: hacking-hours
software_tags: ["spyx"]
experience_tags: ["practitioner", "intermediate"]
expertise_tags: ["snn", "software", "machine-learning"]
speaker_code: https://github.com/kmheckel/spyx
image: workshop-thumbnail-default.png
description: "Learn how the Spyx framework uses JAX's JIT compilation and functional tracing to accelerate SNN training loops, achieving 100% GPU utilization."
content_source: "talk-summary"
summary_points:
  - "Spyx is a JAX-based framework that compiles entire SNN training loops into singular, fused CUDA kernels."
  - "By eliminating Python interpreter overhead, Spyx maintains 100% GPU utilization, dropping training times from hours to minutes."
  - "Temporal data compression packs eight spikes into a single 8-bit integer, slashing VRAM consumption by 87.5%."
  - "The framework integrates natively with other JAX-based tools, enabling rapid neuro-evolution and gradient-free optimization."
---

Training Spiking Neural Networks (SNNs) in Python historically suffers from extreme computational bottlenecks. Constantly bouncing between the Python interpreter and the GPU to update states at every micro-timestep severely limits training throughput. The Spyx framework solves this by leveraging JAX to Just-In-Time (JIT) compile the entire SNN training loop—including data loading and optimization—directly into a fused, high-performance CUDA kernel.

## Key Takeaways
- **Spyx is a JAX-based framework that compiles entire SNN training loops into singular, fused CUDA kernels.**
- **By eliminating Python interpreter overhead, Spyx maintains 100% GPU utilization, dropping training times from hours to minutes.**
- **Temporal data compression packs eight spikes into a single 8-bit integer, slashing VRAM consumption by 87.5%.**
- **The framework integrates natively with other JAX-based tools, enabling rapid neuro-evolution and gradient-free optimization.**

## What Was Built / Demonstrated
In this session, Kade Heckel walked through the architecture and practical implementation of Spyx. The demonstration showcased how JAX’s functional purity allows `jax.lax.scan` to sequentially apply SNN recurrence over an entire dataset without ever returning to the CPU.

To overcome severe VRAM limitations when dealing with large temporal datasets, Heckel demonstrated a technique where the temporal axis is compressed, packing binary spikes into 8-bit integers prior to loading. The batch is then dynamically unpacked on the GPU during the forward pass. The results shown live were dramatic: training a 600,000-parameter SNN on the Spiking Heidelberg Digits dataset for 300 epochs took only 23 seconds on a standard laptop GPU, achieving 14 full dataset iterations per second.

## What This Means for Neuromorphic Computing
The neuromorphic community has struggled to scale SNN research due to the slow turnaround times of standard PyTorch training loops. By drastically accelerating training, Spyx allows researchers to rapidly prototype complex network topologies, perform large-scale hyperparameter sweeps, and execute evolutionary algorithms that were previously computationally unfeasible.

Furthermore, by writing entirely in Python but executing at the speed of bare-metal C, Spyx lowers the barrier to entry, ensuring that neuromorphic algorithm developers can fully exploit the massive parallel compute power of modern data-center GPUs.
