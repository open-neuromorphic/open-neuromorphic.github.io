---
title: Auryn
type: neuromorphic-software
description: >-
  Fast C++ simulator for recurrent spiking neural networks with synaptic
  plasticity, optimized for long simulations of small to medium-sized
  networks.
logo: auryn.png
website: 'https://fzenke.net/auryn/'
dependencies: 'Boost (with MPI support)'
field_of_application: Neuroscience
source_code: 'https://github.com/fzenke/auryn'
license: GPL-3.0
supports_hardware: false
supports_NIR: false
language: C++
maintainer: Friedemann Zenke
draft: false
category: simulator
---

## Overview
Auryn is a free, open-source simulator for recurrent spiking neural networks with plastic synapses, written in C++. It was developed by Friedemann Zenke and is described in the paper "Limits to high-speed simulations of spiking neural networks using general-purpose computers" (Zenke & Gerstner, 2014, Frontiers in Neuroinformatics).

Rather than targeting very large-scale networks, Auryn is complementary to simulators like NEST and Brian: its main focus is simulation speed, allowing small to medium-sized network models with synaptic plasticity to be simulated efficiently over long durations (hours to days of simulated time). It is optimized to run on shared-memory machines and small clusters, using MPI for parallel execution and SIMD vector instructions (SSE/AVX) to accelerate per-neuron and per-synapse computations.

A network model in Auryn is built as a modular collection of objects, such as neuron groups and the sparse synaptic connections between them. New neuron and synapse models are easy to add, and existing modules serve as templates for developers extending the simulator. Auryn ships with example simulations, including the Vogels-Abbott balanced network benchmark, and its code has been used in numerous published computational neuroscience studies on synaptic plasticity and network dynamics.

Auryn requires a C++ compiler and the Boost libraries (with MPI support) to build, and is distributed under the GNU General Public License v3.
