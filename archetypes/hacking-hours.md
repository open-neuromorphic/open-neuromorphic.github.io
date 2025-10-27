---
title: "Hacking Hours: {{ replace .Name "-" " " | title }}" # Title: Clear & concise (50-60 chars). What topic and speaker will attract attendees?
author:
  - "Speaker Name or Slug" # Match with a contributor profile title/slug.
date: {{ .Date }} # Date of the event (YYYY-MM-DD).
start_time: "18:00" # Event start time (24-hour format HH:MM).
end_time: "19:30"   # Event end time (24-hour format HH:MM).
time_zone: "CET"    # Timezone (e.g., CET, CEST, EST, PST).
# Meta Description (SEO) 120-160 characters:
# What are the 2-3 most important skills or insights someone will gain from this session?
# Why should someone invest their time to attend this event?
description: "Join us for a hands-on hacking hours on [Topic] with [Speaker Name]. You will learn how to [Key Takeaway 1] and explore [Key Takeaway 2]."
upcoming: true # Set to 'true' for future events. Change to 'false' after the event.
video: ""      # After the event, add the YouTube video ID (e.g., "dQw4w9WgXcQ").
image: "hacking-hours-banner.png" # Main banner image for social sharing (1200x630px). Place in this folder.
type: "hacking-hours" # IMPORTANT: Do not change this line.
# Optional: Add the file name (slug) of any software pages this event is related to.
# e.g., ["spyx", "snntorch"]
software_tags: []
# Optional: Add links to slides, code, or notebooks if available after the event.
# Place these files in this folder and link them:
# speaker_slides: "slides.pdf"
# speaker_code: "https://github.com/example/repo" # External link
# speaker_notebook: "my-notebook.ipynb" # Place in folder
---

Detailed hacking hours abstract or information goes here.
Explain what attendees will learn, the agenda, and any prerequisites.
