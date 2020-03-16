let processPbs = function(results) {
  return new Promise(resolve => {
    const resultsJSON = eval(results);
    if (!Array.isArray(resultsJSON)) {
      throw new Error('"results" must be an array');
    }
    let severitiesCount = {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    };
    let filteredPbs = {};
    for (var i = 0, len = resultsJSON.length; i < len; i++) {
      const pb = resultsJSON[i];
      severitiesCount[pb.severity]++;
      if (!filteredPbs[pb.source]) {
        filteredPbs[pb.source] = [];
      }
      filteredPbs[pb.source].push(pb);
    }
    resolve({filteredPbs: filteredPbs, severitiesCount: severitiesCount});
    if (!results) {
      throw new Error('"results" must not be empty');
    }
  });
};

module.exports = processPbs;

