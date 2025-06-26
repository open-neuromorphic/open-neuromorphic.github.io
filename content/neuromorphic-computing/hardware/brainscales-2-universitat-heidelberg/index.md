---
active_product: true
description: "Learn about Heidelberg University's neuromorphic hardware: BrainScaleS-2"
type: neuromorphic-hardware
image: brainscales-2.jpg
organization:
  group_name: null
  org_logo: heidelberg.jpg
  org_name: Heidelberg University
  org_website: null
  product_page_link: https://wiki.ebrains.eu/bin/view/Collabs/neuromorphic/BrainScaleS/
  social_media_links:
    linkedin: https://www.linkedin.com/company/ebrains-eu/
    twitter: https://twitter.com/ebrains_eu
    wikipedia: null
product:
  announced_date: 2020-03-26
  applications: Edge processing, robotics
  chip_type: Mixed-signal
  neurons: 512
  synapses: 131072
  weight_bits: 6 bits (+ 6 bit mask for structural plasticity)
  activation_bits: null
  on_chip_learning: true
  power: ~1 W
  release_year: 2022
  release_date: 2022-02-24
  software: hxtorch, jaxsnn, PyNN.brainscales2, BrainScaleS-2 OS
  status:
    announced: true
    released: true
    retired: false
product_name: BrainScaleS-2
summary: The BrainScaleS-2 is an accelerated spiking neuromorphic system-on-chip integrating
  512 adaptive integrate-and-fire neurons, 131k plastic synapses, embedded processors,
  and event routing. It enables fast emulation of complex neural dynamics and exploration
  of synaptic plasticity rules. The architecture supports training of deep spiking
  and non-spiking neural networks using hybrid techniques like surrogate gradients.
title: BrainScaleS-2 — Heidelberg University
type: neuromorphic-hardware
---

The BrainScaleS-2 accelerated neuromorphic system is an integrated circuit architecture for emulating biologically-inspired spiking neural networks. It was developed by researchers at the Heidelberg University and collaborators. Key features of the BrainScaleS-2 system include:

## System Architecture
- Single-chip ASIC integrating a custom analog core with 512 neuron circuits, 131k plastic synapses, analog parameter storage, embedded processors for digital control and plasticity, and an event routing network
- Processor cores run a software stack with a C++ compiler and support hybrid spiking and non-spiking neural network execution
- Capable as a unit of scale for larger multi-chip or wafer-scale systems

## Neural and Synapse Circuits
- Implements the Adaptive Exponential Integrate-and-Fire (AdEx) neuron model with individually configurable model parameters
- Supports advanced neuron features like multi-compartments and structured neurons
- On-chip synapse correlation and plasticity measurement enable programmable spike-timing dependent plasticity 

## Hybrid Plasticity Processing
- Digital control processors allow flexible implementation of plasticity rules bridging multiple timescales
- Massively parallel readout of analog observables enables gradient-based and surrogate gradient optimization approaches

## Applications and Experiments
- Accelerated (1,000-fold compared to biological real time) emulation of complex spiking neural network dynamics, including configurable multi-compartmental cell morphologies
- Exploration of synaptic plasticity models and critical network dynamics at biological timescales
- Training of deep spiking neural networks using surrogate and exact gradient techniques
- Non-spiking neural network execution leveraging synaptic crossbar for analog matrix multiplication
- Available via three different software frameworks:
  - [jaxsnn](https://open-neuromorphic.org/neuromorphic-computing/software/snn-frameworks/jaxsnn/), a JAX-based framework for event-based numerical simulation of SNNs
  - [hxtorch](https://open-neuromorphic.org/neuromorphic-computing/software/snn-frameworks/hxtorch/), a PyTorch-based deep learning Python library for SNNs
  - [PyNN.brainscales2](https://open-neuromorphic.org/neuromorphic-computing/software/snn-frameworks/pynn-brainscales2), an implementation of the PyNN API

The accelerated operation and flexible architecture facilitate applications in computational neuroscience research and novel machine learning approaches. The system design serves as a scalable basis for future large-scale neuromorphic computing platforms.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| April 2024 | [jaxsnn: Event-driven gradient estimation for analog neuromorphic hardware](https://doi.org/10.1109/NICE61972.2024.10548709) | Eric Müller, Moritz Althaus, Elias Arnold, Philipp Spilger, Christian Pehle, Johannes Schemmel | 2024 Neuro-Inspired Computational Elements Conference (NICE) |
| April 2023 | [hxtorch.snn: Machine-learning-inspired Spiking Neural Network Modeling on BrainScaleS-2](https://doi.org/10.1145/3584954.3584993) | Philipp Spilger, Elias Arnold, Luca Blessing, Christian Mauch, Christian Pehle, Eric Müller, Johannes Schemmel | 2023 Neuro-Inspired Computational Elements Conference (NICE) |
| May 2022 | [A Scalable Approach to Modeling on Accelerated Neuromorphic Hardware](https://doi.org/10.3389/fnins.2022.884128) | Eric Müller, Elias Arnold, Oliver Breitwieser, Milena Czierlinski, Arne Emmel, Jakob Kaiser, Christian Mauch, Sebastian Schmitt, Philipp Spilger, Raphael Stock, Yannik Stradmann, Johannes Weis, Andreas Baumbach, Sebastian Billaudelle, Benjamin Cramer, Falk Ebert, Julian Göltz, Joscha Ilmberger, Vitali Karasenko, Mitja Kleider, Aron Leibfried, Christian Pehle, Johannes Schemmel | Frontiers in Neuroscience (Neuromorphic Engineering) |
| February 2022 | [The BrainScaleS-2 accelerated neuromorphic system with hybrid plasticity](https://doi.org/10.3389/fnins.2022.795876) | Christian Pehle, Sebastian Billaudelle, Benjamin Cramer, Jakob Kaiser, Korbinian Schreiber, Yannik Stradmann, Johannes Weis, Aron Leibfried, Eric Müller, Johannes Schemmel | Frontiers in Neuroscience (Neuromorphic Engineering) |
| January 2021 | [hxtorch: PyTorch for BrainScaleS-2 — Perceptrons on Analog Neuromorphic Hardware](https://doi.org/10.1007/978-3-030-66770-2_14) | Philipp Spilger, Eric Müller, Arne Emmel, Aron Leibfried, Christian Mauch, Christian Pehle, Johannes Weis, Oliver Breitwieser, Sebastian Billaudelle, Sebastian Schmitt, Timo C. Wunderlich, Yannik Stradmann, Johannes Schemmel | 2020 International Workshop on IoT, Edge, and Mobile for Embedded Machine Learning (ITEM) |
