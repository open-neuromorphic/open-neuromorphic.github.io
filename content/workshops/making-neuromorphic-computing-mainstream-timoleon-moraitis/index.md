---
title: "Making Neuromorphic Computing Mainstream"
author:
  - Timoleon Moraitis
  - Fabrizio Ottati
date: 2023-11-16
video: 5qctRLrVTKg
description: "Learn how SoftHebb learning and short-term plasticity improve SOTA AI performance on dynamic tasks without relying on non-local backpropagation."
image: workshop-thumbnail-default.png
type: workshops
experience_tags: ["researcher", "advanced"]
expertise_tags: ["neuroscience", "algorithms-learning", "machine-learning"]
content_source: "talk-summary"
summary_points:
  - "Approximating standard deep learning purely for energy efficiency inherently limits neuromorphic computing's potential."
  - "SoftHebb uses localized Hebbian plasticity and Winner-Take-All competition to train deep networks without backpropagation."
  - "Networks trained with SoftHebb demonstrate striking natural resilience to adversarial attacks compared to standard backprop models."
  - "Implementing short-term plasticity optimally models dynamic environments, solving tasks historically out of reach for neuromorphic systems."
---

Neuromorphic computing frequently focuses on decreasing the energy consumption of AI through efficient, spiking approximations of conventional deep learning methods. However, as Dr. Timoleon Moraitis argues in this session, treating biological inspiration solely as a tool for energy efficiency limits the field. By instead identifying specific, unexploited biological mechanisms—like Hebbian plasticity and short-term synaptic dynamics—neuromorphic models can actually expand the capabilities of State-of-the-Art (SOTA) AI, yielding improvements in generalization, robustness, and learning speed.

## Key Takeaways
- **Approximating standard deep learning purely for energy efficiency inherently limits neuromorphic computing's potential.**
- **SoftHebb uses localized Hebbian plasticity and Winner-Take-All competition to train deep networks without backpropagation.**
- **Networks trained with SoftHebb demonstrate striking natural resilience to adversarial attacks compared to standard backprop models.**
- **Implementing short-term plasticity optimally models dynamic environments, solving tasks historically out of reach for neuromorphic systems.**

## Workshop Format & Takeaways
The session explored the transition from theoretical neuroscience to practical machine learning applications. Moraitis detailed the "SoftHebb" algorithm, an unsupervised learning rule utilizing local Hebbian updates combined with soft Winner-Take-All inhibition. Because the algorithm relies entirely on local information, it bypasses the non-local weight-transport problem of backpropagation. As demonstrated, SoftHebb not only achieves high accuracy on image recognition tasks but also exhibits remarkable resilience to adversarial noise that easily fools models like OpenAI's CLIP.

The presentation then transitioned into dynamic problems. By implementing short-term plasticity—where synapses elastically weaken or facilitate in response to recent activity—the network was able to effortlessly track targets through occlusions in video data, outperforming standard LSTMs and CNNs. The workshop concluded by linking these algorithms to hardware, showing how memristive nanodevices can naturally physically encode these short-term and long-term plasticities.

## What This Means for Neuromorphic Computing
To break into the mainstream, neuromorphic computing cannot merely offer a lower-power, lower-accuracy version of what GPUs already do. It must offer capabilities that conventional architectures struggle with. By demonstrating that localized, brain-inspired learning rules inherently protect against adversarial attacks and naturally parse temporal continuity, this research provides a compelling blueprint. It shows that abandoning backpropagation in favor of biological mechanisms can result in algorithms that are not only energy-efficient but objectively superior for dynamic, real-world edge applications.
