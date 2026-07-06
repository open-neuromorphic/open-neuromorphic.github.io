---
title: "Low-power Spiking Neural Network Processing Systems for Extreme-Edge Applications"
author:
  - "Federico Corradi"
  - Gregor Lenz
  - Fabrizio Ottati
date: 2023-06-08
description: "The Microbrain architecture combines asynchronous processing and Forward Propagation Through Time (FPTT) to train 6.2-million-neuron SNNs."
video: xiYUVzdwDIA
image: low-power-snn-processing.png
type: workshops
experience_tags:
  - researcher
  - industry
  - advanced
expertise_tags:
  - digital-hardware
  - analog-hardware
  - medicine
  - machine-learning
field_of_application_tags:
  - medicine
  - iot
content_source: "talk-summary"
summary_points:
  - "The Microbrain chip utilizes a highly efficient, fully asynchronous architecture combining digital synthesis with custom analog delay cells."
  - "In biomedical trials (ECG feature extraction), the architecture operated at under 50 microwatts while maintaining sub-millisecond precision."
  - "To overcome the memory explosions of training asynchronous SNNs, the team utilized Forward Propagation Through Time (FPTT)."
  - "FPTT optimizes an instantaneous risk function, allowing researchers to successfully train a deep SNN backbone of 6.2 million neurons for object detection."
---

Delivering real-time, ultra-low-power artificial intelligence to the extreme edge remains one of the most pressing challenges in computing. While traditional Deep Neural Network (DNN) accelerators focus on minimizing memory access through novel architectures, true edge autonomy—such as insertable biomedical devices or always-on radar gesture recognition—demands micro-watt power budgets. Approaching this challenge through brain-inspired, event-driven Spiking Neural Networks (SNNs) requires rethinking both the silicon architecture and the algorithmic methods used to train them.

## Key Takeaways
- **The Microbrain Architecture:** A synthesizable mixed-signal approach that marries the high fidelity and rapid iteration cycle of digital design flows with the extreme efficiency of asynchronous event-driven computation.
- **Clockless, Self-Timed Neurons:** By utilizing a unique multi-phase oscillator and an analog thyristor delay cell, neurons in the Microbrain space out incoming spikes to allow sufficient processing time without requiring a global power-hungry clock.
- **Extreme-Edge Biomedical Monitoring:** Paired with an asynchronous analog-to-spike converter, a 100-neuron Microbrain network achieved highly accurate, real-time temporal feature extraction on ECG data (PQRST wave detection) using under 50 microwatts of power.
- **Forward Propagation Through Time (FPTT):** Because traditional Backpropagation Through Time (BPTT) requires unrolling the network and caching states over thousands of micro-timesteps, memory requirements rapidly explode. FPTT optimizes an instantaneous risk function instead, dramatically reducing memory overhead.

## Workshop Format & Takeaways
The workshop detailed the hardware-software codesign necessary for building extreme-edge intelligence. It began with an architectural deep dive into the Microbrain chip, explaining the specific transistor-level design of its analog delay cells. The session then showcased real-world benchmarks, comparing the system's sub-millisecond latency against state-of-the-art synchronous DSPs in radar and ECG tasks. Finally, the presentation shifted to algorithmic scaling, demonstrating how the adoption of FPTT allowed the team to train a massive 6.2-million-neuron, 40-million-parameter SNN for complex RGB object detection.

## What This Means for Neuromorphic Computing
This research proves that the gap between theoretical biological efficiency and practical silicon deployment can be bridged using hybrid approaches. Fully analog systems suffer from noise and high design times, while purely digital systems pay an enormous power penalty for von Neumann bottlenecks and rigid clock trees. By retaining a digital flow but replacing the global clock with localized, self-timed asynchronous event processing, systems can achieve the ultra-low-power requirements of implantable devices.

Furthermore, the successful application of Forward Propagation Through Time signals a crucial maturation for the field. The inability to train deep SNNs due to the memory constraints of unrolled timesteps has long been a barrier; overcoming this allows event-driven architectures to finally scale up to complex, multi-megapixel vision tasks that were previously the exclusive domain of traditional CNNs.

## Resources
- **Video Recording:** [xiYUVzdwDIA](https://www.youtube.com/watch?v=xiYUVzdwDIA)
