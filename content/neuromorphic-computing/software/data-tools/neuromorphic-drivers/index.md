---
title: "Neuromorphic drivers"
type: neuromorphic-software
description: "Python and Rust libraries to interact with event cameras in real-time."
logo: "neuromorphic-drivers.png"
website: "https://github.com/neuromorphicsystems/neuromorphic-drivers"
dependencies: "NumPy, Rust"
field_of_application: "Drivers"
source_code: "https://github.com/neuromorphicsystems/neuromorphic-drivers"
pypi_id: "neuromorphic-drivers"
license: "MIT"
supports_hardware: false
supports_NIR: false
language: "Python, Rust"
maintainer:
  - "Alexandre Marcireau"
draft: false
---

## Overview

Neuromorphic drivers is a library to interact with USB event cameras in real-time. It is compatible with all major operating systems (Linux x64 and ARM, macOS x64 and ARM, and Windows x64) and it aims to support as many commercial devices as possible.

The library can be used in Python and Rust.

By design, Neuromorphic drivers provides no processing algorithms. It may instead be combined with other libraries (for instance https://github.com/neuromorphs/tonic or https://github.com/aestream/faery) to build real-time processing pipelines.

Neuromorphic drivers does not depend on Metavision, libcaer, or dv-processing. It instead uses its own implementation of the cameras' USB protocols (https://github.com/neuromorphicsystems/neuromorphic-drivers/tree/main/drivers/src/devices). This approach facilitates cross-platform support and lets us ship lightweight pre-compiled Python wheels (https://pypi.org/project/neuromorphic-drivers/#files), which means that Python users do not need specific shared libraries or a compiler toolchain on their machine.
