---
title: "Alexandre Marcireau: Faery Release v0.3.0"
author:
  - "Alexandre Marcireau"
  - "Jens E. Pedersen"
date: 2024-11-05
description: "Alexandre Marcireau discusses the v0.3.0 release of Faery, an event processing library, in this Hacking Hour session."
upcoming: false
video: "Wz1s0dFp1II"
image: "alexandre-marcireau-faery-release-v0-3-0.jpg"
type: "hacking-hours"
software_tags: ["faery"]
---

In this Hacking Hour, Jens E. Pedersen is joined by Alexandre Marcireau to explore the v0.3.0 release of Faery. Alexandre walks through the new features, improvements, and potential use cases of this event processing library designed for neuromorphic applications.

The discussion covered API development, build processes, and key features of the Faery v0.3.0 release.

## Key Themes and Ideas

*   **The Arduous Nature of API Design:**
  *   Developing robust and correct APIs is a challenging process requiring significant effort and detailed discussions.
  *   Emphasis on "no no way to cheat this process" and the necessity of "long arduous detailed discussions."
  *   API development is iterative: "it's a matter of experiment" and "you don't [know] until you try."

*   **Interplay of Theory and Practice in Development:**
  *   A core theme is the necessity of both theoretical understanding and practical experimentation.
  *   The practical use case is paramount. Python is cited as an experimental language prioritizing the user, while Lisp is presented as theoretically elegant but harder to use.
  *   The ideal approach involves a "robust theoretical base" critically evaluated by user experience to "realize what works and what doesn't."
  *   This process is likened to the "scientific method," where ideas are tested empirically.

*   **The Scientific Method in API Building:**
  *   The API development process is framed as applying the scientific method: "you try something oh that could work a bit different what if we do this and then at some point we converge."
  *   Recognizing human fallibility and the iterative nature of converging on the best solution.

*   **MP4 Conversion Feature (v0.3.0 Highlight):**
  *   Successful implementation and merging of the MP4 conversion feature is a significant milestone.
  *   Described as "absolutely amazing" and a "tool I've been waiting for for five years."
  *   The complexity of making it work across "all platforms" and "all different versions of python" is acknowledged as a "pretty tremendous effort."
  *   The current state is "infinitely better than what was there before which was zero."

*   **Technical Challenges in the Build Process (Focus on Rust/Maturin/Nix/Dependencies):**
  *   Difficulties building the Rust-based MP4 conversion library in different environments, especially with Nix and Maturin.
  *   Key problematic dependencies: `nasm` (Netwide Assembler) and `libclang`.
  *   Complexity arises from interactions between Maturin, H.264's `configure` script (with its own heuristics for finding `nasm` and compilers), and environment managers like Nix and Python virtual environments.
  *   The `configure` script's reliance on environment variables (like `AS`) and its OS-based path guessing are sources of issues.
  *   Differences between debug and release builds in Rust and their performance impact ("typically 100 times slower").
  *   Use of `build.rs` in Rust for custom build steps, including compiling C code.
  *   Debugging involved investigating Maturin's isolated build environments and how external dependencies are found.
  *   Nix is seen as advantageous for reproducible builds, despite initial setup challenges. Nix flakes are mentioned for future reproducibility.

*   **Color Map Features (Including Color Blindness Simulation):**
  *   Satisfaction with color map features, especially "color blind versions."
  *   Importance of considering color blindness (affecting "like 10%") for accessible data visualizations.
  *   Implementation allows simulating different types of color deficiency to check if color maps are "color blind friendly."
  *   This feature exemplifies functionality achievable through collaborative development.

*   **CLI Design and Reflection:**
  *   Discussion on Command Line Interface (CLI) design using `argparse`.
  *   Using Python's "reflection" or "inspection" (e.g., `inspect` functions) to automatically discover and expose filters and parameters to the CLI is desirable for reducing manual effort and avoiding API duplication.
  *   This automatic discovery is identified as a "really important part" planned for future implementation.

*   **Release Process:**
  *   Review of GitHub release steps: creating a new tag and publishing.
  *   Advantage of managing a single version number (in `pyproject.toml`).
  *   Use of GitHub Actions for automated builds across multiple platforms and Python versions (estimated ~3 hours for current configurations).
  *   Potential pitfalls: forgetting to delete tags on build failures.
  *   Automating version bumping based on Git tags as a future improvement.

*   **The Philosophy of Open Source and Development:**
  *   The beauty and elegance in code and theories, linking to David Deutsch's "The Beginning of Infinity."
  *   Value of collaborative work ("the power of working together").
  *   The philosophy of "if it hurts, do it often" for tackling and simplifying cumbersome processes.
  *   Challenges of onboarding new developers; practice of team members regularly re-installing the project to test onboarding.
  *   Brief mention of immutable OS (like NixOS) for reproducibility.

## Key Facts and Quotes

*   > "there's no no way to cheat this process like to get these apis right to get this code right you just have to go through these long arduous detailed discussions"
*   > "I really think that like everything else it's a matter of experiment you don't until you try"
*   > "it is in that intersection when you scrutinize things it's like when you when you put it out in the open you turn it around you rotate it a bit and you try to push one side and pull the other and see what happens that's where the the rubber hits the road"
*   > "you need a bit of both [theory and practice]... they're very complimentary"
*   > "I think or I hope that we are essentially applying the scientific method when we build the API we're currently building together"
*   Referring to MP4 conversion: > "this has been a tool I've been waiting for for five years"
*   The MP4 feature was made to > "work with the MP4 h265 264 encoding on all platforms" and "on all different versions of python even better."
*   The MP4 code is deemed to be in a > "good state" and "ready to be merge."
*   On technical issues: > "It's impossible to to to not have conflicts with these kind of things this is perfectly F that's why conflicts exists"
*   Regarding CLI filters and reflection: > "you can scan for filters without having to manually add them"
*   Python's `inspect` functions allow retrieval of > "the name of the function yeah the name of the parameters of the function and better yet it also gives you if it has them annotations for those parameters"
*   The color map feature includes > "a color blind version to make sure that if you pick a color map you're aware of the implications for something that does concern like 10% of the population."
*   The color map implementation allows simulating > "what a color blind person would see if you were to send them the original video."
*   Nix package repository is > "over 100,000 packages."
*   > "if it if it hurts do it often" (quoting a previous supervisor regarding cumbersome processes)
*   > "matchin develop for instance which gives you a nice editable local version builds the whole Rust part in debug mode not release this is is typically 100 times slower"
*   Referring to the automated build process: > "this is reproducible forever"
*   The current CI setup on GitHub Actions builds the library approximately > "six times times about 40 builds" and is estimated to take "three hours give a take."

## Action Items/Next Steps

*   Investigate and fix build issues with `nasm` and `libclang` in Nix environments.
*   Explore automating version bumping in `pyproject.toml` based on Git tags.
*   Implement CLI filter discovery using Python reflection.
*   Document the build process, including dependencies and potential environment variable settings.
*   Document the color map features, especially color blindness simulation.
*   Explore optimizing CI build times.
*   Consider contributing fixes to upstream projects like H.264's `configure` script if issues are identified.
