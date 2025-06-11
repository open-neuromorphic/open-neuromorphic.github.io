# Open Neuromorphic (ONM) Website

This repository contains the source code for the official Open Neuromorphic (ONM) website, [open-neuromorphic.org](https://open-neuromorphic.org). Our goal is to foster a collaborative community around neuromorphic computing, providing educational content, resources, and a platform for sharing knowledge and projects.

This website is built using the [Hugo](https://gohugo.io/) static site generator and the Hugoplate theme, with custom modifications.

- [Build and Deploy](#build-and-deploy)
- [Contributing to the Website](#contributing-to-the-website)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Development Scripts](#development-scripts)
- [License](#license)

## Getting Started

To run the website locally for development or contributions, follow these steps:

### Prerequisites

Ensure you have the following installed on your system:

- [Hugo (Extended version)](https://gohugo.io/installation/): v0.118.2 or later
- [Node.js](https://nodejs.org/): v18.15.0 or later (includes npm)
- [Go](https://go.dev/doc/install): v1.20.5 or later

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/open-neuromorphic/open-neuromorphic.github.io.git
    cd open-neuromorphic.github.io
    ```

2.  **Install dependencies:**
    This project uses Node.js for managing development tools like Tailwind CSS and PostCSS.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command will start Hugo's development server, typically available at `http://localhost:1313/`. The site will automatically rebuild when you make changes.
    ```bash
    npm run dev
    ```

## Contributing to the Website

We welcome contributions! Whether it's new content, bug fixes, or feature improvements, your help is appreciated.

### Content Contributions

*   **Blog Posts:** Share your insights, research, or tutorials. New blog posts go into `content/english/blog/your-post-slug/index.md`.
*   **Workshop Pages:** Announce upcoming workshops or add summaries for past ones. These are located in `content/english/workshops/your-workshop-slug/index.md`.
*   **Hardware/Software Pages:** Help us maintain our curated lists of neuromorphic hardware and software in `content/english/neuromorphic-computing/hardware/` and `content/english/neuromorphic-computing/software/`.
*   **General Pages:** Other content pages can be found under `content/english/`.

### Code Contributions

If you'd like to contribute to the website's theme, styling, or functionality:

*   **Hugo Templates:** Located in `layouts/`.
*   **Styling (SCSS):** Found in `assets/scss/`. We use Tailwind CSS.
*   **JavaScript:** Custom scripts are in `assets/js/`.

### Reporting Issues or Suggesting Improvements

Please use the [GitHub Issues](https://github.com/open-neuromorphic/open-neuromorphic.github.io/issues) for the repository to report bugs, suggest new features, or discuss improvements.

## Project Structure

A brief overview of important directories:

*   `assets/`: Contains SCSS, JavaScript, and other assets processed by Hugo Pipes.
*   `config/`: Hugo site configuration files (e.g., `hugo.toml`, `params.toml`, `menus.en.toml`).
*   `content/`: All Markdown content for the website, organized by language and section.
*   `data/`: Site-wide data files (e.g., `theme.json` for colors/fonts, `social.json` for social media links).
*   `layouts/`: Hugo HTML templates that define the structure of the site.
*   `static/`: Static assets (e.g., images, favicons) that are copied directly to the `public` directory.
*   `.github/workflows/`: Contains GitHub Actions workflows for CI/CD (e.g., `main.yml` for deployment).

## Build and Deploy

### Build Command

To build the website locally for production (minified, purged CSS):
```bash
npm run build
```
This will generate the static site in the public/ directory.

## Deployment

The website is automatically deployed via GitHub Actions when changes are pushed to the main branch. The workflow is defined in `.github/workflows/main.yml`.

## Customization

While the core theme is Hugoplate, ONM-specific customizations are made directly in this repository.

*   Site Configuration: Main settings are in `hugo.toml`.
*   Theme Parameters: Colors, fonts, and other theme-specific settings are in `config/_default/params.toml` and `data/theme.json`.
*   Menus: Navigation menus are defined in `config/_default/menus.en.toml`.
*   Social Links: Social media icons and links are in `data/social.json`.
*   Custom SCSS: Add custom styles to `assets/scss/custom.scss`.

## Development Scripts

This project includes several npm scripts to aid development:

*   `npm run dev`: Starts the Hugo development server with live reloading.
*   `npm run build`: Builds the static site for production.
*   `npm run build-preview`: Builds a production-like preview server.

# Open Neuromorphic (ONM) Website: Content Contribution Guide

This guide provides step-by-step instructions and best practices for adding and managing content on the Open Neuromorphic website. Adhering to these guidelines will help maintain consistency, improve SEO, and ensure a smooth workflow for all contributors.

## Table of Contents

1.  [Getting Started](#getting-started)
  *   [Using Archetypes](#using-archetypes)
  *   [Draft Status](#draft-status)
2.  [General Content Guidelines](#general-content-guidelines)
  *   [Front Matter Essentials](#front-matter-essentials)
  *   [SEO Best Practices (Titles & Descriptions)](#seo-best-practices-titles--descriptions)
  *   [Date Formatting](#date-formatting)
3.  [Adding Specific Content Types](#adding-specific-content-types)
  *   [Blog Posts](#blog-posts)
  *   [Events (Workshops, Student Talks, Hacking Hours)](#events-workshops-student-talks-hacking-hours)
  *   [Neuromorphic Hardware Entries](#neuromorphic-hardware-entries)
  *   [Neuromorphic Software Entries](#neuromorphic-software-entries)
  *   [Contributor Profiles](#contributor-profiles)
  *   [Initiatives](#initiatives)
4.  [Image Guidelines](#image-guidelines)
  *   [Image Placement (Page Bundles vs. Static)](#image-placement-page-bundles-vs-static)
  *   [Recommended Dimensions](#recommended-dimensions)
  *   [Open Graph (OG) Image Generation](#open-graph-og-image-generation)
5.  [Author Slugs and Linking](#author-slugs-and-linking)

---

## 1. Getting Started

### Using Archetypes

Hugo archetypes are templates that pre-fill new content files with essential front matter. To create a new piece of content, use the `hugo new` command followed by the archetype path and desired filename.

**General command format:**
`hugo new <section>/<new-content-slug>.md`

For content types organized in subfolders (like hardware, software, or specific event types), include the subfolder path:
`hugo new <section>/<subsection>/<new-content-slug>.md`

For page bundles (where content and its assets like images are grouped in a directory), use `index.md`:
`hugo new <section>/<new-content-slug>/index.md`

### Draft Status

By default, new content created with an archetype will have `draft: true` in its front matter. This prevents the content from being published until it's ready. **Remember to set `draft: false` when the content is complete and reviewed.**

---

## 2. General Content Guidelines

### Front Matter Essentials

Front matter is the block of YAML or TOML at the top of a Markdown file, enclosed by `---`. It contains metadata for the page.

*   **`title`**: The main title of the page/post. Crucial for SEO and display.
*   **`description`**: A concise summary (120-160 characters) for SEO and previews.
*   **`date`**: Publication date (format: `YYYY-MM-DD`). For events, this is the event date.
*   **`author`**: A list of author names (e.g., `author: ["Full Name One", "Full Name Two"]`). These names should match the `title` in the corresponding contributor's profile. See [Author Slugs and Linking](#author-slugs-and-linking).
*   **`image`**: The primary image for the content (e.g., blog banner, workshop poster). Used for OG images if not overridden.
*   **`draft`**: Set to `true` for work-in-progress, `false` to publish.

### SEO Best Practices (Titles & Descriptions)

*   **Titles**: Aim for 50-60 characters. Make them catchy, descriptive, and keyword-rich.
*   **Descriptions**: Write 120-160 characters. Summarize the content, highlight key takeaways, and entice users to click. Include relevant keywords naturally.

### Date Formatting

Use `YYYY-MM-DD` for all `date` fields in the front matter (e.g., `date: 2023-10-27`).

---

## 3. Adding Specific Content Types

### Blog Posts

*   **Archetype Command:** `hugo new blog/your-blog-post-slug/index.md`
  *   This creates a page bundle, so place the blog post's images in this new directory.
*   **Essential Front Matter:**
  *   `title`: "Catchy Blog Post Title (50-60 chars)"
  *   `date`: `{{ .Date }}` (automatically set, format YYYY-MM-DD)
  *   `description`: "Engaging summary of this blog post..." (120-160 chars)
  *   `image`: "your-banner-image.png" (Place in the post's folder. Recommended: 1200x630px)
  *   `author`: `["Your Name or Author Slug"]`
  *   `tags`: `["relevant-tag", "another-tag"]` (2-5 tags)
  *   `showTableOfContents`: `true` or `false`
  *   `draft`: `true` (change to `false` to publish)

### Events (Workshops, Student Talks, Hacking Hours)

These event types share a similar structure.

*   **Archetype Commands:**
  *   Workshops: `hugo new workshops/your-workshop-slug/index.md`
  *   Student Talks: `hugo new neuromorphic-computing/student-talks/your-talk-slug/index.md`
  *   Hacking Hours: `hugo new neuromorphic-computing/software/hacking-hours/your-session-slug/index.md`
  *   These create page bundles. Store event-specific images (banner, speaker photo) in their respective folders.
*   **Essential Front Matter:**
  *   `title`: "Workshop: {{ replace .Name "-" " " | title }}" (Clear & concise, 50-60 chars)
  *   `author`: `["Speaker Name or Slug"]` (Match with contributor profile `title`)
  *   `date`: `{{ .Date }}` (Date of the event, YYYY-MM-DD)
  *   `start_time`: "18:00" (24-hour format HH:MM)
  *   `end_time`: "19:30" (24-hour format HH:MM)
  *   `time_zone`: "CET" (e.g., CET, CEST, EST, PST)
  *   `description`: "Join us for an insightful workshop..." (120-160 chars, SEO crucial)
  *   `upcoming`: `true` (for future events, set to `false` after the event)
  *   `video`: "" (After event, add YouTube video ID, e.g., "dQw4w9WgXcQ")
  *   `image`: "workshop-banner.png" (Main banner, 1200x630px, place in folder)
  *   `speaker_photo`: "speaker-photo.jpg" (Square, place in folder)
  *   `type`: Crucial! Must be `workshops`, `student-talks`, or `hacking-hours` respectively.
  *   `speaker_bio`: "A brief biography of the speaker..."
  *   `draft`: `true` (change to `false` to publish/list)
  *   Optional: `speaker_slides`, `speaker_code`, `speaker_notebook` (links or local files in bundle)

### Neuromorphic Hardware Entries

*   **Archetype Command:** `hugo new neuromorphic-computing/hardware/manufacturer-hardware-name/index.md`
  *   Creates a page bundle. Place hardware image, manufacturer logo here.
*   **Essential Front Matter:**
  *   `title`: "Hardware Name - Manufacturer" (e.g., "Loihi 2 - Intel")
  *   `description`: "Explore [Hardware Name] by [Manufacturer]..." (120-160 chars)
  *   `image`: "hardware-image.png" (Main image for card/OG, place in folder)
  *   `draft`: `true`
  *   `active_product`: `true` (or `false` if retired)
  *   `type`: `"neuromorphic-hardware"` (Do not change)
  *   `organization`: (object with `group_name`, `org_logo`, `org_name`, `org_website`, `product_page_link`, `social_media_links`)
  *   `product`: (object with many hardware-specific fields like `announced_date`, `applications`, `chip_type`, `neurons`, `synapses`, `status` etc.)
  *   `summary`: "Slightly more detailed summary..." (2-3 sentences for list page)

### Neuromorphic Software Entries

*   **Archetype Command:** `hugo new neuromorphic-computing/software/software-name/index.md`
  *   Creates a page bundle. Place software logo here if applicable.
*   **Essential Front Matter:**
  *   `title`: "Software Name - Purpose" (e.g., "Spyx - JAX-based SNN Library")
  *   `type`: `"neuromorphic-software"` (Do not change)
  *   `description`: "Discover [Software Name], a [Python/C++] framework..." (120-160 chars)
  *   `logo`: "software-logo.png" (Place in folder or reference from `static/images/`)
  *   `website`: "https://official-website.com"
  *   `dependencies`: "Key dependencies..."
  *   `field_of_application`: "e.g., Machine Learning, Neuroscience..."
  *   `source_code`: "https://github.com/org/repo"
  *   `stars_widget_url`, `stars`, `version_widget_url`: For GitHub/PyPI badges.
  *   `license`: "e.g., MIT, GPL-3.0..."
  *   `supports_hardware`: `true` or `false`
  *   `supports_NIR`: `true` or `false`
  *   `language`: "Python"
  *   `maintainer`: "Maintainer Name or Organization"
  *   `draft`: `true`

### Contributor Profiles

*   **Archetype Command:** `hugo new contributors/full-name-slug/index.md`
  *   Example: `hugo new contributors/jens-e-pedersen/index.md`
  *   The directory name (`full-name-slug`) becomes the URL slug.
  *   Creates a page bundle. Place profile image here.
*   **Essential Front Matter:**
  *   `title`: "Full Name" (This exact string is used to match authors in other content types.)
  *   `description`: "Learn more about [Full Name], a valued contributor..." (120-160 chars SEO bio)
  *   `image`: "profile.jpg" (Profile image, square e.g., 200x200px. Place in this contributor's folder)
  *   `social`: (A list of social media links with `icon`, `link`, `title` fields)
  *   `draft`: `true` (change to `false` to publish)

### Initiatives

*   **Archetype Command:** `hugo new neuromorphic-computing/initiatives/your-initiative-name/index.md`
  *   Creates a page bundle. Place initiative-specific banner here if any.
*   **Essential Front Matter:**
  *   `title`: "Initiative: {{ replace .Name "-" " " | title }}"
  *   `description`: "Learn about the [Initiative Name] initiative..." (120-160 chars)
  *   `author`: `["Lead Contributor Slug or Name"]` (Match with contributor profile)
  *   `date`: `{{ .Date }}` (Start date of the initiative, YYYY-MM-DD)
  *   `legacy`: `true` (if concluded/inactive, otherwise omit or `false`)
  *   `date_end`: "YYYY-MM-DD" (If `legacy: true`, date initiative concluded)
  *   `draft`: `true`
  *   `type`: `"initiatives"` (Do not change)
  *   `image`: `"initiative-banner.png"` (Optional, 1200x630px ideal. Place in bundle or `static/images/`)

---

## 4. Image Guidelines

### Image Placement (Page Bundles vs. Static)

*   **Page Bundles (Preferred for content-specific images):**
  *   When you create content like `blog/my-post/index.md`, place images specific to `my-post` (e.g., `banner.png`, `figure1.jpg`) inside the `content/blog/my-post/` directory.
  *   In the front matter or Markdown, refer to these images by their filename directly (e.g., `image: "banner.png"`).
  *   This keeps content and its assets together and allows Hugo to process these images.
*   **`static/images/` Directory:**
  *   Use for global images not tied to specific content (e.g., generic site logos if not handled by theme assets, some fallback images).
  *   Refer to these images with a leading slash: `image: "/images/global-logo.png"`.
*   **`assets/images/` Directory:**
  *   Primarily for images used by the theme itself or those that need Hugo Pipes processing (e.g., resizing, format conversion) but are not part of a specific page bundle. Generally, page bundle or `static/images` are more common for content images.

### Recommended Dimensions

*   **Open Graph (OG) Images:** 1200x630 pixels. This is the standard for social media sharing.
*   **Banners (Blog Posts, Workshops, etc.):** 1200x630 pixels is ideal for consistency with OG images and good visual appeal.
*   **Speaker Photos / Profile Photos:** Square, e.g., 200x200 pixels or 300x300 pixels.
*   **Hardware/Software Logos & Images:** Varies, but aim for clarity and reasonable file sizes. Landscape or square often works well.

### Open Graph (OG) Image Generation

The website has an automated script (`scripts/collectOgData.js` and `scripts/generateImagesFromData.js`) to generate OG images.

*   **Automatic Naming:**
  *   For most content pages (blog posts, workshops, hardware entries, etc., organized as page bundles `section/slug/index.md`), the script expects to generate an OG image named `[slug]-og.jpg` *inside the page's bundle directory*. For example, for `blog/my-awesome-post/index.md`, the OG image will be `content/blog/my-awesome-post/my-awesome-post-og.jpg`.
  *   For the **homepage**, the OG image is `static/images/og-image.jpg`.
  *   For other section list pages (e.g., `/blog/`, `/workshops/`), it will try to generate `[section-name]-og.jpg` in `static/images/`.
*   **How it Works:** The script uses page `title` and `description` from front matter, along with a site logo, to create these images.
*   **Overriding Automatic Generation:**
  *   If you provide an `image` in a page's front matter (e.g., `image: "custom-banner.png"`), this image will be used as the OG image for that specific page, effectively overriding the automatically generated one for that page. Ensure this image is 1200x630px and placed in the page's bundle or `static/images/`.
  *   The automated script will still attempt to generate an OG image based on the slug, but Hugo's SEO templates prioritize the `image` front matter field if present.

**It's good practice to let the script generate OG images for consistency, but provide a custom `image` in front matter if a more specific or higher-quality OG image is desired.**

---

## 5. Author Slugs and Linking

To correctly link authors of blog posts, workshops, etc., to their contributor profiles:

1.  **Create a Contributor Profile:**
  *   Use the command: `hugo new contributors/john-doe/index.md` (replace `john-doe` with the person's name, hyphenated and lowercase). This directory name (`john-doe`) becomes the slug.
  *   In the `content/contributors/john-doe/index.md` file, the **`title` field in the front matter must be the person's full, displayable name** (e.g., `title: "John Doe"`).

2.  **Linking in Content:**
  *   When listing authors in a blog post or workshop front matter, use the **exact `title` string** from their contributor profile's front matter.
  *   Example:
      ```yaml
      # In content/blog/my-post/index.md
      author:
        - "John Doe"
        - "Jane Smith"
      ```
  *   The system will then automatically link "John Doe" to `/contributors/john-doe/` if a contributor profile with `title: "John Doe"` exists.

**Consistency is key:** The `author` field entries must precisely match the `title` field in the respective `contributors/.../index.md` files. The slug for the contributor page is derived from its directory name.
## License

The content and code of this website are licensed under their respective licenses. Please refer to the LICENSE file in the repository for details on the theme's license. Contributions are generally expected to be compatible with the project's licensing.
