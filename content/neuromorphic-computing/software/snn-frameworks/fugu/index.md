---
title: "Fugu"
type: "neuromorphic-software"
description: "Python library for building platform-agnostic spiking neural networks using composable computational graphs with support for simulators and neuromorphic hardware."
website: "https://sandialabs.github.io/Fugu/"
dependencies: "NumPy, NetworkX, Pandas"
field_of_application: "Machine Learning, Graph Analysis, Scientific Computing"
source_code: "https://github.com/sandialabs/Fugu"
license: "BSD-3-Clause"
supports_hardware: true
supports_NIR: false
language: "Python"
maintainer: "Sandia National Laboratories"
draft: false
---

## Overview

**Fugu** is a Python framework for developing spiking circuits as computation graphs, developed by Sandia National Laboratories. Built on leaky-integrate-and-fire neurons and NetworkX graphs, Fugu allows neural circuits to be described using features common across neuromorphic architectures rather than platform-specific implementations.

The framework uses a compositional approach where small computational kernels called Bricks combine into larger computational graphs called Scaffolds. This hierarchical design supports pre and post processing operations and helps identify parameter spaces where neural approaches offer computational advantages for tasks like sorting, optimization, and graph analytics.

Fugu functions as a managed intermediate representation between Python and neuromorphic hardware compilers. Networks compile to multiple backends including a reference simulator for small networks, [Intel Loihi](https://open-neuromorphic.org/neuromorphic-computing/hardware/loihi-intel/) for neuromorphic hardware deployment, and an optional STACS backend using Charm++ for large-scale HPC simulations.

The framework targets three user types: developers building applications by combining existing Bricks, extenders creating new spiking algorithms as Bricks, and platform developers implementing new backends. Fugu includes Jupyter notebook examples demonstrating algorithm translations and supports applications in machine learning, graph analytics, and scientific computing.