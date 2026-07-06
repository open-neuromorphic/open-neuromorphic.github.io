---
title: "Legendre-SNN on Loihi-2"
author:
- "Ramashish Gaurav"
date: 2024-12-20
description: "Learn how the hybrid Legendre-SNN architecture leverages Loihi-2 Lakemont cores and Lava to outperform LSTM networks on time-series classification tasks."
upcoming: false
video: GE2GefISrME
image: poster.png
type: "student-talks"
content_source: "talk-summary"
hardware_tags:
  - "loihi-2"
software_tags:
  - "lava"
summary_points:
  - "The Legendre-SNN (LSNN) successfully integrates a continuous-valued, non-spiking Legendre Delay Network (LDN) with standard spiking hidden and output layers."
  - "Loihi-2’s x86 Lakemont (LMT) microprocessors can be programmed via Lava to execute INT32-quantized non-spiking operations directly on-chip."
  - "Deploying the LDN alongside discrete spiking components demonstrates a complete hybrid pipeline evaluated purely on neuromorphic hardware, bypassing traditional CPU-to-chip bottlenecks."
  - "Across 15 univariate time-series datasets, the on-chip LSNN architecture routinely matches and occasionally outperforms standard deep learning benchmarks like LSTM-FCNs."
---
In his recent work [1], Ram designed the Legendre-SNN (LSNN), a simple - yet high performing SNN model (for univariate TSC) where he has used the Legendre Delay Network (LDN) [2] as a non-spiking reservoir (in fact, the LDN in LSNN is implemented with just basic matrix-operations). In a subsequent work (currently under review), he extended his LSNN to DeepLSNN that accounts for multivariate time-series signals too; upon experimenting with it, he found that DeepLSNN models outperform a popular (and complex) LSTM-Conv integrated model [3] on more than 30% of 101 TSC datasets. His latest work is on the evaluation of Legendre-SNN on the Loihi-2 chip [4] — on which this talk is focused at.

Legendre-SNN is composed of a non-spiking LDN followed by one spiking hidden layer and an output layer. The Loihi-2 chip has got two On-chip computational resources: low-power x86 Lakemont (LMT) microprocessors (total 6) and NeuroCores (total 128). The LMT cores support only INT32-bit operations and NeuroCores support deployment of spiking networks. With minimal documentation to program the LMT cores, the challenge was -- how to deploy the Legendre-SNN in its entirety (and evaluate it) on a Loihi-2 chip. In this talk, Ram will present the technical specifics of implementing the non-spiking LDN on an LMT core (the spiking network post the LDN is deployed on NeuroCores). His work: “Legendre-SNN on Loihi-2” [4] adds to the scarce technical-documentation to program LMT cores and presents a pipeline to deploy an SNN model composed of non-spiking & spiking components -- entirely on Loihi-2.

## Key Takeaways
- The Legendre-SNN (LSNN) successfully integrates a continuous-valued, non-spiking Legendre Delay Network (LDN) with standard spiking hidden and output layers.
- Loihi-2’s x86 Lakemont (LMT) microprocessors can be programmed via Lava to execute INT32-quantized non-spiking operations directly on-chip.
- Deploying the LDN alongside discrete spiking components demonstrates a complete hybrid pipeline evaluated purely on neuromorphic hardware, bypassing traditional CPU-to-chip bottlenecks.
- Across 15 univariate time-series datasets, the on-chip LSNN architecture routinely matches and occasionally outperforms standard deep learning benchmarks like LSTM-FCNs.

## About the Research
The study tackles the notoriously difficult problem of running mixed continuous-discrete systems on strict neuromorphic hardware. While the spiking components of an SNN map cleanly to Loihi-2's NeuroCores, the state transition matrices underpinning the Legendre Delay Network require continuous values.

The research establishes a strict quantization methodology to map the floating-point LDN mathematics to the 32-bit integer limits of Loihi-2's Lakemont (LMT) cores. By programming custom C-based Process Models in the Lava framework, the continuous temporal features can be extracted on the LMT cores, rate-encoded into spikes, and fed instantly to the NeuroCores. Extensive validation metrics—including Victor-Purpura and Inter-Spike Interval distances—prove that the quantized on-chip representation remains nearly perfectly synchronized with ideal CPU-based floating-point models.

> "When we talk about SNNs not outperforming ANNs or deep learning networks, slowly and gradually we are catching up. It was incredibly encouraging to see the LSNN on the Loihi-2 chip outright outperform the LSTM-FCN baseline on several datasets."

## What This Means for Neuromorphic Computing
This implementation breaks the assumption that neuromorphic chips must exclusively run discrete, spike-only algorithms to be useful. By leveraging on-chip x86 companion cores for the non-spiking reservoir state, the work proves that hybrid AI models can be entirely un-tethered from a host CPU during inference. Furthermore, this provides the neuromorphic community with a rare, documented, and technically rigorous roadmap for utilizing Intel’s Lava library to build custom `C-Loihi` process models for arbitrary non-spiking mathematical operations.

## Resources
- [1] Gaurav, R. et al., "Reservoir based spiking models for univariate Time Series Classification." *Frontiers in Computational Neuroscience* 17 (2023).
- [2] Voelker, A.R., and Eliasmith, C. "Improving spiking dynamical networks: Accurate delays, higher-order synapses, and time cells." *Neural Computation* 30.3 (2018).
- [3] Karim, F. et al., "LSTM fully convolutional networks for time series classification." *IEEE Access* 6 (2017).
- [4] Gaurav, R. et al., "Legendre-SNN on Loihi-2: Evaluation and Insights." *NeurIPS 2024 MLNCP Workshop*.
