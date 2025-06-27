---
active_product: true
description: "Explore IBM's NorthPole, a neural inference architecture that eliminates off-chip memory by intertwining compute with memory on-chip for state-of-the-art energy efficiency."
type: neuromorphic-hardware
image: northpole.png
organization:
  group_name: "Brain-Inspired Computing Group"
  org_logo: ibm.jpg
  org_name: IBM
  org_website: https://www.ibm.com/
  product_page_link: https://research.ibm.com/blog/northpole-ibm-ai-chip
  social_media_links:
    linkedin: https://www.linkedin.com/company/ibm/
    wikipedia: https://en.wikipedia.org/wiki/IBM_NorthPole
product:
  announced_date: "2023-10-20"
  applications: "Neural inference, Image classification, Object detection"
  chip_type: "Digital"
  neurons: "256 cores"
  synapses: "224 MB on-chip SRAM"
  weight_bits: "8, 4, 2"
  activation_bits: "8, 4, 2"
  on_chip_learning: false
  power: "~74 W"
  release_year: 2023
  release_date: "2023-10-20"
  software: "Custom end-to-end toolchain"
  status:
    announced: true
    released: true
    retired: false
product_name: NorthPole
summary: "NorthPole is a neural inference architecture that blurs the boundary between compute and memory by eliminating off-chip memory and intertwining compute with memory on-chip. It is a low-precision, massively parallel, and energy-efficient spatial computing architecture."
title: NorthPole - IBM
---

## Overview
NorthPole is a revolutionary neural inference architecture developed by IBM that fundamentally reimagines the interaction between compute and memory. Inspired by the brain's efficiency, it eliminates the "memory wall" by removing off-chip memory entirely. Instead, it features a massively parallel, densely interconnected system where memory is intertwined with compute on a single chip.

This "spatial computing" design makes the entire chip function as an active memory, where data movement is minimized, leading to dramatic gains in energy efficiency, space utilization, and latency. NorthPole is specialized for neural network inference, supporting low-precision 8, 4, and 2-bit operations, which are sufficient for state-of-the-art accuracy in many AI tasks.

## Architecture
The NorthPole chip is fabricated in a 12-nm process and consists of an array of 256 cores. Each core contains its own memory and compute units, allowing for massive parallelism. Key architectural features include:

*   **Cores:** 256 digital, programmable cores. Each core can perform 2048 8-bit operations per cycle.
*   **On-Chip Memory:** A total of 224 MB of on-chip SRAM is distributed across the cores, with each core having access to its local memory bank.
*   **Network-on-Chip (NoC):** The architecture uses four distinct NoCs to manage data flow: one for feature map activations, one for inter-core communication, one for loading model weights, and one for instructions. This design is inspired by the white-matter and gray-matter pathways in the brain.
*   **Data Precision:** Natively supports 8-bit, 4-bit, and 2-bit integer precision for weights and activations, enabling significant efficiency gains.
*   **No Off-Chip Memory:** The entire model is stored on-chip, which means that once configured, NorthPole operates self-sufficiently without needing to access external DRAM, drastically reducing energy consumption.

## Software and Tools
IBM has developed a complete, co-designed software toolchain for NorthPole. This toolchain automates the process of mapping a pre-trained neural network onto the chip's architecture. It handles:
*   **Model Mapping:** Spatially mapping the layers of a neural network across the 256-core array.
*   **Orchestration:** Generating an explicit schedule for all computation, memory access, and communication to ensure high utilization and prevent resource collisions.
*   **Quantization-Aware Training:** The toolchain supports algorithms that incorporate low-precision constraints during the training phase, allowing models to maintain high accuracy when deployed on the hardware.

Externally, the chip operates as a simple active memory device with three main commands: write input, run network, and read output, making it easy to integrate into larger systems.

## Related Publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| October 2023 | [Neural inference at the frontier of energy, space, and time](https://www.science.org/doi/10.1126/science.adh1174) | Dharmendra S. Modha et al. | Science |
