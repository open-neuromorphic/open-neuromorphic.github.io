---
title: "PEPITA - A Forward-Forward Alternative to Backpropagation"
author:
  - "Giorgia Dellaferrera"
  - Jason Eshraghian
date: 2023-02-14
description: "PEPITA is a biologically plausible learning algorithm that replaces backpropagation with a dual forward-pass mechanism utilizing error-modulated network inputs."
video: RKgdUrCun5w
image: pepita.png
speaker_slides: 2023-02-14-Giorgia-Dellaferrera.pdf
type: workshops
software_tags: []
hardware_tags: []
experience_tags: ["researcher", "practitioner", "advanced"]
expertise_tags: ["algorithms-learning", "neuroscience", "machine-learning"]
field_of_application_tags: ["education"]
summary_points:
  - PEPITA is a biologically plausible learning algorithm that entirely replaces backpropagation.
  - The algorithm circumvents the weight transport problem by utilizing two distinct forward passes.
  - Weight updates are calculated locally by measuring the difference between a clean forward pass and a modulated forward pass.
  - The input is modulated by injecting a small, random projection of the output error back into the input layer.
---

Backpropagation has driven the success of modern deep learning, but its mechanics are fundamentally incompatible with biological brains. It requires reciprocal weight symmetry, freezes neural activity during backward passes, and demands non-local error transport. This session introduces PEPITA (Present the Error to Perturb the Input To modulate the Activity), a forward-learning algorithm that completely discards the backward pass. By utilizing a dual forward-pass structure, PEPITA solves the major biological un-plausibility constraints of backpropagation while maintaining competitive task performance.

## Key Takeaways
- **PEPITA is a biologically plausible learning algorithm that entirely replaces backpropagation.**
- **The algorithm circumvents the weight transport problem by utilizing two distinct forward passes.**
- **Weight updates are calculated locally by measuring the difference between a clean forward pass and a modulated forward pass.**
- **The input is modulated by injecting a small, random projection of the output error back into the input layer.**

## Workshop Format & Takeaways
The session unpacks the theoretical underpinnings of the PEPITA learning rule and follows with a concrete implementation walkthrough in PyTorch. The algorithm operates via two phases. In the first phase, a standard forward pass is executed on clean data (e.g., an image), producing an output that is compared against a target to generate a standard error signal.

Rather than sending this error backward through the network's layers, PEPITA multiplies the error by a fixed, random projection matrix and adds this small perturbation directly onto the original input. The second phase involves a subsequent forward pass using this modulated input. As noted during the session, the synaptic weights of the network are updated using a strictly local rule: the difference between the post-synaptic activations of the first pass and the modulated second pass, multiplied by the pre-synaptic activation. Because updates rely purely on local discrepancies created by the initial error perturbation, the algorithm avoids the weight symmetry problem entirely and mathematically mirrors aspects of Geoffrey Hinton's Forward-Forward algorithm.

The coding tutorial details exactly how to manage this mechanism in software. It highlights how intermediate layer activations must be temporarily cached to compute the differential update locally, demonstrating that PyTorch can easily be wrangled to support non-gradient, non-autograd optimization routines.

## What This Means for Neuromorphic Computing
Moving beyond backpropagation is critical for the future of highly efficient, on-chip continuous learning. Hardware designed to run backpropagation must include massive memory overheads to store gradients and enforce exact bidirectional weight symmetry. Forward-learning schemes like PEPITA offer a roadmap to fully localized, analog-friendly neuromorphic learning. Because the parameter updates are entirely decoupled from a sequential backward chain, learning and inference can happen almost concurrently, paving the way for low-latency, resilient on-device learning that mirrors the true mechanics of biological intelligence.

## Resources
- **Speaker Slides:** [2023-02-14-Giorgia-Dellaferrera.pdf](2023-02-14-Giorgia-Dellaferrera.pdf)
