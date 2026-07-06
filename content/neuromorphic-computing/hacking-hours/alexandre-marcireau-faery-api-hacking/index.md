---
title: 'Alexandre Marcireau: Faery API Hacking'
author:
  - Alexandre Marcireau
  - Jens E. Pedersen
date: 2024-10-29T00:00:00.000Z
description: "See how the Faery API handles event-stream regularization and custom CLI parsers to efficiently render uncalibrated neuromorphic event data into MP4 video."
upcoming: false
video: bkwC0ygMous
image: alexandre-marcireau-faery-api-hacking.jpg
type: hacking-hours
software_tags:
  - faery
experience_tags:
  - practitioner
  - intermediate
expertise_tags:
  - software
  - computer-vision
content_source: "talk-summary"
summary_points:
  - "Faery explicitly distinguishes between raw event streams (arbitrary packet durations) and regularized streams (guaranteed packet durations) to enable accurate video framing."
  - "The `regularize` operator controls temporal resolution, allowing users to output slow-motion or sped-up video by decoupling packet frequency from the output frame rate."
  - "Frame data can be output via a specialized envelope function that uses floating-point sign bits to efficiently distinguish 'on' and 'off' events."
  - "A block-based CLI parser groups arguments dynamically, improving composition for complex pipelines involving multiple inputs, filters, and outputs."
  - "Integrating UDP event protocols like Spinnaker's 'spifferella' requires careful management of variable timestamps and real-time processing constraints."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-marcireau-faery-api-hacking/
---

Converting asynchronous, time-continuous event streams into fixed-framerate MP4 videos presents a fundamental data structure clash. In this Hacking Hour, Alexandre Marcireau and host Jens E. Pedersen walk through extending the Faery event processing library to handle robust video rendering and advanced command-line parsing.

## Key Takeaways
- **Regularization is required for video:** Raw event streams deliver packets with arbitrary durations and event counts. To generate a standard MP4, the data must first pass through a `regularize` operator, forcing the asynchronous events into fixed-duration bins that translate 1:1 into video frames.
- **Playback speed is mathematically controlled:** By decoupling the regularization frequency from the final file's frame rate, the API allows for precise temporal manipulation. Regularizing at 600Hz but saving the file at 60fps instantly creates a 10x slow-motion video.
- **Floating-point envelopes preserve event polarity:** Instead of immediately crushing events into an RGB image, Faery can output a floating-point frame representation. The sign bit preserves the polarity (positive for 'on', negative for 'off'), while the magnitude represents temporal decay, retaining critical information for downstream GPU processing.
- **Composability over monoliths:** Standalone functions are favored for API design. Instead of burying timecode generation inside the `to_file` rendering command, Faery applies `add_time_code` as an independent filter, ensuring it can be dynamically scaled or omitted.
- **Hardware streaming limits processing speed:** While Faery defaults to processing files as fast as the CPU allows, pulling live data from hardware via protocols like Spinnaker’s UDP introduces real-time bottlenecks that require explicit timestamp management.

## What Was Built / Demonstrated
The session centered on refactoring Faery’s Command Line Interface (CLI) to support highly modular processing pipelines. A custom block-based parser was implemented, leveraging Python’s `argparse` to group configurations cleanly under distinct `input`, `filter`, and `output` blocks.

Additionally, the development team integrated and tested the `to_file` and `to_files` functions, demonstrating how an incoming neuromorphic dataset can be enveloped, mapped via a color blind-friendly diverging colormap, stamped with a programmatic timecode, and directly rendered into an MP4 file.

## What This Means for Neuromorphic Computing
One of the most persistent hurdles in event-based vision is simply visualizing the data. Because standard computer vision and deep learning tools expect dense, synchronized frames, researchers frequently struggle to share their results outside of specialized simulation environments.

By building performant, customizable export pipelines directly into the Faery CLI, the library drastically reduces the friction of working with event cameras. Allowing developers to effortlessly transform asynchronous spikes into standard video codecs ensures neuromorphic research can be easily reviewed, debugged, and presented to the broader computer science community.

## Resources
- **Video:** [Watch the session on YouTube](https://www.youtube.com/watch?v=bkwC0ygMous)
