---
title: NeuroGrid (BrainDrop)
description:  Neurogrid is a specialized neuromorphic hardware system that enables real-time simulation of neural models with up to 1M neurons & 8B synapses using low-power mixed-signal silicon neuron circuits arranged in 16 chips & interconnected via multicast routing.
active_product: False
product:
  chip_type: Mixed-signal
  neurons: 1000000
  synapses: 8000000000
  on_chip_learning: False
  power: ~3 W
  software: NEF
  applications: Real-time SNN emulation
  status:
    announced: true
    released: true
    retired: true
  announced_date:
  release_date:
image: neurogrid.jpg
organization:
- org_name: Stanford
  org_logo:
  org_website:
  group_name:
  social_media_links:
    linkedin:
    twitter:
    wikipedia:
  product_page_link:
draft: false
---

Neurogrid is a specialized hardware platform designed to simulate large-scale functional models of biological neural systems in real time. It was developed by a research team led by Kwabena Boahen at Stanford University seeking to provide neuroscientists an affordable tool to gain insights into neural information processing through modeling.

## System Architecture
The Neurogrid system consists of 16 Neurocore chips fabricated in a 180nm CMOS process and interconnected in a binary tree configuration. Each Neurocore contains:

- A 256x256 array of mixed-signal silicon neuron circuits 
- A transmitter to dispatch spikes from the array
- A receiver to deliver spikes to the array  
- A router to communicate spikes between Neurocores
- SRAM to support programmable connectivity

The silicon neuron circuit consists of elements to model the soma, dendrite, shared synapse populations, and ion channel populations. Sharing synapse and dendrite circuits between neighboring neurons enables high connectivity while minimizing chip area. Secondary branching of axons is achieved through spatial signal decay in the shared dendrite circuit.

The system utilizes a multicast packet-switched routing protocol for low latency spike communication. Primary axon branching between arbitrary locations in different chips is supported through a separate FPGA-based daughterboard.  

## Performance

In a 16-chip configuration, Neurogrid has demonstrated real-time simulation of 1 million neurons with over 8 billion synaptic connections while consuming only 3 Watts. This represents an improvement in power efficiency of 5 orders of magnitude compared to conventional supercomputers simulating similarly sized cortical models.

The extremely low power consumption and high connectivity enable Neurogrid to simulate larger and more complex neural architectures than previously possible. Researchers have developed cortical models with recurring inhibitory connections exhibiting global synchronous spiking activity.

The goal of the project is to provide neuroscientists an affordable specialized platform to simulate hypothesized neural computations at sufficient biological scale to test theories of information processing in brain structures. Real-time performance allows direct interaction with models and dynamically tuning parameters to better match observed biological behaviors.

## Related publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| April 2014 | [Neurogrid: A Mixed-Analog-Digital Multichip System for Large-Scale Neural Simulations](https://ieeexplore.ieee.org/document/6805187) | Ben Varkey Benjamin; Peiran Gao; Emmett McQuinn; Swadesh Choudhary; Anand R. Chandrasekaran; Jean-Marie Bussat; Rodrigo Alvarez-Icaza; John V. Arthur; Paul A. Merolla; Kwabena Boahen |  Proceedings of the IEEE |