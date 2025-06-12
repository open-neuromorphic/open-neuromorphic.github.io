---
active_product: true
description: "Learn about SynSense's neuromorphic hardware: Speck"
type: neuromorphic-hardware
image: speck.jpg
organization:
  group_name: null
  org_logo: ../xylo/synsense.png
  org_name: SynSense
  org_website: https://www.synsense.ai/
  product_page_link: https://www.synsense.ai/products/speck/
  social_media_links:
    linkedin: https://www.linkedin.com/company/synsense-neuromorphic/
    twitter: https://twitter.com/SynSenseNeuro
    wikipedia: null
product:
  announced_date: 2019-01-08
  applications: Smart sensing
  chip_type: Digital, with analog sensor
  neurons: 328K
  synapses: '>6.16G CNN, ~278K fully-connected'
  weight_bits: 8bit ints
  activation_bits: 16bit (neuron)
  on_chip_learning: false
  power: ~5 mW
  release_date: 2022-11-30
  release_year: 2022
  software: Sinabs, Samna
  status:
    announced: true
    released: true
    retired: false
product_name: Speck
summary: Speck is a fully event-driven neuromorphic vision SoC. Speck is able to support large-scale spiking convolutional neural network (sCNN) with a fully asynchronous chip architecture. Speck is fully configurable with the spiking neuron capacity of 328K. Furthermore, it integrates the state-of-art dynamic vision sensor (DVS) that enables fully event-driven based, real-time, highly integrated solution for varies dynamic visual scene. For classical applications, Speck can provide intelligence upon the scene at only mWs with a latency of 3.36us for a single event processed by a 9 layer network.
title: Speck - SynSense
---

The Speck is an ultra-low power event-driven neuromorphic processor combined with an event-driven vision sensor on a single chip. It was developed by SynSense AG, a neuromorphic engineering startup based in Zurich, Switzerland.

## Overview
The Speck chip contains 328K spiking integrate-and-fire neurons and is fully configurable for implementing different SCNN architectures. It utilizes in-memory computing techniques to perform sparse, event-driven neural network computations, enabling extremely low power consumption in the sub-milliwatt range.

It comprises 9 layers of convolution combined with pooling, that can be freely connected to each other. The layers can additionally be operated as dense fully connected layers for last layer classification.
It has additional input preprocessing and decision readout blocks to make it out-of-the-box integratable in diverse environments and use cases.

The chip has a dynamic vision sensor (DVS). This allows it to receive input spike streams directly without ever leaving the chip, reducing latency. It can support various types of convolutional network layers like convolutional, ReLU, pooling, etc., as well as popular network models like LeNet, ResNet, and Inception.

## Development
The Speck was developed by SynSense AG, a neuromorphic AI startup based in Zurich, Switzerland. The chip's architecture and circuits were designed to optimize performance, power, and area specifically for ultra-low power SCNN inferencing rather than general-purpose computing.

The hardware interfaces with a software framework called SINABS (https://github.com/synsense/sinabs) developed by SynSense for converting deep learning models from frameworks like Keras and PyTorch into equivalent SCNNs. It also integrates with the Samna (https://pypi.org/project/samna/) middleware which handles interfacing the chip to sensors and visualization.

## Applications
The ultra-low latency and power consumption of the Speck make it suitable for embedded and edge applications like:

- Computer vision
- Robotics
- Internet-of-Things devices
- Autonomous vehicles
- Drones and other mobile platforms

A face recognition application for DVS cameras was demonstrated running on the Speck at extremely low average power (<1mW). Such always-on vision applications are ideally suited for the event-driven capabilities of the chip.

## Related publications

| Date       | Title                                                                                                                                                                                                                   | Authors                                                                                   | Venue/Source                |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|-----------------------------|
| April 2022 | [Speck: A Smart event-based Vision Sensor with a low latency 327K Neuron Convolutional Neuronal Network Processing Pipeline](https://arxiv.org/abs/2304.06793)                                                        | Ole Richter, Yannan Xing, Michele De Marchi, Carsten Nielsen, Merkourios Katsimpris, Roberto Cattaneo, Yudi Ren, Qian Liu, Sadique Sheik, Tugba Demirci, Ning Qiao | arxiv (temporarily unavailable) |
| June 2019 | [Live Demonstration: Face Recognition on an Ultra-Low Power Event-Driven Convolutional Neural Network ASIC](https://openaccess.thecvf.com/content_CVPRW_2019/html/EventVision/Liu_Live_Demonstration_Face_Recognition_on_an_Ultra-Low_Power_Event-Driven_Convolutional_CVPRW_2019_paper.html) | Qian Liu, Ole Richter, Carsten Nielsen, Sadique Sheik, Giacomo Indiveri, Ning Qiao | CVPR 2019 |
