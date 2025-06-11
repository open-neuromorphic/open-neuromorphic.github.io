---
title: "Alexandre Marcireau and Petruț Bogdan: Faery API Discussion"
author:
  - "Alexandre Marcireau"
  - "Petruț Bogdan"
  - "Jens E. Pedersen"
date: 2024-10-22
start_time: "18:00"
end_time: "19:49" # 1h 48m 37s duration
time_zone: "CET"
description: "An in-depth discussion on the Faery API with Alexandre Marcireau, Petruț Bogdan, and host Jens E. Pedersen."
upcoming: false
video: "GVJb6oFJhpA"
speaker_photo: "images/speakers/multi-speaker-placeholder.png" # Placeholder for multiple speakers
image: "faery-api-discussion-marcireau-bogdan.jpg"
type: "hacking-hours"
speaker_bio: "Alexandre Marcireau and Petruț Bogdan are developers and contributors in the neuromorphic software community, with a focus on event-based data processing tools like Faery."
---

Jens E. Pedersen hosts a Hacking Hour with Alexandre Marcireau and Petruț Bogdan. This session is dedicated to a comprehensive discussion about the Faery API, covering its design philosophy, current capabilities, and future directions for this event processing library.

The discussion focused on the design and scope of the Faery Command Line Interface (CLI) and its Python API, user stories, and potential implementation strategies.

## Main Themes and Key Ideas

*   **CLI vs. Python API Scope:**
  *   **Diverging Ideas:** Discussion on whether the CLI should have complete feature parity with the Python API, especially for complex pipelines.
  *   **GStreamer API as Inspiration:** GStreamer's API for constructing complex pipelines was highlighted as a potential model for the Faery CLI.
  *   **Python for Complexity:** Generally agreed that "very complex pipelines" are easier to manage in Python.
  *   **CLI for Simplicity and Scriptability:** The CLI is a natural solution for users preferring the command line for "simple operations" or for building upon with tools like Bash scripting (e.g., converting all files in a directory).
  *   **Installation Considerations:** Ease of CLI installation and use without virtual environments (via tools like `pipx`) is a strong argument for simple user tasks.
  *   **Balancing Simplicity and Flexibility:** The challenge is creating a CLI that is easy for simple tasks yet capable of handling intricate workflows, possibly by piping output (Unix philosophy).

*   **User Stories and Prioritization:**
  *   **Simple/Pure Command Line User (File-Based):** Focus on simple file conversions or rendering (e.g., `.aedat` to `.dat`, events to video), akin to `ffmpeg` or `imagemagick`. The goal is a simple `fairy input output` command.
      > "what would a user be trying to achieve where the command line would be a natural solution... one even file is an adad and I want to turn that into something compatible with the prophecy software say do profile for instance"
      > "for those users one case exactly yeah we want to make sure that can be installed without virtual environments"
  *   **Streaming User (Real-Time):** Users needing to stream data (e.g., from a camera to UDP), analogous to GStreamer. Often on headless systems like a Raspberry Pi.
      > "what about what about like streaming like opening a camera and sending outputs over UDP yes so to me that's a also a valid use of the command line but I would say slightly different kind of user"
  *   **Expert/Complex Pipeline User (Custom Filtering):** Users performing real-time processing with custom filters (e.g., event denoising, cropping). A CLI solution is attractive for integration with other command-line tools.
      > "you do even have the expert user who might want to to also work with like their own filters or or or processes or something like this right"
      > "for user like that they would want potentially also use the command line to easily pipe together those very uniy tools but they would want to perform some actions in this case the noising before they push it to the next thing"
  *   **Exploratory Data Analysis User (Short Recordings):** Users working with many short event recordings, needing quick visualization (rendering to video) and refinement (slow motion). This iterative workflow might use configuration files or scripts.
      > "record short event recordings 10 to 30 seconds and quite a lot of them... you quickly want to get a sense of what's in them render them and more often than not then you want to slow down very particular parts of those recordings"
      > "you have hours of recordings and you need to quickly find the good parts and assemble that"
      > "it's also way to throw all the information at the user and the human brain is just fantastic at looking quickly through that and seeing patterns"
  *   **Diagnostics/Exploratory Statistics User:** Users wanting to generate various diagnostic plots (event rate curves, wiggle plots, color time plots, spectrograms) to understand event data.
      > "gives you the even rate curve... wiggle plots... color time plots... spectrograms"
      > "all those things are not meant to be algorithms in of themselves but it's just to emphasize that event recordings are different and that sometimes an operator that you would not think of being a good computer vision tool turns out to be very useful"

