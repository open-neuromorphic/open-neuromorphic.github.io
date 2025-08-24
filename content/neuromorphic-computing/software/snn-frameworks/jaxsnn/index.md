---
title: "jaxsnn"
type: neuromorphic-software
description: Event-based training of spiking neural networks with support for BrainScaleS-2 hardware-in-the-loop based on JAX.
logo: jaxsnn.png
website: https://electronicvisions.github.io/documentation-brainscales2/latest/
dependencies: JAX, BrainScaleS-2 OS
field_of_application: Machine Learning, Neuromorphic Hardware, In-the-loop Training, Event-based Training
source_code: https://github.com/electronicvisions/jaxsnn
license: LGPL-2.0-or-later
supports_hardware: True
supports_NIR: True
pypi_id: jaxsnn
language: Python
draft: false
maintainer: Electronic Visions Group
---

## Overview

**jaxsnn** is a deep learning Python library used for event-based numerical simulation, neuromorphic emulation and training of spiking neural networks (SNNs) with [BrainScaleS-2](https://open-neuromorphic.org/neuromorphic-computing/hardware/brainscales-2-universitat-heidelberg/) neuromorphic hardware in-the-loop. It is maintained by the Electronic Visions group at Heidelberg University.

Unlike conventional deep learning libraries, which rely on dense tensor representations and time-discretized updates, jaxsnn is designed for event-driven computation. It directly operates on asynchronous spike events and supports gradient-based learning using methods such as EventProp and “Fast & Deep” spike-time coding. The library leverages JAX’s automatic differentiation, just-in-time compilation (via XLA) and support for hardware acceleration to enable efficient and composable training of biologically inspired SNNs.

jaxsnn is tailored for integration with analog neuromorphic systems such as BrainScaleS-2. It supports hardware-in-the-loop training by offloading the forward pass to neuromorphic hardware while computing gradients in software. For development and testing, jaxsnn can also be used as a pure simulator framework.

With native event-based processing, support for custom VJP definitions and a modular, JAX-compatible design, jaxsnn provides a flexible platform for bridging the gap between modern machine learning tools and the sparse, real-time nature of neuromorphic computing. It is particularly suited for research on energy-efficient learning algorithms, continuous-time dynamics, and hardware-constrained SNN modeling.
