---
title: "Neuromorphic engineering in 10 minutes"
date: 2023-09-01
description: "A brief take on neuromorphic computing and the technology involved."
draft: false
# image: framework-benchmarking-16k-header.png
tags: ["neuromorphic", "computing", "engineering", "overview"]
---

# Neuromorphic Engineering in 10 minutes
Neuromorphic engineering is a broad term that encompasses multiple approaches. Generally speaking, it takes inspiration from biological systems to process information as efficiently as possible. Such systems can be the mammal brain that is capable of language or abstract thought, a retina that compresses visual information or the navigation system of a bee. We then try to mimic those systems to a certain level of abstraction on another substrate such as silicon. But the von Neumann architecture, which our computers are based on, doesn't work like biological systems! It separates computation from memory and constantly has to move data around, which is called von Neumann bottleneck. This data movement takes up to 40% of the overall power budget, which is a huge waste! This brings us to the first important principle of neuromorphic engineering, which is that it relies on new hardware architectures!

## Analog vs digital hardware
The original idea was to mimic synapses with analog circuit components directly. 
Analog hardware leverages continuous signals to mimic the behavior of biological neurons more closely. Its main strength lies in its ability to process information in parallel, providing high-speed and energy-efficient computations. However, analog hardware suffers from noise, limited precision, and calibration challenges, which can impact the accuracy and reliability of computations. This is how the brain operates, a noisy mess of signals. So, is it a feature or a bug?
On the other hand, digital hardware employs discrete signals and binary logic, allowing for precise and reliable computations. Digital neuromorphic systems typically scale to more neurons for the same circuit area and are inherently robust against noise and environmental variations, ensuring consistency in computations. The deterministic nature makes algorithm exploration a lot easier. However, they tend to consume more power and may face challenges in efficiently simulating certain biologically inspired neural behaviors. Examples of fully digital neuromorphic chips are IBM TrueNorth, SpiNNaker, Intel Loihi, SynSense Speck. 

## In-memory computing
In a brain, the computation and data is co-located, meaning that the information is stored (in the form of ion concentrations, membrane potentials, synaptic connections) and processed (in the form of spike rates, phases or timings) in the same neuron! Neuromorphic engineering replicates in-memory computing, where data doesn’t have to be moved around but can be modified in place. The problem of data movement in digital hardware is alleviated through cache-level computation or processing-in-memory. In analog technology, in-memory computing can be achieved with a new eletrical component called the memristor. Memristors are resistive devices that retain a memory of their past states. The tiny devices can be arranged on a large grid, which is called a crossbar array. Every node (crossing) in the array can be seen as a connection in a neural network. Then, instead of using digital CMOS technology and many transistors to represent and shuffle around numbers, the crossbar array uses works with eletrical currents and voltages directly to perform vector-matrix multiplications very efficiently (but also a bit more erroneous)!

## Asynchronous computation
Computer chips are driven by clocks that time the exact executations of computations, which makes it possible to achieve really high throughput. The brain does not have such a central clock, instead, every neuron reacts in its own time to the arrival of input. The computation therefore happens asynchronously. When using neuromrophic backend processors, we ideally want to get our input data from neuromrophic sensors too. The most developed of such sensors is the neuromorphic camera, also known as event camera, dynamic vision sensor (DVS) or silicon retina. The event camera outputs data fully asynchronously, in contrast to a conventional camera that generates frames at a fixed rate. Its pixels act fully asynchronously and output changes in illumination rather than absolute light intensity values. That means that the output of the camera is now directly dependent on the activity in the scene. If no change is detected, then the camera doesn’t output anything and also the downstream neuromorpic processor doesn’t have to process anything! 

## Spike-based computation
Neurons in our brain spontaneously spike all the time, and sometimes react to a certain input. All we know is that the brain can do amazing things by just using 20W of power. Try to match an equally-capable language model based on modern deep learning accelerators with that power budget, you will not even get close! A somewhat critical part of neuromorphic computing for some therefore is the computation using spikes. Most neuromorphic chips (IBM TrueNorth, Intel Loihi, Stanford’s Neurogrid, SpiNNaker, BrainScales, SynSense Speck) therefore implement a form of a spiking mechanism. When combining asynchronous and spiking computation for machine learning tasks, we end up with a new generation of neural networks called spiking neural networks.

