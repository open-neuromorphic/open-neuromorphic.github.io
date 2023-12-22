---
title: Speck
description: A DynapCNN chip paired with an event-based camera on the same die.
active_product: true
product:
  chip_type: Digital
  neurons: 327000
  synapses: 278000
  on_chip_learning: false
  power: ~5 mW
  software: Sinabs
  applications: Smart sensing
  status:
    announced: true
    released: true
    retired: false
  announced_date: 02.09.2019 
  release_date: 02.09.2019
image: speck.jpg
organization:
  org_name: SynSense
  org_logo: ../xylo/synsense.png
  org_website: https://www.synsense.ai/
  group_name:
  social_media_links:
    linkedin: https://www.linkedin.com/company/synsense-neuromorphic/
    twitter: https://twitter.com/SynSenseNeuro
    wikipedia:
  product_page_link: https://www.synsense.ai/products/speck/
draft: false
---

Speck is an integrated sensor-processor IC that fuses event-based vision sensing with event-driven spiking CNN processing. The ultra-low-power IC operates fully asynchronously and takes full advantage of the asynchronous nature of events produced by the DVS. These events are processed by Integrate and Fire neurons that are interconnected efficiently using a convolutional engine within each core. In the chip version used in this work comprises 9 dedicated SCNN cores, each consisting of convolutional connections, IAF neurons and pooling. The chip supports 8 bit weight resolution and 16 bit membrane resolution. Each core supports convolutions of up to 1024 input and output channels with strides of 1, 2, 4 or 8. The device is accessible via a high-level Python library Sinabs or a low-level library samna. Further details are available at \url{sinabs.ai} and \url{synsense.ai}.
