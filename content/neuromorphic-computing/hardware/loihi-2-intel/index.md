---
active_product: true
description: 'Learn about Intel''s neuromorphic hardware: Loihi 2'
type: neuromorphic-hardware
image: loihi2.png
organization:
  group_name: null
  org_logo: ../loihi/intel.png
  org_name: Intel
  org_website: https://www.intel.com/content/www/us/en/research/neuromorphic-computing.html
  product_page_link: https://www.intel.com/content/www/us/en/research/neuromorphic-computing.html
  social_media_links:
    linkedin: https://www.linkedin.com/company/intel-corporation/
    twitter: https://twitter.com/intel
    wikipedia: null
product:
  announced_date: 2021-10-01
  applications: Research
  chip_type: Digital
  neurons: 1 million
  synapses: 120 million max
  weight_bits: <= 32-bit
  activation_bits: null
  on_chip_learning: true
  power: ~1 W
  release_year: 2021
  release_date: 2021-10-01
  software: Lava
  status:
    announced: true
    released: true
    retired: false
product_name: Loihi 2
summary: Loihi 2 is Intel's latest neuromorphic research chip, implementing spiking
  neural networks with programmable dynamics, modular connectivity, and optimizations
  for scale, speed, and efficiency. Early research demonstrates promise for low-latency
  intelligent signal processing.
title: Loihi 2 - Intel
---

The Loihi 2 chip by Intel consists of 6 embedded microprocessor cores (Lakemont x86) and 128 fully asynchronous neuron cores (NCs) connected by a network-on-chip. The NCs are optimized for neuromorphic workloads by implementing a group of spiking neurons and including all synapses connected to such neurons. All the communication between NCs is in the form of spike messages. Microprocessor cores are optimized for spike-based communication and execute standard C code to assist with data I/O as well as network configuration, management and monitoring. Some of the new functionalities added in this second version of the Loihi chip are the possibility of implementing custom neuron models using microcode instructions (assembly), the option to generate and transmit graded spikes, and support for three-factor learning rules. A single Loihi 2 chip supports up to 1 million neurons and 120 million synapses.
Together with Loihi 2, Intel presented their open-source framework Lava, that allows users to write neuro-inspired applications and map them to both traditional and neuromorphic hardware. Using high-level Python APIs, users can describe their neural networks, which are then compiled to run on the requested backend. Currently, Lava supports deployment on traditional CPU and Loihi 2. Specifically for Loihi 2, Lava also gives the possibility of writing custom neuron models in assembly to be run on the NCs, and custom C code to be run in the LMTs. 


## Overview
Loihi 2 is the latest generation spiking neural network processor from Intel Labs, succeeding the Loihi chip. Neuromorphic hardware seeks to achieve scales of neural complexity approaching the brain by utilizing architectural inspiration from neuroscience. This includes spiking dynamics, sparse connectivity, and asynchronous event-driven communication. Loihi 2 enhances its predecessor to expand the computational capacities and efficiency of silicon neuromorphic systems for real-time intelligent processing.
Notable features include a programmable neuron model, graded spike events (up to 32-bits vs. 1-bit) and asynchronous networking to connect multiple Loihi 2 chips together in several form-factors.

## Architecture
The Loihi 2 architecture comprises 128 neural cores, 6 embedded processors, and an asynchronous network-on-chip that supports multi-chip scaling. The neural cores are fully programmable digital signal processors optimized for emulating biological neural dynamics with specialized memory structures for network connectivity. 

Beyond fixed leaky integrate-and-fire, the cores now support user-defined arithmetic and logic to specify arbitrary spiking behaviors. These include various resonance, adaptation, threshold, and reset functions for more complex and nonlinear temporal representations. Program length, variable allocation, and numerical precision balance model complexity, neuron capacity, and energy costs.

To communicate results, Loihi 2 neurons output graded spikes encoding integer data payloads. Optimized connectivity schemes leverage sparsity and enable convolution, procedural generation, and factorized weight sharing to radically improve synapse memory efficiency. On-chip synapse state also supports programmable spike-timing based plasticity rules.

Redesigned asynchronous digital circuits, optimized down to standard cell pipelines, yield up to 10x faster spike processing over Loihi. Together with a denser process technology, this expands the algorithms and application workloads addressable by one or more Loihi 2 chips in real time.

Loihi 2 is also the first Intel product fabricated with the Intel 4 process, offering an increased transistor count over the original Loihi at half of the die area.

## Applications
Research applying Loihi 2’s capabilities toward intelligent sensing and processing tasks has demonstrated promising directions. Spatiotemporal resonance enables efficient event-based optical flow estimation. Cascaded auditory models exploit self-organization for noise-invariant spike encoders. Broadly, the architecture facilitates spike-based solutions optimized for efficiency metrics spanning latency, throughput, and power.

