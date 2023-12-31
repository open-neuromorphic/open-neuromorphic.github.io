---
active_product: false
description: 'Learn about Intel''s neuromorphic hardware: Loihi'
type: neuromorphic-hardware
image: loihi-nahuku-board.jpg
organization:
  group_name: null
  org_logo: intel.png
  org_name: Intel
  org_website: https://www.intel.com/content/www/us/en/research/neuromorphic-computing.html
  product_page_link: https://www.intel.com/content/www/us/en/research/neuromorphic-computing.html
  social_media_links:
    linkedin: https://www.linkedin.com/company/intel-corporation/
    twitter: https://twitter.com/intel
    wikipedia: https://en.wikipedia.org/wiki/Cognitive_computer#Intel_Loihi_chip
product:
  announced_date: 2018-12-01
  applications: Research
  chip_type: Digital
  neurons: 128000
  on_chip_learning: true
  power: <1.5 W
  release_date: 2018-12-01
  release_year: 2018
  software: nxSDK
  status:
    announced: true
    released: true
    retired: true
  synapses: 128000000
product_name: Loihi
summary: Loihi is Intel's advanced neuromorphic chip, designed to mimic brain-like
  processing, enabling efficient, adaptive machine learning applications.
title: Loihi - Intel
---

Loihi is an experimental neuromorphic computer chip developed by Intel Labs as a research platform for spike-based neural networks and computational neuroscience. Formally announced in 2017, it represents a significant advancement in neuromorphic hardware capabilities compared to prior academic and industry prototypes. 

## Architecture

The Loihi chip integrates 128 neuromorphic cores, 3 x86 processor cores, and over 33MB of on-chip SRAM memory fabricated using Intel's 14nm process technology spanning 60mm2. It supports asynchronous spiking neural network models for up to 130,000 synthetic compartmental neurons and 130 million synapses. 

Its manycore mesh connects cores through an asynchronous network-on-chip that transports neural spike messages together with x86 control and data messages. Support for hierarchical connectivity patterns allows the mapping of deep convolutional networks optimized for vision and audio sensing tasks. On-chip learning rules based on spike timing are fully programmable using microcode embedded in each core.

The neural model is based on standard leaky integrate-and-fire dynamics extended with features like dendritic compartments, reward-modulated spike-timing-dependent plasticity, axonal and refractive delays, and stochastic synaptic noise. Asynchronous design techniques minimize active power by exploiting the sparsity of neural spike events in time and across the array. Per-core neuron update rates can exceed 10MHz in a 1V process corner.

## Results

Pre-silicon benchmarks demonstrate over 5000x better energy-delay product compared to conventional solutions when solving a large convolutional sparse coding problem involving a 52x52 image and 224-dimensional feature space. Small-scale on-chip learning results proved viable for basic supervised and reinforcement learning algorithms utilizing programmable spike timing and reward mechanisms.

The Loihi architecture and early results provide a case study for the potential of spike-based computation to solve machine learning problems highly efficiently compared to traditional dataflow architectures. The low precision, event-driven operation, and temporal encoding schemes open new points in the design space for specialized AI hardware. Open challenges remain to scale validated network capacity and to map widely useful deep learning architectures.

## Impact

Since its academic publication in IEEE Micro, Loihi has expanded Intel Labs' neuromorphic research agenda as the foundation for ongoing energy-efficient architectures. The programmable asynchronous fabric delivers flexible experimentation combined with patching and telemetry access to internal dynamics - key capabilities distinguished from prior neuromorphic projects.

