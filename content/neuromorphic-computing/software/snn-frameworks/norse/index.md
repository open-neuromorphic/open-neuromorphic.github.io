---
title: "Norse"
type: neuromorphic-software
description: Exploits bio-inspired neural components, sparse and event-driven, expands PyTorch with primitives for bio-inspired neural components.
logo: norse.png
website: https://norse.github.io/norse/
dependencies: PyTorch
field_of_application: Bio-inspired Neural Networks
source_code: https://github.com/norse/norse
pypi_id: norse
license: LGPL-3.0
supports_hardware: False
supports_NIR: True
language: Python
maintainer: 
  - Jens E. Pedersen
  - Christian Pehle
draft: false
---



## Overview
**Norse** is a deep learning Python library used for simulating spiking neural networks (SNN)s that leverages PyTorch with bio-inspired neural networks. Norse is maintained  and developed by Christian Pehle and Jens Egholm Pedersen, with funding from the EC Horizon 2020 Framework Programme and the DFG, German Research Foundation. Additionally, Norse is a community-driven project, encouraging community contributions and development. 

Norse is accompanied by extensive documentation, including tutorials on running classification tasks on datasets like MNIST, CIFAR, and cartpole balancing with policy gradients, showcasing Norse's compatibility with PyTorch Lightning. While utilizing the PyTorch library for CPU/GPU acceleration, Norse expands it by adding their own spiking neuron models. This approach leverages the sparse and event-driven nature of biological neural networks to create energy efficient computational models. The framework provides a variety of different neuron models and is designed to be adaptable, allowing for custom neuron model creation and integration with existing deep learning models.

Norse aims to be a foundational tool for understanding the transition from standard deep learning models to spiking models. It enables the creation of new neural network models 
and the adaptation of existing models with spiking capabilities. Norse also acknowledges the resource-intensive nature of spiking neural networks and provides guidance on hardware 
acceleration to optimize simulation performance.
