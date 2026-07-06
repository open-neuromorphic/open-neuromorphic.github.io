---
title: 'Alexandre Marcireau: GitHub Actions for the Event Processing Library Faery'
author:
  - Alexandre Marcireau
  - Jens E. Pedersen
date: 2024-09-30T00:00:00.000Z
description: "Explore how to use GitHub Actions and cibuildwheel to automate cross-platform compilation and deployment of the Rust-backed Faery event processing library."
upcoming: false
video: BGclcb7u4PQ
image: alexandre-marcireau-faery-github-actions.jpg
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
  - "Python libraries utilizing low-level Rust extensions face massive deployment hurdles if users are forced to compile code locally upon installation."
  - "Leveraging GitHub Actions with cibuildwheel automates the generation of pre-compiled binary 'wheels' across Windows, macOS, and Linux targets."
  - "Automated CI pipelines safeguard PyPI supply chains by securely injecting API tokens and validating that newly pushed code imports successfully."
  - "Compiling projects with Rust submodules requires specific Git checkout configurations to ensure all necessary dependencies are pulled into the build matrix."
  - "Building the Source Distribution (sdist) correctly is critical for edge-case hardware like Raspberry Pi, which must compile the source code natively."
url: >-
  /neuromorphic-computing/software/hacking-hours/alexandre-marcireau-faery-github-actions/
---

Delivering high-performance computational speeds in Python often requires writing core components in lower-level languages like C++ or Rust. However, this creates a massive deployment headache, as end-users are frequently forced to navigate compilers and dependency chains just to install the library. In this Hacking Hour, Alexandre Marcireau demonstrates how to establish robust Continuous Integration and Deployment (CI/CD) pipelines using GitHub Actions to automate cross-platform wheel compilation for the Faery library.

## Key Takeaways
- **Pre-compilation is mandatory for usability:** Requiring end-users to compile Rust code locally severely limits a library's adoption. Providing pre-compiled binary "wheels" ensures that a standard `pip install` works flawlessly out of the box.
- **`cibuildwheel` automates the matrix:** Managing builds for varying Python versions across Intel and ARM architectures on Linux, macOS, and Windows is incredibly tedious. Using `cibuildwheel` abstracts this complexity, automatically orchestrating isolated build environments for every target hardware profile.
- **Testing happens on the local build:** A CI pipeline must verify the newly compiled wheel, not the legacy version already hosted on PyPI. By utilizing specific flags (`--no-deps --find-links`), the action can forcefully install and test the isolated local build before validating a release.
- **Git submodules must be explicitly requested:** When an open-source project relies on a low-level submodule (like `rust-numpy`), GitHub Actions will fail to compile unless the checkout step explicitly includes `submodules: true` to fetch the external dependency tree.
- **Secrets protect the supply chain:** Automating uploads to the Python Package Index (PyPI) introduces security vulnerabilities if handled improperly. The workflow securely utilizes GitHub Secrets to inject PyPI API tokens at runtime, safeguarding against malicious code injection.

## What Was Built / Demonstrated
The session walked through writing a GitHub Actions workflow from scratch. The YAML file was configured to trigger automatically on both repository pushes and manually drafted releases.

The live debugging process highlighted how to correctly clone the `rust-numpy` submodule, how to set up the `cibuildwheel` architecture targets, and how to verify that the generated binary artifact successfully imports via Python without throwing segmentation faults. Finally, the necessary steps to bundle a Source Distribution (sdist) and pipe the finished assets directly into a PyPI release were established.

## What This Means for Neuromorphic Computing
The neuromorphic ecosystem relies on heavily optimized event-processing routines, meaning libraries must inherently utilize high-performance languages under the hood.

By investing time into establishing sophisticated, automated GitHub Actions pipelines, maintainers guarantee that their neuromorphic tools are actually usable by the broader community without demanding deep systems-programming knowledge from the researchers utilizing them. This continuous integration approach ensures that breaking changes across operating systems are caught immediately during Pull Requests, keeping the software highly stable.

## Resources
- **Video:** [Watch the session on YouTube](https://www.youtube.com/watch?v=BGclcb7u4PQ)
