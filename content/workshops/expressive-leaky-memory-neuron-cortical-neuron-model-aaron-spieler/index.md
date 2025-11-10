---
title: "The ELM Neuron: An Efficient and Expressive Cortical Neuron Model Can Solve Long-Horizon Tasks"
author: 
- Aaron Spieler
- Gregor Lenz
date: 2024-02-27
draft: false
upcoming: false
video: q0shX-zCk4c
image: elm-neuron-expressive-leaky-memory.png
description: "Aaron tells us about the Expressive Leaky Memory (ELM) neuron model, a biologically inspired phenomenological model of a cortical neuron."
---

Biological cortical neurons are remarkably sophisticated computational devices, temporally integrating their vast synaptic input over an intricate dendritic tree, subject to complex, nonlinearly interacting internal biological processes. 

With the aim to explore the computational implications of leaky memory units and nonlinear dendritic processing, we introduce the **Expressive Leaky Memory (ELM) neuron model**, a biologically inspired phenomenological model of a cortical neuron. Remarkably, by exploiting a few such slowly decaying memory-like hidden states and two-layered nonlinear integration of synaptic input, our ELM neuron can accurately match the aforementioned input-output relationship with under ten-thousand trainable parameters.

We evaluate the model on various tasks with demanding temporal structures, including the Long Range Arena (LRA) datasets, as well as a novel neuromorphic dataset based on the Spiking Heidelberg Digits dataset (SHD-Adding). The ELM neuron reliably outperforms the classic Transformer or Chrono-LSTM architectures on these tasks, even solving the Pathfinder-X task with over 70% accuracy (16k context length).
