---
title: "Example Paper 3: A Benchmark Suite for Neuromorphic Audio Processing"
date: 2025-06-01
description: "This placeholder resource introduces a new, comprehensive benchmark suite for audio processing tasks, specifically designed for event-based audio sensors and spiking neural networks."
draft: false
type: "research-papers"
resource_link: "https://tonic.readthedocs.io/"
author:
  - "Fabrizio Ottati"
publication_venue: "Fictional Open Science Journal, 2025"
doi: "10.xxxx/fosj.2025.003"
review_date: "2025-06-01"
onr_badge: true
---

**Note:** This is a placeholder entry to demonstrate the layout and structure of the ONR Approved Research Registry.

## Abstract
The lack of standardized, event-based audio benchmarks has hindered progress in neuromorphic auditory processing. We introduce the Neuromorphic Audio Benchmark Suite (NABS), a collection of four datasets for tasks ranging from keyword spotting to sound source localization, captured with silicon cochlea sensors. We provide baseline results using several popular SNN frameworks to facilitate future comparisons. All datasets are released under a permissive license and are accessible through the Tonic library.

## Resource Overview
NABS is a community resource aimed at standardizing the evaluation of neuromorphic audio models. This resource includes:
- The four curated event-based audio datasets.
- A Python package integrated with Tonic for easy data loading and preprocessing.
- Baseline model implementations in `snnTorch` and `Lava`.
- A detailed website with dataset specifications, baseline performance metrics, and instructions for submitting new results.