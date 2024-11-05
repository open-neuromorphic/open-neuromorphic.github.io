---
title: "mlGeNN"
type: neuromorphic-software
description: Simulator for SNN models focusing on dynamics, size, structure of neural systems, not on individual neuron morphology.
logo: nest.png
website: https://ml-genn.readthedocs.io/en/latest/
dependencies: 
field_of_application: Machine learning
source_code: https://github.com/genn-team/ml_genn
stars_widget_url: https://img.shields.io/github/stars/genn-team/ml_genn.svg?style=social
stars: 24
version_widget_url: https://img.shields.io/github/release/genn-team/ml_genn.svg?label=github%20release
license: LGPL-2.1
supports_hardware: False
supports_NIR: False
language: Python
maintainer: James Knight
draft: false
---

## Overview
**mlGeNN** is a new library for machine learning with Spiking Neural Networks (SNNs), built on the efficient foundation provided by our GeNN simulator. mlGeNN expose the constructs required to build SNNs using an API, inspired by modern ML libraries like Keras, which aims to reduce cognitive load by automatically calculating layer sizes, default hyperparameter values etc to enable rapid prototyping of SNN models.

mlGeNN provides user friendly implementations of novel SNN training algorithms such as e-prop and EventProp  to enable spike-based ML on top of GeNN’s GPU-optimised sparse data structures and algorithms.