require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(process.cwd(), 'content', 'neuromorphic-computing', 'software');
const DATA_FILE = path.join(process.cwd(), 'data', 'github_stars.json');

async function findMarkdownFiles(dir) {
  let markdownFiles = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        markdownFiles = markdownFiles.concat(await findMarkdownFiles(fullPath));
      } else if (entry.name === 'index.md') {
        markdownFiles.push(fullPath);
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`Could not read directory ${dir}: ${error.message}`);
    }
  }
  return markdownFiles;
}

function extractFrontMatter(content) {
  try {
    const parsed = matter(content);
    return parsed.data.source_code || null;
  } catch(e) {
    return null;
  }
}

async function fetchStars() {
  console.log('Fetching GitHub stars...');

  let softwareDirs = [];
  try {
    softwareDirs = (await fs.readdir(CONTENT_DIR, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(CONTENT_DIR, dirent.name));
  } catch(e) {
    console.warn(`Could not read directory ${CONTENT_DIR}: ${e.message}`);
  }

  let allSoftwareFiles = [];
  for (const dir of softwareDirs) {
    allSoftwareFiles = allSoftwareFiles.concat(await findMarkdownFiles(dir));
  }

  const starsData = {};
  const token = process.env.GITHUB_TOKEN;
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  // Process sequentially to respect rate limits cleanly without complex batching libraries
  for (const file of allSoftwareFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const sourceUrl = extractFrontMatter(content);

      if (sourceUrl) {
        try {
          const parsedUrl = new URL(sourceUrl);
          if (parsedUrl.hostname === 'github.com') {
            const repoPath = parsedUrl.pathname.substring(1).replace(/\.git$/, '');
            if (repoPath.split('/').length === 2 && repoPath.split('/')[1] !== '') {
              const apiUrl = `https://api.github.com/repos/${repoPath}`;
              const response = await fetch(apiUrl, { headers });
              if (response.ok) {
                const data = await response.json();
                if (data.stargazers_count !== undefined) {
                  starsData[repoPath] = data.stargazers_count;
                  console.log(`- Fetched ${data.stargazers_count} stars for ${repoPath}`);
                }
              } else {
                console.warn(`Failed to fetch ${repoPath}: ${response.statusText}`);
              }
            }
          }
        } catch (e) {
          // Ignore invalid URLs
        }
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }

  let existingData = {};
  try {
    existingData = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
  } catch (e) {}

  const finalData = { ...existingData, ...starsData };

  await fs.writeFile(DATA_FILE, JSON.stringify(finalData, null, 2));
  console.log(`GitHub stars data saved to ${DATA_FILE}`);
}

fetchStars().catch(error => {
  console.error('An error occurred while fetching GitHub stars:', error);
  process.exit(0); // Exit 0 to avoid breaking builds due to external API failures
});
