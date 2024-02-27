---
active_product: true
description: 'Learn about TU Dresden''s neuromorphic hardware: SpiNNaker2'
type: neuromorphic-hardware
image: spinnaker.jpg
organization:
  group_name: null
  org_logo: tu-dresden.png
  org_name: Technische Universität Dresden
  org_website: https://tu-dresden.de/
  product_page_link: https://tu-dresden.de/ing/elektrotechnik/die-fakultaet/aktuelles/news/spinnaker2-tu-dresden-university-of-manchester-und-globalfoundries-gelingt-durchbruch-bei-ki-cloud-systemen?set_language=en
  social_media_links:
    linkedin: null
    twitter: null
    wikipedia: https://en.wikipedia.org/wiki/SpiNNaker
product:
  announced_date: 2021-07-27
  applications: Real-time simulation of SNN; DNN; Symbolic; HPC
  chip_type: Digital
  neurons: 1 million
  weight_bits: null
  activation_bits: null
  on_chip_learning: true
  power: ~2-5W
  release_year: 2021
  release_date: 2021-07-27
  software: PyNN, NEST
  status:
    announced: true
    released: true
    retired: false
  synapses: 10000
product_name: SpiNNaker2
summary: The SpiNNaker2 chip houses 153 ARM cores with 19MB on-chip SRAM, 2GB DRAM,
  and dedicated Machine Learning (e.g., MAC) and Neuromorphic (e.g., Exp/Log) 
  accelerators. Manufactured in 22nm FDSOI, it employs Adaptive Body Biasing (ABB) 
  in a Forward Body Bias (FBB) configuration, as well as DVFS for adaptive 
  near-threshold operation down to 0.5V, enabling a 10x increase in neural 
  simulation capacity per watt over SpiNNaker1.
title: SpiNNaker 2 - University of Dresden
---

SpiNNaker2 is the successor of the SpiNNaker (Spiking Neural Network Architecture) system developed at the University of Manchester. In contrast to SpiNNaker1, SpiNNaker2 extends beyond being a pure neuromorphic computing platform simulating spiking neural networks, and also supports traditional and event-based Deep Neural Networks (DNNs). 

## Overview

SpiNNaker2 aims to achieve a 10x increase in core count over SpiNNaker1, with a target of 10 million ARM processor cores on a single machine. Along with architectural improvements, the shift to a 22nm manufacturing process is expected to provide over 10x more neural simulation capacity while staying within a comparable power envelope.

The system retains the flexible, software-based approach of SpiNNaker1, using independent ARM cores arranged in a Globally Asynchronous Locally Synchronous (GALS) configuration to model groups of neurons in parallel. Additional dedicated hardware has been added to accelerate common mathematical operations involved in synapse modeling and neural simulation. Dynamic voltage and frequency scaling techniques allow each core to scale its performance to match instantaneous load, optimizing the power efficiency.

The improvements in SpiNNaker2 are intended to enable much larger and more biologically detailed spiking neural network simulations. The increased capacity could allow multiscale modeling incorporating complex neuron models at one end and high-level abstractions of brain regions at the other. The availability of mathematical accelerators also makes the system suitable for the conventional and event-based deep neural network execution.

Potential applications of SpiNNaker 2 include:

- Brain research and whole-brain modeling
- Biological neural simulations with complex plasticity rules
- Low-power inferencing for robotics and embedded AI
- Event-based Machine Learning models
- Large-scale execution of hybrid AI models 
- Tactile Internet, autonomous vehicles, and other real-time machine learning applications

The SpiNNaker2 chips had three previous silicon prototypes (i.e., SANTOS, Jib1, and Jib2) and its current SpiNNaker2 taped-out form has more than 34,500 fabricated units, which are used to build the world's largest brain-like supercomputer in Dresden containing more than 5 million units hosting a potential number of 5 billion neurons. The 5 million cores are spread over 720 48-node boards, housed in a large supercomputer-like framework. Despite its previous form factor being 5 million processing elements, the supercomputer form is designed to have up to 10 million units without sacrificying its operating conditions.

## History

The SpiNNaker project was initiated at the University of Manchester in 2006, with the goal of designing a massively parallel system optimized for simulating spiking neural networks in real time. 

The first version, SpiNNaker1, became fully operational in 2019, achieving the target scale of 1 million ARM9 processor cores, arranged in 1200 48-node boards. Systems have been deployed for brain modeling applications and neuromorphic research.

The development of SpiNNaker2 began in 2013 through a collaboration between the University of Manchester and Technische Universität Dresden, period in which several silicon prototypes were developed until achieving its current form. The work has been funded under the European Union's Human Brain Project with the aim of reaching the next level of neural simulation power and energy efficiency.

## Technical Details

The key characteristics and improvements of SpiNNaker2 over its predecessor include:

- 22nm FD-SOI (22FDX) manufacturing process
- 152 ARM Cortex M4F application cores with 1 management core per chip 
- 19MB on-chip SRAM
- 2GB in package DRAM (LPDDR4)  
- Dedicated hardware for mathematical functions for both SNNs and DNNs
- Adaptive body biasing (ABB) for near-threshold voltage operation
- Workload-adaptive dynamic voltage and frequency scaling
- Accelerated and customized chip-to-chip interconnects

The current SpiNNaker2 machine under construction in Dresden is projected to incorporate 5.2 million cores over 720 48-node circuit boards, contained in a supercomputer-like system up to 8 server racks in size. This is expected to be available in 2024. 

## Related publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| December 2023 | [SpiNNaker2: A Large-Scale Neuromorphic System for Event-Based and Asynchronous Machine Learning](https://arxiv.org/abs/2401.04491) | Hector A. Gonzalez, Jiaxin Huang, Florian Kelber, Khaleelulla Khan Nazeer, Tim Langer, Chen Liu, Matthias Lohrmann, Amirhossein Rostami, Mark Schöne, Bernhard Vogginger, Timo C. Wunderlich, Yexin Yan, Mahmoud Akl, Christian Mayr |  arXiv |
| November 2023 | [py-spinnaker2: A light-weight Python interface for running experiments on the SpiNNaker2 neuromorphic chip]([https://arxiv.org/abs/2401.04491](https://zenodo.org/records/10202110)) | Bernhard Vogginger, Florian Kelber, Matthias Jobst, Yexin Yan, Pascal Gerhards, Martin Weih, Mahmoud Akl |  arXiv |
| August 2021 | [The SpiNNaker2 Processing Element Architecture for Hybrid Digital Neuromorphic Computing](https://arxiv.org/abs/2103.08392) | Sebastian Höppner, Yexin Yan, Andreas Dixius, Stefan Scholze, Johannes Partzsch, Marco Stolba, Florian Kelber, Bernhard Vogginger, Felix Neumärker, Georg Ellguth, Stephan Hartmann, Stefan Schiefer, Thomas Hocker, Dennis Walter, Genting Liu, Jim Garside, Steve Furber, Christian Mayr |  zenodo |
| November 2019 | [SpiNNaker 2: A 10 Million Core Processor System for Brain Simulation and Machine Learning](https://arxiv.org/abs/1911.02385) | Christian Mayr, Sebastian Hoeppner, Steve Furber |  arXiv |

