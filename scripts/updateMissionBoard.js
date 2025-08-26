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
  // Fetch the 3 most recently created open issues, regardless of labels.
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
    // Keep a copy of any issues manually defined in the TOML file.
    const manualIssues = project.issues || [];

    if (project.repo) {
      console.log(`- Fetching up to 3 of the latest open issues for ${project.repo}...`);
      const fetchedIssues = await fetchLatestIssuesForRepo(project.repo);
      console.log(`  Fetched ${fetchedIssues.length} issue(s) from GitHub.`);

      // Combine manually defined issues with freshly fetched ones, ensuring no duplicates.
      const combinedIssues = [];
      const seenUrls = new Set();

      // Add manual issues first to give them priority.
      for (const issue of manualIssues) {
        if (issue.url && !seenUrls.has(issue.url)) {
          combinedIssues.push(issue);
          seenUrls.add(issue.url);
        }
      }

      // Add newly fetched issues if they haven't already been added.
      for (const issue of fetchedIssues) {
        if (issue.url && !seenUrls.has(issue.url)) {
          combinedIssues.push(issue);
          seenUrls.add(issue.url);
        }
      }

      project.issues = combinedIssues;
      console.log(`  Total issues for ${project.name}: ${combinedIssues.length} (after deduplication).`);

    } else {
      console.log(`- Skipping ${project.name} (no 'repo' key). Manual issues will be preserved.`);
      // If no repo is specified, just keep the manually defined issues.
      project.issues = manualIssues;
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
