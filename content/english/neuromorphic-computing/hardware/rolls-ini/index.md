---
active_product: false
description: 'Learn about INI''s neuromorphic hardware: ROLLS'
type: neuromorphic-hardware
image: rolls.jpg
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
  neurons: 256
  on_chip_learning: true
  power: ~5 mW
  release_date: null
  software: Custom Python
  status:
    announced: true
    released: true
    retired: true
  synapses: 64000
product_name: ROLLS - INI
summary: ROLLS is a reconfigurable neuromorphic chip with 256 silicon neurons and
  128K plastic synapses that implements spike-timing learning rules. It allows emulation
  of neural systems with adaptive behaviors using analog neuron/synapse circuits with
  added digital configuration logic for flexibility.
title: ROLLS - INI - INI
type: neuromorphic-hardware
---

The ROLLS chip implements key requirements for online learning and adaptive behavior in neuromorphic systems, with highly flexible digital configuration options.

## Overview
- Presented as a "Reconfigurable On-line Learning Spiking Neuromorphic Processor"
- 256 silicon neurons, 128K plastic synapses, 256K programmable synapses
- Mixed-signal analog/digital implementation
- 180nm CMOS process, 51.4 mm2 die area  
- Modeling of neural systems that adapt in real-time through on-chip learning

## Silicon Neurons
- Implement adaptive exponential Integrate-and-Fire (I&F) model
- Exhibit various spiking behaviors (frequency adaptation, refractory period, threshold adaptation, bursting)  
- Highly configurable through 13 tunable bias parameters 
- Low mismatch between neurons (9.4% avg)
- On-chip learning circuits to evaluate spike-timing-based plasticity rules 

## Synapses
- Two core arrays:
   - Long-term plasticity (LTP) synapses with bi-stable weights using drift-diffusion mechanism
   - Short-term plasticity (STP) synapses with 4-level programmable weights and short-term depression
- LTP array models NMDA receptors with longer time constants
- STP array models AMPA/GABA receptors with shorter time constants  
- Sparse digital logic for memory and configuration in every synapse
- Digital configuration of synapse types and connectivity 

## Architecture
- Virtual "diffuser" synapses to combine signals from groups of synapses
- Synapse demultiplexing to allow flexible neuron-synapse mapping
- Asynchronous peripheral digital circuits for input/output
- Bias generator for tuning analog parameters
- ADC readout circuit for monitoring internal signals

## Applications
- Hardware attractor networks to model working memory and decision making
- Real-time image classification demonstration with spiking vision sensor

## Related publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| April 2015 | [A reconfigurable on-line learning spiking neuromorphic processor comprising 256 neurons and 128K synapses](https://www.frontiersin.org/articles/10.3389/fnins.2015.00141/full) | Ning Qiao, Hesham Mostafa, Federico Corradi, Marc Osswald, Fabio Stefanini, Dora Sumislawska, Giacomo Indiveri |  Frontiers of Neuroscience |
