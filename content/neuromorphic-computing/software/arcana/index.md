---
title: ARCANA
type: neuromorphic-software
description: >-
  PyTorch library that simulates the DPI neuron and the AMPA, NMDA, GABAa and
  GABAb synapse models of the DYNAP-SE neuromorphic hardware.
logo: null
website: 'https://dynapsetorch.readthedocs.io/'
dependencies: PyTorch
field_of_application: 'Machine Learning, Neuromorphic Hardware'
source_code: 'https://github.com/ferqui/ARCANA'
license: GPL-3.0
supports_hardware: false
supports_NIR: false
language: Python
maintainer: Fernando M. Quintana
draft: true
category: simulator
url: /neuromorphic-computing/software/simulators/arcana/
---

## Overview

ARCANA is a library built on PyTorch that provides a simulation model of the DYNAP-SE hardware.

The README gives the equations of the DPI neuron implemented in DYNAP-SE, including an adaptation current responsible for spike-frequency adaptation and a positive-feedback current. ARCANA also simulates the synapse types that DYNAP-SE implements: AMPA and NMDA (excitatory) and GABAa and GABAb (inhibitory). The NMDA synapse is additionally voltage-gated.

The README quickstart creates a single neuron and trains its leakage and gain currents with the Adam optimizer so that it reaches a target output firing rate.

### Getting started
ARCANA is installed from GitHub with `pip install git+https://github.com/ferqui/ARCANA.git`. Documentation is available at [dynapsetorch.readthedocs.io](https://dynapsetorch.readthedocs.io/).

### Reference
F. M. Quintana, Maryada, P. L. Galindo, E. Donati, G. Indiveri and F. Perez-Peña, "A Realistic Simulation Framework for Analog/Digital Neuromorphic Architectures", *Neuromorphic Computing and Engineering* 5, 034006 (2025), [doi:10.1088/2634-4386/adef77](https://doi.org/10.1088/2634-4386/adef77).

### License
The source code is licensed under GPL-3.0, and the documentation under CC BY-SA 4.0.
