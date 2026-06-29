require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const toml = require('@iarna/toml');
const { fetchGithubAPI } = require('./lib/utils');

const TOML_PATH = path.join(process.cwd(), 'data', 'community_projects.toml');
const OUTPUT_JSON_PATH = path.join(process.cwd(), 'data', 'fetched_issues.json');
const GITHUB_TOKEN = process.env.PAT_FOR_ISSUES || process.env.GITHUB_TOKEN;
const ALLOWED_TAGS = new Set(['good first issue', 'documentation', 'bug', 'enhancement', 'testing']);

async function updateMissionBoard() {
  if (!GITHUB_TOKEN) return console.error('ERROR: Missing Token. Exiting.');
  const data = toml.parse(await fs.readFile(TOML_PATH, 'utf8'));
  const fetchedData = {};

  for (const project of data.projects || []) {
    if (!project.repo) continue;
    console.log(`- Fetching issues for ${project.repo}...`);
    try {
      let issues = await fetchGithubAPI(`https://api.github.com/repos/${project.repo}/issues?state=open&sort=created&direction=desc&per_page=3&labels=help%20wanted`, GITHUB_TOKEN);
      if (!issues || issues.length === 0) {
        issues = await fetchGithubAPI(`https://api.github.com/repos/${project.repo}/issues?state=open&sort=created&direction=desc&per_page=10`, GITHUB_TOKEN);
      }
      fetchedData[project.repo] = (issues || []).filter(i => !i.pull_request).slice(0, 3).map(i => ({
        title: i.title, url: i.html_url, tags: i.labels.map(l => l.name).filter(n => ALLOWED_TAGS.has(n.toLowerCase()))
      }));
    } catch (e) { console.error(`Failed ${project.repo}:`, e.message); }
  }
  await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(fetchedData, null, 2));
  console.log('✅ Mission board updated.');
}

updateMissionBoard().catch(e => process.exit(0));
