// scripts/generateImagesFromData.js
const { join } = require('path');
const { readFile, writeFile, unlink, stat } = require('fs/promises');
const { execSync } = require('child_process');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'template.html');
const INPUT_JSON_PATH = join(PROJECT_ROOT, 'tmp', 'ogImageData.json');
const OUTPUT_FORMAT = 'jpg';
const JPEG_QUALITY = 95;

// --- Helper Functions ---
async function pathExists(path) {
  try { await stat(path); return true; } catch { return false; }
}

// --- Main Image Generation Logic ---
async function generateImages() {
  console.log(`🖼️ Starting OG image generation...`);

  // --- Pre-flight checks ---
  if (!(await pathExists(TEMPLATE_PATH))) {
    console.error(`❌ Template not found: ${TEMPLATE_PATH}`);
    process.exit(1);
  }
  if (!(await pathExists(INPUT_JSON_PATH))) {
    console.error(`❌ Data file not found: ${INPUT_JSON_PATH}. Run collect script first.`);
    process.exit(1);
  }
  try {
    execSync('wkhtmltoimage --version', { stdio: 'ignore' });
  } catch (e) {
    console.error("❌ wkhtmltoimage not found in PATH. Please install it.");
    process.exit(1);
  }

  // --- Read data and template ---
  const templateContent = await readFile(TEMPLATE_PATH, 'utf8');
  const jsonData = JSON.parse(await readFile(INPUT_JSON_PATH, 'utf8'));

  if (!jsonData || !jsonData.pages || jsonData.pages.length === 0) {
    console.warn('⚠️ No pages to process.');
    return;
  }

  let successCount = 0;
  let errorCount = 0;
  const logoDataUri = jsonData.logoDataUri || '';
  const backgroundDataUri = jsonData.backgroundDataUri || '';

  // --- Process each page ---
  for (const pageData of jsonData.pages) {
    const { title, description, outputPath, tempHtmlPath } = pageData;

    try {
      const htmlContent = templateContent
        .replace('LOGO_SRC', logoDataUri)
        .replace('BACKGROUND_URL', backgroundDataUri) // Using BACKGROUND_URL placeholder now
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
