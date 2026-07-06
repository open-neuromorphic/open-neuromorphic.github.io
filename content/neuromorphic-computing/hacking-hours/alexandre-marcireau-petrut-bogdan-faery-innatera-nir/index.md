---
title: 'Alexandre Marcireau and Petruț Bogdan: Faery and Innatera/NIR'
author:
  - Alexandre Marcireau
  - Petruț Bogdan
  - Jens E. Pedersen
date: 2024-10-08T00:00:00.000Z
description: >-
  Alexandre Marcireau and Petruț Bogdan discuss the Faery library's integration
  and interaction with Innatera hardware and the Neuromorphic Intermediate
  Representation (NIR).
upcoming: false
video: 1Jz3cj2y1k0
image: faery-innatera-nir-hacking.jpg
type: hacking-hours
software_tags:
  - nengo
  - aestream
  - norse
  - spyx
  - faery
  - neuromorphic-intermediate-representation
  - nirtorch
hardware_tags:
  - pulsar-by-innatera
  - snp-by-innatera
summary_points:
  - "Overview of Faery's stream-based API for handling continuous and finite event camera data."
  - "Insights into Innatera's mixed-signal neuromorphic chips and their commercialization for sensor-edge applications."
  - "Discussion on the Talamo SDK, which leverages a PyTorch-based workflow to optimize models for hardware deployment."
  - "Exploration of the Neuromorphic Intermediate Representation (NIR) standard and the challenges of hardware interoperability."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-marcireau-petrut-bogdan-faery-innatera-nir/
---

This Hacking Hour session features Alexandre Marcireau and Petruț Bogdan, hosted by Jens E. Pedersen. The discussion centers around the Faery event processing library, its application with Innatera's neuromorphic hardware, and its compatibility with the Neuromorphic Intermediate Representation (NIR) for broader interoperability.

## Key Takeaways
- **Overview of Faery's stream-based API for handling continuous and finite event camera data.**
- **Insights into Innatera's mixed-signal neuromorphic chips and their commercialization for sensor-edge applications.**
- **Discussion on the Talamo SDK, which leverages a PyTorch-based workflow to optimize models for hardware deployment.**
- **Exploration of the Neuromorphic Intermediate Representation (NIR) standard and the challenges of hardware interoperability.**

## What Was Discussed / Demonstrated
The session featured a multi-faceted discussion bridging software and hardware infrastructure in neuromorphic computing. On the software side, the architecture of the Faery library was demonstrated, highlighting its approach to defragmenting event camera data through a flexible, statically typed Python API backed by Rust. The conversation detailed Faery's different stream types (Regular, Finite, Uniform) and how they lazily execute processing pipelines packet-by-packet.

The conversation then shifted to hardware, showcasing Innatera's mixed-signal neuromorphic chips (including the T1 development kit). The discussion covered Innatera's Talamo SDK, which prioritizes usability by building on top of familiar PyTorch components to deploy spiking neural networks directly to edge sensors. Finally, the group examined the Neuromorphic Intermediate Representation (NIR), discussing how it declares computational primitives to enable neural network model exchange across disparate software simulators and hardware platforms.

## What This Means for Neuromorphic Computing
As neuromorphic technology transitions from academic research to commercial edge applications, standardizing the software stack is critical. Tools like Faery streamline the ingestion and preprocessing of raw sensor data, while initiatives like NIR attempt to unify model definitions across competing platforms so developers aren't locked into a single vendor's ecosystem.

However, as discussed during the session, tension remains between open interoperability and the integrated, vertically optimized solutions required for commercial hardware. While NIR excels at describing core network dynamics, it currently lacks the platform-specific pipeline details (like I/O and pre-processing constraints) required for true hardware deployment. Bridging this gap—ensuring open tools can seamlessly feed into proprietary, highly optimized hardware pipelines—will be a defining challenge for the ecosystem's growth.
