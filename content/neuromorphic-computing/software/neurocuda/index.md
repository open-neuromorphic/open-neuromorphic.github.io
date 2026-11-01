---
title: NeuroCUDA
type: neuromorphic-software
description: >-
  Python compiler that converts trained PyTorch ANNs into spiking neural
  networks, with NIR export and backends for GPU, CPU and neuromorphic targets.
logo: null
website: 'https://quantaracore.in/neurocuda'
dependencies: PyTorch
field_of_application: Machine Learning
source_code: 'https://github.com/Krishnav1/neurocuda'
pypi_id: neurocuda
license: MIT
supports_hardware: false
supports_NIR: true
language: Python
maintainer: Krishna Varma
draft: true
category: compiler
url: /neuromorphic-computing/software/compilers/neurocuda/
---

## Overview

NeuroCUDA takes a trained PyTorch model (an ANN with ReLU activations) and converts it into a spiking neural network. Conversion has two stages: QCFS calibration, which learns per-channel thresholds, and BPTT fine-tuning with surrogate gradients. The README describes the project as integrating existing published methods (QCFS, NIR, NeuroBench) into a single pipeline.

### Features
- A Python API with `convert`, `finetune`, `measure_sparsity`, `verify`, `to_nir`, `compile` and `list_backends`.
- Export of converted networks to NIR.
- As of 2026-11-01, the README lists GPU and CPU backends (PyTorch), a Loihi 2 simulator, SpiNNaker-1 and BrainScaleS-2. It reports runs on SpiNNaker-1 and BrainScaleS-2 hardware; these were not independently verified. The README states that physical Loihi 2 hardware has not been run.
- An FPGA path that generates HLS C++, which the README describes as a proof of concept that has not yet been synthesized to a bitstream.
- Supported activation types listed in the README: ReLU, SiLU and GELU.

### Getting started
NeuroCUDA is installed with `pip install neurocuda`; `pip install neurocuda[all]` adds NIR export, NeuroBench reporting and the reinforcement-learning demos. It requires Python 3.10 or later and PyTorch 2.0 or later. As of 2026-11-01, the latest PyPI release is 0.2.0 (2026-06-21); the SpiNNaker and BrainScaleS-2 backend modules were added to the repository after that release.

### License
NeuroCUDA is released under the MIT License.
