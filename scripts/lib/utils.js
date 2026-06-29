const { stat, readdir } = require('fs/promises');
const { join } = require('path');

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function findMarkdownFiles(dir) {
  let files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await findMarkdownFiles(fullPath));
      } else if (entry.name === 'index.md' || entry.name === '_index.md') {
        files.push(fullPath);
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') console.warn(`Could not read directory ${dir}: ${error.message}`);
  }
  return files;
}

async function fetchGithubAPI(url, token) {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (token) headers['Authorization'] = `token ${token}`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`API fetch failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

module.exports = { pathExists, findMarkdownFiles, fetchGithubAPI };
