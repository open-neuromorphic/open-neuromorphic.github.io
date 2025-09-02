---
title: "Spyx"
type: neuromorphic-software
description: Compact SNN package on DeepMind's Haiku library, based on JAX for JIT compilation on GPUs and TPUs.
logo: spyx.png
website: https://spyx.readthedocs.io
dependencies: JAX, Haiku
field_of_application: Machine Learning
source_code: https://github.com/kmheckel/spyx
pypi_id: spyx
license: MIT
supports_hardware: False
supports_NIR: True
language: Python
maintainer: Kade Heckel
draft: false
---



## Overview
**Spyx** is a compact spiking neural network library built on top of DeepMind's Haiku package. It aims to blend the flexibility and extensibility typical of PyTorch-based SNN libraries with efficient training capabilities found in frameworks with custom CUDA implementations. The library is optimized for high-performance simulations on GPUs and TPUs, which is critical for handling the computationally intensive nature of large-scale SNNs. Spyx is able to train models at comparable speeds to frameworks with custom CUDA implementations by extensively leveraging Just-In-Time compilation; another interesting feature is the ability to pack neuromorphic data into int8 datatypes and unpack them during training time, allowing datasets to be stored in completely in VRAM at a fraction of their normal size.

The library is designed to be a streamlined solution for SNN development, supporting diverse model structures and algorithms. Its documentation covers various aspects, including quick start guides, tutorials on surrogate gradients, training SNNs using neuroevolution, comparisons of spiking neuron models, and surrogate gradient functions. Additionally, it provides a template for creating surrogate gradients and a comprehensive API reference. The library is designed to be modular, allowing users to easily integrate custom models and algorithms, enhancing its flexibility. Spyx is a powerful and specialized tool with great strength in its high-performance simulation capabilities and versatility for various research applications.
