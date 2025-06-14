const puppeteer = require('puppeteer');
const { join } = require('path');
const { readFile, writeFile, unlink, stat } = require('fs/promises');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'template.html');
const INPUT_JSON_PATH = join(TMP_DIR, 'ogImageData.json');
const JPEG_QUALITY = 90;

async function pathExists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function generateImages() {
  console.log('🖼️  Starting OG Image Generation with Puppeteer...');

  // --- Pre-flight checks ---
  if (!(await pathExists(INPUT_JSON_PATH))) {
    throw new Error(`❌ Data file not found: ${INPUT_JSON_PATH}. Run collect script first.`);
  }
  if (!(await pathExists(TEMPLATE_PATH))) {
    throw new Error(`❌ OG template not found: ${TEMPLATE_PATH}`);
  }

  // --- Read data and template ---
  const templateContent = await readFile(TEMPLATE_PATH, 'utf8');
  const jsonData = JSON.parse(await readFile(INPUT_JSON_PATH, 'utf8'));

  if (!jsonData || !jsonData.pages || jsonData.pages.length === 0) {
    console.warn('⚠️ No pages to process.');
    return;
  }

  // --- Launch Puppeteer ---
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successCount = 0;
  let errorCount = 0;

  // --- Process each page ---
  for (const pageData of jsonData.pages) {
    const { title, description, outputPath } = pageData;

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 630 });

      // Populate the template with page data
      const htmlContent = templateContent
        .replace('LOGO_SRC', jsonData.logoDataUri)
        .replace('BACKGROUND_URL', jsonData.backgroundDataUri || '')
        .replace('PAGE_TITLE', title)
        .replace('PAGE_DESCRIPTION', description);

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // Take the screenshot
      await page.screenshot({
        path: outputPath,
        type: 'jpeg',
        quality: JPEG_QUALITY,
      });

      const stats = await stat(outputPath);
      console.log(`✅ Generated: ${outputPath.replace(PROJECT_ROOT, '')} (${(stats.size / 1024).toFixed(1)} KB)`);
      successCount++;
      
      await page.close();
    } catch (err) {
      console.error(`❌ Failed generating image for: ${outputPath.replace(PROJECT_ROOT, '')}`);
      console.error(err.message || err);
      errorCount++;
    }
  }

  await browser.close();
  console.log(`\n✨ Generation complete! Succeeded: ${successCount}, Failed: ${errorCount}.`);
  if (errorCount > 0) process.exit(1);
}

generateImages().catch(err => {
  console.error("🔥 Uncaught error during image generation:", err);
  process.exit(1);
});