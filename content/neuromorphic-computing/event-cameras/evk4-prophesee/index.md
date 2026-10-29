---
active_product: true
description: "Learn about Sony's neuromorphic sensor: IMX636"
type: neuromorphic-hardware
image: evk4-prophesee.png
organization:
  group_name: null
  org_logo: prophesee.png
  org_name: Prophesee
  org_website: https://www.prophesee.ai
  product_page_link: https://www.prophesee.ai/event-camera-evk4/
  social_media_links:
    linkedin: https://www.linkedin.com/company/chronocam
    twitter: https://x.com/Prophesee_ai
    wikipedia: null
product:
  announced_date: 2021-09-09
  applications: High-speed, high dynamic range, and low power vision
  chip_type: Mixed-signal
  neurons: null
  synapses: null
  weight_bits: null
  activation_bits: null
  on_chip_learning: null
  power: "169 mW (chip), ~3 W (camera)"
  release_year: 2021
  release_date: 2021-10-01
  software: https://github.com/neuromorphicsystems/neuromorphic-drivers
  status:
    announced: true
    released: true
    retired: false
product_name: Prophesee EVK4
summary: .
title: EVK4 - Prophesee and Sony
---


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
