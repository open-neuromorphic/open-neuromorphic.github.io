---
title: "Slax"
type: "neuromorphic-software"
category: "snn-framework"
description: "JAX library built on Flax that provides learning rules and gradient approximations for training spiking neural networks, with NIR import and export."
logo: ""
website: ""
dependencies: "JAX, Flax, Optax, NIR"
field_of_application: "Machine Learning"
source_code: "https://github.com/Intelligent-Microsystems-Lab/slax"
pypi_id: "slax"
license: "Apache-2.0"
supports_hardware:
supports_NIR: true
language: "Python"
maintainer: "Thomas Summe"
draft: true
url: /neuromorphic-computing/software/snn-frameworks/slax/
---

## Overview

Slax is a JAX library built on top of Flax for training spiking neural networks. It provides learning rules and gradient approximations, some of which also apply to recurrent networks in general. The project is developed in the Intelligent Microsystems Lab GitHub organization.

At the time of writing, the README states that Slax "is now being rewritten with the NNX API" and that "functionality and documentation is limited and unreliable until the conversion is finished."

### Key features
- Online and offline training utilities, with modules for learning rules including OTTT, OTPE, RTRL, diagonal RTRL, and FPTT.
- A leaky integrate-and-fire (LIF) neuron model and surrogate gradient functions.
- Conversion to and from the Neuromorphic Intermediate Representation (NIR) via `to_nir` and `from_nir`, covering affine, linear, and LIF nodes in the current source.

### Getting started
An alpha release (0.0.1, based on the Flax linen API) is available on PyPI: `pip install slax`. The NNX-based version in the repository has not been released on PyPI.

### Reference
T. M. Summe and S. Joshi, "Slax: a composable JAX library for rapid and flexible prototyping of spiking neural networks", *Neuromorphic Computing and Engineering* (2025), [doi:10.1088/2634-4386/ada9a8](https://doi.org/10.1088/2634-4386/ada9a8).
