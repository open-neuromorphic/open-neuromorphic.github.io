---
title: "Charting the Path Forward: Benchmarks, Education, and the Next Era of Open Neuromorphic"
date: 2026-08-29T09:00:00Z
description: "As our community surpasses 3,200 members, we are launching a major slate of strategic initiatives across standardized benchmarking, cloud-native education, and open science. Here is how you can get involved."
tags: ["community", "onr", "benchmarking", "education", "taxonomy"]
image: "banner.png"
draft: false
author:
  - "Justin Riddiough"
  - "Alexandre Marcireau"
  - "Effiong Blessing"
showTableOfContents: true
---

It has been an incredibly productive summer behind the scenes at Open Neuromorphic! As our global community has grown to over 3,200 researchers, engineers, and students, the demand for vendor-neutral benchmarking, reproducible research frameworks, and accessible educational pipelines has reached an all-time high.

Over the past few months, the Executive Committee has analyzed our 2026 Ecosystem Survey, engaged directly with academic lab leads across the globe, and audited our digital workflows. Today, we are excited to unveil our strategic roadmap across four foundational pillars designed to scale our community infrastructure and accelerate neuromorphic development.

Gauging your feedback and participation on these initiatives will directly shape our execution. Whether you are a student, an open-source developer, or a lab PI, here is what is underway and how you can get involved.

## 1. The Relaunch of Open Neuromorphic Research (ONR 2.0)

We are fundamentally re-architecting the Open Neuromorphic Research (ONR) program. To combat reviewer fatigue and the barriers of closed-door publishing, ONR 2.0 introduces a **"Process as Provenance"** model. By collaborating in the open using ONM infrastructure (repositories, discussion boards, open lab notebooks), the development journey itself becomes a verifiable part of the scientific record, culminating in citable Zenodo DOIs.

We are deeply committed to **reproducible science** and providing clear publication tracks for all experience levels:
* **Short Research Papers:** Focused, ~6-page contributions with mandatory open-source code and data.
* **Interactive Tutorials:** Peer-reviewed, comprehensive walkthroughs paired with runnable software/hardware packages.
* **Meta-Essays & Code Notes:** 1–2 page perspectives, exploratory findings, and community insights.

A huge thank you to Voting Member **Dr. Michael Furlong**, who is driving the scientific architecture for ONR 2.0 alongside the Executive Committee. We are currently testing automated open-access discovery feeds (arXiv & open-access literature) and conducting outreach to academic labs to establish founding partner seats on the **ONR Steering Committee**.

