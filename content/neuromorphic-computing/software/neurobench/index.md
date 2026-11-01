---
title: NeuroBench
type: neuromorphic-software
description: >-
  Python harness for running the NeuroBench algorithm benchmarks, with
  workload and static metrics for evaluating PyTorch and snnTorch models.
logo: null
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

### Features
- Benchmarks with workload metrics and static metrics (`neurobench.benchmarks`).
- Benchmark datasets (`neurobench.datasets`).
- Model wrappers for Torch and snnTorch models (`neurobench.models`).
- Pre-processing, including conversion to spikes, and post-processors that combine spiking outputs (`neurobench.preprocessing`, `neurobench.postprocessing`).
- Export of a wrapped model to NIR through `Benchmark.to_nir()`, which uses snnTorch's NIR exporter.

### Benchmarks
As of 2026-11-01, the README lists four v1.0 benchmarks with leaderboards: keyword few-shot class-incremental learning, event camera object detection, non-human primate motor prediction, and chaotic function prediction. It lists three additional benchmarks: DVS gesture recognition, Google Speech Commands classification, and neuromorphic human activity recognition.

### Getting started
NeuroBench is installed with `pip install neurobench`. A typical workflow trains a network, wraps it in a `NeuroBenchModel`, and passes it to `Benchmark` with an evaluation dataloader, pre- and post-processors, and a list of metrics. Example scripts are in the repository's `examples` folder, and the [documentation](https://neurobench.readthedocs.io/en/latest/) covers the API.

### License
NeuroBench is released under the Apache License 2.0.
