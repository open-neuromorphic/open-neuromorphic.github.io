--- 
title: "μBrain - Ultra-Low Power Neuromorphic Processing"
product_name: "μBrain"
description: "Explore μBrain by IMEC, a clockless, event-driven chip that merges memory with computation to achieve sub-100 μW power consumption, making it ideal for always-on edge IoT applications."
image: "hardware-image.png"
draft: false
active_product: true
type: "neuromorphic-hardware"
category: "uncategorized"

organization:
  group_name: "IMEC"
  org_logo: "imec-logo.png"
  org_name: "IMEC"
  org_website: "https://www.imec-int.com/en/articles/imecs-snn-chip-combines-low-latency-energy-consumption-high-inference-accuracy"
  product_page_link: "https://www.imec-int.com/en/articles/imecs-snn-chip-combines-low-latency-energy-consumption-high-inference-accuracy"
  social_media_links: {}

product:
  announced_date: "2021-01-01"
  applications: "Edge IoT"
  chip_type: "Digital"
  interfaces: "N/A"
  neurons: "336"
  synapses: "37,366"
  weight_bits: "4 bits"
  activation_bits: "N/A"
  on_chip_learning: false
  power: "100 μW"
  release_year: 2021
  release_date: "2021-01-01"
  software: "None (Proprietary IP)"
  status:
    announced: true
    released: true
    retired: false
summary: "μBrain is a clockless, event-driven neuromorphic integrated circuit (IC) from IMEC, designed for ultra-low power edge AI IoT devices, achieving sub-100 μW consumption by merging memory and computation."
--- 

## Overview
μBrain is a highly efficient neuromorphic integrated circuit (IC) specifically tailored for edge AI IoT devices, operating on less than 100 μW of power. Although built with standard, low-cost digital technology, it breaks away from conventional digital neuromorphic designs by offering three major architectural advantages:

*   **Asynchronous, Event-Driven Operation:** It eliminates the global clock entirely. Instead, μBrain utilizes local, on-demand oscillators and an innovative delay-cell mechanism to process data dynamically as events occur.
*   **Extreme Idle Efficiency:** When there is no incoming data, the system consumes nothing but minimal leakage power. Even in this dormant state, it securely maintains its full internal state—including synaptic weights, network dynamics, and neuron membrane potentials.
*   **Co-localized Memory and Computing:** By merging computation and memory within the same physical space on the chip, μBrain removes the need for separate on-chip or off-chip memory blocks. This completely avoids the data-access bottlenecks and heavy energy overheads associated with traditional Von Neumann architectures.

## Architecture
μBrain is a clockless, event-driven chip that merges memory with computation. It utilizes local, on-demand oscillators and an innovative delay-cell mechanism to process data dynamically as events occur. It features 336 neurons and 37,366 synapses (4 bits).

## Software and Tools
No specific software or SDK was provided for μBrain; it is an IMEC proprietary IP.

## Related Publications
*   Stuijt, J., Sifalakis, M., Yousefzadeh, A., & Corradi, F. (2021). μBrain: An event-driven and fully synthesizable architecture for spiking neural networks. Frontiers in neuroscience, 15, 664208.
*   EMS163509.pdf (IMEC private research exploiting μBrain IP).
