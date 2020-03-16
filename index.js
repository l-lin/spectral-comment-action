const core = require('@actions/core');
const github = require('@actions/github');
const toMarkdown = require('./to_markdown');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const context = github.context;
    if (!context.payload.pull_request) {
      core.error('this action only works on pull_request events');
      core.setOutput('comment-created', 'false');
      return;
    }

    const repoName = context.repo.repo;
    const repoOwner = context.repo.owner;
    const githubToken = core.getInput('github-token');
    const githubClient = new github.GitHub(githubToken);
    const prNumber = context.payload.pull_request.number;
    const lintResults = core.getInput('spectral-lint-results');
    const githubURL = core.getInput('github-url');
    const project = {
      githubURL: githubURL,
      path: process.env.GITHUB_REPOSITORY,
      branch: process.env.GITHUB_REF,
      buildDir: process.env.GITHUB_WORKSPACE
    };

    const md = await toMarkdown(lintResults, project);
    await githubClient.issues.createComment({
      repo: repoName,
      owner: repoOwner,
      body: md,
      issue_number: prNumber,
    });
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
