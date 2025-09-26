---
title: "PyNN.brainscales2"
type: neuromorphic-software
description: Spiking neural networks with complex plasticity on BrainScaleS-2 neuromorphic hardware.
website: https://electronicvisions.github.io/documentation-brainscales2/latest/
dependencies: PyNN, BrainScaleS-2 OS
field_of_application: Neuromorphic Hardware, Computational Neuroscience, Spiking Neural Networks, Local Plasticity
source_code: https://github.com/electronicvisions/pynn-brainscales
version_badge_url_override: "https://img.shields.io/github/v/tag/electronicvisions/releases-ebrains"
license: LGPL-2.0-or-later
supports_hardware: True
supports_NIR: False
language: Python
draft: false
maintainer: Electronic Visions Group
---



## Overview

**PyNN.brainscales2** is an implementation of the backend-agnostic PyNN API for [BrainScaleS-2](https://open-neuromorphic.org/neuromorphic-computing/hardware/brainscales-2-universitat-heidelberg/).
It supports arbitrary topologies, and complex plasticity rules.

Custom cell types are available allowing fine-grained access to the configuration of the available neuron circuits on hardware.

Additionally, cell types parameterized through model parameters use automated calibration to find suitable hardware configurations for desired behavior.

Due to the real-time nature of the emulation, experiment protocol definition and execution are separated, while dynamic reconfiguration of hardware entities during the experiment runtime is offered.

Usage of the embedded processors for implementing plasticity rules is integrated such that users can define plasticity rules acting on PyNN network entities and having access to the to be executed code for the processors.

Observables recorded from the hardware are made available using the standard data formats used in PyNN after execution on the hardware.
