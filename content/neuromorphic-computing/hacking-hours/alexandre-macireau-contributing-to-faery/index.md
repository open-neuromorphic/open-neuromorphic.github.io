---
title: 'Alexandre Marcireau: Contributing to Faery'
author:
  - Alexandre Marcireau
  - Jens E. Pedersen
date: 2025-10-14T00:00:00.000Z
description: >-
  A guide on how to contribute to Faery with Alexandre Marcireau and host Jens
  E. Pedersen.
upcoming: false
video: Wt8JPTs-fA8
image: logo.png
type: hacking-hours
software_tags:
  - faery
  - tonic
summary_points:
  - "Step-by-step walkthrough of contributing to the open-source Faery library."
  - "Demonstration of building a ROSBag format decoder from scratch using Rust."
  - "Integration of high-performance compiled Rust code into a user-friendly Python API."
  - "Deep dive into mitigating Python dependency issues by leveraging Rust's package management."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-macireau-contributing-to-faery/
---

Have you ever had a problem with event cameras that you had no idea how to approach? You're not alone and we're gathering a community of people to help each other out in Faery.
Every time we fix an issue, researchers like you will benefit from it. And, since this is open-source and freely available, we fix it for all perpetuity!

In this session, Alexandre Marcireau, who has been working with open-source event camera software for years, will guide us through the process of contributing to Faery.
We will pick an issue that we want to solve, and start from scratch to show you how contributions are usually made: by setting up your environment, forking the repository, making our changes, and, finally, submitting a pull request.

This session is for anyone interested in contributing to Faery, whether you're a seasoned developer or new to open-source contributions. No prior experience with Faery is necessary, but a basic understanding of programming and version control (e.g., Git) will be helpful.

## Key Takeaways
- **Step-by-step walkthrough of contributing to the open-source Faery library.**
- **Demonstration of building a ROSBag format decoder from scratch using Rust.**
- **Integration of high-performance compiled Rust code into a user-friendly Python API.**
- **Deep dive into mitigating Python dependency issues by leveraging Rust's package management.**

## What Was Built / Demonstrated
In this hacking session, the host and guest walked through the practical steps of adding a new feature to Faery: supporting the ROSBag format widely used in robotics and event-camera datasets. The demonstration covered setting up the development environment, outlining the Rust modules required for binary decoding, and creating the Python bindings using tools like Maturin. By implementing the core logic in Rust and exposing it via Python, the session showcased how Faery achieves high performance for tasks like file IO and data iteration without compromising the accessibility of a Python interface.

## What This Means for the Field
The neuromorphic field currently suffers from significant fragmentation, with different hardware and datasets relying on custom, often incompatible file formats (such as AEDAT, EVT, or ROSBag). By centralizing the parsing and conversion of these formats into a single, highly optimized open-source library like Faery, researchers can avoid reinventing the wheel for every new project.

As discussed in the session, wrapping complex, dependency-heavy tasks in stable, pre-compiled Rust binaries protects end-users from "dependency hell" and supply chain issues that often plague Python environments. This ensures that neuromorphic data processing becomes more reliable, reproducible, and accessible for the broader scientific community.

## Resources
- [Open Neuromorphic Hacking Hours](/neuromorphic-computing/software/hacking-hours/)
