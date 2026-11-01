---
title: spikeforge
type: neuromorphic-software
description: >-
  Python toolkit built on snnTorch and PyTorch for training spiking neural
  networks, with NIR export and drift validation, deployment reporting, and a
  dashboard.
logo: null
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
- A deployment capability matrix that reports per-target operation support. The `reference` target is always available; `norse` and `lava_loihi2` require an SDK extra; `spinnaker2`, `speck` and `xylo` are spec-only, with no installable SDK integration yet.
- An event-driven energy estimator, labelled by the project as an estimate rather than a hardware measurement.
- A browser dashboard for training and introspection, also available as a desktop app.

### Getting started
spikeforge is installed with `pip install spikeforge`. The repository publishes seven separately versioned distributions, including `spikeforge-targets` for deployment targets and `spikeforge-hub` for the model hub. Documentation is in the repository's [`documentation/`](https://github.com/Capsize-Games/spikeforge/blob/main/documentation/README.md) folder.

### License
spikeforge is released under the BSD 3-Clause License.
