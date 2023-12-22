---
active_product: true
description: The SpiNNaker 2 chip houses 144 ARM cores with 18MB on-chip SRAM, 8GB
  DRAM, and dedicated math accelerators. Manufactured in 22nm, it employs body biasing
  and DVFS for adaptive near-threshold operation down to 0.4V, enabling a 50x increase
  in neural simulation capacity per watt over SpiNNaker 1.
draft: false
image: spinnaker.jpg
organization:
  group_name: Department of Computer Science
  org_logo: logo-university-of-manchester.png
  org_name: University of Manchester
  org_website: https://www.manchester.ac.uk/
  product_page_link: http://apt.cs.manchester.ac.uk/projects/SpiNNaker/
  social_media_links:
    linkedin: https://www.linkedin.com/school/university-of-manchester/
    twitter: https://twitter.com/UoMCS
    wikipedia: https://en.wikipedia.org/wiki/University_of_Manchester_School_of_Computer_Science
product:
  announced_date: 2013-01-01
  applications: Real-time simulation of SNN; HPC
  chip_type: Digital
  neurons: 1000000000
  on_chip_learning: true
  power: ~kW
  release_date: 2021-02-01
  software: PyNN, NEST
  status:
    announced: true
    released: true
    retired: true
  synapses: 10000
product_name: SpiNNaker 2
title: SpiNNaker 2
type: neuromorphic-hardware
---

SpiNNaker 2 is a neuromorphic computing platform designed to simulate spiking neural networks. It is the successor to the SpiNNaker (Spiking Neural Network Architecture) system developed at the University of Manchester. 

## Overview

SpiNNaker 2 aims to achieve a 10x increase in core count over SpiNNaker 1, with a target of 10 million ARM processor cores on a single machine. Along with architectural improvements, the shift to a 22nm manufacturing process is expected to provide over 50x more neural simulation capacity while staying within the same power envelope.

The system retains the flexible, software-based approach of SpiNNaker 1, using independent ARM cores to model groups of neurons in parallel. Additional dedicated hardware has been added to accelerate common mathematical operations involved in synapse modeling and neural simulation. Dynamic voltage and frequency scaling techniques allow each core to scale its performance to match instantaneous load, optimizing the power efficiency.

The improvements in SpiNNaker 2 are intended to enable much larger and more biologically detailed spiking neural network simulations. The increased capacity could allow multiscale modeling incorporating complex neuron models at one end and high-level abstractions of brain regions at the other. The availability of mathematical accelerators also makes the system suitable for conventional deep neural network execution.

Potential applications of SpiNNaker 2 include:

- Brain research and whole-brain modeling
- Biological neural simulations with complex plasticity rules
- Low-power inferencing for robotics and embedded AI
- Tactile Internet, autonomous vehicles, and other real-time machine learning applications

The SpiNNaker 2 chips are currently in the prototype stage, with an expected release in late 2020 or early 2021. The final production system calls for 10 million cores spread over 25 circuit boards, housed in a large supercomputer-like framework.

## History

The SpiNNaker project was initiated at the University of Manchester in 2006, with the goal of designing a massively parallel system optimized for simulating spiking neural networks in real time. 

The first version, SpiNNaker 1, became fully operational in 2019, achieving the target scale of 1 million ARM9 processor cores. Systems have been deployed for brain modeling applications and neuromorphic research.

Development of SpiNNaker 2 began in 2013 through a collaboration between the University of Manchester and Technische Universität Dresden. The work has been funded under the European Union's Human Brain Project with the aim of reaching the next level of neural simulation power and energy efficiency.

## Technical Details

The key characteristics and improvements of SpiNNaker 2 over its predecessor include:

- 22nm FD-SOI manufacturing process
- Approximately 144 ARM Cortex M4F cores per chip 
- 18MB on-chip SRAM
- 8GB in package DRAM  
- Dedicated hardware for mathematical functions
- Adaptive body biasing for near-threshold voltage operation
- Workload-adaptive dynamic voltage and frequency scaling
- Accelerated chip-to-chip interconnects

The final SpiNNaker 2 machine is projected to incorporate 10 million cores over 25 circuit boards, contained in a supercomputer-like system up to 5 server racks in size.

## Related publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| November 2019 | [SpiNNaker 2: A 10 Million Core Processor System for Brain Simulation and Machine Learning](https://arxiv.org/abs/1911.02385) | Christian Mayr, Sebastian Hoeppner, Steve Furber |  arXiv |