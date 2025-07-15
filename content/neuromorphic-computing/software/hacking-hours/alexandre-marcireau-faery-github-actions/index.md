---
title: "Alexandre Marcireau: GitHub Actions for the Event Processing Library Faery"
author:
  - "Alexandre Marcireau"
  - "Jens E. Pedersen"
date: 2024-09-30
description: "Learn about using GitHub Actions for CI/CD with the Faery event processing library, presented by Alexandre Marcireau."
upcoming: false
video: "BGclcb7u4PQ"
speaker_photo: "images/speakers/alexandre-marcireau-placeholder.png" # Can reuse
image: "alexandre-marcireau-faery-github-actions.jpg"
type: "hacking-hours"
speaker_bio: "Alexandre Marcireau is a software developer and contributor in the neuromorphic computing space, known for his work on the Faery event processing library and its development workflows."
---

In this Hacking Hour session, Alexandre Marcireau joins host Jens E. Pedersen to discuss the implementation and benefits of using GitHub Actions for the Faery event processing library. The focus is on continuous integration (CI), testing, and deployment (CD) workflows to maintain and improve the Faery codebase.

## Key Themes and Ideas

*   **Addressing Challenges of Non-Pure Python Libraries:**
  *   Faery includes high-performance components written in Rust.
  *   This makes installation difficult for users as it typically requires a compiler.
      > "pretty much any library that is playing with low level stuff needs to not be pure Python... what that's great for performance that's awful for ease of use because means that now in order to install your python Library you simply need a compiler"

*   **Leveraging GitHub Actions for CI and Releases:**
  *   GitHub Actions enable pre-compilation of the library on various platforms (Windows, macOS, Linux, Intel, ARM).
  *   This simplifies installation for users by providing pre-compiled binaries (wheels).
      > "but since GitHub has actions it can do that for us which we like which really really like better yet because it can give us access to different machines... means that we can precompile versions for all those platforms without have without needing access to those machines ourselves"
  *   The goal is "continuous integration to release to PyPI."

*   **Automating Build and Release Process:**
  *   The workflow will run on every `push` and `pull_request` to detect breaking changes early.
      > "the IDE is to do it on so do the build every time you make a change... that way if you if you make a breaking change that breaks it on a machine that you cannot easily test for you know earlier rather than later"
  *   Releases to PyPI are triggered by creating a new release on GitHub.
      > "this runs always but it will only do the piie stuff if you're creating a new release so that way you have sort of a onetoone match between your GitHub releases and your piie versions"

*   **Utilizing `cibuildwheel` for Cross-Platform Builds:**
  *   `cibuildwheel` automates the creation of pre-compiled binary "wheels" for various OS and architectures.
      > "we're using CI build Wheels which is an amazing am in library that does all the heavy lifting for us basically takes a python library and then just creates a matrix of all the machines and configurations you might want and creates wheels for them"
  *   Wheels (`.whl` files) allow direct installation without user-side compilation.
  *   Configuration targets macOS, Linux, Windows, x86_64, and ARM64.
  *   Raspberry Pi (ARM on Linux) support is planned but limited by current GitHub Actions availability.

*   **Workflow Steps:**
  1.  **Build Wheels:** Compile for different platforms and Python versions using `cibuildwheel`.
  2.  **Import Library:** A minimal test to ensure the compiled library can be imported.
      > "the second one is called import library and that is the most minimal test that you can possibly do with python Library we just make sure that it doesn't crash on import which sadly open happens quite often"
  3.  **Run Tests:** Execute the library's test suite (Pytest suggested).
      > "py test tests M and then we'll itely go through and find all the python tests in there"
  4.  **Build Sdist (Source Distribution):** Create a `.tar.gz` source distribution.
  5.  **Upload to PyPI:** Upload wheels and sdist to the Python Package Index.

*   **Dependency Management and Local Builds:**
  *   Ensuring tests run against the locally built Faery version, not an older PyPI version.
  *   Using `pip install --no-deps --find-links wheelhouse --no-index ferry` to install the local wheel.
      > "on line 52 we want to make sure that we're installing not the existing version of ferry that is already online we want to install local version that we just created right which is not on pipie yet"

*   **Handling Sub-Modules and Rust Dependencies:**
  *   Faery depends on the `rust-numpy` Rust sub-module.
  *   The `submodules: true` option in the `actions/checkout` step is required to fetch sub-module code.
      > "so doesn't that just mean that we have checked out the repository we haven't checked out the sub modules... so what you can do is you can say with set my's true"
  *   A potential issue with including the Rust sub-module correctly in the source distribution (sdist) is acknowledged and deferred.

*   **Security and Supply Chain Attacks:**
  *   Uploading to PyPI requires a secret API token stored in GitHub Secrets (`secrets.PIPY_API_TOKEN`).
      > "is this pipie API token yeah and that's something that I will add to the repository... to let that repository talk to piie so essentially an environment variable right which is like the the authentication token..."
  *   The token helps verify package origin, addressing supply chain attack concerns.
  *   The broader issue of supply chain attacks in open source and the difficulty of strict versioning in package managers like `pip` are discussed.
      > "has to do with so-called supply chain attacks which is perhaps the biggest downside of Open Source and one of the biggest dangers..."
  *   Minimizing transitive dependencies (like NumPy) is good practice.

*   **Iterative Development and Testing:**
  *   Setting up GitHub Actions is an iterative process.
  *   Working on a separate branch allows for testing before merging.
  *   The GitHub Actions UI provides detailed logs for debugging.
      > "the only way to really test it is to actually push comets that's a problem with actions"
      > "the GitHub um page here is is just really really nice... you can see exactly what is what is what is going wrong and what's going right"

*   **Rust Ecosystem Advantages:**
  *   The Rust ecosystem is more modern and has learned from past mistakes compared to C/C++.
      > "one nice thing is that you start from a clean slate right... but really what makes it much nicer than cc++ is the ecosystem... because it's 20 years younger"

## Progress and Next Steps

*   A GitHub Actions workflow file has been created and committed to a development branch.
*   Initial issue with Rust sub-module checkout resolved by adding `submodules: true`.
*   Wheel building and library import tests were successful after the fix.
*   The PyPI API token needs to be added to repository secrets for the upload step.
*   Further testing and refinement of the workflow are needed.
*   The sdist/Rust sub-module issue is noted for future resolution.
*   Integration of `pytest` for comprehensive testing is planned.

## Outstanding Issues

*   Ensuring the Rust sub-module is correctly included in the source distribution (sdist).
*   Adding the PyPI API token to GitHub secrets.
*   Fully integrating and verifying `pytest` execution.
*   Potential future expansion to more platforms/architectures.
