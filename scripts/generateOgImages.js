// scripts/generateOgImages.js
const puppeteer = require('puppeteer');
const { join } = require('path');
const { readFile, writeFile, unlink, stat } = require('fs/promises');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'template.html');
const EVENT_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'event-template.html');
const YOUTUBE_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'youtube-thumbnail-template.html');
const INPUT_JSON_PATH = join(TMP_DIR, 'ogImageData.json');
const CACHE_MANIFEST_PATH = join(TMP_DIR, 'og-cache-manifest.json');
const JPEG_QUALITY = 90;

async function pathExists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function generateImages() {
  const startTime = Date.now();
  console.log('🖼️  Starting OG Image Generation with Caching...');

  // --- Pre-flight checks ---
  if (!(await pathExists(INPUT_JSON_PATH))) {
    throw new Error(`❌ Data file not found: ${INPUT_JSON_PATH}. Run collect script first.`);
  }
  if (!(await pathExists(TEMPLATE_PATH)) || !(await pathExists(EVENT_TEMPLATE_PATH)) || !(await pathExists(YOUTUBE_TEMPLATE_PATH))) {
    throw new Error(`❌ OG template(s) not found.`);
  }

  // --- Read data, templates, and cache manifest ---
  const defaultTemplateContent = await readFile(TEMPLATE_PATH, 'utf8');
  const eventTemplateContent = await readFile(EVENT_TEMPLATE_PATH, 'utf8');
  const youtubeTemplateContent = await readFile(YOUTUBE_TEMPLATE_PATH, 'utf8');
  const jsonData = JSON.parse(await readFile(INPUT_JSON_PATH, 'utf8'));

  let oldCache = {};
  try {
    oldCache = JSON.parse(await readFile(CACHE_MANIFEST_PATH, 'utf8'));
  } catch (e) {
    console.log('ℹ️ No existing cache manifest found. Will generate all images.');
  }

  const newCache = {};

  if (!jsonData || !jsonData.pages || jsonData.pages.length === 0) {
    console.warn('⚠️ No pages to process.');
    return;
  }

  // --- Launch Puppeteer and create ONE reusable page ---
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  // --- Process each page ---
  for (const pageData of jsonData.pages) {
    const { title, description, outputs, finalHash, eventDate, eventTime, speakers } = pageData;

    if (!outputs || outputs.length === 0) {
      console.warn(`⚠️ No outputs defined for page: ${title}`);
      continue;
    }

    // Process each output size for the current page
    for (const output of outputs) {
      const { path: outputPath, width, height, template } = output;

      try {
        const fileAlreadyExists = await pathExists(outputPath);
        const isCacheValid = oldCache[outputPath] === finalHash;

        if (fileAlreadyExists && isCacheValid) {
          skippedCount++;
          newCache[outputPath] = finalHash; // Keep valid entry
          continue;
        }

        await page.setViewport({ width, height });

        let htmlContent;
        if (template === 'event' || template === 'youtube') {
            let allSpeakers = speakers || [];
            let speakersWithPhotos = allSpeakers.filter(s => s.imageUri);
            let speakersWithoutPhotos = allSpeakers.filter(s => !s.imageUri);

            let speakersHtml;
            if (template === 'youtube') {
                const speakerCount = speakersWithPhotos.length;
                let speakerImgSize, speakerNameSize, speakerContainerGap;

                if (speakerCount > 6) {
                    speakerImgSize = '110px';
                    speakerNameSize = '18px';
                    speakerContainerGap = '10px';
                } else if (speakerCount > 4) {
                    speakerImgSize = '130px';
                    speakerNameSize = '20px';
                    speakerContainerGap = '15px';
                } else {
                    speakerImgSize = '160px';
                    speakerNameSize = '24px';
                    speakerContainerGap = '25px';
                }

                const photosHtml = speakersWithPhotos.map(speaker => `
                  <div class="speaker-item">
                    <img src="${speaker.imageUri}" class="speaker-img" alt="Photo of ${speaker.name}" style="width: ${speakerImgSize}; height: ${speakerImgSize};" />
                    <div class="speaker-name" style="font-size: ${speakerNameSize};">${speaker.name}</div>
                  </div>
                `).join('');

                let textHtml = '';
                if (speakersWithoutPhotos.length > 0) {
                    const otherSpeakersTitle = speakersWithPhotos.length > 0 ? 'With' : 'Speakers';
                    textHtml = `
                      <div class="speakers-without-photos">
                        <h3 class="other-speakers-title">${otherSpeakersTitle}:</h3>
                        <ul class="other-speakers-list">
                          ${speakersWithoutPhotos.map(s => `<li>${s.name}</li>`).join('')}
                        </ul>
                      </div>
                    `;
                }
                
                speakersHtml = `<div class="speakers-container" style="gap: ${speakerContainerGap};">${photosHtml}</div>${textHtml}`;

                htmlContent = youtubeTemplateContent
                  .replace('LOGO_SRC', jsonData.logoDataUri)
                  .replace('BACKGROUND_URL', jsonData.backgroundDataUri || '')
                  .replace('PAGE_TITLE', title)
                  .replace('<!-- SPEAKERS_HTML will be injected here -->', speakersHtml);

            } else { // 'event' template
                speakersHtml = allSpeakers.map(speaker => `
                  <div class="speaker-item">
                    ${speaker.imageUri ? `<img src="${speaker.imageUri}" class="speaker-img" alt="Photo of ${speaker.name}" />` : ''}
                    <div class="speaker-name">${speaker.name}</div>
                  </div>
                `).join('');

                htmlContent = eventTemplateContent
                  .replace('LOGO_SRC', jsonData.logoDataUri)
                  .replace('BACKGROUND_URL', jsonData.backgroundDataUri || '')
                  .replace('PAGE_TITLE', title)
                  .replace('PAGE_DESCRIPTION', description || '')
                  .replace('<!-- SPEAKER_IMAGES_HTML will be injected here -->', `<div class="speakers-container">${speakersHtml}</div>`)
                  .replace('EVENT_DATE', eventDate || '')
                  .replace('EVENT_TIME', eventTime || '');
            }
        } else { // 'default' template
            htmlContent = defaultTemplateContent
              .replace('LOGO_SRC', jsonData.logoDataUri)
              .replace('BACKGROUND_URL', jsonData.backgroundDataUri || '')
              .replace('PAGE_TITLE', title)
              .replace('PAGE_DESCRIPTION', description);
        }

        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

        await page.screenshot({
          path: outputPath,
          type: 'jpeg',
          quality: JPEG_QUALITY,
        });

        const stats = await stat(outputPath);
        console.log(`✅ Generated: ${outputPath.replace(PROJECT_ROOT, '')} (${width}x${height}, ${(stats.size / 1024).toFixed(1)} KB)`);
        successCount++;
        newCache[outputPath] = finalHash;

      } catch (err) {
        console.error(`❌ Failed generating image for: ${outputPath.replace(PROJECT_ROOT, '')}`);
        console.error(err.message || err);
        errorCount++;
      }
    }
  }

  await browser.close();

  const validOutputPaths = new Set();
  jsonData.pages.forEach(p => {
    if (p.outputs) {
      p.outputs.forEach(o => validOutputPaths.add(o.path));
    }
  });

  let cleanedCount = 0;
  for (const oldPath in oldCache) {
    if (!validOutputPaths.has(oldPath)) {
      if (await pathExists(oldPath)) {
        await unlink(oldPath);
        cleanedCount++;
      }
    }
  }
  if (cleanedCount > 0) {
      console.log(`🗑️  Cleaned up ${cleanedCount} stale OG image(s).`);
  }

  await writeFile(CACHE_MANIFEST_PATH, JSON.stringify(newCache, null, 2));

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✨ Generation complete in ${duration}s! Succeeded: ${successCount}, Skipped: ${skippedCount}, Failed: ${errorCount}.`);
  if (errorCount > 0) process.exit(1);
}

generateImages().catch(err => {
  console.error("🔥 Uncaught error during image generation:", err);
  process.exit(1);
});
