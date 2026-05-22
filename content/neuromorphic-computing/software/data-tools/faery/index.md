---
title: "Faery"
type: neuromorphic-software
description: "A modern, fast, and friendly Python library for processing event-based camera data, with a focus on streaming and interoperability."
logo: "faery.png"
website: "https://aestream.github.io/faery/"
dependencies: "NumPy, Rust"
field_of_application: "Data Processing"
source_code: "https://github.com/aestream/faery"
pypi_id: "faery"
license: "GPL-3.0-or-later"
supports_hardware: false
supports_NIR: false
language: "Python, Rust"
maintainer:
  - "Alexandre Marcireau"
  - "Jens E. Pedersen"
draft: false
---

## Overview

Faery is a modern, high-performance Python library designed to streamline the processing of event-based data from neuromorphic cameras. It provides a user-friendly, streaming-first API for loading, filtering, and manipulating event data, treating streams as first-class citizens.

The core of Faery is written in Rust for maximum performance, especially for parsing and I/O-intensive tasks, while offering a flexible and intuitive Python interface. It aims to defragment the neuromorphic ecosystem by providing a standardized tool for handling various event data formats. Its lazy-execution model processes data packet-by-packet, making it efficient for handling large datasets and real-time streams.

Key features include:
- Support for multiple event-data file formats (`.aedat4`, `.es`, `.dat`, `.raw`, `.csv`).
- A rich set of filters for cropping, time-slicing, and data regularization.
- The ability to seamlessly convert between streaming data and static NumPy arrays.
- Tools for rendering event streams into videos and image sequences.

Faery is designed to be the "Initial D" of event processing—fast, efficient, and built to handle the curves of neuromorphic data.
