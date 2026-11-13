---
title: NeuroCUDA
type: neuromorphic-software
description: >-
  Python compiler that converts trained PyTorch ANNs into spiking neural
  networks, with NIR export, GPU/CPU backends and a Loihi 2 simulator.
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
draft: false
category: compiler
url: /neuromorphic-computing/software/compilers/neurocuda/
---

## Overview

NeuroCUDA takes a trained PyTorch model (an ANN with ReLU activations) and converts it into a spiking neural network. Conversion has two stages: QCFS calibration, which learns per-channel thresholds, and BPTT fine-tuning with surrogate gradients. The README describes the project as integrating existing published methods (QCFS, NIR, NeuroBench) into a single pipeline.

### Features
- A Python API with `convert`, `finetune`, `measure_sparsity`, `verify`, `to_nir`, `compile` and `list_backends`.
- Export of converted networks to NIR.
- GPU and CPU backends (PyTorch) and a Loihi 2 backend that is a software simulator of Loihi 2's published neuron equations and 8-bit weight quantization, not a run on Loihi 2 hardware.
- An FPGA path that generates HLS C++, which the README describes as a proof of concept that has not yet been synthesized to a bitstream.
- Supported activation types listed in the README: ReLU, SiLU and GELU.

### Neuromorphic hardware status
As of 2026-11-13, the repository includes experimental SpiNNaker-1 and BrainScaleS-2 backends that generate PyNN scripts for the EBRAINS platforms. The project reports runs on both systems:

- **SpiNNaker-1:** two runs on Manchester boards (2026-07-13 and 2026-07-17). According to the project's job summary, they used a small hand-written PyNN test network (two spike sources driving two LIF neurons). The README describes full network deployment as the next step.
- **BrainScaleS-2:** a run on a Heidelberg chip (2026-06-28) that placed a network's connection topology. The backend notes that individual trained weight values cannot be set through PyNN, and that classification accuracy is limited.

No run of a network converted by NeuroCUDA on neuromorphic hardware has been independently verified. The project's technical report (June 2026) evaluates GPU, CPU and the Loihi 2 simulator only.

### Getting started
NeuroCUDA is installed with `pip install neurocuda`; `pip install neurocuda[all]` adds NIR export, NeuroBench reporting and the reinforcement-learning demos. It requires Python 3.10 or later and PyTorch 2.0 or later. As of 2026-11-13, the latest PyPI release is 0.2.0 (2026-06-21); the SpiNNaker and BrainScaleS-2 backend modules were added to the repository after that release.

### Reference
K. S. Varma, "NeuroCUDA: An Integrated PyTorch-to-Spiking-Network Conversion Pipeline with Verified Residual-Graph NIR Execution", self-published technical report, QuantaraCore, June 2026, [PDF](https://quantaracore.in/neurocuda/paper.pdf).

### License
NeuroCUDA is released under the MIT License.
