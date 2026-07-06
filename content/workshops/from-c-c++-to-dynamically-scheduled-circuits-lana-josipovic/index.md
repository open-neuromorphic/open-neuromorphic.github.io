---
title: "From C/C++ to Dynamically Scheduled Circuits"
author:
  - Lana Josipović
  - Fabrizio Ottati
date: 2023-07-19
video: mQU8iU0HyHw
image: from-c-c++-to-dynamically-scheduled-circuits.png
type: "workshops"
experience_tags: ["researcher", "advanced", "industry"]
expertise_tags: ["digital-hardware", "software", "algorithms-learning"]
summary_points:
  - "Dynamically scheduled circuits resolve standard HLS limitations by using local handshake signals instead of a centralized, static controller."
  - "Dataflow circuits enable out-of-order memory accesses and speculative execution, significantly increasing performance for code with irregular dependencies."
  - "A Petri-net-based mathematical model automatically optimizes buffer placement and sizing to maximize pipeline throughput and area efficiency."
  - "The open-source Dynamatic compiler systematically translates C/C++ code into high-performance, dynamically scheduled dataflow circuits."
description: "Dynamically scheduled dataflow circuits overcome static high-level synthesis limits to enable out-of-order memory and speculative execution from C/C++ code."
---

High-level synthesis (HLS) tools traditionally rely on static, centralized controllers that struggle to extract parallelism from general-purpose C/C++ code, particularly when facing irregular memory access patterns or variable loop bounds. By transitioning from statically scheduled pipelines to dynamically scheduled dataflow circuits, developers can achieve significantly higher throughput and enable advanced behaviors like out-of-order memory accesses directly from high-level code.

## Key Takeaways
- Dynamically scheduled circuits resolve standard HLS limitations by using local handshake signals instead of a centralized, static controller.
- Dataflow circuits enable out-of-order memory accesses and speculative execution, significantly increasing performance for code with irregular dependencies.
- A Petri-net-based mathematical model automatically optimizes buffer placement and sizing to maximize pipeline throughput and area efficiency.
- The open-source Dynamatic compiler systematically translates C/C++ code into high-performance, dynamically scheduled dataflow circuits.

## Workshop Format & Takeaways
The session detailed the architectural differences between traditional static HLS and dynamic dataflow scheduling, walking through practical limitations in standard pipelines. When standard HLS encounters variable loop bounds or irregular memory access patterns (like those found in sparse matrix-vector multiplication or histogram generation), it defaults to conservative, sequential scheduling.

To overcome this, dynamically scheduled circuits implement decentralized control, utilizing handshake signals between operators. This structure acts similarly to an out-of-order superscalar processor, featuring load-store queues to manage read-after-write dependencies dynamically and safe commit/save mechanisms for speculative execution.

As noted in the session, incorporating these advanced dynamic mechanisms requires additional logic overhead—specifically for handshaking and distributed memory interfaces—but formal verification methods are currently in development to automatically prune redundant dataflow logic and minimize resource usage up to 50% without compromising correctness.

## What This Means for Digital Hardware Design
Bringing out-of-order execution and speculative evaluation to high-level synthesis is a major step toward making hardware acceleration accessible to non-hardware experts. By automating the extraction of parallelism from general-purpose code, standard software engineers and machine learning practitioners can generate highly efficient digital circuits without mastering low-level hardware description languages like VHDL or Verilog.

## Resources
- [Dynamatic Framework / Research Group](#) *(Link surfaced in video)*
