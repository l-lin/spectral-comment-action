const { buildRelativeFilePath, buildNote, buildNotes } = require('./note_builder');

test('sanitizeProjectPath', () => {
  const relativeFilePath = buildRelativeFilePath('/home/llin/spectral-comment-action/sample/spec/openapi.yml', '/home/llin/spectral-comment-action');
  expect(relativeFilePath).not.toBeNull();
  expect(relativeFilePath).toBe('sample/spec/openapi.yml');
});

test('buildNote', () => {
  const pb = {
    "code": "info-description",
    "path": [
      "info"
    ],
    "message": "OpenAPI object info `description` must be present and non-empty string.",
    "severity": 1,
    "range": {
      "start": {
        "line": 1,
        "character": 5
      },
      "end": {
        "line": 7,
        "character": 16
      }
    },
    "source": "/home/llin/spectral-comment-action/sample/spec/openapi.yml"
  };
  const project = {
    githubURL: 'https://github.com',
    path: 'l-lin/spectral-comment-action',
    branch: 'test-comment-pr',
    buildDir: '/home/llin/spectral-comment-action'
  };
  const relativeFilePath = 'sample/spec/openapi.yml';
  const note = buildNote(pb, project, relativeFilePath);
  expect(note).not.toBeNull();
  expect(note).toBe('|[sample/spec/openapi.yml:2:6](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/openapi.yml#L2)|:warning:|info-description|OpenAPI object info `description` must be present and non-empty string.|');
});

test('buildNotes', () => {
  const pbs = [
    {
      "code": "api-servers",
      "path": [],
      "message": "OpenAPI `servers` must be present and non-empty array.",
      "severity": 0,
      "range": {
        "start": {
          "line": 0,
          "character": 0
        },
        "end": {
          "line": 21,
          "character": 31
        }
      },
      "source": "/home/llin/spectral-comment-action/sample/spec/openapi.yml"
    },
    {
      "code": "info-description",
      "path": [
        "info"
      ],
      "message": "OpenAPI object info `description` must be present and non-empty string.",
      "severity": 1,
      "range": {
        "start": {
          "line": 1,
          "character": 5
        },
        "end": {
          "line": 7,
          "character": 16
        }
      },
      "source": "/home/llin/spectral-comment-action/sample/spec/openapi.yml"
    }
  ];
  const project = {
    githubURL: 'https://github.com',
    path: 'l-lin/spectral-comment-action',
    branch: 'test-comment-pr',
    buildDir: '/home/llin/spectral-comment-action'
  };
  const absFilePath = '/home/llin/spectral-comment-action/sample/spec/openapi.yml';
  const notes = buildNotes(pbs, project, absFilePath);
  expect(notes).not.toBeNull();
  expect(notes).toBe(`> /home/llin/spectral-comment-action

|Range|Severity|Code|Message|
|-----|--------|----|-------|
|[/home/llin/spectral-comment-action:1:1](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr//home/llin/spectral-comment-action#L1)|:x:|api-servers|OpenAPI \`servers\` must be present and non-empty array.|
|[/home/llin/spectral-comment-action:2:6](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr//home/llin/spectral-comment-action#L2)|:warning:|info-description|OpenAPI object info \`description\` must be present and non-empty string.|
`);
});
