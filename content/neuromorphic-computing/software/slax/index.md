---
title: Slax
type: neuromorphic-software
description: >-
  JAX and Flax library of learning rules and gradient approximations for
  training spiking neural networks. NIR import and export exist in the
  repository source.
logo: null
website: 'https://github.com/Intelligent-Microsystems-Lab/slax'
dependencies: 'JAX, Flax'
field_of_application: Machine Learning
source_code: 'https://github.com/Intelligent-Microsystems-Lab/slax'
pypi_id: slax
license: Apache-2.0
supports_hardware: false
supports_NIR: true
language: Python
maintainer: Thomas Summe
draft: false
category: snn-framework
url: /neuromorphic-computing/software/snn-frameworks/slax/
---

## Overview

Slax is a JAX library built on top of Flax. It provides learning rules and gradient approximations with a focus on training spiking neural networks; the README notes that some of these algorithms also apply to any recurrent network.

As of 2026-10-31, the README states that Slax "is now being rewritten with the NNX API" and that "Functionality and documentation is limited and unreliable until the conversion is finished."

### In the repository source
- Learning-rule modules named `OTTT`, `OTPE`, `rtrl`, `diag_rtrl` and `FPTT`.
- Training wrappers named `train_online` and `train_offline`.
- A leaky integrate-and-fire (`LIF`) neuron and surrogate derivative functions (fast sigmoid, arctangent, multi-Gaussian).
- `to_nir` and `from_nir` functions for converting models to and from NIR. Import handles NIR affine, linear and LIF nodes. It has not been confirmed whether the PyPI release includes these functions.

### Getting started
The README describes the PyPI package as "an alpha-state release with linen" (`pip install slax`). PyPI lists only version 0.0.1, uploaded on 2024-03-20.

### Reference
T. M. Summe and S. Joshi, "Slax: a composable JAX library for rapid and flexible prototyping of spiking neural networks", *Neuromorphic Computing and Engineering* 5, 014007 (2025), [doi:10.1088/2634-4386/ada9a8](https://doi.org/10.1088/2634-4386/ada9a8).
