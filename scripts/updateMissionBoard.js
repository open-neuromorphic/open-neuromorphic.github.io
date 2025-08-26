// scripts/updateMissionBoard.js
require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const toml = require('@iarna/toml');

const TOML_PATH = path.join(process.cwd(), 'data', 'community_projects.toml');
const GITHUB_TOKEN = process.env.PAT_FOR_ISSUES;

if (!GITHUB_TOKEN) {
  console.error('ERROR: PAT_FOR_ISSUES environment variable is not set.');
  process.exit(1);
}

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': `token ${GITHUB_TOKEN}`,
};

async function fetchLatestIssuesForRepo(repo) {
  // Fetch the 3 most recently created open issues.
  const url = `https://api.github.com/repos/${repo}/issues?state=open&sort=created&direction=desc&per_page=3`;
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      console.error(`Failed to fetch issues for ${repo}: ${response.statusText}`);
      return [];
    }
    const issues = await response.json();
    // Map the API response to the format needed in our TOML file
    return issues.map(issue => ({
      title: issue.title,
      url: issue.html_url,
      tags: issue.labels.map(l => l.name),
    }));
  } catch (error) {
    console.error(`Error fetching issues for ${repo}:`, error);
    return [];
  }
}

async function updateMissionBoard() {
  console.log('Starting mission board update...');

  const tomlContent = await fs.readFile(TOML_PATH, 'utf8');
  const data = toml.parse(tomlContent);

  if (!data.projects || !Array.isArray(data.projects)) {
    console.error('TOML file is not structured as expected. Missing [[projects]] array.');
    return;
  }

  for (const project of data.projects) {
    if (project.repo) {
      console.log(`- Fetching latest 3 open issues for ${project.repo}...`);
      const issues = await fetchLatestIssuesForRepo(project.repo);
      project.issues = issues;
      console.log(`  Found ${issues.length} open issue(s).`);
    } else {
      console.log(`- Skipping ${project.name} (missing 'repo' key).`);
      // Ensure 'issues' is an empty array if not fetched, to avoid stale data
      project.issues = [];
    }
  }

  const newTomlContent = toml.stringify(data);
  await fs.writeFile(TOML_PATH, newTomlContent);

  console.log('✅ Mission board update complete. File data/community_projects.toml has been overwritten.');
}

updateMissionBoard().catch(error => {
  console.error('A critical error occurred during the mission board update:', error);
  process.exit(1);
});
