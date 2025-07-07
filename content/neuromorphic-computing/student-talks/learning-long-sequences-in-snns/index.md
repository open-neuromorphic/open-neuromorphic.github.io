---
title: "Student Talk: Learning Long Sequences in Spiking Neural Networks"
author:
  - "Matei Stan"
date: 2025-07-27
start_time: "08:00"
end_time: "09:00"
time_zone: "EST"
description: "Explore how State Space Models (SSMs) combined with Spiking Neural Networks (SNNs) can outperform Transformers on long-sequence tasks, and learn about a novel feature mixing layer that challenges assumptions about binary activations."
upcoming: true
upcoming_url: "https://link.to.the.event" # Ask him for this
video: ""
image: "banner.png" # Ask him for a 1200x630px banner image
speaker_photo: "matei-stan.jpg" # This should be the same as his contributor photo
type: "student-talks"
speaker_bio: "Matei Stan is a third-year PhD student in the Department of Computer Science at the University of Manchester, UK. He is supervised by Dr Oliver Rhodes in the Advanced Processor Technologies (APT) group. In his PhD work, Matei has primarily focused on the applications of deep State Space Models (SSMs), such as S4, in neuromorphic computing, and their potential in scaling energy-efficient algorithms for long-range sequential tasks."
---

Matei’s published work, “Learning Long Sequences in Spiking Neural Networks” [2], systematically investigates, for the first time, the intersection of the State‑of‑The‑Art SSMs with Spiking Neural Networks (SNNs) for long‑range sequence modelling. Results suggest that SSM‑based SNNs can outperform the Transformer on all tasks of a well‑established long‑range sequence modelling benchmark - the “Long-Range Arena” [3]. It is also shown that the SSM‑based SNNs can outperform current State‑of‑The‑Art SNNs with fewer parameters on sequential image classification. Finally, a novel feature mixing layer is introduced, improving SNN accuracy while challenging assumptions about the role of binary activations in SNNs. This work paves the way for deploying powerful SSM-based architectures, such as Large Language Models, on neuromorphic hardware for energy-efficient long-range sequence modelling.

This talk will highlight, at a high level, the similarities in computational primitives between SSMs and the existing neuromorphic standards such as Leaky Integrate-and-Fire (LIF) neurons. It will also focus on the specific drawbacks brought about by the introduction of binary activations in SSMs, as well as the extent to which these can be mitigated by the development of more accurate surrogate gradient methods that account for non-differentiability. Finally, arguments will be presented in favour of separating biological plausibility from energy efficiency in attempting to create scalable neuromorphic solutions.

**Contents of the talk:**
- Introduction to long-range sequence modelling
- Link between SSMs and SNNs
- Binary S4D and the Gated Spiking Unit
- Q&A

**References**
[1]: Gu, A., Goel, K. and Ré, C., 2021. Efficiently modeling long sequences with structured state spaces. arXiv preprint arXiv:2111.00396.
[2]: Stan, M.I. and Rhodes, O., 2024. Learning long sequences in spiking neural networks. Scientific Reports, 14(1), p.21957.
[3]: Tay, Y., Dehghani, M., Abnar, S., Shen, Y., Bahri, D., Pham, P., Rao, J., Yang, L., Ruder, S. and Metzler, D., 2020. Long range arena: A benchmark for efficient transformers. arXiv preprint arXiv:2011.04006.
