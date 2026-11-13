---
title: ARCANA
type: neuromorphic-software
description: >-
  PyTorch simulator of the DPI neuron and synapse circuits of the DYNAP-SE
  chip, including device mismatch, for training networks to deploy on it.
logo: null
website: 'https://dynapsetorch.readthedocs.io/'
dependencies: PyTorch
field_of_application: 'Machine Learning, Neuromorphic Hardware'
source_code: 'https://github.com/ferqui/ARCANA'
license: GPL-3.0
supports_hardware: true
supports_NIR: false
language: Python
maintainer: Fernando M. Quintana
draft: false
category: simulator
url: /neuromorphic-computing/software/simulators/arcana/
---

## Overview

ARCANA (A Realistic Simulation Framework for Analog/Digital Neuromorphic Architectures) is a library built on PyTorch that provides a simulation model of the DYNAP-SE hardware. It reproduces the dynamics of the chip's mixed-signal neuron and synapse circuits, including device mismatch, and supports gradient-based parameter optimization and GPU acceleration.

The README gives the equations of the DPI neuron implemented in DYNAP-SE, including an adaptation current responsible for spike-frequency adaptation and a positive-feedback current. ARCANA also simulates the synapse types that DYNAP-SE implements: AMPA and NMDA (excitatory) and GABAa and GABAb (inhibitory). The NMDA synapse is additionally voltage-gated.

The README quickstart creates a single neuron and trains its leakage and gain currents with the Adam optimizer so that it reaches a target output firing rate.

### Deployment on neuromorphic hardware
ARCANA is designed so that networks trained in simulation can be deployed on the DYNAP-SE chip. The accompanying paper describes the workflow and its validation:

- **Matching the chip:** the paper maps each ARCANA parameter to the corresponding DYNAP-SE bias. A one-time calibration per chip aligns the simulated currents with oscilloscope measurements of the silicon neurons.
- **Device mismatch:** variability can be added to each neuron and synapse bias, so models can be tested and trained for robustness to the chip's analog mismatch.
- **Hardware constraints:** for deployment, learned weights are quantized to integer numbers of synapses using quantization-aware training. The connection fan-in is limited to the chip's 64 input synapses per neuron.
- **Results on the chip:** a single-layer network trained in ARCANA to separate MNIST digits 0 and 1 was deployed on DYNAP-SE. Running on the chip, it reached 99.11% accuracy on 2,115 test samples. A second network, trained in simulation with the ETLP three-factor learning rule, was also deployed on the chip for inference.

The paper states that ARCANA can be adapted to other processors that use DPI-based neuron circuits by adjusting the chip constants and the positive-feedback parameters. As of 2026-11-13, the repository does not include code for configuring or programming the chip itself.

### Getting started
ARCANA is installed from GitHub with `pip install git+https://github.com/ferqui/ARCANA.git`. Documentation is available at [dynapsetorch.readthedocs.io](https://dynapsetorch.readthedocs.io/).

### Reference
F. M. Quintana, Maryada, P. L. Galindo, E. Donati, G. Indiveri and F. Perez-Peña, "A Realistic Simulation Framework for Analog/Digital Neuromorphic Architectures", *Neuromorphic Computing and Engineering* 5, 034006 (2025), [doi:10.1088/2634-4386/adef77](https://doi.org/10.1088/2634-4386/adef77).

### License
The source code is licensed under GPL-3.0, and the documentation under CC BY-SA 4.0.
