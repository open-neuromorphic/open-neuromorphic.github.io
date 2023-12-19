---
title: TrueNorth
description:  TrueNorth is a 5.4B transistor, 4096 core, 1M neuron, 256M synapse neurosynaptic chip implemented in 28nm. Through a mixed async-sync design & custom toolflow, it achieves 58GSOPS & 400GSOPS/W efficiency while running neural networks in 65mW real-time.
active_product: False
product:
  chip_type: Digital
  neurons: 1000000
  synapses: 256000000
  on_chip_learning: False
  power: ~0.3 W
  software: Custom
  applications: DNN acceleration
  status:
    announced: true
    released: true
    retired: true
  announced_date:
  release_date:
image: truenorth.jpg
organization:
- org_name: IBM
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

## Product Description

### Overview
TrueNorth is a neurosynaptic chip developed by IBM as part of the DARPA SyNAPSE program. It implements a non-von Neumann, parallel, scalable, and low-power brain-inspired chip architecture. The 5.4 billion transistor TrueNorth chip contains 4096 neurosynaptic cores with 1 million spiking neurons and 256 million synapses. It was fabricated in 28nm CMOS technology.

### Architecture
- Inspired by the structure and function of the brain's neurons, cortical columns, and long-distance connectivity
- Key principles: Minimize power, maximize parallelism, enable real-time operation, provide scalability and defect tolerance, ensure hardware-software equivalence
- Neurosynaptic core is the basic building block, containing synapses, neurons, axons, and dendrites  
- 4096 cores tiled on a chip, interconnected via a 2D mesh intra-chip network
- Asynchronous peripheral circuits allow seamless tiling and connectivity across chip boundaries

### Design Approach
- Mixed asynchronous-synchronous methodology
- Asynchronous circuits used for communication, control logic to enable event-driven operation  
- Synchronous circuits used for computation to enable flexibility and rapid design
- Custom tool flow combining commercial EDA tools with academic and in-house tools

### Performance
- 58 billion synaptic operations per second (GSOPS)
- 400 GSOPS/W computational energy efficiency
- 65mW power consumption at 0.75V supply running a typical neural network application at real-time

### Summary
The novel architecture and design methodology of TrueNorth led to an extremely parallel, efficient, and scalable neurosynaptic chip capable of running complex neural networks and sensory processing systems in real-time at ultralow power levels. It serves as a building block for future cognitive computing systems.

