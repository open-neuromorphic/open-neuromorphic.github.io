// scripts/collectOgData.js
const { join, dirname, basename } = require('path');
const { readdir, readFile, stat, mkdir, writeFile } = require('fs/promises');
const mimeTypes = require('mime-types');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const CONTENT_ROOT_DIR = join(PROJECT_ROOT, 'content');
const STATIC_DIR = join(PROJECT_ROOT, 'static');
const ASSETS_DIR = join(PROJECT_ROOT, 'assets');
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const OUTPUT_JSON_PATH = join(TMP_DIR, 'ogImageData.json');
const OUTPUT_FORMAT = 'jpg';
const LOGO_PATH_IN_ASSETS = 'images/ONM-logo.png';
const BACKGROUND_IMAGE_PATH_IN_ASSETS = 'images/ONM.png'; // Added this line
const HOMEPAGE_TITLE = "Advancing Neuromorphic Computing, Together.";
const HOMEPAGE_DESCRIPTION = "Open Neuromorphic (ONM) is a global community fostering education, research, and open-source collaboration in brain-inspired AI and hardware.";

// --- Helper Functions ---
async function pathExists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function isDirectory(path) {
  try { return (await stat(path)).isDirectory(); } catch { return false; }
}

async function ensureDir(dirPath) {
  try { await mkdir(dirPath, { recursive: true }); }
  catch (err) { if (err.code !== 'EEXIST') throw err; }
}

async function findMarkdownFiles(dir) {
  let entries;
  try { entries = await readdir(dir); } catch (err) { console.warn(`Could not read directory ${dir}: ${err.message}`); return []; }
  const markdownFiles = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (await isDirectory(fullPath)) {
      markdownFiles.push(...await findMarkdownFiles(fullPath));
    } else if (entry === 'index.md' || entry === '_index.md') {
      markdownFiles.push(fullPath);
    }
  }
  return markdownFiles;
}

function extractFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!frontMatterMatch || !frontMatterMatch[1]) {
    return { isDraft: true }; // Treat as draft if no frontmatter
  }
  const fm = frontMatterMatch[1];
  const titleMatch = fm.match(/^(?:title|Title):\s*(.*)\s*$/m);
  const descMatch = fm.match(/^(?:description|Description):\s*([\s\S]*?)\s*$/m);
  const draftMatch = fm.match(/^draft:\s*(true)\s*$/im);
  const excludeMatch = fm.match(/^exclude_sitemap:\s*(true)\s*$/im);

  let title = titleMatch ? titleMatch[1].trim().replace(/^['"]|['"]$/g, '').replace(/\\"/g, '"') : null;
  let description = descMatch ? descMatch[1].replace(/\s+/g, ' ').trim().replace(/^['"]|['"]$/g, '') : null;

  return {
    title,
    description,
    isDraft: !!draftMatch,
    excludeSitemap: !!excludeMatch,
  };
}

async function getImageDataUri(filePath) {
  try {
    if (!filePath || !(await pathExists(filePath))) {
      console.warn(`⚠️ Image file not found at ${filePath}`);
      return null;
    }
    const buffer = await readFile(filePath);
    return `data:${mimeTypes.lookup(filePath) || 'image/png'};base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.error(`❌ Error reading image file at ${filePath}: ${err.message}`);
    return null;
  }
}

// --- Main Script ---
async function collectData() {
  console.log('📊 Collecting OG image data...');
  await ensureDir(TMP_DIR);

  const absoluteLogoPath = join(ASSETS_DIR, LOGO_PATH_IN_ASSETS);
  const logoDataUri = await getImageDataUri(absoluteLogoPath);
  if (!logoDataUri) {
    console.error(`❌ Critical: Could not load logo from ${absoluteLogoPath}. Cannot proceed.`);
    process.exit(1);
  }

  // --- Add logic for background image ---
  const absoluteBackgroundPath = join(ASSETS_DIR, BACKGROUND_IMAGE_PATH_IN_ASSETS);
  const backgroundDataUri = await getImageDataUri(absoluteBackgroundPath);
  if (!backgroundDataUri) {
      console.warn(`⚠️ Background image not found at ${absoluteBackgroundPath}, will proceed without it.`);
  }

  const outputData = {
    logoDataUri,
    backgroundDataUri: backgroundDataUri || '', // Add background URI
    pages: [],
  };

  // 1. Add Homepage Data
  const homepageOgDir = join(STATIC_DIR, 'images');
  await ensureDir(homepageOgDir);
  outputData.pages.push({
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    outputPath: join(homepageOgDir, `og-image.${OUTPUT_FORMAT}`),
    tempHtmlPath: join(TMP_DIR, `homepage-temp-og.html`),
  });

  // 2. Process Content Pages
  const markdownFiles = await findMarkdownFiles(CONTENT_ROOT_DIR);
  for (const mdFile of markdownFiles) {
    const pageDirectory = dirname(mdFile);
    try {
      const mdContent = await readFile(mdFile, 'utf8');
      const { title, description, isDraft, excludeSitemap } = extractFrontMatter(mdContent);

      if (isDraft || excludeSitemap || !title || !description) {
        continue;
      }

      const parentDirName = basename(pageDirectory);
      const ogImageFilename = `${parentDirName}-og.${OUTPUT_FORMAT}`;

      outputData.pages.push({
        title,
        description,
        outputPath: join(pageDirectory, ogImageFilename),
        tempHtmlPath: join(TMP_DIR, `${parentDirName}-${Date.now()}-temp-og.html`),
      });
    } catch (err) {
      console.error(`❌ Error processing ${mdFile}: ${err.message}`);
    }
  }

  // 3. Write JSON Output
  await writeFile(OUTPUT_JSON_PATH, JSON.stringify(outputData, null, 2));
  console.log(`✅ Data for ${outputData.pages.length} pages collected and saved to ${OUTPUT_JSON_PATH}.`);
}

collectData().catch(err => {
  console.error("🔥 Uncaught error during data collection:", err);
  process.exit(1);
});
