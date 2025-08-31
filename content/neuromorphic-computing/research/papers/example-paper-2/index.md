---
title: "Example Paper 2: Energy-Efficient Event-Based Vision with NIR"
date: 2025-07-15
description: "This placeholder paper showcases a novel architecture for object detection using an event-based camera, optimized for deployment on neuromorphic hardware via the Neuromorphic Intermediate Representation (NIR)."
draft: false
type: "research-papers"
resource_link: "https://github.com/neuromorphs/nir"
author:
  - "Jason Eshraghian"
  - "Felix Bauer"
publication_venue: "Proceedings of the Fictional Conference on Neuromorphic Systems, 2025"
doi: "10.xxxx/fcns.2025.002"
review_date: "2025-07-15"
onr_badge: true
---

**Note:** This is a placeholder entry to demonstrate the layout and structure of the ONR Approved Research Registry.

## Abstract
We present a deep spiking neural network for real-time object detection using data from event-based vision sensors. The model architecture is designed with hardware constraints in mind, utilizing sparse computations and temporal dynamics. A key contribution of this work is the end-to-end workflow for deploying this model to neuromorphic hardware using the Neuromorphic Intermediate Representation (NIR). We demonstrate that our approach achieves a 10x reduction in power consumption compared to a frame-based CNN on an embedded GPU, with only a minor trade-off in accuracy.

## Resource Overview
The primary resource is a public GitHub repository containing the trained model, the Python code for converting the model to NIR, and scripts for deploying it on supported hardware simulators. The repository is structured to be a practical guide for researchers looking to bridge the gap between SNN simulation and hardware deployment.