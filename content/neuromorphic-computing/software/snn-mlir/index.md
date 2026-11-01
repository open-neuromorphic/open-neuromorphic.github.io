---
title: SNN-MLIR
type: neuromorphic-software
description: >-
  MLIR dialect for spiking neural networks, with a Python package that converts
  NIR graphs to dialect IR and C sources for a reference CPU runtime.
logo: null
website: 'https://snn-mlir.readthedocs.io/en/latest/'
dependencies: 'NIR, NumPy, LLVM/MLIR'
field_of_application: Neuromorphic Computing
source_code: 'https://github.com/INTERA-GROUP/snn-mlir'
pypi_id: snn-mlir
license: Apache-2.0
supports_hardware: false
supports_NIR: true
language: 'Python, C++'
maintainer: null
draft: false
category: compiler
url: /neuromorphic-computing/software/compilers/snn-mlir/
---

## Overview

SNN-MLIR is an out-of-tree [MLIR](https://mlir.llvm.org/) dialect for spiking neural networks that is compatible with the NIR standard. Its operations work with both float (`f32`) and quantized (`i8`/`i32`) types. A reference CPU lowering (`SNNToLinalg`) converts SNN operations into standard `linalg`/`arith` operations that MLIR-based backends can consume.

A companion Python package, `snn-mlir`, reads NIR files and emits SNN dialect MLIR text together with the C sources of a reference CPU runtime. The project is described in an [arXiv paper](https://arxiv.org/abs/2606.09213).

### Features
- Synapse operations (`snn.linear`, `snn.rescale`), spiking neuron operations (`snn.lif`, `snn.cubalif`) and leaky integrator operations (`snn.li`, `snn.cubali`).
- A `snn-mlir` command with four verbs: `check` (reports whether a NIR model is supported, without converting it), `export` (NIR to SNN dialect MLIR), `codegen` (MLIR plus C sources) and `run` (compile and execute).
- Float32 by default; a quantized mode uses int8 weights and Q12 fixed-point state.
- A lowering pipeline that chains `snn-opt`, `mlir-opt` and `mlir-translate` to LLVM IR, which `llc` and a C compiler turn into a standalone binary.

### Getting started
`pip install snn-mlir` provides the `export` and `codegen` commands; `run` additionally requires the `snn-opt` toolchain, which is built from source against LLVM/MLIR 22.1 or later. As of 2026-11-01, the README states that the Python graph walker supports only linear-chain graphs, without branching, residual or recurrent connections. Documentation is on [Read the Docs](https://snn-mlir.readthedocs.io/en/latest/).

### License
SNN-MLIR is released under the Apache License 2.0 with LLVM Exceptions.
