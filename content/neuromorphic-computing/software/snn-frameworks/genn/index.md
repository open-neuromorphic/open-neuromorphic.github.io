---
title: "GeNN"
type: neuromorphic-software
description: Simulator for SNN models focusing on networks, not on individual neuron morphology. Optimised for accelerated simulations on computational backends including NVIDIA GPUs.
logo: genn.png
website: https://genn-team.github.io/
dependencies: 
field_of_application: Neuroscience, Machine learning
source_code: https://github.com/genn-team/genn
license: LGPL-2.1
supports_hardware: False
supports_NIR: False
language: C++/Python
maintainer: James Knight
draft: false
---



## Overview
**GeNN** is a software package to accelerate Spiking Neural Network simulations 
on hardware including NVIDIA GPUs. GeNN uses code generation with various 'backends' to run simulations. The main backends are currently C++/CUDA for NVIDIA GPUs or C++ for CPU-only mode. GeNN is available on Linux, Windows, MacOS.

Networks are described using a simple Python API and built out of model components that can be fully customized. The behaviour of neurons, synapses, plasticity mechanisms, initialisation methods and connectivity construction are defined using Python strings containing a C-like language called GeNNCode. Users can fully customise these components. GeNN provides extensive documentation and tutorials.

GeNN focusses on flexibility and performance on a single GPU, providing unique features for offloading initialisation to the GPU and even generating connectivity on the fly, allowing very large models (millions of neurons and billions of synapses to be simulated on a single GPU.

Because of this flexibility, GeNN has been used across a wide range of applications from simulating large-scale models of cortex to training recurrent SNNs using gradient-based learning for machine learning tasks.
