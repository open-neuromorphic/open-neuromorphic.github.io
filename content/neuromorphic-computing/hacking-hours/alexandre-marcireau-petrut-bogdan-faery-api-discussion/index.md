---
title: 'Alexandre Marcireau and Petruț Bogdan: Faery API Discussion'
author:
  - Alexandre Marcireau
  - Petruț Bogdan
  - Jens E. Pedersen
date: 2024-10-22T00:00:00.000Z
description: "The Faery library's CLI design uses UNIX-style piping to simplify event camera data conversions and complex, real-time filtering pipelines."
upcoming: false
video: GVJb6oFJhpA
image: faery-api-discussion-marcireau-bogdan.jpg
type: hacking-hours
software_tags:
  - faery
  - aestream
experience_tags:
  - practitioner
expertise_tags:
  - software
content_source: "talk-summary"
summary_points:
  - "Exploration of the ideal Command Line Interface (CLI) design for the Faery event processing library."
  - "Balancing the need for simple, IO-centric file conversions with the demands of complex, custom filtering pipelines."
  - "Identification of distinct user personas, ranging from exploratory data analysts to real-time systems engineers."
  - "Evaluation of Python's `argparse` limitations and strategies for parsing nested, pipeline-style command-line arguments."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-marcireau-petrut-bogdan-faery-api-discussion/
---

Developing intuitive tools for event-based data requires balancing simple file conversions with the demands of complex filtering pipelines. This session explores the command-line interface (CLI) design for the Faery library, analyzing how established media tools like FFmpeg and GStreamer inform the creation of a seamless, UNIX-style pipeline for processing asynchronous neuromorphic data.

## Key Takeaways
- **Exploration of the ideal Command Line Interface (CLI) design for the Faery event processing library.**
- **Balancing the need for simple, IO-centric file conversions with the demands of complex, custom filtering pipelines.**
- **Identification of distinct user personas, ranging from exploratory data analysts to real-time systems engineers.**
- **Evaluation of Python's `argparse` limitations and strategies for parsing nested, pipeline-style command-line arguments.**

## What Was Built / Demonstrated
The demonstration focused on brainstorming and structuring the CLI for Faery to mirror a highly dynamic Python API. The team evaluated Python's `argparse` limitations, debating strict input/output arguments versus a modular approach using delimiter characters (like `!`) to sequentially chain filters. The session mapped out specific workflows, ranging from rapid visual diagnostics—such as generating "wiggle plots" and MP4 renders—to headless streaming on embedded Raspberry Pi edge devices.

## What This Means for Neuromorphic Computing
Accessible tooling is often the bottleneck for broader adoption of neuromorphic technologies. By designing Faery to be as ubiquitous and user-friendly as traditional computer vision and media tools (e.g., ImageMagick or FFmpeg), the barrier to entry for working with event cameras is significantly lowered.

Providing a robust, standalone CLI means researchers and engineers can integrate event-based data into existing bash scripts, headless Raspberry Pi setups, and automated data pipelines without needing to write complex Python code or manage virtual environments from scratch. Iterating on these API designs ensures the community gets robust infrastructure capable of handling the unique challenges of asynchronous neuromorphic data.
