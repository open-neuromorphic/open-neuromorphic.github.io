// scripts/generateImagesFromData.js
const { join } = require('path');
const { readFile, writeFile, unlink, stat } = require('fs/promises');
const { execSync } = require('child_process');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const TMP_DIR = join(PROJECT_ROOT, 'tmp');
const BASE_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'base-template.html');
const OVERLAY_TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'text-overlay-template.html');
const INPUT_JSON_PATH = join(TMP_DIR, 'ogImageData.json');

const BASE_IMAGE_TMP_HTML = join(TMP_DIR, 'base-og-temp.html');
const BASE_IMAGE_OUTPUT_PATH = join(TMP_DIR, 'base-og.jpg');
const OUTPUT_FORMAT = 'jpg';
const JPEG_QUALITY = 95;

// --- Helper Functions ---
async function pathExists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function generateBaseImage(logoUri, backgroundUri) {
  console.log('🖼️  Generating base OG image...');
  if (!(await pathExists(BASE_TEMPLATE_PATH))) {
    throw new Error(`Base template not found: ${BASE_TEMPLATE_PATH}`);
  }
  const baseTemplateContent = await readFile(BASE_TEMPLATE_PATH, 'utf8');

  const htmlContent = baseTemplateContent
    .replace('LOGO_SRC', logoUri)
    .replace('BACKGROUND_URL', backgroundUri);

  await writeFile(BASE_IMAGE_TMP_HTML, htmlContent);

  const command = `wkhtmltoimage --enable-local-file-access --quality ${JPEG_QUALITY} --format ${OUTPUT_FORMAT} --width 1200 --height 630 "${BASE_IMAGE_TMP_HTML}" "${BASE_IMAGE_OUTPUT_PATH}"`;
  execSync(command, { stdio: 'pipe' });
  
  await unlink(BASE_IMAGE_TMP_HTML); // Clean up temp html
  console.log(`✅  Base OG image created at: ${BASE_IMAGE_OUTPUT_PATH}`);
  return `file://${BASE_IMAGE_OUTPUT_PATH}`;
}

// --- Main Image Generation Logic ---
async function generateImages() {
  console.log(`🖼️ Starting page-specific OG image generation...`);

  // --- Pre-flight checks ---
  if (!(await pathExists(INPUT_JSON_PATH))) {
    throw new Error(`❌ Data file not found: ${INPUT_JSON_PATH}. Run collect script first.`);
  }
  if (!(await pathExists(OVERLAY_TEMPLATE_PATH))) {
    throw new Error(`❌ Overlay template not found: ${OVERLAY_TEMPLATE_PATH}`);
  }
  try {
    execSync('wkhtmltoimage --version', { stdio: 'ignore' });
  } catch (e) {
    console.error("❌ wkhtmltoimage not found in PATH. Please install it.");
    process.exit(1);
  }

  // --- Read data and template ---
  const overlayTemplateContent = await readFile(OVERLAY_TEMPLATE_PATH, 'utf8');
  const jsonData = JSON.parse(await readFile(INPUT_JSON_PATH, 'utf8'));

  if (!jsonData || !jsonData.pages || jsonData.pages.length === 0) {
    console.warn('⚠️ No pages to process.');
    return;
  }
  
  // --- Generate the single base image first ---
  const baseImageFileUrl = await generateBaseImage(jsonData.logoDataUri, jsonData.backgroundDataUri);

  let successCount = 0;
  let errorCount = 0;

  // --- Process each page using the base image ---
  for (const pageData of jsonData.pages) {
    const { title, description, outputPath, tempHtmlPath } = pageData;

    try {
      const htmlContent = overlayTemplateContent
        .replace('BASE_IMAGE_URL', baseImageFileUrl)
        .replace('PAGE_TITLE', title)
        .replace('PAGE_DESCRIPTION', description);

      await writeFile(tempHtmlPath, htmlContent);

      const command = `wkhtmltoimage --enable-local-file-access --quality ${JPEG_QUALITY} --format ${OUTPUT_FORMAT} --width 1200 --height 630 "${tempHtmlPath}" "${outputPath}"`;
      execSync(command, { stdio: 'pipe' });
      
      const stats = await stat(outputPath);
      console.log(`✅ Generated: ${outputPath.replace(PROJECT_ROOT, '')} (${(stats.size / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed generating image for: ${outputPath.replace(PROJECT_ROOT, '')}`);
      console.error(err.stderr?.toString() || err.message || err);
      errorCount++;
    } finally {
      // Cleanup temporary HTML file
      if (await pathExists(tempHtmlPath)) {
        await unlink(tempHtmlPath);
      }
    }
  }

  console.log(`\n✨ Generation complete! Succeeded: ${successCount}, Failed: ${errorCount}.`);
  if (errorCount > 0) process.exit(1);
}

generateImages().catch(err => {
  console.error("🔥 Uncaught error during image generation:", err);
  process.exit(1);
});
