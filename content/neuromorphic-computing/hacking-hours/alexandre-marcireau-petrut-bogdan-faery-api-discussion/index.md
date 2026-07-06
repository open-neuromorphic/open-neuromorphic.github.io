---
title: 'Alexandre Marcireau and Petruț Bogdan: Faery API Discussion'
author:
  - Alexandre Marcireau
  - Petruț Bogdan
  - Jens E. Pedersen
date: 2024-10-22T00:00:00.000Z
description: >-
  An in-depth discussion on the Faery API with Alexandre Marcireau, Petruț
  Bogdan, and host Jens E. Pedersen.
upcoming: false
video: GVJb6oFJhpA
image: faery-api-discussion-marcireau-bogdan.jpg
type: hacking-hours
software_tags:
  - faery
  - aestream
summary_points:
  - "Exploration of the ideal Command Line Interface (CLI) design for the Faery event processing library."
  - "Balancing the need for simple, IO-centric file conversions with the demands of complex, custom filtering pipelines."
  - "Identification of distinct user personas, ranging from exploratory data analysts to real-time systems engineers."
  - "Evaluation of Python's `argparse` limitations and strategies for parsing nested, pipeline-style command-line arguments."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-marcireau-petrut-bogdan-faery-api-discussion/
---

Jens E. Pedersen hosts a Hacking Hour with Alexandre Marcireau and Petruț Bogdan. This session is dedicated to a comprehensive discussion about the Faery API, covering its design philosophy, current capabilities, and future directions for this event processing library.

## Key Takeaways
- **Exploration of the ideal Command Line Interface (CLI) design for the Faery event processing library.**
- **Balancing the need for simple, IO-centric file conversions with the demands of complex, custom filtering pipelines.**
- **Identification of distinct user personas, ranging from exploratory data analysts to real-time systems engineers.**
- **Evaluation of Python's `argparse` limitations and strategies for parsing nested, pipeline-style command-line arguments.**

## What Was Discussed / Demonstrated
This hacking session focused heavily on software architecture, specifically brainstorming and designing the CLI for Faery. Drawing inspiration from established media tools like FFmpeg and GStreamer, the discussion explored how to map a highly dynamic Python API to a predictable, intuitive command-line experience. The team debated various parsing strategies—from strict input/output arguments to a Unix-philosophy approach utilizing piping and delimiter characters (like `!`) for chaining filters sequentially.

The conversation also broke down specific user stories to guide the design. It highlighted that exploratory analysis requires rapid visual feedback (like rendering event streams to MP4s or generating diagnostic "wiggle plots"), while embedded edge applications require lightweight, scriptable streaming that integrates easily with external tools.

## What This Means for the Field
Accessible tooling is often the bottleneck for broader adoption of neuromorphic technologies. By designing Faery to be as ubiquitous and user-friendly as traditional computer vision and media tools (e.g., ImageMagick or FFmpeg), the barrier to entry for working with event cameras is significantly lowered.

Providing a robust, standalone CLI means researchers and engineers can integrate event-based data into existing bash scripts, headless Raspberry Pi setups, and automated data pipelines without needing to write complex Python code or manage virtual environments from scratch. Iterating on these API designs ensures the community gets robust infrastructure capable of handling the unique challenges of asynchronous neuromorphic data.
