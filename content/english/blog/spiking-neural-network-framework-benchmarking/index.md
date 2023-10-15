---
title: "Spiking Neural Network (SNN) Library Benchmarks"
date: 2023-08-02
description: "Discover the fastest Spiking Neural Network (SNN) frameworks for PyTorch optimization. Performance, flexibility, and more analyzed in-depth"
draft: false
author: "Gregor Lenz"
image: framework-benchmarking-16k-header.png
tags: ["snn", "framework", "library", "pytorch"]
---

## Introduction 

Open Neuromorphic's [list of SNN frameworks](https://github.com/open-neuromorphic/open-neuromorphic) currently counts 10 libraries, and those are only the most popular ones! As the sizes of spiking neural network models grow thanks to deep learning, optimization becomes more important for researchers and practitioners alike. Training SNNs is often slow, as the stateful networks are typically fed sequential inputs. Today's most popular training method then is some form of backpropagation through time, whose time complexity scales with the number of time steps. We benchmark libraries that all take slightly different approaches on how to extend PyTorch for gradient-based optimization of SNNs. While we focus on the time it takes to pass data forward and backward through the network, there are obviously other, non-tangible qualities of frameworks (extensibility, quality of documentation, ease of install, support for neuromorphic hardware ...) that we're not going to try to capture here. In our benchmarks, we use a single fully-connected (linear) and a leaky integrate and fire (LIF) layer. The input data has batch size of 10, 500 time steps and n neurons. 

{{< image src="framework-benchmarking-512.png" alt="Comparison of time taken for forward and backward passes in different frameworks, for 512 neurons." caption="Comparison of time taken for forward and backward passes in different frameworks, for 512 neurons." >}}

The first figure shows results for a small 512 neuron network. Overall, [SpikingJelly](https://github.com/fangwei123456/spikingjelly) is the fastest when using the CuPy backend, at just 1.49ms for both forward and backward call. The libraries that use an implementation of [EXODUS](https://www.frontiersin.org/articles/10.3389/fnins.2023.1110444/full) ([Sinabs EXODUS](https://github.com/synsense/sinabs-exodus) / [Rockpool EXODUS](https://rockpool.ai/reference/_autosummary/nn.modules.LIFExodus.html?)) or [SLAYER](https://proceedings.neurips.cc/paper_files/paper/2018/hash/82f2b308c3b01637c607ce05f52a2fed-Abstract.html) ([Lava DL](https://github.com/lava-nc/lava-dl)) equally benefit from custom CUDA code and vectorization across the time dimension in both forward and backward passes. It is noteworthy that such custom implementations exist for specific neuron models (such as the LIF under test), but not for arbitrary neuron models. On top of that, custom CUDA/CuPy backend implementations need to be compiled and then it is up to the maintainer to test it on different systems. Networks that are implemented in SLAYER, EXODUS or SpikingJelly with a CuPy backend cannot be executed on a CPU (unless converted). 
In contrast, frameworks such as [snnTorch](https://github.com/jeshraghian/snntorch), [Norse](https://github.com/norse/norse), [Sinabs](https://sinabs.ai) or [Rockpool](https://rockpool.ai) are very flexible when it comes to defining custom neuron models, but that flexibility comes at a cost of slower computation. SpikingJelly also supports a conventional PyTorch GPU backend with which it's possible to define neuron models more flexibly. Such implementations are also much easier to maintain, as relying on the extensive testing of PyTorch means that it will likely work on a given machine configuration.

{{< image src="framework-benchmarking-4k.png" alt="Comparison of time taken for forward and backward passes in different frameworks, for 4k neurons." caption="Comparison of time taken for forward and backward passes in different frameworks, for 4k neurons." >}}

{{< image src="framework-benchmarking-16k.png" alt="Comparison of time taken for forward and backward passes in different frameworks, for 16k neurons." caption="Comparison of time taken for forward and backward passes in different frameworks, for 16k neurons." >}}

When scaling up the number of neurons, the difference between performances becomes more evident. We notice that snnTorch has issues scaling up the forward and backward pass. SpikingJelly keeps its blazing fast forward pass, followed by an implementation of SLAYER in Lava-DL. EXODUS implementations have the quickest backward pass. SpikingJelly with the CuPy backend is more than 10 times faster than libraries that rely on pure PyTorch acceleration. 

## Summary
The ideal library will often depend on a multitude of factors, such as accessible documentation, usability of the API or pre-trained models. Generally speaking, PyTorch offers good support when custom neuron models (that have additional states, recurrence) are to be explored. For larger networks, it will likely pay off to rely on CUDA-accelerated existing implementations or [implement CuPy backends](https://spikingjelly.readthedocs.io/zh_CN/latest/activation_based_en/cupy_neuron.html) for new neuron models. We also tested `torch.compile`, which is provided in [PyTorch 2](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) and can significantly increase computation speed in ANNs, on Norse, snnTorch and Sinabs. Unfortunately, none of the frameworks tested supports that feature or benefits from a speed up in our test case at the time of writing. Another option to speed up computation of implementations relying on PyTorch backends is to use [CUDA graph replay](https://pytorch.org/blog/accelerating-pytorch-with-cuda-graphs/), although that has not been tested here as it is not included in any of the libraries' tutorials. One last thing we want to highlight is about the accuracy of gradient computation. Whereas implementations based on SLAYER (Lava DL) drop certain terms in the backward calculation that can have an impact on training performance, EXODUS shows gradient calculations equivalent to those calculated by backpropagation through time (BPTT) up to numerical accuracy. That guarantees acceleration without any qualitative impact. The author currently doesn't know if gradients calculated by SpikingJelly with the CuPy backend are equivalent to those calculated by PyTorch BPTT.

## Edits
13/08/2023: Thanks to Sumit Bam Shrestha who fixed Lava's out-of-memory issue by disactivating quantization. That makes it more similar to the other frameworks under test after the edit.

## Code and comments
The code for this benchmark is available [here](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/content/post/framework-benchmarking/data-generation.ipynb). The order of dimensions in the input tensor and how it is fed to the respective models differs between libraries. Benchmarks are averaged across 100 runs on a NVIDIA RTX 2070 GPU with 8GB of memory. Standard deviations have been omitted because they are negligible. Some things that would be interesting to add:

* check that forward dynamics are roughly equal in each case
* given equivalent forward dynamics, check gradient correlations and magnitudes
* memory consumption of different libraries
* effect of CUDA graph replay
* benchmarking JAX implementations

## Author
* [Gregor Lenz](https://lenzgregor.com) holds a PhD in neuromorphic engineering from Sorbonne University and has been training SNNs for a little while now!
