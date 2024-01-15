---
title: "Spike-based Computation - Neuromorphic Engineering"
description: "spike-based computation for neuromorphic engineering"
draft: true
---


## Spike-based computation
Most neuromorphic chips implement spiking neural networks, inspired by the brain's energy-efficient use of discrete spikes for information transmission. This includes chips like IBM's TrueNorth, Intel's Loihi, Stanford's Neurogrid, SpiNNaker, BrainScales, and SynSense Speck. As in biology, computation happens locally in each neuron, integrating inputs from thousands of synaptic connections.
However, there is debate over the appropriate level of biological detail to model. Options range from incorporating dendritic processing, multicompartment neuron models, diverse ion channels, etc. to more simplified, pragmatic designs. Early neuromorphic systems emphasized biological realism, but lately the field has trended toward simpler neuron models and capabilities like non-binary spikes. This allows greater focus on computational performance versus exhaustive biological mimicry.
Current spiking neural networks rely heavily on neural architectures developed for deep learning, like convolutional neural networks for vision and recurrence for sequence processing. While the brain uses recurrent connectivity extensively, most deep learning models employ feedforward architectures. Finding spiking neural network architectures tailored to neuromorphic hardware, while drawing inspiration from computational neuroscience, remains a challenge. 