One approach implements resonant and fire neurons to approximate spectrograms from audio inputs. Rather than fixed windowing, the neurons intrinsically resonate to the strongest spectral components. Their modulated sparse spike outputs encode the short-time Fourier spectrum over 47x more efficiently. Extensions integrate learned classification on top, processing directly from spike streams.

Other work explored spatiotemporal resonance for estimating optical flow from event cameras. Configured as a motion energy filter bank, resonant neural grids measure responses tuned to different local motion speeds and directions. Compared to deep neural networks, this brain-inspired approach reduces computation by over 90x while improving accuracy.

Researchers have also demonstrated training hybrid spiking networks on Loihi 2 through backpropagation with SLAYER. Initial speech recognition experiments show competitive accuracies on spike-based auditory datasets using reservoirs of resonant and leaky integrate-and-fire neurons. Extensions to layerwise trained recurrent SNNs on more complex benchmarks are ongoing.

Beyond sensing, Loihi 2 can replicate ring attractor networks modeling the auditory cortex using coupled Hopf resonators. Quantized by downstream neurons, cascaded sections adapt their tuning curves to automatically gain normalize inputs across frequencies. This achieves robust amplitude-invariant spike encodings similar to biological cochleas.

Most recently, several works investigate applying Loihi 2 hardware into on-board satellite processing tasks.

## Related Publications
Intel's Neuromorphic Research Community (INRC) maintains a [list of publications](https://intel-ncl.atlassian.net/wiki/spaces/INRC/pages/76382230/INRC+Publications) making use of both generations of Loihi hardware.
We list a select few works demonstrating results on Loihi 2 hardware, below.

| Date           | Title                                                                                                                                                                                 | Authors                                                                                                                                              | Venue/Source                               |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| October 2023   | [Efficient Video and Audio processing with Loihi 2](https://arxiv.org/abs/2310.03251)                                                                                                 | Sumit Bam Shrestha, Jonathan Timcheck, Paxon Frady, Leobardo Campos-Macias, Mike Davies                                                              | arXiv Preprint                             |
| August 2023    | [Implementing and Benchmarking the Locally Competitive Algorithm on the Loihi 2 Neuromorphic Processor](https://dl.acm.org/doi/abs/10.1145/3589737.3605973)                           | Gavin Parpart, Sumedh R Risbud, Garret T Kenyon, Yijing Watkins                                                                                      | ICONS 23                                   |
| August 2023    | [Energy-Efficient On-Board Radio Resource Management for Satellite Communications via Neuromorphic Computing](https://arxiv.org/abs/2308.11152)                                       | Flor Ortiz, Nicolas Skatchkovsky, Eva Lagunas, Wallace A. Martins, Geoffrey Eappen, Saed Daoud, Osvaldo Simeone, Bipin Rajendran, Symeon Chatzinotas | arXiv Preprint                             |
| July 2023      | [Bio-realistic Neural Network Implementation on Loihi 2 with Izhikevich Neurons](https://arxiv.org/abs/2307.11844)                                                                    | Recep Buğra Uludağ, Serhat Çağdaş, Yavuz Selim İşler, Neslihan Serap Şengör, Ismail Akturk                                                           | arXiv Preprint                             |
| May 2022       | [Efficient Neuromorphic Signal Processing with Resonator Neurons](https://link.springer.com/article/10.1007/s11265-022-01772-5)                                                       | E. Paxon Frady, Sophia Sanborn, Sumit Bam Shrestha, Daniel Ben Dayan Rubin, Garrick Orchard, Friedrich T. Sommer, Mike Davies                        | Journal of Signal Processing Systems       |
| October 2021   | [Efficient Neuromorphic Signal Processing with Loihi 2](https://ieeexplore.ieee.org/abstract/document/9605018)                                                                        | Garrick Orchard, E. Paxon Frady, Daniel Ben Dayan Rubin, Sophia Sanborn, Sumit Bam Shrestha, Friedrich T. Sommer, Mike Davies                        | IEEE Workshop on Signal Processing Systems |
| September 2021 | [Taking Neuromorphic Computing to the Next Level with Loihi 2](https://www.intel.com/content/www/us/en/newsroom/news/intel-unveils-neuromorphic-loihi-2-lava-software.html#gs.4j6lg6) | No author listed (summary of Loihi 2 system)                                                                                                         | Intel Technology Brief                     |

## Availability
Loihi 2 hardware is not widely available for purchase, however researchers can apply to become a member of the [INRC](https://intel-ncl.atlassian.net/wiki/spaces/INRC/overview) and for access to Loihi hardware.
