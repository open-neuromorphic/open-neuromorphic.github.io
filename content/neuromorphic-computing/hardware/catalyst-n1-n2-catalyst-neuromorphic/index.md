---
active_product: true
title: "Catalyst N1 & N2 - Catalyst Neuromorphic"
description: "Explore Catalyst N1 and N2 by Catalyst Neuromorphic, open-architecture FPGA neuromorphic processors with full Loihi 1/2 feature parity, 128 cores, 131K neurons, on-chip learning, and programmable neuron microcode."
type: neuromorphic-hardware
image: catalyst-neuromorphic.png
organization:
  group_name: null
  org_logo: catalyst-neuromorphic.png
  org_name: Catalyst Neuromorphic
  org_website: https://catalyst-neuromorphic.com
  product_page_link: https://github.com/catalyst-neuromorphic/catalyst-neurocore
  social_media_links:
    linkedin: null
    twitter: null
    wikipedia: null
product:
  announced_date: "2026-02-01"
  applications: Research, Edge AI, SNN Benchmarking, Neuromorphic Algorithm Development
  chip_type: Digital
  neurons: "131,072 (128 cores x 1024 neurons)"
  synapses: "134 million max (CSR sparse + convolutional)"
  weight_bits: "1-8 bit configurable"
  activation_bits: "24-bit neuron state"
  on_chip_learning: true
  power: null
  release_year: 2026
  release_date: "2026-02-01"
  software: NeuroCore SDK
  status:
    announced: true
    released: true
    retired: false
product_name: Catalyst N1 & N2
summary: Catalyst N1 and N2 are open-architecture FPGA neuromorphic processors achieving full feature parity with Intel's Loihi 1 and Loihi 2, respectively. Deployed on Xilinx VU47P FPGAs, they feature 128 neurosynaptic cores, 131K neurons, CSR sparse synapses, STDP and three-factor learning rules, and (N2 only) programmable neuron microcode supporting five neuron models. Published benchmarks include 90.7% on SHD, 99.2% on N-MNIST, and 88.0% on Google Speech Commands.
---

## Overview

Catalyst N1 and N2 are digital neuromorphic processors designed and implemented by Henry Shulayev Barnes at Catalyst Neuromorphic Ltd. Rather than targeting ASIC fabrication, both processors are deployed as FPGA-based accelerators on the Xilinx Virtex UltraScale+ VU47P, targeting AWS F2 FPGA instances for cloud-accessible neuromorphic computing.

The Catalyst N1 achieves full feature parity with Intel's Loihi 1 processor, implementing 128 neurosynaptic cores with CUBA LIF neurons, compressed sparse row (CSR) synapses, spike-timing-dependent plasticity (STDP), three-factor learning rules, and programmable axonal delays. The Catalyst N2 extends this with full Loihi 2 feature parity, adding a programmable neuron microcode engine, graded spikes, convolutional synapse support, and five built-in neuron models.

Both processors are accessible through the NeuroCore SDK (Python) and via a cloud API, enabling researchers to run spiking neural network workloads without dedicated neuromorphic hardware.

## Architecture

### Core Architecture (N1 and N2)

Each Catalyst processor contains 128 fully digital neurosynaptic cores connected by a hierarchical mesh network-on-chip (NoC). Each core implements:

- **1,024 neurons** with configurable parameters (threshold, decay, refractory period, bias)
- **1,024 synapse rows** using compressed sparse row (CSR) encoding for memory-efficient sparse connectivity
- **Configurable weight precision** from 1-bit to 8-bit per synapse group
- **Programmable axonal delays** (1-63 timesteps) via delay queues
- **Dendritic compartment trees** for hierarchical signal integration

The NoC supports spike routing across all 128 cores using a hierarchical addressing scheme with configurable multicast fan-out.

### On-Chip Learning

Both N1 and N2 implement hardware-accelerated on-chip learning:

