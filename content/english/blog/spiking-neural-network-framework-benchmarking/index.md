---
title: "Spiking Neural Network (SNN) Library Benchmarks"
date: 2023-08-02
description: "Discover the fastest Spiking Neural Network (SNN) frameworks for deep learning-based optimization. Performance, flexibility, and more analyzed in-depth"
draft: false
author: 
- "Gregor Lenz"
- "Kade Heckel"
- "Sumit Bam Shrestha"
image: framework-benchmarking-4k.png
tags: ["snn", "framework", "library", "pytorch", "JAX"]
---

## Introduction 

Open Neuromorphic's [list of SNN frameworks](https://github.com/open-neuromorphic/open-neuromorphic) currently counts 11 libraries, and those are only the most popular ones! As the sizes of spiking neural network models grow thanks to deep learning, optimization becomes more important for researchers and practitioners alike. Training SNNs is often slow, as the stateful networks are typically fed sequential inputs. Today's most popular training method then is some form of backpropagation through time, whose time complexity scales with the number of time steps. We benchmark libraries that all take slightly different approaches on how to extend PyTorch or other deep learning frameworks for gradient-based optimization of SNNs. While we focus on the time it takes to pass data forward and backward through the network, there are obviously other, non-tangible qualities of frameworks (extensibility, quality of documentation, ease of install, support for neuromorphic hardware ...) that we're not going to try to capture here. In our benchmarks, we use a single fully-connected (linear) and a leaky integrate and fire (LIF) layer. The input data has batch size of 96, 500 time steps and n neurons. 

{{< image src="framework-benchmarking-512.png" alt="Comparison of time taken for forward and backward passes in different frameworks, for 512 neurons." caption="Comparison of time taken for forward and backward passes in different frameworks, for 512 neurons." zoomable="true">}}

