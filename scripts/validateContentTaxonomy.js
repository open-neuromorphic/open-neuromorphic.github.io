require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const { findMarkdownFiles } = require('./lib/utils');

async function validate() {
  const swCatRaw = await fs.readFile(path.join(process.cwd(), 'data/taxonomies/software-categories.json'), 'utf8');
  const hwCatRaw = await fs.readFile(path.join(process.cwd(), 'data/taxonomies/hardware-categories.json'), 'utf8');
  const validSwCats = new Set(Object.keys(JSON.parse(swCatRaw)));
  const validHwCats = new Set(Object.keys(JSON.parse(hwCatRaw)));

  const files = await findMarkdownFiles(path.join(process.cwd(), 'content'));
  let errors = 0;

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const parsed = matter(content);
      if (!parsed.data) continue;

      const type = parsed.data.type;
      const cat = parsed.data.category;

      if (type === 'neuromorphic-software') {
        if (!cat) {
          console.error(`❌ [Missing Category] ${file}`);
          errors++;
        } else if (!validSwCats.has(cat)) {
          console.error(`❌ [Invalid Category] ${file}: "${cat}" is not in software-categories.json`);
          errors++;
        }
      } else if (type === 'neuromorphic-hardware') {
        if (!cat) {
          console.error(`❌ [Missing Category] ${file}`);
          errors++;
        } else if (!validHwCats.has(cat)) {
          console.error(`❌ [Invalid Category] ${file}: "${cat}" is not in hardware-categories.json`);
          errors++;
        }
      }
    } catch (e) {
      // ignore non-frontmatter files
    }
  }

  if (errors > 0) {
    console.error(`\nValidation failed with ${errors} error(s).`);
    process.exit(1);
  } else {
    console.log('✅ Taxonomy validation passed.');
  }
}

validate().catch(e => {
  console.error("🔥 Error executing validation:", e);
  process.exit(1);
});
