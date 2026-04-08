---
active_product: true
description: "Open-source FPGA neuromorphic processors by Catalyst Neuromorphic"
type: neuromorphic-hardware
image: catalyst-neuromorphic.png
organization:
  group_name: null
  org_logo: catalyst-neuromorphic.png
  org_name: Catalyst Neuromorphic
  org_website: https://catalyst-neuromorphic.com
  product_page_link: https://github.com/catalyst-neuromorphic
  social_media_links:
    linkedin: null
    twitter: null
    wikipedia: null
product:
  announced_date: "2026-02-01"
  applications: SNN research, edge inference, neuromorphic algorithm development
  chip_type: Digital
  neurons: "131,072 (N1/N2), 196,608 (N3)"
  synapses: "131,072 per core (CSR sparse)"
  weight_bits: "1-8 bit (N1), 1-16 bit (N2/N3)"
  activation_bits: null
  on_chip_learning: true
  power: null
  release_year: 2026
  release_date: "2026-02-01"
  software: NeuroCore SDK (Python)
  status:
    announced: true
    released: true
    retired: false
product_name: Catalyst N1, N2 & N3
summary: Catalyst N1, N2 and N3 are open-source FPGA neuromorphic processors implemented in Verilog and released under Apache 2.0. N1 implements 128 cores with CUBA LIF neurons, CSR synapses, STDP and three-factor learning. N2 adds a programmable neuron microcode engine with five built-in models and 1-16 bit weight precision. N3 adds TDM virtualization, an asynchronous NoC, 8 neuron models and per-tile learning. All three are validated on Zynq UltraScale+ FPGAs via Vivado 2025.2.
title: Catalyst N1, N2 & N3 - Catalyst Neuromorphic
---

## Overview

Catalyst N1, N2 and N3 are digital neuromorphic processors designed by Henry Shulayev Barnes at Catalyst Neuromorphic Ltd. All three are FPGA implementations (not ASICs) with full Verilog source available under Apache 2.0.

N1 implements 128 neurosynaptic cores with CUBA LIF neurons, compressed sparse row synapses, STDP, three-factor learning, dendritic compartment trees, and programmable axonal delays. N2 extends this with a programmable neuron microcode engine (LIF, Izhikevich, ALIF, Sigma-Delta, Resonate-and-Fire), graded spikes, and 1-16 bit variable-precision weights. N3 adds TDM virtualization, an asynchronous NoC, 8 neuron models, and per-tile learning engines.

Primary target is Zynq UltraScale+ (validated on ZU5EV via Vivado 2025.2, also tested on VU47P via AWS F2). Clock frequency 62.5 MHz. Programmed through the NeuroCore SDK (Python) with CPU, GPU, and FPGA backends.

## Benchmarks

| Benchmark | Accuracy |
|-----------|----------|
| Spiking Heidelberg Digits (SHD) | 91.0% |
| Spiking Speech Commands (SSC) | 76.4% |
| Neuromorphic MNIST (N-MNIST) | 99.2% |
| Google Speech Commands (KWS) | 86.4% |

## Related publications

| Date | Title | Authors | Venue/Source |
|------|-------|---------|-------------|
| February 2026 | [Catalyst N1: A 128-Core Neuromorphic Processor](https://doi.org/10.5281/zenodo.18727094) | Henry Shulayev Barnes | Zenodo (preprint) |
| February 2026 | [Catalyst N2: Programmable Neuron Microcode](https://doi.org/10.5281/zenodo.18728256) | Henry Shulayev Barnes | Zenodo (preprint) |

## Availability

All RTL source code is open source under Apache 2.0:
- [catalyst-n1](https://github.com/catalyst-neuromorphic/catalyst-n1)
- [catalyst-n2](https://github.com/catalyst-neuromorphic/catalyst-n2)
- [catalyst-n3](https://github.com/catalyst-neuromorphic/catalyst-n3)

Deployable on off-the-shelf Zynq UltraScale+ boards (AMD Kria KV260, KR260, ZCU104, ALINX AXU5EV-E/AXU9EG/AXU15EG).
