# Contributing to Open Neuromorphic

First off, thank you for considering contributing to the Open Neuromorphic (ONM) website! We're thrilled you're here and appreciate you taking the time to help us grow. This is a community-driven project, and every contribution, no matter how small, is valuable.

This document provides guidelines for contributing to the ONM website. Please read it carefully to ensure a smooth and effective collaboration process.

Before you start, please read our [Code of Conduct](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/CODE_OF_CONDUCT.md). We expect all contributors to adhere to it in all interactions with the project.

## Table of Contents
- [Ways to Contribute](#ways-to-contribute)
- [Finding a Task: The Mission Board](#finding-a-task-the-mission-board)
- [Getting Started: Local Development Setup](#getting-started-local-development-setup)
- [How to Submit Changes](#how-to-submit-changes)
  - [Reporting Bugs and Suggesting Enhancements](#reporting-bugs-and-suggesting-enhancements)
  - [Submitting a Pull Request](#submitting-a-pull-request)
- [Content Contribution Guide](#content-contribution-guide)
  - [Content Creation Cheat Sheet](#content-creation-cheat-sheet)
  - [General Guidelines](#general-guidelines)
  - [Adding Blog Posts](#adding-blog-posts)
  - [Adding Events](#adding-events)
  - [Adding Hardware or Software Pages](#adding-hardware-or-software-pages)
  - [Adding Contributor Profiles](#adding-contributor-profiles)
- [Image Guidelines](#image-guidelines)
- [Style and Coding Guidelines](#style-and-coding-guidelines)
  - [Commit Messages](#commit-messages)

## Ways to Contribute

There are many ways to contribute to the ONM website:

*   **Reporting Bugs:** If you find a bug on the site, please report it in our [GitHub Issues](https://github.com/open-neuromorphic/open-neuromorphic.github.io/issues).
*   **Suggesting Enhancements:** Have an idea for a new feature or an improvement? Open an issue to start a discussion.
*   **Adding Content:** Contribute a blog post, add a new neuromorphic hardware or software entry, or update an existing page.
*   **Improving Code:** Help us improve the website's templates, styles, or functionality.

For a more user-friendly overview of how to get involved with the community, please visit our [Getting Involved page](https://open-neuromorphic.org/getting-involved/).

## Finding a Task: The Mission Board

If you're looking for high-impact ways to contribute to the broader open-source neuromorphic ecosystem, a great place to start is our **[Community Coding Projects](https://open-neuromorphic.org/getting-involved/community-coding-projects/)**. This page lists critical "help wanted" issues from key projects in our community, offering a direct path to making a meaningful contribution.

## Getting Started: Local Development Setup

To work on the website locally, you'll need to set up a development environment.

### Prerequisites

*   **Hugo (Extended version):** `0.147.7` or later.
*   **Node.js:** `22.16.0` or later (which includes `npm`).
*   **Go:** `1.24.3` or later.

### Setup Steps

1.  **Fork and Clone the Repository:**
    First, fork the repository to your own GitHub account, then clone it to your local machine.

    ```bash
    git clone https://github.com/YOUR_USERNAME/open-neuromorphic.github.io.git
    cd open-neuromorphic.github.io
    ```

2.  **Install Dependencies:**
    This project uses `npm` to manage development tools like Tailwind CSS.

    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    This command starts Hugo's local server, which will watch for changes and automatically refresh your browser.

    ```bash
    npm run dev
    ```

    The site will be available at `http://localhost:1313/`.

## How to Submit Changes

### Reporting Bugs and Suggesting Enhancements

Use [GitHub Issues](https://github.com/open-neuromorphic/open-neuromorphic.github.io/issues) to report bugs or suggest new features. Please provide as much detail as possible, including steps to reproduce for bugs.

### Submitting a Pull Request

All code and content changes should be submitted via a Pull Request (PR).

1.  **Create a Branch:** Create a new branch from `main` for your changes. Use a descriptive name like `feature/new-hardware-page` or `fix/mobile-menu-bug`.
    ```bash
    git checkout -b feature/your-feature-name
    ```

2.  **Make Your Changes:** Edit or add files as needed.

3.  **Commit Your Changes:** Write clear, concise commit messages. See our [Commit Message Guidelines](#commit-messages).
    ```bash
    git commit -m "feat(hardware): Add page for Intel Loihi 2"
    ```

4.  **Push to Your Fork:**
    ```bash
    git push origin feature/your-feature-name
    ```

5.  **Open a Pull Request:** Go to the original repository on GitHub and open a Pull Request from your forked branch to the `main` branch. Provide a clear title and description for your PR. If it resolves an existing issue, link it using `Closes #issue-number`.

## Content Contribution Guide

Adding new content is one of the best ways to contribute. We use Hugo's [archetypes](https://gohugo.io/content-management/archetypes/) to ensure new content has the correct structure. This is especially useful for AI assistants creating content, as the archetypes serve as self-documenting templates.

### Content Creation Cheat Sheet

This table provides the exact commands for creating common content types.

| Content Type | Archetype Command | Location |
| :--- | :--- | :--- |
| **Blog Post** | `hugo new blog/your-post-slug/index.md` | `content/blog/your-post-slug/` |
| **Workshop** | `hugo new workshops/your-event-slug/index.md` | `content/workshops/your-event-slug/` |
| **Student Talk** | `hugo new neuromorphic-computing/student-talks/your-talk-slug/index.md` | `content/neuromorphic-computing/student-talks/your-talk-slug/` |
| **Hacking Hour** | `hugo new neuromorphic-computing/software/hacking-hours/your-session-slug/index.md` | `content/neuromorphic-computing/software/hacking-hours/your-session-slug/` |
| **Hardware Page** | `hugo new neuromorphic-computing/hardware/manufacturer-chip/index.md` | `content/neuromorphic-computing/hardware/manufacturer-chip/` |
| **Software Page** | `hugo new neuromorphic-computing/software/snn-frameworks/software-name/index.md` | `content/neuromorphic-computing/software/snn-frameworks/software-name/` |
| **Contributor** | `hugo new contributors/full-name-slug/index.md` | `content/contributors/full-name-slug/` |
| **Initiative** | `hugo new neuromorphic-computing/initiatives/your-initiative-slug/index.md`| `content/neuromorphic-computing/initiatives/your-initiative-slug/` |

### General Guidelines

*   **Use Archetypes:** Always create new content with `hugo new <path>` if possible. If you are creating a file manually, copy the relevant file from the `archetypes/` directory to use as a template.
*   **Draft Status:** New content is created with `draft: true`. This prevents it from being published. When your content is ready, change this to `draft: false`.
*   **SEO is Key:**
    *   **`title`:** 50-60 characters. Make it descriptive and keyword-rich.
    *   **`description`:** 120-160 characters. This is the summary shown in search engine results.

### Adding Blog Posts

1.  **Create the file:** (template: [archetypes/blog.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/archetypes/blog.md))
    ```bash
    hugo new blog/your-post-title-slug/index.md
    ```
2.  **Location:** `content/blog/your-post-title-slug/index.md`
3.  **Front Matter:** Fill in the `title`, `description`, `author`, and `image` (for the banner). Remember to add `image_attribution` if the banner image requires credit.
4.  **Images:** Place images for the post inside the `content/blog/your-post-title-slug/` directory.

### Adding Events

Events like workshops, student talks, and hacking hours share a similar structure.

1.  **Create the file:** Use the appropriate command from the cheat sheet.
    *   Workshop (template: [archetypes/workshops.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/archetypes/workshops.md))
    *   Student Talk (template: [archetypes/student-talks.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/archetypes/student-talks.md))
    *   Hacking Hour (template: [archetypes/hacking-hours.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/archetypes/hacking-hours.md))
2.  **Front Matter:** Fill in all event-specific fields: `title`, `author`, `date` (event date), `start_time`, `end_time`, `time_zone`, `upcoming`, `video` (add YouTube ID after the event), `image`, `speaker_photo`, and `speaker_bio`.

### Adding Hardware or Software Pages

1.  **Create the file:** Use the appropriate command from the cheat sheet.
    *   Hardware (template: [archetypes/neuromorphic-hardware.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/archetypes/neuromorphic-hardware.md))
    *   Software (template: [archetypes/neuromorphic-software.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/archetypes/neuromorphic-software.md))
2.  **Front Matter:** Follow the structure in the respective archetype. These pages have detailed front matter for specifications.
3.  **Images:** Place logos and product images inside the new directory.

### Adding Contributor Profiles

To link content to an author, a contributor profile is required.

1.  **Create the file:** (template: [archetypes/contributors.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/archetypes/contributors.md))
    ```bash
    hugo new contributors/full-name-slug/index.md
    ```
    The slug should be the person's name, lowercase and hyphenated (e.g., `jens-e-pedersen`).
2.  **Front Matter:**
    *   The **`title`** field **must be the person's full name**. This exact string is used to link them from the `author` field in other content.
    *   Add a profile `image` (square) and `social` links.

## Image Guidelines

*   **Placement:** For content-specific images (banners, figures, speaker photos), place them inside the page bundle directory (e.g., `content/blog/my-post/`).
*   **Global Images:** For general site images, use the `static/images/` directory.
*   **Dimensions:**
    *   **Banners / Open Graph (OG) Images:** 1200x630px.
    *   **Profile / Speaker Photos:** Square (e.g., 200x200px).
*   **OG Images:** The site automatically generates Open Graph images for social sharing based on the page's `title` and `description`. Providing a high-quality `image` in the front matter (1200x630px) will override the generated one for that page.

## Style and Coding Guidelines

*   **Templates:** Hugo templates are located in `layouts/`.
*   **Styling:** We use Tailwind CSS. Custom styles are in `assets/scss/`.
*   **JavaScript:** Custom scripts are in `assets/js/main.js`.

### Commit Messages

Please follow a conventional commit format to keep the history clean and understandable.

*   `feat`: A new feature (e.g., `feat(search): Add live search functionality`).
*   `fix`: A bug fix (e.g., `fix(css): Correct mobile menu alignment`).
*   `docs`: Documentation-only changes (e.g., `docs: Update contribution guide`).
*   `style`: Code style changes (e.g., `style: Format SCSS files`).
*   `refactor`: Code changes that neither fix a bug nor add a feature.
*   `content`: For adding or updating content (e.g., `content(blog): Add post on hardware trends`).
*   `chore`: Build process or tooling changes (e.g., `chore: Upgrade Tailwind CSS to v3.4`).

---

If you're looking for high-impact ways to contribute to the broader open-source neuromorphic ecosystem, a great place to start is our **[Community Coding Projects](https://open-neuromorphic.org/getting-involved/community-coding-projects/)**. This page lists critical "help wanted" issues from key projects in our community, offering a direct path to making a meaningful contribution.

Thank you again for your interest in contributing. We look forward to your pull requests!