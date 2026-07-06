---
title: "Legendre-SNN on Loihi-2"
author:
  - "Ramashish Gaurav"
date: 2024-12-20
description: "See how deploying a Legendre Delay Network on Loihi-2’s Lakemont cores with quantized 32-bit operations outperforms LSTMs in time-series classification."
upcoming: false
video: GE2GefISrME
image: poster.png
type: "student-talks"
experience_tags:
  - researcher
  - advanced
expertise_tags:
  - snn
  - digital-hardware
  - software
content_source: "talk-summary"
summary_points:
  - "The Legendre-SNN uses a non-spiking Legendre Delay Network (LDN) reservoir to extract temporal features prior to rate encoding."
  - "Evaluating the hybrid network on Loihi-2 required splitting tasks between non-spiking Lakemont (LMT) cores and standard NeuroCores."
  - "Lakemont cores only support 32-bit integer operations, requiring precise continuous-value scaling and quantization of the LDN matrices."
  - "State vectors extracted by the LDN must be duplicated into a two-neuron encoding system to capture both positive and negative scalar signs."
  - "On physical Loihi-2 hardware, the energy-efficient Legendre-SNN outperformed established LSTM-FCN deep learning models on multiple time-series datasets."
---

SNN architectures frequently incorporate non-spiking components to preprocess or hold state, but deploying these hybrid models natively to neuromorphic hardware presents distinct engineering challenges. In this session, Ramashish Gaurav details how to deploy a Legendre-SNN (LSNN) entirely on Intel’s Loihi-2 chip. By utilizing the chip's x86 Lakemont (LMT) microprocessors to run a non-spiking Legendre Delay Network (LDN) reservoir, and passing the rate-encoded results into spiking hidden layers running on the NeuroCores, the system proves capable of highly efficient time-series classification.

## Key Takeaways
- **Hybrid processing requires specific core mapping:** To deploy the network efficiently, the non-spiking LDN reservoir is mapped directly to Loihi-2's six low-power Lakemont x86 cores using custom C-based Lava processes.
- **Handling integer constraints via quantization:** Because Lakemont cores only execute 32-bit integer operations, the continuous floating-point variables of the LDN (and the input data) must be scaled and strictly quantized before processing.
- **Encoding positive and negative signals:** Because the continuous state vector can output positive and negative scalars, each scalar is duplicated into a two-neuron system—ensuring both polarities are properly rate-encoded into binary spikes.
- **Bypassing explicit adapters:** By leveraging Lava's `receive_vec_dense` and `send_vec_dense` APIs within the customized C process models, the Lakemont cores can send binary spikes directly to the NeuroCores without requiring additional intermediary adapter processes.
- **Competitive accuracy:** On physical Loihi-2 hardware, the LSNN achieved higher classification accuracy than a complex LSTM-FCN deep learning model across multiple univariate time-series datasets.

## About the Research
This implementation builds on Gaurav’s paper, *“Legendre-SNN on Loihi-2: Evaluation and Insights”* (NeurIPS 2024), which demonstrates how to effectively deploy non-trainable LDN reservoirs connected to trainable spiking components.

The LDN essentially computes a high-fidelity continuous-time delay of the input signal using state transition equations. Because these state matrices are static, only the hidden and output spiking layers are trained off-chip using Lava's SLAYER algorithm. As noted in the session, comparing the continuous-valued LDN implemented on a standard CPU against the quantized version running on the Lakemont cores showed near-perfect spike synchrony, proving the viability of the integer scaling approach.

## What This Means for Neuromorphic Computing
A significant barrier to utilizing cutting-edge neuromorphic hardware is the lack of technical documentation for custom edge cases—such as running arbitrary continuous logic alongside spiking workloads. This work serves as a practical blueprint for developers looking to utilize the auxiliary x86 microprocessor units present on neuromorphic chips like Loihi-2.

By successfully deploying both the stateful continuous components and the discrete spiking components on a single specialized device, this approach demonstrates that neuromorphic hardware can support complex, hybrid pipeline constraints while still preserving massive energy efficiency gains over standard GPU inference.
