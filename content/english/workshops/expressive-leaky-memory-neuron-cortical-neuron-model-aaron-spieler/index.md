---
title: "The ELM Neuron: An Efficient and Expressive Cortical Neuron Model Can Solve Long-Horizon Tasks"
author: 
- Aaron Spieler
date: 2024-02-20
start_time: 18:00
end_time: 19:30
time_zone: CET
draft: false
upcoming: true
speaker_photo: speaker.jpeg
image: elm-neuron-expressive-leaky-memory.png
speaker_bio: "Aaron Spieler is a computational neuroscientist passionate about exploring the intersection of deep learning and neuroscience. After earning his Bachelor's in Computer Science from the University of Potsdam, he undertook an extended internship at Amazon Web Services working in deep learning based forecasting, before further specializing with a Master's in Computational Neuroscience at the University of Tübingen. Throughout his Master's thesis and a subsequent internship at the Max Planck Institute for Intelligent Systems, Aaron focused on phenomenological neuron modeling with applications to long-range prediction tasks. Pursuing this work allowed him to collaborate with excellent researchers from diverse backgrounds, including Prof. Bernhard Schölkopf and Prof. Anna Levina."
description: "Aaron tells us about the Expressive Leaky Memory (ELM) neuron model, a biologically inspired phenomenological model of a cortical neuron."
---

Biological cortical neurons are remarkably sophisticated computational devices, temporally integrating their vast synaptic input over an intricate dendritic tree, subject to complex, nonlinearly interacting internal biological processes. 

With the aim to explore the computational implications of leaky memory units and nonlinear dendritic processing, we introduce the **Expressive Leaky Memory (ELM) neuron model**, a biologically inspired phenomenological model of a cortical neuron. Remarkably, by exploiting a few such slowly decaying memory-like hidden states and two-layered nonlinear integration of synaptic input, our ELM neuron can accurately match the aforementioned input-output relationship with under ten-thousand trainable parameters.

We evaluate the model on various tasks with demanding temporal structures, including the Long Range Arena (LRA) datasets, as well as a novel neuromorphic dataset based on the Spiking Heidelberg Digits dataset (SHD-Adding). The ELM neuron reliably outperforms the classic Transformer or Chrono-LSTM architectures on these tasks, even solving the Pathfinder-X task with over 70% accuracy (16k context length).
