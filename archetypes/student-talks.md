---
title: "Workshop: {{ replace .Name "-" " " | title }}" # Workshop Title: Clear & concise (50-60 chars). Include speaker/topic if possible for SEO.
author:
  - "Speaker Name or Slug" # Match with a contributor profile title/slug. Add more authors if needed.
date: {{ .Date }} # Date of the workshop (YYYY-MM-DD).
start_time: "18:00" # Event start time (24-hour format HH:MM).
end_time: "19:30"   # Event end time (24-hour format HH:MM).
time_zone: "CET"    # Timezone (e.g., CET, CEST, EST, PST).
# Meta Description (SEO): 120-160 characters.
# This is crucial for search results! It's your "ad copy."
# - Briefly state what the workshop is about.
# - Mention key topics or speakers.
# - Highlight the value/benefit for attendees.
# - Include relevant keywords naturally.
description: "Join us for an insightful workshop on [Topic] by [Speaker Name]. Discover [Key Takeaway 1] and explore [Key Takeaway 2] in neuromorphic computing."
upcoming: true # Set to 'true' for future events. Change to 'false' after the event.
video: ""      # After the event, add the YouTube video ID (e.g., "dQw4w9WgXcQ").
image: "workshop-banner.png" # Main banner image (1200x630px ideal for sharing). Place in this workshop's folder.
speaker_photo: "speaker-photo.jpg" # Speaker's photo. Place in this workshop's folder.
type: "student-talks" # IMPORTANT: Do not change this line for student talk events.
# For Hacking Hours, set type: "hacking-hours"
speaker_bio: "A brief biography of the speaker. Highlight their expertise relevant to the workshop topic."
# Optional: Add links to slides, code, or notebooks if available after the workshop.
# Place these files in this workshop's folder and link them:
# speaker_slides: "slides.pdf"
# speaker_code: "https://github.com/example/repo" # External link
# speaker_notebook: "my-notebook.ipynb" # Place in folder
---

Detailed workshop abstract or information goes here.
Explain what attendees will learn, the agenda, and any prerequisites.