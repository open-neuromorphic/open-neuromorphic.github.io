---
title: "Hacking Hours: {{ replace .Name "-" " " | title }}" # Hacking Hours Title: Clear & concise (50-60 chars). Include speaker/topic if possible for SEO.
author:
  - "Speaker Name or Slug" # Match with a contributor profile title/slug. Add more authors if needed.
date: {{ .Date }} # Date of the hacking hours (YYYY-MM-DD).
start_time: "18:00" # Event start time (24-hour format HH:MM).
end_time: "19:30"   # Event end time (24-hour format HH:MM).
time_zone: "CET"    # Timezone (e.g., CET, CEST, EST, PST).
description: "Join us for an insightful hacking hours on [Topic] by [Speaker Name]. Discover [Key Takeaway 1] and explore [Key Takeaway 2] in neuromorphic computing."
upcoming: true # Set to 'true' for future events. Change to 'false' after the event.
video: ""      # After the event, add the YouTube video ID (e.g., "dQw4w9WgXcQ").
image: "hacking-hours-banner.png" # Main banner image (1200x630px ideal for sharing). Place in this hacking hours's folder.
speaker_photo: "speaker-photo.jpg" # Speaker's photo. Place in this hacking hours's folder.
type: "hacking-hours" # IMPORTANT: Do not change this line for hacking hours events.
speaker_bio: "A brief biography of the speaker. Highlight their expertise relevant to the hacking hours topic."
# Optional: Add the file name (slug) of any software pages this event is related to.
# e.g., ["spyx", "snntorch"]
software_tags: []
# Optional: Add links to slides, code, or notebooks if available after the hacking hours.
# Place these files in this hacking hours's folder and link them:
# speaker_slides: "slides.pdf"
# speaker_code: "https://github.com/example/repo" # External link
# speaker_notebook: "my-notebook.ipynb" # Place in folder
---

Detailed hacking hours abstract or information goes here.
Explain what attendees will learn, the agenda, and any prerequisites.