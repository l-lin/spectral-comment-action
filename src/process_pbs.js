let initProcessedPbs = () => {
  return {
    filteredPbs: {},
    severitiesCount: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    }
  };
};

let processPbs = (processedPbs, pbs) => {
  for (var i = 0; i < pbs.length; i++) {
    const pb = pbs[i];
    if (hasPb(processedPbs.filteredPbs, pb)) {
      continue;
    }
    processedPbs.severitiesCount[pb.severity]++;
    if (!processedPbs.filteredPbs[pb.source]) {
      processedPbs.filteredPbs[pb.source] = [];
    }
    processedPbs.filteredPbs[pb.source].push(pb);
  }
  return processedPbs;
};

let hasPb = (filteredPbs, pb) => {
  for (var i = 0; i < filteredPbs; i++) {
    if (pb.source === filteredPbs[i].source &&
      pb.severity === filteredPbs[i].severity &&
      pb.code === filteredPbs[i].code &&
      pb.range.start.line === filteredPbs[i].range.start.line &&
      pb.range.start.character === filteredPbs[i].range.start.character &&
      pb.range.end.line === filteredPbs[i].range.end.line &&
      pb.range.end.character === filteredPbs[i].range.end.character
    ) {
      return true;
    }
    return false;
  }
};

module.exports = {
  initProcessedPbs: initProcessedPbs,
  processPbs: processPbs
};
