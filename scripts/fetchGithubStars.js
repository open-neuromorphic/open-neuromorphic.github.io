require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const { findMarkdownFiles, fetchGithubAPI } = require('./lib/utils');

const CONTENT_DIR = path.join(process.cwd(), 'content', 'neuromorphic-computing', 'software');
const DATA_FILE = path.join(process.cwd(), 'data', 'github_stars.json');

async function fetchStars() {
  console.log('Fetching GitHub stars...');
  let softwareDirs = (await fs.readdir(CONTENT_DIR, { withFileTypes: true })).filter(d => d.isDirectory()).map(d => path.join(CONTENT_DIR, d.name));

  let allSoftwareFiles = [];
  for (const dir of softwareDirs) allSoftwareFiles.push(...await findMarkdownFiles(dir));

  const starsData = {};
  const token = process.env.GITHUB_TOKEN || process.env.PAT_FOR_ISSUES;

  for (const file of allSoftwareFiles) {
    try {
      const parsed = matter(await fs.readFile(file, 'utf8'));
      if (parsed.data.source_code && new URL(parsed.data.source_code).hostname === 'github.com') {
        const repoPath = new URL(parsed.data.source_code).pathname.substring(1).replace(/\.git$/, '');
        if (repoPath.split('/').length === 2) {
          const data = await fetchGithubAPI(`https://api.github.com/repos/${repoPath}`, token);
          if (data && data.stargazers_count !== undefined) {
            starsData[repoPath] = data.stargazers_count;
            console.log(`- Fetched ${data.stargazers_count} stars for ${repoPath}`);
          }
        }
      }
    } catch (e) {}
  }

  let existingData = {};
  try { existingData = JSON.parse(await fs.readFile(DATA_FILE, 'utf8')); } catch (e) {}
  await fs.writeFile(DATA_FILE, JSON.stringify({ ...existingData, ...starsData }, null, 2));
  console.log(`Saved to ${DATA_FILE}`);
}

fetchStars().catch(err => process.exit(0));
