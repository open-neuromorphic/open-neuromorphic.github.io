---
active_product: true
description: 'Learn about Institute of Neuroinformatics''s neuromorphic hardware: DYNAP-SE2'
type: neuromorphic-hardware
image: dynap-se2.jpg
organization:
  group_name: Neuromorphic Cognitive Systems 
  org_logo: UZH.jpg
  org_name: Institute of Neuroinformatics
  org_website: https://www.ini.uzh.ch/en.html
  product_page_link: https://www.synsense.ai/products/neuromorphic-chip-dynap-se2/
  social_media_links:
    linkedin: https://www.linkedin.com/company/institute-of-neuroinformatics-uni-eth-zurich/
    twitter: null
    wikipedia: null
product:
  announced_date: 2023-08-01
  applications: Research
  chip_type: Mixed-signal
  neurons: 4096
  weight_bits: 4+2
  activation_bits: analog
  on_chip_learning: false
  power: ~5 mW
  release_date: null
  software: Rockpool, Samna
  status:
    announced: true
    released: limited availibility
    retired: false
  synapses: 65K, maximum synapses per neuron are 256
  
product_name: DYNAP-SE2
summary: The DYNAP-SE2 is a configurable, mixed-signal neuromorphic chip featuring 1024 
neurons, 65k plastic synapses, specialized dendrites, low-latency event routing, and 
multi-timescale adaptation dynamics. This enables real-time prototyping of biologically 
inspired spiking neural networks for ultra-low power edge processing.
title: DYNAP-SE2 - Institute of Neuroinformatics
---

The DYNAP-SE2 is a mixed-signal neuromorphic processor chip manufactured using 180nm CMOS technology. It occupies a 98mm² silicon area and contains 1024 leaky integrate-and-fire spiking neuron circuits, along with 64k reconfigurable synapses. The chip's architecture supports real-time emulation of neural and synaptic dynamics for processing event-based sensory data.

### Recurrent Network Primitives

Taking inspiration from biology, most networks studied on the DYNAP-SE2 are recurrent. This is thanks to the intrinsically parallel regime with analog spiking neurons and asynchronous routing. This includes winner-take-all attractors, coupled oscillators, and reservoir networks. The winner-take-all network consists of several excitatory groups that receive external input, self-excite, and mutually inhibit (either directly or via global/local inhibitory groups). It selects the strongest input (~softmax) with controllable hysteresis dynamics. Coupled oscillators are balanced excitatory-inhibitory networks that generate repetitive patterns, typically used as a central pattern generator (CPG). A reservoir is a highly recurrent network, randomly initialized or learned through training, and is widely used for temporal signal processing.

### Neurons

The 1024 neuron circuits are arranged in a 2x2 grid of 256-neuron cores. Each neuron features a 7.7pF capacitor enabling integration time constants of up to 5 seconds. There are two leaky integrate-and-fire firing models to choose from per neuron: exponential (expLIF) or threshold-based (LIF). The neurons also incorporate biologically inspired adaptation dynamics, such as spike frequency adaptation and firing rate homeostasis, for increased computational capabilities. Additional mechanisms for refractory periods, dendritic computations, and controllable leak currents provide further configurability.

### Abundant Temporal Dynamics

The silicon neurons are designed with a biologically plausible time-constant range, from <1 microsecond to ~5 seconds. The refractory period can last up to 0.75-1.5 seconds. Optional neuronal features such as spike-frequency adaptation and homeostasis can regulate excitability on timescales from milliseconds to hours.

### Synapses

Each neuron has 64 synapses, implemented as filters that convert pre-synaptic spikes into post-synaptic currents using 4-bit weights. There are 2 bits for choosing EPSC/IPSC generation types and 2 bits for delays. The synapses can be flexibly assigned to each neuron's four dendritic branches. Short-term plasticity through depressive mechanisms is also incorporated. The dendrites include specialized dynamics like NMDA receptor voltage gating, AMPA grid diffusion, and inhibitory conductances.

### Event-based Processing

