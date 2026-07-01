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

  // 1. Software Tools Flattening & URL Pinning
  for (const [folder, category] of Object.entries(CATEGORY_MAP)) {
    const dir = path.join(SOFTWARE_ROOT, folder);
    if (!(await pathExists(dir))) continue;

    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const slug = entry.name;
        const src = path.join(dir, slug);
        const dest = path.join(SOFTWARE_ROOT, slug);
        const indexPath = path.join(src, 'index.md');

        if (!(await pathExists(indexPath))) continue;

        const raw = await fs.readFile(indexPath, 'utf8');
        const parsed = matter(raw);

        parsed.data.category = category;
        parsed.data.url = `/neuromorphic-computing/software/${folder}/${slug}/`;

        actions.push({ type: 'move_software', slug, src, dest, indexPath, content: matter.stringify(parsed.content, parsed.data) });
      } else if (entry.name === '_index.md') {
        // It's the landing page! Inject the category_id so it can query its children
        const indexPath = path.join(dir, '_index.md');
        const raw = await fs.readFile(indexPath, 'utf8');
        const parsed = matter(raw);
        parsed.data.category_id = category;
        actions.push({ type: 'update_file', indexPath, content: matter.stringify(parsed.content, parsed.data) });
      }
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
        actions.push({ type: 'update_file', indexPath, content: matter.stringify(parsed.content, parsed.data) });
      }
    }
  }

  // 3. Hacking Hours URL Pinning (Extracting it entirely)
  if (await pathExists(HACKING_HOURS_SRC)) {
    const entries = await fs.readdir(HACKING_HOURS_SRC, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const slug = entry.name;
        const indexPath = path.join(HACKING_HOURS_SRC, slug, 'index.md');
        if (await pathExists(indexPath)) {
          const raw = await fs.readFile(indexPath, 'utf8');
          const parsed = matter(raw);
          parsed.data.url = `/neuromorphic-computing/software/hacking-hours/${slug}/`;
          actions.push({ type: 'update_file', indexPath, content: matter.stringify(parsed.content, parsed.data) });
        }
      } else if (entry.name === '_index.md') {
        const indexPath = path.join(HACKING_HOURS_SRC, '_index.md');
        const raw = await fs.readFile(indexPath, 'utf8');
        const parsed = matter(raw);
        parsed.data.url = `/neuromorphic-computing/software/hacking-hours/`;
        actions.push({ type: 'update_file', indexPath, content: matter.stringify(parsed.content, parsed.data) });
      }
    }
  }

  if (!WRITE) {
    console.log(`Planned File Updates: ${actions.length}. Dry run only. Re-run with --write to apply.`);
    return;
  }

  // Execute writes first
  for (const a of actions) {
    if (a.type === 'update_file' || a.type === 'move_software') {
      await fs.writeFile(a.indexPath, a.content);
    }
  }

  // Execute moves (WITH FIX FOR ENOTEMPTY)
  for (const a of actions) {
    if (a.type === 'move_software') {
      await fs.rm(a.dest, { recursive: true, force: true });
      await fs.rename(a.src, a.dest);
    }
  }

  // Move hacking hours directory
  if (await pathExists(HACKING_HOURS_SRC)) {
    await fs.rm(HACKING_HOURS_DEST, { recursive: true, force: true });
    await fs.rename(HACKING_HOURS_SRC, HACKING_HOURS_DEST);
  }

  console.log('✅ Migration applied. Tools flattened, URLs pinned, Landing Pages preserved.');
}

run().catch(e => { console.error(e); process.exit(1); });
