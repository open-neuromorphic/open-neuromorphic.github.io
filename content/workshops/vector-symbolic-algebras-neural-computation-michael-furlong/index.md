---
title: "Vector Symbolic Algebras and Neural Computation"
author:
  - "Michael Furlong"
date: 2026-07-09
time_zone: "CEST"
description: "Discover how Vector Symbolic Algebras enable Bayesian optimization that matches state-of-the-art robotics results without cubic scaling in sample count."
image: "vsa-workshop-banner.png"
type: "workshops"
production_credits:
  - name: "Alexandre Marcireau"
    role: "Host"
  - name: "Justin Riddiough"
    role: "Event Operations"
start_datetime: "2026-07-09T18:00:00+02:00"
end_datetime: "2026-07-09T19:00:00+02:00"
upcoming: false
video: "tcXCnWeyoq0"
official_gcal: "https://calendar.app.google/zMBePU46dhMsmSki9"
discord_event_url: "https://discord.com/events/1044548629622439977/1524720594820661312"
experience_tags:
  - "researcher"
  - "advanced"
expertise_tags:
  - "machine-learning"
  - "algorithms-learning"
  - "snn"
  - "neuroscience"
field_of_application_tags:
  - "robotics"
  - "space"
summary_points:
  - "By leveraging pseudo-orthogonality in high-dimensional spaces, VSAs translate geometric similarity into semantic similarity, enabling the superposition of concepts."
  - "Unlike tensor products that exponentially increase dimensionality, VSA operations like circular convolution preserve vector dimensionality, drastically reducing memory costs."
  - "Fractional binding induces positive definite kernels, allowing neural populations to estimate probabilities and seamlessly perform continuous-value reasoning."
  - "Mapping continuous variables into VSA representations accelerates algorithms for Bayesian optimization, achieving state-of-the-art performance in complex robotics benchmarks."
---

Vector Symbolic Algebras (VSAs)—often referred to as Vector Symbolic Architectures—provide a rigorous mathematical formalism for understanding neural computation through high-dimensional vector spaces. By drawing structural connections between quantum probability, kernel mean embeddings, and connectionist models, this framework renders the complex, continuous dynamics of neural manifolds legible as discrete symbolic reasoning.

## Key Takeaways

- By leveraging pseudo-orthogonality in high-dimensional spaces, VSAs translate geometric similarity into semantic similarity, enabling the superposition of concepts.
- Unlike tensor products that exponentially increase dimensionality, VSA operations like circular convolution preserve vector dimensionality, drastically reducing memory costs.
- Fractional binding induces positive definite kernels, allowing neural populations to estimate probabilities and seamlessly perform continuous-value reasoning.
- Mapping continuous variables into VSA representations accelerates algorithms for Bayesian optimization, achieving state-of-the-art performance in complex robotics benchmarks.

## Workshop Format & Takeaways

The session was structured as a comprehensive theoretical grounding in VSA mechanics, followed by an exploration of its applied benefits in probabilistic modeling and robotic control. The workshop began by detailing foundational elements: bundling for sets, binding to construct novel slot-filler concepts, and unbinding to retrieve constituent data. Using these high-dimensional algebraic operations natively mimics human cognitive capabilities like visual working memory, offering accuracy comparable to empirical human performance data while significantly reducing training variability in reinforcement learning benchmarks.

Crucially, the workshop unpacked how fractional power encoding embeds continuous values. Generating these continuous vectors naturally induces positive definite kernels (such as the sinc function), which enables VSA expressions to cleanly handle probability estimations. As discussed in the session, recurrent networks—including biologically plausible spiking neural networks (SNNs)—can sample from these embedded probability distributions using Langevin dynamics. This method avoids saddling the system with the burdensome weight-transport problems common in traditional gradient-based sampling.

In practical machine learning applications, adopting VSA embeddings was shown to dramatically streamline computational overhead. For model predictive control and active learning, linearizing the evaluation of the control integral allows the system to approximate Gaussian process regressions highly efficiently. Where standard probabilistic methods scale cubically based on sample size ($O(n^3)$), the VSA approach maintains a fixed complexity bound tied to the vector dimensionality ($O(d^3)$). This optimization translates directly to state-of-the-art speed and capability in complex real-world robotics tasks, such as multi-arm belt stretching or permanently shadowed lunar crater exploration, while heavily reducing evaluation times on parallel GPU hardware.

The session concluded with an extended Q&A, where the discussion expanded to whether VSA computation could run directly in physical analog hardware, how representational capacity degrades gracefully as dimensionality is reduced, and the specific mechanics of converting quasi-probability into true probability via a ReLU-shaped neuron response curve.

## What This Means for Neuromorphic Computing

Integrating Vector Symbolic Algebras bridges a longstanding gap between abstract symbolic AI and low-level connectionist neural dynamics. For neuromorphic hardware engineers and algorithm designers, treating the activities of a neural population as explicit algebraic operations offers an interpretable blueprint—characterized during the session as a "Newton's laws of dynamics" for neural computation.

As memory and representation scaling remain primary bottlenecks for edge devices, the dimensionality-preserving nature of VSAs circumvents the quadratic memory explosion inherently linked to traditional tensor-product bindings. Moreover, recent research indicating that VSA-like structures naturally emerge within trained large language models (like GPT-2) opens a compelling frontier: deliberately imposing this algebraic structure during training rather than hoping a network discovers it blindly. Doing so could yield massive payoffs for both training efficiency and mechanistic interpretability.

Ultimately, the VSA framework demonstrates the raw power of high-dimensional geometry for neuromorphic edge AI. As the speaker noted: if you have enough dimensions, you can move the world.

## Resources

- [Physical Computing - Prof. Jennifer Hasler](https://hasler.ece.gatech.edu/PhysicalComputing.html)
- [Emergent VSA-like Structures in GPT-2 (Pre-print)](https://arxiv.org/abs/2412.07947)
- [A Crash Course in VSA / Hyperdimensional Computing](https://furlong.gitlab.io/posts/2023-07-02.html)
- [How to Build a Brain - Prof. Chris Eliasmith](https://academic.oup.com/book/6263?login=false)
- [Holographic Reduced Representation - Tony Plate](https://press.uchicago.edu/ucp/books/book/distributed/H/bo3643252.html)
- [Sparse Distributed Memory - Pentti Kanerva](https://mitpress.mit.edu/9780262514699/sparse-distributed-memory/)
- [VSAONLINE Seminar Series](https://sites.google.com/view/hdvsaonline)
