---
title: "Hardware Name - Manufacturer" # Hardware Title: Clear, include manufacturer (50-60 chars for SEO). E.g., "Loihi 2 - Intel"
# Meta Description (SEO): 120-160 characters.
# This appears in search results. Briefly describe the hardware, its key features, purpose, and target applications.
# What makes it unique or important?
description: "Explore [Hardware Name] by [Manufacturer], a neuromorphic chip designed for [key application like 'real-time AI processing' or 'low-power edge computing'] featuring [unique characteristic like 'on-chip learning']."
image: "hardware-image.png" # Main image for the hardware (e.g., chip photo). Place in this hardware's folder. Used for card and OG image.
draft: true # Set to false when ready to publish
active_product: true # Set to false if the product is End-of-Life or retired
type: "neuromorphic-hardware" # Do not change

organization:
  group_name: "Optional Research Group Name" # e.g., Brains in Silicon
  org_logo: "manufacturer-logo.png" # Manufacturer/Org logo. Place in this folder or reference from static/images/
  org_name: "Manufacturer/Organization Name" # e.g., Intel, Stanford
  org_website: "https://manufacturer.com"
  product_page_link: "https://manufacturer.com/product-page" # Direct link to official product page if available
  social_media_links:
    linkedin: "https://linkedin.com/company/manufacturer"
    twitter: "https://twitter.com/manufacturer_handle"
    wikipedia: "https://en.wikipedia.org/wiki/HardwareName"

product:
  announced_date: "YYYY-MM-DD" # Or just YYYY if day/month unknown
  applications: "Primary applications (e.g., Research, Edge AI, Robotics, Smart Sensing)"
  chip_type: "Digital / Mixed-signal / Analog"
  neurons: "Number or Approx. (e.g., 1 million, 128k, ~500)"
  synapses: "Number or Approx. (e.g., 120 million max, 256 million, ~60000)"
  weight_bits: "e.g., 8-bit, 1-4 bit configurable, <= 32-bit"
  activation_bits: "e.g., 1-bit (spikes), 16-bit (neuron state), analog"
  on_chip_learning: true # or false
  power: "~X mW / W (typical or range)"
  release_year: YYYY # Year of first public release/availability
  release_date: "YYYY-MM-DD" # Specific date if known, otherwise same as announced_date or release_year
  software: "Primary SDK/Software (e.g., Lava, Sinabs, Rockpool, Custom)"
  status: # Status of the product
    announced: true # True if announced but not yet generally available/shipped
    released: true  # True if publicly available/shipped to customers/researchers
    retired: false  # True if no longer manufactured/supported or superseded by a new version
  # Add other relevant product-specific parameters from existing hardware pages if needed (e.g., memory, package, interfaces)
summary: "A slightly more detailed summary than the meta description (2-3 sentences). This appears on the hardware list page and potentially as intro text."
---

## Overview
Provide a general overview of the hardware. What are its main goals and innovations?

## Architecture
Describe the chip architecture, including number of cores, neuron types, synapse implementation, connectivity, etc.

## Neurons and Synapses
Detail the neuron models supported and synapse characteristics (e.g., plasticity rules, precision).

## Software and Tools
What software development kits (SDKs), frameworks, or tools are used to program or interface with this hardware?

## Applications
Discuss target applications or areas where this hardware has been used or is intended to be used.

## Related Publications
List key publications related to this hardware.
You can use a simple list:
- [Paper Title 1](Link_to_Paper_1), Authors, Venue, Year.
- [Paper Title 2](Link_to_Paper_2), Authors, Venue, Year.
Or refer to the table format used in existing pages if preferred.