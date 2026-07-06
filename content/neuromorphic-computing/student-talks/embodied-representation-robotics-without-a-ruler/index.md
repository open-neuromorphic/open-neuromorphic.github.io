---
title: "Embodied Representation: Robotics without a Ruler"
author:
  - "Levi Burner"
date: 2025-10-07
description: "Discover how Embodied Visuomotor Representation lets robots perform uncalibrated tasks like gap jumping using only internal action signals and time-to-contact."
upcoming: false
video: "08v-Kyn96SU"
type: "student-talks"
content_source: "talk-summary"
summary_points:
  - "Traditional robotics relies heavily on metric calibration (meters, inches), creating brittle systems susceptible to sensor degradation and conversion errors."
  - "Embodied Visuomotor Representation replaces external units with 'embodied units' derived entirely from a robot's own internal action signals and visual feedback."
  - "Using biological concepts like time-to-contact (tau theory), robots can autonomously scale visual representations without pre-programmed dimensional knowledge."
  - "The framework successfully enables uncalibrated tasks like obstacle clearing, gap jumping, and stabilizing flapping-wing (ornithopter) vision via artificial micro-saccade compensation."
---

Imagine sitting at your desk, looking at objects on it. You do not know their exact distances from your eye in meters, but you can immediately reach out and touch them. Instead of an externally defined unit, your sense of distance is tied to your action's embodiment. In contrast, conventional robotics relies on precise calibration to external units, with which vision and control processes communicate. We introduce Embodied Visuomotor Representation [1], a methodology for inferring distance in a unit implied by action. With it, a robot without knowledge of its size, environmental scale, or strength can quickly learn to touch and clear obstacles within seconds of operation. Likewise, in simulation, an agent without knowledge of its mass or strength can successfully jump across a gap of unknown size after a few test oscillations. These behaviors mirror natural strategies observed in bees and gerbils, which also lack calibration in an external unit. We will also outline specific applications of the theory for tactile manipulation, and vision for a flapping robot.

## Key Takeaways
- Traditional robotics relies heavily on metric calibration (meters, inches), creating brittle systems susceptible to sensor degradation and conversion errors.
- Embodied Visuomotor Representation replaces external units with 'embodied units' derived entirely from a robot's own internal action signals and visual feedback.
- Using biological concepts like time-to-contact (tau theory), robots can autonomously scale visual representations without pre-programmed dimensional knowledge.
- The framework successfully enables uncalibrated tasks like obstacle clearing, gap jumping, and stabilizing flapping-wing (ornithopter) vision via artificial micro-saccade compensation.

## About the Research
This work bridges historical neuroscience—drawing on Jacob von Uexküll's theory of the *Umwelt* and early 20th-century models of internal cognitive feedback—with modern robotic control theory. The core insight is mathematical: by replacing fixed external units (like the meter) with an unknown but internally consistent conversion factor (driven by motor outputs), a robot can create a self-calibrating feedback loop.

Because the "embodied unit" cancels out in the closed-loop control dynamics, the robot remains stable even if its internal scale varies drastically (for instance, if motor strength doubles or environmental gravity changes). In practice, this allows a robot to execute fine-motor tasks like uncalibrated key insertion or precise gap jumping merely by oscillating its body slightly to measure action-perception ratios, bypassing the need for laser rangefinders entirely.

> "We are doing something that is a little uncomfortable. We have to exchange units that we know, like meters and inches, for embodied units where we don't know the exact physical dimension. But by doing so, we can estimate calibrations online, making these robots adaptive to entirely new situations without human intervention."

## What This Means for Neuromorphic Computing
Embodied representation marks a philosophical shift away from the "Sense-Plan-Act" pipelines that currently dominate robotic engineering. By proving that low-level internal feedback can robustly replace precise external metric mapping, this research supports a broader trend towards biologically inspired edge-AI. For the neuromorphic field, it provides a control-theory framework that aligns perfectly with event-based sensors and spiking actuators: systems that naturally operate on relative differences and internal timing rather than absolute, externally synchronized physical coordinates.

## Resources
- **Paper:** [Embodied Visuomotor Representation](https://www.nature.com/articles/s44182-025-00047-y) (Nature)
