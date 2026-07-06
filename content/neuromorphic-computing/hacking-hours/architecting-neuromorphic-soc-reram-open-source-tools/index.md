---
title: Architecting Neuromorphic SoCs with ReRAM and Open-Source Tools
author:
  - Samarth Jain
  - Sundararaman Rengarajan
  - Erastus Toe
date: 2025-10-19T00:00:00.000Z
description: "Discover how combining ReRAM non-volatile memory IP with open-source Caravel and OpenLane platforms enables students to tape out energy-efficient edge SoCs."
upcoming: false
video: Z8dR05q7hII
type: hacking-hours
experience_tags:
  - student
  - researcher
  - beginner
expertise_tags:
  - digital-hardware
  - analog-hardware
field_of_application_tags:
  - education
  - medicine
content_source: "talk-summary"
summary_points:
  - "ReRAM (Resistive RAM) mimics biological synapses by moving physical metal ions to form filaments, allowing in-memory computation and extreme energy efficiency."
  - "The open-source Caravel harness provides a pre-built RISC-V processor and mixed-signal pads, drastically lowering the barrier to integrating custom neuromorphic IP."
  - "OpenLane automates the ASIC design flow from behavioral Verilog models to final GDSII layout files without requiring expensive, proprietary EDA tools."
  - "The X1 IP uses a 1T1R (one transistor, one resistor) crossbar array, providing embedded non-volatile memory optimized for ultra-low latency edge tasks."
  - "Future Compute-in-Memory (CIM) arrays eliminate the need to fetch data from external RAM by performing MAC operations directly inside the memory cells."
url: >-
  /neuromorphic-computing/software/hacking-hours/architecting-neuromorphic-soc-reram-open-source-tools/
---

Taking a neuromorphic compute idea from a theoretical concept to a fabricated silicon chip traditionally requires millions of dollars in proprietary EDA tools and foundry agreements. In this session, Samarth Jain from BM LABS details how to bypass those barriers using open-source toolchains. By pairing non-volatile Resistive RAM (ReRAM) IP with the open-source ASIC pipeline, developers can seamlessly architect event-driven Systems-on-Chip (SoCs) ready for tape-out on the SkyWater SKY130 process.

## Key Takeaways
- **ReRAM mirrors synaptic plasticity:** By migrating metal ions to form or break filaments, ReRAM controls resistive states similarly to how biological synapses manage calcium ions. This physical, non-volatile state retention is ideal for extremely low-latency, always-on edge devices.
- **Caravel simplifies the silicon wrapper:** The open-source Caravel harness supplies a complete "wrapper" including a PicoRV32 RISC-V processor and mixed-signal I/O pads. This allows designers to simply hook their custom accelerator's Wishbone bus into the master without routing basic microcontroller infrastructure.
- **OpenLane automates the physical layout:** Once a behavioral model is written and validated (e.g., via CocoTB), OpenLane automates synthesis, placement, routing, and design rule checking (DRC/LVS), outputting a factory-ready GDSII file entirely using free tools.
- **Embedded NVM enables ultra-low latency:** The X1 IP places a 32x32 1T1R crossbar array directly on-chip. Because the memory is embedded and non-volatile, the system achieves deterministic latency critical for robotics and industrial sensors, avoiding the bottleneck of fetching from external DRAM.
- **Compute-in-Memory (CIM) minimizes data movement:** By exploiting Ohm’s law for multiplication and Kirchhoff’s current law for accumulation, future X2 IPs allow dot-product operations to occur physically inside the memory crossbar, drastically cutting the energy tax of data transport.

## What Was Built / Demonstrated
The session featured a comprehensive walkthrough of testing and routing an open-source SoC. Using CocoTB (a Python-based testbench tool), the team simulated a behavioral Verilog model of the X1 ReRAM IP, writing row addresses and data via the Wishbone interface and examining the timing diagrams.

Following the timing validation, the code was processed through OpenLane to automatically generate the physical layout. The resulting GDSII file was then inspected using KLayout, demonstrating exactly how the custom crossbar array physically interfaces with the Caravel harness’s routing tracks and risk-V processor pins.

## What This Means for Neuromorphic Computing
Historically, researchers working on neuromorphic algorithms have been confined to FPGA emulation or software simulation. This open-source hardware stack fundamentally democratizes neuromorphic ASIC design.

By utilizing mature open-source tools like OpenLane and Caravel, hardware engineering students and practitioners can now design, simulate, and physically manufacture custom neuromorphic architectures. Access to affordable, CMOS-compatible embedded non-volatile memory bridges the gap between academic theory and deployable, brain-inspired edge hardware.

## Resources
- **Video:** [Watch the session on YouTube](https://www.youtube.com/watch?v=Z8dR05q7hII)
