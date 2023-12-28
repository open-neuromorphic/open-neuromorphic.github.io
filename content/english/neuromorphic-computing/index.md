---
title: "Neuromorphic engineering in 10 minutes"
date: 2023-09-01
description: "A brief take on neuromorphic computing and the technology involved."
draft: false
tags: ["neuromorphic", "computing", "engineering", "overview"]
---

# Neuromorphic engineering in 10 minutes
Neuromorphic engineering takes inspiration from biological systems to process information as efficiently as possible. Such systems can be the mammal brain that burns just 20W, a retina that compresses visual information or the navigation system of a bee. We then try to mimic those systems to a certain level of abstraction on another substrate such as silicon. But the von Neumann architecture, which our computers are based on, doesn't work like biological systems! It separates memory from computation and not noisy at all! This brings us to the first important principle of neuromorphic engineering, which is that it relies on new hardware architectures!

## Analog vs digital hardware
Carver Mead pioneered the idea of using analog hardware to closely mimic the parallel processing and continuous signaling of biological neural networks. An example of this is a single transistor that is operated in the sub-threshold domain to imitate a synapse. Analog neuromorphic circuits hold promise for fast, energy-efficient computing, but face challenges with noise, limited precision, and calibration difficulties that can undermine accuracy.
In contrast, digital neuromorphic systems employ robust, discrete on/off signaling and reliable binary logic gates. They readily scale to larger networks with precise, noise-resistant computation and build on the decades of advancements humanity has made when building digital chips. The deterministic nature of digital hardware also simplifies algorithm exploration and adaptation. However, digital systems tend to be less power-efficient and may have difficulty efficiently simulating certain neural behaviors.

## In-memory computing
The von Neumann architecture separates computation from memory, which makes it necessary to constantly move data back and forth. This is called the von Neumann bottleneck and is responsible for around 40% of the overall power budget!
In a brain, the computation and data is co-located. 
Information is encoded and processed via ion concentrations, membrane potentials, spike rates, synaptic connections and other mechanisms within neurons. 
Neuromorphic engineering seeks to replicate this in-memory computing so data isn't continuously moved. In digital hardware, cache-level computation and processing-in-memory help mitigate the bottleneck. In analog technology, in-memory computing can be achieved with a new eletrical component called the memristor - resistive devices that retain a memory of their past states. 
Tiny memristors can be arranged in crossbar arrays, with each node acting as a connection in a neural network. Rather than shuttling discrete numbers between distant logic gates, crossbars use currents and voltages flowing directly through the memristors to efficiently, if somewhat erringly, perform vector-matrix multiplications. The analog approach thus captures key neural design principles while minimizing data transfer. 

## New materials
Apart from memristors, there's a wide range of new materials that are being incorporated into brain-inspired computing hardware. 
Phase change materials can switch between crystalline and amorphous states in response to electrical pulses. This switching mimics the firing of biological neurons. 
Ferroelectric materials have switchable spontaneous electric polarization states that can represent synaptic weights. 
Organic polymers that conduct ions can be used to mimic neurotransmitter release in synapses. Silicon nanowires and carbon nanotubes act as transistors and synaptic connections in neuromorphic hardware. Their size approaches the scale of biological neurons. Graphene's electrical properties, flexibility, and strength are desirable for neuromorphic circuit elements like transistors and electrodes. 

## Asynchronous computation
Computer chips are driven by clocks that time the exact executations of computations, which makes it possible to achieve really high throughput for offline and batched computations. The brain does not have such a central clock, instead, every neuron reacts in its own time to the arrival of input. Neuromorphic hardware can implement asynchronous functionality, where neuron cores are only powered up at the presence of input! 
Neuromorphic sensors like change-detecting cameras and microphones provide the sparse, event-driven data streams needed. For example, when recording a static scene, a neuromorphic camera outputs next to no data, allowing the downstream processing chip to operate energy-efficiently.
The asynchronous information flow is great for sporadic, transient events, but at some data input rate, the overhead of handshaking every event is higher than simple clocked computation. Asynchronous vs synchronous therefore depends to a large extent on the data rate. 

## Spike-based computation
Most neuromorphic chips implement spiking neural networks, inspired by the brain's energy-efficient use of discrete spikes for information transmission. This includes chips like IBM's TrueNorth, Intel's Loihi, Stanford's Neurogrid, SpiNNaker, BrainScales, and SynSense Speck. As in biology, computation happens locally in each neuron, integrating inputs from thousands of synaptic connections.
However, there is debate over the appropriate level of biological detail to model. Options range from incorporating dendritic processing, multicompartment neuron models, diverse ion channels, etc. to more simplified, pragmatic designs. Early neuromorphic systems emphasized biological realism, but lately the field has trended toward simpler neuron models and capabilities like non-binary spikes. This allows greater focus on computational performance versus exhaustive biological mimicry.
Current spiking neural networks rely heavily on neural architectures developed for deep learning, like convolutional neural networks for vision and recurrence for sequence processing. While the brain uses recurrent connectivity extensively, most deep learning models employ feedforward architectures. Finding spiking neural network architectures tailored to neuromorphic hardware, while drawing inspiration from computational neuroscience, remains a challenge. 