## Spiking neural networks
Spiking neural networks (SNN) are bio-inspired computational models used in neuromorphic computing. Unlike traditional neural networks, SNNs communicate through discrete spikes, capturing temporal information for event-driven processing. They offer energy efficiency, real-time event detection, and pattern recognition capabilities. Challenges include specialized learning algorithms and ongoing efforts to improve training methods and hardware implementations. SNNs hold promise for efficient AI technologies in resource-constrained environments, advancing brain-inspired computing.

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
Neuromorphic is not going to replace conventional computing completely. Rather, it will be another strand in an increasingly heterogenous computing landscape. Your phone already has many specialised pieces of silicon to help with screen rendering, encryption, AI applications and more. Neuromorphic tech is going to unlock extra capabilities of edge computation. It is not great at competing with conventional computing for high-throughput tasks such as image classification. The current challenges are to be able to scale up the network sizes both in simulation and hardware. The asynchronous information exchange principle is great for sporadic, transient events, but at some data input rate, the overhead of handshaking every event is higher than simple clocked computation. Training SNNs is currently difficult and slow because the networks are stateful / rely on time and their activation is extremely sparse. During inference time, this is where we get some power benefits from, but during training time, we also get less of a teaching signal. 
Neuromorphic being a highly interdisplinary field, it suffers from some standardized neuron models and common training techniques. Efforts such as the [Neuromorphic Intermediate Representation](https://github.com/neuromorphic/nir) try to tackle that. The landscape of training frameworks is also [growing](https://github.com/open-neuromorphic/open-neuromorphic), which is good for features but bad for newcomers. 

## Can I access / buy neuromorphic hardware?
In September 2023, neuromorphic sensors are available off the shelf (Prophesee, iniVation), while a lot of the backend hardware is accessible through research communities with the exception of SynSense's [chips](https://www.synsense.ai/products/):
 * SpiNNaker and BrainScaleS systems are available for free via the [ebrains](https://www.ebrains.eu/modelling-simulation-and-computing/computing/neuromorphic-computing/) platform.
 * Loihi is available through joining [INRC](https://intel-ncl.atlassian.net/wiki/spaces/INRC/overview?homepageId=196610).

## How does neuromorphic relate to quantum computing?
Both paradigms diverge from classical computing but aim to address its limitations. Neuromorphic computing mimics the architecture of biological neural networks and excels at pattern recognition and learning tasks. In contrast, quantum computing is based on the principles of quantum mechanics and is advantageous for problems like optimization and simulation that are computationally hard for classical systems. Although they serve different problem domains, both paradigms aim for greater energy efficiency and have the potential to be complementary. Advances in materials science and fabrication techniques are crucial for both, and there's theoretical potential for hybrid systems that leverage the strengths of each technology.

## Summary
Why are not all neuromorphic chips mixed-signal today? Until we figure out how to train large networks reliably that can cope with high variance of single neurons, we rely on the long history of CMOS progress and the determinism of digital architectures that act as stabilizing wheels on our neuromorphic bicycle. The highest gains in energy-efficiency will be achieved with the use of analog computing, but until then, some issues still have to be figured out.  

## Active labs and companies
Check out this helpful [resource map](https://www.neuropac.info/resources-3/map/) and add your company / institution if it's not already on there!

## More resources
* [Event-based vision papers](https://github.com/uzh-rpg/event-based_vision_resources)
* [Popular SNN training frameworks](https://github.com/open-neuromorphic/open-neuromorphic)
* [Ultimate SNN training reference](https://arxiv.org/abs/2109.12894)
* [Training courses and books](https://github.com/mikeroyal/Neuromorphic-Computing-Guide#online-training-courses)
* [Videos](https://www.neuropac.info/video-category/)

https://aimodels.org/neuromorphic-computing

## Author
* [Gregor Lenz](https://lenzgregor.com) started his journey in neuromorphic engineering in 2017 for his PhD at Sorbonne University in Paris. He's co-founder and CTO at [Neurobus](https://neurobus.space).
