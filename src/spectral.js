const { httpAndFileResolver } = require('@stoplight/spectral/dist/resolvers/http-and-file');
const {
  Spectral,
  isJSONSchema,
  isJSONSchemaDraft4,
  isJSONSchemaDraft6,
  isJSONSchemaDraft7,
  isJSONSchemaDraft2019_09,
  isJSONSchemaLoose,
  isOpenApiv2,
  isOpenApiv3,
} = require('@stoplight/spectral');


const createSpectral = async ruleset => {
  const spectral = new Spectral({ resolver: httpAndFileResolver });
  spectral.registerFormat('oas2', isOpenApiv2);
  spectral.registerFormat('oas3', isOpenApiv3);
  spectral.registerFormat('json-schema', isJSONSchema);
  spectral.registerFormat('json-schema-loose', isJSONSchemaLoose);
  spectral.registerFormat('json-schema-draft4', isJSONSchemaDraft4);
  spectral.registerFormat('json-schema-draft6', isJSONSchemaDraft6);
  spectral.registerFormat('json-schema-draft7', isJSONSchemaDraft7);
  spectral.registerFormat('json-schema-2019-09', isJSONSchemaDraft2019_09);
  await spectral.loadRuleset(ruleset);
  return spectral;
};

const runSpectral = async (spectral, parsed) => await spectral.run(parsed);

module.exports = {
  createSpectral: createSpectral,
  runSpectral: runSpectral
};

