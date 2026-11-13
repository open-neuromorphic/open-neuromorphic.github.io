---
title: SNN-MLIR
type: neuromorphic-software
description: >-
  MLIR dialect for spiking neural networks, with a Python package that converts
  NIR graphs to dialect IR and C sources for a reference CPU runtime.
logo: snn-mlir.png
website: 'https://snn-mlir.readthedocs.io/en/latest/'
dependencies: 'NIR, NumPy, LLVM/MLIR'
field_of_application: Neuromorphic Computing
source_code: 'https://github.com/INTERA-GROUP/snn-mlir'
pypi_id: snn-mlir
license: Apache-2.0
supports_hardware: false
supports_NIR: true
language: 'Python, C++'
maintainer:
  - Alejandro García Gener
  - Álvaro Rollón de Pinedo
draft: false
category: compiler
url: /neuromorphic-computing/software/compilers/snn-mlir/
---

## Overview

SNN-MLIR is an out-of-tree [MLIR](https://mlir.llvm.org/) dialect for spiking neural networks that is compatible with the NIR standard. Its operations work with both float (`f32`) and quantized (`i8`/`i32`) types. A reference CPU lowering (`SNNToLinalg`) converts SNN operations into standard `linalg`/`arith` operations that MLIR-based backends can consume.

A companion Python package, `snn-mlir`, reads NIR files and emits SNN dialect MLIR text together with the C sources of a reference CPU runtime. The project is developed at INTERA-Group in Barcelona, Spain, and is described in an [arXiv paper](https://arxiv.org/abs/2606.09213).

### Features
- Dense and convolutional synapse operations (`snn.linear`, `snn.conv1d`, `snn.conv2d`), pooling operations (`snn.sumpool2d`, `snn.avgpool2d`), a requantization operation (`snn.rescale`), spiking neuron operations (`snn.lif`, `snn.cubalif`) and leaky integrator operations (`snn.li`, `snn.cubali`).
- Support for the NIR `Linear`, `Affine`, `Conv1d`, `Conv2d`, `SumPool2d`, `AvgPool2d`, `Flatten`, `LIF`, `IF`, `LI`, `I`, `CubaLIF` and `CubaLI` nodes, in both float and quantized modes. As of v1.0.0, `Delay`, `Scale` and `Threshold` are not yet mapped.
- A `snn-mlir` command with four verbs: `check` (reports whether a NIR model is supported, without converting it), `export` (NIR to SNN dialect MLIR), `codegen` (MLIR plus C sources) and `run` (compile and execute).
- Float32 by default; a quantized mode uses int8 weights and Q12 fixed-point state.
- A lowering pipeline that chains `snn-opt`, `mlir-opt` and `mlir-translate` to LLVM IR, which `llc` and a C compiler turn into a standalone binary.

### Getting started
`pip install snn-mlir` provides the `export` and `codegen` commands; `run` additionally requires the `snn-opt` toolchain, which is built from source against LLVM/MLIR 22.1 or later. Documentation is on [Read the Docs](https://snn-mlir.readthedocs.io/en/latest/).

### Deployment targets
The generated code is dependency-free C. The paper evaluates it on an x86 host and, bare-metal, on an X-HEEP 32-bit RISC-V microcontroller core prototyped on an FPGA. The quantized int8 build produced identical results on both targets. The only lowering shipped with the project is the CPU reference (`SNNToLinalg`); the documentation presents other targets, such as FPGA or ASIC accelerators, as extension points for new lowering passes. The paper describes backends for neuromorphic hardware (for example Loihi 2 or SpiNNaker) as future work.

### Limitations
As of v1.0.0, the documentation states that the graph walker accepts linear chains of nodes, optionally with the standard SNN self-recurrence (a neuron and a recurrent synapse that feeds back onto it). Branching and residual connections are not yet supported. Each call to the compiled function processes one input sample (no batching), and all neurons in a layer share the same parameters.

### License
SNN-MLIR is released under the Apache License 2.0 with LLVM Exceptions.
