---
title: "Spiking Neural Network (SNN) Library Benchmarks"
date: 2023-08-02
lastmod: 2023-10-23
description: "Discover the fastest Spiking Neural Network (SNN) frameworks for deep learning-based optimization. Performance, flexibility, and more analyzed in-depth"
draft: false
author: 
- "Gregor Lenz"
- "Kade Heckel"
- "Sumit Bam Shrestha"
- "Cameron Barker"
image: neurons-race.png
tags: ["snn", "framework", "library", "pytorch", "JAX"]
---

## Introduction 

Open Neuromorphic's [list of SNN frameworks](https://github.com/open-neuromorphic/open-neuromorphic) currently counts 11 libraries, and those are only the most popular ones! As the sizes of spiking neural network models grow thanks to deep learning, optimization becomes more important for researchers and practitioners alike. Training SNNs is often slow, as the stateful networks are typically fed sequential inputs. Today's most popular training method then is some form of backpropagation through time, whose time complexity scales with the number of time steps. We benchmark libraries that all take slightly different approaches on how to extend deep learning frameworks for gradient-based optimization of SNNs. We focus on the total time it takes to pass data forward and backward through the network as well as the memory required to do so. However, there are obviously other, non-tangible qualities of frameworks such as extensibility, quality of documentation, ease of install or support for neuromorphic hardware that we're not going to try to capture here. In our benchmarks, we use a single fully-connected (linear) and a leaky integrate and fire (LIF) layer. The input data has batch size of 16, 500 time steps and n neurons.

## Benchmark Results

{{< chart data="framework-benchmarking-16k" caption="Comparison of time taken for forward and backward passes in different frameworks, for 16k neurons." mobile="framework-benchmarking-16k.png">}}

