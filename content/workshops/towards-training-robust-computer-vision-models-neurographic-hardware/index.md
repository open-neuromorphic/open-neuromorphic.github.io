---
title: Towards Training Robust Computer Vision Models for Neuromorphic Hardware
author:
  - Gregor Lenz
  - Fabrizio Ottati
date: 2023-03-10
video: TPChp-O6qXM
image: thumbnail.png
type: "workshops"
software_tags: ["tonic"]
experience_tags: ["practitioner", "researcher", "intermediate"]
expertise_tags: ["computer-vision", "snn", "digital-hardware", "machine-learning"]
field_of_application_tags: ["consumer-electronics"]
summary_points:
  - "Training spiking neural networks (SNNs) in synchronous GPU simulations creates significant deployment discrepancies on asynchronous digital hardware."
  - "SynSense's Speck chip relies on purely event-driven, non-leaky integrate-and-fire neurons to maintain ultra-low power consumption."
  - "The Exodus algorithm vastly accelerates backpropagation through time (BPTT) for SNNs, overcoming major GPU training bottlenecks."
  - "Detailed monitoring of intermediate layer firing rates is essential to prevent individual neurons from monopolizing activity and failing on-chip."
description: "Learn how to overcome the discrepancies between synchronous GPU training and asynchronous deployment when building SNNs for SynSense's Speck chip."
---

Training spiking neural networks (SNNs) on conventional, synchronous GPUs introduces severe deployment discrepancies when those models are run on asynchronous digital neuromorphic hardware. Reconciling this hardware-software gap requires specialized training algorithms and rigorous monitoring of intermediate network activity to ensure models remain robust and power-efficient once deployed to event-driven Edge chips.

## Key Takeaways
- Training spiking neural networks (SNNs) in synchronous GPU simulations creates significant deployment discrepancies on asynchronous digital hardware.
- SynSense's Speck chip relies on purely event-driven, non-leaky integrate-and-fire neurons to maintain ultra-low power consumption.
- The Exodus algorithm vastly accelerates backpropagation through time (BPTT) for SNNs, overcoming major GPU training bottlenecks.
- Detailed monitoring of intermediate layer firing rates is essential to prevent individual neurons from monopolizing activity and failing on-chip.

## Workshop Format & Takeaways
The workshop explored the full pipeline of building Edge-ready vision models for SynSense’s Speck chip, beginning with data handling. The extreme temporal resolution of event cameras generates massive data bandwidth; a robust pipeline relies on tools like Tonic and specialized formats to efficiently cache and load event frames, preventing GPU starvation during training.

A primary focus was the simulation-to-hardware discrepancy. GPU training discretizes time, calculating convolutions in synchronous, batched operations. Conversely, neuromorphic chips process events sequentially and asynchronously. A transient cluster of events easily processed in a single GPU timestep can overwhelm physical hardware, leading to missed spikes and inaccurate real-world predictions.

To counteract this, the speaker detailed optimization strategies like reducing weight-to-threshold ratios and leveraging the Exodus algorithm to rapidly iterate via Backpropagation Through Time (BPTT). Furthermore, plotting individual neuron firing rates—rather than relying solely on layer-wide averages—ensures that activity remains adequately distributed, preventing "hot" neurons from causing hardware bottlenecks.

## What This Means for Edge AI
Achieving true ultra-low power inference in consumer electronics requires more than just porting standard CNNs to new silicon. The performance gains of neuromorphic processors rely heavily on temporal sparsity; developers must adopt a holistic, hardware-aware approach to data representation and training to actually realize these massive power savings in real-world deployment.
