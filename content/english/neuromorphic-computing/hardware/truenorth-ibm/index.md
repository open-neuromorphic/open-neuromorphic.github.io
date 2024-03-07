---
active_product: false
description: 'Learn about IBM''s neuromorphic hardware: TrueNorth'
type: neuromorphic-hardware
image: truenorth.jpg
organization:
  group_name: null
  org_logo: ibm.jpg
  org_name: IBM
  org_website: https://www.ibm.com/
  product_page_link: null
  social_media_links:
    linkedin: https://www.linkedin.com/company/ibm/
    twitter: null
    wikipedia: https://en.wikipedia.org/wiki/Cognitive_computer#IBM_TrueNorth_chip
product:
  announced_date: 2014-01-01
  applications: DNN acceleration
  chip_type: Digital
  neurons: 1 million
  synapses: 256 million
  weight_bits: null
  activation_bits: null
  on_chip_learning: false
  power: ~0.3 W
  release_date: 2014-06-01
  release_year: 2014
  software: Custom
  status:
    announced: true
    released: true
    retired: true
product_name: TrueNorth
summary: TrueNorth is a 5.4B transistor, 4096 core, 1M neuron, 256M synapse neurosynaptic
  chip implemented in 28nm. Through a mixed async-sync design & custom toolflow, it
  achieves 58GSOPS & 400GSOPS/W efficiency while running neural networks in 65mW real-time.
title: TrueNorth - IBM
---

TrueNorth is a neurosynaptic chip developed by IBM as part of the DARPA SyNAPSE program. It implements a non-von Neumann, parallel, scalable, and low-power brain-inspired chip architecture. The 5.4 billion transistor TrueNorth chip contains 4096 neurosynaptic cores with 1 million spiking neurons and 256 million synapses. It was fabricated in 28nm CMOS technology.

## Architecture
The TrueNorth architecture consists of an array of 4096 configurable neurosynaptic cores tiled in a 2D grid. Each core integrates 256 fully programmable, non-linear, leaky integrate-and-fire neurons, representing key components like soma, axon, dendrite and synapses. With 64K plastic synapses per core, neurons within a core achieve dense connectivity through an all-to-all crossbar structure. The architecture eschews traditional busses or global signals. Instead cores communicate spikes using an asynchronous network of hierarchical routers for modular composition across chips. Custom merge-split interface blocks along the periphery enable seamless tiling of TrueNorth chips using direct core-to-core signaling.

- Inspired by the structure and function of the brain's neurons, cortical columns, and long-distance connectivity
- Key principles: Minimize power, maximize parallelism, enable real-time operation, provide scalability and defect tolerance, ensure hardware-software equivalence
- Neurosynaptic core is the basic building block, containing synapses, neurons, axons, and dendrites  
- 4096 cores tiled on a chip, interconnected via a 2D mesh intra-chip network
- Asynchronous peripheral circuits allow seamless tiling and connectivity across chip boundaries

## Design Approach
TrueNorth pioneered a hybrid asynchronous-synchronous design methodology optimizing each approach for specialized roles. Local asynchronous controllers orchestrate spike events, schedule neuron operations, and transport activity data using delay-insensitive request-acknowledge protocols. This event-driven signaling minimizes active power for communication and control. Meanwhile, digital synchronous circuits, driven by localized clocks, efficiently implement neuronal integrate-and-fire computations. A custom co-simulation environment and tool flow supported integrating and verifying the joint behavior of asynchronous control logic with synchronous computation blocks.

- Mixed asynchronous-synchronous methodology
- Asynchronous circuits used for communication, control logic to enable event-driven operation  
- Synchronous circuits used for computation to enable flexibility and rapid design
- Custom tool flow combining commercial EDA tools with academic and in-house tools

## Performance
TrueNorth’s parallel event-driven architecture minimizes unnecessary computation and data movement. Cores operate at only 65mW running typical neural networks, whereas computation and communication scale directly with useful spike activity. IBM demonstrated 50-100X speedup for TrueNorth accelerating real-time sensory analytics, video object recognition, and other cognitive applications — while reducing energy consumption by over 100,000X compared to conventional server processors.

- 58 billion synaptic operations per second (GSOPS)
- 400 GSOPS/W computational energy efficiency
- 65mW power consumption at 0.75V supply running a typical neural network application at real-time

## Summary
As the world's first scalable digital neuromorphic architecture manufactured using standard semiconductor processes, TrueNorth represents a breakthrough system that efficiently harnesses capabilities inspired by neural systems. With its synthesis of custom asynchronous signaling, digital synchronous computation, dense in-memory connectivity, and programmable neuron dynamics, TrueNorth signifies an entirely new generation of ultra-low power parallel architecture unmatched in computational efficiency for stochastic sensory-cognitive workloads.

## Related publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| August 2015 | [TrueNorth: Design and Tool Flow of a 65 mW 1 Million Neuron Programmable Neurosynaptic Chip](https://ieeexplore.ieee.org/abstract/document/7229264) | Filipp Akopyan, Jun Sawada, Andrew Cassidy, Rodrigo Alvarez-Icaza, John Arthur, Paul Merolla, Nabil Imam, Yutaka Nakamura, Pallab Datta, Gi-Joon Nam, Brian Taba, Michael Beakes, Bernard Brezzo, Jente B Kuang, Rajit Manohar, William P Risk, Bryan Jackson, Dharmendra S Modha | IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems |
