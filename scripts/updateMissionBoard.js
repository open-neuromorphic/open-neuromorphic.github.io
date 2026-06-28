require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const toml = require('@iarna/toml');

const TOML_PATH = path.join(process.cwd(), 'data', 'community_projects.toml');
const OUTPUT_JSON_PATH = path.join(process.cwd(), 'data', 'fetched_issues.json');
const GITHUB_TOKEN = process.env.PAT_FOR_ISSUES;

if (!GITHUB_TOKEN) {
  console.error('ERROR: PAT_FOR_ISSUES environment variable is not set. Exiting without updates.');
  process.exit(0);
}

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': `token ${GITHUB_TOKEN}`,
};

const ALLOWED_TAGS = new Set(['good first issue', 'documentation', 'bug', 'enhancement', 'testing']);

async function fetchLatestIssuesForRepo(repo) {
  const HELP_WANTED_LABEL = 'help wanted';
  let issues = [];

  const helpWantedUrl = `https://api.github.com/repos/${repo}/issues?state=open&sort=created&direction=desc&per_page=3&labels=${encodeURIComponent(HELP_WANTED_LABEL)}`;

  try {
    const response = await fetch(helpWantedUrl, { headers });
    if (response.ok) {
      const fetchedIssues = await response.json();
      issues = fetchedIssues.filter(item => !item.pull_request);
    } else if (response.status !== 404) {
      console.warn(`Could not fetch 'help wanted' issues for ${repo}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error fetching 'help wanted' issues for ${repo}:`, error);
  }

  if (issues.length > 0) {
    console.log(`  Found ${issues.length} 'help wanted' issue(s) for ${repo}.`);
  } else {
    const generalUrl = `https://api.github.com/repos/${repo}/issues?state=open&sort=created&direction=desc&per_page=10`;
    try {
      const response = await fetch(generalUrl, { headers });
      if (response.ok) {
        const generalIssues = await response.json();
        issues = generalIssues.filter(item => !item.pull_request).slice(0, 3);
      } else {
        console.warn(`Could not fetch general issues for ${repo}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching general issues for ${repo}:`, error);
    }
  }

  return issues.map(issue => ({
    title: issue.title,
    url: issue.html_url,
    tags: issue.labels
      .map(l => l.name)
      .filter(name => ALLOWED_TAGS.has(name.toLowerCase())),
  }));
}

async function updateMissionBoard() {
  console.log('Starting mission board update...');

  try {
    const tomlContent = await fs.readFile(TOML_PATH, 'utf8');
    const data = toml.parse(tomlContent);
    const fetchedData = {};

    if (!data.projects || !Array.isArray(data.projects)) {
      console.error('TOML file is not structured as expected.');
      process.exit(0);
    }

    for (const project of data.projects) {
      if (project.repo) {
        console.log(`- Fetching up to 3 of the latest open issues for ${project.repo}...`);
        const fetchedIssues = await fetchLatestIssuesForRepo(project.repo);
        console.log(`  Fetched ${fetchedIssues.length} issue(s) from GitHub.`);
        fetchedData[project.repo] = fetchedIssues;
      }
    }

    await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(fetchedData, null, 2));
    console.log('✅ Mission board update complete. File data/fetched_issues.json has been written.');

  } catch (e) {
    console.error('A critical error occurred during the mission board update:', e);
    process.exit(0); // Exit 0 to avoid breaking builds due to external API failures
  }
}

updateMissionBoard();
