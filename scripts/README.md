# OG Image Generation Scripts

This directory contains scripts to automatically generate Open Graph (OG) images for social media sharing.

## Workflow

1.  **`collectOgData.js`**: This script crawls the `content/` directory, extracts front matter (`title`, `description`), and creates a manifest file at `tmp/ogImageData.json`. This manifest includes data for all pages that should have an OG image generated.
2.  **`generateOgImages.js`**: This script reads the manifest, uses Puppeteer (a headless browser) to render an HTML template (`assets/og-template/template.html`) with the page's data, and saves screenshots as JPGs in the appropriate content or static directories. It uses a cache manifest (`tmp/og-cache-manifest.json`) to avoid regenerating unchanged images.

## Running the Scripts

Run both scripts as part of the build process:

```bash
npm run og-images
