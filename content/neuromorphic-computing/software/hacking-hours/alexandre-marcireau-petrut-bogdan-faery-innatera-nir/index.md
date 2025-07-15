---
title: "Alexandre Marcireau and Petruț Bogdan: Faery and Innatera/NIR"
author:
- "Alexandre Marcireau"
- "Petruț Bogdan"
- "Jens E. Pedersen"
date: 2024-10-08
description: "Alexandre Marcireau and Petruț Bogdan discuss the Faery library's integration and interaction with Innatera hardware and the Neuromorphic Intermediate Representation (NIR)."
upcoming: false
video: "1Jz3cj2y1k0"
speaker_photo: "images/speakers/multi-speaker-placeholder.png" # Placeholder, please replace
image: "faery-innatera-nir-hacking.jpg" # Placeholder, please create
type: "hacking-hours"
speaker_bio: "Alexandre Marcireau (International Center for Neuromorphic Systems, Western Sydney) and Petruț Bogdan (Innatera) are software developers active in the neuromorphic community, contributing to tools like Faery and exploring hardware-software co-design with platforms like Innatera and standards like NIR."
software_tags: ["nengo", "aestream", "norse", "spyx"]
hardware_tags: ["pulsar-by-innatera","snp-by-innatera"]
---

This Hacking Hour session features Alexandre Marcireau and Petruț Bogdan, hosted by Jens E. Pedersen. The discussion centers around the Faery event processing library, its application with Innatera's neuromorphic hardware, and its compatibility with the Neuromorphic Intermediate Representation (NIR) for broader interoperability.

## Key Individuals and Organizations

*   **Alexandre Marcireau:** Postdoctoral researcher at the International Center for Neuromorphic Systems, Western Sydney. Key figure behind Faery, with a background in event cameras.
*   **Petruț Bogdan (Peter):** Employee of Innatera. Background in SpiNNaker, PyNN, and Nengo. Works on bringing neuromorphic hardware to market.
*   **Jens E. Pedersen (Host):** Involved in neuromorphic research (aestream, Norse, NIR).
*   **Faery:** A new open-source Python library for processing event camera data, led by Alexandre Marcireau and Jens E. Pedersen.
*   **Innatera:** Company building mixed-signal neuromorphic chips (e.g., T1 chip with Nimble RISC-V CPU) and tooling (Talamo).
*   **Prophecy:** Event camera company spun out from Alexandre Marcireau's PhD lab.
*   **SpiNNaker:** Large-scale neuromorphic hardware from the University of Manchester.
*   **PyNN & Nengo:** Simulators used with SpiNNaker.
*   **BrainScales:** Neuromorphic hardware project from Heidelberg University.
*   **aestream, Norse, Spyx (SPS):** Other neuromorphic software/simulators mentioned.
*   **Neuromorphic Intermediate Representation (NIR):** A format for exchanging neural network models between neuromorphic platforms.

## Main Themes and Discussions

### Faery: Defragmenting the Event Camera Ecosystem

*   **Problem:** The current event camera data processing ecosystem is fragmented with many custom tools.
*   **Solution:** Faery aims to be a central, open-source Python library to standardize loading, processing, and displaying event data.
    > "...it's really more I think of a broader effort of trying to de fragment of the ecosystem defragmentation I I like that verb yeah." - Alexandre Marcireau
*   **Goal:** Provide a flexible, scriptable, and unintrusive tool for algorithm designers.
    > "the goal is not to build open CV for events or tensor flow but something smaller than that like image magic or star or pill." - Alexandre Marcireau
*   **Core Functionality:**
  *   Loading and writing event data (Adat, CSV, Event Stream, EVT).
  *   Basic filters (cropping, time slicing, uniformization).
*   **Streaming Pipeline:** Faery processes data packet by packet (lazy execution until a terminal operation like `save`).
    > "the idea really is that you can move out of the sort of streaming pipeline into static arrays and back to streaming pipelines if you want to... Makes it nice and flexible." - Alexandre Marcireau
*   **Static Arrays:** Convert finite event streams to NumPy arrays for static analysis and back to streams.
*   **Stream Types:**
  *   `Regular Stream`: Potentially infinite, variable packet size/duration.
  *   `Finite Stream`: Finite duration, variable packet size/duration (convertible to NumPy).
  *   `Uniform Stream` (Interval Stream): Potentially infinite, fixed time per packet.
  *   `Finite Uniform Stream`: Finite duration, fixed time per packet.