*   **CLI API Design Considerations:**
  *   **IO-Centric (Simple):** Basic `fairy input output`. Seen as potentially too limited.
      > "fairy input output and it just does the conversion and that's it and I'm done"
  *   **Task-Centric:** Specific keywords for tasks (e.g., `fairy render`, `fairy convert`). Could simplify common complex tasks but might lead to many commands.
      > "where you might want to have a file and then output that in multiple different forms so more complex tasks like this right"
      > "tasks like converting or rendering where to me those are likely to be so often useful that it'd be nice to have a short hand for them"
  *   **GStreamer-like (Piping/Modular):** Using a character (e.g., `!`) to chain filters in the command line.
      > "instead of the keyword filter exclamation mark"
  *   **Object Notation (Python-like):** CLI structure resembling Python code (e.g., `fairy open camera.filter().output()`). Familiar but potentially hard to parse and conflict with shell characters.
      > "you can imagine something like you go fairy whatever open camera dot filter you know and then you do all these things right"
  *   **IO-Centric 2 (Piping with Optional Input):** Input is optional (defaults to stdin), facilitating piping. Combines simple I/O with GStreamer-like piping using a delimiter.
      > "let's call it entric this or entric 2 which is very similar except that input becomes optional so it's a like an F FEG minus I so you can actually omit it and if you do by default input is standard input"
  *   **Subcommands:** Distinct subcommands for different functionalities (e.g., `fairy pipeline`, `fairy colormaps`). Improves clarity and error messages, seen in GStreamer and Azure CLI.
      > "I feel like we should either have multiple commands... or if we want to encourage discovery of those different ways of using the library we bur all everything into one namespace Ferry but fer is always followed by an extra keyword"
  *   **Configuration Files:** Defining complex configurations in separate files (e.g., `.cfg`) loadable by the CLI. Flexible but adds another configuration language.
      > "having a reusable file somewhere is probably also somewhat reasonable a CFG file that says this is how I want these particular parameters to be set up"

*   **Implementation Challenges:**
  *   **Parsing Command Line Arguments:** `argparse` (standard library) is preferred but struggles with recursive parsing and maintaining context for flags in a pipeline. Custom parsers offer flexibility but are harder to maintain and generate good error messages.
      > "the biggest challenge though... is that brackets and so on are not universally but often recognized as special characters by bash or zsh and so on"
      > "the problem is you can't in that you can't have Sub sub commands because this is essentially a sub command and this would be a sub command to the sub command in terms of file"
  *   **Automatic Filter Discovery and Parsing:** The goal is to dynamically make Python API filters available and parsable from the CLI based on their annotations.
      > "there's no extra work needed to add more filters to the command line if you add them to the python API they are automatically readed by that chunk of code and dynamically injected"
  *   **Generating Helpful Error Messages:** A key challenge with custom parsing.

*   **Relationship with Python API Structure:**
  *   **Explicit Pipeline Steps:** The Python API aims to show individual processing steps for pedagogical reasons and flexibility.
      > "showing them is interesting because you there are interesting things you can do in between those different layers"
  *   **Stream Consumption Convention:** Python API functions starting with `__` currently denote stream consumption (e.g., writing to a file).
  *   **Type Information in Function Names:** The Python API can use type information in function names (e.g., `to_frames`), a benefit over generic `apply` functions.

## Decisions and Next Steps

*   **Prioritize User Stories:** Focus on the most common and impactful user stories first.
*   **Start with a Simple CLI Interface:** Initial implementation should prioritize simplicity. The "IO-Centric 2" approach (piping with optional input and a filter delimiter like `!`) with default behavior is preferred.
    > "I prefer to start with the iio Centric 2 approach like just to see if we can add this render filter"
    > "very keen to try theocentric to like sort of the absolute default where there's no extra keyword"
*   **Implement a "Render" Filter:** Add a specific filter for rendering events to video, potentially as a "super filter."
*   **Iterate and Learn:** The development process will be iterative, evolving based on experience and feedback.
    > "see where where we can go... maybe also get a feel for what we would like to do you know what I mean like so as we work with it more we probably understand yeah what what it should look like"
*   **Consider Subcommands Later:** Add subcommands (e.g., for displaying color maps, generating template scripts) as needed.
    > "if you want color apps then you do something like this... we could then simplify that with additional commands"
*   **Explore Parsing Options:** Revisit `argparse` and evaluate other parsing libraries or custom solutions.
*   **Work on Core Features:** Continue developing core features like MP4 output and GPU frame generation.

## Open Questions and Areas for Future Discussion

*   Should "render" functionality be CLI-only or also a high-level Python API function?
*   Best strategy for parsing complex CLI pipelines and nested options?
*   Role of configuration files in the CLI?
*   How to ensure clear and helpful error messages?
*   Optimal delimiter character for CLI filter chaining?
*   Balancing simplicity and verbosity in CLI syntax?

## Action Items

*   Petruț to start implementing the CLI based on the "IO-Centric 2" approach.
*   Alexandre to continue working on Faery's video generation.
*   Investigate `argparse` capabilities for the desired CLI structure.
*   Keep user stories in mind during implementation.
