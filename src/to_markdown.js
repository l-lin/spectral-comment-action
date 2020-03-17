const { buildNotes } = require('./note_builder');

let toMarkdown = async (processedPbs, project) => {
  const pbsMap = processedPbs.filteredPbs;
  // no pb => no message
  if (Object.keys(pbsMap).length === 0) {
    return '';
  }
  const severitiesCount = processedPbs.severitiesCount;
  const nbErrors = severitiesCount[0];
  const nbWarnings = severitiesCount[1];
  const nbInfos = severitiesCount[2];
  const nbHints = severitiesCount[3];
  const nbPbs = nbErrors + nbWarnings + nbInfos + nbHints;
  let md = `<details>
<summary>OpenAPI lint errors: ${nbPbs} problems (${nbErrors} errors, ${nbWarnings} warnings, ${nbInfos} infos, ${nbHints} hints)</summary>

`;
  for (let absFilePath in pbsMap) {
    if (Object.prototype.hasOwnProperty.call(pbsMap, absFilePath)) {
      const pbs = pbsMap[absFilePath];
      md += buildNotes(pbs, project, absFilePath);
      md += '\n';
    }
  }
  md += `</details>`;
  return md;
};

module.exports = toMarkdown;
