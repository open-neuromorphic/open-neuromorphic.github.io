---
title: CARLsim
type: neuromorphic-software
description: GPU-accelerated library for simulating large-scale spiking neural network (SNN) models with high biologically realistic synaptic dynamics.
website: https://uci-carl.github.io/CARLsim3/
field_of_application: Machine Learning, Hardware Interface
source_code: https://github.com/UCI-CARL/CARLsim6
license: MIT
supports_hardware: True
language: C/C++/Python
maintainer: Jeff Krichmar
---



## Overview

CARLsim is an efficient, easy-to-use, GPU-accelerated library for simulating large-scale spiking neural network (SNN) models with a high degree of biological detail. CARLsim allows execution of networks of Izhikevich spiking neurons with realistic synaptic dynamics on both generic x86 CPUs and standard off-the-shelf GPUs. The simulator provides a PyNN-like programming interface in C/C++, which allows for details and parameters to be specified at the synapse, neuron, and network level.

Some features include:
- CUDA 11 support
- CMake build system
- Neuromodulatory features
- Integration of Python LEAP
- Axonal Plasticity learning rule (release 6.1)
- a more complete STDP implementation which includes neuromodulatory mechanisms 
- an automated parameter tuning interface that utilizes evolutionary algorithms to construct functional SNNs 
- a test suite for functional code verification 
