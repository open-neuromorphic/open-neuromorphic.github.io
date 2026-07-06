---
title: 'Alexandre Marcireau and Petruț Bogdan: Faery and Innatera/NIR'
author:
  - Alexandre Marcireau
  - Petruț Bogdan
  - Jens E. Pedersen
date: 2024-10-08T00:00:00.000Z
description: "Faery's stream-based API and the Neuromorphic Intermediate Representation (NIR) enable deploying models to Innatera's mixed-signal edge chips."
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
experience_tags:
  - practitioner
  - researcher
expertise_tags:
  - software
  - analog-hardware
  - digital-hardware
content_source: "talk-summary"
summary_points:
  - "Overview of Faery's stream-based API for handling continuous and finite event camera data."
  - "Insights into Innatera's mixed-signal neuromorphic chips and their commercialization for sensor-edge applications."
  - "Discussion on the Talamo SDK, which leverages a PyTorch-based workflow to optimize models for hardware deployment."
  - "Exploration of the Neuromorphic Intermediate Representation (NIR) standard and the challenges of hardware interoperability."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-marcireau-petrut-bogdan-faery-innatera-nir/
---

Standardizing the software stack is a critical step as neuromorphic computing moves toward commercial deployment. This session explores the architecture of the Faery library—a tool for processing continuous and finite event camera data—and examines how intermediate standards like the Neuromorphic Intermediate Representation (NIR) facilitate interoperability with physical edge platforms like Innatera's mixed-signal chips.

## Key Takeaways
- **Overview of Faery's stream-based API for handling continuous and finite event camera data.**
- **Insights into Innatera's mixed-signal neuromorphic chips and their commercialization for sensor-edge applications.**
- **Discussion on the Talamo SDK, which leverages a PyTorch-based workflow to optimize models for hardware deployment.**
- **Exploration of the Neuromorphic Intermediate Representation (NIR) standard and the challenges of hardware interoperability.**

## What Was Built / Demonstrated
The session demonstrated Faery's approach to defragmenting event camera data through a flexible, statically typed Python API backed by Rust. The discussion highlighted Faery's stream types (Regular, Finite, Uniform) and how they lazily execute processing pipelines packet-by-packet. On the hardware side, the workflow for Innatera's Talamo SDK was outlined, showing how PyTorch components are used to deploy spiking neural networks directly to edge sensors. Finally, the group examined the Neuromorphic Intermediate Representation (NIR), discussing mapping computational primitives to bridge diverse software simulators and physical hardware platforms.

## What This Means for Neuromorphic Computing
As neuromorphic technology transitions from academic research to commercial edge applications, standardizing the software stack is critical. Tools like Faery streamline the ingestion and preprocessing of raw sensor data, while initiatives like NIR attempt to unify model definitions across competing platforms so developers aren't locked into a single vendor's ecosystem.

However, as discussed during the session, tension remains between open interoperability and the integrated, vertically optimized solutions required for commercial hardware. While NIR excels at describing core network dynamics, it currently lacks the platform-specific pipeline details (like I/O and pre-processing constraints) required for true hardware deployment. Bridging this gap—ensuring open tools can seamlessly feed into proprietary, highly optimized hardware pipelines—will be a defining challenge for the ecosystem's growth.
