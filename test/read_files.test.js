const readFilesToAnalyze = require('../src/read_files');

test('readFilesToAnalyze', async () => {
  const fileContents = await readFilesToAnalyze(process.cwd(), 'sample/**/*.yml');
  expect(fileContents).not.toBeNull();
  expect(fileContents.length).toBe(5);
});
