---
title: "Spyx"
type: neuromorphic-software
description: Compact SNN package on DeepMind's Haiku library, based on JAX for JIT compilation on GPUs and TPUs.
logo: spyx.png
website: https://spyx.readthedocs.io
dependencies: JAX, Haiku
field_of_application: Machine Learning
source_code: https://github.com/kmheckel/spyx
stars_widget_url: https://img.shields.io/github/stars/kmheckel/spyx.svg?style=social
stars: 30
version_widget_url: https://img.shields.io/pypi/v/spyx.svg
license: MIT
supports_hardware: False
supports_NIR: True
language: Python
maintainer: Kade Heckel
draft: false
---

## Overview
**Spyx** is a compact spiking neural network library built on top of DeepMind's Haiku package. It aims to blend the flexibility and extensibility typical of PyTorch-based SNN
libraries with efficient training capabilities on high-performance hardware. The library is optimized for high-performance simulations, which is critical for handling the
computationally intensive nature of large-scale SNNs. Spyx claims to achieve speeds comparable to or even faster than other SNN frameworks that have custom CUDA implementations.

The library is designed to be a streamlined solution for SNN development, supporting diverse model structures and algorithms. Its documentation covers various aspects, including
quick start guides, tutorials on surrogate gradients, training SNNs using neuroevolution, comparisons of spiking neuron models, and surrogate gradient functions. Additionally, it
provides a template for creating surrogate gradients and a comprehensive API reference. 

Spyx includes implementations of several key neural learning mechanisms, such as spike-timing-dependent plasticity (STDP), facilitating research into neural learning and memory. 
As well as, it is designed to be modular, allowing users to easily integrate custom models and algorithms, enhancing its flexibility. Spyx is a powerful and specialized tool, its 
strengths lie in its high-performance simulation capabilities, and versatility for various research applications. It offers a valuable platform for advancing our understanding of 
complex neural dynamics and the development of brain-inspired computing systems.
