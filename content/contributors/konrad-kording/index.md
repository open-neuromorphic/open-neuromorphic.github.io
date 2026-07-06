---
title: "Does the Brain do Gradient Descent?"
author: 
- "Konrad Kording"
- "Jason Eshraghian"
- "Fabrizio Ottati"
date: 2023-07-11
description: "Discover how the brain could implement gradient descent, addressing weight transport and multiplexing through feedback alignment and node perturbation."
video: E5hATeCZQnU
image: does-the-brain-do-gradient-descent.png
type: workshops
experience_tags: ["researcher", "advanced"]
expertise_tags: ["neuroscience", "algorithms-learning", "machine-learning"]
summary_points:
- Gradient descent is evolutionarily advantageous and theoretically plausible for biological brains.
- The weight transport problem can be mitigated by feedback alignment or node perturbation.
- Multiplexing signals (forward processing vs. backward error) could be solved using bursts, temporal codes, or excitatory/inhibitory balances.
- Experiments testing for gradient descent in the brain are possible but currently overlooked by electrophysiologists.
---

Konrad Kording explores the intersection of computational neuroscience and deep learning, evaluating whether the biological brain utilizes mechanisms analogous to gradient descent. Rather than assuming biological brains strictly follow artificial backpropagation, the presentation argues that brains likely utilize a mathematically similar steepest-descent optimization to navigate complex learning environments efficiently.

## Key Takeaways
- Gradient descent is evolutionarily advantageous and theoretically plausible for biological brains.
- The weight transport problem can be mitigated by feedback alignment or node perturbation.
- Multiplexing signals (forward processing vs. backward error) could be solved using bursts, temporal codes, or excitatory/inhibitory balances.
- Experiments testing for gradient descent in the brain are possible but currently overlooked by electrophysiologists.

## Workshop Format & Takeaways
The session is structured as an interactive theoretical exploration. It begins by defining learning algorithms and establishing the mathematical utility of backpropagation. From there, it systematically dismantles the major biological arguments historically used against gradient descent—specifically, weight transport and signal multiplexing—by reviewing recent theories, hardware parallels, and the computational cost of alternative methods like sequential weight perturbation.

## What This Means for Neuromorphic Computing
For years, the assumption that biological brains do not perform gradient descent has pushed neuromorphic research toward highly localized, non-optimizing learning rules that struggle to scale. By proving that biology is computationally compatible with gradient descent—and that evolution would heavily favor its discovery—this framework validates the integration of gradient-based optimization in spiking neural networks and neuromorphic hardware. It shifts the design paradigm from "how do we avoid backpropagation?" to "how can spiking mechanics natively estimate gradients?"

As discussed in the session, the simple act of looking at neurons that fall just short of their spiking threshold versus those that barely exceed it provides a statistically viable way to estimate causal gradients, offering a direct blueprint for on-chip learning architectures.

## Resources
- [Watch the Session](https://www.youtube.com/watch?v=E5hATeCZQnU)
