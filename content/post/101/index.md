---
title: "Neuromorphic engineering in 10 minutes"
date: 2023-09-01
description: "A brief take on neuromorphic computing and the technology involved."
draft: false
# image: framework-benchmarking-16k-header.png
tags: ["neuromorphic", "computing", "engineering", "overview"]
---

# Neuromorphic engineering in 10 minutes
Neuromorphic engineering takes inspiration from biological systems to process information as efficiently as possible. Such systems can be the mammal brain that burns just 20W, a retina that compresses visual information or the navigation system of a bee. We then try to mimic those systems to a certain level of abstraction on another substrate such as silicon. But the von Neumann architecture, which our computers are based on, doesn't work like biological systems! It separates memory from computation and not noisy at all! This brings us to the first important principle of neuromorphic engineering, which is that it relies on new hardware architectures!

## Analog vs digital hardware
Carver Mead had the original idea to use analog hardware to mimic the behavior of biological neurons more closely. Its main strength lies in its ability to process information in parallel using continuous signals, providing high-speed and energy-efficient computations. But analog hardware suffers from noise, limited precision, and calibration challenges, which can impact the accuracy and reliability of computations. This is how the brain operates, a noisy mess of signals. So, is it a feature or a bug?
On the other hand, digital hardware employs discrete signals and binary logic, allowing for precise and reliable computations. Digital neuromorphic systems typically scale to more neurons for the same circuit area and are inherently robust against noise and environmental variations. The deterministic nature also makes algorithm exploration in many cases a lot easier. However, they tend to consume more power and may face challenges in efficiently simulating certain biologically inspired neural behaviors. 

## In-memory computing
The von Neumann architecture separates computation from memory, which makes it necessary to constantly move data back and forth. This is called the von Neumann bottleneck and is responsible for around 40% of the overall power budget!
In a brain, the computation and data is co-located. The information is stored in the form of ion concentrations, membrane potentials or synaptic connections, and processed in the form of spike rates, phases or timings, all in the same neuron! Neuromorphic engineering replicates in-memory computing with the goal to save power. In digital hardware this problem is alleviated through cache-level computation or processing-in-memory. In analog technology, in-memory computing can be achieved with a new eletrical component called the memristor. Memristors are resistive devices that retain a memory of their past states. The tiny devices can be arranged on a large grid, which is called a crossbar array. Every node (crossing) in the array can be seen as a connection in a neural network. Then, instead of using digital CMOS technology and many transistors to represent and shuffle around numbers, the crossbar array uses eletrical currents and voltages directly to perform vector-matrix multiplications very efficiently (but also a bit more erroneously)!

