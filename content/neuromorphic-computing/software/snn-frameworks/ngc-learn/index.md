---
title: "NGC Learn"
type: neuromorphic-software
description: JAX-based library for spiking and rate models, biologically plausible learning, and reproducible neuroscience via the Model Museum.
logo: ngc-learn.png
website: https://ngc-learn.readthedocs.io/
dependencies: JAX
field_of_application: Computational Neuroscience, NeuroAI
source_code: https://github.com/NACLab/ngc-learn
pypi_id: ngclearn
license: BSD-3 Clause
supports_hardware: False
supports_NIR: False
language: Python
maintainer: Neural Adaptive Computing Laboratory (NAC Lab)
draft: false
---



## Overview
**NGC-Learn** is a Python library for building, simulating, and analyzing biomimetic systems including spiking networks, rate-coded biophysical models, and predictive coding circuits with biologically plausible learning, implemented on top of JAX for performance and reproducibility. NGC-Learn implements a general schema for differential-equation-based neural systems and supports research and education via curated examples and tutorials.

The framework provides components to design neuron/synapse dynamics, online/local learning rules, and predictive processing models, spanning spike-based and real-valued formulations. It includes a Model Museum that reproduces historical neuro-inspired models with runnable instructions to facilitate replication.

The project aims to enable research and teaching in computational neuroscience and NeuroAI, emphasizing biologically plausible learning and reproducibility of historical models through the ngc-museum. It also seeks to unify spike and rate-coded approaches within a consistent simulation and analysis workflow.

NGC-Learn is developed and maintained by the Neural Adaptive Computing (NAC) Laboratory, with origins in the Neural Generative Coding framework published in Nature Communications.