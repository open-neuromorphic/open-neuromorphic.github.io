---
title: 'Kade Heckel: Optimizing GPU/TPU code with JAX and Pallas'
author:
  - Kade Heckel
  - Jens E. Pedersen
date: 2024-10-15T00:00:00.000Z
description: "Explore how to optimize Spiking Neural Network (SNN) training on GPUs and TPUs using JAX, XLA compiler fusion, and Pallas for maximum execution speed."
upcoming: false
video: pRqRYcjufjA
image: kade-heckel-jax-pallas-optimization.jpg
type: hacking-hours
software_tags:
  - spyx
  - jax
url: >-
  /neuromorphic-computing/software/hacking-hours/kade-heckel-jax-pallas-optimization/
content_source: "talk-summary"
summary_points:
  - "JAX’s functional paradigm and XLA compiler enable highly efficient tracing and Just-In-Time (JIT) compilation for SNN training, yielding massive speedups."
  - "The `jax.lax.scan` operation is critical for efficiently compiling recurrent loops in SNNs, avoiding the massive code generation of statically unrolled loops."
  - "While Pallas provides granular control for writing hardware-aware custom kernels (via Triton or Mosaic), JAX’s automatic kernel fusion often matches manual optimization for simple element-wise operations."
  - "Pallas is most advantageous when targeting specific hardware architectures like TPUs, or when optimizing data-loading and structured sparse matrices."
---

In this Hacking Hour, Kade Heckel, creator of the JAX-based spiking neural network (SNN) library "Spyx," joins host Jens E. Pedersen. They explore techniques for optimizing SNN code for GPUs and TPUs using JAX and the Pallas library, covering practical approaches to accelerate neuromorphic and machine learning computations.

## Key Takeaways
- JAX’s functional paradigm and XLA compiler enable highly efficient tracing and Just-In-Time (JIT) compilation for SNN training, yielding massive speedups.
- The `jax.lax.scan` operation is critical for efficiently compiling recurrent loops in SNNs, avoiding the massive code generation of statically unrolled loops.
- While Pallas provides granular control for writing hardware-aware custom kernels (via Triton or Mosaic), JAX’s automatic kernel fusion often matches manual optimization for simple element-wise operations.
- Pallas is most advantageous when targeting specific hardware architectures like TPUs, or when optimizing data-loading and structured sparse matrices.

## What Was Built / Demonstrated
The session dives deep into the inner workings of Spyx, an SNN library designed to pair seamlessly with DeepMind's Haiku and EvoJAX for end-to-end neuroevolution. Rather than manually writing C++ kernels, the demonstration shows how JAX lowers standard Python SNN code into JAXpr representations, and subsequently into Stable High-Level Optimizer (HLO) language that the XLA compiler turns into fused hardware instructions.

During a live coding benchmark, the presenters implemented a SuperSpike surrogate gradient function in both pure JAX and Pallas. Despite Pallas offering direct, mutable memory access to hardware grids and blocks (generating Triton custom operations), the fully automated JAX JIT compiler matched the execution speed of the hand-crafted Pallas kernel for basic element-wise operations.

The demonstration further highlighted the necessity of using `jax.lax.scan` for iterative recurrence. When SNN loops were naively unrolled in JAX, the compiler generated excessively massive code. Funneling the recurrent state matrix through `scan` allowed the compiler to cache the function body safely, yielding an approximate 5x execution speedup by heavily reducing kernel dispatch overhead.

> "You can write Python code that is pretty straightforward, but when it gets Just-In-Time compiled down, you end up getting similar efficiencies to a much lower-level, C-based solution."

## What This Means for Neuromorphic Computing
This session highlights a highly accessible path for neuromorphic engineers to achieve high-performance training without abandoning Python. By proving that standard JAX functions—when structured correctly around functional paradigms and `scan` loops—can automatically optimize and fuse multiple SNN operations, it lowers the barrier to entry for rapid model iteration.

While JAX handles standard dense mapping effectively, the session concludes that extensions like Pallas will be the critical next step for the neuromorphic community specifically when moving toward Google TPU targets. TPUs feature hardware-level support for scalar prefetching and sparse data masking, aligning perfectly with the heavily sparse, event-driven nature of Spiking Neural Networks.

## Resources
- **Frameworks Discussed:** [JAX](https://github.com/google/jax), [Pallas](https://jax.readthedocs.io/en/latest/pallas/index.html)
