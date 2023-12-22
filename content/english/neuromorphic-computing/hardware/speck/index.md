---
active_product: true
summary: A DynapCNN chip paired with an event-based camera on the same die.
draft: false
image: speck.jpg
organization:
  group_name: null
  org_logo: ../xylo/synsense.png
  org_name: SynSense
  org_website: https://www.synsense.ai/
  product_page_link: https://www.synsense.ai/products/speck/
  social_media_links:
    linkedin: https://www.linkedin.com/company/synsense-neuromorphic/
    twitter: https://twitter.com/SynSenseNeuro
    wikipedia: null
product:
  announced_date: 02.09.2019
  applications: Smart sensing
  chip_type: Digital
  neurons: 327000
  on_chip_learning: false
  power: ~5 mW
  release_date: 02.09.2019
  software: Sinabs
  status:
    announced: true
    released: true
    retired: false
  synapses: 278000
product_name: Speck
title: Speck
---

Speck is an integrated sensor-processor IC that fuses event-based vision sensing with event-driven spiking CNN processing. The ultra-low-power IC operates fully asynchronously and takes full advantage of the asynchronous nature of events produced by the DVS. These events are processed by Integrate and Fire neurons that are interconnected efficiently using a convolutional engine within each core. In the chip version used in this work comprises 9 dedicated SCNN cores, each consisting of convolutional connections, IAF neurons and pooling. The chip supports 8 bit weight resolution and 16 bit membrane resolution. Each core supports convolutions of up to 1024 input and output channels with strides of 1, 2, 4 or 8. The device is accessible via a high-level Python library Sinabs or a low-level library samna. Further details are available at \url{sinabs.ai} and \url{synsense.ai}.
