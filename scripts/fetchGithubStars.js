require('dotenv').config(); // <-- ADD THIS LINE AT THE TOP
const fs = require('fs/promises');
const path = require('path');

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
    // Ignore errors for non-existent subdirectories (like data-tools)
    if (error.code !== 'ENOENT') {
      console.warn(`Could not read directory ${dir}: ${error.message}`);
    }
  }
  return markdownFiles;
}

function extractFrontMatter(content) {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return null;
  const frontMatter = match[1];
  const sourceCodeMatch = frontMatter.match(/source_code:\s*"?([^"\s]+)"?/);
  return sourceCodeMatch ? sourceCodeMatch[1] : null;
}

async function fetchStars() {
  console.log('Fetching GitHub stars...');
  const softwareDirs = (await fs.readdir(CONTENT_DIR, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(CONTENT_DIR, dirent.name));

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

  const fetchPromises = allSoftwareFiles.map(async (file) => {
    try {
      const content = await fs.readFile(file, 'utf8');
      const sourceUrl = extractFrontMatter(content);

      if (sourceUrl) {
        try {
          const parsedUrl = new URL(sourceUrl);
          // Securely check if the hostname is exactly 'github.com'
          if (parsedUrl.hostname === 'github.com') {
            // Extract path, remove leading '/' and optional '.git' suffix
            const repoPath = parsedUrl.pathname.substring(1).replace(/\.git$/, '');

            // Ensure the path looks like 'user/repo'
            if (repoPath.split('/').length === 2 && repoPath.split('/')[1] !== '') {
              const apiUrl = `https://api.github.com/repos/${repoPath}`;

              const response = await fetch(apiUrl, { headers });
              if (!response.ok) {
                console.warn(`Failed to fetch ${repoPath}: ${response.statusText}`);
                return;
              }
              const data = await response.json();
              if (data.stargazers_count !== undefined) {
                starsData[repoPath] = data.stargazers_count;
                console.log(`- Fetched ${data.stargazers_count} stars for ${repoPath}`);
              }
            }
          }
        } catch (e) {
          // Silently ignore invalid URLs, as they are not what we're looking for.
        }
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  });

  await Promise.all(fetchPromises);

  let existingData = {};
  try {
    existingData = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
  } catch (e) {
    // No existing data file, which is fine
  }

  const finalData = { ...existingData, ...starsData };

  await fs.writeFile(DATA_FILE, JSON.stringify(finalData, null, 2));
  console.log(`GitHub stars data saved to ${DATA_FILE}`);
}

fetchStars().catch(error => {
  console.error('An error occurred while fetching GitHub stars:', error);
  process.exit(1);
});
