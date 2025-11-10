---
title: "Stork"
type: neuromorphic-software
description: Library designed for training spiking neural networks with backpropagation through time (BPTT).
website: https://zenkelab.org/2022/06/fluctuation-driven-initialization-for-spiking-neural-network-training
dependencies: PyTorch
field_of_application: Neuromorphic Hardware, Computational Neuroscience, Spiking Neural Networks, Local Plasticity
source_code: https://github.com/fmi-basel/stork
version_badge_url_override: 
license: "MIT"
supports_hardware: False
supports_NIR: False
language: Python
draft: false
maintainer: FMI Zenke Lab
---



## Overview

**Stork** is a library designed for the training of spiking neural networks. It extends PyTorch's auto-differentiation capabilities with surrogate gradients to enable the training of SNNs with backpropagation through time (BPTT). Stork supports leaky integrate-and-fire (LIF) neurons including adaptive LIF neurons and different kinds of synaptic connections allowing to use Dalian and Convolutional layers as well as constructing network architectures with recurrent or skip connections. 

For each neuron group customizable activity regularizers are available to for example apply homeostatic plasticity. Stork uses per default initialization in the fluctuation-driven regime that enhances SNN training in deep networks. Stork can be used with Tonic.
