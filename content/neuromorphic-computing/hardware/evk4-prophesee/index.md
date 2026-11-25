---
title: "EVK4 - Prophesee and Sony"
product_name: "Prophesee EVK4"
url: /neuromorphic-computing/hardware/event-cameras/evk4-prophesee/
description: "Explore the Prophesee EVK4 evaluation kit featuring the Sony IMX636 HD event-based vision sensor with 120 dB dynamic range and microsecond latency."
summary: "The EVK4 is an industrial-grade evaluation kit housing the Sony IMX636 event-based sensor co-developed with Prophesee. It offers 1280x720 HD resolution, >120 dB dynamic range, and microsecond response times for ultra-low-latency computer vision."
image: "evk4-prophesee.png"
draft: false
active_product: true
type: "neuromorphic-hardware"
category: "event-camera"
math: true

organization:
  org_name: "Prophesee"
  org_logo: "prophesee.png"
  org_website: "https://www.prophesee.ai"
  product_page_link: "https://www.prophesee.ai/event-camera-evk4/"
  social_media_links:
    linkedin: "https://www.linkedin.com/company/chronocam"
    twitter: "https://x.com/Prophesee_ai"

product:
  announced_date: "2021-09-09"
  release_date: "2021-10-01"
  release_year: 2021
  chip_type: "Mixed-signal"
  status:
    announced: true
    released: true
    retired: false
  interfaces: "USB 3.0 Type-C"
  software: "https://github.com/neuromorphicsystems/neuromorphic-drivers"
  applications: "High-speed tracking, dynamic machine vision, robotics, automotive monitoring, low-latency edge inspection"
  power: "169 mW (chip), ~3 W (camera)"
  resolution: "1280 × 720 (HD)"
  pixel_size: "4.86 µm"
  dynamic_range: ">120 dB"
  latency: "<200 µs"
  max_event_rate: "1.066 Geps"
  min_illumination: "0.08 lux"
---

## Overview

The Prophesee EVK4 (Evaluation Kit 4) is an evaluation platform built around the Sony IMX636 event-based vision sensor, co-developed by Sony Semiconductor Solutions and Prophesee. Combining Sony's 3D stacked CMOS image sensor technology with Prophesee's Metavision neuromorphic sensing architecture, the EVK4 provides a 1280 × 720 (0.92 megapixel) event-based vision stream in an industrial-ready housing.

Unlike traditional frame-based cameras that capture entire images at fixed frame rates, each pixel in the IMX636 operates autonomously and responds continuously to relative changes in logarithmic illuminance. This event-driven operation yields continuous temporal contrast detection with sub-millisecond precision, high dynamic range (>120 dB), and low data redundancy.

## Sensor Architecture & Operation

The IMX636 sensor employs a two-layer, vertically stacked back-illuminated (BSI) CMOS process with copper-to-copper direct bonding between pixel detector arrays and readout logic:

- **Photodiode Layer:** Back-illuminated photodiodes optimize photon capture and light sensitivity down to 0.08 lux.
- **Asynchronous Readout Logic:** Each individual pixel contains logarithmic photoreception, continuous-time amplification, and differential comparison circuitry.
- **Event Output:** When log-intensity variation exceeds a programmable contrast threshold, an event tuple $(x, y, t, p)$ is generated immediately, consisting of pixel coordinates, microsecond timestamp $t$, and sign polarity $p$ (+1 for increasing brightness, -1 for decreasing brightness).

Because pixels transmit data only upon state change, static scene components generate zero background data. This drastically compresses data volume, minimizes motion blur, and allows processing pipelines to operate with microsecond response times.

## Software and Tools

The EVK4 is supported across multiple open-source and commercial software toolchains:

- **Neuromorphic Drivers:** Open-source Python and Rust drivers maintained by the neuromorphic systems community for real-time stream decoding and integration.
- **Metavision Intelligence Suite:** Prophesee's software stack providing camera control, calibration utilities, spatial and temporal filters, and machine learning modules.
- **PyTorch & SNN Libraries:** Stream outputs can be interfaced directly with event loaders like Tonic, AEStream, or Faery for real-time spiking neural network inference.

## Variants

| Feature | Sony IMX636 | Sony IMX637 | Sony IMX646 | Sony IMX647 |
| --- | --- | --- | --- | --- |
| **Effective Pixels** | 1280 (H) × 720 (V) | 640 (H) × 512 (V) | 1280 (H) × 720 (V) | 640 (H) × 512 (V) |
| **Resolution** | ~0.92 megapixels | ~0.32 megapixels | ~0.92 megapixels | ~0.32 megapixels |
| **Optical Format** | 1/2.5-type | 1/4.5-type | 1/2.5-type | 1/4.5-type |
| **Pixel Pitch** | 4.86 µm | 4.86 µm | 4.86 µm | 4.86 µm |
| **Minimum Illuminance** | 5 lux | 5 lux | 0.3 lux | 0.3 lux |
| **Dynamic Range** | > 86 dB | > 86 dB | > 110 dB | > 110 dB |
| **Low-Light Latency** | < 1,000 µs @ 5 lux | < 1,000 µs @ 5 lux | < 9,000 µs @ 0.3 lux | < 9,000 µs @ 0.3 lux |
| **Low-Light Background Rate** | 10 Hz @ 5 lux | 10 Hz @ 5 lux | 5 Hz @ 0.3 lux | 5 Hz @ 0.3 lux |
| **Max Event Rate** | 1.06 Geps | 1.06 Geps | 1.06 Geps | 1.06 Geps |


## Cameras

The IMX636 can output data over SLVS (https://www.sony-semicon.com/en/technology/is/slvsec.html) and MIPI (https://www.mipi.org). Since these interfaces are not directly supported by most computers, different integrators have created cameras that consists of a sensor (IMX636 or IMX646), an inteface board (MIPI to USB), and an enclosure to hold the chips and the lens.

| Name               | Manufacturer      | Sensor | Interface       | Link                                             |
| ------------------ | ----------------- | ------ | --------------- | ------------------------------------------------ |
| EVK4               | Prophesee         | IMX636 | USB 3.0 C       | https://www.prophesee.ai/event-camera-evk4/      |
| SilkyEvCam         | Century Arks      | IMX636 | USB 3.0 C       | https://centuryarks.com/en/silkyevcam-hd/        |
| Triton2 EVS        | LUCID Vision Labs | IMX636 | Ethernet        | https://thinklucid.com/triton2-evs/              |
| SE1-S4-USB         | SENSING           | IMX646 | USB 3.0 A       | https://sensing-world.com/h-col-133.html         |
| uEye XCP-E / XLS-E | iDS               | IMX636 | USB 3.0 B micro | https://en.ids-imaging.com/ueye-evs-cameras.html |

The IMX636 has also been intergated in kits based on a MIPI connector and a processing board (FPGA or single-board computer).

| Manufacturer | Sensor | Processing board | Link                                                                                               |
| ------------ | ------ | ---------------- | -------------------------------------------------------------------------------------------------- |
| Prophesee    | IMX636 | Kria KV260       | https://www.prophesee.ai/event-based-metavision-amd-kria-starter-kit/                              |
| FRAMOS       | IMX636 | NVIDIA Jetson    | https://framos.com/products/modules/framos-sensor-modules/fsm-imx636e-txa-devkit-single-v1a-27302/ |
