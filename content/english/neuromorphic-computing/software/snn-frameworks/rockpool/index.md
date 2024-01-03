---
title: "Rockpool"
type: neuromorphic-software
description: Machine learning library for SNN applications, supports GPU, TPU, CPU acceleration, and neuromorphic compute hardware deployment.
logo: rockpool.png
website: https://rockpool.ai
dependencies: PyTorch, Jax
field_of_application: Machine Learning
source_code: https://gitlab.com/synsense/rockpool
stars_widget_url: https://img.shields.io/github/stars/synsense/rockpool.svg?style=social
stars: 37
version_widget_url: https://img.shields.io/pypi/v/rockpool.svg
license: AGPL-3.0
supports_hardware: True
supports_NIR: True
language: Python
maintainer: Dylan Muir
draft: false
---

## Overview
Rockpool is a Python package focusing on dynamical neural network architectures, especially tailored for event-driven networks and Neuromorphic computing hardware. Managed by SynSense, Rockpool facilitates the design, training, and evaluation of recurrent networks with continuous-time dynamics or event-driven dynamics, providing a versatile interface for diverse neural network configurations.

The framework offers standard modules, tools for working with time series data, and specialized training techniques for Jax and Torch networks. It provides an extensive API and supports various training methods, including gradient descent and adversarial training. In addition, Rockpool is equipped to handle specific types of hardware, such as the Xylo™ inference processors, Xylo™ Audio, Xylo™ IMU, and DYNAP-SE2 mixed-signal processor, offering resources for quick starting and training networks tailored for these devices.

Rockpool's documentation includes tutorials, advanced topics such as computational graphs and graph mapping, parameter handling, performance benchmarks, and a comprehensive API summary. It also provides developer documentation, including UML diagrams and notes for backend management. This open-source project aims to simplify and optimize the process of designing and deploying neural networks on various hardware platforms, bridging the gap between dynamic neural modeling and practical application.
