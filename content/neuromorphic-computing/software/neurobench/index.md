---
title: NeuroBench
type: neuromorphic-software
description: >-
  Python harness for running the NeuroBench algorithm benchmarks, with
  workload and static metrics for evaluating PyTorch and snnTorch models.
logo: neurobench.png
website: 'https://neurobench.ai'
dependencies: 'PyTorch, snnTorch'
field_of_application: Machine Learning
source_code: 'https://github.com/NeuroBench/neurobench'
pypi_id: neurobench
license: Apache-2.0
supports_hardware: false
supports_NIR: true
language: Python
maintainer:
  - Jason Yik
  - Noah Pacik-Nelson
  - Korneel Van den Berghe
  - Benedetto Leto
draft: false
category: benchmark
url: /neuromorphic-computing/software/benchmarks/neurobench/
---

## Overview

NeuroBench is a harness for running evaluations on the NeuroBench algorithm benchmarks. The README describes it as a community-driven project and a collaboration between industry and academic engineers and researchers. The framework is described in an article in *Nature Communications* (2025, [doi:10.1038/s41467-025-56739-4](https://doi.org/10.1038/s41467-025-56739-4)).

The NeuroBench framework has two tracks: an algorithm track for hardware-independent evaluation, and a system track for fully deployed solutions. This package is the harness for the algorithm track. The article also defines system-track benchmarks (acoustic scene classification and QUBO optimization) and reports baselines on neuromorphic systems such as SynSense Xylo and Intel Loihi 2; those are not run through this package.

### Features
- Benchmarks with workload metrics and static metrics (`neurobench.benchmarks`).
- Benchmark datasets (`neurobench.datasets`).
- Model wrappers for Torch and snnTorch models (`neurobench.models`).
- Pre-processing, including conversion to spikes, and post-processors that combine spiking outputs (`neurobench.preprocessing`, `neurobench.postprocessing`).
- Export of a wrapped model to NIR through `Benchmark.to_nir()`, which uses snnTorch's NIR exporter.

### Metrics
Results pair task correctness with measures of model cost:

- **Static metrics** describe the model itself: parameter count, memory footprint (in bytes, from the model's parameters and buffers), and connection sparsity.
- **Workload metrics** are measured during inference. Correctness metrics cover task performance (classification accuracy, mean squared error, sMAPE, R² and COCO mAP, depending on the task). Cost metrics cover activation sparsity (overall and per layer), synaptic operations, membrane updates and neuron operations. Synaptic operations are reported as dense operations (the cost on hardware that does not exploit sparsity) and as effective multiply-accumulates and accumulates, which count only non-zero activations and connections (the cost on sparsity-aware hardware).

Custom static and workload metrics can be added through the framework's base classes.

### Benchmarks
As of 2026-11-13 (version 2.4.0), the README lists four v1.0 benchmarks with leaderboards: keyword few-shot class-incremental learning, event camera object detection, non-human primate motor prediction, and chaotic function prediction. It lists three additional benchmarks: DVS gesture recognition, Google Speech Commands classification, and neuromorphic human activity recognition.

### Getting started
NeuroBench is installed with `pip install neurobench`. A typical workflow trains a network, wraps it in a `NeuroBenchModel`, and passes it to `Benchmark` with an evaluation dataloader, pre- and post-processors, and a list of metrics. Example scripts are in the repository's `examples` folder, and the [documentation](https://neurobench.readthedocs.io/en/latest/) covers the API.

### License
NeuroBench is released under the Apache License 2.0.
