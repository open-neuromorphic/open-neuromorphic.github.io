---
title: "Kade Heckel: Optimizing GPU/TPU code with JAX and Pallas"
author:
- "Kade Heckel"
- "Jens E. Pedersen"
date: 2024-10-15
start_time: "18:00"
end_time: "19:45" # 1h 44m 45s duration
time_zone: "CET"
description: "Kade Heckel discusses optimizing GPU/TPU code using JAX and Pallas in this Hacking Hour session."
upcoming: false
video: "pRqRYcjufjA"
speaker_photo: "images/speakers/kade-heckel-placeholder.png" # Placeholder, please replace
image: "kade-heckel-jax-pallas-optimization.jpg" # Placeholder, please create
type: "hacking-hours"
speaker_bio: "Kade Heckel is a researcher and developer focusing on high-performance computing for neural networks, with expertise in JAX and related optimization tools like Pallas. He is the creator of Spyx, a JAX-based spiking neural network library."
---

In this Hacking Hour, Kade Heckel, creator of the JAX-based spiking neural network (SNN) library "Spyx," joins host Jens E. Pedersen. They explore techniques for optimizing SNN code for GPUs and TPUs using JAX and the Pallas library, covering practical approaches to accelerate neuromorphic and machine learning computations.

## Key Themes and Ideas

*   **JAX's Functional Paradigm and Optimization:**
  *   JAX's functional design is a major strength, enabling efficient tracing and Just-In-Time (JIT) compilation for significant speedups on accelerators.
      > "the functional Paradigm allows for some really neat tracing capabilities so you can just in time compile or even ahead of time compile entire workflows and then you get pretty good speed ups and efficiencies when you're running it on GPU"
  *   JIT compilation can encompass entire training loops (data loading, forward/backward passes, optimizer updates), leading to "pretty obscene speed Ups."
  *   Significant speedup observed in data loading by fitting datasets entirely into VRAM and performing unpacking/shuffling within high-bandwidth GPU memory.
      > "you can fit these data sets completely into vram... and then you can just unpack those batches of spikes as you're feeding it into the network... and then you can also Shuffle those rows all within the high bandwidth memory of the GPU and it's a whole lot faster than having to go out to the... CPU Ram"
  *   JAX's JIT compilation sends kernels to the GPU in a "run ahead fashion," removing the Python interpreter from the critical path.

*   **Spyx: A JAX-based SNN Library:**
  *   Created by Kade Heckel for JAX-compatible SNNs, especially for neuroevolution with EvoJAX, aiming for seamless end-to-end integration.
      > "I decided like hey it might be pretty useful to build a jack spaced snn Library"
      > "the initial Focus was like yeah let's get an snn library that you can use end to end with this evolutionary strategy Library"
  *   Built on DeepMind's Haiku, allowing use of Haiku layers.
  *   A key advantage is writing straightforward Python code (similar to PyTorch) that achieves high performance (close to hand-rolled CUDA) upon JIT compilation.
      > "you can write python code that's pretty straightforward or pretty similar to what you it right with torch... but then when it gets compile just in time compiled down you end up getting pretty similar efficiencies to like a spiking Chell or some type of like higher performance like C based solution"

*   **JAX's Lowering Process and XLA:**
  *   **Step 1:** Staging out a specialized JAX expression (JAXpr).
  *   **Step 2:** Lowering JAXpr into Stable HLO (High-Level Optimizer), XLA's input language.
  *   **Step 3:** XLA compiles HLO for the target architecture (GPU/TPU).
  *   **Step 4:** Execution of compiled code.
  *   The JAX JIT decorator automates this, caching code for speed. Manual stepping ( `make_jaxpr`, `lower`, `compile`) aids debugging.
  *   JAX (via XLA) can automatically fuse multiple operations into a single kernel.

*   **Pallas: A Lower-Level Kernel Language:**
  *   An experimental JAX extension for writing hardware-aware/specific kernels.
  *   Provides a common interface to generate lower-level code for GPUs (via Triton) and TPUs (via Mosaic).
  *   Involves mutable memory references, unlike JAX's immutable approach.
      > "Alice you actually do get references... to areas of memory they give you references and then you actually overwrite those arrays... you actually are overwriting state"
  *   Requires specifying hardware details like grid/block sizes.
  *   Pallas kernels typically appear as a single custom operation in HLO, unlike JAX's fused operations.