*   **Typing and API:** Focus on static typing in Python API (explicit classes, `.pyi` files) for autocompletion and clarity. Filters can preserve or change stream types.
*   **Implementation:** Rust for performance-critical parts (e.g., CSV parser) with a Python interface. Uses a workaround for circular dependencies to enable static typing.
*   **Future Features:** Rendering event streams to frames, adding watermarks/timecodes, supporting more file formats.

### Innatera and Neuromorphic Hardware Commercialization

*   **Innatera's Focus:** Building mixed-signal neuromorphic chips for sensor-edge applications, aiming for mass-market adoption.
*   **Hardware:** T1 chip (with Nimble on-chip RISC-V CPU). Development kit demonstrated with an infrared sensor.
*   **Tooling (Talamo):** Python-based SDK.
  *   **Approach:** Builds on mature frameworks like PyTorch, prioritizing usability. Provides components (quantizers, regularizers, loss functions) on top of or repackaged from PyTorch.
      > "...for us at least it's also very important that you make a usable system something that is easy for someone to pick up and to be able to quickly reconfigure and do something slightly different or completely different..." - Petruț Bogdan
      > "...we're not trying to we're not going very exotic because what we know what we're trying to do in what we're... very important for a lot of customers to be able to to know how to quickly get up to speed with a tool..." - Petruț Bogdan (On Talamo's design)
  *   **Workflow:** Describe model in Python (Talamo) -> Optimize with PyTorch -> Evaluate -> Deploy to Innatera hardware. Talamo compiles applications for native chip execution.
  *   **Target Application:** Sensor-edge problems (e.g., scene classification in headphones).
*   **Performance vs. Usability:** Innatera balances maximizing performance with providing an easy-to-use and reconfigurable system.
*   **Full Pipeline Optimization:**
    > "...what we're what we are trying to do is not just optimize a network we're optimizing a pipeline that Mak sense." - Petruț Bogdan

### Interoperability and the Neuromorphic Intermediate Representation (NIR)

*   **Problem:** Numerous SNN simulators and hardware platforms necessitate interoperability.
*   **NIR's Role:** An intermediate representation to exchange SNN models between platforms.
    > "...near is supposed to be like this intermediate between different simulators..." - Jens E. Pedersen
*   **How NIR Works:**
  *   Defines computational "primitives" (e.g., Leaky Integrator, Affine Transformation).
  *   It's a declaration/description format (like Python data classes or HDF5), not an execution engine.
      > "...near has no computation right there's no there's no place in near where we Define or we compute an aine transformation but we declare them..." - Jens E. Pedersen
  *   Each platform implements a translation layer to/from NIR primitives.
*   **Versioning:** Primitives are versioned. Platforms supporting a version support all primitives up to it.
*   **Challenges:**
  *   **Primitive Completeness:** Needs to evolve for new models/hardware.
  *   **Platform-Specific Details:** NIR currently focuses on core network dynamics, not the full computational pipeline (pre/post-processing, I/O) needed for hardware deployment.
  *   **Organizational Pain Points:** Managing integration and updates across many platforms.
  *   **Commercial Implications:** Companies might hesitate if NIR allows easy model deployment on competitor hardware, potentially undermining their integrated solution value.
      > "...however if the key added value of some companies ends up being selling a solution where it's not so much about the hardware in of itself it's about here's a whole framework... the chip isn't necessarily all that much better than the competition what's much better is the whole experience then near might get in the way of that..." - Alexandre Marcireau

## Key Takeaways

*   **Faery** aims to simplify and standardize event camera data processing with a user-friendly, streaming-focused Python API. Its stream typing is a key feature.
*   **Innatera** is commercializing neuromorphic hardware for sensor-edge applications, using a PyTorch-based SDK (Talamo) for accessibility and focusing on the entire application pipeline.
*   **NIR** is a promising open standard for SNN model interoperability. A major challenge for broader adoption, especially with commercial hardware, is its current focus on core network dynamics, lacking representation for platform-specific pipeline details.

Further discussion is needed on how NIR can incorporate these platform-specific details to bridge the gap for hardware deployment and address potential tensions between open interoperability and commercial strategies.
