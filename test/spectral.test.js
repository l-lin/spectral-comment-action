const { createSpectral, runSpectral } = require('../src/spectral.js');

test('spectral', async () => {
  const fileContent = {
    file: '/home/llin/perso/spectral-comment-action/sample/spec/schemas/greetings.yml',
    content: 'greeting:\n' +
      '  type: object\n' +
      '  description: Object representing the message delivered by the server\n' +
      '  properties:\n' +
      '    message:\n' +
      '      type: string\n' +
      '      description: The message delivered by the server\n'
  };

  const spectral = await createSpectral('spectral:oas');
  const errors = await runSpectral(spectral, fileContent);
  expect(errors).not.toBeNull();
  expect(errors.length).toBe(1);
  expect(errors[0].severity).toBe(1);
  expect(errors[0].code).toBe('unrecognized-format');
});
