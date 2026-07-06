---
title: "The TSP1 Neural Network Accelerator Chip: Advancing Brain-Inspired Computing"
author:
  - "Chris Eliasmith"
  - "Danny Rosen"
date: 2025-11-11
start_time: "8:00"
end_time: "9:00"
time_zone: "EST"
description: "The TSP1 accelerator chip runs Legendre Memory Units (LMUs) to deliver state-of-the-art time-series inference at milliwatt power levels."
upcoming: false
video: "gk-ieigCkmM"
aliases:
  - /workshops/tsp1-neural-chip-chris-eliasmith/
image: "ABR-TSP1-Chip.jpg"
type: "workshops"
hardware_tags:
  - tsp1
experience_tags:
  - industry
  - practitioner
  - advanced
expertise_tags:
  - digital-hardware
  - machine-learning
field_of_application_tags:
  - consumer-electronics
  - automotive
content_source: "talk-summary"
summary_points:
  - "The TSP1 is an edge accelerator purpose-built to execute State Space Models (SSMs) and Legendre Memory Units (LMUs)."
  - "Modeled after hippocamal time cells, LMUs optimally compress temporal information into continuous dynamics using linear and non-linear layers."
  - "LMUs achieve state-of-the-art performance on time-series tasks (NLP, RF classification, speech) using ~60% fewer parameters than LSTMs or Transformers."
  - "The TSP1 executes these streaming models without instruction fetch cycles, performing real-time Automatic Speech Recognition (ASR) at approximately 35 milliwatts."
---

The current trajectory of artificial intelligence is bound by a severe compute and memory bottleneck: running massive Transformer models requires data center-scale energy. Pushing complex inference to the edge—enabling low-latency, privacy-preserving, and always-available AI in smart glasses, robotics, and wearables—requires fundamentally rethinking how temporal data is processed. The Time Series Processor 1 (TSP1) from Applied Brain Research addresses this by completely departing from standard hardware architectures, instead executing highly efficient, brain-inspired State Space Models natively on silicon.

## Key Takeaways
- **The Legendre Memory Unit (LMU):** The algorithmic heart of the TSP1, the LMU is a State Space Model based directly on the continuous-time dynamics of time cells in the rodent hippocampus. It optimally compresses sliding windows of time-series data using orthogonal Legendre polynomials.
- **O(N) Scaling complexity:** Unlike Transformers, which suffer from O(N²) scaling regarding context length, LMUs scale linearly. This allows the model to retain immense contextual memory with drastically smaller parameter counts and reduced training data requirements.
- **Natively streaming by design:** LMUs are continuous dynamical networks perfectly suited for "batch one" streaming data (audio, RF signals, medical vitals), bypassing the latency introduced by windowed batch processing.
- **Extreme hardware efficiency:** The TSP1 eliminates standard instruction-fetch cycles during network execution. This highly localized data flow results in nearly a terabyte-per-second-per-watt of memory bandwidth, achieving cloud-level Automatic Speech Recognition (ASR) and Text-to-Speech (TTS) at around 35 milliwatts of power.

## Workshop Format & Takeaways
The workshop provided a unified narrative stretching from theoretical neuroscience to physical silicon. It began by comparing the spiking activity of hippocampal time cells to the continuous dynamic state vectors of the LMU algorithm. The session mapped the LMU's rapid ascent in NLP benchmarks, proving its parameter efficiency over LSTMs and Transformers. Finally, a live demonstration showcased the TSP1 chip processing raw audio, performing highly accurate, real-time speech transcription and natural-sounding voice generation while remaining entirely untethered from the cloud.

## What This Means for Neuromorphic Computing
The TSP1 demonstrates the profound commercial and computational leverage gained through strict algorithm-hardware co-design. As highlighted during the session, much of the industry's power is wasted shuffling massive matrices between memory and compute cores to satisfy the batch-heavy demands of Transformers.

By observing how the brain handles temporal continuity—processing streams of data continuously rather than buffering them into static snapshots—Applied Brain Research developed an algorithm that inherently requires less data movement. Baking that specific dynamic directly into the TSP1's digital architecture proves that achieving extreme edge AI does not strictly require analog substrates or asynchronous spikes; it requires abandoning von Neumann bottlenecks in favor of localized, continuous-time dynamics.

## Resources
- **Applied Brain Research Technology Page:** [https://www.appliedbrainresearch.com/technology](https://www.appliedbrainresearch.com/technology)
- **Centre for Theoretical Neuroscience:** [https://uwaterloo.ca/centre-for-theoretical-neuroscience/](https://uwaterloo.ca/centre-for-theoretical-neuroscience/)
