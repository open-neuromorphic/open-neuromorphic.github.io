---
title: "Neuromorphic Intermediate Representation (NIR)"
type: "neuromorphic-software"
description: "A graph-based intermediate representation for computational graphs of spiking neural networks, enabling interoperability across different simulators and hardware."
logo: "nir-logo.png"
website: "https://neuroir.org/"
dependencies: "Numpy"
field_of_application: "Interoperability / SNN Model Exchange"
source_code: "https://github.com/neuromorphs/NIR"
pypi_id: "nir"
license: "MIT"
supports_hardware: True
supports_NIR: True
language: "Python"
maintainer:
  - "Jens E. Pedersen"
  - "Felix Bauer"
  - "Jason Eshraghian"
  - "Bernhard Vogginger"
draft: false
software_tags:
  - "lava"
  - "nengo"
  - "norse"
  - "rockpool"
  - "sinabs"
  - "snntorch"
  - "spyx"
hardware_tags:
  - "loihi-2-intel"
  - "spinnaker-2-university-of-dresden"
  - "speck-synsense"
  - "xylo-synsense"
---

## Overview

By defining a common set of computational primitives (like Leaky-Integrate-and-Fire neurons and convolutions), NIR allows researchers and developers to define a model once and then translate it to run on different backends without having to rewrite the model from scratch for each platform. This decouples the model definition from the hardware or software-specific implementation details.

NIR is designed to be extensible and currently supports a range of popular SNN frameworks and hardware, including:
-   **Simulators:** [Lava-DL](/neuromorphic-computing/software/snn-frameworks/lava/), [Nengo](/neuromorphic-computing/software/snn-frameworks/nengo/), [Norse](/neuromorphic-computing/software/snn-frameworks/norse/), [Rockpool](/neuromorphic-computing/software/snn-frameworks/rockpool/), [Sinabs](/neuromorphic-computing/software/snn-frameworks/sinabs/), [snnTorch](/neuromorphic-computing/software/snn-frameworks/snntorch/), [Spyx](/neuromorphic-computing/software/snn-frameworks/spyx/)
-   **Hardware:** [Intel Loihi 2](/neuromorphic-computing/hardware/loihi-2-intel/), [SpiNNaker 2](/neuromorphic-computing/hardware/spinnaker-2-university-of-dresden/), [SynSense Speck](/neuromorphic-computing/hardware/speck-synsense/), [SynSense Xylo](/neuromorphic-computing/hardware/xylo-synsense/).

More information can be found in the [NIR documentation](https://neuroir.org/docs/) and the [Nature Communications paper](https://www.nature.com/articles/s41467-024-52259-9).
It is actively being developed on [GitHub](https://github.com/neuromorphs/nir) with additional tools for [PyTorch integrations](https://github.com/neuromorphs/nirtorch).
