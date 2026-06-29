const puppeteer = require('puppeteer');
const { join, base } = require('path');
const { readFile, writeFile, unlink, stat } = require('fs/promises');
const { pathExists } = require('./lib/utils');

const PROJECT_ROOT = process.cwd();
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const TEMPLATES = {
  default: join(PROJECT_ROOT, 'assets', 'og-template', 'template.html'),
  event: join(PROJECT_ROOT, 'assets', 'og-template', 'event-template.html'),
  youtube: join(PROJECT_ROOT, 'assets', 'og-template', 'youtube-thumbnail-template.html')
};
const INPUT_JSON_PATH = join(TMP_DIR, 'ogImageData.json');
const CACHE_MANIFEST_PATH = join(TMP_DIR, 'og-cache-manifest.json');

function escapeHtml(str) {
  return (str || "").toString().replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function buildSpeakerHtml(speakers, isYoutube) {
  const withPhotos = speakers.filter(s => s.imageUri);
  const withoutPhotos = speakers.filter(s => !s.imageUri);

  if (!isYoutube) {
    return speakers.map(s => `<div class="speaker-item">${s.imageUri ? `<img src="${s.imageUri}" class="speaker-img" />` : ''}<div class="speaker-name">${escapeHtml(s.name)}</div></div>`).join('');
  }

  let size = withPhotos.length > 6 ? '110px' : withPhotos.length > 4 ? '130px' : '160px';
  let font = withPhotos.length > 6 ? '18px' : withPhotos.length > 4 ? '20px' : '24px';

  let html = `<div class="speakers-container" style="gap: ${withPhotos.length > 4 ? '15px' : '25px'};">`;
  html += withPhotos.map(s => `<div class="speaker-item"><img src="${s.imageUri}" class="speaker-img" style="width: ${size}; height: ${size};"/><div class="speaker-name" style="font-size: ${font};">${escapeHtml(s.name)}</div></div>`).join('');
  html += `</div>`;

  if (withoutPhotos.length > 0) {
    html += `<div class="speakers-without-photos"><h3 class="other-speakers-title">${withPhotos.length > 0 ? 'With' : 'Speakers'}:</h3><ul class="other-speakers-list">${withoutPhotos.map(s => `<li>${escapeHtml(s.name)}</li>`).join('')}</ul></div>`;
  }
  return html;
}

async function generateImages() {
  console.log('🖼️ Starting OG Image Generation...');
  if (!(await pathExists(INPUT_JSON_PATH))) throw new Error('Data file missing.');

  const contents = {
    default: await readFile(TEMPLATES.default, 'utf8'),
    event: await readFile(TEMPLATES.event, 'utf8'),
    youtube: await readFile(TEMPLATES.youtube, 'utf8')
  };

  const jsonData = JSON.parse(await readFile(INPUT_JSON_PATH, 'utf8'));
  let oldCache = {};
  try { oldCache = JSON.parse(await readFile(CACHE_MANIFEST_PATH, 'utf8')); } catch (e) {}
  const newCache = {};

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  let successCount = 0, skippedCount = 0;

  for (const pData of jsonData.pages) {
    for (const out of pData.outputs || []) {
      if (await pathExists(out.path) && oldCache[out.path] === pData.finalHash) {
        skippedCount++; newCache[out.path] = pData.finalHash; continue;
      }

      await page.setViewport({ width: out.width, height: out.height });
      let html = contents[out.template]
        .replaceAll('LOGO_SRC', jsonData.logoDataUri)
        .replaceAll('BACKGROUND_URL', jsonData.backgroundDataUri || '')
        .replaceAll('PAGE_TITLE', escapeHtml(pData.title))
        .replaceAll('PAGE_DESCRIPTION', escapeHtml(pData.description || ''));

      if (out.template !== 'default') {
        html = html.replaceAll('<!-- SPEAKERS_HTML will be injected here -->', buildSpeakerHtml(pData.speakers || [], out.template === 'youtube'))
          .replaceAll('<!-- SPEAKER_IMAGES_HTML will be injected here -->', buildSpeakerHtml(pData.speakers || [], false))
          .replaceAll('EVENT_DATE', pData.eventDate || '')
          .replaceAll('EVENT_TIME', pData.eventTime || '');
      }

      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      await page.screenshot({ path: out.path, type: 'jpeg', quality: 90 });
      successCount++; newCache[out.path] = pData.finalHash;
    }
  }

  await browser.close();
  await writeFile(CACHE_MANIFEST_PATH, JSON.stringify(newCache, null, 2));
  console.log(`✨ Generated: ${successCount}, Skipped: ${skippedCount}.`);
}

generateImages().catch(err => { console.error("🔥 Error:", err); process.exit(1); });
