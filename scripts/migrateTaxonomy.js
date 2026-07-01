require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const { pathExists } = require('./lib/utils');

const CONTENT_ROOT = path.join(process.cwd(), 'content/neuromorphic-computing');
const SOFTWARE_ROOT = path.join(CONTENT_ROOT, 'software');
const HARDWARE_ROOT = path.join(CONTENT_ROOT, 'hardware');
const HACKING_HOURS_SRC = path.join(SOFTWARE_ROOT, 'hacking-hours');
const HACKING_HOURS_DEST = path.join(CONTENT_ROOT, 'hacking-hours');
const CATEGORY_MAP = { 'snn-frameworks': 'snn-framework', 'data-tools': 'data-tool' };
const WRITE = process.argv.includes('--write');

async function run() {
  const actions = [];
  const redirects = [];

  // 1. Software Backfill & Move
  for (const [folder, category] of Object.entries(CATEGORY_MAP)) {
    const dir = path.join(SOFTWARE_ROOT, folder);
    if (!(await pathExists(dir))) continue;

    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const slug = entry.name;
      const src = path.join(dir, slug);
      const dest = path.join(SOFTWARE_ROOT, slug);
      const indexPath = path.join(src, 'index.md');

      if (!(await pathExists(indexPath))) continue;

      const raw = await fs.readFile(indexPath, 'utf8');
      const parsed = matter(raw);
      parsed.data.category = category;

      actions.push({
        type: 'move_software',
        slug,
        src,
        dest,
        indexPath,
        content: matter.stringify(parsed.content, parsed.data)
      });

      redirects.push(`[[redirects]]\npath = "/neuromorphic-computing/software/${folder}/${slug}/"\ntarget = "https://open-neuromorphic.org/neuromorphic-computing/software/${slug}/"`);
    }
  }

  // Check collisions
  const seen = new Map();
  for (const a of actions) {
    if (a.type === 'move_software') {
      if (seen.has(a.slug)) throw new Error(`Slug collision: "${a.slug}" exists in multiple source folders. Fix manually before migrating.`);
      seen.set(a.slug, a.src);
    }
  }

  // 2. Hardware Backfill
  if (await pathExists(HARDWARE_ROOT)) {
    const entries = await fs.readdir(HARDWARE_ROOT, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const indexPath = path.join(HARDWARE_ROOT, entry.name, 'index.md');
      if (!(await pathExists(indexPath))) continue;

      const raw = await fs.readFile(indexPath, 'utf8');
      const parsed = matter(raw);

      if (!parsed.data.category) {
        parsed.data.category = 'uncategorized';
        actions.push({
          type: 'update_hardware',
          indexPath,
          content: matter.stringify(parsed.content, parsed.data)
        });
      }
    }
  }

  console.log(`Planned Actions: ${actions.length}`);
  actions.forEach(a => {
    if (a.type === 'move_software') console.log(` Move & Update: ${path.relative(process.cwd(), a.src)} -> ${path.relative(process.cwd(), a.dest)}`);
    if (a.type === 'update_hardware') console.log(` Update Hardware: ${path.relative(process.cwd(), a.indexPath)}`);
  });

  if (await pathExists(HACKING_HOURS_SRC)) {
    console.log(`Planned Hacking Hours Relocation: ${path.relative(process.cwd(), HACKING_HOURS_SRC)} -> ${path.relative(process.cwd(), HACKING_HOURS_DEST)}`);
  }

  if (!WRITE) {
    console.log('\nDry run only. Re-run with --write to apply.');
    return;
  }

  // Execute actions
  for (const a of actions) {
    if (a.type === 'move_software') {
      await fs.writeFile(a.indexPath, a.content);
      await fs.rename(a.src, a.dest);
    } else if (a.type === 'update_hardware') {
      await fs.writeFile(a.indexPath, a.content);
    }
  }

  // Move hacking hours
  if (await pathExists(HACKING_HOURS_SRC)) {
    await fs.rename(HACKING_HOURS_SRC, HACKING_HOURS_DEST);
  }

  // Clean up _index.md files and old folders
  for (const folder of Object.keys(CATEGORY_MAP)) {
    const indexFile = path.join(SOFTWARE_ROOT, folder, '_index.md');
    if (await pathExists(indexFile)) {
      await fs.unlink(indexFile);
    }
    try { await fs.rmdir(path.join(SOFTWARE_ROOT, folder)); } catch(e) { console.log(`Notice: Could not remove directory ${folder} (might not be empty).`); }
  }

  // Write redirects output snippet
  if (redirects.length > 0) {
    await fs.writeFile(path.join(process.cwd(), 'data/redirects-generated.toml'), redirects.join('\n\n') + '\n');
    console.log('Wrote data/redirects-generated.toml. Please manually review and merge this into data/redirects.toml.');
  }

  console.log('✅ Migration applied.');
}

run().catch(e => { console.error(e); process.exit(1); });
