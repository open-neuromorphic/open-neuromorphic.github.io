---
title: SpikeNN
type: "neuromorphic-software"
description: A Python library for CPU-based SNN simulation using first-spike coding and supervised STDP.
website: "https://github.com/ggoupy/SpikeNN"
dependencies: "Python, NumPy, Numba"
field_of_application: SNN Simulation, Supervised learning
source_code: "https://github.com/ggoupy/SpikeNN"
license: "GPL-3.0"
supports_hardware: false
supports_NIR: false
language: "Python"
maintainer:
- Gaspard Goupy
draft: false
---


## Overview

**SpikeNN** is a CPU-based spiking neural network framework for classification developed by Gaspard Goupy at the University of Lille, France. The framework implements the Neuronal Competition Groups (NCG) architecture presented in the paper "Neuronal Competition Groups with Supervised STDP for Spike-Based Classification" published at NeurIPS 2024. SpikeNN was developed within the CRIStAL research center with support from Chaire Luxant-ANVI and IRCICA.

SpikeNN features fully-connected architectures that employ first-spike coding (time-to-first-spike, TTFS) with single-spike IF/LIF neuron models and floating-point spike timestamps for event-driven processing. The framework implements supervised STDP-based learning rules combined with the NCG architecture, which promotes intra-class winner-take-all competition and uses a novel competition regulation mechanism based on two-compartment thresholds. Input data is processed as ordered sparse spike lists, where each spike is represented as a tuple containing the neuron index and firing timestamp.

SpikeNN is designed for researchers working on supervised spike-based classification with biologically-inspired learning rules, particularly those exploring alternatives to backpropagation for neuromorphic hardware deployment. The framework has been validated on image classification benchmarks including MNIST, Fashion-MNIST, CIFAR-10, and CIFAR-100, often used in combination with unsupervised feature extractors like STDP-CSNN or SoftHebb-CNN.
