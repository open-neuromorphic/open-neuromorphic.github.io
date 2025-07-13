---
title: "Student Talk: {{ replace .Name "-" " " | title }}" # Student Talk Title: Clear & concise (50-60 chars). Include speaker/topic if possible for SEO.
author:
  - "Speaker Name or Slug" # Match with a contributor profile title/slug. Add more authors if needed.
date: {{ .Date }} # Date of the student talk (YYYY-MM-DD).
start_time: "18:00" # Event start time (24-hour format HH:MM).
end_time: "19:30"   # Event end time (24-hour format HH:MM).
time_zone: "CET"    # Timezone (e.g., CET, EST). For best calendar compatibility, use an IANA Time Zone name like "Europe/Berlin" or "America/New_York".
description: "Join us for an insightful student talk on [Topic] by [Speaker Name]. Discover [Key Takeaway 1] and explore [Key Takeaway 2] in neuromorphic computing."
upcoming: true # Set to 'true' for future events. Change to 'false' after the event.
video: ""      # After the event, add the YouTube video ID (e.g., "dQw4w9WgXcQ").
image: "student-talk-banner.png" # Main banner image (1200x630px ideal for sharing). Place in this student talk's folder.
type: "student-talks" # IMPORTANT: Do not change this line for student talk events.
show_author_bios: true # Set to true to display author bios from contributor profiles.
# Optional: Add the file name (slug) of any software pages this event is related to.
# e.g., ["spyx", "snntorch"]
software_tags: []
# Optional: Add links to slides, code, or notebooks if available after the student talk.
# Place these files in this student talk's folder and link them:
# speaker_slides: "slides.pdf"
# speaker_code: "https://github.com/example/repo" # External link
# speaker_notebook: "my-notebook.ipynb" # Place in folder
---
<!-- For best calendar compatibility, use an IANA Time Zone name like 'Europe/Berlin' or 'America/New_York'. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones -->
Detailed student talk abstract or information goes here.
Explain what attendees will learn, the agenda, and any prerequisites.