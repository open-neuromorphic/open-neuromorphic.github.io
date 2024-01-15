---
title: "In-Memory Computing - Neuromorphic Engineering"
description: "In-memory computing for neuromorphic engineering"
draft: true
---


## In-memory computing
The von Neumann architecture separates computation from memory, which makes it necessary to constantly move data back and forth. This is called the von Neumann bottleneck and is responsible for around 40% of the overall power budget!
In a brain, the computation and data is co-located. 
Information is encoded and processed via ion concentrations, membrane potentials, spike rates, synaptic connections and other mechanisms within neurons. 
Neuromorphic engineering seeks to replicate this in-memory computing so data isn't continuously moved. In digital hardware, cache-level computation and processing-in-memory help mitigate the bottleneck. In analog technology, in-memory computing can be achieved with a new eletrical component called the memristor - resistive devices that retain a memory of their past states. 
Tiny memristors can be arranged in crossbar arrays, with each node acting as a connection in a neural network. Rather than shuttling discrete numbers between distant logic gates, crossbars use currents and voltages flowing directly through the memristors to efficiently, if somewhat erringly, perform vector-matrix multiplications. The analog approach thus captures key neural design principles while minimizing data transfer. 
