---
title: "Norse"
type: neuromorphic-software
description: Exploits bio-inspired neural components, sparse and event-driven, expands PyTorch with primitives for bio-inspired neural components.
logo: norse.png
website: https://norse.github.io/norse/
dependencies: PyTorch
field_of_application: Bio-inspired Neural Networks
source_code: https://github.com/norse/norse
stars_widget_url: https://img.shields.io/github/stars/norse/norse.svg?style=social
stars: 578
version_widget_url: https://img.shields.io/pypi/v/norse.svg
license: LGPL-3.0
supports_hardware: False
supports_NIR: True
language: Python
maintainer: Jens Egholm Pedersen, Christian Pehle
draft: false
---

## Overview
**Norse** is deep learning Python library used for the simulation of spiking neural networks (SNN)s that takes advantage of PyTorch with bio-inspired neural networks. Norse is
maintained and developed by Christian Pehle and Jens Egholm Pedersen, this is possible due to the EC Horizon 2020 Framework Programme funding and the DFG, German Research Foundation.
Moreover, Norse is a community-driven project, encouraging community contributions and development. 

Additionally, Norse is accompanied by extensive documentation, including tutorials on running classification tasks on datasets like MNIST, CIFAR, and cartpole balancing with policy
gradients. Showcasing Norse's compatibility with PyTorch Lightning. While utilizing the PyTorch library for its CPU/GPU acceleration, Norse expands it by adding their own spiking
neuron models. Taking advantage of the sparse and even-driven nature of biological neural networks to create energy efficient computational models. The framework provides a variety
of different neuron models, and it is designed to be adaptable, allowing for custom neuron model creation and integration with existing deep learning models.

Norse aims to be a foundational tool for understanding the transition between standard deep learning models to spiking models. Allowing for new neural network models and adapting
existing models with spiking capabilities. It also acknowledges the resource-intensive nature of spiking neural networks and provides guidance on hardware acceleration to optimize
simulation performance.