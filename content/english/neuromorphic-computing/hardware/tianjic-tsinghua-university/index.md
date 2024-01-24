---
active_product: false
description: 'Learn about Tsinghua University''s neuromorphic hardware: Tianjic'
type: neuromorphic-hardware
image: tianjic.jpg
organization:
  group_name: null
  org_logo: tsinghua.png
  org_name: Tsinghua University
  org_website: https://www.tsinghua.edu.cn/en/index.htm
  product_page_link: null
  social_media_links:
    linkedin: https://www.linkedin.com/school/tsinghua-university/
    twitter: null
    wikipedia: https://en.wikipedia.org/wiki/Tsinghua_University
product:
  announced_date: 2015-08-01
  applications: ANN/SNN acceleration
  chip_type: Digital
  neurons: 40k
  weight_bits: null
  activation_bits: null
  on_chip_learning: false
  power: ~1 W
  release_date: 2015-08-01
  release_year: 2015
  software: Custom
  status:
    announced: true
    released: true
    retired: false
  synapses: 10 million
product_name: Tianjic
summary: Tianjic supports both spiking and non-spiking models. Its motivation is to
  enable hybrid networks that blend biological plausibility from neuroscience with
  predictive accuracy from deep learning.
title: Tianjic - Tsinghua University
---

Tianjic is a unified neural network chip architecture proposed in 2019 that aims to efficiently support both spiking neural networks (SNNs) from the neuromorphic computing field and artificial neural networks (ANNs) commonly used in deep learning. It was unveiled by a team of researchers from Tsinghua University in Beijing, led by Professor Luping Shi.

The motivation behind Tianjic was to create a single chip architecture that could run models from both the SNN and ANN paradigms in order to better explore potential synergies between neuroscience and machine learning research. Prior specialized hardware platforms for SNNs and ANNs relied on very distinct compute, memory, and communication designs making it challenging to examine hybrid approaches that combine biological plausibility and predictive accuracy. 

The Tianjic architecture consists of five key building blocks - a hybrid activation buffer, local synapse memory, shared integration engine, nonlinear transformation unit, and network connectors. It supports six core vector/matrix operations used across neuromorphic and deep learning models as well as several neuronal transformation functions. Multiple optimizations are incorporated including near-memory computing, input data sharing, computational skipping of zero activations/weights, and inter-group pipelining to improve performance and efficiency.

The architecture enables flexible homogeneous networks of either SNNs or ANNs as well as heterogeneous networks that combine both spiking and non-spiking elements, referred to as a hybrid paradigm. The neurons can be independently configured to receive spiking or non-spiking inputs and produce spiking or non-spiking outputs. The routing infrastructure seamlessly propagates both spike and activation events.

A proof-of-concept 28nm prototype chip was fabricated and achieved over 610GB/s internal memory bandwidth. In evaluations against GPUs and other specialized neuromorphic and deep learning accelerators using a range of SNN and ANN benchmarks, Tianjic demonstrated significant gains in throughput and power efficiency. Two small examples also highlighted the potential of the hybrid paradigm - controlling a bicycle robot with a mix of SNN and ANN networks and improving SNN scaling through partial integration in higher precision ANN format.

The researchers believe the unified architecture of Tianjic opens up new research directions into hybrid neural networks that blend aspects of neuroscience and machine learning models. The chip aims to enable exploration of more biologically plausible yet highly accurate networks for artificial intelligence.


## Related publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| August 2015 | [Tianjic: A Unified and Scalable Chip Bridging Spike-Based and Continuous Neural Computation](https://ieeexplore.ieee.org/document/8998338) | Lei Deng; Guanrui Wang; Guoqi Li; Shuangchen Li; Ling Liang; Maohua Zhu; Yujie Wu; Zheyu Yang; Zhe Zou; Jing Pei; Zhenzhi Wu; Xing Hu; Yufei Ding; Wei He; Yuan Xie; Luping Shi | IEEE Journal of Solid-State Circuits |
