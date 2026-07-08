const { join, dirname, basename, sep } = require('path');
const { readFile, mkdir, writeFile } = require('fs/promises');
const mimeTypes = require('mime-types');
const crypto = require('crypto');
const matter = require('gray-matter');
const { pathExists, findMarkdownFiles } = require('./lib/utils');

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
  { width: 1200, height: 630, suffix: '16x9' },
  { width: 1200, height: 900, suffix: '4x3' },
  { width: 1080, height: 1080, suffix: '1x1' },
];
const EVENT_SIZE = { width: 1280, height: 1600, suffix: 'portrait' };

async function ensureDir(dirPath) {
  try { await mkdir(dirPath, { recursive: true }); }
  catch (err) { if (err.code !== 'EEXIST') throw err; }
}

function createHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function slugify(text) {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function parseFrontMatter(content) {
  try { return matter(content).data || {}; } catch(e) { return {}; }
}

async function getImageDataUri(filePath) {
  try {
    if (!filePath || !(await pathExists(filePath))) return null;
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
    if (fm.image) return join(contributorDir, fm.image);
  }
  return null;
}

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
    console.error(`❌ Critical: Could not load logo from ${absoluteLogoPath}.`);
    process.exit(1);
  }

  const outputData = {
    globalHash,
    logoDataUri,
    backgroundDataUri: await getImageDataUri(join(ASSETS_DIR, BACKGROUND_IMAGE_PATH_IN_ASSETS)) || '',
    pages: [],
  };

  const homepageOgDir = join(STATIC_DIR, 'images');
  await ensureDir(homepageOgDir);
  outputData.pages.push({
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    outputs: SIZES.map(s => ({ path: join(homepageOgDir, `og-image-${s.suffix}.${OUTPUT_FORMAT}`), width: s.width, height: s.height, template: 'default' })),
    finalHash: createHash(createHash(HOMEPAGE_TITLE + HOMEPAGE_DESCRIPTION) + globalHash)
  });

  const markdownFiles = await findMarkdownFiles(CONTENT_ROOT_DIR);
  for (const mdFile of markdownFiles) {
    const pageDirectory = dirname(mdFile);
    try {
      const fm = parseFrontMatter(await readFile(mdFile, 'utf8'));
      if (fm.draft || fm.exclude_sitemap || !fm.title || !fm.description) continue;

      const pathParts = join(dirname(mdFile), basename(mdFile)).replace(CONTENT_ROOT_DIR + sep, '').split(sep);
      let contentType = fm.type || (pathParts.length > 1 ? pathParts[0] : '');
      if (pathParts.includes('hacking-hours')) contentType = 'hacking-hours';
      if (pathParts.includes('student-talks')) contentType = 'student-talks';

      const isSingleEventPage = ['workshops', 'student-talks', 'hacking-hours'].includes(contentType) && basename(mdFile) === 'index.md';
      let pageOutputs = SIZES.map(s => ({ path: join(pageDirectory, `${basename(pageDirectory)}-og-${s.suffix}.${OUTPUT_FORMAT}`), width: s.width, height: s.height, template: 'default' }));
      let pageData = { title: fm.title, description: fm.description, outputs: pageOutputs };
      let contentToHash = fm.title + fm.description;

      if (isSingleEventPage) {
        const og16x9 = pageOutputs.find(o => o.path.endsWith('-og-16x9.jpg'));
        if (og16x9) { og16x9.template = 'youtube'; og16x9.width = 1280; og16x9.height = 720; }

        let isUpcoming = false;
        let eventDateStr = '';
        let eventTimeStr = '';

        if (fm.start_datetime) {
          const startDt = new Date(fm.start_datetime);
          const endDt = fm.end_datetime ? new Date(fm.end_datetime) : startDt;
          isUpcoming = endDt.getTime() > Date.now();

          if (isUpcoming) {
            eventDateStr = startDt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            // CHANGED: 12-hour format with AM/PM
            const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            const sTime = formatTime(startDt);
            const eTime = formatTime(endDt);

            let tz = fm.time_zone || "";
            if (!tz) {
              const match = fm.start_datetime.match(/([+-]\d{2}:\d{2}|Z)$/);
              tz = match ? match[1].replace('Z', 'UTC') : '';
            }

            eventTimeStr = sTime === eTime ? `${sTime} ${tz}`.trim() : `${sTime} - ${eTime} ${tz}`.trim();
          }
        } else {
          // Legacy string fallback format
          const fallbackEnd = fm.date ? new Date(fm.date) : new Date();
          if (fm.end_time) {
            const [hours, minutes] = fm.end_time.split(':');
            fallbackEnd.setHours(parseInt(hours, 10), parseInt(minutes, 10));
          }
          isUpcoming = fallbackEnd.getTime() > Date.now();

          if (isUpcoming) {
            eventDateStr = new Date(fm.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const sTime = fm.start_time || "00:00";
            const eTime = fm.end_time || sTime;
            const tz = fm.time_zone || "";
            eventTimeStr = sTime === eTime ? `${sTime} ${tz}`.trim() : `${sTime} - ${eTime} ${tz}`.trim();
          }
        }

        pageData.eventDate = eventDateStr;
        pageData.eventTime = eventTimeStr;
        pageData.speakers = [];

        if (Array.isArray(fm.author)) {
          for (const name of fm.author) {
            const imgPath = await getContributorImagePath(name);
            pageData.speakers.push({ name, imageUri: imgPath ? await getImageDataUri(imgPath) : null });
          }
        }
        if (isUpcoming) {
          pageOutputs.push({ path: join(pageDirectory, `${basename(pageDirectory)}-og-${EVENT_SIZE.suffix}.${OUTPUT_FORMAT}`), width: EVENT_SIZE.width, height: EVENT_SIZE.height, template: 'event' });
        }
        contentToHash += pageData.eventDate + pageData.eventTime + JSON.stringify(pageData.speakers);
      }
      pageData.finalHash = createHash(contentToHash + globalHash);
      outputData.pages.push(pageData);
    } catch (err) {
      console.error(`❌ Error processing ${mdFile}: ${err.message}`);
    }
  }

  await writeFile(OUTPUT_JSON_PATH, JSON.stringify(outputData, null, 2));
  console.log(`✅ Data for ${outputData.pages.length} pages collected.`);
}

collectData().catch(err => { console.error("🔥 Error:", err); process.exit(1); });
