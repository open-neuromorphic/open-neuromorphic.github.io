// scripts/generateOgImages.js
const puppeteer = require('puppeteer');
const { join } = require('path');
const { readFile, writeFile, unlink, stat } = require('fs/promises');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'template.html');
const EVENT_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'event-template.html');
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
  if (!(await pathExists(TEMPLATE_PATH)) || !(await pathExists(EVENT_TEMPLATE_PATH))) {
    throw new Error(`❌ OG template(s) not found.`);
  }

  // --- Read data, templates, and cache manifest ---
  const defaultTemplateContent = await readFile(TEMPLATE_PATH, 'utf8');
  const eventTemplateContent = await readFile(EVENT_TEMPLATE_PATH, 'utf8');
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

        // Reuse the single page
        await page.setViewport({ width, height });

        let htmlContent;
        if (template === 'event') {
          const speakersHtml = (speakers || [])
            .map(speaker => `
                <div class="speaker-item" style="width: ${
              speaker.count === 1 ? '42vmin' :
                speaker.count === 2 ? '32vmin' :
                  speaker.count === 3 ? '27vmin' :
                    speaker.count >= 4 && speaker.count <= 6 ? '24vmin' :
                      '20vmin'
            };">
                  ${speaker.imageUri ? `<img src="${speaker.imageUri}" class="speaker-img" alt="Photo of ${speaker.name}" style="width: 100%; height: 100%;" />` : ''}
                  <div class="speaker-name">${speaker.name}</div>
                </div>
              `)
            .join('');

          htmlContent = eventTemplateContent
            .replace('LOGO_SRC', jsonData.logoDataUri)
            .replace('BACKGROUND_URL', jsonData.backgroundDataUri || '')
            .replace('PAGE_TITLE', title)
            .replace('<!-- SPEAKER_IMAGES_HTML will be injected here -->', speakersHtml)
            .replace('EVENT_DATE', eventDate || '')
            .replace('EVENT_TIME', eventTime || '');
        } else {
          htmlContent = defaultTemplateContent
            .replace('LOGO_SRC', jsonData.logoDataUri)
            .replace('BACKGROUND_URL', jsonData.backgroundDataUri || '')
            .replace('PAGE_TITLE', title)
            .replace('PAGE_DESCRIPTION', description);
        }

        // Use 'domcontentloaded' for faster processing
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

        await page.screenshot({
          path: outputPath,
          type: 'jpeg',
          quality: JPEG_QUALITY,
        });

        const stats = await stat(outputPath);
        console.log(`✅ Generated: ${outputPath.replace(PROJECT_ROOT, '')} (${width}x${height}, ${(stats.size / 1024).toFixed(1)} KB)`);
        successCount++;
        newCache[outputPath] = finalHash; // Add new entry to cache

      } catch (err) {
        console.error(`❌ Failed generating image for: ${outputPath.replace(PROJECT_ROOT, '')}`);
        console.error(err.message || err);
        errorCount++;
      }
    }
  }

  await browser.close();

  // --- Cleanup stale images and cache entries ---
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

  // --- Write the new cache manifest ---
  await writeFile(CACHE_MANIFEST_PATH, JSON.stringify(newCache, null, 2));

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✨ Generation complete in ${duration}s! Succeeded: ${successCount}, Skipped: ${skippedCount}, Failed: ${errorCount}.`);
  if (errorCount > 0) process.exit(1);
}

generateImages().catch(err => {
  console.error("🔥 Uncaught error during image generation:", err);
  process.exit(1);
});
