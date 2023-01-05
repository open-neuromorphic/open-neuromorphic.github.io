---
title: "Spiking neural networks in analog electronics"
description: "Introductory article."
date: 2022-1-2
author: "Fabrizio Ottati"
# image: "frenkel-thesis.png"
draft: false
---

***<u>Note</u>: this article is under construction***

In this article, we will walk through a basic implementation of a spiking neural network in analog electronics (mixed-signal, to be precise). You can find out how this network is implemented using digital hardware [here](https://fabrizio-ottati.github.io/blog/spiking_neurons/). Our motivation to move to the analog domain is manifold:

- Firstly, we can implement basic operations using fewer components if we let the device physics do the work for us - for example, we can use Kirchhoff's current law to easily add two current values instead of building a digital full adder. 
- Secondly, we can let time represent itself in order to directly implement differential equations instead of discretizing them and running them using a clock signal (***note on digital asynchronous designs***).
- Thirdly, the brain does not use fully digital circuits to implement its computation, so if we want to understand how the brain computers (and if we buy into the Feynmanian "understanding by building" mantra), we should look to mixed-signal circuits instead. Indeed, it can be argued that the brain found a sweet spot in using analog computation and digital communication - which is embodied in mixed-signal neuromorphic designs [Sarpeshkar1998,Boahen2017].

For didactic purposes, we will walk through a very simple mixed-signal implementation of a spiking neural network (SNN). For this, we need a **synapse** which receives a *voltage spike* and converts it into a *synaptic current*. We need one synapse for each connection between two neurons. A **neuron** takes the *synaptic currents* from all its synapses to charge its *membrane potential*. Once the *membrane potential* reaches a threshold voltage, the neuron emits a *voltage spike*, which is transmitted to other neurons' synapses. 

However, before we dive into the spiking fun, we need to meet the star of mixed-signal neuromorphics: the sub-treshold CMOS transistor. It is the basis for all circuits we will use in this article, so we will do well by studying it first.

## prelude: sub-threshold CMOS
"The fact that we can build devices that implement the same basic operations as those the nervous system uses leads to the inevitable conclusion that we should be able to build entire systems based on the organizing principles used by the nervous system. I will refer to these systems generically as neurormorphic systems." [C. Mead, 1990] This historical paper from Carver Mead captures the true essence of the field and lays the foundation for Neuromophic Engineering. Back in 80s-90s Carver Mead and colleagues hypothesised that in order to do a simple math operation with a digital computer one needs far more transistors (in the order of 10s of thousands). They also found out that majority of the energy is used up in charging up wiring interconnects connecting these 1000s of device, which led them to the conclusion that it costs about a million times more energy to do an operation in digital machine as compared to operate a single transistors. Both in  biological neurons and silicon,  ions are in thermal equilibrium with their surroundings and hence their energies are Boltzmann distributed. In the presence of energy barriers, the boltzmann distribution of ions computes a current that is an exponential function of the barrier energy. By applying a voltage to modulate the barrier energy, the resulting flow of charges or in other words the current, will be an exponential function of that voltage. This basic principle is used to create active computational elementes (those that produce gain or amplification at signal level), both in the nervous system and in electronics. In addition to providing gain, an individual transistor computes a complex nonlinear function of its control and channel voltages. That function is not directly comparable to the functions that synapses evaluate using their presynaptic and postsynaptic potentials, but a few transistors can be connected strategically to compute remarkably competent synaptic functions. This makes the back-bone of subthreshold analog neuromorphic VLSI.

## synapse circuit

We start with the synapse, which converts a *voltage spike* to a *synaptic current*. We want the synapse to behave as a linear low-pass filter, so that its impulse reponse is a decaying exponential. Meet the log-domain pulse integrator, first presented by Merolla & Boahen in 2004. 

The input voltage $V_{in}$ receives the voltage spikes from a pre-neuron. The output current $I_{syn}$ is then sent to the post-neuron. 
The bias voltage $V_W$ models the synaptic weight, the bias voltage $V_\tau$ configures the time constant of the circuit (see below). 

Let's walk through the circuit together. If no voltage is applied to $V_{in}$, then the transistor $M_{in}$ is off, 

...

## neuron circuit

We now need a neuron that integrates the *synaptic current* into its membrane potential and fires a voltage spike if its membrane potential exceeded some threshold. For now, we don't worry about implementing the leak, which brings the membrane potential back to a resting value in the absence of incoming current. Instead, we use the now-classic Axon Hillock circuit described by **<u>Carver Mead in 1989</u>**. In practice, mixed-signal neuromorphic devices implement more powerful neuron models and also feature more energy efficient designs than presented here, see [ChiccaEtAl2014].

We have a current source that charges a capacitor $C_{mem}$ at the membrane potential $V_{mem}$. The output voltage $V_{out}$ in this circuit is either HIGH (during a spike emission) or LOW (otherwise).  We can implement this using an amplifier, which switches the output $V_{out}$ to HIGH if $V_{mem}$ exceeds some threshold voltage. 

IMAGE

The circuit is not complete yet. Once $V_{out}$ is set to HIGH (meaning our neuron spiked), we need to reset the membrane potential and set $V_{out}$ to LOW again. We add another branch through which $C_{mem}$ can be discharged to reset $V_{mem}$. This branch is gated by an n-type transistor which only lets current through if $V_{out}$ is HIGH. 

We further add a capacitive divider to **<u>*TODO*</u>**.

IMAGE

We can now analyze the circuit's behavior. Let's assume a constant input current. This charges the capacitors $C_{mem}$ and $C_{fb}$, raising $V_{mem}$. Once $V_{mem}$ reaches a critical value, the amplifier switches and sets $V_{out}$ to HIGH. This has two consequences

1. The voltage at the capacitor $C_{fb}$ changes, which in turn also changes the voltage $V_{mem}$.
   ***TODO: describe how it changes***
2. The discharge branch is activated, through which $C_{mem}$ now discharges to lower $V_{mem}$. 

The resulting graph of $V_{mem}$ and $V_{out}$ is as follows:

GRAPH

## spike routing

Our neural network consists of $N$ neurons connected through a weight matrix $W \in \mathbb{R}^{N \times N}$ where each element $W_{ji}$ represents the synaptic weight from neuron $j$ to neuron $i$. We will focus on the neuron at index $i$, which receives spike events from all its pre-synaptic neurons $pre(i) = \{ j : W_{ji} \neq 0 \}$. This gives us the incoming spike train

Our neuron $i$ will receive spike events from each of its pre-synaptic neurons $j \in J$ at times $\{t^j_k\}_{k=1,\ldots,K}$

***TODO***

## references

- Boahen, 2017. A Neuromorph’s Prospectus.
- Chicca et al., 2014. Neuromorphic electronic circuits for building autonomous cognitive systems.
- Sarpeshkar, 1998. Analog Versus Digital: Extrapolating from Electronics to Neurobiology.
- C. Mead, 1990. Neuromorphic electronic systems.
