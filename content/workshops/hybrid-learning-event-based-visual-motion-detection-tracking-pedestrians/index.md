---
title: "Hybrid Learning for Event-based Visual Motion Detection and Tracking of Pedestrians"
author:
  - "Cristian Axenie"
  - "Jens E. Pedersen"
date: 2024-01-15
description: "See how a hybrid Spiking Neural Network and event-based Expectation Maximization pipeline on BrainChip Akida tracks pedestrians with a ~6W power footprint."
image: visual-motion-tracking.png
video: W9JTcTJ4eBU
speaker_code: https://studio.edgeimpulse.com/public/265655/latest
speaker_slides: SPICES_Lab_Hybrid_Learning_VisionZero_THN.pdf
type: workshops
software_tags: []
experience_tags: ["researcher", "practitioner", "industry"]
expertise_tags: ["computer-vision", "snn", "digital-hardware", "algorithms-learning", "robotics"]
field_of_application_tags: ["automotive", "iot", "environmental"]
summary_points:
  - A dual-pipeline edge solution combines SNNs for detection and event-based Expectation Maximization for tracking.
  - The system uses Edge Impulse for rapid SNN deployment on the BrainChip Akida neural processor.
  - Achieves robust pedestrian and bicyclist tracking in day and night conditions using sparse event data.
  - Total system power draw is approximately 6 watts, allowing for scalable, city-level traffic safety infrastructure.
---

The Vision Zero Program seeks to eliminate traffic-related fatalities and serious injuries while promoting equitable, safe mobility. In this session, Dr. Cristian Axenie breaks down a low-power, neuromorphic edge solution built to detect and track pedestrians and bicyclists day and night. Developed for the TinyML Vision Zero San Jose Competition, the project relies on asynchronous event-based cameras paired with a highly efficient hybrid processing pipeline.

## Key Takeaways
- A dual-pipeline edge solution combines SNNs for detection and event-based Expectation Maximization for tracking.
- The system uses Edge Impulse for rapid SNN deployment on the BrainChip Akida neural processor.
- Achieves robust pedestrian and bicyclist tracking in day and night conditions using sparse event data.
- Total system power draw is approximately 6 watts, allowing for scalable, city-level traffic safety infrastructure.

## Workshop Format & Takeaways
The presentation walks through a complete end-to-end deployment lifecycle. It covers data acquisition using custom DVS sensors mounted on urban intersections, the model design using Edge Impulse to generate a quantized Spiking Neural Network, and the tracking mechanism utilizing an event-based Expectation Maximization algorithm. Finally, it provides a deployment-ready hardware evaluation, detailing thermal resilience and a ~6-watt power footprint.

## What This Means for Neuromorphic Computing
This implementation bridges the gap between experimental neuromorphic concepts and deployable civic infrastructure. By running a Spiking Neural Network (for detection) concurrently with a statistical tracker (for continuity) on embedded edge hardware, it demonstrates that neuromorphic pipelines can already meet rigorous real-world constraints—operating reliably under extreme California heat and dark nighttime conditions where conventional frame-based systems often fail.

The speaker noted that proving physical deployment metrics—like minimizing the energy footprint to a few watts—is critical for securing civic adoption. It highlights a viable path forward for integrating neuromorphic sensors into broad smart-city and traffic-control architectures.

## Resources
- [Research group on Antifragility](https://www.antifragility.science/)
- [Code on EdgeImpulse](https://studio.edgeimpulse.com/public/265655/latest)
- [Slides](https://drive.google.com/file/d/1ftEtZ9SQ_4gIYwRWwU-ncnBJQO_zZwM_/view)
- Paper: [OBELISC: Oscillator-Based Modelling and Control using Efficient Neural Learning for Intelligent Road Traffic Signal Calculation, Axenie et al.](https://2021.ecmlpkdd.org/wp-content/uploads/2021/07/sub_394.pdf)
