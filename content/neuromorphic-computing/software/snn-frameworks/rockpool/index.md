---
title: "Rockpool"
type: neuromorphic-software
description: Machine learning library for SNN applications, supports GPU, TPU, CPU acceleration, and neuromorphic compute hardware deployment.
logo: rockpool.png
website: https://rockpool.ai
dependencies: PyTorch, Jax
field_of_application: Machine Learning
source_code: https://gitlab.com/synsense/rockpool
pypi_id: rockpool
license: AGPL-3.0
supports_hardware: True
supports_NIR: True
language: Python
maintainer: Dylan Muir
draft: false
stars: 10
---



## Overview
**Rockpool** is an open-source Python package focused on dynamic neural network architectures, tailored for event-driven networks and neuromorphic hardware. Managed by SynSense, Rockpool facilitates the design, training, and evaluation of recurrent neural networks with either continuous-time or event-driven dynamics. The library is designed for efficiency, enabling fast simulation and training of networks, which is crucial for real-time applications and deployment on low-power neuromorphic hardware.

The framework offers standard modules, tools for working with time series data, as well as specialized training techniques for Jax and Torch networks. It provides an extensive API and supports various training methods, including gradient descent and adversarial training. Additionally, Rockpool is capable of interfacing with specific types of hardware, such as the Xylo™ inference processors, Xylo™ Audio, Xylo™ IMU, and DYNAP-SE2 mixed-signal processor, offering resources for quick starting and training networks tailored for these devices.

Rockpool stands out for its user-friendly interface and integration with Python, making it accessible to a broad range of users, from researchers to practitioners in the field of AI and neuroscience. Furthermore, it also provides tools for analyzing and visualizing neural data, aiding in the understanding of complex network behaviors. Rockpool's documentation includes tutorials and covers advanced topics such as computational graphs and graph mapping, parameter handling, performance benchmarks, and a comprehensive API summary. The project also provides developer documentation, including UML diagrams and notes for backend management. Aimed at simplifying and optimizing the process of designing and deploying neural networks on various hardware platforms, bridging the gap between dynamic neural modeling and practical application.
