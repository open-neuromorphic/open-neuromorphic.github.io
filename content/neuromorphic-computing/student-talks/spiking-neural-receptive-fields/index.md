---
title: "Spiking Neural Receptive Fields" 
author:
  - "Jens E Pedersen" 
date: 2025-12-05 # Date of the student talk (YYYY-MM-DD).
start_time: "08:00" # Event start time (24-hour format HH:MM).
end_time: "09:15"   # Event end time (24-hour format HH:MM).
time_zone: "EST"    # Timezone (e.g., CET, CEST, EST, PST).
description: "Join us for an insightful student talk on Spiking Neural Receptive Fields by Jens Egholm Pedersen. Discover the mathematical motivation for linking continuous scale-space theory to discrete spiking dynamics."
upcoming: true 
upcoming_url: "https://dtudk.zoom.us/j/68487370163"
video: ""       # After the event, add the YouTube video ID (e.g., "dQw4w9WgXcQ").
type: "student-talks" 

# Optional: Add links to slides, code, or notebooks if available after the student talk.
# Place these files in this student talk's folder and link them:
# speaker_slides: "slides.pdf"
speaker_paper: "https://www.nature.com/articles/s41467-025-63493-0" # External link
# speaker_notebook: "my-notebook.ipynb" # Place in folder
---

Jens's published work, "Covariant spatio-temporal receptive fields for spiking neural networks” [2], addresses a fundamental challenge in neuromorphic computing: the lack of theoretical frameworks to guide efficient implementations. The work demonstrates that leaky integrator and leaky integrate-and-fire neuron models are provably covariant to a large class of geometric transformations, with two important implications: (1) we can build reliable and scalable neuromorphic computational pipelines and (2) we can solve spatio-temporal problems much more efficiently than conventional deep learning methods. The paper demonstrates a regression problem where spiking neural networks significantly outperform comparable non-neuromorphic networks, even when the latter have access to multiple frames. Additionally, by imbuing the network with spatio-temporal priors their performance improves by 42.4% for leaky integrators and 20.3% for leaky integrate-and-fire models. This work establishes a principled computational framework connecting scale-space theory, visual neuroscience, and neuromorphic engineering, paving the way for theoretically grounded event-based processing systems.


This talk will highlight the mathematical motivation for linking continuous scale-space theory to discrete spiking dynamics, focusing on how covariance properties enable robust processing of geometric transformations. It will demonstrate why initialization with theoretical priors dramatically improves training of spiking networks, and discuss the implications for deploying neuromorphic systems in resource-constrained, real-time settings.

**Contents of the talk:**
- First principles for neuromorphic computation
- Scale-space theory and geometric image transformations
- Covariance in leaky integrators and leaky integrate-and-fire models
- Experimental validation on event-based object tracking
- Q&A

## About the Speaker

Jens Egholm Pedersen was awarded his PhD from the KTH Royal Institute of Technology in Sweden and is currently a postdoc researcher at the Technical University of Denmark. Jens studies computational models that are jointly continuous and discrete. He co-authored the Neuromorphic Intermediate representation that brings ensures compatibility between 15 neuromorphic platforms. He is a prominent contributor to the open-source community and his code has been downloaded and installed more than 1 million times. He has won several large grants, the Misha Mahowald Early Career Award and is currently chairing the Open Neuromorphic community.

## References
[1]: Lindeberg, T. A computational theory of visual receptive fields. Biol. Cybern. 107, 589–635 (2013).
[2]: Pedersen, J.E., Conradt, J. & Lindeberg, T. Covariant spatio-temporal receptive fields for spiking neural networks. Nat Commun 16, 8231 (2025).
[3]: Lindeberg, T. Time-causal and time-recursive spatio-temporal receptive fields. J. Math. Imaging Vis. 55, 50–88 (2016).
