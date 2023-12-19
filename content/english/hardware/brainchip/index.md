---
title: BrainChip
description:  BrainChip's Akida is an ultra-low-power neuromorphic processor inspired by the brain's neural architecture. It accelerates complex AI at the edge through event-based processing, on-chip learning abilities, and support for advanced neural networks like CNNs, RNNs & custom Temporal Event-based Nets.
active_product: True
product:
  chip_type: Digital
  neurons: Configurable
  synapses: 8-Mb SRAM
  on_chip_learning: True
  power: ~30 mW
  software: TensorFlow, CNN → SNN
  applications: Smart sensing, one-shot learning
  status:
    announced: true
    released: true
    retired: true
  announced_date:
  release_date:
image: brainchip.png
organization:
- org_name: BrainChip
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
Akida is a neuromorphic processor developed by BrainChip Holdings Ltd. Inspired by the human brain's neural architecture, Akida aims to deliver high-performance artificial intelligence capabilities at the edge while being extremely energy efficient. 

The Akida processor is designed to accelerate neural networks including convolutional neural networks (CNNs), deep neural networks (DNNs), recurrent neural networks (RNNs) and Vision Transformers (ViTs) directly in hardware. A key feature is its support for a novel neural network architecture called Temporal Event-based Neural Nets (TENNs) which are optimized for processing complex time-series data efficiently.

Akida employs an event-based processing approach where computations are only performed when new sensory input is received, dramatically reducing the number of operations. This also enables event-based communication between processor nodes without CPU intervention. The architecture further supports on-chip learning, allowing models to adapt without having to connect to the cloud.

The second generation Akida platform adds capabilities such as support for 8-bit weights/activations, improved vision transformer acceleration, multi-pass sequential processing, and configurable local scratchpads to optimize memory access. It is designed to run larger neural networks across multiple chips while minimizing latency. 

Akida leverages standard machine learning frameworks like TensorFlow and development platforms like Edge Impulse for model training and deployment. BrainChip also provides complementary software tools like MetaTF to optimize models for the Akida hardware. Pre-built Akida-compatible models are also offered through a model zoo.

Akida targets applications spanning industrial automation, automotive, healthcare, consumer electronics and more. Use cases include predictive maintenance, in-cabin monitoring, vital sign prediction, home automation, surveillance and more. Its efficiency and on-device learning abilities aim to enable a new class of continuously adaptive, secure and private AI implementations at the edge.
