const { createSpectral, runSpectral } = require('../src/spectral.js');

test('spectral', async () => {
  const fileContent = {
    "file": "/home/llin/perso/spectral-comment-action/sample/openapi.yml",
    "content": "openapi: 3.0.1\ninfo:\n  title: Sample\n  contact:\n    name: REST API\n    email: spectral-comment-action@noreply.com\n    url: https://github.com/spectral-comment-action/issues/new\n  version: 0.0.1\ntags:\n- name: greetings\n  description: Server greets client\npaths:\n  /hello-world:\n    get:\n      tags:\n      - greetings\n      description: Simple greeting\n      operationId: getGreetings\n      responses:\n        200:\n          description: Greeting from the server\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Greeting'\n              examples:\n                sample:\n                  $ref: '#/components/examples/greetings.yml'\ncomponents:\n  schemas:\n    Greeting:\n      type: object\n      description: Object representing the message delivered by the server\n      properties:\n        message:\n          type: string\n          description: The message delivered by the server\n  examples:\n    Greeting:\n      value:\n        message: \"Hello, world\"\n\n"
  };


  const spectral = await createSpectral('spectral:oas');
  const errors = await runSpectral(spectral, fileContent.content);
  expect(errors).not.toBeNull();
  expect(errors.length).toBe(5);
  expect(errors[0].severity).toBe(1);
  expect(errors[0].code).toBe('oas3-api-servers');
});
