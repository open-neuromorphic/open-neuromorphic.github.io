---
title: Hands-On with snnTorch
author:
  - Jason Eshraghian
  - Fabrizio Ottati
date: 2023-03-02
description: "snnTorch applies surrogate gradients to overcome the non-differentiability of spikes, enabling SNN training and quantization using standard PyTorch pipelines."
video: aUjWRpisRRg
image: hands-on-snntorch.png
speaker_notebook: https://github.com/open-neuromorphic/hands--session-snntorch-230302
type: workshops
software_tags: ["snntorch", "tonic"]
hardware_tags: []
experience_tags: ["practitioner", "intermediate"]
expertise_tags: ["snn", "machine-learning", "software"]
field_of_application_tags: ["education"]
summary_points:
  - snnTorch extends PyTorch to support spiking neural networks, utilizing surrogate gradients to bypass the non-differentiability of spikes.
  - LIF neurons can be configured natively alongside standard dense and convolutional PyTorch layers.
  - Advanced models, including spiking recurrent layers and LSTM variants, help capture complex temporal dependencies.
  - Weight and state quantization workflows are explored using Brevitas to prepare models for deployment on edge hardware.
---

Integrating neuromorphic computing into mainstream machine learning workflows requires tools that leverage existing deep learning ecosystems. In this workshop, snnTorch is utilized to bridge the gap between traditional PyTorch environments and the unique temporal dynamics of Spiking Neural Networks (SNNs). By introducing surrogate gradient descent, the framework enables the application of standard backpropagation to non-differentiable spiking units, making it straightforward to train networks that process highly sparse, time-varying data.

## Key Takeaways
- **snnTorch extends PyTorch to support spiking neural networks, utilizing surrogate gradients to bypass the non-differentiability of spikes.**
- **LIF neurons can be configured natively alongside standard dense and convolutional PyTorch layers.**
- **Advanced models, including spiking recurrent layers and LSTM variants, help capture complex temporal dependencies.**
- **Weight and state quantization workflows are explored using Brevitas to prepare models for deployment on edge hardware.**

## Workshop Format & Takeaways
The session functions as a comprehensive, step-by-step coding tutorial executing entirely within a Google Colab environment. It begins at the foundational level, instantiating a single Leaky Integrate-and-Fire (LIF) neuron to observe its membrane potential dynamics, including exponential relaxation and threshold-based spike generation under continuous input currents.

Moving beyond single neurons, the workshop constructs a full spiking classifier to tackle the MNIST dataset. The standard PyTorch `nn.Linear` and `nn.Conv2d` blocks are seamlessly interlaced with `snn.leaky` nodes. As discussed in the session, addressing the non-differentiability of the active thresholding step is vital; snnTorch accomplishes this by relying on the derivative of the arctangent function by default to estimate gradients during the backward pass. Tonic is subsequently introduced to handle the Poker DVS dataset, demonstrating efficient caching and temporal binning of genuine event-camera data to avoid crippling computational overhead.

To improve performance on complex time-series data, the tutorial explores recurrent SNNs and spiking LSTMs, architectures designed to carry temporal state forward beyond the inherent membrane potential decay. Finally, the session tackles the reality of deploying models to edge silicon, integrating the Brevitas library to quantize both synaptic weights and membrane states down to 8-bit integers, effectively simulating hardware constraints without leaving the Python ecosystem.

## What This Means for Neuromorphic Computing
Training SNNs historically required navigating a restrictive and esoteric hyperparameter space disconnected from modern deep learning infrastructure. Frameworks like snnTorch act as a vital translation layer, translating backpropagation concepts into spiking equivalents. By abstracting the complexities of surrogate gradients, multi-timestep unrolling, and thresholding mechanisms, researchers and practitioners can prototype energy-efficient algorithms with the same velocity and API familiarity as traditional Convolutional or Recurrent Neural Networks.

## Resources
- **Speaker Notebook:** [https://github.com/open-neuromorphic/hands-on-session-snntorch-230302](https://github.com/open-neuromorphic/hands-on-session-snntorch-230302)