- **STDP** (spike-timing-dependent plasticity) with configurable time constants
- **Three-factor learning rules** incorporating a reward/modulatory signal
- **Per-synapse-group plasticity configuration** allowing mixed learning and inference within the same network
- **Pre- and post-synaptic trace registers** updated in hardware each timestep

### N2 Extensions

The Catalyst N2 adds several features achieving Loihi 2 parity:

- **Programmable neuron microcode engine**: user-defined neuron dynamics via a microcode instruction set, enabling arbitrary spiking behaviors beyond fixed LIF
- **Five built-in neuron models**: CUBA LIF, Izhikevich, Adaptive LIF (adLIF), Sigma-Delta, and Resonate-and-Fire
- **Graded spikes**: neurons can emit multi-bit payloads (up to 24-bit), not just binary spikes
- **Convolutional synapse encoding**: shared-weight convolution kernels for efficient spatial feature extraction
- **Variable-precision weights**: per-group weight bit-width selection (1, 2, 4, or 8 bits)
- **Homeostatic threshold adaptation**: activity-dependent threshold modulation for network stability

### FPGA Implementation

- **Target device**: Xilinx Virtex UltraScale+ VU47P (AWS F2 FPGA instances)
- **Clock frequency**: 83.3 MHz
- **Interface**: AXI4 for host communication, custom DMA for spike I/O
- **Verification**: N1 passes 96/96 tests; N2 passes 3,091 tests with 28/28 FPGA integration tests

## Software and Tools

Both processors are programmed through the **NeuroCore SDK**, a Python library that provides:

- High-level network construction API (neurons, synapses, probes, learning rules)
- Compilation to hardware-native configuration
- CPU, GPU, and FPGA execution backends
- Real-time monitoring and spike raster visualization

Additionally, a **cloud API** at [api.catalyst-neuromorphic.com](https://api.catalyst-neuromorphic.com) enables remote access to FPGA-deployed Catalyst processors without local hardware, with a Python client library available on PyPI (`catalyst-cloud`).

## Benchmarks

Published benchmark results on standard neuromorphic datasets:

| Benchmark | Dataset | Accuracy | Notes |
|-----------|---------|----------|-------|
| Spiking Heidelberg Digits (SHD) | Spoken digits | 90.7% | Temporal classification |
| Spiking Speech Commands (SSC) | Speech commands | 72.1% | Large-scale temporal |
| Neuromorphic MNIST (N-MNIST) | Event-based digits | 99.2% | Spatial classification |
| Google Speech Commands (KWS) | Keyword spotting | 88.0% | Real-time audio |

## Related Publications

| Date | Title | Authors | Venue/Source |
|------|-------|---------|--------------|
| February 2026 | [Catalyst N1: A 128-Core Neuromorphic Processor with Full Loihi Feature Parity](https://doi.org/10.5281/zenodo.18727094) | Henry Shulayev Barnes | Zenodo |
| February 2026 | [Catalyst N2: Programmable Neuron Microcode and Loihi 2 Feature Parity in an Open Neuromorphic Architecture](https://doi.org/10.5281/zenodo.18728256) | Henry Shulayev Barnes | Zenodo |

## Availability

Catalyst N1 and N2 are available through two channels:

1. **Cloud API**: Researchers can access FPGA-deployed processors via the cloud API at [api.catalyst-neuromorphic.com](https://api.catalyst-neuromorphic.com) with free and paid tiers.
2. **FPGA Bitstreams**: Available for deployment on AWS F2 instances (Xilinx VU47P). Contact Catalyst Neuromorphic for licensing.

The NeuroCore SDK is available as compiled binaries. Source code for the RTL and SDK is proprietary (BSL 1.1 licensed). The Python cloud client is open source and available on [PyPI](https://pypi.org/project/catalyst-cloud/) and [GitHub](https://github.com/catalyst-neuromorphic/catalyst-cloud-python).
