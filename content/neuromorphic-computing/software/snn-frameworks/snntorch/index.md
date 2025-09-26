---
title: "snnTorch"
type: neuromorphic-software
description: Focuses on gradient-based training of SNNs, based on PyTorch for GPU acceleration and gradient computation.
logo: snntorch.png
website: https://snntorch.readthedocs.io
dependencies: PyTorch
field_of_application: Machine Learning
source_code: https://github.com/jeshraghian/snntorch
pypi_id: snntorch
license: MIT
supports_hardware: False
supports_NIR: True
language: Python
maintainer: Jason Eshraghian
draft: false
---



## Overview
**snnTorch** is a Python package designed for spiking neural network simulations and extends PyTorch's capabilities to spiking neurons, offering pre-designed models within the PyTorch framework. It aims to bridge the gap between the brain's efficient spike-based information encoding and modern deep learning techniques. snnTorch includes components for spiking neuron libraries deeply integrated with autograd, export functionalities for cross-compatibility, arithmetic operations on spikes, libraries for spike generation and data conversion, visualization tools, surrogate gradient functions, and utility functions for datasets.

The framework allows seamless integration of spiking neurons into PyTorch's computational graph, treating them as recurrent units. It supports various neuron models represented by recursive functions, eliminating the need to store membrane potential traces for all neurons, which facilitates the training of both small and large networks on CPU and GPU. 

Users can benefit from GPU acceleration in the same way as PyTorch, provided network models and tensors are loaded onto CUDA.

snnTorch is continually maintained by the UCSC Neuromorphic Computing Group and invites community contributions. Its source code is published under the MIT License, and its 
documentation is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License. The project emphasizes ease of use, efficiency, and extendability, positioning it 
as a valuable tool for researchers and practitioners interested in exploring and advancing the field of spiking neural networks.
