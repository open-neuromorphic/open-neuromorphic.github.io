// scripts/generateImagesFromData.js
const { join } = require('path');
const { readFile, writeFile, unlink, stat } = require('fs/promises');
const { execSync } = require('child_process');

// --- Configuration ---
const PROJECT_ROOT = process.cwd();
const TEMPLATE_PATH = join(PROJECT_ROOT, 'assets', 'og-template', 'template.html');
const INPUT_JSON_PATH = join(PROJECT_ROOT, 'tmp', 'ogImageData.json');
const DEBUG = false;
const DEFAULT_PRIMARY_COLOR = '#667eea';
const DEFAULT_TITLE_TEXT_COLOR = '#1f2937';
const DEFAULT_DESCRIPTION_TEXT_COLOR = '#4b5563';
const DEFAULT_BACKGROUND_COLOR = '#f9fafb';
const OUTPUT_FORMAT = 'jpg';
const JPEG_QUALITY = 95;

// --- Helper Functions ---
function debugLog(...messages) {
  if (DEBUG) console.log('[DEBUG generateImages]', ...messages);
}

async function pathExists(path) {
  try { await stat(path); return true; } catch (err) { return err.code !== 'ENOENT'; }
}

// --- Main Image Generation Logic ---
async function generateImages() {
  console.log(`🖼️ Starting OG image generation (Format: ${OUTPUT_FORMAT.toUpperCase()})...`);

  if (!(await pathExists(TEMPLATE_PATH))) { console.error(`❌ Template not found: ${TEMPLATE_PATH}`); process.exit(1); }
  if (!(await pathExists(INPUT_JSON_PATH))) { console.error(`❌ Data file not found: ${INPUT_JSON_PATH}`); process.exit(1); }
  try { execSync('wkhtmltoimage --version', { stdio: 'ignore' }); debugLog("wkhtmltoimage found."); }
  catch (e) { console.error("❌ wkhtmltoimage not found in PATH. Please install it."); process.exit(1); }

  let templateContent;
  let jsonData;
  try {
    templateContent = await readFile(TEMPLATE_PATH, 'utf8');
    const jsonFileContent = await readFile(INPUT_JSON_PATH, 'utf8');
    jsonData = JSON.parse(jsonFileContent);
    debugLog(`Successfully read template and parsed data for ${jsonData?.pages?.length || 0} pages.`);
  } catch (err) { console.error(`❌ Error reading template or JSON: ${err.message}`); process.exit(1); }

  let successCount = 0;
  let errorCount = 0;

  if (!jsonData || !jsonData.pages || jsonData.pages.length === 0) {
    console.warn('⚠️ No pages found in JSON data to process.');
    return;
  }

  const logoDataUri = jsonData.logoDataUri || '';
  const siteNameForDisplay = jsonData.siteNameForDisplay || 'Open Neuromorphic';

  // Get colors from JSON, with fallbacks
  const primaryColor = jsonData.colors?.['color-primary-new'] || DEFAULT_PRIMARY_COLOR;
  const titleTextColor = jsonData.colors?.['color-text-new'] || DEFAULT_TITLE_TEXT_COLOR;
  const descriptionTextColor = jsonData.colors?.['color-text-muted-new'] || DEFAULT_DESCRIPTION_TEXT_COLOR;
  const backgroundColor = jsonData.colors?.['color-background-new'] || DEFAULT_BACKGROUND_COLOR;


  debugLog(`Using Site Name for display: ${siteNameForDisplay}`);
  debugLog(`Using Primary Color: ${primaryColor}`);
  debugLog(`Using Title Text Color: ${titleTextColor}`);
  debugLog(`Using Description Text Color: ${descriptionTextColor}`);
  debugLog(`Using Background Color: ${backgroundColor}`);


  for (const pageData of jsonData.pages) {
    const { title, description, outputPath, tempHtmlPath, type } = pageData;
    const pageIdentifier = type === 'homepage' ? 'Homepage' : `Content (${outputPath.replace(PROJECT_ROOT, '')})`;

    if (!title || !description || !outputPath || !tempHtmlPath) {
      debugLog(`Skipping invalid page data for ${pageIdentifier}`);
      errorCount++;
      continue;
    }

    debugLog(`\nProcessing ${pageIdentifier}...`);
    debugLog(`  Output: ${outputPath}`);
    debugLog(`  Temp HTML: ${tempHtmlPath}`);

    try {
      const htmlContent = templateContent
        .replace('LOGO_SRC', logoDataUri)
        .replace(/PAGE_TITLE/g, title) // Use regex global for multiple occurrences if any
        .replace(/PAGE_DESCRIPTION/g, description)
        .replace(/SITE_NAME/g, siteNameForDisplay)
        .replace(/PRIMARY_COLOR_PLACEHOLDER/g, primaryColor)
        .replace(/TITLE_TEXT_COLOR_PLACEHOLDER/g, titleTextColor)
        .replace(/DESCRIPTION_TEXT_COLOR_PLACEHOLDER/g, descriptionTextColor)
        .replace(/BACKGROUND_COLOR_PLACEHOLDER/g, backgroundColor);


      debugLog(`  Writing temp HTML...`);
      await writeFile(tempHtmlPath, htmlContent);

      const command = `wkhtmltoimage --enable-local-file-access --quality ${JPEG_QUALITY} --format ${OUTPUT_FORMAT} --width 1200 --height 630 "${tempHtmlPath}" "${outputPath}"`;
      debugLog(`  Executing: ${command}`);
      execSync(command, { stdio: 'pipe' });

      try {
        const stats = await stat(outputPath);
        const fileSizeKB = (stats.size / 1024).toFixed(1);
        console.log(`✅ Generated OG image for: ${pageIdentifier} (${fileSizeKB} KB)`);
      } catch(statErr) {
        console.log(`✅ Generated OG image for: ${pageIdentifier} (size check failed)`);
      }
      successCount++;

      debugLog(`  Removing temp file: ${tempHtmlPath}`);
      await unlink(tempHtmlPath);

    } catch (err) {
      console.error(`❌ Failed generating image for ${pageIdentifier}:`, err.stderr?.toString() || err.message || err);
      debugLog('Full error object:', err);
      errorCount++;
      if (await pathExists(tempHtmlPath)) {
        try { await unlink(tempHtmlPath); } catch (cleanupErr) { debugLog(`Failed to clean up temp file ${tempHtmlPath} after error.`); }
      }
    }
  }

  console.log('\n✨ Image generation process complete!');
  console.log(`📊 Summary: ${successCount} generated, ${errorCount} errors.`);
  if (errorCount > 0) {
    process.exitCode = 1;
  }
}

// --- Execution ---
generateImages().catch(err => {
  console.error("🔥 Uncaught error during image generation:", err);
  process.exit(1);
});
