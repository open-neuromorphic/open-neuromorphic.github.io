---
title: "hxtorch"
type: neuromorphic-software
description: Training spiking neural networks with BrainScaleS-2 hardware-in-the-loop support based on PyTorch.
website: https://electronicvisions.github.io/documentation-brainscales2/latest/
dependencies: PyTorch, BrainScaleS-2 OS
field_of_application: Machine Learning, Neuromorphic Hardware, In-the-loop Training
source_code: https://github.com/electronicvisions/hxtorch
stars_widget_url: https://img.shields.io/github/stars/electronicvisions/hxtorch
stars: 9
version_widget_url: https://img.shields.io/github/v/tag/electronicvisions/releases-ebrains
license: LGPL-2.0-or-later
supports_hardware: True
supports_NIR: True
language: Python
draft: false
maintainer: Electronic Visions Group
---

## Overview

**hxtorch** is a deep learning Python library used for numerical simulation, neuromorphic emulation and training of spiking neural networks (SNNs). Built on top of PyTorch, it integrates the automatic differentiation and modular design of the PyTorch ecosystem with neuromorphic experiment execution, enabling hardware-in-the-loop training workflows on the neuromorphic hardware system [BrainScaleS-2](https://open-neuromorphic.org/neuromorphic-computing/hardware/brainscales-2-universitat-heidelberg/).

The library abstracts the hardware configuration and experiment execution, while allowing users to define networks using familiar PyTorch modules such as LIF and LI neuron layers and synaptic connections. By separating network definition from execution, hxtorch supports both software simulation and hardware emulation within a single, unified API.

The framework supports surrogate gradient-based learning, custom backward functions and seamless conversion between sparse, event-based observables and dense PyTorch tensors. It is designed to facilitate iterative model development, hybrid simulation/emulation and the integration of hardware observables such as spike trains and membrane voltages directly into the training loop.
