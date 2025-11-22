---
active_product: true
description: "Learn about Heidelberg University's neuromorphic hardware: BrainScaleS-1"
type: neuromorphic-hardware
image: brainscales-1_2016.jpg
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
  announced_date: 2016-03-16
  applications: Neuroscientific research into Learning and developmental processes, energy-efficient spiking neural networks
  chip_type: Mixed-signal
  neurons: 196608
  synapses: 43253760
  weight_bits: 4 bits
  activation_bits: null
  on_chip_learning: true
  power: ~600 W
  release_year: 2016
  release_date: 2016-03-16
  software: PyNN.brainscales, BrainScaleS-1 OS
  status:
    announced: true
    released: true
    retired: false
product_name: BrainScaleS-1
summary: The BrainScaleS-1 is an accelerated spiking neuromorphic system integrating
  200k adaptive exponential integrate-and-fire neurons, 43M plastic synapses,
  and event routing on a silicon wafer substrate. It enables fast emulation of
  complex neural dynamics and exploration of STDP-type synaptic plasticity.
title: BrainScaleS-1 — Heidelberg University
---

The BrainScaleS-1 accelerated neuromorphic system is an wafer-scale integrated circuit architecture for emulating biologically-inspired spiking neural networks.
It was developed by researchers at the Heidelberg University and collaborators.
Key features of the BrainScaleS-1 system include:

## System Architecture
- 20 wafers comprising 384 ASICs interconnected by a configurable circuit-switched event routing network on a silicon wafer
- Every ASIC integrate a custom analog core with 512 neuron circuits, 112k plastic synapses, floating-gate-based analog parameter storage, STDP-type long-term and STP-type short-term plasticity and an event routing network

## Neural and Synapse Circuits
- Implements the Adaptive Exponential Integrate-and-Fire (AdEx) neuron model with individually configurable model parameters
- On-chip synapse correlation and plasticity measurement enable programmable spike-timing dependent plasticity 

## Software and Experiment Control
- BrainScaleS OS provides a full software stack including:
  - High-level PyNN-based experiment interfaces
  - C++ core libraries for configuration, calibration and control
  - Mapping and routing tools to translate neural models onto hardware
- Allows both novice and expert usage with varying levels of abstraction
- Supports batch-mode and hybrid-mode experiments (chip-in-the-loop)

## Applications and Experiments
- Accelerated (10,000-fold compared to biological real time) emulation of complex spiking neuron dynamics
- Exploration of synaptic plasticity models and critical network dynamics at biological timescales

The accelerated operation and flexible architecture facilitate applications in computational neuroscience research.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| September 2023 | [From clean room to machine room: commissioning of the first-generation BrainScaleS wafer-scale neuromorphic system](https://doi.org/10.1088/2634-4386/acf7e4) | Hartmut Schmidt, José Montes, Andreas Grübl, Maurice Güttler, Dan Husmann, Joscha Ilmberger, Jakob Kaiser, Christian Mauch, Eric Müller, Lars Sterzenbach, Johannes Schemmel and Sebastian Schmitt | Neuromorphic Computing and Engineering |
| May 2022 | [The operating system of the neuromorphic BrainScaleS-1 system](https://doi.org/10.1016/j.neucom.2022.05.081) | Eric Müller, Sebastian Schmitt, Christian Mauch, Sebastian Billaudelle, Andreas Grübl, Maurice Güttler, Dan Husmann, Joscha Ilmberger, Sebastian Jeltsch, Jakob Kaiser, Johann Klähn, Mitja Kleider, Christoph Koke, José Montes, Paul Müller, Johannes Partzsch, Felix Passenberg, Hartmut Schmidt, Bernhard Vogginger, Jonas Weidner, Christian Mayr, Johannes Schemmel | Neurocomputing |
| March 2016 | [Neuromorphic Computer Coming Online](https://www.uni-heidelberg.de/presse/news2016/pm20160316-neuromorphic-computer-coming-online.html) | No author listed | Press Release by Heidelberg University |
| June 2010 | [A wafer-scale neuromorphic hardware system for large-scale neural modeling](https://doi.org/10.1109/ISCAS.2010.5536970) | Johannes Schemmel, Daniel Brüderle, Andreas Grübl, Matthias Hock, Karlheinz Meier, Sebastian Millner | 2010 IEEE International Symposium on Circuits and Systems (ISCAS) |
| June 2008 | [Wafer-scale integration of analog neural networks](https://doi.org/10.1109/IJCNN.2008.4633828) | Johannes Schemmel, Johannes Fieres, Karlheinz Meier | 2008 IEEE International Joint Conference on Neural Networks (IJCNN) |
