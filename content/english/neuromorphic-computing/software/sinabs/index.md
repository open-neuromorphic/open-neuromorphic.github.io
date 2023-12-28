---
title: "Sinabs"
description: PyTorch-based DL library for SNNs, focusing on simplicity, fast training, extendability, and vision models.
logo: sinabs.png
website: https://sinabs.ai
dependencies: PyTorch
field_of_application: Vision Models
source_code: https://github.com/synsense/sinabs
stars_widget_url: https://img.shields.io/github/stars/synsense/sinabs.svg?style=social
stars: 54
version_widget_url: https://img.shields.io/pypi/v/sinabs.svg
license: AGPL-3.0
supports_hardware: True
supports_NIR: True
language: Python
maintainer: Sadique Sheik
draft: false
---

## Overview
Sinabs (Sinabs Is Not A Brain Simulator) is a deep learning library based on PyTorch specifically designed for spiking neural networks. It focuses on simplicity, fast training, and extendability, particularly excelling with vision models due to its support for weight transfer. The library provides users with an efficient route to convert existing artificial neural networks to spiking neural networks, with tutorials guiding through various processes such as converting an existing ANN or running examples using Backpropagation Through Time (BPTT) with neuromorphic versions of datasets like MNIST.

Sinabs is also equipped with plugins to enhance its functionality, including deploying models to neuromorphic hardware and significantly speeding up the training of feed-forward models. The API reference provides a comprehensive overview of the supported neuron models and the weight transfer API, among other features.

The documentation offers insights into getting started with Sinabs, whether you're diving into the syntax of spiking neural networks or looking to adapt existing neural networks into the spiking paradigm. It's particularly noted for its performance with vision models and its collaboration with other tools like Rockpool for different types of data or backend needs. Sinabs encourages community engagement with clear contribution guidelines and is maintained by SynSense, reflecting the ongoing development and support for the library.