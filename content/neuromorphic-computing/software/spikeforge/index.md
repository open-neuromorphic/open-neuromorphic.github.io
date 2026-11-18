---
title: spikeforge
type: neuromorphic-software
description: >-
  Python toolkit built on snnTorch and PyTorch for training spiking neural
  networks, with NIR export and drift validation, deployment reporting, and a
  dashboard.
logo: spikeforge.png
website: 'https://spikeforge.net/'
dependencies: 'PyTorch, snnTorch'
field_of_application: Machine Learning
source_code: 'https://github.com/Capsize-Games/spikeforge'
pypi_id: spikeforge
license: BSD-3-Clause
supports_hardware: false
supports_NIR: true
language: Python
maintainer: Capsize LLC
draft: false
category: snn-framework
url: /neuromorphic-computing/software/snn-frameworks/spikeforge/
---

## Overview

spikeforge is a toolkit for building, training, and deploying spiking neural networks, built on snnTorch and PyTorch. The README states that it does not replace snnTorch, Norse, or Lava: it trains through snnTorch and adds interoperability, deployment reporting, energy estimates, and a dashboard on top.

The README describes the project as pre-1.0 and lists the maturity of each capability separately.

### Features
- Rate, latency, delta, and random spike encoders.
- Fully-connected and convolutional LIF networks trained with surrogate gradients, with checkpointing.
- NIR export, plus an independent NIR interpreter that re-executes exported graphs and reports numerical drift against the original model.
- A deployment capability matrix that reports per-target operation support, with weight quantization and a drift check that can simulate a target's fixed-point rounding.
- An event-driven energy estimator, labelled by the project as an estimate rather than a hardware measurement.
- A model hub with six trained reference checkpoints produced by the project, with their published accuracy.
- ONNX export and import of the per-step network.
- A browser dashboard for training and introspection, also available as a desktop app.

### Deployment targets and hardware
As of 2026-11-14, every target runs in software; the project reports no results from a physical neuromorphic device.

- `reference` is the built-in interpreter and is always available.
- `norse` runs on the Norse PyTorch simulator (`spikeforge-targets[norse]`).
- `lava_loihi2` runs through Intel's Lava SDK (`spikeforge-targets[lava]`). By default it uses Lava's Loihi 2 CPU emulator. A hardware run configuration can be selected explicitly, but the documentation states that no physical device is attached and no device results are reported.
- `speck`, `xylo` and `spinnaker2` run on the vendors' software simulators (Sinabs, Rockpool and the SpiNNaker2 SDK) when those packages are installed separately. The project's website lists these targets as in progress.

The project documents its boundaries: energy and latency figures are modelled from published coefficients rather than measured, quantization is simulated rather than device-exact, and ONNX export covers a single time step rather than full temporal dynamics.

### Getting started
spikeforge is installed with `pip install spikeforge`. The repository publishes seven separately versioned distributions, including `spikeforge-targets` for deployment targets and `spikeforge-hub` for the model hub. Documentation is in the repository's [`documentation/`](https://github.com/Capsize-Games/spikeforge/blob/main/documentation/README.md) folder, and the project's [implications and boundaries](https://github.com/Capsize-Games/spikeforge/wiki/implications-and-boundaries) page explains its limits.

### License
spikeforge is released under the BSD 3-Clause License.
