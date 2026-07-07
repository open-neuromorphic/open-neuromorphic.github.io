---
title: 'Luuk van Keeken: NIR Introduction and Graph Tracing with torch.fx'
author:
  - Luuk van Keeken
  - Jens E. Pedersen
date: 2024-12-02T00:00:00.000Z
description: "Learn how extracting computational graphs with torch.fx allows the Neuromorphic Intermediate Representation (NIR) to bridge PyTorch models and SNN hardware."
upcoming: false
video: FIqxexNQX4k
image: luuk-van-keeken-nir-intro-torch-fx.jpg
type: hacking-hours
software_tags:
  - snntorch
  - norse
experience_tags:
  - researcher
  - practitioner
  - intermediate
expertise_tags:
  - software
  - snn
content_source: "talk-summary"
summary_points:
  - "The Neuromorphic Intermediate Representation (NIR) standardizes spiking neural network primitives, letting researchers translate models across fragmented hardware platforms."
  - "Manual graph tracing in PyTorch previously required overwriting forward functions, causing failures when encountering non-module primitives like basic addition."
  - "The torch.fx toolkit reliably captures both module and functional operation dependencies, generating clean, structured execution graphs automatically."
  - "The nir.torch package leverages torch.fx to extract these execution graphs, acting as a universal translator base for SNN libraries like Norse and snnTorch."
  - "Converting a model requires framework-specific mapping logic to align differing parametrization formats to NIR's strict mathematical primitives."
url: >-
  /neuromorphic-computing/software/hacking-hours/luuk-van-keeken-nir-intro-torch-fx/
---

Because the neuromorphic ecosystem relies on fragmented, highly specific software libraries (like Norse, snnTorch, and Rockpool) and heavily restricted hardware (like Intel Loihi and SpiNNaker), moving a trained model from one environment to another is notoriously difficult. In this session, Luuk van Keeken and Jens E. Pedersen explore how the Neuromorphic Intermediate Representation (NIR) resolves this "all-to-all" translation problem, and demonstrate how utilizing `torch.fx` makes extracting graphs from PyTorch-based spiking models significantly more robust.

## Key Takeaways
- **NIR acts as a universal translator:** By providing a unified understanding of what constitutes a basic neuromorphic primitive (e.g., a Leaky Integrate-and-Fire neuron), NIR allows researchers to export a model from one framework and cleanly compile it for vastly different hardware targets.
- **Manual PyTorch tracing is fragile:** Older methods of exporting PyTorch SNNs required manually replacing the `forward` functions of modules to record their edges. This approach frequently broke when a model utilized non-module Python operations, like standard mathematical addition or division.
- **`torch.fx` captures functional dependencies:** The `torch.fx` toolkit solves the tracing problem by generating a structured computational graph that recognizes both object-oriented module calls and purely functional code execution, ensuring no operational steps are lost.
- **Simplifying the graph via primitives:** When `torch.fx` captures a functional addition operation, NIR can streamline the output graph by simply merging the input arrows directly into the subsequent node, matching standard neuromorphic data flows.
- **Translation still requires specific mapping:** While `nir.torch` effectively captures the graph shape, differing frameworks still parameterize neurons differently (e.g., varying assumptions about time steps). Individual framework mappers must carefully adjust parameters to align with NIR’s exact mathematical definitions.

## What Was Built / Demonstrated
The session centered on live-refactoring the `nir.torch` extraction pipeline. By replacing legacy tracing workarounds with a custom `torch.fx` Tracer class, the developers successfully captured the internal graph of a Norse PyTorch module.

The demonstration showed how the new tracer automatically identified the sequential module dependencies alongside bare functional calls (like addition). By providing a dictionary mapping Norse-specific modules (like `LIFBoxCell`) to NIR primitives, the extracted PyTorch graph was successfully parsed into a clean, hardware-agnostic intermediate representation without having to parse the messy internal dynamics of the leaky integrator itself.

## What This Means for Neuromorphic Computing
Without a common representation standard, bench-marking neuromorphic hardware is nearly impossible. If a researcher wants to compare the energy efficiency of SpiNNaker against Loihi, they traditionally have to completely rewrite their neural network from scratch using disparate, framework-specific APIs.

By stabilizing the PyTorch-to-NIR extraction pipeline using `torch.fx`, researchers can author models in their preferred Python environment and instantly export a strict mathematical representation. This lowers the barrier to entry for neuromorphic deployment, allowing algorithms to be seamlessly shared, verified, and compared across the industry's varied edge devices.

## Resources
- **Video:** [Watch the session on YouTube](https://www.youtube.com/watch?v=FIqxexNQX4k)
