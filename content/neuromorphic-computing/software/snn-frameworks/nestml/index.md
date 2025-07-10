---
title: "NESTML"
type: neuromorphic-software
description:  A domain-specific language and code generation toolchain for neuron and synapse models in spiking neural network simulation
logo: nestml.png
website: https://nestml.readthedocs.org/
dependencies: Python, Jinja2, Lark, SymPy
field_of_application: Neuroscience
source_code: https://github.com/nest/nestml
pypi_id: nestml
license: GPL-2.0
supports_hardware: True
supports_NIR: False
language: Python
maintainer: Charl Linssen
draft: false
software_tags: ["nest", 'genn']
hardware_tags: ["spinnaker-2-university-of-dresden"]
---


## Overview
NESTML is a domain-specific language for neuron and synapse models. These dynamical models can be used in simulations of brain activity on several platforms, in particular the [NEST Simulator](https://nest-simulator.readthedocs.org/). NESTML combines an easy to understand, yet powerful syntax; a flexible processing toolchain, written in Python; and good simulation performance by means of code generation (C++ for NEST Simulator).
