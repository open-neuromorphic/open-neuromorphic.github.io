---
title: "Hands-On with Nengo Applied Brain Research"
author: 
- "Trevor Bekolay"
- Gregor Lenz
date: 2023-01-26
video: sgu9l_bqAHM
description: "Explore the Nengo simulator and Neural Engineering Framework to build functional spiking neural networks that run seamlessly on neuromorphic hardware."
image: hands-on-nengo.png
speaker_slides: 2023-01-26-Nengo.pdf
software_tags: ["nengo"]
type: workshops
experience_tags: ["beginner", "practitioner", "researcher"]
expertise_tags: ["software", "snn", "algorithms-learning", "machine-learning"]
field_of_application_tags: ["robotics"]
summary_points:
- Nengo’s architecture explicitly separates front-end model creation from hardware-specific back-ends, ensuring code portability across CPUs, GPUs, and neuromorphic chips like Loihi.
- The Neural Engineering Framework (NEF) allows developers to explicitly engineer functional transformations and dynamical systems using spiking neurons.
- NengoDL integrates with TensorFlow, bridging deep learning optimizations with spiking neural network architectures.
- The Nengo GUI provides a real-time, interactive environment to visualize and adjust network behavior, accelerating the prototyping process.
---

Trevor Bekolay provides a comprehensive introduction to Nengo, a widely adopted neural simulator and machine learning platform. The session breaks down how Nengo empowers developers to construct functional, intelligent spiking neural networks and deploy them seamlessly across varied compute targets—ranging from conventional CPUs and GPUs to specialized neuromorphic hardware like Intel Loihi.

## Key Takeaways
- Nengo’s architecture explicitly separates front-end model creation from hardware-specific back-ends, ensuring code portability across CPUs, GPUs, and neuromorphic chips like Loihi.
- The Neural Engineering Framework (NEF) allows developers to explicitly engineer functional transformations and dynamical systems using spiking neurons.
- NengoDL integrates with TensorFlow, bridging deep learning optimizations with spiking neural network architectures.
- The Nengo GUI provides a real-time, interactive environment to visualize and adjust network behavior, accelerating the prototyping process.

## Workshop Format & Takeaways
The workshop provides a hands-on walk-through of the Nengo ecosystem. It opens with high-level video demonstrations of Nengo commanding physical and simulated robotics, then dives into the underlying architecture. Bekolay illustrates the front-end core components (ensembles, nodes, connections, and probes) and steps into the Nengo GUI to run real-time simulations, explicitly showing how the Neural Engineering Framework calculates and optimizes connection weights for mathematical transformations.

## What This Means for Neuromorphic Computing
Nengo acts as a critical abstraction layer for the neuromorphic community. By enforcing a strict separation between model formulation (the front end) and hardware execution (the back end), researchers can define a network once and instantly benchmark it across completely distinct substrates. This dramatically lowers the barrier to entry for neuromorphic hardware, allowing software engineers to interface with custom silicon without needing to learn chip-specific architectures from scratch.

Furthermore, Nengo’s integration of the Neural Engineering Framework (NEF) offers an alternative to pure gradient-based learning. As discussed in the session, instead of blindly trusting a network to learn a behavior via massive datasets, engineers can mathematically prescribe control systems and dynamical equations directly into the synaptic weights of a spiking network, making it highly effective for real-time robotic control and online adaptation.

## Resources
- [Watch the Session](https://www.youtube.com/watch?v=sgu9l_bqAHM)
- [Nengo Documentation and Ecosystem](https://www.nengo.ai/)
- Speaker Slides: `2023-01-26-Nengo.pdf`
