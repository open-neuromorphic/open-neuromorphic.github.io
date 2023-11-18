import os

# Define the chip information
chips = [
    {
        "name": "ROLLS",
        "company_lab": "ROLLS",
        "chip_type": "Mixed-signal",
        "neurons_synapses": "256/64 K",
        "on_chip_learning": "Yes",
        "power": "~5 mW",
        "software": "Custom Python",
        "applications": "Research"
    },
    {
        "name": "DYNAP-SE",
        "company_lab": "DYNAP-SE",
        "chip_type": "Mixed-signal",
        "neurons_synapses": "4 K/4 M",
        "on_chip_learning": "No",
        "power": "~5 mW",
        "software": "Custom Python",
        "applications": "Research"
    },
    {
        "name": "NeuroGrid (BrainDrop)",
        "company_lab": "Stanford",
        "chip_type": "Mixed-signal",
        "neurons_synapses": "1 M/billions",
        "on_chip_learning": "No",
        "power": "~3 W",
        "software": "NEF",
        "applications": "Real-time SNN emulation"
    },
    {
        "name": "Innatera",
        "company_lab": "Innatera",
        "chip_type": "Mixed-signal",
        "neurons_synapses": "256/64 K",
        "on_chip_learning": "No",
        "power": "~1 mW",
        "software": "PyTorch",
        "applications": "Smart sensing"
    },
    {
        "name": "BrainScaleS 1",
        "company_lab": "Universität Heidelberg",
        "chip_type": "Mixed-signal",
        "neurons_synapses": "~180,000/40 M (in 352 chips)",
        "on_chip_learning": "No",
        "power": "~300 W",
        "software": "BrainScaleS OS",
        "applications": "Accelerated SNN emulation; HPC"
    },
    {
        "name": "BrainScaleS 2",
        "company_lab": "Universität Heidelberg",
        "chip_type": "Mixed-signal",
        "neurons_synapses": "512/~130,000",
        "on_chip_learning": "Yes",
        "power": "~1 W",
        "software": "BrainScaleS OS",
        "applications": "Edge processing, robotics"
    },
    {
        "name": "TrueNorth",
        "company_lab": "IBM",
        "chip_type": "Digital",
        "neurons_synapses": "1 M/256 M (in 4 K cores)",
        "on_chip_learning": "No",
        "power": "~0.3 W",
        "software": "Custom",
        "applications": "DNN acceleration"
    },
    {
        "name": "SpiNNakerr",
        "company_lab": "University of Manchester",
        "chip_type": "Digital",
        "neurons_synapses": "1B/10 kilobytes (in 64 K x 18 ARM cores)",
        "on_chip_learning": "Yes",
        "power": "~kW",
        "software": "PyNN, NEST",
        "applications": "Real-time simulation of SNN; HPC"
    },
    {
        "name": "Loihi",
        "company_lab": "Intel Labs",
        "chip_type": "Digital",
        "neurons_synapses": "~128,000/128 M per chip (scalable)",
        "on_chip_learning": "Yes",
        "power": "~1 W",
        "software": "Lava Research chip",
        "applications": ""
    },
    {
        "name": "Dynap-CNN",
        "company_lab": "SynSense",
        "chip_type": "Digital",
        "neurons_synapses": "~327,000/278,000",
        "on_chip_learning": "No",
        "power": "~5 mW",
        "software": "Rockpool, PyTorch",
        "applications": "Smart sensing"
    },
    {
        "name": "BrainChip",
        "company_lab": "BrainChip",
        "chip_type": "Digital",
        "neurons_synapses": "Configurable, 8-Mb SRAM",
        "on_chip_learning": "Yes",
        "power": "~30 mW",
        "software": "TensorFlow, CNN → SNN",
        "applications": "Smart sensing, one-shot learning"
    },
    {
        "name": "Tianjic",
        "company_lab": "Tsinghua University",
        "chip_type": "Digital",
        "neurons_synapses": "40,000/10 M (on 156 cores)",
        "on_chip_learning": "No",
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

# Loop through each chip and create a directory with index.md
for chip in chips:
    chip_name = chip["name"]
    chip_directory = os.path.join(base_directory, chip_name)

    # Create the chip directory if it doesn't exist
    if not os.path.exists(chip_directory):
        os.makedirs(chip_directory)

    # Create the index.md file with front matter
    index_content = f"""---
title: "{chip_name}"
description: "a fun chip"
chiptype: {chip["chip_type"]}
neuronsSynapses: {chip["neurons_synapses"]}
onChipLearning: {chip["on_chip_learning"]}
power: {chip["power"]}
software: {chip["software"]}
applications: {chip["applications"]}
image:
organization:
  org_name:
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

# {chip_name}
"""

    # Write the content to the index.md file
    index_file_path = os.path.join(chip_directory, "index.md")
    with open(index_file_path, "w", encoding="utf-8") as index_file:
        index_file.write(index_content)

print("Directories and index.md files created successfully.")
