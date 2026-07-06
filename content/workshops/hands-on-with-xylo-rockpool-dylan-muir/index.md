---
title: "Hands-on with Xylo and Rockpool"
author:
  - "Dylan Muir"
  - Jason Eshraghian
date: 2023-04-26
description: "The SynSense Xylo hardware and Rockpool toolchain enable the efficient training and direct deployment of spiking neural networks for audio classification."
video: WsAqVuQ3B-I
image: hands-on-xylo-rockpool.png
speaker_slides: https://github.com/synsense/OpenNeuromorphic_26042023/raw/main/slides.pdf
speaker_code: https://github.com/synsense/OpenNeuromorphic_26042023
type: workshops
software_tags: ["rockpool", "tonic"]
hardware_tags: ["xylo-synsense", "speck-synsense"]
experience_tags: ["practitioner", "intermediate"]
expertise_tags: ["snn", "machine-learning", "digital-hardware", "software"]
field_of_application_tags: ["consumer-electronics", "iot"]
summary_points:
  - Rockpool provides a high-level, PyTorch- and JAX-compatible API for training and deploying SNNs.
  - Xylo is a synchronous digital neuromorphic chip optimized for 1D signal processing, operating on under a milliwatt of power.
  - Tonic is utilized to streamline the loading and spatial down-sampling of neuromorphic event datasets.
  - The session demonstrates the full workflow, from floating-point training to 8-bit quantization and real-time hardware inference.
---

Neuromorphic hardware promises extreme energy efficiency, but utilizing that hardware effectively requires an accessible, high-level software bridge. This session introduces the Rockpool Python toolchain and demonstrates how it simplifies the process of training and mapping Spiking Neural Networks (SNNs) to SynSense's Xylo architecture. Unlike vision-focused chips, Xylo is specifically tailored for natural, one-dimensional temporal signals like audio and bio-signals, processing inference in real-time on mere microwatts of power.

## Key Takeaways
- **Rockpool provides a high-level, PyTorch- and JAX-compatible API for training and deploying SNNs.**
- **Xylo is a synchronous digital neuromorphic chip optimized for 1D signal processing, operating on under a milliwatt of power.**
- **Tonic is utilized to streamline the loading and spatial down-sampling of neuromorphic event datasets.**
- **The session demonstrates the full workflow, from floating-point training to 8-bit quantization and real-time hardware inference.**

## Workshop Format & Takeaways
The session proceeds as a practical, code-first tutorial covering the complete edge-AI development pipeline. The workflow starts entirely in software, demonstrating how to instantiate basic Leaky Integrate-and-Fire (LIF) neurons using Rockpool's PyTorch backend.

To introduce a realistic temporal task, the Spiking Heidelberg Digits (SHD) dataset is ingested and spatially down-sampled to fit the hardware's 16-channel input constraint, using Tonic's caching and transformation libraries to prevent local CPU bottlenecks. The network itself is constructed with residual connections, showcasing that complex deep learning topologies can be mapped directly onto silicon.

A critical phase of the workshop details hardware-aware training and deployment. Because Xylo is an integer-logic device utilizing 8-bit synaptic weights and 16-bit states, floating-point weights trained in PyTorch must be quantized. As noted during the session, quantization-aware training generally yields higher accuracy for complex tasks, but for specific 8-bit architectures tackling simpler benchmarks, post-training quantization often results in minimal accuracy degradation. Following quantization, the computational graph is extracted, converted into a bitstream, and pushed to a physical Xylo dev kit. Live telemetry during the demonstration confirmed an active power draw of just 250 microwatts while successfully inferencing audio.

## What This Means for Neuromorphic Computing
Moving AI to the edge relies on keeping the continuous power budget well under 10 milliwatts. This workshop proves that deploying SNNs to micro-watt physical hardware no longer requires bespoke, low-level hardware description languages. By marrying industry-standard PyTorch APIs with automated hardware mappers and bitstream compilers, toolchains like Rockpool significantly lower the barrier to entry. This allows developers to focus entirely on task performance and network architecture, trusting the framework to manage the complexities of digital neuron mapping, weight quantization, and temporal routing on actual silicon.

## Resources
- **Speaker Slides:** [https://github.com/synsense/OpenNeuromorphic_26042023/raw/main/slides.pdf](https://github.com/synsense/OpenNeuromorphic_26042023/raw/main/slides.pdf)
- **Speaker Code:** [https://github.com/synsense/OpenNeuromorphic_26042023](https://github.com/synsense/OpenNeuromorphic_26042023)
