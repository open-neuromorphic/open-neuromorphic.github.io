---
active_product: true
description: 'Learn about BrainChip''s neuromorphic hardware: Akida'
type: neuromorphic-hardware
image: akida.png
organization:
  group_name: null
  org_logo: brainchip.png
  org_name: BrainChip
  org_website: https://brainchip.com/
  product_page_link: https://brainchip.com/akida-generations/
  social_media_links:
    linkedin: https://www.linkedin.com/company/brainchip-holdings-limited/
    twitter: https://twitter.com/BrainChip_inc
    wikipedia: https://en.wikipedia.org/wiki/BrainChip
product:
  announced_date: 2023-01-29
  applications: Smart sensing, one-shot learning
  chip_type: Digital
  neurons: Configurable
  weight_bits: null
  activation_bits: null
  on_chip_learning: true
  power: ~30 mW
  release_year: 2023
  release_date: 2023-01-29
  software: MetaTF
  status:
    announced: true
    released: true
    retired: false
  synapses: 8-Mb SRAM
product_name: Akida
summary: BrainChip's Akida is an ultra-low-power neuromorphic processor inspired by
  the brain's neural architecture. It accelerates complex AI at the edge through event-based
  processing, on-chip learning abilities, and support for advanced neural networks
  like CNNs, RNNs & custom Temporal Event-based Nets.
title: Akida - BrainChip
---

## Overview
Inspired by the human brain's neural architecture, Akida aims to deliver high-performance artificial intelligence capabilities at the edge while being extremely energy efficient.

The Akida processor is designed to accelerate neural networks including convolutional neural networks (CNNs), deep neural networks (DNNs), recurrent neural networks (RNNs) and Vision Transformers (ViTs) directly in hardware. A key feature is its support for a novel neural network architecture called Temporal Event-based Neural Nets (TENNs) which are optimized for processing complex time-series data efficiently.

Akida employs an event-based processing approach where computations are only performed when new sensory input is received, dramatically reducing the number of operations. This also enables event-based communication between processor nodes without CPU intervention. The architecture further supports on-chip learning, allowing models to adapt without having to connect to the cloud.

The second generation Akida platform adds capabilities such as support for 8-bit weights/activations, improved vision transformer acceleration, multi-pass sequential processing, and configurable local scratchpads to optimize memory access. It is designed to run larger neural networks across multiple chips while minimizing latency.

### Training

Akida leverages standard machine learning frameworks like TensorFlow and development platforms like Edge Impulse for model training and deployment. BrainChip also provides complementary software tools like [MetaTF](https://doc.brainchipinc.com/index.html#) to optimize models for the Akida hardware. Pre-built Akida-compatible models are also offered through a [model zoo](https://doc.brainchipinc.com/model_zoo_performance.html).

MetaTF is based on TensorFlow, with additional wrappers (CNN2SNN and quantizeml) for converting ANNs into quantised models that can run on the device.

- [quantizeml](https://doc.brainchipinc.com/api_reference/quantizeml_apis.html?highlight=quantize#module-quantizeml): A package for quantising, retratining and calibrating Keras models.
- [CNN2SNN](https://doc.brainchipinc.com/api_reference/cnn2snn_apis.html#module-cnn2snn): A package providing functions for converting quantised ANNs into SNNs.

The training pipeline starts with a regular Keras model using TensorFlow. The Keras model can be trained using a standard backpropagation-based training pipeline, including GPU tensors, optimisers and functions from TensorFlow. Once the Keras model is trained, it can be quantised using [functions](https://doc.brainchipinc.com/api_reference/quantizeml_apis.html?highlight=quantize#quantizeml.models.quantize) provided in the SDK.

The resulting quantised model will have a lower accuracy than the original Keras model (sometimes even substantially lower -- potentially several dozen percent). The first step towards restoring the original accuracy of the model is [weight calibration](https://doc.brainchipinc.com/api_reference/quantizeml_apis.html#quantizeml.models.calibrate). As the quantised model maps regular 32- or 64-bit floating-point synaptic weights to a much narrower range of values, the calibration step adjusts the range of densest numerical representation in the quantised model to best match the distribution of values in the training data. A detailed explanation of this process can be found [here](https://doc.brainchipinc.com/examples/cnn2snn/plot_1_advanced_cnn2snn.html?highlight=fit#weight-quantizer-details). After that, the quantised model can be fine-tuned by retraining it using a similar training pipeline as that for the Keras model. Important points to consider during these steps include:

- AKD1000 and AKD1500 devices support only Akida 1.0 layer types, of which there is only a [limited number](https://doc.brainchipinc.com/user_guide/akida.html#akida-1-0-layers). Akida 2.0 layers are much richer, however, at the time of writing the AKD2000 hardware has not yet been released.

- The mapping of Keras to Akida layers is not one-to-one. For instance, the Akida convolutional layer corresponds to a Conv2D layer optionally followed by BatchNorm, Pooling and ReLU layers, even though those are not specified in the MetaTF documentation as separate layer types. Therefore, the Keras model can include blocks such as Conv2D -> BatchNorm -> MaxPool -> ReLU -> Dropout.

- Many ***combinations*** of layers are not supported at least for Akida 1.0 layers. For instance, a `Conv2D` cannot be followed directly by a `Dense` layer - it is necessary to insert a `Flatten` layer between them.

- It is important to also set the correct number of bits when quantising the input layer to match that of the input data (e.g., 8 bits for 8-bit image input).

- If the network fails to train, check the value of the [`per_tensor_activations`](https://doc.brainchipinc.com/examples/quantization/plot_0_advanced_quantizeml.html?highlight=activation%20per%20tensor#the-quantization-parameters) parameter. It tends to have a strong effect on learning.

- If the intention is to run a model on hardware, it is worth performing all the conversions and running the resulting network on the Akida chip **prior to training** in order to ensure that the model is valid.

When evaluating a model on the chip, it is possible to enable built-in power measurement tracking via functions [provided in the SDK](https://doc.brainchipinc.com/user_guide/akida.html?highlight=power_measurement_enabled#performance-measurement). This needs to be done at the time of mapping the model to the hardware, after which the power consumption statistics can be retrieved after performing inference.

### Applications

Akida targets applications spanning industrial automation, automotive, healthcare, consumer electronics and more. Use cases include predictive maintenance, in-cabin monitoring, vital sign prediction, home automation, surveillance and more. Its efficiency and on-device learning abilities aim to enable a new class of continuously adaptive, secure and private AI implementations at the edge.

## Related publications

| Date | Title | Authors  | Venue/Source |
|------|-------|----------|------------- |
| August 2023 | [Low Power & Low Latency Cloud Cover Detection in Small Satellites Using On-board Neuromorphic Processors](https://ieeexplore.ieee.org/abstract/document/10191569) | Chetan Kadway; Sounak Dey; Arijit Mukherjee; Arpan Pal; Gilles Bézard | IJCNN 2023 |
| August 2023 | [Neuromorphic Medical Image Analysis at the Edge](http://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1779206&dswid=-6143) | Ebba Bratman, Lucas Dow | Master's course project |
| October 2022 | [Detection of facial emotions using neuromorphic computation](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12226/122260E/Detection-of-facial-emotions-using-neuromorphic-computation/10.1117/12.2633707.short) | Teodoro Álvarez-Sánchez, Jesús A. Álvarez-Cedillo, Roberto Herrera-Charles | Applications of Digital Image Processing XLV |
