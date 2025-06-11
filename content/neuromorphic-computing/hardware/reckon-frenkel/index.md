---
active_product: true
description: 'Learn about Charlotte Frenkel''s neuromorphic hardware: ReckOn'
type: neuromorphic-hardware
image: reckon.png
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
  announced_date: 2022-02-01
  applications: Task-agnostic learning over second-long timescales at the extreme edge 
  chip_type: Digital
  neurons: 256
  synapses: 256
  weight_bits: 8
  activation_bits: 16
  on_chip_learning: true
  power: 20µW - 150µW (from real-time to accelerated-time learning) at 0.5V
  release_year: 2022
  release_date: 2022-02-01
  software: null
  status:
    announced: true
    released: true
    retired: false
product_name: ReckOn
summary: ReckOn demonstrates, for the first time, end-to-end on-chip learning over second-long timescales (no external memory accesses, no pre-training). It is based on a bio-inspired alternative to backpropagation through time (BPTT), the e-prop training algorithm, which has been modified to reduce the memory overhead required for training to only 0.8% of the equivalent inference-only design. This allows for a low-cost solution with a 0.45-mm² core area and a <50-µW power budget at 0.5V for real-time learning in 28-nm FDSOI CMOS, which is suitable for an always-on deployment at the extreme edge. Furthermore, similarly to the brain, ReckOn exploits the sensor-agnostic property of spike-based information. Combined with code-agnostic e-prop-based training, this leads to a task-agnostic learning chip that is demonstrated on vision, audition and navigation tasks. 
title: ReckOn - Charlotte Frenkel
---

## Overview
ReckOn, a spiking recurrent neural network (RNN) processor, enables on-chip learning over second-long timescales using a modified e-prop algorithm. Developed by Charlotte Frenkel at the Institute of Neuroinformatics, and fabricated in 28-nm FDSOI CMOS, it was presented at the 2022 IEEE International Solid-State Circuits Conference (ISSCC), marking it as the first spiking neuromorphic chip at this forum. Distinctively, ReckOn demonstrates on-device learning for extended durations on real-world tasks without external memory, a notable advancement in neuromorphic computing. The processor is fully open-source and has been applied in gesture recognition, keyword spotting, and navigation, adaptable to various spike-encoded sensory modalities. While the actual chips are not commercially available, ReckOn can be implemented on small-scale FPGAs. The design, primarily self-contained with input and output layers, does not support multi-core large-scale integrations but can be adapted for such purposes. Documentation and Verilog source files are accessible at https://github.com/ChFrenkel/ReckOn/.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| March 2022 | [ReckOn: A 28nm sub-mm² task-agnostic spiking recurrent neural network processor enabling on-chip learning over second-long timescales](https://ieeexplore.ieee.org/document/9731734) | C. Frenkel and G. Indiveri | IEEE International Solid-State Circuits Conference (ISSCC) |
