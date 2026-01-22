---
title: "Rust SNNs"
type: neuromorphic-software
description: Rust implementation of three spiking neuron models with functions for building different types of SNNs
logo: 
website: https://docs.rs/spiking_neural_networks/latest/spiking_neural_networks
dependencies: 
field_of_application: Machine Learning
source_code: https://github.com/NikhilMukraj/spiking-neural-networks
pypi_id: 
license: Apache 2.0
supports_hardware: True
supports_NIR: False
language: Rust
maintainer: Nikhil Mukraj
draft: false
---


## Overview
**Rust SNNs** is a Rust crate designed for spiking neural network simulations with neurotransmission, spike trains, spike-timing–dependent plasticity (STDP), attractors, reward-modulated dynamics and lattice-connected neurons. Rust SNNs includes models of LIF, Hodgkin–Huxley and Izhikevich neurons.

It uses traits to describe neuron and synapse dynamics and it can be extended with custom neurotransmitters, receptors or neuron models while staying strongly typed.
