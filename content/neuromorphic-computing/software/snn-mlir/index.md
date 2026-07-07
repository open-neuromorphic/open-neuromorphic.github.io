--- 
title: "SNN-MLIR - Open-source MLIR dialect for Spiking Neural Networks"
date: 2024-01-01 # Placeholder date, as no date was provided in the issue
description: "Discover snn-mlir, an open-source MLIR dialect for Spiking Neural Networks, designed to compile NIR models to dependency-free binaries for any CPU or MCU."
logo: "snn-mlir-logo.png" # Placeholder for potential logo
website: "https://snn-mlir.readthedocs.io/en/latest/"
dependencies: "nir"
field_of_application: "Compilers, Embedded systems"
source_code: "https://github.com/INTERA-GROUP/snn-mlir"
pypi_id: ""
license: "Apache License 2.0 WITH LLVM-exception"
supports_hardware: true
supports_NIR: true
language: "Python, C++"
maintainer: "Alejandro G. Gener - Intera-group"
draft: false
type: "neuromorphic-software"
category: "snn-framework" 
---

## Overview
Training an SNN today is well-supported. Deploying it on real hardware is not. snn-mlir bridges that gap: it takes any trained SNN exported to the [NIR standard](https://neuroir.org/) and compiles it into a self-contained, dependency-free binary that runs on any C-capable target.

The compiler is built as an out-of-tree MLIR dialect. A single type-polymorphic IR covers both float and quantized (i8/i32) deployments, and the reference CPU lowering produces plain C with no runtime dependencies. Quantization is automatic and optional and the pipeline handles scale alignment across layers. Any NIR-compatible framework feeds directly into it: snnTorch, LAVA-DL, Norse, Nengo, Sinabs, and more.

It serves two audiences. Neuromorphic researchers who want to move a trained model to hardware without carrying a Python simulation stack. And compiler or hardware engineers building custom accelerators who need a standard IR to target instead of defining their own. The SNN dialect gives them that, and writing a new backend is a matter of one MLIR lowering pass.