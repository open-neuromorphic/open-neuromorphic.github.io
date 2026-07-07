---
title: 'Alexandre Marcireau: Faery Release v0.3.0'
author:
  - Alexandre Marcireau
  - Jens E. Pedersen
date: 2024-11-05T00:00:00.000Z
description: "Discover the architectural decisions behind Faery v0.3.0, including its new MP4 conversion pipeline, dynamic CLI reflection, and Rust-based build challenges."
upcoming: false
video: Wz1s0dFp1II
image: alexandre-marcireau-faery-release-v0-3-0.jpg
type: hacking-hours
software_tags:
  - faery
experience_tags:
  - practitioner
  - intermediate
expertise_tags:
  - software
content_source: "talk-summary"
summary_points:
  - "Faery v0.3.0 introduces native MP4 video conversion for neuromorphic event streams, crossing a major milestone for standardizing event camera outputs."
  - "Building the Rust-based video dependency across multiple operating systems requires navigating complex path heuristics and isolated build environments."
  - "The new Command Line Interface relies on dynamic reflection (via Python's inspect tool) to automatically expose new library filters without duplicating API code."
  - "Color map implementations now include simulated color-blindness rendering, ensuring event-based visualizations remain accessible in research publications."
  - "Releasing Python packages with compiled Rust binaries necessitates careful CI/CD orchestration to ensure cross-platform wheel distribution."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-marcireau-faery-release-v0-3-0/
---

Deploying high-performance neuromorphic software requires bridging the gap between low-level compiled languages and accessible Python APIs. In this Hacking Hour, Alexandre Marcireau reviews the v0.3.0 release of the Faery event processing library, detailing the process of pushing complex Rust-Python bindings to production and establishing a robust Continuous Integration and Deployment (CI/CD) workflow.

## Key Takeaways
- **API design requires scientific iteration:** Building a robust library interface cannot be rushed. It requires an iterative process of proposing theoretical abstractions, testing them practically against edge cases, and engaging in arduous, detailed discussions to finalize the user experience.
- **MP4 integration is a milestone:** Merging native MP4 (h.264/h.265) conversion solves a massive usability hurdle for event-camera researchers, allowing them to render streams directly to video across all operating systems without relying on external ffmpeg juggling.
- **Isolated build environments are fragile:** Packaging Rust binaries for Python using Maturin within isolated systems (like Nix) routinely exposes missing underlying C-dependencies. Tools like the Netwide Assembler (`nasm`) and `libclang` often fail to link properly due to custom OS path heuristics in build scripts.
- **Python reflection automates the CLI:** Rather than manually updating the Command Line Interface every time a new data filter is created, Faery utilizes Python's `inspect` module at startup to dynamically map and expose the library's internal functions directly to the user.
- **Color blindness simulation aids accessibility:** Because neuromorphic visualizations heavily rely on color mapped polarities (e.g., distinguishing positive and negative spikes), the API now includes filters to simulate color deficiencies. This guarantees researchers can export accessible graphics for publications.

## What Was Built / Demonstrated
The session involved a live review and integration of the MP4 conversion branch, preparing it for a semantic version release. The developers encountered and debugged isolated environment compilation failures caused by missing `nasm` environment variables within the `configure` script of the h.264 Rust dependency.

Following the build fixes, the session demonstrated triggering the automated GitHub Actions pipeline. By isolating the version number to the `pyproject.toml` file and tagging the git commit, the CI/CD pipeline automatically initiated a 40-build matrix to compile and publish the binary wheels directly to the Python Package Index (PyPI).

## What This Means for Neuromorphic Computing
A significant amount of neuromorphic tooling remains locked behind fragmented, difficult-to-compile repositories. Pushing a Python library that relies on underlying Rust speed means navigating severe deployment complexities so the end-user doesn't have to.

By formalizing the build matrix and fully automating the release pipeline, Faery ensures that its high-performance event-processing capabilities are universally accessible. Users can simply run `pip install` on Windows, macOS, or Linux, and immediately begin working with event-based video rendering without having to install compilers or configure complex system paths.

## Resources
- **Video:** [Watch the session on YouTube](https://www.youtube.com/watch?v=Wz1s0dFp1II)
