---
title: "BrainCog"
type: neuromorphic-software
description: Open-source SNN engine with documentation in English and Chinese.
logo: braincog.png
website: https://www.brain-cog.network/
dependencies: 
field_of_application: Machine Learning, Neuroscience, Hardware Interface
source_code: https://github.com/BrainCog-X/Brain-Cog
pypi_id: braincog
license: Apache-2.0
supports_hardware: True
supports_NIR: False
language: Python
maintainer: Brain-inspired Cognitive Intelligence Lab, Institute of Automation, Chinese Academy of Sciences
draft: false
---



## Overview
**BrainCog** is an open source spiking neural network engine created for Embodied AI and brain simulations. It provides essential and fundamental components to model biological and artificial intelligence.

BrainCog has following neuron models available: IF, LIF, Izhikevich, H-H, aEIF, Multi-compartment. Its available learning rules are: STDP, Hebbian, R-STDP, STP, BCM, Backpropagation. Its encoding strategies are: Rate, Temporal, Quantum Superposition, Population, Phase.

Those basic components can be used to simulate different brain areas such as: Motor Cortex, Hippocampus, Basal Ganglia, Thalamus and more.

BrainCog supports Neuromorphic Continual Learning (NCL) for SNNs, which operate asynchronously responding to sparse events unlike most DNN based Continual Learning (CL) methods, which assume synchronous and frame based computation. This fundamental mismatch would make it difficult to translate non-spiking CL mechanisms designed for batch updates and full forward/backward passes into the SNN regime but BrainCog enables NCL without reengineering its entire SNN workflow.
