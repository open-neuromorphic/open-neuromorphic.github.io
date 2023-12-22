import os
from slugify import slugify  # You can use a library like 'python-slugify' for creating slugs

# Define the chip information
chips = [
    {
        "name": "ROLLS",
        "description": "Short 170 character description",
        "organization": "INI",
        "organization_lab": "Indiveri's group",
        "chip_type": "Mixed-signal",
        "neurons": 256,
        "synapses": 64000,
        "on_chip_learning": True,
        "power": "~5 mW",
        "software": "Custom Python",
        "applications": "Research"
    },
    {
        "name": "DYNAP-SE",
        "description": "Short 170 character description",
        "organization": "INI",
        "organization_lab": "Indiveri's group",
        "chip_type": "Mixed-signal",
        "neurons": 4000,
        "synapses": 4000000,
        "on_chip_learning": False,
        "power": "~5 mW",
        "software": "Custom Python",
        "applications": "Research"
    },
    {
        "name": "NeuroGrid (BrainDrop)",
        "description": "Short 170 character description",
        "organization": "Stanford",
        "chip_type": "Mixed-signal",
        "neurons": 1000000,
        "synapses": "billions",
        "on_chip_learning": False,
        "power": "~3 W",
        "software": "NEF",
        "applications": "Real-time SNN emulation",
        "active_product": False
    },
    {
        "name": "Innatera",
        "description": "Short 170 character description",
        "organization": "Innatera",
        "chip_type": "Mixed-signal",
        "neurons": 256,
        "synapses": 64000,
        "on_chip_learning": False,
        "power": "~1 mW",
        "software": "PyTorch",
        "applications": "Smart sensing",
        "active_product": False
    },
    {
        "name": "BrainScaleS 1",
        "description": "BrainScaleS is a super-computer based on analog components that is used mostly for neuroscience applications",
        "organization": "Universität Heidelberg",
        "chip_type": "Mixed-signal",
        "neurons": 180000,
        "synapses": 40000000,
        "on_chip_learning": False,
        "power": "~300 W",
        "software": "BrainScaleS OS",
        "applications": "Accelerated SNN emulation; HPC"
    },
    {
        "name": "BrainScaleS 2",
        "description": "BrainScaleS is a super-computer based on analog components that is used mostly for neuroscience applications",
        "organization": "Universität Heidelberg",
        "chip_type": "Mixed-signal",
        "neurons": 512,
        "synapses": 130000,
        "on_chip_learning": True,
        "power": "~1 W",
        "software": "BrainScaleS OS",
        "applications": "Edge processing, robotics"
    },
    {
        "name": "TrueNorth",
        "description": "Short 170 character description",
        "organization": "IBM",
        "chip_type": "Digital",
        "neurons": 1000000,
        "synapses": 256000000,
        "on_chip_learning": False,
        "power": "~0.3 W",
        "software": "Custom",
        "applications": "DNN acceleration",
        "active_product": False
    },
    {
        "name": "SpiNNakerr",
        "description": "based on digital circuits (a cluster of ARM cores)",
        "organization": "University of Manchester",
        "chip_type": "Digital",
        "neurons": 1000000000,
        "synapses": 10000,
        "on_chip_learning": True,
        "power": "~kW",
        "software": "PyNN, NEST",
        "applications": "Real-time simulation of SNN; HPC"
    },
    {
        "name": "Loihi",
        "description": "Short 170 character description",
        "organization": "Intel",
        "organization_lab": "Intel Labs",
        "chip_type": "Digital",
        "neurons": 128000,
        "synapses": 128000000,
        "on_chip_learning": True,
        "power": "~1 W",
        "software": "Lava Research chip",
        "applications": ""
    },
    {
        "name": "Dynap-CNN",
        "description": "Short 170 character description",
        "organization": "SynSense",
        "chip_type": "Digital",
        "neurons": 327000,
        "synapses": 278000,
        "on_chip_learning": False,
        "power": "~5 mW",
        "software": "Rockpool, PyTorch",
        "applications": "Smart sensing"
    },
    {
        "name": "BrainChip",
        "description": "Short 170 character description",
        "organization": "BrainChip",
        "chip_type": "Digital",
        "neurons": "Configurable",
        "synapses": "8-Mb SRAM",
        "on_chip_learning": True,
        "power": "~30 mW",
        "software": "TensorFlow, CNN → SNN",
        "applications": "Smart sensing, one-shot learning",
        "active_product": False
    },
    {
        "name": "Tianjic",
        "description": "Short 170 character description",
        "organization": "Tsinghua University",
        "chip_type": "Digital",
        "neurons": 40000,
        "synapses": 10000000,
        "on_chip_learning": False,
        "power": "~1 W",
        "software": "Custom",
        "applications": "ANN/SNN acceleration"
    }
]

# Define the base directory
base_directory = "."

# Create the base directory if it doesn't exist
if not os.path.exists(base_directory):
    os.makedirs(base_directory)

for chip in chips:
    chip_name = chip["name"]
    # Create a slug from the chip name
    slugified_chip_name = slugify(chip_name)
    chip_directory = os.path.join(base_directory, slugified_chip_name)

    # Create the chip directory if it doesn't exist
    if not os.path.exists(chip_directory):
        os.makedirs(chip_directory)

    # Create the index.md file with front matter
    index_content = f"""---
title: "{chip_name}"
summary: {chip["description"]}
active_product: {chi["active_product"]}
product:
  chip_type: {chip["chip_type"]}
  neurons: {chip["neurons"]}
  synapses: {chip["synapses"]}
  on_chip_learning: {chip["on_chip_learning"]}
  power: {chip["power"]}
  software: {chip["software"]}
  applications: {chip["applications"]}
  status:
    announced: true
    released: true
    retired: true
  announced_date:
  release_date:
image:
organization:
  org_name: {chip["organization"]}
  org_logo:
  org_website:
  group_name:
  social_media_links:
    linkedin:
    twitter:
    wikipedia:
  product_page_link:
draft: false
---

## Product Description
 [Provide a detailed product description]
## Story of Architecture
 [Explain the architecture or share the design story]
"""

    # Write the content to the index.md file
    index_file_path = os.path.join(chip_directory, "index.md")
    with open(index_file_path, "w", encoding="utf-8") as index_file:
        index_file.write(index_content)

print("Directories and index.md files created successfully.")
