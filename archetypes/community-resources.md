---
title: "{{ replace .Name "-" " " | title }}" # Resource Title, e.g., "Neuromorphic Engineering Blog"
date: {{ .Date }}
# Meta Description for SEO (120-160 characters):
# Briefly describe the resource and its value to the neuromorphic community.
description: "A description of this valuable community resource."
image: "resource-logo.png" # Main logo or banner for the resource (place in this folder)
draft: true
type: "community-resources" # Do not change
video: "" # Optional: YouTube video ID for an introductory video.

# --- Resource Details ---
# The primary type of the resource. E.g., "YouTube Channel", "Blog", "Podcast", "Community Website"
resource_type: "Website" 
# The main URL to access the resource
website: "https://example.com"
# Optional: List of authors/creators. Match with contributor profiles if they exist.
author:
  - "Creator Name"
# Set to true if this resource is part of our foundational supporter network.
is_supporter: false

# --- Resource Log ---
# Add entries here to log updates, new content, or milestones related to the resource.
# Newest entries should be at the top.
resource_log:
  - date: "YYYY-MM-DD"
    title: "First Log Entry"
    description: "Briefly describe the update, e.g., 'Launched a new video series on SNNs'."
    # Optional link to the specific update/content
    # link: "https://example.com/update" 
---

Provide a more detailed overview of the resource here. This content will appear on its dedicated page.
Explain what the community can find here, who it's for, and why it's a valuable resource.
Use code with caution.