With community access to Loihi, researchers globally pursue innovative algorithms and models for continuous-time intelligence beyond machine learning. Application spaces under investigation include adaptive robotics, novelty detection, few-shot learning, planning under uncertainty, and computational neuroscience hypotheses. Extending Loihi's proven neural building blocks to larger graphs promises to unlock new spike-based algorithms and workloads.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| July 2022   | Interactive continual learning for robots: a neuromorphic approach                                          | E. Hajizada, P. Berggold, M. Iacono, A. Glover, Y. Sandamirskaya                                          | ICONS 2022                        |
| July 2022   | Fine-tuning Deep Reinforcement Learning Policies with r-STDP for Domain Adaptation                          | M. Akl, Y. Sandamirskaya, D. Ergene, F. Walter, A. Knoll                                                 | ICONS 2022                        |
| July 2022   | Sparse Vector Binding on Spiking Neuromorphic Hardware Using Synaptic Delays                               | A. Renner, Y. Sandamirskaya, F. T. Sommer, P. E. Frady                                                   | ICONS 2022                        |
| June 2022   | Neuromorphic computing hardware and neural architectures for robotics                                      | Y. Sandamirskaya, M. Kaboli, J.Conradt, T. Celikel                                                       | Science Robotics (Viewpoint)      |
| May 2022    | Efficient Neuromorphic Signal Processing with Resonator Neurons                                            | E.P. Frady, S. Sanborn, S.B. Shrestha, D.B.D. Rubin, G. Orchard, F.T. Sommer, M. Davies                  | Journal of Signal Processing Systems |
| May 2022    | A Long Short-Term Memory for AI Applications in Spike-based Neuromorphic Hardware                          | A. Rao, P. Plank, A. Wild, W. Maass                                                                     | Nature Machine Intelligence      |
| May 2022    | Mapping and Validating a Point Neuron Model on Intel's Neuromorphic Hardware Loihi                         | S. Dey, A. Dimitrov                                                                                     | Frontiers in Neuroinformatics    |
| March 2022  | Time-Coded Spiking Fourier Transform in Neuromorphic Hardware                                              | Javier Lopez-Randulfe; Nico Reeb; Negin Karimi; Chen Liu; Hector Gonzalez; Robin Dietrich; Bernhard Vogginger; Christian Mayr; Alois Knoll | IEEE Xplore                      |
| December 2021 | Real-Time Edge Neuromorphic Tasting From Chemical Microsensor Arrays                                                 | N. LeBow, B. Rueckauer, P. Sun, M. Rovira, C. Jiménez-Jorquera, S. Liu, J. Maria Margarit-Taulé             | Frontiers in Neuroscience    |
| August 2021 | A spiking central pattern generator for the control of a simulated lamprey robot running on SpiNNaker and Loihi neuromorphic boards | E. Angelidis, E. Buchholz, J. Arreguit, A. Rougé, T. Stewart, A. von Arnim, A. Knoll and A. Ijspeert         | IOP Neuromorphic Computing and Engineering |
| June 2021   | The Backpropagation Algorithm Implemented on Spiking Neuromorphic Hardware                                            | A. Renner, F. Sheldon, A. Zlotnik, L. Tao, A. Sornborger                                                    | arxiv preprint              |
| June 2021   | A Spiking Neural Network for Image Segmentation                                                                      | K. Patel, E. Hunsberger, S. Batir, C. Eliasmith                                                            | arxiv preprint              |
| July 2021   | CarSNN: An Efficient Spiking Neural Network for Event-Based Autonomous Cars on the Loihi Neuromorphic Research Processor | A. Viale, A. Marchisio, M. Martina, G. Masera, M. Shafique                                                  | IJCNN 2021                  |
| July 2021   | Heartbeat Classification with Spiking Neural Networks on the Loihi Neuromorphic Processor                             | K. Buettner, A. D. George                                                                                  | ISVLSI 2021                 |
| May 2021    | Advancing Neuromorphic Computing With Loihi: A Survey of Results and Outlook                                          | M. Davies, A. Wild, G. Orchard, Y. Sandamirskaya, G. A. Fonseca Guerra, P. Joshi, P. Plank, and S. R. Risbud | Proceedings of the IEEE 2021 |
| March 2021  | A Dual-Memory Architecture for Reinforcement Learning on Neuromorphic Platforms                                       | W. Olin-Ammentorp, Y. Sokolov, M. Bazhenov                                                                 | IOP Science                 |
| November 2020 | Neuromorphic control for optic-flow-based landings of MAVs using the Loihi processor                                   | J Dupeyroux, J Hagenaars, F Paredes-Vallés, and G de Croon                                                 | arxiv preprint             |
| October 2020 | Deep Reinforcement Learning with Population-Coded Spiking Neural Network for Continuous Control                        | G. Tang, N. Kumar, R. Yoo, K.P. Michmizos                                                                 | CoRL 2020                  |
| October 2020 | Online few-shot gesture learning on a neuromorphic processor                                                          | K. Stewart, G. Orchard, S.B. Shrestha, E. Neftci                                                           |
| October 2020 | Visual Pattern Recognition with On-chip Learning: towards a Fully Neuromorphic Approach                                          | S. Baumgartner, A. Renner, R. Kreiser, D. Liang, G. Indiveri, Y. Sandamirskaya                                | ISCAS 2020                       |
| October 2020 | Event-based PID controller fully realized in neuromorphic hardware: a one DoF study                                              | R. K. Stagsted, A. Vitale, J. Binz, A. Renner, L. B. Larsen, A. L. Christensen, Y. Sandamirskaya              | IROS 2020                        |
| September 2020 | On-chip Few-shot Learning with Surrogate Gradient Descent on a Neuromorphic Processor                                             | K. Stewart, G. Orchard, S.B. Shrestha, E. Neftci                                                              | AICAS 2020                       |
| September 2020 | P-CRITICAL: A Reservoir Autoregulation Plasticity Rule for Neuromorphic Hardware                                                 | I. Balafrej, J. Rouat                                                                                        | IOP Science 2022                 |
| August 2020  | Hand-Gesture Recognition Based on EMG and Event-Based Camera Sensor Fusion: A Benchmark in Neuromorphic Computing               | E. Ceolini, C. Frenkel, S. Bam Shrestha, G. Taverni, L. Khacef, M. Payvand, E. Donati                        | Frontiers 2020                   |
| July 2020    | Solving a steady-state PDE using spiking networks and neuromorphic hardware                                                      | J. D. Smith, W. Severa, A. J. Hill, L. Reeder, B. Franke, R. B. Lehoucq, O. D. Parekh, J. B. Aimone          | ICONS 2020                       |
| July 2020    | Event-Driven Visual-Tactile Sensing and Learning for Robots                                                                      | T. Taunyazov, W. Sng, B. Lim, H. Hian, J. Kuan, A. Fatir, B. Tee, H. Soh                                     | RSS 2020                         |
| July 2020    | An Efficient Spiking Neural Network for Recognizing Gestures with a DVS Camera on the Loihi Neuromorphic Processor              | R. Massa, A. Marchisio, M. Martina, M. Shafique                                                              | IJCNN 2020                       |
| July 2020    | Approximating Conductance-Based Synapses by Current-Based Synapses                                                               | M. Kiselev, A. Ivanov, D. Ivanov                                                                             | Neuroinformatics 2020            |
| July 2020    | An Astrocyte-Modulated Neuromorphic CPG for Hexapod Robot Locomotion on Intel's Loihi                                            | I. Polykretis, G. Tang, K. P. Michmizos (Rutgers)                                                            | ICONS 2020                       |
| July 2020    | Towards neuromorphic control: A spiking neural network based PID controller for UAV                                              | R. K. Stagsted, A. Vitale, J. Binz, A. Renner, L. B. Larsen, Y. Sandamirskaya (SDU, ETH, Intel)              | RSS 2020                         |
| June 2020    | Minimax Dynamics of Optimally Balanced Spiking Networks of Excitatory and Inhibitory Neurons                                      | Q. Li, C. Pehlevan                                                                                           | NeurIPS 2020                     |
| June 2020    | Neurons as canonical correlation analyzers                                                                                       | C. Pehlevan, X. Zhao, A. Sengupta, and D. B. Chklovskii                                                     | Frontiers in Computational Neuroscience 2020 |
| June 2020    | Reinforcement co-Learning of Deep and Spiking Neural Networks for Energy-Efficient Mapless Navigation with Neuromorphic Hardware | G. Tang, N. Kumar, K. P. Michmizos (Rutgers)                                                                 | IROS 2020                        |
| April 2020   | Neuromorphic Nearest-Neighbor Search Using Intel's Pohoiki Springs                                                     | EP. Frady and G. Orchard et al (Intel)                                                                        | NICE 2020                        |
| March 2020   | Rapid online learning and robust recall in a neuromorphic olfactory circuit                                             | N. Imam (Intel), T. Cleland (Cornell)                                                                         | Nature Machine Intelligence      |
| December 2019 | A spiking neural network algorithm for the network flow problem                                                        | A. Ali, J. Kwisthout                                                                                         |                                   |
| July 2019    | A Neuromorphic Sparse Coding Defense to Adversarial Images                                                             | E. Kim, J. Yarnall, P. Shah (Villanova), and G. Kenyon (LANL)                                                | ICONS 2019                       |
| July 2019    | High Speed Approximate Cognitive Domain Ontologies for Asset Allocation Using Loihi Spiking Neurons                    | C. Yakopcic, T. Atahary, N. Rahman, T. M. Taha, A. Beigh, and S. Douglass                                    | IJCNN 2019                       |
| June 2019    | Rapid online learning and robust recall in a neuromorphic olfactory circuit                                            | N. Imam (Intel), T. Cleland (Cornell)                                                                         | Nature Machine Intelligence 2020 |
| May 2019     | Dynamical Systems in Spiking Neuromorphic Hardware                                                                     | A. Voelker (Waterloo)                                                                                         | PhD thesis                      |
| March 2019   | Spiking Neural Network on Neuromorphic Hardware for Energy-Efficient Unidimensional SLAM                               | G. Tang, A. Shah, K. Michmizos (Rutgers) |  IROS 2019
| Dec 2018     | Benchmarking Keyword Spotting Efficiency on Neuromorphic Hardware | P. Blouw, Xuan Choo, Eric Hunsberger, Chris Eliasmith | NICE 2019
