---
title: "Spiking Neural Receptive Fields" 
author:
  - "Jens E. Pedersen" 
date: 2025-12-05 
start_time: "08:00" 
end_time: "09:15"   
time_zone: "EST"    
description: "See how leaky integrators provide scale-space covariance for SNNs, boosting event-based tracking by 42% when initialized with spatio-temporal priors."
upcoming: false 
video: "YfCmJPR8P24"       
type: "student-talks" 
speaker_slides: "https://jepedersen.dk/posts/talks/202512_onm_nrf/"
speaker_paper: "https://www.nature.com/articles/s41467-025-63493-0" 
production_credits:
  - name: "Justin Riddiough"
    role: "Technical Oversight"
  - name: "Chaitanya Gambali"
    role: "Event Operations"
  - name: "Sundararaman Rengarajan"
    role: "Video & Media Operations"
  - name: "Liam O'Sullivan"
    role: "Scheduling & Coordination"
  - name: "Marcos Ordonez"
    role: "Social Media Promotion"
experience_tags:
  - researcher
  - advanced
expertise_tags:
  - snn
  - computer-vision
  - neuroscience
content_source: "talk-summary"
summary_points:
  - "Visual processing systems must reliably detect objects regardless of spatial or temporal scaling (e.g., changes in speed or distance)."
  - "Event-based cameras output sparse, logarithmic changes in luminance, requiring networks that naturally compute over continuous time."
  - "Covariance guarantees that scaling a signal and then processing it yields the exact same representation as processing it and then scaling it."
  - "Leaky Integrator (LI) and Leaky Integrate-and-Fire (LIF) models perfectly approximate the exponentially truncated kernels needed for temporal covariance."
  - "Initializing SNNs with structured scale-space priors outperforms uniformly randomized weights by up to 42% in event-based regression tasks."
---

Processing event-based camera data through traditional deep learning networks often involves flattening precise time-sparse signals into dense artificial frames, wiping out the temporal advantages of the hardware. To build networks that actually capitalize on this data, researchers require computational models that process signals continuously while remaining mathematically invariant to geometric transformations like speed and scale. In this talk, Jens E. Pedersen breaks down the mathematics connecting scale-space theory to neuromorphic spiking dynamics, proving that standard leaky integrate-and-fire models possess inherent scale-covariance when structured correctly.

## Key Takeaways
- **The importance of scale covariance:** A biological or artificial visual system must reliably track a target regardless of the target's distance (spatial scaling) or the speed of its movement (temporal scaling).
- **Leaky Integrators fit the math:** For a system to remain covariant across temporal dimensions while respecting causality (only accessing past signals), the optimal function is an exponentially truncated kernel. Simple Leaky Integrator (LI) neurons naturally perform this exact calculation.
- **Initialization impacts convergence:** Uniformly random weight initialization forces a network's time constants to scatter inefficiently. Initializing weights based on logarithmic scale-space priors allows the network to naturally latch onto features across varying time scales.
- **Massive gains over standard ANNs:** On sparse event-tracking tasks (where only 0.1% of pixels relate to the tracked object), conventional Artificial Neural Networks fail to maintain stable tracking, even when given multi-frame historical buffers.
- **Strong performance boosts:** Imbuing spiking networks with these spatio-temporal mathematical priors resulted in regression performance improvements of 42.4% for Leaky Integrators and 20.3% for LIF models over randomized baselines.

## About the Research
This presentation outlines the findings published in *“Covariant spatio-temporal receptive fields for spiking neural networks”* (Nature Communications, 2025). The research introduces a principled approach to building spatial-temporal receptive fields by mathematically linking the discrete spiking primitives of neuromorphic chips with the continuous scaling theory historically studied in visual neuroscience.

As noted in the session, the work explicitly challenges standard neuromorphic benchmark approaches. Attempting to benchmark these covariant properties on static, frame-converted datasets (like Neuromorphic MNIST) fundamentally misses the point, as static spatial shapes lack the active temporal transformation dynamics that event-based sensors and biological systems actually rely on.

## What This Means for Neuromorphic Computing
By proving that foundational neuromorphic neuron models map directly onto ideal scale-space computations, this research provides the theoretical grounding necessary to move SNN design away from arbitrary deep learning heuristics.

Instead of treating spiking models as inherently inferior artificial neural networks that require massive gradient optimization searches just to reach parity, engineers can deterministically initialize networks to target specific speeds and spatial structures. This provides a direct path toward deploying real-time, mathematically reliable event-based vision pipelines on resource-constrained neuromorphic edge devices.

## Resources
- **Speaker Slides:** [Spiking Neural Receptive Fields](https://jepedersen.dk/posts/talks/202512_onm_nrf/)
- **Speaker Paper:** [Covariant spatio-temporal receptive fields for spiking neural networks](https://www.nature.com/articles/s41467-025-63493-0)
