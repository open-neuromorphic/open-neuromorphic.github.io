---
title: "Hands-On with Sinabs and Speck"
author:
  - "Gregor Lenz"
  - Fabrizio Ottati
  - Jason Eshraghian
date: 2023-04-04
description: "See a complete workflow for training spiking neural networks in PyTorch with Sinabs and deploying them directly to the event-driven Speck neuromorphic chip."
video: kOiyRtvPO2Q
image: hands-on-sinabs-speck.png
software_tags: ["sinabs", "snntorch"]
hardware_tags: ["speck-synsense"]
type: workshops
experience_tags: ["practitioner", "intermediate"]
expertise_tags: ["software", "digital-hardware", "snn", "computer-vision", "sensory"]
field_of_application_tags: ["iot", "consumer-electronics"]
summary_points:
  - "End-to-end demonstration of training an SNN in PyTorch using Sinabs and deploying it to the Speck chip."
  - "Event camera data is converted into sparse frames to leverage standard batching and stateless deep learning layers."
  - "Using the Exodus backend drastically accelerates Backpropagation Through Time (BPTT) training speeds."
  - "On-chip deployment includes post-training quantization to 8-bit weights and automated mapping of model layers to physical cores."
---

In this hands-on session, Gregor Lenz demonstrates the end-to-end workflow of training a spiking neural network and deploying it to SynSense's Speck, a fully digital, asynchronous neuromorphic chip with an integrated event camera. Bridging the PyTorch-based Sinabs library with physical hardware, the session shows how to process event-based vision data efficiently. By utilizing the Exodus GPU implementation for Backpropagation Through Time (BPTT), the workflow accelerates training speeds before seamlessly porting the quantized model to the Speck development kit for live, ultra-low-power inference.

## Key Takeaways
- **End-to-end demonstration of training an SNN in PyTorch using Sinabs and deploying it to the Speck chip.**
- **Event camera data is converted into sparse frames to leverage standard batching and stateless deep learning layers.**
- **Using the Exodus backend drastically accelerates Backpropagation Through Time (BPTT) training speeds.**
- **On-chip deployment includes post-training quantization to 8-bit weights and automated mapping of model layers to physical cores.**

## Workshop Format & Takeaways

The workshop is structured as a live code walkthrough transitioning directly into a physical hardware demonstration. It begins with data ingestion, utilizing the `tonic` library to load the N-MNIST event dataset. As discussed in the session, working with raw asynchronous events is challenging for standard PyTorch batching. The solution presented is to collapse events into sparse frames, mapping the time dimension so that conventional 2D convolutional layers can process the data before passing it to integrate-and-fire spiking layers.

The software portion heavily emphasized training efficiency. While vanilla PyTorch implementations of BPTT offer high flexibility, they are computationally slow. By switching to the Exodus backend—an optimized CUDA implementation—the training speed increased dramatically while producing identical gradients. The presentation also touched on crucial hardware-aware training considerations, such as clamping membrane potentials to zero or a negative threshold to minimize the required activity for a neuron to fire, directly improving on-chip inference latency.

Finally, the session showcased the deployment pipeline via the `DynamCNN` block, which discretizes weights into 8-bit representations, quantizes thresholds, and groups layers for allocation across Speck’s nine asynchronous cores. The event concluded with a live demonstration of the camera reacting to movement, showcasing real-time processing with a dynamic power-draw plot that dipped to mere milliwatts when the field of view was static.

## What This Means for Neuromorphic Computing

The ability to train models in standard, widely adopted deep learning frameworks and push them immediately to custom event-driven silicon lowers the barrier to entry for neuromorphic engineering. Historically, deploying an SNN to custom hardware required highly specialized, low-level tooling.

By abstracting the complexity of core-mapping, memory constraints, and asynchronous routing behind a Python-friendly API, the Sinabs ecosystem enables software practitioners to prototype for edge applications rapidly. The physical demonstration of Speck reacting to visual stimuli highlights the immense power-saving potential of event-driven architectures for always-on visual computing in IoT and consumer electronics.
