---
title: "{{ replace .Name "-" " " | title }}" # Title of the research resource
date: {{ .Date }}
description: "A brief, compelling summary of this research paper and its key findings."
draft: true
type: "research-papers"

# --- Resource Details ---
# The primary link to the resource (e.g., arXiv, journal, GitHub repo)
resource_link: "https://example.com/link-to-resource"
# List of authors. Match with contributor profiles if they exist.
author:
  - "Author One"
  - "Author Two"

# Publication details (optional)
publication_venue: "Journal or Conference Name, Year"
doi: "10.xxxx/journal.xxxx.xxxx"

# --- Community Review Details ---
review_date: "{{ .Date }}"
onr_badge: true # Signifies it has passed the ONR review
---

## Abstract
A concise abstract of the paper. This should provide a clear overview of the research objectives, methods, results, and conclusions.

## Resource Overview
A more detailed overview of the resource. Explain its significance to the neuromorphic community, what problems it solves, and how others can use or build upon it.