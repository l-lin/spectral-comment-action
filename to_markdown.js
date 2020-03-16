const processPbs = require('./process_pbs');
const { buildNotes } = require('./note_builder');

let toMarkdown = async function(results, project) {
  let processedPbs = await processPbs(results);
  return new Promise(resolve => {
    const pbsMap = processedPbs.filteredPbs;
    // no pb => no message
    if (Object.keys(pbsMap).length === 0) {
      resolve('');
      return;
    }
    const nbPbs = processedPbs.filteredPbs.length;
    const severitiesCount = processedPbs.severitiesCount;
    const nbErrors = severitiesCount[0];
    const nbWarnings = severitiesCount[1];
    const nbInfos = severitiesCount[2];
    const nbHints = severitiesCount[3];
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
    resolve(md);
  });
};

module.exports = toMarkdown;
