---
title: "BindsNET"
type: neuromorphic-software
description: Built on top of PyTorch, used for simulating SNNs, geared towards ML and reinforcement learning.
logo: bindsnet.jpg
website: https://bindsnet-docs.readthedocs.io/
dependencies: PyTorch
field_of_application: Machine Learning
source_code: https://github.com/bindsnet/bindsnet
stars_widget_url: https://img.shields.io/github/stars/bindsnet/bindsnet.svg?style=social
stars: 1375
version_widget_url: https://img.shields.io/pypi/v/bindsnet.svg
license: AGPL-3.0
supports_hardware: False
supports_NIR: False
language: Python
maintainer: Hananel Hazan 
draft: false
---

## Overview
**BindsNET** is an open-source computational framework designed to simulate spiking neural networks (SNNs), it was built atop of the PyTorch deep learning library. 
The project was created in 2018 by Hazan Hananel and Daniel Saunders, their work is supported by the Defense Advanced Research Project Agency Grant they acquired. 
BindsNET is a project that provides tools and functionality for creating, managing and simulating neural networks of spiking neurons and synapses. It utilizes PyTorch's
GPU/CPU acceleration prowess, fully using the low-powered nature of SNNs. Also, it is accompanied by extensive documentation, including installation guides,
a user manual, and detailed reference material, making it accessible for researchers and practitioners in the field of computational neuroscience and machine learning.

The framework bolsters the use of a variety of different types of neuron models and learning algorithms. It offers versatility, allowing for specific connections between 
neuron models and different types of synaptic strengths and connections between the models, enabling practitioners and researchers for flexibility when creating their own 
network architectures. BindsNET provides customization of neuron models where you can modify the weights, tensor bias, weight maximum value, a normalization factor for all
the weights enabling for synaptic plasticity, crucial for learning and memory. On the creation of the network you can specify a simulation time-step constant,*dt* which
determines the granularity of the simulation. The time-step parameter induces a trade-off between simulation speed and numerical precision, a larger value results in fast
simulation, but poor accuracy.

While BindsNET opens up many possibilities for SNN research and application, it may require familiarity with PyTorch and a solid understanding of SNN principles, but it doesn't
underscore the versatility, customizability, and practical applications of the BindsNET library.