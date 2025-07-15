---
title: "Legendre-SNN on Loihi-2"
author:
- "Ramashish Gaurav"
date: 2024-12-20
description: "Join us for a talk by Ramashish Gaurav, PhD student at Virginia Tech."
upcoming: false
video: A1egFLRw12c
speaker_photo: ramashish.jpg
image: poster.png
type: "student-talks"
speaker_bio: 'Ramashish Gaurav (Ram) is a 3rd year Ph.D. student at Virginia Tech, USA. He is supervised by Prof. Yang (Cindy) Yi in her BRICC Lab, ECE @ VT. Of late, Ram has been working on reservoir-based spiking models
for Time Series Classification (TSC). Reservoir Computing is a well-established domain for time-series
processing where a reservoir of statically (and recurrently) connected neurons compute high
dimensional temporal features, over which a linear readout layer learns the mapping to the output.'
---
In his recent work [1], Ram designed the Legendre-SNN (LSNN), a simple - yet high performing SNN model (for univariate TSC) where he has used the Legendre Delay Network (LDN) [2] as a non-spiking reservoir (in fact, the LDN in LSNN is implemented with just basic matrix-operations). In a subsequent work (currently under review), he extended his LSNN to DeepLSNN that accounts for multivariate time-series signals too; upon experimenting with it, he found that DeepLSNN models outperform a popular (and complex) LSTM-Conv integrated model [3] on more than 30% of 101 TSC datasets. His latest work is on the evaluation of Legendre-SNN on the Loihi-2 chip [4] — on which this talk is focused at.
Legendre-SNN is composed of a non-spiking LDN followed by one spiking hidden layer and an output layer. The Loihi-2 chip has got two On-chip computational resources: low-power x86 Lakemont (LMT) microprocessors (total 6) and NeuroCores (total 128). The LMT cores support only INT32-bit operations and NeuroCores support deployment of spiking networks. With minimal documentation to program the LMT cores, the challenge was -- how to deploy the Legendre-SNN in its entirety (and evaluate it) on a Loihi-2 chip. In this talk, Ram will present the technical specifics of implementing the non-spiking LDN on an LMT core (the spiking network post the LDN is deployed on NeuroCores). His work: “Legendre-SNN on Loihi-2” [4] adds to the scarce technical-documentation to program LMT cores and presents a pipeline to deploy an SNN model composed of non-spiking & spiking components -- entirely on Loihi-2.
References:
[1]: Gaurav, Ramashish, Terrence C. Stewart, and Yang Yi. "Reservoir based spiking models for univariate Time Series Classification." Frontiers in Computational Neuroscience 17 (2023): 1148284.
[2]: Voelker, Aaron R., and Chris Eliasmith. "Improving spiking dynamical networks: Accurate delays, higher-order synapses, and time cells." Neural computation 30.3 (2018): 569-609.
[3]: Karim, Fazle, et al. "LSTM fully convolutional networks for time series classification." IEEE access 6 (2017): 1662-1669.
[4]: Gaurav, Ramashish, Terrence C. Stewart, and Yang Yi. "Legendre-SNN on Loihi-2: Evaluation and Insights." NeurIPS 2024 Workshop Machine Learning with new Compute Paradigms.
