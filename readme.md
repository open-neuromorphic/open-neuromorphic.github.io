# Open Neuromorphic Website

![Build Status](https://github.com/open-neuromorphic/open-neuromorphic.github.io/actions/workflows/main.yml/badge.svg)

This repository contains the source code for the official **Open Neuromorphic (ONM)** website, live at [open-neuromorphic.org](https://open-neuromorphic.org). Our goal is to foster a collaborative community around neuromorphic computing by providing educational content, resources, and a platform for sharing knowledge and projects.

## ✨ Key Features

*   **Static Site Generation:** Built with the [Hugo](https://gohugo.io/) (Extended) for speed and security.
*   **Modern Styling:** Styled with [Tailwind CSS](https://tailwindcss.com/) for a utility-first workflow.
*   **Community Focused:** Features contributor profiles, workshops, student talks, and community-led initiatives.
*   **Resource Hubs:** Curated guides for [Neuromorphic Hardware](/neuromorphic-computing/hardware/) and [Software](/neuromorphic-computing/software/).
*   **Automated Deployments:** CI/CD pipeline using GitHub Actions for automated builds and deployments.
*   **Dynamic OG Images:** Automatically generated Open Graph images for better social sharing.
*   **Image Attribution:** Simple front matter configuration to give credit for banner images.

## 🚀 Getting Started: Running Locally

To run the website locally for development, ensure you have the required prerequisites and follow these steps.

### Prerequisites

*   [Hugo (Extended version)](https://gohugo.io/installation/): v0.147.7 or later
*   [Node.js](https://nodejs.org/): v22.16.0 or later (which includes npm)
*   [Go](https://go.dev/doc/install): v1.24.3 or later

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/open-neuromorphic/open-neuromorphic.github.io.git
    cd open-neuromorphic.github.io
    ```

2.  **Install dependencies:**
    This project uses Node.js to manage development tools and dependencies.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command starts Hugo's local server with live-reloading. The site will be available at `http://localhost:1313/`.
    ```bash
    npm run dev
    ```

## 🛠️ Available Scripts

This project uses `npm` to manage common tasks:

*   `npm run dev`: Starts the Hugo development server for local development.
*   `npm run build`: Creates a production-ready build of the site in the `/public` directory.
*   `npm run build-preview`: Builds a minified version of the site and serves it locally for previewing.
*   `npm run og-images`: Runs the script to generate Open Graph images for social sharing.

## 🤝 Contributing

We welcome contributions of all kinds! Whether you're adding content, fixing a bug, or improving the code, your help is greatly appreciated.

**To get started, please read our detailed [CONTRIBUTING.md](https://github.com/open-neuromorphic/open-neuromorphic.github.io/blob/main/CONTRIBUTING.md) guide.**

It covers everything you need to know, including:
*   How to report issues and suggest features.
*   The pull request workflow.
*   Specific guidelines for adding blog posts, events, and other content.
*   Coding standards and commit message conventions.

For community discussions and questions, join us on our [Discord server](https://discord.gg/hUygPUdD8E).

## Licensing

The source code for this website, including the Hugo theme, templates, and scripts, is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

Unless otherwise specified, all content on this website, including blog posts, articles, and images, is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License (CC-BY-SA 4.0)](http://creativecommons.org/licenses/by-sa/4.0/).
