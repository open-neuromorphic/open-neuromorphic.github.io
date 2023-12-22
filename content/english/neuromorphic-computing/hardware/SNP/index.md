---
active_product: true
summary: The spiking neural processor is Innatera's ultra-low-power neuromorphic
  chip for real-time edge intelligence. Using spiking neural networks, it achieves
  under 1mW operation for sensor applications like always-on audio scene detection
  with 85% accuracy in under 1ms.
draft: false
image: snp.png
organization:
  group_name: null
  org_logo: innatera.png
  org_name: Innatera
  org_website: https://www.innatera.com/
  product_page_link: https://www.innatera.com/
  social_media_links:
    linkedin: https://www.linkedin.com/company/innatera/
    twitter: null
    wikipedia: null
product:
  announced_date: null
  applications: Smart sensing
  chip_type: Mixed-signal
  neurons: 256
  on_chip_learning: false
  power: ~1 mW
  release_date: null
  software: Talamo
  status:
    announced: true
    released: true
    retired: false
  synapses: 64000
product_name: SNP by Innatera
title: SNP by Innatera
---

The spiking neural processor (SNP) is a neuromorphic chip produced by Innatera, a semiconductor company based in Delft, Netherlands. The SNP is designed for ultra-low power edge intelligence applications where sensors need to process data in real-time under tight latency, power, and cost constraints. 

The SNP contains interfaces to connect various sensors such as radar, microphones, and ECGs. The analog/mixed-signal core of the SNP is a programmable multi-core crossbar array of spiking neurons and synapses that can be configured into customizable neural network topologies. This array provides the computation capability to run spiking neural networks (SNNs). SNNs differ from traditional neural networks in that their inputs and outputs are binary spike events over time rather than continuous values. 

To program the SNP, Innatera provides an SDK called Talamo that uses the PyTorch deep learning framework. This allows developers to build and train SNN models without needing specialized knowledge of neuromorphic hardware or SNN concepts. Talamo handles the translation of models into a format that can be deployed on the SNP while minimizing accuracy loss.

Key capabilities and specifications of the SNP include:
- Peak power consumption of ~1mW
- Millisecond latency for real-time inference
- On-chip MCU for data acquisition and pre-processing
- Model size up to 3KB
- Up to 85% accuracy demonstrated on audio scene classification 

The SNP is positioned as a single-chip solution for always-on sensing applications where tight constraints on power, latency, and cost are critical. Example applications include hearables/wearables and other battery-powered edge devices.