The first figure shows results for a 512 neuron network. The SNN libraries evaluated can be broken into three categories: 1. frameworks with tailored/custom CUDA kernels, 2. frameworks that purely leverage PyTorch functionality, and 3. a library that uses JAX exclusively for acceleration. For the custom CUDA libraries, [SpikingJelly](https://github.com/fangwei123456/spikingjelly) with a CuPy backend clocks in at just 4.27ms for both forward and backward call combined. The libraries that use an implementation of [SLAYER](https://proceedings.neurips.cc/paper_files/paper/2018/hash/82f2b308c3b01637c607ce05f52a2fed-Abstract.html) ([Lava DL](https://github.com/lava-nc/lava-dl)) or [EXODUS](https://www.frontiersin.org/articles/10.3389/fnins.2023.1110444/full) ([Sinabs EXODUS](https://github.com/synsense/sinabs-exodus) / [Rockpool EXODUS](https://rockpool.ai/reference/_autosummary/nn.modules.LIFExodus.html?)) benefit from custom CUDA code and vectorization across the time dimension in both forward and backward passes and achieve some 10-18ms. It is noteworthy that such custom implementations exist for specific neuron models (such as the LIF under test), but not for arbitrary neuron models. On top of that, custom CUDA/CuPy backend implementations need to be compiled and then it is up to the maintainer to test it on different systems. Networks that are implemented in SLAYER, EXODUS or SpikingJelly with a CuPy backend cannot be executed on a CPU (unless converted). 
In contrast, frameworks such as [snnTorch](https://github.com/jeshraghian/snntorch), [Norse](https://github.com/norse/norse), [Sinabs](https://sinabs.ai) or [Rockpool](https://rockpool.ai) are very flexible when it comes to defining custom neuron models, but that flexibility comes at a cost of slower computation. SpikingJelly also supports a conventional PyTorch GPU backend with which it's possible to define neuron models more flexibly. Such implementations are also much easier to maintain, as relying on the extensive testing of PyTorch means that it will likely work on a given machine configuration.
Striking a balance between flexibility/extensibility and efficiency from compilation, [Spyx](https://github.com/kmheckel/spyx) is a new framework for training SNNs within the JAX ecosystem. JAX is a high-performance array computing framework that provides autodifferentiation and Just-In-Time (JIT) compilation with a Numpy-like API and is developed and maintained by Google. By building on top of Google Deepmind's JAX-based neural network library [Haiku](https://github.com/google-deepmind/dm-haiku), Spyx implements a number of common neuron models as well as enables users to define their own, with the model forward passes, gradient calculations, and even entire training loops being able to be JIT compiled for execution on GPUs, TPUs, or on CPU. In the benchmark, computing using full precision (fp32) and half precision (fp16) achieve the fastest training loops.

{{< image src="framework-benchmarking-4k.png" alt="Comparison of time taken for forward and backward passes in different frameworks, for 4k neurons." caption="Comparison of time taken for forward and backward passes in different frameworks, for 4k neurons." zoomable="true">}}

{{< image src="framework-benchmarking-8k.png" alt="Comparison of time taken for forward and backward passes in different frameworks, for 8k neurons." caption="Comparison of time taken for forward and backward passes in different frameworks, for 8k neurons." zoomable="true">}}

When scaling up the number of neurons, the performance gap between accelerated and pure PyTorch frameworks is still evident.  Spyx and SpikingJelly keep their blazing fast forward passes, followed by SLAYER and EXODUS implementations. Spyx's utilization of JIT compilation and SpikingJelly's CuPy backend enable them to operate at more than 10 times faster than libraries that rely on pure PyTorch acceleration. 

## Summary
The ideal library will often depend on a multitude of factors, such as accessible documentation, usability of the API or pre-trained models. Generally speaking, PyTorch offers good support when custom neuron models (that have additional states, recurrence) are to be explored. For larger networks, it will likely pay off to rely on CUDA-accelerated existing implementations, [implement CuPy backends](https://spikingjelly.readthedocs.io/zh_CN/latest/activation_based_en/cupy_neuron.html) for new neuron models. The development of Spyx offers an interesting new framework as it enables the flexible neuron definitions of PyTorch frameworks while also enabling the speed of libraries which utilize custom CUDA backends. We also tested *torch.compile*, which is provided in [PyTorch 2](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) and can significantly increase computation speed in ANNs. Unfortunately, in preliminary tests using *torch.compile* on networks in Norse, snnTorch and Sinabs, we didn't observe any speedup at the time of writing. Another option to speed up computation of implementations relying on PyTorch backends is to use [CUDA graph replay](https://pytorch.org/blog/accelerating-pytorch-with-cuda-graphs/), although that has not been tested here as it is not included in any of the libraries' tutorials. One last thing we want to highlight is about the accuracy of gradient computation. Whereas implementations based on SLAYER (Lava DL) drop certain terms in the backward calculation that can have an impact on training performance, EXODUS shows gradient calculations equivalent to those calculated by backpropagation through time (BPTT) up to numerical accuracy. That guarantees acceleration without any qualitative impact. The authors are currently not aware if gradients calculated by SpikingJelly with the CuPy backend or Spyx are equivalent to those calculated by PyTorch BPTT.

## Edits
**13/08/2023**: Thanks to Sumit Bam Shrestha who fixed Lava's out-of-memory issue by disactivating quantization. That makes it more similar to the other frameworks under test after the edit.

**22/10/2023**: Thanks to Kade Heckel wo reperformed experiments on an A100 and Spyx was added to the benchmark.

## Code and comments
The code for this benchmark is available [here](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/content/english/blog/spiking-neural-network-framework-benchmarking/). The order of dimensions in the input tensor and how it is fed to the respective models differs between libraries. Benchmarks are averaged across 100 runs on a NVIDIA A100 GPU with 40GB of vRAM.  Standard deviations have been omitted because they are negligible. Frameworks use full precision computation unless stated otherwise. Some things that would be interesting to add:

* multilayer scalability and benchmarking
* evaluation of PyTorch frameworks when using torch.compile and with automatic mixed precision
* check that forward dynamics are roughly equal in each case
* given equivalent forward dynamics, check gradient correlations and magnitudes
* memory consumption of different libraries
* effect of CUDA graph replay

## Authors
* [Gregor Lenz](https://lenzgregor.com) holds a PhD in neuromorphic engineering from Sorbonne University and has been training SNNs for a little while now!
* [Kade Heckel](https://github.com/kmheckel/spyx) is a Marshall Scholar and a current MPhil student at the Univeristy of Cambridge. He authored the library Spyx as part of the dissertation for an MSc at the University of Sussex under the supervision of Thomas Nowotny.
* [Sumit Bam Shrestha](https://www.intel.com/content/www/us/en/research/featured-researchers/sumit-bam-shrestha.html) is a research scientist in neuromorphic computing at Intel Labs, where he focuses on deep spiking neural networks.