The first figure shows runtime results for a 16k neuron network. The SNN libraries evaluated can be broken into three categories: 1. frameworks with tailored/custom CUDA kernels, 2. frameworks that purely leverage PyTorch functionality, and 3. a library that uses JAX exclusively for acceleration. For the custom CUDA libraries, [SpikingJelly](https://github.com/fangwei123456/spikingjelly) with a CuPy backend clocks in at just 0.26s for both forward and backward call combined. The libraries that use an implementation of [SLAYER](https://proceedings.neurips.cc/paper_files/paper/2018/hash/82f2b308c3b01637c607ce05f52a2fed-Abstract.html) ([Lava DL](https://github.com/lava-nc/lava-dl)) or [EXODUS](https://www.frontiersin.org/articles/10.3389/fnins.2023.1110444/full) ([Sinabs EXODUS](https://github.com/synsense/sinabs-exodus) / [Rockpool EXODUS](https://rockpool.ai/reference/_autosummary/nn.modules.LIFExodus.html?)) benefit from custom CUDA code and vectorization across the time dimension in both forward and backward passes and come within 1.5-2x the latency. It is noteworthy that such custom implementations exist for specific neuron models (such as the LIF under test), but not for arbitrary neuron models. On top of that, custom CUDA/CuPy backend implementations need to be compiled and then it is up to the maintainer to test it on different systems. Networks that are implemented in SLAYER, EXODUS or SpikingJelly with a CuPy backend cannot be executed on a CPU (unless converted). 

In contrast, frameworks such as [snnTorch](https://github.com/jeshraghian/snntorch), [Norse](https://github.com/norse/norse), [Sinabs](https://sinabs.ai) or [Rockpool](https://rockpool.ai) are very flexible when it comes to defining custom neuron models, but that flexibility comes at a cost of slower computation. SpikingJelly also supports a conventional PyTorch GPU backend with which it's possible to define neuron models more flexibly. Such implementations are also much easier to maintain, as relying on the extensive testing of PyTorch means that it will likely work on a given machine configuration.

Striking a balance between flexibility/extensibility and efficiency from compilation, [Spyx](https://github.com/kmheckel/spyx) is a new framework for training SNNs within the JAX ecosystem. JAX is a high-performance array computing framework that provides autodifferentiation and Just-In-Time (JIT) compilation with a Numpy-like API and is developed and maintained by Google. By building on top of Google Deepmind's JAX-based neural network library [Haiku](https://github.com/google-deepmind/dm-haiku), Spyx implements a number of common neuron models as well as enables users to define their own, with the model forward passes, gradient calculations, and even entire training loops being able to be JIT compiled for execution on GPUs, TPUs, or on CPU. In the benchmark, computing using full precision (fp32) and half precision (fp16) achieve the fastest training loops. 

{{< chart data="framework-benchmarking-mem-16k" caption="Comparison of peak memory usage when computing forward and backward passes in different frameworks, for 16k neurons." mobile="framework-benchmarking-mem-16k.png">}}

The second figure shows the maximum memory usage during forward and backward pass for the same networks. SpikingJelly with the CuPy backend still comes out on top of the PyTorch libraries. It provides a strong option if your training flow is compatible with SpikingJelly's "Multi-Step" evaluation method, which is a requirement for the CuPy backend. The memory usage benchmarks were collected using PyTorch's [max_memory_allocated()](https://pytorch.org/docs/stable/generated/torch.cuda.max_memory_allocated.html) function, unfortunately JAX does not have a similar function so for now Spyx is not included in the memory benchmark.

## Summary
The ideal library will often depend on a multitude of factors, such as accessible documentation, usability of the API or pre-trained models. Generally speaking, PyTorch offers good support when custom neuron models (that have additional states, recurrence) are to be explored. For larger networks, it will likely pay off to rely on CUDA-accelerated existing implementations, or [implement CuPy backends](https://spikingjelly.readthedocs.io/zh_CN/latest/activation_based_en/cupy_neuron.html) for new neuron models. The development of Spyx offers an interesting new framework as it enables the flexible neuron definitions of PyTorch frameworks while also enabling the speed of libraries which utilize custom CUDA backends. We also tested *torch.compile*, which is provided in [PyTorch 2](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) and can significantly increase computation speed in ANNs. Unfortunately, in preliminary tests using *torch.compile* on networks in Norse, snnTorch and Sinabs, we didn't observe any speedup at the time of writing. Another option to speed up computation of implementations relying on PyTorch backends is to use [CUDA graph replay](https://pytorch.org/blog/accelerating-pytorch-with-cuda-graphs/), although that has not been tested here as it is not included in any of the libraries' tutorials. One more note on the accuracy of gradient computation: In order to speed up computation, some frameworks will approximate this calculation over time. Networks will still manage to *learn* in most cases, but EXODUS, correcting an approximation in SLAYER and therefore calculating gradients that are equivalent to BPTT, showed that it can make a substantial difference in certain experiments. So while speed is extremely important, other factors such as memory consumption and quality of gradient calculation matter as well. 

## Edits
**13/08/2023**: Sumit Bam Shrestha fixed Lava's out-of-memory issue by disactivating quantization. That makes it one of the best performing frameworks.

**22/10/2023**: Kade Heckel reperformed experiments on an A100 and added his Spyx framework.

**07/11/2023**: Cameron Barker containerised the benchmark suite and added the memory utilisation benchmark. The updated benchmarks were run on a RTX 3090 with a batchsize of 16.

## Code and comments
The code for this benchmark is available [here](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/content/english/blog/spiking-neural-network-framework-benchmarking/). The order of dimensions in the input tensor and how it is fed to the respective models differs between libraries.
Benchmarks were run on a NVIDIA RTX 3090 with 24GB of VRAM. Frameworks use full precision computation unless stated otherwise.
<!-- Benchmarks are averaged across 100 runs on a NVIDIA A100 GPU with 40GB of vRAM.  Standard deviations have been omitted because they are negligible. Frameworks use full precision computation unless stated otherwise.  -->

Some things that would be interesting to add:

* multilayer scalability and benchmarking
* evaluation of PyTorch frameworks when using torch.compile and with automatic mixed precision
* check that forward dynamics are roughly equal in each case
* given equivalent forward dynamics, check gradient correlations and magnitudes
* ✔ memory consumption of different libraries
* ✔ add JAX framework

## Authors
* [Gregor Lenz](https://lenzgregor.com) holds a PhD in neuromorphic engineering from Sorbonne University and has been training SNNs for a little while now!
* [Kade Heckel](https://github.com/kmheckel/spyx) is a Marshall Scholar and a current MPhil student at the Univeristy of Cambridge. He authored the library Spyx as part of the dissertation for an MSc at the University of Sussex under the supervision of Thomas Nowotny.
* [Sumit Bam Shrestha](https://www.intel.com/content/www/us/en/research/featured-researchers/sumit-bam-shrestha.html) is a research scientist in neuromorphic computing at Intel Labs, where he focuses on deep spiking neural networks.
* [Cameron Barker](https://github.com/cameron-git) is a Neuromorphic Engineer at Ripga ltd.
