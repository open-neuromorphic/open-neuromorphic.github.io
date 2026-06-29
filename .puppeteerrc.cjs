const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Configures Puppeteer to download browsers into the local project workspace
  // instead of the global ~/.cache/puppeteer directory. This completely bypasses
  // corrupted global cache issues in CI/CD runner environments like GitHub Actions.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
