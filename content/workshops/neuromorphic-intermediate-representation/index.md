---
title: "NIR: A unified instruction set for brain-inspired computing"
author:
  - Jens E. Pedersen
  - Bernhard Vogginger
  - Jason Eshraghian
  - Felix Bauer
date: 2024-02-05
video: A96rInDg8zo
speaker_code: "https://github.com/neuromorphs/nir"
image: neuromorphic-intermediate-representation.png
description: "See how the Neuromorphic Intermediate Representation (NIR) enables seamless SNN model deployment across Norse, SynSense Speck, and SpiNNaker2 hardware."
software_tags: ["norse", "snntorch", "spyx", "neuromorphic-intermediate-representation", "nirtorch", "synapse"]
hardware_tags: ["speck-synsense", "spinnaker-2-university-of-dresden", "loihi-intel", "xylo-synsense"]
type: "workshops"
experience_tags: ["practitioner", "researcher", "intermediate"]
expertise_tags: ["software", "digital-hardware", "analog-hardware", "snn"]
field_of_application_tags: ["education", "iot"]
content_source: "talk-summary"
summary_points:
  - "NIR acts as a unified bridge, allowing spiking models trained in PyTorch-based libraries to deploy across diverse hardware backends."
  - "Neuromorphic systems rely on continuous-time dynamical graphs, which NIR captures without forcing discrete time-step approximations."
  - "Live demonstrations prove that a single model exported from Norse can run efficiently on both the Speck chip and SpiNNaker2."
---

This workshop introduces the Neuromorphic Intermediate Representation (NIR), a crucial open-source standard designed to decouple neuromorphic algorithm development from specific hardware constraints. The session demonstrates how researchers can use NIR to port dynamic, spiking neural network models effortlessly between disparate software frameworks and neuromorphic edge hardware.

## Key Takeaways
- **NIR acts as a unified bridge, allowing spiking models trained in PyTorch-based libraries to deploy across diverse hardware backends.**
- **Neuromorphic systems rely on continuous-time dynamical graphs, which NIR captures without forcing discrete time-step approximations.**
- **Live demonstrations prove that a single model exported from Norse can run efficiently on both the Speck chip and SpiNNaker2.**

## Workshop Format & Takeaways
The session combined theoretical background on the "hardware lottery" with practical, live-code demonstrations. Presenters walked through training a basic convolutional spiking neural network on Neuromorphic MNIST using Norse, exporting that exact model into the NIR graph format, and deploying it live to two entirely different hardware architectures: the digital asynchronous SynSense Speck chip (using the Synabs library) and the SpiNNaker2 many-core system (using PySpiNNaker2).

## What This Means for the Field
The deep learning boom was largely fueled by interoperable frameworks (like ONNX) that allowed developers to train a model in PyTorch and deploy it on almost any accelerator. Neuromorphic computing has historically lacked this, forcing researchers to rewrite models from scratch for every new chip. NIR solves this fundamental ecosystem bottleneck. By providing a unified "instruction set" based on continuous-time dynamical systems, NIR allows the community to share models, benchmark fairly, and finally decouple software innovation from hardware availability.

> "It turns out that good research ideas win because they are compatible with what exists in terms of software and hardware. It's not because the idea is any better than any other idea."

> "We wrote thousands of lines of code so you only have to write one... You take a model, export it to NIR, and if I want to import something in a hardware-facing library, I just go 'model from near'."
