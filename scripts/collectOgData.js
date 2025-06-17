// scripts/collectOgData.js
const { join, dirname, basename } = require('path');
const { readdir, readFile, stat, mkdir, writeFile } = require('fs/promises');
const mimeTypes = require('mime-types');
const crypto = require('crypto');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const CONTENT_ROOT_DIR = join(PROJECT_ROOT, 'content');
const STATIC_DIR = join(PROJECT_ROOT, 'static');
const ASSETS_DIR = join(PROJECT_ROOT, 'assets');
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const OUTPUT_JSON_PATH = join(TMP_DIR, 'ogImageData.json');
const OUTPUT_FORMAT = 'jpg';
const LOGO_PATH_IN_ASSETS = 'images/ONM-logo.png';
const BACKGROUND_IMAGE_PATH_IN_ASSETS = 'images/ONM.png';
const OG_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'template.html');
const HOMEPAGE_TITLE = "Advancing Neuromorphic Computing, Together.";
const HOMEPAGE_DESCRIPTION = "Open Neuromorphic (ONM) is a global community fostering education, research, and open-source collaboration in brain-inspired AI and hardware.";
const SIZES = [
  { width: 1200, height: 630, suffix: '16x9' }, // Standard OG 1.91:1
  { width: 1200, height: 900, suffix: '4x3' },
  { width: 1080, height: 1080, suffix: '1x1' },
];

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

function createHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
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
  console.log('📊 Collecting OG image data and calculating hashes...');
  await ensureDir(TMP_DIR);

  const templateBuffer = await readFile(OG_TEMPLATE_PATH);
  const logoBuffer = await readFile(join(ASSETS_DIR, LOGO_PATH_IN_ASSETS));
  const backgroundBuffer = await readFile(join(ASSETS_DIR, BACKGROUND_IMAGE_PATH_IN_ASSETS));
  const globalHash = createHash(Buffer.concat([templateBuffer, logoBuffer, backgroundBuffer]));

  const absoluteLogoPath = join(ASSETS_DIR, LOGO_PATH_IN_ASSETS);
  const logoDataUri = await getImageDataUri(absoluteLogoPath);
  if (!logoDataUri) {
    console.error(`❌ Critical: Could not load logo from ${absoluteLogoPath}. Cannot proceed.`);
    process.exit(1);
  }

  const absoluteBackgroundPath = join(ASSETS_DIR, BACKGROUND_IMAGE_PATH_IN_ASSETS);
  const backgroundDataUri = await getImageDataUri(absoluteBackgroundPath);

  const outputData = {
    globalHash,
    logoDataUri,
    backgroundDataUri: backgroundDataUri || '',
    pages: [],
  };

  // 1. Add Homepage Data
  const homepageContentHash = createHash(HOMEPAGE_TITLE + HOMEPAGE_DESCRIPTION);
  const homepageFinalHash = createHash(homepageContentHash + globalHash);
  const homepageOgDir = join(STATIC_DIR, 'images');
  await ensureDir(homepageOgDir);

  const homepageOutputs = SIZES.map(size => ({
    path: join(homepageOgDir, `og-image-${size.suffix}.${OUTPUT_FORMAT}`),
    width: size.width,
    height: size.height,
  }));

  outputData.pages.push({
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    outputs: homepageOutputs,
    finalHash: homepageFinalHash
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

      const contentHash = createHash(title + description);
      const finalHash = createHash(contentHash + globalHash);

      const parentDirName = basename(pageDirectory);
      
      const pageOutputs = SIZES.map(size => ({
        path: join(pageDirectory, `${parentDirName}-og-${size.suffix}.${OUTPUT_FORMAT}`),
        width: size.width,
        height: size.height,
      }));

      outputData.pages.push({
        title,
        description,
        outputs: pageOutputs,
        finalHash
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
