---
title: "Axon SDK"
type: neuromorphic-software
description: Python Toolkit for Spiking Neural Networks and general purpose Neuromorphic Computing
logo: axon.png
website: https://neucom-aps.github.io/axon-sdk/
dependencies: Numpy
field_of_application: Neuromorphic Computing
source_code: https://github.com/neucom-aps/axon-sdk
license: GPL-3.0
supports_hardware: False
supports_NIR: False
language: Python
maintainer:
    - Iñigo Lara
    - Francesco Sheiban
    - Dmitri Lyalikov
draft: false
---



## Overview

**Axon SDK** is a Python simulation toolkit for spiking neural networks (SNNs). Instead of mimicking biology through conventional neuron models, it leverages the [STICK (Spike Time Interval Computation Kernel) framework](https://arxiv.org/abs/1507.06222) to represent and execute any algorithm through precise spike timing. This makes it possible to map symbolic or control-oriented computation into spiking time-coded dynamics.

The project aims to overcome the von Neumann bottleneck by shifting computation to neuromorphic principles where information and processing are tightly interwoven in time. By providing a framework that structures non-neural algorithms into spike-based representations, Axon SDK brings computation closer to truly general-purpose neuromorphic platforms. It also addresses issues where current neuromorphic hardware pipelines still depend on external digital preprocessing (e.g., noise filtering in DVS vision), which creates latency and energy inefficiencies.

Axon SDK is developed and maintained by Neucom, a Denmark-based startup focused on building general-purpose neuromorphic computing platforms.