## Training methods
Not only the neuron models themselves are bio-inspired, but also the way they learn. Inspired from neuroscience, early spiking neural networks were trained using Hebbian learning rules, where the strength of the connection between two neurons is reinforced if there is some form of local causality. This works for very shallow networks, but is hard to steer/control because it lacks a global error signal. The advent of deep learning has made it possible to train SNNs end-to-end in a supervised fashion using backpropagation. Here we can use all the modern deep learning tools available and build on top of them. This has resulted in the most powerful SNNs to date. SNNs can be seen as a special case of RNNs with binary activations, internal states depending on the neuron model and long sequence lengths. That makes them very difficult to train, because we need to balance the trade-off between keeping activation in the network low, but also passing on enough information from layer to layer! If done right, the sparse network activation is the reason why neuromorphic systems can be so energy-efficient. 
As a single spike in a rate coding regime carries very low information value, multiple of them need to be integrated over time to make meaning of it. 

<!-- Feeding sequential inputs makes SNNs a subclass of RNNs, which have largely been abandonded since the rise of transformers. It remains to be seen if it will be possible to scale SNNs to similar sizes as ANNs.
Training SNNs is currently difficult and slow because the networks are stateful / rely on time and their activation is extremely sparse. During inference time, this is where we get some power benefits from, but during training time, we also get less of a teaching signal.  -->

## Use cases
Neuromorphic computing can be selectively integrated with conventional computing methods. For instance, event camera data could feed into standard computer vision models for optimal accuracy, or traditional images could run on neuromorphic hardware while skipping zero values. However, the greatest energy efficiency emerges from unifying the full neuromorphic pipeline - sensors, algorithms, and hardware.
When considering energy-constrained use cases, numerous edge computing applications come to mind:

* Robotics: navigation, control, planning
* Sensory integration: vision, audio, touch and olfactory neuromorphic sensors
* Optimization: resource management and scheduling
* Biomedical signals such as ECG, EMG, EEG: ultra-low-power monitoring 
* Brain-machine interfaces: Pre-process brain signals using the spikes directly
* Anything that needs high frame rate cameras: event cameras do it faster at lower power
* Any on-board processing on battery-powered systems in remote locations: deep sea, space, deserts

## What are the limitations / current challenges of this technology?
* Scale. Network sizes will need to increase to keep up with performances of ANNs, both in simulation and in hardware. In analog hardware, neuron circuits take up a lot of space, but with the use of crossbar arrays, we can hopefully scale up the parameter count significantly. 
* Architectures. Transformer models have taken the world by storm, and SNN hardware is still tied to ANN/CNN architectures. Because of the low information value and long context length, it is not straightforward to apply transformers to spikes directly. I expect to see a more pragmatic form of neuromorphic computing to branch off, which does away with a lot of biological complexity and keeps what works for the task at hand.
* Training methods. Currently, backpropagation through time is super expensive to use and won't scale to any really large network sizes. Forward propagation or chip-in-the-loop training could potentially help.
* Standards. Neuromorphic being a highly interdisplinary field, it lacks standardized neuron models and common training techniques. Efforts such as the [Neuromorphic Intermediate Representation](https://github.com/neuromorphic/nir) try to tackle that. The landscape of training frameworks is also [growing](https://github.com/open-neuromorphic/open-neuromorphic), which is good for features but bad for newcomers who have a plethora of tools to choose from. 

## Can I access / buy neuromorphic hardware?
In September 2023, neuromorphic cameras are available off the shelf (Prophesee, iniVation). The situation for backend hardware varies:
 * Speck and Xylo made by SynSense can be bought [directly](https://www.synsense.ai/products/).
 * SpiNNaker and BrainScaleS systems are available for free via the [ebrains](https://www.ebrains.eu/modelling-simulation-and-computing/computing/neuromorphic-computing/) platform.
 * Loihi is available through joining [INRC](https://intel-ncl.atlassian.net/wiki/spaces/INRC/overview?homepageId=196610).
 * Akida by Brainchip can be bought [directly](https://brainchip.com/akida2-0/).

## How does neuromorphic relate to quantum computing?
Both paradigms diverge from classical computing but aim to address its limitations. Neuromorphic computing mimics the architecture of biological neural networks and excels at pattern recognition and learning tasks. In contrast, quantum computing is based on the principles of quantum mechanics and is advantageous for problems like optimization and simulation that are computationally hard for classical systems.  Advances in materials science and fabrication techniques are crucial for both, and there's theoretical potential for hybrid systems that leverage the strengths of each technology.

## Summary
Neuromorphic is not going to replace conventional computing completely. Rather, it will be another strand in an increasingly heterogenous computing landscape.Neuromorphic tech is going to unlock extra capabilities of edge computation for always-on monitoring, speech recognition and large-scale data integration. It won't compete with high-throughput tasks such as image classification.
Why are not all neuromorphic chips mixed-signal today? Until we figure out how to train large networks reliably that can cope with high variance of the underlying hardware, we rely on the long history of CMOS progress and the determinism of digital architectures that act as stabilizing wheels on our neuromorphic bicycle. The highest gains in energy-efficiency will be achieved with the use of analog computing, but until then, some issues still have to be figured out.

## Active labs and companies
Check out this helpful [resource map](https://www.neuropac.info/resources-3/map/) and add your company / institution if it's not already on there!

## More resources
* [Event-based vision papers](https://github.com/uzh-rpg/event-based_vision_resources)
* [Popular SNN training frameworks](https://github.com/open-neuromorphic/open-neuromorphic)
* [Ultimate SNN training reference](https://arxiv.org/abs/2109.12894)
* [Digital systems review](https://arxiv.org/abs/2306.15749)
* [Training courses and books](https://github.com/mikeroyal/Neuromorphic-Computing-Guide#online-training-courses)
* [Videos](https://www.neuropac.info/video-category/)

## Author
* [Gregor Lenz](https://lenzgregor.com) started his journey in neuromorphic engineering in 2017 for his PhD at Sorbonne University in Paris. He's co-founder and CTO at [Neurobus](https://neurobus.space).
