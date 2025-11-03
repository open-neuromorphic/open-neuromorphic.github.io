---
active_product: true
title: "TSP1 - Applied Brain Research"
description: "Explore TSP1 by Applied Brain Research, a neuromorphic time series processor designed for ultra-low power edge AI applications featuring state-space network processing for real-time speech recognition and biosignal classification."
type: neuromorphic-hardware
image: tp1.jpg
organization:
  group_name: null
  org_logo: abr.jpg
  org_name: Applied Brain Research
  org_website: https://www.appliedbrainresearch.com/
  product_page_link: https://www.appliedbrainresearch.com/product
  social_media_links:
    linkedin: https://www.linkedin.com/company/applied-brain-research/
    twitter: https://x.com/abr_inc
    wikipedia: null
product:
  applications: Edge AI, Voice Recognition, Biosignal Classification, Smart Home, Wearables, AR/VR, Industrial IoT, Smart Medical Devices
  synapses: Up to 9M 8-bit/18M 4-bit state space neural network parameters
  weight_bits: "4-bit or 8-bit"
  on_chip_learning: false
  power: <2mW (keyword spotting), <50mW (full vocabulary speech recognition)
  release_year: 2025
  release_date: 2025-11-15
  announce_date: 2024-09-09
  software: NengoEdge
  interfaces: I2C, SPI, I2S, PDM, GPIO, UART
  package: 2.16mm x 3mm, 35-pin WLCSP package
  status:
    announced: true
    released: true
    retired: false
product_name: TSP1
summary: The TSP1 is a time-series neural network accelerator chip designed for ultra-low power edge AI applications, delivering full vocabulary speech recognition at 100x lower power than traditional edge GPU solutions while supporting state-space network processing for real-time time-series inference.

---


## Overview

The Applied Brain Research TSP1 is a groundbreaking time-series neural network accelerator designed to bring advanced AI capabilities to battery-powered edge devices. The chip enables natural voice interfaces, biosignal classification, and other sensor signal processing applications with unprecedented power efficiency. Based on ABR's patented state-space model processing technology, including the Legendre Memory Unit (LMU), the TSP1 represents a paradigm shift in how time-series data is processed at the edge.

The TSP1 was publicly demonstrated in September 2024 as the world's first self-contained single-chip solution for full vocabulary automatic speech recognition, showcasing both English and Mandarin implementations. The chip delivers 100x lower power consumption compared to edge GPU solutions while supporting AI models 10-100x larger than other low-power edge AI hardware.

## Architecture

The TSP1 features a specialized architecture optimized for time-series processing:

**Processing Core:**
- High-efficiency neural network processing element fabric based on ABR's proprietary state-space network architecture
- 32-bit RISC microcontroller unit (MCU) for control and preprocessing
- Supports up to 9 million 8-bit or 18 million 4-bit state-space neural network parameters
- Integrated weight memory and SRAM for on-chip model storag
- Secure on-chip non-volatile storage for networks and firmware

**Power and Performance:**
- Voltage range: VDD 1.65-3.6V with integrated 0.8V core DC-DC supply
- Keyword spotting trigger function: <2mW
- Full vocabulary speech recognition: <50mW
- Low latency inference: <20ms
- Integrated low-power PMU and clock management

**Interfaces:**
- Up to 4 stereo audio inputs
- One TDM streaming output
- SPI and I2C master interfaces for sensor integration
- I2C and SPI target interface for host CPU communication
- Multiple programmable GPIO pins
- UART support

**Package Options:**
- 42-pin WLCSP (0.5mm pitch)
- 44-pin QFN package
