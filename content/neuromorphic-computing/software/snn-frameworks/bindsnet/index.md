---
title: "BindsNET"
type: neuromorphic-software
description: Built on top of PyTorch, used for simulating SNNs, geared towards ML and reinforcement learning.
logo: bindsnet.jpg
website: https://bindsnet-docs.readthedocs.io/
dependencies: PyTorch
field_of_application: Machine Learning
source_code: https://github.com/bindsnet/bindsnet
pypi_id: bindsnet
license: AGPL-3.0
supports_hardware: False
supports_NIR: False
language: Python
maintainer: Hananel Hazan 
draft: false
---



## Overview
**BindsNET** is an open-source computational framework designed to simulate spiking neural networks (SNNs). Built atop the PyTorch deep learning library, it was created in 2018 by Hazan Hananel and Daniel Saunders. Their work is supported by a Defense Advanced Research Project Agency Grant they acquired. BindsNET provides tools and functionality for creating, managing and simulating neural networks of spiking neurons and synapses. It utilizes the GPU/CPU acceleration capabilities of PyTorch, fully leveraging the  low-powered nature of SNNs. The framework is also accompanied by extensive documentation, including installation guides, a user manual, and detailed reference materials, making it accessible for researchers and practitioners in the field of computational neuroscience and machine learning.

The framework supports a variety of different types of neuron models and learning algorithms. It offers versatility, allowing for specific connections between neuron models and different types of synaptic strengths and connections. This flexibility is invaluable for practitioners and researchers when designing their own network architectures. BindsNET allows for customization of neuron models, enabling users to modify weights, tensor bias, weight maximum value, and a normalization factor for all the weights, which is crucial for synaptic plasticity, learning, and memory. During network creation, you can specify a simulation time-step constant *dt*, which determines the granularity of the simulation. The time-step parameter induces a trade-off between simulation speed and numerical precision: a larger value results in faster simulation, but reduced accuracy.

While BindsNET opens up many possibilities for SNN research and applications, it may require familiarity with PyTorch and a solid understanding of SNN principles. However, this requirement does not diminish the versatility, customizability, and practical applications of the BindsNET library.
