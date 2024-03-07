---
active_product: true
description: 'Learn about Charlotte Frenkel''s neuromorphic hardware: ODIN'
type: neuromorphic-hardware
image: odin.png
organization:
  group_name: null
  org_logo: null
  org_name: Charlotte Frenkel
  org_website: null
  product_page_link: https://github.com/ChFrenkel/ODIN/
  social_media_links:
    linkedin: https://www.linkedin.com/in/cfrenkel/
    twitter: https://twitter.com/C_Frenkel/
    wikipedia: null
product:
  announced_date: 2019-01-01
  applications: General-purpose experimentation platform for bio-inspired edge computing.
  chip_type: Digital
  neurons: 256
  synapses: 256
  weight_bits: 3 bits (+ 1 bit of mapping table)
  activation_bits: null
  on_chip_learning: true
  power: 30µW - 1mW
  release_year: 2019
  release_date: 2019-01-01
  software: null
  status:
    announced: true
    released: true
    retired: false
product_name: ODIN
summary: The ODIN 256-neuron 64k-synapse neuromorphic processor highlights how design constraints on the synapses can be released by offloading most synaptic computations at the neuron level. All synapses embed spike-driven synaptic plasticity (SDSP), while neurons are able to phenomenologically reproduce the 20 Izhikevich behaviors of cortical spiking neurons. At the time of publication, ODIN demonstrated the highest synaptic density, and the lowest energy per synaptic operation among digital designs. ODIN was fabricated in 28nm CMOS and can be prototyped in small FPGAs.
title: Odin - Charlotte Frenkel
---

## Overview
ODIN is the first fully open-source neuromorphic chip, with the highest synaptic density (incl. online learning) at the time of publication. ODIN is based on a single 256-neuron 64k-synapse crossbar neurosynaptic core, fabricated in 28nm FDSOI CMOS. It serves as a general-purpose experimentation platform for bio-inspired edge computing. The Verilog source files and the documentation are available at https://github.com/ChFrenkel/ODIN/ (see also https://github.com/ChFrenkel/tinyODIN/ for a simplified low-footprint version containing only LIF neurons and without synaptic plasticity). The chips are not available, but ODIN can be deployed on small-scale FPGAs. Multiple cores can be instantiated, but ODIN does not contain a NoC toward large-scale integration.


## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| November 2018 | [A 0.086-mm² 12.7-pJ/SOP 64k-Synapse 256-Neuron Online-Learning Digital Spiking Neuromorphic Processor in 28-nm CMOS](https://ieeexplore.ieee.org/document/8528875) | C. Frenkel, M. Lefebvre, J.-D. Legat and D. Bol | IEEE Transactions on Biomedical Circuits and Systems |
