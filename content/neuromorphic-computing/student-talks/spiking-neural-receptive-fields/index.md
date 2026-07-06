---
title: "Spiking Neural Receptive Fields"
author:
  - "Jens E. Pedersen"
date: 2025-12-05
start_time: "08:00"
end_time: "09:15"
time_zone: "EST"
description: "Watch how applying continuous scale-space theory to Spiking Neural Networks (SNNs) creates covariant receptive fields that outperform conventional deep learning."
upcoming: false
# upcoming_url: "https://dtudk.zoom.us/j/68487370163"
video: "YfCmJPR8P24"
type: "student-talks"
speaker_slides: "https://jepedersen.dk/posts/talks/202512_onm_nrf/"
speaker_paper: "https://www.nature.com/articles/s41467-025-63493-0"
content_source: "talk-summary"
software_tags:
  - "nir"
summary_points:
  - "Leaky integrators (LI) and Leaky Integrate-and-Fire (LIF) models inherently possess covariance properties, making them mathematically ideal for tracking spatio-temporal scaling."
  - "By applying scale-space theory directly to neuromorphic primitives, spiking networks can reliably process geometric transformations like moving or scaling objects."
  - "Initializing spiking networks with theoretical spatial and temporal priors drastically accelerates training convergence and improves final performance compared to random initialization."
  - "On sparse, event-based regression tasks, these theoretically grounded SNNs significantly outperform conventional multi-frame artificial neural networks (ANNs)."
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
---

Jens's published work, "Covariant spatio-temporal receptive fields for spiking neural networks” [2], addresses a fundamental challenge in neuromorphic computing: the lack of theoretical frameworks to guide efficient implementations. The work demonstrates that leaky integrator and leaky integrate-and-fire neuron models are provably covariant to a large class of geometric transformations, with two important implications: (1) we can build reliable and scalable neuromorphic computational pipelines and (2) we can solve spatio-temporal problems much more efficiently than conventional deep learning methods. The paper demonstrates a regression problem where spiking neural networks significantly outperform comparable non-neuromorphic networks, even when the latter have access to multiple frames. Additionally, by imbuing the network with spatio-temporal priors their performance improves by 42.4% for leaky integrators and 20.3% for leaky integrate-and-fire models. This work establishes a principled computational framework connecting scale-space theory, visual neuroscience, and neuromorphic engineering, paving the way for theoretically grounded event-based processing systems.

## Key Takeaways
- Leaky integrators (LI) and Leaky Integrate-and-Fire (LIF) models inherently possess covariance properties, making them mathematically ideal for tracking spatio-temporal scaling.
- By applying scale-space theory directly to neuromorphic primitives, spiking networks can reliably process geometric transformations like moving or scaling objects.
- Initializing spiking networks with theoretical spatial and temporal priors drastically accelerates training convergence and improves final performance compared to random initialization.
- On sparse, event-based regression tasks, these theoretically grounded SNNs significantly outperform conventional multi-frame artificial neural networks (ANNs).

## About the Research
The study addresses a massive structural inefficiency in standard AI visual processing pipelines, moving away from frame-by-frame analysis toward continuous, event-driven perception inspired by biological systems (like the vision of a frog). At the core of the research is the mathematical concept of *covariance*—the guarantee that a system's representation of an object scales consistently whether the transformation happens in the physical world or internally inside the neural representation.

By mapping Gaussian spatial kernels and exponentially truncated temporal kernels directly to leaky integrators, the research proves that basic spiking primitives naturally compute covariant scale spaces. Consequently, when SNN parameters are seeded logarithmically—matching these mathematical priors—the models easily track transforming shapes under extreme sparsity (e.g., when signal events make up only 0.1% of the total camera output). Standard Deep Learning ANNs struggle massively with this sparsity, whereas the theoretically primed spiking networks achieve highly stable regression.

> "If you don't remember what happened to a visual signal—if your classifier is purely invariant—you wouldn't be able to compare its trajectory across scales. Covariance allows the network to remember the exact transformation, which is crucial for interacting with moving entities in time."

## What This Means for Neuromorphic Computing
This research helps solve the "black box" optimization problem that often plagues Spiking Neural Network development. Rather than relying purely on computationally expensive backpropagation to discover optimal time constants from scratch, engineers can use scale-space theory to initialize network parameters deterministically. Because these operations rely solely on native neuromorphic primitives (like Leaky Integrators), they can be compiled directly via the Neuromorphic Intermediate Representation (NIR) and deployed to extreme edge hardware for fast, low-power, mathematically guaranteed object tracking.

## Resources
- **Slides:** [2025 ONM NRF Talk](https://jepedersen.dk/posts/talks/202512_onm_nrf/)
- **Paper:** [Covariant spatio-temporal receptive fields for spiking neural networks](https://www.nature.com/articles/s41467-025-63493-0) (Nature Communications)
- **Reference:** Lindeberg, T. A computational theory of visual receptive fields. *Biol. Cybern.* (2013).