👉 **Read the architecture & track progress:** [Issue #131: Revitalise ONR (Open Neuromorphic Research)](https://github.com/open-neuromorphic/communications/issues/131)

## 2. Cloud-Native Education: The "Zero to Silicon" (Z2S) Curriculum

Bridging the gap between high-level machine learning and low-level digital silicon design is one of the hardest hurdles in neuromorphic engineering. To solve this, we are advancing **Zero to Silicon (Z2S)**—a structured, 5-module educational track that guides learners from biophysical foundations to a working digital spiking neuron.

Modeled after the proven **Neuromatch Academy (NMA)** asynchronous framework, Z2S eliminates local toolchain headaches:
* **100% Cloud-Native:** The entire pipeline—from Python reference models to inline Verilog RTL synthesis and `verilator` compilation—runs directly inside **Google Colab** with zero local installations required.
* **The Co-Design Artifact Pipeline:** Each module builds a verified artifact that directly feeds the next:
  > **Biological Dynamics** ➔ **Python LIF Model** ➔ **Digital Logic Mapping** ➔ **Verilog RTL** ➔ **Simulation & Waveform Verification**
* **Interactive Waveforms:** Signal traces are plotted directly inside the notebook using Matplotlib, comparing hardware cycle accuracy against software baselines.

Special thanks to our volunteer team (**Jose Antonio, Rayane Rocha, Erastus Toe, and Bally**) for driving the module development and Colab sandbox testing!

👉 **Explore the syllabus & specifications:** [PR #155: Zero to Silicon Source of Truth](https://github.com/open-neuromorphic/communications/pull/155) & [Issue #146](https://github.com/open-neuromorphic/communications/issues/146)

## 3. The Master Taxonomy Initiative

As our directories of chips, frameworks, and datasets grow, finding the right tool for a specific application has become increasingly challenging. We have launched the **Content Taxonomy Initiative** to establish a unified, community-vetted classification system.

The taxonomy organizes our knowledge graph across three clear dimensions:
1. **Technical Expertise (The "How"):** e.g., *Digital Accelerators, Analog/Mixed-Signal, Spiking Neural Networks, Compilers & Intermediate Representations (NIR).*
2. **Application Domains (The "Why"):** e.g., *Robotics & Physical AI, Agriculture & Environmental Monitoring, Edge IoT, Medical Devices, Space.*
3. **Availability & Openness:** e.g., *Open Hardware (Verilog/VHDL), Commercial Silicon, Research Prototype, Proprietary IP.*

This taxonomy will power multi-factor search filters across our Hardware and Software Guides and automatically generate dedicated **Niche Hubs** linking directly to matching Discord working groups.

👉 **Help shape the vocabulary:** [Issue #154: Defining and Implementing the ONM Content Taxonomy](https://github.com/open-neuromorphic/communications/issues/154)

## 4. Defining ONM's Role in Standardized Benchmarking & Open Evaluation

In our recent Ecosystem Survey, **standardized benchmarking** emerged as one of the most critical demands across the entire neuromorphic landscape, with nearly 30% of organizational respondents explicitly requesting toolchain validation, standard task suites, and reliable efficiency metrics.

However, evaluating neuromorphic technology is uniquely complex: architectures range from digital ASICs to analog substrates, datasets span event streams to bio-signals, and access to physical silicon is often heavily restricted.

Rather than prescribing a single top-down solution, **we are opening a consultation with the community to determine what ONM's primary role in benchmarking should be:**

* **Path A — Open Leaderboard & Test-Runner Host:** Should ONM host containerized benchmark runners and public leaderboards (via our standalone repository [`open-neuromorphic/neuromorphic-benchmarks`](https://github.com/open-neuromorphic/snn-library-benchmarks)), publishing transparent, locally reproducible execution results?
* **Path B — Evaluation Framework Aggregator:** Should ONM focus on curating, indexing, and documenting existing open evaluation suites (such as NeuroBench, BrainCog, and snnTorch benchmarks) within our guides and taxonomy?
* **Path C — Dedicated Peer-Reviewed Benchmark Track:** Should ONM create a specialized review track within ONR 2.0 where researchers publish benchmark datasets, reproducibility audits, and comparative hardware studies with citable DOIs?

### Our Core Guarantees: Neutrality & Open Science
Regardless of which direction the community chooses, ONM’s stance is firm:
1. **Strict Vendor Neutrality:** ONM will never pick commercial "winners" or gatekeep evaluations behind proprietary paywalls.
2. **100% Open & Locally Reproducible:** All benchmark harnesses, scoring scripts, and test datasets featured by ONM must be open source (MIT/Apache 2.0/CC-BY) and verifiable on local developer hardware without black-box dependencies.

👉 **We want your perspective — join the consultation:** [Issue #153: Defining ONM's Strategy for Standardized Benchmarking & Open Evaluation](https://github.com/open-neuromorphic/communications/issues/153)

## 🚀 Call for Volunteers: Build With Us!

Open Neuromorphic is a community-first organization, and scaling these initiatives requires distributed leadership. We are actively looking for contributors and working group leads across several key roles:

* **Curriculum & Lab Authors:** Help write Colab tutorial notebooks, test Verilog RTL testbenches, or design conceptual sketches for *Zero to Silicon*.
* **Benchmarking Contributors & Lab Researchers:** Share how your lab measures energy and latency, help evaluate existing frameworks, or contribute open runner scripts.
* **Content Curators & Taggers:** Assist in auditing and applying our new taxonomy tags across the Hardware and Software directories.
* **Working Group & Event Leads:** Help coordinate niche interest hubs or facilitate upcoming community panels (like our September *Digital vs. Analog Hardware Panel*).
* **ONR Steering Committee & Reviewers:** Domain experts interested in shaping peer-review rubrics and acting as topic editors.

### How to Get Involved:
1. **Comment on GitHub:** Jump directly into any of the tracking issues linked above ([#131](https://github.com/open-neuromorphic/communications/issues/131), [#146](https://github.com/open-neuromorphic/communications/issues/146), [#153](https://github.com/open-neuromorphic/communications/issues/153), [#154](https://github.com/open-neuromorphic/communications/issues/154)) to share your thoughts or volunteer for a task.
2. **Join the Discord:** Head over to our **[Discord Community](https://discord.gg/openneuromorphic)** to participate in active working threads in `#content-development`, `#onm-tech-contributors`, and `#general`.
3. **Contact Leadership:** Reach out to the Executive Committee directly at **open.neuromorphic@gmail.com**.

Let us know what excites you most. Your voice and contributions drive the roadmap forward!
