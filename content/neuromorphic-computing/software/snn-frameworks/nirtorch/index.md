---
title: "NIRTorch"
type: neuromorphic-software
description: "A PyTorch extension for the Neuromorphic Intermediate Representation (NIR), enabling seamless conversion of PyTorch-based SNN models to and from NIR."
logo: "nir-logo.png"
website: "https://github.com/neuromorphs/NIRTorch"
dependencies: "PyTorch, NIR"
field_of_application: "Interoperability / SNN Framework"
source_code: "https://github.com/neuromorphs/NIRTorch"
pypi_id: "nirtorch"
license: "MIT"
supports_hardware: true
supports_NIR: true
language: "Python"
maintainer:
  - "Steven Abreu"
  - "Jens E. Pedersen"
  - "Felix Bauer"
draft: false
---

## Overview

NIRTorch is a powerful extension for PyTorch that bridges the gap between PyTorch-based Spiking Neural Network (SNN) frameworks and the Neuromorphic Intermediate Representation (NIR). Its primary purpose is to provide a simple and robust way to convert `torch.nn.Module` objects into NIR graphs, and vice-versa.

By leveraging `torch.fx` for symbolic tracing, NIRTorch can inspect a PyTorch model's computational graph and map its components to the corresponding NIR primitives. This allows developers to design and train SNNs within their favorite PyTorch-based environment (like snnTorch or Norse) and then export them to a standardized format that can be deployed across various neuromorphic hardware platforms and simulators that support NIR.

Key features include:
- A simple `to_nir()` function to convert a `torch.nn.Module` to a NIR graph.
- A `from_nir()` function to load a NIR graph back into a runnable PyTorch model.
- A framework-agnostic design that allows any PyTorch-based SNN library to integrate with NIR by providing a simple mapping of its modules.
