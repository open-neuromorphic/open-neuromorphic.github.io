---
title: "Neuromorphic Intermediate Representation (NIR)"
type: "neuromorphic-software"
description: "A graph-based intermediate representation for computational graphs of spiking neural networks, enabling interoperability across different simulators and hardware."
logo: "nir-logo.png"
website: "https://neuromorphs.github.io/nir/"
dependencies: "Numpy"
field_of_application: "Interoperability / SNN Model Exchange"
source_code: "https://github.com/neuromorphs/NIR"
pypi_id: "nir"
license: "MIT"
supports_hardware: True
supports_NIR: True
language: "Python"
maintainer:
  - "Jens E. Pedersen"
  - "Felix Bauer"
  - "Jason Eshraghian"
  - "Bernhard Vogginger"
draft: false
---

## Overview

The Neuromorphic Intermediate Representation (NIR) is a graph-based format designed to represent Spiking Neural Network (SNN) models in a standardized way. Its primary goal is to enable interoperability between a wide variety of neuromorphic simulators and hardware platforms.

By defining a common set of computational primitives (like Leaky-Integrate-and-Fire neurons and synapses), NIR allows researchers and developers to define a model once and then translate it to run on different backends without having to rewrite the model from scratch for each platform. This decouples the model definition from the hardware- or software-specific implementation details.

NIR is designed to be extensible and currently supports a range of popular SNN frameworks and hardware, including:
-   **Simulators:** Spyx, snnTorch, Norse, Lava
-   **Hardware:** Intel Loihi 2, SpiNNaker 2, Speck

The project aims to simplify the workflow for neuromorphic development, making it easier to benchmark, deploy, and share SNN models across the community.
