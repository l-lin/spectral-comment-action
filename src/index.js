const core = require('@actions/core');
const github = require('@actions/github');
const readFilesToAnalyze = require('./read_files');
const { initProcessedPbs, processPbs } = require('./process_pbs');
const { runSpectral, createSpectral } = require('./spectral');
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

    const inputs = {
      githubToken: core.getInput('github-token'),
      fileGlob: core.getInput('file-glob'),
      spectralRuleset: core.getInput('spectral-ruleset'),
      githubURL: core.getInput('github-url')
    };
    const project = {
      githubURL: inputs.githubURL,
      repository: process.env.GITHUB_REPOSITORY,
      headRef: process.env.GITHUB_HEAD_REF,
      workspace: process.env.GITHUB_WORKSPACE
    };

    const fileContents = await readFilesToAnalyze(project.workspace, inputs.fileGlob);
    const spectral = await createSpectral(inputs.spectralRuleset);
    let processedPbs = initProcessedPbs();
    for (var i = 0, len = fileContents.length; i < len; i++) {
      const pbs = await runSpectral(spectral, fileContents[i].content);
      processedPbs = processPbs(fileContents[i].file, processedPbs, pbs);
    }

    const md = await toMarkdown(processedPbs, project);

    if (md === '') {
      core.info('No lint error found! Congratulation!');
    } else {
      const octokit = new github.GitHub(inputs.githubToken);
      const repoName = context.repo.repo;
      const repoOwner = context.repo.owner;
      const prNumber = context.payload.pull_request.number;
      await octokit.issues.createComment({
        repo: repoName,
        owner: repoOwner,
        body: md,
        issue_number: prNumber,
      });
      if (processedPbs.severitiesCount[0] > 0) {
        core.setFailed('There are ' + processedPbs.severitiesCount[0] + ' lint errors!');
      }
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
