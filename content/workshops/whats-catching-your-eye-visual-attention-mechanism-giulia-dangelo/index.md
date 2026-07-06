---
title: What's Catching Your Eye? The Visual Attention Mechanism
author:
  - Giulia D'Angelo
  - Fabrizio Ottati
  - Gregor Lenz
  - Cameron Barker
date: 2023-09-26
description: "Explore a bio-inspired visual attention model that uses event cameras and SpiNNaker hardware to give robotics low-latency, depth-aware object focus."
video: vwT_3bNNStg
image: open-neuromorphic-thumbnail-giulia.png
type: "workshops"
hardware_tags: ["spinnaker"]
experience_tags: ["researcher", "advanced"]
expertise_tags: ["computer-vision", "robotics", "neuroscience", "snn", "sensory"]
content_source: "talk-summary"
summary_points:
  - "Visual attention models for robotics must operate with low latency and power while ignoring background clutter."
  - "A bio-inspired approach combines intensity, depth, and motion channels from event cameras to identify proto-objects."
  - "Implementing attention filters on neuromorphic hardware like SpiNNaker drastically reduces processing latency compared to GPUs."
---

In this session, Giulia D'Angelo explores how biologically inspired visual attention mechanisms can be applied to robotic perception. Using the iCub humanoid robot equipped with event-driven cameras, the research demonstrates how a complex interplay of bottom-up sensory processing and top-down filtering allows an agent to parse dynamic environments without being overwhelmed by irrelevant data.

## Key Takeaways
- **Visual attention models for robotics must operate with low latency and power while ignoring background clutter.**
- **A bio-inspired approach combines intensity, depth, and motion channels from event cameras to identify proto-objects.**
- **Implementing attention filters on neuromorphic hardware like SpiNNaker drastically reduces processing latency compared to GPUs.**

## Workshop Format & Takeaways
The presentation detailed the architectural evolution of a bio-inspired saliency model. The session walked through how Gestalt principles (such as closure and proximity) and V2 Border Ownership cells inspired the design of custom filters for event-based data. The implementation utilized three distinct processing channels—intensity, depth (disparity), and motion—and demonstrated the transition from GPU-based simulation to highly efficient deployment on SpiNNaker spiking neuromorphic hardware.

## What This Means for the Field
For autonomous robots to navigate and interact with unconstrained human environments, they cannot process every pixel of visual data with heavy deep learning models. Neuromorphic vision sensors (event cameras) solve the sensory bottleneck, but processing those events requires equally efficient downstream architectures. By mimicking the human visual system's ability to selectively focus on moving or proximal "proto-objects," robots can drastically cut their computational load, achieving the low-latency reaction times necessary for real-world physical interaction.

> "If you throw a ball at you, it's inherently interesting. You don't care if it's a ball or a bottle... you just care that you need to run if something is coming towards you."

> "We require less mean firing rate because our structure is a little bit smarter than a classic uniform down-sampling."