The DYNAP-SE2 uses an asynchronous digital fabric for spike event communication, ensuring low-latency operation essential for real-time sensory processing. A 2D grid routing architecture connects multiple chips, with each neuron able to target up to four chips in a ±7 displacement range. This asynchronous scheme enables complex recurrent network topologies beyond simple feedforward structures.

### On-Chip Interfaces

The chip includes a range of interfaces for input/output events:

- A multi-purpose 40-bit split-parallel input bus for external configuration and stimulus.
- Four asynchronous grid buses connecting neighboring chips in a 2D array.
- Dedicated DVS and event sensor interface for interfacing with neuromorphic vision/auditory sensors.
- 8-channel Analog Frontend for medical and natural signal delta ADC interface.
- Current-based ADC circuits for on-chip monitoring of neural/synaptic signals.

### Available PCBs

- Development board: For testing and development purposes, with voltage scaling and individual power measurements.
- Stack board: A stack of 1-4 DYNAP-SE2 chips paired with one Opelkelly USB3 FPGA board for interfacing with a PC. Its small credit card-sized form factor is intended for deployment on robotic platforms.
- R&D stack board: A SynSense version for R&D with up to 8 DYNAP-SE2 cards stacked on top of each other.

The rich neural/synaptic dynamics and event-driven operation of the DYNAP-SE2 allow exploration of spiking neural networks for ultra-low power edge processing applications with biological time constants. Its configurability supports prototyping systems ranging from basic receptive fields to complex recurrent networks for sensory-cognitive information processing.

### Software Toolchain

The toolchain supporting the DYNAP-SE2 includes Samna (https://pypi.org/project/samna/) for streamlined access via Python. Additionally, Rockpool (https://code.ini.uzh.ch/) or other SNN simulators like NEST, PyTorch, or Brian2 (https://code.ini.uzh.ch/ncs/libs/dynapse-simulator) can be used to develop networks for this chip.

### Platform Publications

| Date        | Title                                                                                                                                                                                 | Authors                                                                                           | Venue/Source                      |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------|
| January 2024| [DYNAP-SE2: a scalable multi-core dynamic neuromorphic asynchronous spiking neural network processor](https://doi.org/10.1088/2634-4386/ad1cd7)                                       | Ole Richter, Chenxi Wu,

 Adrian M. Whatley, German Köstinger, Carsten Nielsen, Ning Qiao, Giacomo Indiveri | IOP Neuromorph. Comput. Eng. 4    |
| October 2023| [DYNAP-SE2: a scalable multi-core dynamic neuromorphic asynchronous spiking neural network processor](https://arxiv.org/abs/2310.00564)                                                | Ole Richter, Chenxi Wu, Adrian M. Whatley, German Köstinger, Carsten Nielsen, Ning Qiao, Giacomo Indiveri | arXiv                             |

### Related Publications

| Date       | Title                                                                                                                                                      | Authors                                                                                                  | Venue/Source |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|--------------|
| August 2023| [Orchestrated excitatory and inhibitory plasticity produces stable dynamics in heterogeneous neuromorphic computing systems](https://www.biorxiv.org/content/10.1101/2023.08.14.553298) | Maryada, Saray Soldado-Magraner, Martino Sorbaro, Rodrigo Laje, Dean V. Buonomano, Giacomo Indiveri      | bioRxiv      |
| June 2022  | [Towards hardware implementation of WTA for CPG-based control of a Spiking Robotic Arm](https://doi.org/10.1109/ISCAS48785.2022.9937845)                     | A. Linares-Barranco, E. Piñero-Fuentes, S. Cañas-Moreno, A. Rios-Navarro, Maryada, Chenxi Wu, Jingyue Zhao, D. Zendrikov, G. Indiveri | IEEE ISCAS   |
| May 2021   | [An electronic neuromorphic system for real-time detection of high frequency oscillations (HFO) in intracranial EEG](https://doi.org/10.1038/s41467-021-23342-2) | Mohammadali Sharifshazileh, Karla Burelo, Johannes Sarnthein, Giacomo Indiveri                              | Nature Comms |
