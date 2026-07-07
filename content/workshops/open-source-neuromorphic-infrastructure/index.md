---
title: "Open-Source Neuromorphic Research Infrastructure: A Community Panel"
author:
  - Jens E. Pedersen
  - Giulia D'Angelo
  - Hananel Hazan
  - James Knight
  - Alexandre Marcireau
  - Gregor Lenz
  - Dylan Muir
  - Terry Stewart
  - Marcel Stimberg
date: 2025-07-30
description: "Nine neuromorphic tool maintainers navigate open-source funding, standardize edge deployments, and successfully balance commercial scale with biological realism."
upcoming: true
video: "kZqVe3547r8"
image: "tools.png"
software_tags: ["neuromorphic-intermediate-representation", "bindsnet", "snntorch", "brian", "genn", "jaxsnn", "nengo", "norse", "rockpool", "tonic", "nest"]
type: "workshops"
experience_tags: ["student", "researcher", "industry", "practitioner"]
expertise_tags: ["software", "snn", "machine-learning", "neuroscience"]
field_of_application_tags: ["education"]
content_source: "talk-summary"
summary_points:
  - "Maintainers debated the tension between consolidating tools for commercial deployment and preserving diverse architectures for biological exploration."
  - "Open-source sustainability is a critical bottleneck, requiring better alignment between academic publishing incentives and long-term software maintenance."
  - "The community largely rejected a single 'TensorFlow-style' mandate in favor of 'unity in diversity'—sharing interoperability layers while supporting varied approaches."
---

The neuromorphic computing field stands at a critical juncture. While there have been incredible theoretical advances and promising hardware developments, software infrastructure has historically remained fragmented compared to the mature ecosystem that propelled conventional machine learning forward. This panel brought together the maintainers and contributors behind the most important open-source neuromorphic software libraries to discuss the current state and future trajectory of the field's infrastructure.

The session featured presentations and debates from leading maintainers:
- **Giulia D'Angelo** (Host), working on brain-inspired algorithms optimized for neuromorphic hardware.
- **Hananel Hazan** (BindsNET), Research Scientist at Tufts University.
- **James Knight** (GeNN), Senior Research Software Engineer at the University of Sussex.
- **Alexandre Marcireau** (Faery), Researcher in neuromorphic event-based vision.
- **Gregor Lenz** (Tonic), Co-Founder & CTO at Neurobus.
- **Dylan Muir** (Rockpool), VP Global Research Operations at SynSense.
- **Jens E. Pedersen** (NIR & Norse), Doctoral student at KTH and chair of Open Neuromorphic.
- **Terry Stewart** (Nengo), Lead developer of the Nengo neural simulator.
- **Marcel Stimberg** (Brian), Research engineer at Sorbonne Université.

## Key Takeaways
- **Maintainers debated the tension between consolidating tools for commercial deployment and preserving diverse architectures for biological exploration.**
- **Open-source sustainability is a critical bottleneck, requiring better alignment between academic publishing incentives and long-term software maintenance.**
- **The community largely rejected a single "TensorFlow-style" mandate in favor of "unity in diversity"—sharing interoperability layers while supporting varied approaches.**

## Workshop Format & Takeaways
The session was structured as a series of rapid-fire lightning talks from the tool maintainers, followed by a community-focused debate on infrastructure priorities. The initial presentations mapped out the distinct philosophies driving the ecosystem: tools like BindsNET and Brian focus heavily on biological realism, local learning, and mathematical accuracy; platforms like GeNN provide massive GPU-accelerated simulation scale; while frameworks like Rockpool and NIR focus on bridging the gap between deep learning training and direct deployment onto neuromorphic hardware.

During the panel discussion, maintainers candidly addressed the phenomenon of "reinventing the wheel" in academia. Participants noted that while building custom tools is often necessary for niche research or to bypass closed-source limitations, the field suffers when projects are abandoned after a PhD concludes or funding runs out. The panel highlighted the structural gap between the academic incentive to publish novel research and the industrial necessity of maintaining long-term, stable software libraries.

## What This Means for Neuromorphic Computing
The original pre-event framing of this panel questioned how neuromorphic computing could build a unified, competitive ecosystem comparable to conventional machine learning platforms like PyTorch or TensorFlow. However, the session revealed that the maintainers themselves do not view strict unification as the ultimate goal.

Instead of mandating a single, monolithic direction for the field, the consensus championed "unity in diversity." There is a fundamental divergence in use cases across the field: commercial edge applications require reliable gradient descent and standardized leaky integrate-and-fire (LIF) models that compile predictably to digital silicon. Conversely, researchers studying biological nervous systems require highly flexible frameworks that embrace the messy, asynchronous, and complex constraints of biological tissue—features that standard machine learning actively avoids.

The path forward identified by the panel relies on building interoperable layers (such as the Neuromorphic Intermediate Representation) that allow these diverse tools to communicate seamlessly, rather than forcing all researchers into a single paradigm. The recognition that biological hardware naturally incorporates noisy, asynchronous dynamics implies that forcing exact digital parity between platforms may be a fool's errand.

> "We shouldn't be mindlessly making spiking versions of machine learning architectures... I think there is more to biological neurons than LIF. We don't need to be simulating Hodgkin-Huxley neurons on neuromorphic chips, but you're potentially throwing more babies out with the bathwater [by standardizing purely on LIF]." — as noted in the session.

> "Unity in diversity. Let's do stuff together that we all need different approaches for... there's no one-fits-all for everything." — as noted in the session.

## Resources
- [Discord Community](https://discord.gg/hUygPUdD8E)
- [Open Neuromorphic YouTube Channel](https://www.youtube.com/@openneuromorphic)
