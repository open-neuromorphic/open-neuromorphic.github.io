import os
from slugify import slugify  # You can use a library like 'python-slugify' for creating slugs

# Define the chip information
software_ml = [
{
    "name": "BindsNET",
    "description": "Built on top of PyTorch, used for simulating SNNs, geared towards ML and reinforcement learning.",
    "website": "https://bindsnet-docs.readthedocs.io/",
    "dependencies": "PyTorch",
    "field of application": "Machine Learning",
    "source code": "https://github.com/bindsnet/bindsnet",
    "license": "AGPL-3.0",
    "supports hardware": False,
    "supports NIR": False,
    "language": "Python",
    "version": "0.3.1",
},
{
    "name": "Nengo",
    "description": "Python package for building, testing, deploying neural networks, supporting many backends for SNN simulation.",
    "website": "https://nengo.ai",
    "dependencies": "",
    "field of application": "Machine Learning, Neuroscience",
    "source code": "https://github.com/nengo/nengo",
    "license": "custom",
    "supports hardware": True,
    "supports NIR": True,
    "language": "Python",
    "version": "4.0.0",
},
{
    "name": "Norse",
    "description": "Exploits bio-inspired neural components, sparse and event-driven, expands PyTorch with primitives for bio-inspired neural components.",
    "website": "https://norse.github.io/norse/",
    "dependencies": "PyTorch",
    "field of application": "Bio-inspired Neural Networks",
    "source code": "https://github.com/norse/norse",
    "license": "LGPL-3.0",
    "supports hardware": False,
    "supports NIR": True,
    "language": "Python",
    "version": "1.0.0",
},
{
    "name": "Rockpool",
    "description": "ML library for SNN applications, supports GPU, TPU, CPU acceleration, and neuromorphic compute hardware deployment.",
    "website": "https://synsense.gitlab.io/rockpool/",
    "dependencies": "PyTorch, Jax",
    "field of application": "Machine Learning",
    "source code": "https://gitlab.com/synsense/rockpool",
    "license": "AGPL-3.0",
    "supports hardware": True,
    "supports NIR": True,
    "language": "Python",
    "version": "2.7",
},
{
    "name": "snnTorch",
    "description": "Focuses on gradient-based training of SNNs, based on PyTorch for GPU acceleration and gradient computation.",
    "website": "https://github.com/jeshraghian/snntorch",
    "dependencies": "PyTorch",
    "field of application": "Machine Learning",
    "source code": "https://github.com/jeshraghian/snntorch",
    "license": "MIT",
    "supports hardware": False,
    "supports NIR": True,
    "language": "Python",
    "version": "0.7.0",
},
{
    "name": "Spyx",
    "description": "Compact SNN package on DeepMind's Haiku library, based on JAX for JIT compilation on GPUs and TPUs.",
    "website": "https://github.com/kmheckel/spyx",
    "dependencies": "JAX, Haiku",
    "field of application": "Machine Learning",
    "source code": "https://github.com/kmheckel/spyx",
    "license": "MIT",
    "supports hardware": False,
    "supports NIR": True,
    "language": "Python",
    "version": "0.1.10",
},
{
    "name": "SpikingJelly",
    "description": "Open-source DL framework for SNN based on PyTorch, with documentation in English and Chinese.",
    "website": "https://github.com/fangwei123456/spikingjelly",
    "dependencies": "PyTorch",
    "field of application": "Machine Learning",
    "source code": "https://github.com/fangwei123456/spikingjelly",
    "license": "unknown",
    "supports hardware": False,
    "supports NIR": False,
    "language": "Python",
    "version": "0.0.0.0.14",
},
{
    "name": "Sinabs",
    "description": "PyTorch-based DL library for SNNs, focusing on simplicity, fast training, extendability, and vision models.",
    "website": "https://sinabs.readthedocs.io",
    "dependencies": "PyTorch",
    "field of application": "Vision Models",
    "source code": "https://github.com/synsense/sinabs",
    "license": "AGPL-3.0",
    "supports hardware": True,
    "supports NIR": True,
    "language": "Python",
    "version": "1.2.10",
},
{
    "name": "Lava",
    "description": "Framework for developing neuro-inspired applications, mapping them to neuromorphic hardware.",
    "website": "https://lava-nc.org/",
    "dependencies": "",
    "field of application": "Neuro-inspired Applications",
    "source code": "https://github.com/lava-nc/lava",
    "license": "custom",
    "supports hardware": True,
    "supports NIR": True,
    "language": "Python",
    "version": "0.9.0",
},
]

software_neuroscience = [
{
    "name": "Brian",
    "description": "Free, open-source simulator for SNNs, written in Python, focusing on ease of use and flexibility.",
    "website": "https://briansimulator.org/",
    "dependencies": "",
    "field of application": "Neuroscience",
    "source code": "https://github.com/brian-team/brian2",
    "license": "custom",
    "supports hardware": False,
    "supports NIR": False,
    "language": "Python",
    "version": "2.5.4",
},
{
    "name": "NEST",
    "description": "Simulator for SNN models focusing on dynamics, size, structure of neural systems, not on individual neuron morphology.",
    "website": "https://www.nest-simulator.org/",
    "dependencies": "",
    "field of application": "Neuroscience",
    "source code": "https://github.com/nest/nest-simulator",
    "license": "GPL-2.0",
    "supports hardware": False,
    "supports NIR": False,
    "language": "Python",
    "version": "3.6",
},
]

# Define the base directory
base_directory = "."

# Create the base directory if it doesn't exist
if not os.path.exists(base_directory):
    os.makedirs(base_directory)

for software in software_ml + software_neuroscience:
    software_name = software["name"]
    # Create a slug from the chip name
    slugified_software_name = slugify(software_name)
    software_directory = os.path.join(base_directory, slugified_software_name)

    # Create the chip directory if it doesn't exist
    if not os.path.exists(software_directory):
        os.makedirs(software_directory)

    # Create the index.md file with front matter
    index_content = f"""---
title: "{software_name}"
description: {software["description"]}
website: {software["website"]}
dependencies: {software["dependencies"]}
field_of_application: {software["field of application"]}
source_code: {software["source code"]}
license: {software["license"]}
supports_hardware: {software["supports hardware"]}
supports_NIR: {software["supports NIR"]}
language: {software["language"]}
version: {software["version"]}
draft: false
---

## Overview
 [Provide a detailed product description]
"""

    # Write the content to the index.md file
    index_file_path = os.path.join(software_directory, "index.md")
    with open(index_file_path, "w", encoding="utf-8") as index_file:
        index_file.write(index_content)

print("Directories and index.md files created successfully.")
