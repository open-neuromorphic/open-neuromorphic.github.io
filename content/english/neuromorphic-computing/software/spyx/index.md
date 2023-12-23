---
title: "Spyx"
description: Compact SNN package on DeepMind's Haiku library, based on JAX for JIT compilation on GPUs and TPUs.
logo: null
website: https://spyx.readthedocs.io
dependencies: JAX, Haiku
field_of_application: Machine Learning
source_code: https://github.com/kmheckel/spyx
license: MIT
supports_hardware: False
supports_NIR: True
language: Python
version: 0.1.10
draft: false
---

## Overview
Spyx is a compact spiking neural network (SNN) library built on top of DeepMind's Haiku package. It aims to blend the flexibility and extensibility typical of PyTorch-based SNN libraries with efficient training capabilities on high-performance hardware. Spyx claims to achieve speeds comparable to or even faster than other SNN frameworks that have custom CUDA implementations. The library is designed to be a streamlined solution for SNN development, supporting diverse model structures and algorithms. Its documentation covers various aspects, including quick start guides, tutorials on surrogate gradients, training SNNs using neuroevolution, comparisons of spiking neuron models, and surrogate gradient functions. Additionally, it provides a template for creating surrogate gradients and a comprehensive API reference.