## Asynchronous computation
Computer chips are driven by clocks that time the exact executations of computations, which makes it possible to achieve really high throughput for offline and batched computations. The brain does not have such a central clock, instead, every neuron reacts in its own time to the arrival of input. Neuromorphic hardware can implement asynchronous functionality, where neuron cores are only powered up at the presence of input! To get such sparse data in the first place, we can make use of neuromorphic sensors, which are change detectors for visual, audio or tactile input. Then, if a visual scene is static (say, you're recording your garage door), the neuromorphic camera doesn't output anything and the chip uses very little energy. 
The asynchronous information flow is great for sporadic, transient events, but at some data input rate, the overhead of handshaking every event is higher than simple clocked computation. Asynchronous vs synchronous therefore depends to a large extent on the data rate.

## Spike-based computation
Most neuromorphic chips (IBM TrueNorth, Intel Loihi, Stanford’s Neurogrid, SpiNNaker, BrainScales, SynSense Speck) implement a form of a spiking mechanism, inspired by the incredibly energy-efficient mechanism of action potentials in the brain. The computation in the biological system happens locally in the neuron, with a neuron in cortex integrating information from some thousands of synapses. 
To what degree of biological realism we should model biological neural networks is an interesting research question. Dendritic computation? Multicompartment models? Different ion channels? When in the beginning neuromorphic was a lot about mimicking some of the biological realism, the advent of deep learning has definitely favoured the more simple neuron models to speed up the training process. Training spiking neural networks using backpropagation can be done using all the modern deep learning tools. But there are some challenges, namely the highly discrete activation for every layer and the reliance on a time dimension. As a single spike carries such low information value, multiple of them need to be integrated over time to make meaning of it. Feeding sequential inputs makes SNNs a subclass of RNNs, which have largely been abandonded since the rise of transformers. It remains to be seen if it will be possible to scale SNNs to similar sizes as ANNs.

## Use cases
It's possible to take a single part of the neuromorphic pipeline and combine it with conventional computing. For example you could process event camera input with the latest computer vision model to get best task accuracy. Or try to skip zeros when processing conventional images on neuromorphic hardware. The best energy efficiency however is likely to be shown using the full pipeline of sensors, algorithms and processing hardware together. When thinking about energy-efficiency, a plethora of edge computing applications comes to mind:

* Robotics: navigation, control, planning
* Sensory integration: vision, audio, touch and olfactory neuromorphic sensors
* Optimization: resource management and scheduling
* Biomedical signals such as ECG, EMG, EEG: ultra-low-power monitoring 
* Brain-machine interfaces: Pre-process brain signals using the spikes directly
* Anything that needs high frame rate cameras: event cameras do it faster at lower power
* Anything battery-powered in remote locations: deep sea, space, deserts

## What are the limitations of this technology?
Neuromorphic is not going to replace conventional computing completely. Rather, it will be another strand in an increasingly heterogenous computing landscape. Your phone already has many specialised pieces of silicon to help with screen rendering, encryption, AI applications and more. Neuromorphic tech is going to unlock extra capabilities of edge computation for always-on monitoring, speech recognition and more. It won't compete with high-throughput tasks such as image classification. The current challenges are to be able to scale up the network sizes both in simulation and hardware.  Training SNNs is currently difficult and slow because the networks are stateful / rely on time and their activation is extremely sparse. During inference time, this is where we get some power benefits from, but during training time, we also get less of a teaching signal. 
Neuromorphic being a highly interdisplinary field, it suffers from some standardized neuron models and common training techniques. Efforts such as the [Neuromorphic Intermediate Representation](https://github.com/neuromorphic/nir) try to tackle that. The landscape of training frameworks is also [growing](https://github.com/open-neuromorphic/open-neuromorphic), which is good for features but bad for newcomers. 

## Can I access / buy neuromorphic hardware?
In September 2023, neuromorphic cameras are available off the shelf (Prophesee, iniVation). The situation for backend hardware varies:
 * Speck and Xylo made by SynSense can be bought [directly](https://www.synsense.ai/products/).
 * SpiNNaker and BrainScaleS systems are available for free via the [ebrains](https://www.ebrains.eu/modelling-simulation-and-computing/computing/neuromorphic-computing/) platform.
 * Loihi is available through joining [INRC](https://intel-ncl.atlassian.net/wiki/spaces/INRC/overview?homepageId=196610).
 * Akida by Brainchip can be bought [directly](https://brainchip.com/akida2-0/).

Research chips:
Examples of fully digital neuromorphic chips are IBM TrueNorth, SpiNNaker, Intel Loihi, SynSense Speck. 

## How does neuromorphic relate to quantum computing?
Both paradigms diverge from classical computing but aim to address its limitations. Neuromorphic computing mimics the architecture of biological neural networks and excels at pattern recognition and learning tasks. In contrast, quantum computing is based on the principles of quantum mechanics and is advantageous for problems like optimization and simulation that are computationally hard for classical systems. Although they serve different problem domains, both paradigms aim for greater energy efficiency and have the potential to be complementary. Advances in materials science and fabrication techniques are crucial for both, and there's theoretical potential for hybrid systems that leverage the strengths of each technology.

## Summary
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

## Acknowledgements
https://aimodels.org/neuromorphic-computing

## Author
* [Gregor Lenz](https://lenzgregor.com) started his journey in neuromorphic engineering in 2017 for his PhD at Sorbonne University in Paris. He's co-founder and CTO at [Neurobus](https://neurobus.space).
