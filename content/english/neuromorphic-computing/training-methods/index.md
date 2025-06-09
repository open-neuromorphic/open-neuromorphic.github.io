---
title: "Training Methods - Neuromorphic Engineering"
description: "training methods for neuromorphic engineering"
draft: true
---

## Training methods
Not only the neuron models themselves are bio-inspired, but also the way they learn. Inspired from neuroscience, early spiking neural networks were trained using Hebbian learning rules, where the strength of the connection between two neurons is reinforced if there is some form of local causality. This works for very shallow networks, but is hard to steer/control because it lacks a global error signal. The advent of deep learning has made it possible to train SNNs end-to-end in a supervised fashion using backpropagation. Here we can use all the modern deep learning tools available and build on top of them. This has resulted in the most powerful SNNs to date. SNNs can be seen as a special case of RNNs with binary activations, internal states depending on the neuron model and long sequence lengths. That makes them very difficult to train, because we need to balance the trade-off between keeping activation in the network low, but also passing on enough information from layer to layer! If done right, the sparse network activation is the reason why neuromorphic systems can be so energy-efficient. 
As a single spike in a rate coding regime carries very low information value, multiple of them need to be integrated over time to make meaning of it. 

<!-- Feeding sequential inputs makes SNNs a subclass of RNNs, which have largely been abandoned since the rise of transformers. It remains to be seen if it will be possible to scale SNNs to similar sizes as ANNs.
Training SNNs is currently difficult and slow because the networks are stateful / rely on time and their activation is extremely sparse. During inference time, this is where we get some power benefits from, but during training time, we also get less of a teaching signal.  -->
