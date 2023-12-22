---
active_product: true
description: 'Learn about BrainChip''s neuromorphic hardware: Akida'
type: neuromorphic-hardware
image: akida.png
organization:
  group_name: null
  org_logo: brainchip.png
  org_name: BrainChip
  org_website: https://brainchip.com/
  product_page_link: https://brainchip.com/akida-generations/
  social_media_links:
    linkedin: https://www.linkedin.com/company/brainchip-holdings-limited/
    twitter: https://twitter.com/BrainChip_inc
    wikipedia: https://en.wikipedia.org/wiki/BrainChip
product:
  announced_date: 29.01.2023
  applications: Smart sensing, one-shot learning
  chip_type: Digital
  neurons: Configurable
  on_chip_learning: true
  power: ~30 mW
  release_date: 29.01.2023
  software: MetaTF
  status:
    announced: true
    released: true
    retired: false
  synapses: 8-Mb SRAM
product_name: Akida
summary: BrainChip's Akida is an ultra-low-power neuromorphic processor inspired by
  the brain's neural architecture. It accelerates complex AI at the edge through event-based
  processing, on-chip learning abilities, and support for advanced neural networks
  like CNNs, RNNs & custom Temporal Event-based Nets.
title: Akida - BrainChip
---

## Overview
Inspired by the human brain's neural architecture, Akida aims to deliver high-performance artificial intelligence capabilities at the edge while being extremely energy efficient. 

The Akida processor is designed to accelerate neural networks including convolutional neural networks (CNNs), deep neural networks (DNNs), recurrent neural networks (RNNs) and Vision Transformers (ViTs) directly in hardware. A key feature is its support for a novel neural network architecture called Temporal Event-based Neural Nets (TENNs) which are optimized for processing complex time-series data efficiently.

Akida employs an event-based processing approach where computations are only performed when new sensory input is received, dramatically reducing the number of operations. This also enables event-based communication between processor nodes without CPU intervention. The architecture further supports on-chip learning, allowing models to adapt without having to connect to the cloud.

The second generation Akida platform adds capabilities such as support for 8-bit weights/activations, improved vision transformer acceleration, multi-pass sequential processing, and configurable local scratchpads to optimize memory access. It is designed to run larger neural networks across multiple chips while minimizing latency. 

Akida leverages standard machine learning frameworks like TensorFlow and development platforms like Edge Impulse for model training and deployment. BrainChip also provides complementary software tools like MetaTF to optimize models for the Akida hardware. Pre-built Akida-compatible models are also offered through a model zoo.

Akida targets applications spanning industrial automation, automotive, healthcare, consumer electronics and more. Use cases include predictive maintenance, in-cabin monitoring, vital sign prediction, home automation, surveillance and more. Its efficiency and on-device learning abilities aim to enable a new class of continuously adaptive, secure and private AI implementations at the edge.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| August 2023 | [Low Power & Low Latency Cloud Cover Detection in Small Satellites Using On-board Neuromorphic Processors](https://ieeexplore.ieee.org/abstract/document/10191569) | Chetan Kadway; Sounak Dey; Arijit Mukherjee; Arpan Pal; Gilles Bézard | IJCNN 2023 |
| August 2023 | [Neuromorphic Medical Image Analysis at the Edge](http://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1779206&dswid=-6143) | Ebba Bratman, Lucas Dow | Master's course project |
| October 2022 | [Detection of facial emotions using neuromorphic computation](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12226/122260E/Detection-of-facial-emotions-using-neuromorphic-computation/10.1117/12.2633707.short) | Teodoro Álvarez-Sánchez, Jesús A. Álvarez-Cedillo, Roberto Herrera-Charles | Applications of Digital Image Processing XLV |
