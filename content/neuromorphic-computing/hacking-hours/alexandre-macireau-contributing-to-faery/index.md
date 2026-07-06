---
title: 'Alexandre Marcireau: Contributing to Faery'
author:
  - Alexandre Marcireau
  - Jens E. Pedersen
date: 2025-10-14T00:00:00.000Z
description: "Implementing ROSBag format support in Faery demonstrates how compiling Rust modules into a Python API ensures high-performance event data decoding."
upcoming: false
video: Wt8JPTs-fA8
image: logo.png
type: hacking-hours
software_tags:
  - faery
  - tonic
experience_tags:
  - practitioner
  - intermediate
expertise_tags:
  - software
content_source: "talk-summary"
summary_points:
  - "Step-by-step walkthrough of contributing to the open-source Faery library."
  - "Demonstration of building a ROSBag format decoder from scratch using Rust."
  - "Integration of high-performance compiled Rust code into a user-friendly Python API."
  - "Deep dive into mitigating Python dependency issues by leveraging Rust's package management."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-macireau-contributing-to-faery/
---

The open-source Faery library centralizes the parsing and conversion of diverse neuromorphic file formats, shielding end-users from dependency conflicts by compiling heavy computational loads in Rust. In this session, Alexandre Marcireau walks through the practical steps of contributing to the codebase by building a ROSBag format decoder from scratch. By encapsulating high-performance Rust binaries within a Python API, Faery bypasses common Python dependency issues, offering a robust tool for processing fragmented event-based datasets.

## Key Takeaways
- **Step-by-step walkthrough of contributing to the open-source Faery library.**
- **Demonstration of building a ROSBag format decoder from scratch using Rust.**
- **Integration of high-performance compiled Rust code into a user-friendly Python API.**
- **Deep dive into mitigating Python dependency issues by leveraging Rust's package management.**

## What Was Built / Demonstrated
In this hacking session, the host and guest walked through the practical steps of adding a new feature to Faery: supporting the ROSBag format widely used in robotics and event-camera datasets. The demonstration covered setting up the development environment, outlining the Rust modules required for binary decoding, and creating the Python bindings using tools like Maturin. By implementing the core logic in Rust and exposing it via Python, the session showcased how Faery achieves high performance for tasks like file IO and data iteration without compromising the accessibility of a Python interface.

## What This Means for Neuromorphic Computing
The neuromorphic field currently suffers from significant fragmentation, with different hardware and datasets relying on custom, often incompatible file formats (such as AEDAT, EVT, or ROSBag). By centralizing the parsing and conversion of these formats into a single, highly optimized open-source library like Faery, researchers can avoid reinventing the wheel for every new project.

As discussed in the session, wrapping complex, dependency-heavy tasks in stable, pre-compiled Rust binaries protects end-users from "dependency hell" and supply chain issues that often plague Python environments. This ensures that neuromorphic data processing becomes more reliable, reproducible, and accessible for the broader scientific community.

## Resources
- [Open Neuromorphic Hacking Hours](/neuromorphic-computing/software/hacking-hours/)
