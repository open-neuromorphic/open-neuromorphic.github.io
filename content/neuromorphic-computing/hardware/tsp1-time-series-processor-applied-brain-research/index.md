---
active_product: true
title: "TSP1 - Applied Brain Research"
description: "Explore Time Series Processor 1 (TSP1) by Applied Brain Research, a Time Series Processor designed for ultra-low power edge AI applications featuring state-space network processing for real-time speech recognition and biosignal classification."
type: neuromorphic-hardware
image: tsp1.png
organization:
  group_name: null
  org_logo: abr.png
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
  announce_date: 2025-09-01 
  release_year: 2025
  release_date: "2025-09-21" # Placeholder
  interfaces: I2C, SPI, I2S, PDM, GPIO, UART
  package: 2.16mm x 3mm, 35-pin WLCSP package
  status:
    announced: true
    released: false
    retired: false
product_name: TSP1
summary: The TSP1 is a time-series, brain-inspired chip designed for ultra-low power edge AI applications, delivering full vocabulary speech recognition at <50mW, supporting state-space network processing for real-time time-series inference.

---


## Overview

The Applied Brain Research TSP1 is a time-series neural network accelerator designed to bring AI capabilities to battery-powered edge devices. The chip enables natural voice interfaces, biosignal classification, and other sensor signal processing applications with low power consumption. Based on ABR's patented state-space model processing technology, including the Legendre Memory Unit (LMU).

## Architecture

The TSP1 features a specialized architecture optimized for time-series processing:

**Processing Core:**
- High-efficiency neural processing element fabric based on ABR's proprietary state-space network architecture
- 32-bit RISC microcontroller unit (MCU) for control and preprocessing
- Supports up to 9 million 8-bit or 18 million 4-bit state-space neural network parameters
- Integrated weight memory and SRAM for on-chip model storage
- Secure on-chip non-volatile storage for networks and firmware

**Power and Performance:**
- Voltage range: VDD 1.65-3.6V with integrated 0.8V core DC-DC supply
- Keyword spotting trigger function: <2mW
- Full vocabulary speech recognition: <50mW
- Low latency inference for full vocabulary ASR: <120ms
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
