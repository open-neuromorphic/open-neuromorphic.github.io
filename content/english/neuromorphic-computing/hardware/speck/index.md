---
active_product: false
description: 'Explore  SynSense''s neuromorphic hardware: Speck'
draft: false
image: speck.jpg
organization:
  group_name: null
  org_logo: null
  org_name: SynSense
  org_website: null
  product_page_link: null
  social_media_links:
    linkedin: null
    twitter: null
    wikipedia: null
product:
  announced_date: null
  applications: Smart sensing
  chip_type: Digital
  neurons: 327000
  on_chip_learning: false
  power: ~5 mW
  release_date: null
  software: Sinabs
  status:
    announced: true
    released: true
    retired: true
  synapses: 278000
product_name: Speck
summary: A DynapCNN chip paired with an event-based camera on the same die.
title: Speck - SynSense
type: neuromorphic-hardware
---

Speck is an integrated sensor-processor IC that fuses event-based vision sensing with event-driven spiking CNN processing. The ultra-low-power IC operates fully asynchronously and takes full advantage of the asynchronous nature of events produced by the DVS. These events are processed by Integrate and Fire neurons that are interconnected efficiently using a convolutional engine within each core. In the chip version used in this work comprises 9 dedicated SCNN cores, each consisting of convolutional connections, IAF neurons and pooling. The chip supports 8 bit weight resolution and 16 bit membrane resolution. Each core supports convolutions of up to 1024 input and output channels with strides of 1, 2, 4 or 8. The device is accessible via a high-level Python library Sinabs or a low-level library samna. Further details are available at \url{sinabs.ai} and \url{synsense.ai}.
