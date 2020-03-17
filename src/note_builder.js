const emojisMap = {
  '0': ':x:',
  '1': ':warning:',
  '2': ':information_source:',
  '3': ':eyes:'
};

let buildRelativeFilePath = (absFilePath, projectDir) => {
  return absFilePath.replace(projectDir + '/', '');
};

let buildNote = (pb, project, relativeFilePath) => {
  const line = pb.range.start.line + 1;
  const column = pb.range.start.character + 1;
  const link = project.githubURL + '/' + project.path + '/blob/' + project.branch + '/' + relativeFilePath + '#L' + line;
  return `|[${relativeFilePath}:${line}:${column}](${link})|${emojisMap[pb.severity]}|${pb.code}|${pb.message}|`;
};


let buildNotes = (pbs, project, absFilePath) => {
  const relativeFilePath = buildRelativeFilePath(absFilePath, project.buildDir);
  let md = `> ${relativeFilePath}

|Range|Severity|Code|Message|
|-----|--------|----|-------|
`
  for (var i = 0, len = pbs.length; i < len; i++) {
    md += buildNote(pbs[i], project, relativeFilePath) + '\n';
  }
  return md;
};

module.exports = {
  buildRelativeFilePath: buildRelativeFilePath,
  buildNote: buildNote,
  buildNotes: buildNotes
};
