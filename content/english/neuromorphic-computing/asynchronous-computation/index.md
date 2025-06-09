---
title: "Asynchronous Computation - Neuromorphic Engineering"
description: "Asynchronous computation is a key feature of neuromorphic computing. Learn more about asynchronous computation and how it is used in neuromorphic computing."
draft: true
---


## Asynchronous computation
Computer chips are driven by clocks that time the exact executions of computations, which makes it possible to achieve really high throughput for offline and batched computations. The brain does not have such a central clock, instead, every neuron reacts in its own time to the arrival of input. Neuromorphic hardware can implement asynchronous functionality, where neuron cores are only powered up at the presence of input! 
Neuromorphic sensors like change-detecting cameras and microphones provide the sparse, event-driven data streams needed. For example, when recording a static scene, a neuromorphic camera outputs next to no data, allowing the downstream processing chip to operate energy-efficiently.
The asynchronous information flow is great for sporadic, transient events, but at some data input rate, the overhead of handshaking every event is higher than simple clocked computation. Asynchronous vs synchronous therefore depends to a large extent on the data rate. 
