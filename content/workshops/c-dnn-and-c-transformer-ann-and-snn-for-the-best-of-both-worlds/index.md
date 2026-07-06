---
title: "C-DNN and C-Transformer: mixing ANNs and SNNs for the best of both worlds"
author:
  - "Sangyeob Kim"
  - Fabrizio Ottati
date: 2024-05-04
description: "The C-Transformer architecture dynamically routes language model workloads between ANN and SNN cores based on spike sparsity, reducing LLM energy by up to 72%."
upcoming: false
video: lEl9DPgBqvA
image: c-dnnandc-transformer.png
type: workshops
experience_tags: ["researcher", "advanced"]
expertise_tags: ["digital-hardware", "machine-learning", "snn", "algorithms-learning"]
field_of_application_tags: ["consumer-electronics", "iot"]
content_source: "talk-summary"
summary_points:
  - "C-DNN architecture achieves hybrid processing, dynamically routing workloads to CNN or SNN cores based on spike sparsity."
  - "The hybrid approach increases energy efficiency by 51.3% compared to previous state-of-the-art inference processors."
  - "C-Transformer addresses LLMs, using homogeneous cores that dynamically switch between multiplication and accumulation modes."
  - "It achieves 32% lower energy for models with twice the parameters, and 72.2% lower energy for equivalently sized models."
---

Sangyeob Kim from KAIST outlines the development of the C-DNN processor and its successor, the C-Transformer, demonstrating how mixing Artificial Neural Networks (ANNs) and Spiking Neural Networks (SNNs) drastically improves energy efficiency. The C-DNN architecture relies on a dynamic workload allocator that assigns data with high spike sparsity to SNN cores and denser data to CNN cores. Extending this technique to large language models, the C-Transformer architecture addresses the massive computational overhead of LLMs, drastically reducing energy consumption and making on-device deployment highly viable.

## Key Takeaways
- C-DNN architecture achieves hybrid processing, dynamically routing workloads to CNN or SNN cores based on spike sparsity.
- The hybrid approach increases energy efficiency by 51.3% compared to previous state-of-the-art inference processors.
- C-Transformer addresses LLMs, using homogeneous cores that dynamically switch between multiplication and accumulation modes.
- It achieves 32% lower energy for models with twice the parameters, and 72.2% lower energy for equivalently sized models.

## Workshop Format & Takeaways

The session breaks down the hardware architecture behind mixing CNN and SNN paradigms. It was noted during the presentation that the energy consumption of SNNs fluctuates heavily across network layers depending on spike sparsity, whereas CNNs exhibit relatively consistent power variations. By exploiting this complementary relationship, the C-DNN processor routes tiles of a feature map containing significant object features (dense data) to CNN cores, while background or outlier-free tiles (sparse data) go to low-power SNN cores.

To further optimize this, the team introduced an attention module that performs channel-wise pooling to decrease standard deviation, forcing more data toward sparsity without sacrificing accuracy. Furthermore, a distributed axon cache was implemented to eliminate the 70% power consumption overhead traditionally caused by redundant global SRAM accesses during SNN weight fetching.

Moving beyond static image classification, the workshop detailed the architectural leap to the C-Transformer, designed specifically for on-device LLMs. Because the ratio of spiking attention to standard dense attention fluctuates dramatically from layer to layer, a purely heterogeneous chip would suffer severe utilization drops. To solve this, C-Transformer utilizes reconfigurable homogeneous cores that can seamlessly switch between deep neural network multiplication modes and spiking accumulation modes.

As discussed in the session, this was paired with a novel "output spike speculation" mechanism: by sampling a fraction of the time steps and using rate coding features, the hardware predicts the output spike pattern and actively skips integrating and firing for up to 75% of the remaining time steps, cutting computational energy.

## What This Means for Neuromorphic Computing

Bridging the gap between ANNs and SNNs on a single piece of silicon is a critical step for the future of edge AI. A persistent challenge in neuromorphic engineering has been the performance drop or utilization penalty when deploying purely spiking architectures on dense data distributions. By structurally supporting both domains and intelligently scheduling workloads to the most efficient core, the C-DNN and C-Transformer models demonstrate a pragmatic, high-performance path forward.
