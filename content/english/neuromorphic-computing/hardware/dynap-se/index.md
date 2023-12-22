---
active_product: false
description: The DYNAP-SE2 is a configurable, mixed-signal neuromorphic chip with
  1024 neurons, 64k plastic synapses, specialized dendrites, low-latency event routing,
  and multi-timescale adaptation dynamics enabling real-time prototyping of biologically
  inspired spiking neural networks for ultra-low power edge processing.
draft: false
image: dynap-se2.jpg
organization:
  group_name: null
  org_logo: null
  org_name: INI
  org_website: null
  product_page_link: null
  social_media_links:
    linkedin: null
    twitter: null
    wikipedia: null
product:
  announced_date: null
  applications: Research
  chip_type: Mixed-signal
  neurons: 4000
  on_chip_learning: false
  power: ~5 mW
  release_date: null
  software: Custom Python
  status:
    announced: true
    released: true
    retired: true
  synapses: 4000000
product_name: DYNAP-SE2
title: DYNAP-SE2
type: neuromorphic-hardware
---

The DYNAP-SE2 is a mixed-signal neuromorphic processor chip manufactured in 180nm CMOS technology. Occupying 98mm2 silicon area, the chip contains 1024 leaky integrate-and-fire spiking neuron circuits along with 64k reconfigurable synapses. Its architecture allows real-time emulation of neural and synaptic dynamics for processing event-based sensory data.

## Neurons
The 1024 neuron circuits are arranged in a 2x2 grid of 256-neuron cores, with each neuron featuring a 7.7pF capacitor enabling integration time constants up to 5 seconds. Two leaky integrate-and-fire firing models can be selected per neuron: exponential or threshold-based. The neurons also incorporate biologically inspired adaptation dynamics like spike frequency adaptation and firing rate homeostasis for increased computational capabilities. Additional mechanisms for refractory periods, dendritic computations, and controllable leak currents provide further configurability. 

## Synapses
Every neuron has 64 synapses, implemented as filters that convert pre-synaptic spikes to post-synaptic currents using 4-bit weights and 2-bit delays. The synapses can be flexibly assigned to each neuron's four dendritic branches. Short-term plasticity through depressive mechanisms is also incorporated. The dendrites themselves include specialized dynamics like NMDA receptor voltage gating, AMPA grid diffusion, and inhibitory conductances.

## Event-based Processing 
The DYNAP-SE2 uses an asynchronous digital fabric for spike event communication, ensuring low latency operation essential for real-time sensory processing. A 2D grid routing architecture connects multiple chips, with each neuron able to target up to four chips in a ±7 displacement range. The asynchronous scheme enables complex recurrent network topologies beyond simple feedforward structures. 

## On-Chip Interfaces
The chip includes a range of interfaces for input/output events. A multi-purpose 40-bit split-parallel input bus allows external configuration and stimulus. Four asynchronous grid buses connect neighboring chips in a 2D array. Dedicated logic enables interfacing to neuromorphic vision/auditory sensors. Current-based ADC circuits provide on-chip monitoring of neural/synaptic signals.  

The rich neural/synaptic dynamics and event-driven operation of DYNAP-SE2 allows exploration of spiking neural networks for ultra-low power edge processing applications with biological time constants. The configurability supports prototyping systems ranging from basic receptive fields to complex recurrent networks for sensory-cognitive information processing.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| October 2023 | [DYNAP-SE2: a scalable multi-core dynamic neuromorphic asynchronous spiking neural network processor](https://arxiv.org/abs/2310.00564) | Ole Richter, Chenxi Wu, Adrian M. Whatley, German Köstinger, Carsten Nielsen, Ning Qiao, Giacomo Indiveri | arXiv |