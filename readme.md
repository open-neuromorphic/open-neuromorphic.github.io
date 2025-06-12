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

**To get started, please read our detailed [CONTRIBUTING.md](./CONTRIBUTING.md) guide.**

It covers everything you need to know, including:
*   How to report issues and suggest features.
*   The pull request workflow.
*   Specific guidelines for adding blog posts, events, and other content.
*   Coding standards and commit message conventions.

For community discussions and questions, join us on our [Discord server](https://discord.gg/C9bzWgNmqk).

## 📄 License

The website's theme and code are licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details. Content contributed to the site is shared under the same license unless otherwise specified.
