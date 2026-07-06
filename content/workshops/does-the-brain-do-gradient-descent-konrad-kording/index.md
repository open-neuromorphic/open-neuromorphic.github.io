---
title: "Does the Brain do Gradient Descent?"
author:
  - "Konrad Kording"
  - "Jason Eshraghian"
  - "Fabrizio Ottati"
date: 2023-07-11
description: "Examine the biological plausibility of gradient descent, exploring how node perturbation and feedback alignment circumvent the weight transport problem."
video: E5hATeCZQnU
image: does-the-brain-do-gradient-descent.png
type: workshops
experience_tags: ["researcher", "advanced"]
expertise_tags: ["neuroscience", "algorithms-learning"]
content_source: "talk-summary"
summary_points:
  - "Backpropagation is biologically implausible due to the weight transport problem and the need for complex multiplexing."
  - "Feedback Alignment proves that forward learning can mirror backward weights, negating the need for exact weight symmetry."
  - "Node perturbation estimates gradients locally by comparing network activity when a neuron almost spikes versus when it barely spikes."
  - "Evolutionarily, gradient descent is so computationally efficient that biology likely developed mechanisms to approximate it."
---

Gradient descent via backpropagation is the engine powering modern artificial intelligence, but its mechanics—requiring frozen network states and perfectly symmetric backward weight transport—are fundamentally incompatible with biological brains. In this session, Dr. Konrad Kording explores the theoretical and evolutionary arguments surrounding learning in the brain. He argues that because gradient descent is so exceptionally useful for optimizing complex systems, it is highly probable that biology evolved alternative, localized mechanisms to approximate it.

## Key Takeaways
- **Backpropagation is biologically implausible due to the weight transport problem and the need for complex multiplexing.**
- **Feedback Alignment proves that forward learning can mirror backward weights, negating the need for exact weight symmetry.**
- **Node perturbation estimates gradients locally by comparing network activity when a neuron almost spikes versus when it barely spikes.**
- **Evolutionarily, gradient descent is so computationally efficient that biology likely developed mechanisms to approximate it.**

## Workshop Format & Takeaways
The session challenged the strict neuroscientific rejection of gradient descent by unpacking the specific physical barriers of backpropagation. Kording detailed the "weight transport problem"—the impossibility of a synapse knowing the exact weight of a downstream connection. He highlighted how algorithms like Feedback Alignment solve this by utilizing fixed, random backward matrices that the forward weights naturally learn to align with over time.

Kording also addressed how the brain might physically estimate a gradient without explicit backpropagation. He discussed "node perturbation," an approach where local causal effects are estimated by observing the network's reaction to spontaneous or threshold-borderline spikes. While mathematically slower (by a factor of the square root of $N$) than perfect backpropagation, these localized approximations are biologically viable and vastly superior to blind evolutionary trial and error.

## What This Means for Neuromorphic Computing
The search for biologically plausible learning rules is not merely an academic exercise; it is the key to unlocking on-chip training for edge neuromorphic hardware. Standard backpropagation requires massive memory overhead to cache activations and transport gradients backwards, making it too expensive for micro-watt sensors. By studying how the brain achieves gradient-like optimization using only localized, forward-moving signals, neuromorphic engineers can design highly efficient, decentralized learning algorithms capable of continuously adapting to new data entirely on the edge.
