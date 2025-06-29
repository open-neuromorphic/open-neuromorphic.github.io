---
title: "mlGeNN"
type: neuromorphic-software
description: Framework for machine learning with SNNs built on the GeNN simulator. Focused on ease of use in combination with computational efficiency derived from GeNN.
logo: 
website: https://ml-genn.readthedocs.io/en/latest/
dependencies: GeNN
field_of_application: Machine learning
source_code: https://github.com/genn-team/ml_genn
stars: 24
license: LGPL-2.1
supports_hardware: False
supports_NIR: False
language: Python
maintainer: James Knight
draft: false
---



## Overview
**mlGeNN** is a library for machine learning with Spiking Neural Networks (SNNs), built on the efficient foundation of the GeNN simulator. 

mlGeNN exposes the constructs required to build SNNs using an API, inspired by modern ML libraries like Keras, which aims to reduce cognitive load by automatically calculating layer sizes, default hyperparameter values etc to enable rapid prototyping of SNN models.

mlGeNN provides user friendly implementations of novel SNN training algorithms such as e-prop and EventProp to enable spike-based ML on top of GeNN’s GPU-optimised sparse data structures and algorithms. This allows better scaling and, using EventProp, allows training with high temporal resolution and/or thousands of time steps. mlGeNN provides extensive documentation and tutorials.
