---
title: "ADA - Neucom"
description: "Neucom's ADA is a programmable neuromorphic processor for event-based vision preprocessing, using interval-coded computation to process DVS streams at sub-milliwatt power with sub-millisecond latency."
image: "ada.png"
active_product: true
type: "neuromorphic-hardware"

organization:
  group_name: null
  org_logo: "neucom.png"
  org_name: "Neucom"
  org_website: "https://www.neucom.ai"
  product_page_link: "https://www.neucom.ai"
  social_media_links:
    linkedin: "https://www.linkedin.com/company/neucom-dk"
    twitter: null
    wikipedia: null

product:
  announced_date: "2025-11-01"
  applications: "Event-based Vision, Robotics, Automotive, AR/VR, Industrial IoT"
  chip_type: "Digital"
  synapses: 256k
  neurons: 32k
  on_chip_learning: false
  interfaces: UART, AER, SPI

  power: "Sub-milliwatt"
  release_year: 2026
  software: "Axon SDK"
  status:
    announced: true
    released: false
    retired: false
summary: "ADA (Asynchronous Dataflow Architecture) is a reconfigurable neuromorphic processor designed to preprocess event streams from dynamic vision sensors. It uses interval-coded neural computation to handle sparse, asynchronous data natively, targeting the preprocessing bottleneck in event-based perception systems."
---

## Overview

ADA (Asynchronous Dataflow Architecture) is a neuromorphic processor developed by Neucom to address the integration gap between event-based sensors and AI systems. The chip targets a specific problem in event-based vision: conventional CPUs and GPUs struggle to efficiently handle the sparse, asynchronous data from dynamic vision sensors (DVS), with preprocessing operations consuming over 75% of runtime and power in typical embedded systems.

Rather than converting event streams into frames for traditional processing, ADA processes events natively using a digital architecture optimized for sparse data. The processor uses interval-coded neural computation, where information is encoded in the time intervals between spikes rather than spike rates or analog voltages. This approach is implemented through Neucom's STICK (Spike Time Interval Computation Kernel) framework, which enables deterministic computation without requiring training.

According to benchmarks in the whitepaper, ADA processes 200 million events per second with 5 microsecond latency, compared to 135,000 events per second with 7.4 microsecond latency on an ARM Cortex-M4 running at 200MHz.

## Architecture

ADA is designed as a reconfigurable processor fabric rather than a fixed-function accelerator. The architecture includes several processing blocks:

**Event Interface**: The chip implements hardware decoding for EVT3.0, a compressed 16-bit event format used by commercial DVS sensors. It also supports Address-Event Representation (AER) for direct sensor integration and bus interfaces for SoC integration.

**Preprocessing Pipeline**: The architecture includes modules for denoising, region-of-interest filtering, and spatiotemporal contrast filtering to reduce event rates before downstream processing. These operate on the event stream directly without frame conversion.

**Feature Extraction**: ADA can output both dense tensor representations (compatible with CNNs) and sparse event streams (for spiking neural networks). The processor generates time-surface representations that encode spatial and temporal information from event streams.

**Attention Mechanisms**: The chip includes hardware for saliency mapping, object tracking, and optical flow estimation inspired by cortical visual pathways. These modules implement bio-inspired attention to prioritize regions of interest.

The processor is fabricated on a 22nm CMOS process and designed as IP for integration into larger SoCs via standard digital interfaces.

## Software and Tools

ADA is programmed using the [Axon SDK](https://open-neuromorphic.org/neuromorphic-computing/software/snn-frameworks/axon/), an open-source development kit. The SDK allows developers to describe computational pipelines in Python, PyTorch, or C, which are then compiled into spiking neural networks deployable on the hardware.

The toolkit includes:
- A network simulator for algorithm development
- A hardware emulator for pre-silicon testing
- An SNN compiler that generates binaries for the ADA cores
- A runtime API for deployment and configuration 

The SDK supports two modes of operation: digital configuration of preprocessing blocks (filtering, ROI management, interface selection) and deployment of bio-inspired neural circuits for tasks like attention and tracking.

## Applications

The processor targets applications where event-based sensors are used but preprocessing creates a bottleneck:

- **Robotics and Autonomous Vehicles**: Real-time object detection and tracking where microsecond-level latency matters for collision avoidance
- **AR/VR Systems**: Eye-tracking and foveated rendering using the attention mechanisms to dynamically adjust resolution
- **Industrial Monitoring**: Predictive maintenance and anomaly detection using efficient encoding of vibration and motion events
- **Space Applications**: Object tracking in extreme lighting conditions where high dynamic range is required

As of November 2025, ADA is available as a virtual prototype and FPGA implementation for partner evaluation. Tapeout is scheduled for Q2-Q3 2026.
