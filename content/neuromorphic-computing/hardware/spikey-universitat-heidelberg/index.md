---
active_product: true
description: "Learn about Heidelberg University's neuromorphic hardware: Spikey"
type: neuromorphic-hardware
image: spikey_cut.jpg
organization:
  group_name: null
  org_logo: heidelberg.jpg
  org_name: Heidelberg University
  org_website: null
  social_media_links:
    linkedin: https://www.linkedin.com/company/ebrains-eu/
    twitter: https://twitter.com/ebrains_eu
    wikipedia: null
product:
  announced_date: 2006-07-21
  applications: Edge processing, robotics
  chip_type: Mixed-signal
  neurons: 384
  synapses: 98k
  weight_bits: 4 bits
  activation_bits: null
  on_chip_learning: true
  power: ~1 W
  release_year: 2006
  release_date: 2006-07-21
  software: PyNN.spikey
  status:
    announced: true
    released: true
    retired: true
product_name: Spikey
summary: The Spikey chip is an accelerated spiking neuromorphic system integrating
  384 integrate-and-fire neurons, 98k plastic synapses, and event routing.
  It enables fast emulation of complex neural dynamics and exploration of STDP-type synaptic plasticity.
title: Spikey — Heidelberg University
---

The Spikey accelerated neuromorphic system is an integrated circuit architecture for emulating biologically-inspired spiking neural networks.
It was developed by researchers at the Heidelberg University.
Key features of the Spikey system include:

## System Architecture
- Single-chip ASIC integrating a custom analog core with 384 neuron circuits, 98k plastic synapses, analog parameter storage, and an event routing network
- Synapses support STDP-type long-term and STP-type short-term plasticity.

## Neural and Synapse Circuits
- Implements the Leaky Integrate-and-Fire (LIF) neuron model with individually configurable model parameters
- On-chip synapse correlation and plasticity measurement enables programmable spike-timing dependent plasticity

## Applications and Experiments
- Accelerated (50,000–100,000-fold compared to biological real time) emulation of complex spiking neuron dynamics
- Exploration of synaptic plasticity models and critical network dynamics at biological timescales

The accelerated operation and flexible architecture facilitate applications in computational neuroscience research.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| February 2013 | [Six networks on a universal neuromorphic computing substrate](https://doi.org/10.3389/fnins.2013.00011) | Thomas Pfeil, Andreas Grübl, Sebastian Jeltsch, Eric Müller, Paul Müller, Mihai A. Petrovici, Michael Schmuker, Daniel Brüderle, Johannes Schemmel, Karlheinz Meier | Frontiers in Neuroscience (Neuromorphic Engineering) |
| July 2012 | [Is a 4-bit synaptic weight resolution enough? – constraints on enabling spike-timing dependent plasticity in neuromorphic hardware](https://doi.org/10.3389/fnins.2012.00090) | Thomas Pfeil, Tobias C. Potjans, Sven Schrader, Wiebke Potjans, Johannes Schemmel, Markus Diesmann, Karlheinz Meier | Frontiers in Neuroscience (Neuromorphic Engineering) |
| June 2009 | [Establishing a Novel Modeling Tool: a Python-based Interface for a Neuromorphic Hardware System](https://doi.org/10.3389/neuro.11.017.2009) | Daniel Brüderle, Eric Müller, Andrew Davison, Eilif Muller, Johannes Schemmel, Karlheinz Meier | Frontiers Neuroinformatics |
| June 2007 | [Modeling Synaptic Plasticity within Networks of Highly Accelerated I&F Neurons](https://doi.org/10.1109/ISCAS.2007.378289) | Johannes Schemmel, Daniel Bruderle, Karlheinz Meier, Boris Ostendorf | 2007 IEEE International Symposium on Circuits and Systems (ISCAS) |
| July 2006 | [Implementing Synaptic Plasticity in a VLSI Spiking Neural Network Model](https://doi.org/10.1109/IJCNN.2006.246651) | Johannes Schemmel, Andreas Grübl, Karlheinz Meier, Eilif Mueller | 2006 IEEE International Joint Conference on Neural Network (IJCNN) |
