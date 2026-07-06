---
title: "Building Neuromorphic Applications Using Talamo"
author:
  - George Vathakkattil Joseph
  - Fabrizio Ottati
date: 2023-10-23
video: DN-b8Ra_mD4
image: workshop-thumbnail-default.png
description: "Discover how Innatera's Talamo SDK streamlines deploying spiking neural networks to mixed-signal neuromorphic hardware for low-power audio processing."
hardware_tags: ["pulsar-by-innatera","snp-by-innatera"]
type: "workshops"
experience_tags: ["practitioner", "intermediate"]
expertise_tags: ["analog-hardware", "software", "sensory", "machine-learning"]
field_of_application_tags: ["iot"]
content_source: "talk-summary"
summary_points:
  - "Innatera's mixed-signal spiking processors target sub-milliwatt, close-to-sensor processing for time-series data."
  - "The Talamo SDK enables end-to-end deployment, integrating custom PyTorch pipelines with hardware compilation."
  - "Analog computing benefits are amplified by SNNs, combining high dynamic range with digital robustness."
---

George Vathakkattil Joseph, Product Architect at Innatera, breaks down the Talamo SDK—a software stack designed to bridge the gap between spiking neural network (SNN) development and deployment on mixed-signal neuromorphic hardware. The session covers how developers can transition from standard PyTorch environments to fully optimized edge AI pipelines operating close to the sensor.

## Key Takeaways
- **Innatera's mixed-signal spiking processors target sub-milliwatt, close-to-sensor processing for time-series data.**
- **The Talamo SDK enables end-to-end deployment, integrating custom PyTorch pipelines with hardware compilation.**
- **Analog computing benefits are amplified by SNNs, combining high dynamic range with digital robustness.**

## Workshop Format & Takeaways
The session featured a combination of architectural overview and a live code demonstration. The demonstration walked through building an audio scene classification pipeline (using the DCASE 2020 dataset) from scratch. It showcased how Talamo allows developers to define feature extraction (like MFCC using librosa), spiking encoding, and network training within a unified Python environment, before ultimately mapping the pipeline to a hardware simulator for evaluation.

## What This Means for the Field
A major bottleneck in the adoption of neuromorphic hardware has been the lack of mature, accessible software toolchains. The development of SDKs that seamlessly integrate with standard machine learning operations (MLOps) tools like DVC and TensorBoard, while still exposing the low-level configurability of mixed-signal hardware, is a critical step toward commercialization. It lowers the barrier to entry, allowing standard embedded AI engineers to leverage the power benefits of spiking networks without needing a PhD in neuromorphic engineering.

> "The benefits of SNN really shine when you can do them as analog. You have all the power benefits and dynamic range benefits that come from analog, but also the precision and robustness of digital by having SNNs."

> "Programmability is the single issue that is maybe holding us back... it's not that neuromorphic computing cannot go mainstream now, it's the programmability solution that really needs addressing."
