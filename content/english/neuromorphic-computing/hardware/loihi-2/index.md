---
active_product: false
description: 'Explore  Intel''s neuromorphic hardware: Loihi 2'
draft: false
image: loihi2.jpg
organization:
  group_name: null
  org_logo: null
  org_name: Intel
  org_website: null
  product_page_link: null
  social_media_links:
    linkedin: null
    twitter: null
    wikipedia: null
product:
  announced_date: null
  applications: null
  chip_type: Digital
  neurons: 1000000
  on_chip_learning: true
  power: ~1 W
  release_date: null
  software: Lava
  status:
    announced: true
    released: true
    retired: true
  synapses: null
product_name: Loihi 2
summary: Loihi 2 is Intel's latest neuromorphic research chip, implementing spiking
  neural networks with programmable dynamics, modular connectivity, and optimizations
  for scale, speed, and efficiency. Early research demonstrates promise for low-latency
  intelligent signal processing.
title: Loihi 2 - Intel
type: neuromorphic-hardware
---

The Loihi 2 chip by Intel consists of 6 embedded microprocessor cores (Lakemont x86) and 128 fully asynchronous neuron cores (NCs) connected by a network-on-chip. The NCs are optimized for neuromorphic workloads by implementing a group of spiking neurons and including all synapses connected to such neurons. All the communication between NCs is in the form of spike messages. Microprocessor cores are optimized for spike-based communication and execute standard C code to assist with data I/O as well as network configuration, management and monitoring. Some of the new functionalities added in this second version of the Loihi chip are the possibility of implementing custom neuron models using microcode instructions (assembly), the option to generate and transmit graded spikes, and support for three-factor learning rules. A single Loihi 2 chip supports up to 1 million neurons and 120 million synapses.
Together with Loihi 2, Intel presented their open-source framework Lava, that allows users to write neuro-inspired applications and map them to both traditional and neuromorphic hardware. Using high-level Python APIs, users can describe their neural networks, which are then compiled to run on the requested backend. Currently, Lava supports deployment on traditional CPU and Loihi 2. Specifically for Loihi 2, Lava also gives the possibility of writing custom neuron models in assembly to be run on the NCs, and custom C code to be run in the LMTs. 


## Overview
Loihi 2 is the latest generation spiking neural network processor from Intel Labs, succeeding the Loihi chip. Neuromorphic hardware seeks to achieve scales of neural complexity approaching the brain by utilizing architectural inspiration from neuroscience. This includes spiking dynamics, sparse connectivity, and asynchronous event-driven communication. Loihi 2 enhances its predecessor to expand the computational capacities and efficiency of silicon neuromorphic systems for real-time intelligent processing.

## Architecture
The Loihi 2 architecture comprises 128 neural cores, 6 embedded processors, and an asynchronous network-on-chip that supports multi-chip scaling. The neural cores are fully programmable digital signal processors optimized for emulating biological neural dynamics with specialized memory structures for network connectivity. 

Beyond fixed leaky integrate-and-fire, the cores now support user-defined arithmetic and logic to specify arbitrary spiking behaviors. These include various resonance, adaptation, threshold, and reset functions for more complex and nonlinear temporal representations. Program length, variable allocation, and numerical precision balance model complexity, neuron capacity, and energy costs.

To communicate results, Loihi 2 neurons output graded spikes encoding integer data payloads. Optimized connectivity schemes leverage sparsity and enable convolution, procedural generation, and factorized weight sharing to radically improve synapse memory efficiency. On-chip synapse state also supports programmable spike-timing based plasticity rules.

Redesigned asynchronous digital circuits, optimized down to standard cell pipelines, yield up to 10x faster spike processing over Loihi. Together with a denser process technology, this expands the algorithms and application workloads addressable by one or more Loihi 2 chips in real time.

## Applications
Research applying Loihi 2’s capabilities toward intelligent sensing and processing tasks has demonstrated promising directions. Spatiotemporal resonance enables efficient event-based optical flow estimation. Cascaded auditory models exploit self-organization for noise-invariant spike encoders. Broadly, the architecture facilitates spike-based solutions optimized for efficiency metrics spanning latency, throughput, and power.

One approach implements resonant and fire neurons to approximate spectrograms from audio inputs. Rather than fixed windowing, the neurons intrinsically resonate to the strongest spectral components. Their modulated sparse spike outputs encode the short-time Fourier spectrum over 47x more efficiently. Extensions integrate learned classification on top, processing directly from spike streams.

Other work explored spatiotemporal resonance for estimating optical flow from event cameras. Configured as a motion energy filter bank, resonant neural grids measure responses tuned to different local motion speeds and directions. Compared to deep neural networks, this brain-inspired approach reduces computation by over 90x while improving accuracy.

Researchers have also demonstrated training hybrid spiking networks on Loihi 2 through backpropagation with SLAYER. Initial speech recognition experiments show competitive accuracies on spike-based auditory datasets using reservoirs of resonant and leaky integrate-and-fire neurons. Extensions to layerwise trained recurrent SNNs on more complex benchmarks are ongoing.

Beyond sensing, Loihi 2 can replicate ring attractor networks modeling the auditory cortex using coupled Hopf resonators. Quantized by downstream neurons, cascaded sections adapt their tuning curves to automatically gain normalize inputs across frequencies. This achieves robust amplitude-invariant spike encodings similar to biological cochleas.