*   **Comparing JAX's Built-in Optimizations and Pallas:**
  *   For simple element-wise operations (e.g., SuperSpike surrogate gradient), JAX's automatic kernel fusion is highly efficient.
  *   Benchmarking showed a manually written Pallas kernel for SuperSpike performed similarly to the JAX JIT-compiled version.
      > "the thing is you look at this and you see that oh the... Jack's just xoa the optimization process like it was able to fuse those kernels together anyways and all you had to do is write normal Python... you end up with the same performance"
  *   The simplicity of the operation (element-wise, no complex memory access) likely contributes to JAX's effectiveness.
  *   Pallas might be necessary for more complex scenarios, especially those involving recurrence or specific hardware features.

*   **Handling Recurrence with `jax.lax.scan`:**
  *   `scan` is the recommended way to handle loops/recurrence in a JIT-friendly manner.
  *   It iteratively applies a function (loop body), managing state (carry) and input.
  *   Avoids static unrolling of Python `for` loops in JIT-compiled functions, which can lead to massive code and slow compilation. `scan` translates to XLA-level loops.
  *   Benchmarking showed a significant speedup (~5x) for a JIT-compiled `scan`-based recurrent function over an unrolled version.
  *   The benefit comes from compiling the body function once and executing it within the XLA loop, avoiding sending many small kernels to the GPU.

*   **Potential Use Cases for Pallas:**
  *   **Targeting TPUs:** TPUs have distinct architectures (more sequential processing, data-dependent computation with masks, scalar prefetching) that Pallas (via Mosaic) can better leverage.
  *   **Handling Structured Matrices/Sparsity:** For sparse SNN connection matrices, Pallas might enable more efficient computation by using knowledge of the matrix structure.
  *   **Intelligent Data Loading/Unpacking:** Pallas could optimize unpacking sparse spike data and fuse it with the first layer's computation.
  *   **Implementing Custom Low-Level Kernels:** If JAX's automatic fusion is insufficient, Pallas allows writing custom kernels within the JAX ecosystem.
      > "Pallas like really comes in if you want to write like if you're using structured matrices or if you're using... if you want to Target TPU and use like some sparse computation features I think that's where you really need Palace"

*   **Limitations of Pallas Composition:**
  *   Directly using JAX's higher-level constructs (like custom Vector-Jacobian Products - VJPs - for surrogate gradients) within a Pallas kernel seems problematic.
  *   Attempting to call a JAX function with a custom VJP (e.g., SuperSpike gradient) inside Pallas resulted in errors, suggesting Pallas may not understand these JAX-specific bindings.

*   **Future Directions for Spyx and Optimization:**
  *   Exploring TPU-aware SNN inference using Pallas.
  *   Further investigating Pallas for optimizing data loading/unpacking.
  *   Focusing on more parallelizable SNN algorithms (approximations, non-recurrent pre-training) might offer more substantial runtime improvements on GPUs than micro-optimizing recurrent kernels.

## Important Facts and Data

*   JAX's functional paradigm enables efficient tracing and JIT/AOT compilation.
*   Spyx is a JAX-based SNN library leveraging Haiku.
*   JAX lowers code via JAXpr -> Stable HLO -> compiled XLA code.
*   Pallas translates to Triton (GPU) or Mosaic (TPU) for hardware-aware kernels, using mutable references.
*   `jax.lax.scan` is crucial for efficient loops/recurrence, yielding ~5x speedup in benchmarks.
*   JAX's automatic fusion matched Pallas performance for simple element-wise functions.
*   Pallas is particularly useful for TPUs, structured sparsity, and custom data loading.
*   Calling JAX functions with custom VJPs inside Pallas kernels is problematic.
*   Optimizing SNNs for TPUs with JAX/Pallas is a promising, largely unexplored area.

## Conclusion

JAX is a powerful framework for SNN development, with its functional design enabling efficient JIT compilation and automatic kernel fusion. While Pallas offers lower-level control, essential for TPUs or complex sparsity, JAX's built-in optimizations are remarkably effective for many SNN computations, including recurrence via `scan`. The presented benchmarks highlight significant gains from JAX's JIT compilation alone, suggesting Pallas is a strategic choice for specific bottlenecks or hardware targets rather than a universal necessity. Optimizing SNNs for TPUs using Pallas is a key future direction.
