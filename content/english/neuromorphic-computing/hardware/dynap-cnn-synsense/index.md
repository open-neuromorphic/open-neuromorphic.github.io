---
active_product: true
description: 'Learn about SynSense''s neuromorphic hardware: DynapCNN'
type: neuromorphic-hardware
image: dynapcnn.png
organization:
  group_name: null
  org_logo: synsense.png
  org_name: SynSense
  org_website: https://www.synsense.ai/
  product_page_link: https://www.synsense.ai/products/dynap-cnn/
  social_media_links:
    linkedin: https://www.linkedin.com/company/synsense-neuromorphic/
    twitter: https://twitter.com/SynSenseNeuro
    wikipedia: null
product:
  announced_date: 2019-04-20
  applications: Smart vision processing
  chip_type: Digital
  neurons: 1M
  weight_bits: 8bit ints
  activation_bits: 1 bit spikes, 16bit neurons
  on_chip_learning: false
  power: ~5 mW
  release_date: 2019-04-20
  release_year: 2019
  software: Sinabs, Samna
  status:
    announced: true
    released: true
    retired: false
  synapses: >50G CNN, ~2M fully-connected
product_name: DynapCNN
summary: The DynapCNN is an ultra-low power, event-driven neuromorphic processor chip for spiking neural networks that achieves sub-milliwatt computation using in-memory techniques. With 1M neurons, it can implement convolutional network models like LeNet and ResNet, interfacing directly to sensors like DVS cameras for low-latency, always-on vision applications.
title: DynapCNN - SynSense
---

The DynapCNN is an ultra-low power event-driven neuromorphic processor chip designed for implementing spiking convolutional neural networks (SCNNs). It was developed by SynSense AG, a neuromorphic engineering startup based in Zurich, Switzerland.

## Overview

The DynapCNN chip contains 1 million spiking integrate-and-fire neurons and is fully configurable for implementing different SCNN architectures. It utilizes in-memory computing techniques to perform sparse, event-driven neural network computations, enabling extremely low power consumption in the sub-milliwatt range.

It comprises 9 layers of convolution combined with pooling, which can be freely connected to each other. The layers can additionally be operated as dense fully connected layers for last layer classification.

The chip has a dedicated interface for connecting to dynamic vision sensors (DVS), such as the DAVIS sensor. This allows it to receive input spike streams directly without any pre-processing, reducing latency. It can support various types of convolutional network layers like convolutional, ReLU, pooling, etc., as well as popular network models like LeNet, ResNet, and Inception.

The DynapCNN has a digital architecture and integrates synthesizable digital logic, making it scalable across technology nodes. Multiple chips can be daisy-chained together to build deeper multi-chip networks.

## Development

The DynapCNN was developed by SynSense AG, a neuromorphic AI startup based in Zurich, Switzerland. The chip's architecture and circuits were designed to optimize performance, power, and area, specifically for ultra-low power SCNN inferencing, rather than for general-purpose computing.

The hardware interfaces with a software framework called SINABS (https://github.com/synsense/sinabs) developed by SynSense for converting deep learning models from frameworks like Keras and PyTorch into equivalent SCNNs. It also integrates with the Samna middleware (https://pypi.org/project/samna/), which handles interfacing the chip with sensors and visualization.

## Applications

The ultra-low latency and power consumption of the DynapCNN make it suitable for embedded and edge applications like:

- Computer vision 
- Robotics
- Internet-of-Things devices
- Autonomous vehicles
- Drones and other mobile platforms

A face recognition application for DVS cameras was demonstrated running on the DynapCNN at extremely low average power (<1mW). Such always-on vision applications are ideally suited for the event-driven capabilities of the chip.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| June 2019 | [Live Demonstration: Face Recognition on an Ultra-Low Power Event-Driven Convolutional Neural Network ASIC](https://openaccess.thecvf.com/content_CVPRW_2019/html/EventVision/Liu_Live_Demonstration_Face_Recognition_on_an_Ultra-Low_Power_Event-Driven_Convolutional_CVPRW_2019_paper.html) | Qian Liu, Ole Richter, Carsten Nielsen, Sadique Sheik, Giacomo Indiveri, Ning Qiao | CVPR 2019 |
