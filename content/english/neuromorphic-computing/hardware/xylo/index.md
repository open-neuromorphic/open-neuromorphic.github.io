---
active_product: true
description: 'Explore  SynSense''s neuromorphic hardware: Xylo'
draft: false
image: xylo.png
organization:
  group_name: null
  org_logo: null
  org_name: SynSense
  org_website: null
  product_page_link: https://www.synsense.ai/products/xylo/
  social_media_links:
    linkedin: null
    twitter: null
    wikipedia: null
product:
  announced_date: null
  applications: Smart sensing
  chip_type: Digital
  neurons: 327000
  on_chip_learning: false
  power: ~5 mW
  release_date: null
  software: Rockpool
  status:
    announced: true
    released: true
    retired: true
  synapses: 278000
product_name: Xylo
summary: Xylo is a 28nm 1000 neuron digital spiking neural network inference chip
  optimized for ultra low power edge deployment of trained SNNs, with flexible architecture
  to map various network topologies.
title: Xylo - SynSense
type: neuromorphic-hardware
---

Xylo is a digital spiking neural network (SNN) inference processor developed by SynSense AG. It is designed to efficiently simulate leaky integrate-and-fire (LIF) neurons to implement deep spiking neural networks for edge processing applications.

Xylo is a series of ultra-low-power devices for sensory inference, featuring a digital SNN core adaptable to various sensory inputs like audio and bio-signals. Its SNN core uses an integer-logic CuBa-LIF neuron model with customizable parameters for each synapse and neuron, supporting a wide range of network architectures. The Xylo Audio 2 model (SYNS61201) specifically includes 8-bit synaptic weights, 16-bit synaptic and membrane states, two synaptic states per neuron, 16 input channels, 1000 hidden neurons, 8 output neurons with 8 output channels, a maximum fan-in of 63, and a total of 64,000 synaptic weights.
For more detailed technical information, see https://rockpool.ai/devices/xylo-overview.html.
The Rockpool toolchain contains quantizaton methods designed for Xylo, as well as bit-accurate simulations of Xylo devices.

## Overview

Xylo is an application-specific integrated circuit (ASIC) chip optimized specifically for SNN inference. Key features include:

- All-digital design using integer arithmetic for efficient simulation of LIF neuron dynamics 
- Supports up to 1000 LIF neurons with configurable synaptic and membrane time constants, thresholds and biases for each neuron
- 16 input channels and 8 output channels using asynchronous spiking events  
- Flexible network architecture including support for recurrent connectivity to map deep networks
- Ultra low power consumption, with 219 μW idle power and 93 μW dynamic inference power measured on audio classification application

The chip is fabricated in a 28nm CMOS process and occupies 6.5 mm2 die area. It can operate at clock frequencies up to 250 MHz.

## Architecture

The core of Xylo consists of a bank of 1000 digital LIF neurons. Each neuron maintains 16-bit synaptic and membrane state variables to accumulate inputs and determine spike times. Exponential state decay is efficiently approximated using bit shift operations parameterized by time constants. Additional hardware includes dense input weights, sparse recurrent weights, and linear output weights to map arbitrary network topologies. 

The input and output layers use asynchronous events to communicate spikes, avoiding the need to synchronize with an external clock. This event-based interface helps minimize total system power consumption. 

## Software Tools

Xylo leverages the Rockpool ecosystem for mapping and deploying SNNs. The Rockpool library and Python API abstract the SNN programming to high levels, enabling machine learning engineers to easily train networks using standard methods like backpropagation. A compiler handles mapping optimized networks onto the Xylo substrate. 

## Applications

The flexibility to implement generic deep network topologies makes Xylo suitable for a variety of edge deployments in domains such as audio, time series, and control. Example applications demonstrated include low power keyword spotting, biosignal classification, and robotic control. Ultra low idle and dynamic power consumption enables continuous background processing in power constrained environments.

## Related publications
| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| August 2022 | [Sub-mW Neuromorphic SNN audio processing applications with Rockpool and Xylo](https://arxiv.org/abs/2208.12991) | Hannah Bos, Dylan Muir | arXiv |
