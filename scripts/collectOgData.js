// scripts/collectOgData.js
const { join, dirname, basename, sep } = require('path');
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
const EVENT_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'event-template.html');
const YOUTUBE_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'youtube-thumbnail-template.html');
const HOMEPAGE_TITLE = "Advancing Neuromorphic Computing, Together.";
const HOMEPAGE_DESCRIPTION = "Open Neuromorphic (ONM) is a global community fostering education, research, and open-source collaboration in brain-inspired AI and hardware.";
const SIZES = [
  { width: 1200, height: 630, suffix: '16x9' }, // Standard OG 1.91:1
  { width: 1200, height: 900, suffix: '4x3' },
  { width: 1080, height: 1080, suffix: '1x1' },
];
const EVENT_SIZE = { width: 1280, height: 1600, suffix: 'portrait' }; // New dimensions for upcoming events

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

function slugify(text) {
  if (!text) return '';
  // This mimics Hugo's `urlize` function more closely for consistency.
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars except -
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
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

function parseFrontMatter(content) {
  const fmMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!fmMatch) return {};

  const data = {};
  const lines = fmMatch[1].split('\n');
  let currentKey = '';
  let inArray = false;

  for (const line of lines) {
    const arrayItemMatch = line.match(/^\s*-\s*"?([^"#]*)"?\s*(#.*)?$/);
    if (inArray && arrayItemMatch) {
      data[currentKey].push(arrayItemMatch[1].trim().replace(/^['"]|['"]$/g, ''));
      continue;
    }

    const keyMatch = line.match(/^([a-zA-Z0-9_]+):/);
    if (keyMatch) {
      inArray = false;
    }

    const simpleMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)/);
    if (simpleMatch) {
      currentKey = simpleMatch[1].trim();
      let valueString = simpleMatch[2].trim();
      inArray = false;

      const commentIndex = valueString.indexOf('#');
      if (commentIndex > -1) {
        valueString = valueString.substring(0, commentIndex).trim();
      }

      let value = valueString;

      if (value === '') {
        if (line.includes(':')) {
          inArray = true;
          data[currentKey] = [];
        }
        continue;
      }

      if (value === 'true') data[currentKey] = true;
      else if (value === 'false') data[currentKey] = false;
      else if (value.startsWith('[') && value.endsWith(']')) {
        data[currentKey] = value.replace(/[\[\]"]/g, '').split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      } else {
        data[currentKey] = value.replace(/^['"]|['"]$/g, '');
      }
    }
  }
  return data;
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

async function getContributorImagePath(authorName) {
  if (!authorName) return null;
  const slug = slugify(authorName);
  const contributorDir = join(CONTENT_ROOT_DIR, 'contributors', slug);
  const mdPath = join(contributorDir, 'index.md');

  if (await pathExists(mdPath)) {
    const content = await readFile(mdPath, 'utf8');
    const fm = parseFrontMatter(content);
    if (fm.image) {
      return join(contributorDir, fm.image);
    }
  }
  return null;
}

// --- Main Script ---
async function collectData() {
  console.log('📊 Collecting OG image data and calculating hashes...');
  await ensureDir(TMP_DIR);

  const templateBuffer = await readFile(OG_TEMPLATE_PATH);
  const eventTemplateBuffer = await readFile(EVENT_TEMPLATE_PATH);
  const youtubeTemplateBuffer = await readFile(YOUTUBE_TEMPLATE_PATH);
  const logoBuffer = await readFile(join(ASSETS_DIR, LOGO_PATH_IN_ASSETS));
  const backgroundBuffer = await readFile(join(ASSETS_DIR, BACKGROUND_IMAGE_PATH_IN_ASSETS));
  const globalHash = createHash(Buffer.concat([templateBuffer, eventTemplateBuffer, youtubeTemplateBuffer, logoBuffer, backgroundBuffer]));

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
    template: 'default'
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
      const fm = parseFrontMatter(mdContent);
      const { title, description, draft, exclude_sitemap, upcoming, author, date, start_time, end_time, time_zone } = fm;

      if (draft || exclude_sitemap || !title || !description) {
        continue;
      }

      const relativePath = join(dirname(mdFile), basename(mdFile)).replace(CONTENT_ROOT_DIR + sep, '');
      const pathParts = relativePath.split(sep);
      const section = pathParts.length > 1 ? pathParts[0] : '';
      const isSinglePage = basename(mdFile) === 'index.md';

      let contentType = fm.type || section;
      if (pathParts.includes('hacking-hours')) contentType = 'hacking-hours';
      if (pathParts.includes('student-talks')) contentType = 'student-talks';

      const isEventCategory = ['workshops', 'student-talks', 'hacking-hours'].includes(contentType);
      const isSingleEventPage = isEventCategory && isSinglePage;

      let pageOutputs = SIZES.map(size => ({
        path: join(pageDirectory, `${basename(pageDirectory)}-og-${size.suffix}.${OUTPUT_FORMAT}`),
        width: size.width,
        height: size.height,
        template: 'default'
      }));

      let contentToHash = title + description;
      let pageData = { title, description, outputs: pageOutputs };

      if (isSingleEventPage) {
        const og16x9Output = pageOutputs.find(o => o.path.endsWith('-og-16x9.jpg'));
        if (og16x9Output) {
          og16x9Output.template = 'youtube';
          og16x9Output.width = 1280;
          og16x9Output.height = 720;
        }

        const isUpcomingEvent = upcoming === true;
        pageData.eventDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        pageData.eventTime = isUpcomingEvent ? `${start_time} - ${end_time} ${time_zone}` : '';

        let speakers = [];
        if (author && Array.isArray(author)) {
          for (const name of author) {
            const imgPath = await getContributorImagePath(name);
            const dataUri = imgPath ? await getImageDataUri(imgPath) : null;
            speakers.push({ name: name, imageUri: dataUri });
          }
        }
        pageData.speakers = speakers;

        if (isUpcomingEvent) {
          pageOutputs.push({
            path: join(pageDirectory, `${basename(pageDirectory)}-og-${EVENT_SIZE.suffix}.${OUTPUT_FORMAT}`),
            width: EVENT_SIZE.width,
            height: EVENT_SIZE.height,
            template: 'event'
          });
        }

        contentToHash += pageData.eventDate + pageData.eventTime + JSON.stringify(speakers);
      }

      const finalHash = createHash(contentToHash + globalHash);
      pageData.finalHash = finalHash;

      outputData.pages.push(pageData);

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
