---
title: "Evolutionary Optimization for Neuromorphic Systems"
author:
  - "Catherine Schuman"
  - Gregor Lenz
  - Fabrizio Ottati
  - Jason Eshraghian
date: 2023-03-21
description: "Learn how the EONS framework applies evolutionary algorithms to co-design spiking neural network topologies and parameters for diverse neuromorphic hardware."
video: -g5XZDJPoO8
image: evolutionary-optimization-for-neuromorphic-systems.png
type: workshops
software_tags:
  - snntorch
experience_tags:
  - researcher
  - advanced
expertise_tags:
  - snn
  - algorithms-learning
  - machine-learning
field_of_application_tags:
  - robotics
  - automotive
  - medicine
summary_points:
  - "The EONS framework dynamically evolves both the parameters and the topology (number of neurons/synapses) of spiking neural networks."
  - "EONS requires no a priori assumptions about network structure, frequently discovering highly recurrent, sparse, and non-layered topologies."
  - "The approach enables direct application-hardware co-design by optimizing networks around the specific constraints of diverse target hardware."
  - "EONS achieved state-of-the-art anomaly detection in medical ECG data and autonomous vehicle control using exceptionally small networks (often <100 neurons)."
---

Designing highly efficient Spiking Neural Networks (SNNs) for diverse, constraint-heavy neuromorphic hardware is a complex search problem. Unlike traditional deep learning, which relies on dense, layered, feed-forward topologies optimized via backpropagation, SNNs offer the potential for highly recurrent, sparse, and temporally complex structures. The Evolutionary Optimization for Neuromorphic Systems (EONS) framework approaches this problem by applying evolutionary algorithms to discover both the optimal topology and the parameters for a given task, treating the hardware's specific constraints as the environmental pressure shaping the network's evolution.

## Key Takeaways
- **Simultaneous optimization of topology and parameters:** EONS does not just tune weights; it actively adds, removes, and restructures neurons and synapses to find the most efficient graph structure.
- **Counter-intuitive, highly efficient structures:** Networks evolved by EONS frequently lack traditional layers, heavily utilize recurrent feedback loops, and operate with radically fewer neurons and synapses than backpropagation-trained equivalents (often under 100 neurons for complex tasks).
- **Hardware-in-the-loop co-design:** The framework acts as a bridge between application needs and device physics, naturally molding the evolved network to respect constraints like limited weight precision, maximum fan-in, or specific material physics (e.g., memristive or superconducting optoelectronic devices).
- **Multi-objective optimization:** Fitness functions in EONS can be tuned to not only maximize task accuracy but to simultaneously minimize energy usage, reduce network size, or increase resiliency against hardware noise and perturbation.

## Workshop Format & Takeaways
The workshop provided a comprehensive overview of how evolutionary algorithms—relying on population diversity, selection, crossover, and mutation—can be adapted for arbitrary graph structures. The presentation demonstrated EONS in action across various domains, ranging from high-energy physics anomaly detection to real-time control of internal combustion engines and autonomous F1/10 scale race cars. The session highlighted a practical integration, showcasing how EONS can wrap the `snnTorch` library via Python’s LEAP framework to evolve synaptic weights on tasks like OpenAI's CartPole.

## What This Means for Neuromorphic Computing
A pervasive challenge in neuromorphic engineering is the disconnect between the researchers fabricating novel materials and the computer scientists building applications. Because EONS treats the neuromorphic backend as an interchangeable module, it provides a universal translation layer. It allows hardware designers to immediately benchmark emerging, highly-constrained devices without requiring custom, differentiable training algorithms.

As discussed in the session, relying solely on backpropagation and deep learning architectures heavily biases the field toward structures built for von Neumann hardware. By utilizing evolutionary search spaces, EONS provides empirical proof that much smaller, temporally rich, and highly recurrent networks are capable of matching deep learning performance, fully realizing the computational advantages of spike-based substrates.

## Resources
- **Video Recording:** [-g5XZDJPoO8](https://www.youtube.com/watch?v=-g5XZDJPoO8)
