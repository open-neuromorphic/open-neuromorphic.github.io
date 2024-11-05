---
title: "GeNN"
type: neuromorphic-software
description: Simulator for SNN models focusing on dynamics, size, structure of neural systems, not on individual neuron morphology.
logo: nest.png
website: https://genn-team.github.io/
dependencies: 
field_of_application: Neuroscience, Machine learning
source_code: https://github.com/genn-team/genn
stars_widget_url: https://img.shields.io/github/stars/genn-team/genn.svg?style=social
stars: 233
version_widget_url: https://img.shields.io/github/release/genn-team/genn.svg?label=github%20release
license: LGPL-2.1
supports_hardware: False
supports_NIR: False
language: C++/Python
maintainer: James Knight
draft: false
---

## Overview
**GeNN** is a software package to accelerate Spiking Neural Network simulations 
on hardware including NVIDIA GPUs using code generation. Networks are described using a simple Python API and the models and snippets used to describe the behaviour of the neurons and synapses which make up the networks are easily customised using strings containing a C-like language called GeNNCode. GeNN provides extensive documentation and tutorials.

GeNN focusses on flexibility and performance on a single GPU, providing unique features for offloading initialisation to the GPU and even generating connectivity on the fly, allowing very large models (millions of neurons and billions of synapses to be simulated on a single GPU.
Because of this flexibility, GeNN has been used across a wide range of applications from simulating large-scale models of cortex to training recurrent SNNs using gradient-based learning for machine learning tasks.
