---
title: 'Kade Heckel: Optimizing GPU/TPU code with JAX and Pallas'
author:
  - Kade Heckel
  - Jens E. Pedersen
date: 2024-10-15T00:00:00.000Z
description: "Discover how optimizing recurrent SNN loops with JAX's scan operation yields a 5x speedup over unrolled functions without needing low-level Pallas code."
upcoming: false
video: pRqRYcjufjA
image: kade-heckel-jax-pallas-optimization.jpg
type: hacking-hours
software_tags:
  - spyx
experience_tags:
  - practitioner
  - advanced
expertise_tags:
  - software
  - snn
  - machine-learning
content_source: "talk-summary"
summary_points:
  - "JAX’s functional paradigm allows for entire end-to-end training loops, including data loading, to be efficiently Just-In-Time (JIT) compiled."
  - "Using `jax.lax.scan` to handle recurrent SNN loops drastically reduces GPU kernel dispatch overhead, yielding roughly a 5x speedup over standard unrolling."
  - "JAX's automatic XLA compilation often fuses simple element-wise surrogate gradient operations as efficiently as hand-written lower-level code."
  - "Pallas provides hardware-aware memory mutability for custom TPU (Mosaic) and GPU (Triton) targets, but restricts compatibility with higher-level JAX bindings."
  - "High-performance SNN inference is best achieved by batch-applying linear layers before running stateful neuron dynamics sequentially."
---

In this Hacking Hour, Kade Heckel—creator of the JAX-based spiking neural network library "Spyx"—walks through live code optimizations for running SNN workloads efficiently on hardware accelerators. By diving into the differences between JAX's native functional tracing and the newer, lower-level Pallas kernel language, the session explores the real-world performance bottlenecks of training recurrent neuromorphic models and how standard compilation tricks can resolve them.

## Key Takeaways
- **The power of functional JIT compilation:** JAX’s functional design enables highly efficient tracing. Compiling entire training loops (including optimizer updates and data loading) keeps computations entirely within high-bandwidth VRAM, drastically reducing CPU-to-GPU memory latency.
- **Handling recurrence correctly is critical:** Naively unrolling Python `for` loops within a JIT-compiled function creates massive code sizes and triggers thousands of individual kernel dispatches. Utilizing `jax.lax.scan` translates the recurrence into efficient XLA-level loops, preserving local state and offering nearly a 5x speedup.
- **JAX auto-fusion competes with hand-rolled code:** When comparing a manually written, hardware-specific Pallas kernel for the SuperSpike surrogate gradient against a natively JIT-compiled JAX function, performance was identical. JAX’s XLA compiler successfully fused the operations on its own.
- **Pallas introduces memory mutability:** Unlike standard JAX's immutable functional approach, Pallas provides mutable references directly to high-bandwidth memory. It serves as a direct bridge to generating GPU code (via Triton) or TPU code (via Mosaic).
- **Mixing abstractions causes breaks:** Because Pallas operates at a low hardware level, it frequently fails to comprehend higher-level JAX-specific auto-differentiation logic (such as custom Vector-Jacobian Products).

## What Was Built / Demonstrated
The session centered on live benchmarking the compilation steps involved in lowering a Python function to stable High-Level Optimizer (HLO) language. By extracting the SuperSpike surrogate gradient function, the demonstration stepped through:
1. Generating the localized JAX expression (JAXpr).
2. Forcing the XLA compiler to lower the graph and observing the fused kernel code output.
3. Implementing the exact same math explicitly via the experimental Pallas API using block grids.
4. Implementing a stateful Leaky Integrate-and-Fire (LIF) loop to compare the compilation output of an unrolled state loop versus a `scan`-based loop.

As discussed in the session, writing Python code with JAX can result in computational efficiencies practically identical to dedicated C-based implementations, making it an exceptional framework for rapid neuromorphic engineering.

## What This Means for Neuromorphic Computing
For neuromorphic researchers working with dense network simulators, pushing data to the GPU fast enough remains a stubborn bottleneck. This session proves that researchers don't necessarily need to immediately drop down to complex kernel languages like Triton or CUDA to extract maximum performance from their accelerators.

Instead, utilizing proper functional programming patterns—like executing linear matrix multiplications in bulk across the time dimension before iteratively processing stateful spiking dynamics via `scan`—extracts massive performance gains natively. Frameworks like Pallas should be reserved strictly for specialized architectural tasks, such as commanding TPUs to utilize structural sparsity masks or handling custom memory unpacking logic.
