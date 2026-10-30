---
title: "ARCANA"
type: "neuromorphic-software"
category: "simulator"
description: "PyTorch library that simulates the neuron and synapse circuits of the DYNAP-SE mixed-signal neuromorphic processor, with circuit parameters that can be trained."
logo: ""
website: "https://dynapsetorch.readthedocs.io/"
dependencies: "PyTorch, NumPy"
field_of_application: "Simulation, Machine Learning"
source_code: "https://github.com/ferqui/ARCANA"
pypi_id: ""
license: "GPL-3.0"
supports_hardware:
supports_NIR:
language: "Python"
maintainer: "Fernando M. Quintana"
draft: true
url: /neuromorphic-computing/software/simulators/arcana/
---

## Overview

ARCANA is a Python library built on PyTorch that provides a simulation model of the DYNAP-SE mixed-signal neuromorphic processor. It models the DPI (differential pair integrator) neuron circuit implemented on DYNAP-SE, including spike-frequency adaptation and positive feedback, and the four synapse types of the chip: excitatory AMPA and NMDA (with voltage gating for NMDA), and inhibitory GABAa and GABAb.

Because the model is written in PyTorch, circuit parameters such as the gain and leakage currents of a neuron can be optimized with standard gradient-based optimizers. The project README includes a quickstart that trains these currents to reach a target firing rate.

### Getting started
ARCANA is not published on PyPI. It is installed from GitHub with `pip install git+https://github.com/ferqui/ARCANA.git`. Documentation is available at [dynapsetorch.readthedocs.io](https://dynapsetorch.readthedocs.io/).

### Reference
The framework is described in F. M. Quintana, Maryada, P. L. Galindo, E. Donati, G. Indiveri and F. Perez-Peña, "A Realistic Simulation Framework for Analog/Digital Neuromorphic Architectures", *Neuromorphic Computing and Engineering* 5, 034006 (2025), [doi:10.1088/2634-4386/adef77](https://doi.org/10.1088/2634-4386/adef77).

### License
The source code is licensed under GPL-3.0, and the documentation under CC BY-SA 4.0.
