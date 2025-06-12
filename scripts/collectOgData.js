// scripts/collectOgData.js
const { join, dirname, basename } = require('path');
const { readdir, readFile, stat, mkdir, writeFile } = require('fs/promises');
const toml = require('toml');
const mimeTypes = require('mime-types');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const CONTENT_ROOT_DIR = join(PROJECT_ROOT, 'content');
const HUGO_CONFIG_PATH = join(PROJECT_ROOT, 'hugo.toml');
const PARAMS_CONFIG_PATH = join(PROJECT_ROOT, 'config', '_default', 'params.toml');
const CUSTOM_SCSS_PATH = join(PROJECT_ROOT, 'assets', 'scss', 'custom.scss');

const STATIC_DIR = join(PROJECT_ROOT, 'static');
const ASSETS_DIR = join(PROJECT_ROOT, 'assets');
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const OUTPUT_JSON_PATH = join(TMP_DIR, 'ogImageData.json');
const OUTPUT_FORMAT = 'jpg';
const DEBUG = false; // Set to true for more verbose logging

const CSS_VARS_TO_EXTRACT = [
  'color-primary-new',
  'color-text-new',
  'color-text-muted-new',
  'color-background-new'
];
const DEFAULT_COLORS = {
  'color-primary-new': '#667eea',
  'color-text-new': '#1f2937',
  'color-text-muted-new': '#4b5563',
  'color-background-new': '#f9fafb'
};

// --- Helper Functions ---
function debugLog(...messages) {
  if (DEBUG) console.log('[DEBUG collectOgData]', ...messages);
}

async function pathExists(path) {
  try { await stat(path); return true; } catch (err) { return err.code !== 'ENOENT'; }
}

async function isDirectory(path) {
  try { return (await stat(path)).isDirectory(); } catch { return false; }
}

async function ensureDir(dirPath) {
  try { await mkdir(dirPath, { recursive: true }); debugLog(`Directory ensured: ${dirPath}`); }
  catch (err) { if (err.code !== 'EEXIST') throw err; debugLog(`Directory already exists: ${dirPath}`); }
}

async function findMarkdownFiles(dir) {
  let entries;
  try { entries = await readdir(dir); } catch (err) { console.warn(`Could not read directory ${dir}: ${err.message}`); return []; }
  const markdownFiles = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (await isDirectory(fullPath)) {
      const nestedFiles = await findMarkdownFiles(fullPath);
      markdownFiles.push(...nestedFiles);
    } else if (entry === 'index.md' || entry === '_index.md') {
      markdownFiles.push(fullPath);
    }
  }
  return markdownFiles;
}

function extractFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
  let title = null, description = null, isDraft = false, excludeSitemap = false, image = null;
  if (frontMatterMatch && frontMatterMatch[1]) {
    const fm = frontMatterMatch[1];
    const titleMatch = fm.match(/^(?:title|Title):\s*(.*)\s*$/m);
    const descMatch = fm.match(/^(?:description|Description):\s*([\s\S]*?)\s*$/m);
    const draftMatch = fm.match(/^draft:\s*(true)\s*$/im);
    const excludeMatch = fm.match(/^exclude_sitemap:\s*(true)\s*$/im);
    const imageMatch = fm.match(/^(?:image|Image):\s*"?([^"#\n]+)"?\s*$/m);

    if (titleMatch) title = titleMatch[1].split('#')[0].trim().replace(/^['"]|['"]$/g, '').replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
    if (descMatch) {
      let raw = descMatch[1].replace(/\\"/g, '"').replace(/\\'/g, "'");
      const lines = raw.split('\n');
      if (lines.length > 0) lines[lines.length - 1] = lines[lines.length - 1].split('#')[0];
      description = lines.join(' ').replace(/\s+/g, ' ').trim().replace(/^['"]|['"]$/g, '').trim();
    }
    if (draftMatch) isDraft = true;
    if (excludeMatch) excludeSitemap = true;
    if (imageMatch) image = imageMatch[1].trim();
  }
  return { title, description, isDraft, excludeSitemap, image };
}

async function getImageDataUri(filePath) {
  try {
    if (!filePath || !(await pathExists(filePath))) {
      console.warn(`⚠️ Logo/Image file not found at ${filePath}`);
      return null;
    }
    const buffer = await readFile(filePath);
    const base64 = buffer.toString('base64');
    const mime = mimeTypes.lookup(filePath) || 'image/png';
    return `data:${mime};base64,${base64}`;
  } catch (err) {
    console.error(`❌ Error reading image file at ${filePath}: ${err.message}`);
    return null;
  }
}

async function getHugoSiteConfig() {
  let siteConfig = {};
  let paramsConfig = {};

  try {
    if (await pathExists(HUGO_CONFIG_PATH)) {
      const hugoContent = await readFile(HUGO_CONFIG_PATH, 'utf8');
      siteConfig = toml.parse(hugoContent);
    }
  } catch (err) {
    console.error(`❌ Error parsing ${HUGO_CONFIG_PATH}: ${err.message}`);
  }

  try {
    if (await pathExists(PARAMS_CONFIG_PATH)) {
      const paramsContent = await readFile(PARAMS_CONFIG_PATH, 'utf8');
      paramsConfig = toml.parse(paramsContent);
    }
  } catch (err) {
    console.error(`❌ Error parsing ${PARAMS_CONFIG_PATH}: ${err.message}`);
  }

  return {
    siteName: 'Advancing Neuromorphic Computing, Together.',
    siteDescription: 'Open Neuromorphic is a global community fostering education, research, and open-source collaboration in brain-inspired AI and hardware.\n',
    logoPath: paramsConfig.logo,
    siteURL: siteConfig.baseURL || 'https://open-neuromorphic.org'
  };
}

async function getPaletteFromScss() {
  const palette = { ...DEFAULT_COLORS };
  try {
    if (!(await pathExists(CUSTOM_SCSS_PATH))) {
      console.warn(`⚠️ Custom SCSS file not found at ${CUSTOM_SCSS_PATH}. Using default colors.`);
      return palette;
    }
    const scssContent = await readFile(CUSTOM_SCSS_PATH, 'utf8');

    CSS_VARS_TO_EXTRACT.forEach(cssVarName => {
      const regex = new RegExp(`--${cssVarName}\\s*:\\s*([^;]+);`, 'm');
      const match = scssContent.match(regex);
      if (match && match[1]) {
        palette[cssVarName] = match[1].trim();
      }
    });
    return palette;
  } catch (err) {
    console.error(`❌ Error reading or parsing SCSS file ${CUSTOM_SCSS_PATH}: ${err.message}`);
    return palette;
  }
}

async function collectData() {
  console.log('📊 Starting OG image data collection...');
  await ensureDir(TMP_DIR);

  const hugoConfig = await getHugoSiteConfig();
  const colorPalette = await getPaletteFromScss();

  // --- MODIFIED LOGO LOGIC ---
  // Explicitly use assets/images/ONM-logo.png as the primary logo for OG images.
  let absoluteLogoPath = join(ASSETS_DIR, 'images', 'ONM-logo.png');
  
  if (!(await pathExists(absoluteLogoPath))) {
    console.warn(`⚠️ Preferred OG logo not found at ${absoluteLogoPath}. Falling back to config logo.`);
    // Fallback to the logo from hugo config if the primary one is missing
    if (hugoConfig.logoPath) {
      const pathInAssets = join(ASSETS_DIR, hugoConfig.logoPath);
      const pathInStatic = join(STATIC_DIR, hugoConfig.logoPath);
      if (await pathExists(pathInAssets)) {
        absoluteLogoPath = pathInAssets;
      } else if (await pathExists(pathInStatic)) {
        absoluteLogoPath = pathInStatic;
      } else {
        absoluteLogoPath = '';
      }
    } else {
      absoluteLogoPath = '';
    }
  }
  // --- END MODIFIED LOGO LOGIC ---
  
  const logoDataUri = await getImageDataUri(absoluteLogoPath);
  if (!logoDataUri) {
    console.error("❌ Could not generate a data URI for the logo. OG images will not have a logo.");
  }


  const outputData = {
    siteNameForDisplay: hugoConfig.siteName,
    logoDataUri: logoDataUri,
    colors: colorPalette,
    pages: [],
  };

  // 1. Add Homepage Data
  console.log('🏠 Processing Homepage...');
  if (hugoConfig.siteName && hugoConfig.siteDescription) {
    const homepageOgDir = join(STATIC_DIR, 'images');
    await ensureDir(homepageOgDir);
    outputData.pages.push({
      type: 'homepage',
      title: hugoConfig.siteName,
      description: hugoConfig.siteDescription,
      outputPath: join(homepageOgDir, `og-image.${OUTPUT_FORMAT}`),
      tempHtmlPath: join(TMP_DIR, `homepage-temp-og.html`),
      pageSpecificLogoUri: null
    });
    debugLog('Added homepage data.');
  }

  // 2. Process Content Pages
  console.log('📄 Processing content pages...');
  const markdownFiles = await findMarkdownFiles(CONTENT_ROOT_DIR);
  let processedCount = 0, skippedCount = 0;

  for (const mdFile of markdownFiles) {
    const pageDirectory = dirname(mdFile);
    const relativeMdPath = mdFile.replace(PROJECT_ROOT, '');

    try {
      const mdContent = await readFile(mdFile, 'utf8');
      const { title, description, isDraft, excludeSitemap, image: pageImage } = extractFrontMatter(mdContent);

      if (isDraft || excludeSitemap || !title || !description) {
        skippedCount++;
        continue;
      }

      let pageSpecificLogoUri = null;
      if (pageImage) {
        let imageFullPath = join(pageDirectory, pageImage); // Check in bundle first
        if (!(await pathExists(imageFullPath))) {
          const staticImageCand = join(STATIC_DIR, pageImage.startsWith('/') ? pageImage.substring(1) : pageImage);
          if (await pathExists(staticImageCand)) {
            imageFullPath = staticImageCand;
          } else {
            imageFullPath = null;
          }
        }
        if (imageFullPath) {
          pageSpecificLogoUri = await getImageDataUri(imageFullPath);
        }
      }

      const parentDirName = basename(pageDirectory);
      const ogImageFilename = `${parentDirName}-og.${OUTPUT_FORMAT}`;

      outputData.pages.push({
        type: 'content',
        sourceMdPath: mdFile,
        title: title,
        description: description,
        outputPath: join(pageDirectory, ogImageFilename),
        tempHtmlPath: join(TMP_DIR, `${parentDirName}-${Date.now()}-temp-og.html`),
        pageSpecificLogoUri: pageSpecificLogoUri
      });
      processedCount++;

    } catch (err) {
      console.error(`❌ Error processing ${relativeMdPath}: ${err.message}`);
      skippedCount++;
    }
  }

  // 3. Write JSON Output
  console.log(`💾 Writing data for ${outputData.pages.length} pages to ${OUTPUT_JSON_PATH}...`);
  await writeFile(OUTPUT_JSON_PATH, JSON.stringify(outputData, null, 2));
  console.log('✅ Data collection complete.');
  console.log(`📊 Processed ${processedCount} content pages, skipped ${skippedCount}.`);
}

(async () => {
  try {
    await collectData();
  } catch (err) {
    console.error("🔥 Uncaught error during data collection:", err);
    process.exit(1);
  }
})();
