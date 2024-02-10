---
title: "Brian"
type: neuromorphic-software
description: Free, open-source simulator for SNNs, written in Python, focusing on ease of use and flexibility.
logo: brian.jpg
website: https://briansimulator.org/
dependencies: 
field_of_application: Neuroscience
source_code: https://github.com/brian-team/brian2
stars_widget_url: https://img.shields.io/github/stars/brian-team/brian2.svg?style=social
stars: 835
version_widget_url: https://img.shields.io/pypi/v/brian2.svg
license: custom
supports_hardware: False
supports_NIR: False
language: Python
maintainer: Romain Brette, Marcel Stimberg, Dan Goodman 
draft: false
---

## Overview
**Brian2** is an open-source Python library for the simulation of spiking neural networks (SNNs) notable for its user-friendly syntax and flexible approach to the design and
simulation of neural models. Brian2 is continually maintained by Romain Brette, Marcel Stimberg, and Dan Goodman since 2012, and they heavily encourage and support community
contributions and involvement. The project has been publicly available for 12 years positioning themselves as the pillar of the neuromorphic community. 

Being one of the first to provide a user-friendly and flexible library for researchers and practitioners interested in understanding and furthering the field of SNNs. 
Also, Brian2 has a robust community, comprehensive documentation, and follows the latest advancements in neural network simulations make Brian 2 a powerful tool in the field of 
teaching and research.

The framework emphasizes simplicity, efficiency and extensibility, making it a popular choice for both teaching and research. The neural models are defined using equations directly,
making the translation from theoretical models to simulation code more streamlined and straightforward. This feature lowers the barriers to entry for those who are new to
computational modeling.

The models have many parameters that allow for interesting network architectures like specifying the pre-synaptic source, and the post-synaptic source. With neuron models being
defined by equations and the fact that you can specify you're synaptic connections, the topology and construction of the network has a very low level of abstraction. Making the
library give the user a lot of creative freedom to design their networks and a good way to learn the principles of spiking and non-spiking neural networks.
