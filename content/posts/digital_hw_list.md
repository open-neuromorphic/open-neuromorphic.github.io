---
title: "Digital neuromophic hardware read list"
description: "List of articles and theses related to digital hardware for neuromorphic applications."
date: 2022-12-31
draft: false
author: "Fabrizio Ottati"
cover: "img/resources/odin-frenkel.png"
---

Here's a list of articles and theses related to digital hardware designs for neuomorphic applications. I plan to update it regularly. To be redirected directly to the sources, click on the titles! 

If you are new to neuromorphic computing, I strongly suggest to get a grasp of how an SNN works from [this paper](https://arxiv.org/abs/2109.12894). Otherwise, it will be pretty difficult to understand the content of the papers listed here.

## [*TrueNorth: Design and Tool Flow of a 65 mW 1 Million Neuron Programmable Neurosynaptic Chip*](https://redwood.berkeley.edu/wp-content/uploads/2021/08/Akopyan2015.pdf), Filipp Akopyan et al., 2015 

This a fully digital chip, embedding **4096** cores with **1M** neurons and **256M** synapses! 

It adopts a mixed design methodology: the local computational cores are **synchronous**, while the interconnecting infrastructure is **asynchronous**, i.e. event-driven. In particular, each core adopts **time-multiplexing** to compute the states of its neurons minimizing core area; each core has **256** neurons associated.

TrueNorth claims to be operating in real-time: a **1KHz synchronization signal** is used to trigger the cores computations (state update, spikes processing, etc.). Moreover, they provide a software tool with one-to-one mapping to the hardware in order to deploy applications on it. 

## [*Loihi: A Neuromorphic Manycore Processor with On-Chip Learning*](https://redwood.berkeley.edu/wp-content/uploads/2021/08/Davies2018.pdf), Mike Davies et al., 2018

Probably the most popular neuromorphic processor right now. What distinguishes it from the other ones are the online learning capabilities coupled with a **completely asynchronous** design: cores and routing network are completely clock-less! 

Loihi supports **local and scalable learning rules**, through spike traces corresponding to filtered pre-synaptic and post-synaptic spike trains with configurable time constants, multiple state variables per synapse in addition to the weight value, reward traces. Moreover, several computational primitives are provided: addition of stochastic noise to the neuron's synaptic current response; configurable and adaptable synaptic, axon and refractory delays; configurable dendtritic tree processing; neuron threshold adaptiation; scaling and saturation of synaptic weights.

The Loihi chip employs **128 neuromorphic cores**, each of which consisting of **1024 primitive spiking neural units**. Each Loihi core includes a **programmable learning engine**. Each core has an **2Mb SRAM memory on-chip**, with ECC overhead included. The chip is fabbed in Intel's **14nm FinFET** process.


## [*A 0.086-mm2 12.7-pJ/SOP 64k-Synapse 256-Neuron Online-Learning Digital Spiking Neuromorphic Processor in 28nm CMOS*](https://arxiv.org/abs/1804.07858), Charlotte Frenkel et al., 2019

In this paper, a digital neuromorphic processor is presented. The Verilog is also [open source](https://github.com/ChFrenkel/ODIN)!

The neurons states and the synapses weights are stored in two foundry SRAMs on chip. In order to emulate a crossbar, **time-multiplexing** is adopted: the synapses weights and neurons states are updated in a sequential manner instead of in parallel. On the core, **256 neurons (4kB SRAM)** and **256x256 synapses (64kB SRAM)** are embedded. This allows to get a very high synapses and neuron densities: **741k synapses per squared millimiters** and **3k neurons per squared millimeters**, using a **28nm CMOS FDSOI** process. 

The neuron model is programmable through an SPI interface: the user can choose among a **LIF** model (**8 bits** for the state of each neuron) and **Izhikevic** one (**55 bits** for the state of each neuron). Online-learning capabilities are allowed with an hardware-efficient implementation of the **Spike-Driven Synaptic Plasticity (SDSP)** rule.

The design is fully **synchronous**. The time evolution of the SNN implemented on the core can be tuned choosing changing the frequency of the time reference events, allowing to update the neurons states only when events actually take place. 
The result is that each Synaptic OPeration (SOP) requires only **12.7pJ** when the chip is powered with a voltage of 0.55V.

## [*MorphIC: A 65-nm 738k-Synapse/mm2 Quad-Core Binary-Weight Digital Neuromorphic Processor With Stochastic Spike-Driven Online Learning*](https://arxiv.org/abs/1904.08513), Charlotte Frenkel et al., 2019

In this work, a **quad-core neuromorphic processor** is presented.

The neuron model employed is the **LIF** one. Synapses are quantized down to **1 bit** resolution, and online learning is allowed using a **stochastic version of the SDSP rule**. The chip is produced in **65nm CMOS**, embedding **2k LIF neurons** and **2M synapses**, reaching a density of **738k synapses per squared millimeters**. 

The neurons interconnection is arranged in a hierarchical routing solution: **mesh-based** interconnectivity for **out-of-chip** communications; **star-based** connectivity for **inter-core** communications; **crossbar-based** interconnectivity for **intra-core** communications. 27 bits per neuron are allocated, allowing for a 1k neurons fan-in for each neuron, and 2k neurons fan-out for each neuron.

## [*μBrain: An Event-Driven and Fully Synthesizable Architecture for Spiking Neural Networks*](https://www.frontiersin.org/articles/10.3389/fnins.2021.664208/full), Jan Stuijt et al., 2021

This is an **asynchronous digital architecture**, with no online-learning capabilities provided. It is an inference-only chip.

The bit precision and network topology is chosen at **synthesis** time, while the neurons parameters and synapses weights can be programmed on chip. The neuron model employed is the **Integrate and Fire (IF)** one, with no leakage; the leakage can be added using an additional inhibitory input neuron to model it. A **local clock** is generated a neuron level when a spike arrives, so that the circuit consumes only static power when not operating. No time multiplexing is employed, the architecture is organised in a **layer-by-layer** fashion where all the neurons operate in parallel (i.e. each core corresponds to a neuron). 

## [*Spiking Neural Network Integrated Circuits: A Review of Trends and Future Directions*](https://arxiv.org/abs/2203.07006), Arindam Basu et al., 2022

Nice **survey** paper that compares different ICs, both digital and mixed-signal ones. 

## [*ReckOn: A 28nm Sub-mm2 Task-Agnostic Spiking Recurrent Neural Network Processor Enabling On-Chip Learning over Second-Long Timescales*](https://arxiv.org/abs/2208.09759), Charlotte Frenkel and Giacomo Indiveri, 2022

In this work, a **Recurrent Spiking Neural Network (RSNN)** processor is presented. The Verilog code is [open source](https://github.com/chfrenkel/ReckON).

The key feature of this chip is the online learning capability, using a modified version of the **feed-forward eligibility traces** algorithm, which is a bio-inspired approximation of the BackPropagation Through Time (BPTT) algorithm employed for artificial RNNs. The chip performance is validated on gesture recognition, keyword spotting and navigation, with **sub-150μW** and **sub-squared millimeter** power and area budgets.

# [*SNE: an Energy-Proportional Digital Accelerator for Sparse Event-Based Convolutions*](https://arxiv.org/abs/2204.10687), Alfio di Mauro et al., 2022

In this work, an **only-inference digital** chip is presented. 
